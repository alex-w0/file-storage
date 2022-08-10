import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RedisClientService } from 'src/shared/services/redis-client/redis-client.service';
import { AWSClientService } from 'src/shared/services/aws-client/aws-client.service';
import { StorageResolver } from './storage.resolver';
import { BucketExistsRule } from 'src/shared/validators/bucket-exists-rule';

@Module({
  imports: [ConfigModule],
  providers: [
    AWSClientService,
    StorageResolver,
    RedisClientService,
    BucketExistsRule,
  ],
})
export class StorageModule {}
