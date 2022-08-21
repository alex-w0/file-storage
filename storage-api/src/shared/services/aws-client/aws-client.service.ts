import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import {
  CompletedPart,
  CompleteMultipartUploadCommand,
  CreateBucketCommand,
  CreateMultipartUploadCommand,
  DeleteObjectCommand,
  S3Client,
  UploadPartCommand,
  UploadPartCommandOutput,
} from '@aws-sdk/client-s3';
import { ConfigService } from '@nestjs/config';
import { RedisClientService } from 'src/shared/services/redis-client/redis-client.service';
import { StorageFile } from 'src/storage/models/storage-file.model';
import { UploadStorageFileInput } from 'src/storage/dto/new-storage-file.input';
import { streamToBuffer } from 'src/shared/utils/stream-to-buffer';
import { NotFoundError } from 'rxjs';
@Injectable()
export class AWSClientService {
  #client: S3Client;

  constructor(
    private configService: ConfigService,
    private redisClient: RedisClientService,
  ) {
    if (
      !this.configService.get('S3_ACCESS_KEY_ID') ||
      !this.configService.get('S3_SECRET_ACCESS_KEY')
    ) {
      throw new InternalServerErrorException(
        'S3 client could not be initialized. Credentials are not defined!',
      );
    }

    this.#client = new S3Client({
      region: 'eu-central-1',
      credentials: {
        accessKeyId: this.configService.get('S3_ACCESS_KEY_ID'),
        secretAccessKey: this.configService.get('S3_SECRET_ACCESS_KEY'),
      },
    });
  }

  get s3Client() {
    return this.#client;
  }

  async uploadS3File(
    bucketName: string,
    fileData: UploadStorageFileInput,
  ): Promise<StorageFile> {
    const { createReadStream, filename } = await fileData.file;

    const fileExists = await this.redisClient.checkIfFileKeyExist(
      bucketName,
      filename,
    );

    if (fileExists === true) {
      throw new BadRequestException(
        `A file already exists with the filename ${filename}!`,
      );
    }

    const fStream = await streamToBuffer(createReadStream());

    console.info(
      `File upload for file ${filename} (size: ${fStream.length}) is starting...`,
    );

    const createMultipartCommand = new CreateMultipartUploadCommand({
      Bucket: bucketName,
      Key: filename,
    });

    const createMultipartUploadResponse = await this.#client.send(
      createMultipartCommand,
    );

    if (createMultipartUploadResponse.$metadata.httpStatusCode !== 200) {
      throw new InternalServerErrorException(
        `AWS S3 createMultipart initialization failed!`,
      );
    }

    // AWS requirement: each part must be at least 5 MB in size, except the last part.
    // We are using 20mb for each chunk
    const partSize = 1024 * 1024 * 20;

    let partNum = 0;

    const uploadPartCommandRequests: Promise<UploadPartCommandOutput>[] = [];
    // Grab each partSize chunk and upload it as a part
    for (
      let rangeStart = 0;
      rangeStart < fStream.length;
      rangeStart += partSize
    ) {
      partNum++;

      const end = Math.min(rangeStart + partSize, fStream.length);

      const uploadPartCommand = new UploadPartCommand({
        Bucket: createMultipartCommand.input.Bucket,
        Key: createMultipartCommand.input.Key,
        PartNumber: partNum,
        UploadId: createMultipartUploadResponse.UploadId,
        Body: fStream.slice(rangeStart, end),
      });

      // Send a single part
      console.info(
        'Uploading part: #',
        uploadPartCommand.input.PartNumber,
        ', Range start:',
        rangeStart,
      );

      uploadPartCommandRequests.push(this.#client.send(uploadPartCommand));
    }

    const uploadPartCommandResponses = await Promise.all(
      uploadPartCommandRequests,
    );

    const completedUploadParts: CompletedPart[] =
      uploadPartCommandResponses.map(
        // Luckily promise.all preserves the order of the input and output, so the (partNumberIndex + 1) will be equal the partial upload number.
        (uploadPartCommandResponse, partNumberIndex) => {
          if (uploadPartCommandResponse.$metadata.httpStatusCode !== 200) {
            throw new InternalServerErrorException(
              `AWS S3 upload part was not successful!`,
            );
          }

          return {
            PartNumber: partNumberIndex + 1,
            ETag: uploadPartCommandResponse.ETag,
          };
        },
      );

    const completeMultipartCommand = new CompleteMultipartUploadCommand({
      Bucket: createMultipartCommand.input.Bucket,
      Key: createMultipartCommand.input.Key,
      UploadId: createMultipartUploadResponse.UploadId,
      MultipartUpload: {
        Parts: completedUploadParts,
      },
    });

    const completeMultipartResponse = await this.#client.send(
      completeMultipartCommand,
    );

    if (completeMultipartResponse.$metadata.httpStatusCode !== 200) {
      throw new InternalServerErrorException(
        `S3 object could not be created on AWS!`,
      );
    }

    console.info(`File upload for file ${filename} completed...`);
    console.log(completeMultipartResponse);

    return this.redisClient.storeFile({
      bucketName,
      s3ObjectKey: completeMultipartResponse.Key,
      eTag: completeMultipartResponse.ETag,
      location: completeMultipartResponse.Location,
    });
  }

  async deleteS3File(bucketName: string, uuid: string): Promise<StorageFile> {
    const file = await this.redisClient.getFile(bucketName, uuid);

    if (file === null) {
      throw new NotFoundException('File does not exists!');
    }

    const deleteObjectCommand = new DeleteObjectCommand({
      Bucket: bucketName,
      Key: file.s3ObjectKey,
    });

    const deleteObjectCommandResponse = await this.#client.send(
      deleteObjectCommand,
    );

    console.log(file);
    console.log(deleteObjectCommandResponse);
    if (deleteObjectCommandResponse.$metadata.httpStatusCode !== 204) {
      throw new InternalServerErrorException(
        `AWS S3 deleting the object ${uuid} failed!`,
      );
    }

    const fileRemoved = await this.redisClient.deleteFile(bucketName, uuid);

    if (fileRemoved === false) {
      throw new InternalServerErrorException(
        `File ${uuid} could not be removed on the bucket ${bucketName}!`,
      );
    }

    return file;
  }

  async createS3Bucket(bucketName: string): Promise<boolean> {
    const bucketNameExists = await this.redisClient.checkIfBucketExist(
      bucketName,
    );

    if (bucketNameExists === true) {
      throw new BadRequestException(
        `Bucket name ${bucketName} already exists!`,
      );
    }

    const command = new CreateBucketCommand({
      Bucket: bucketName,
    });

    const createBucketResponse = await this.#client.send(command);

    if (createBucketResponse.$metadata.httpStatusCode !== 200) {
      throw new InternalServerErrorException(
        `Bucket ${bucketName} could not be created on AWS!`,
      );
    }

    const bucketIsCreated = await this.redisClient.createBucket(bucketName);

    if (bucketIsCreated === false) {
      throw new InternalServerErrorException(
        `Bucket name ${bucketName} could not be created!`,
      );
    }

    return bucketIsCreated;
  }
}
