import 'tsconfig-paths/register';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { useContainer } from 'class-validator';
import { AWSClientService } from '@shared/services/aws-client/aws-client.service';
import { RedisClientService } from '@shared/services/redis-client/redis-client.service';

declare global {
  // eslint-disable-next-line no-var
  var __APP__: INestApplication;
  // eslint-disable-next-line no-var
  var __SERVICE__: {
    REDIS_CLIENT: RedisClientService;
    AWS_CLIENT: AWSClientService;
  };
  // eslint-disable-next-line no-var
  var __BUCKET_NAME__: string;
}

module.exports = async () => {
  console.info('Starting the app...');

  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();

  const app = moduleFixture.createNestApplication();
  app.useGlobalPipes(new ValidationPipe());
  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  await app.init();

  const awsClientService = await moduleFixture.resolve(AWSClientService);
  const redisClientService = await moduleFixture.resolve(RedisClientService);

  const bucketName = 'storage-api-e2e-test';

  // Create the bucket if it does not exists
  if ((await redisClientService.checkIfBucketExist(bucketName)) === false) {
    await awsClientService.createS3Bucket(bucketName);
  } else {
    await redisClientService.createBucketStructure(bucketName);
  }

  global.__APP__ = app;
  global.__SERVICE__ = {
    REDIS_CLIENT: redisClientService,
    AWS_CLIENT: awsClientService,
  };
  global.__BUCKET_NAME__ = bucketName;
};
