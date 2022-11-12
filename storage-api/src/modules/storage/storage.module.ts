import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RedisClientService } from '@shared/services/redis-client/redis-client.service';
import { AWSClientService } from '@shared/services/aws-client/aws-client.service';
import { StorageResolver } from './storage.resolver';
import { BucketExistsRule } from '@shared/validators/bucket-exists-rule';

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
