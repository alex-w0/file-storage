import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateBucketCommand, S3Client } from '@aws-sdk/client-s3';
import { ConfigService } from '@nestjs/config';
import { RedisClientService } from 'src/shared/services/redis-client/redis-client.service';
import { StorageFile } from 'src/storage/models/storage-file.model';

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

  async uploadS3File(bucketName: string): Promise<StorageFile> {
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
