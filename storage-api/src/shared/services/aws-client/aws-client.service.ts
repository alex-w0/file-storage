import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { S3Client } from '@aws-sdk/client-s3';
import { ConfigService } from '@nestjs/config';
import { RedisClientService } from 'src/shared/redis-client/redis-client.service';

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

  async uploadS3File(bucketName: string): Promise<void> {
    await this.redisClient.storeS3File(bucketName);
  }
}
