import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import {
  CompletedPart,
  CompleteMultipartUploadCommand,
  CreateBucketCommand,
  CreateMultipartUploadCommand,
  S3Client,
  UploadPartCommand,
} from '@aws-sdk/client-s3';
import { ConfigService } from '@nestjs/config';
import { RedisClientService } from 'src/shared/services/redis-client/redis-client.service';
import { StorageFile } from 'src/storage/models/storage-file.model';
import { readFileSync } from 'fs';
import { UploadStorageFileInput } from 'src/storage/dto/new-storage-file.input';
import { Stream } from 'stream';

async function stream2buffer(stream: Stream): Promise<Buffer> {
  return new Promise<Buffer>((resolve, reject) => {
    const _buf = Array<any>();

    stream.on('data', (chunk) => _buf.push(chunk));
    stream.on('end', () => resolve(Buffer.concat(_buf)));
    stream.on('error', (err) => reject(`error converting stream - ${err}`));
  });
}

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
    console.log('FileData filename', filename);

    const fStream = await stream2buffer(createReadStream());

    // createReadStream().on('data', (chunk) => {
    //   console.log(chunk);
    // });

    // const fStream = readFileSync('./angular-electron.zip');

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

    const completedUploadParts: CompletedPart[] = [];
    // AWS requirement: each part must be at least 5 MB in size, except the last part.
    // We are using 10mb for each chunk
    const partSize = 1024 * 1024 * 10;

    let partNum = 0;
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
      console.log(
        'Uploading part: #',
        uploadPartCommand.input.PartNumber,
        ', Range start:',
        rangeStart,
      );

      const uploadPartResponse = await this.#client.send(uploadPartCommand);

      if (uploadPartResponse.$metadata.httpStatusCode !== 200) {
        throw new InternalServerErrorException(
          `AWS S3 upload part was not successful!`,
        );
      }

      completedUploadParts.push({
        PartNumber: partNum,
        ETag: uploadPartResponse.ETag,
      });
    }
    console.log('Upload Parts complete');

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

    console.log('Upload complete');

    return this.redisClient.storeFile(bucketName);
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
