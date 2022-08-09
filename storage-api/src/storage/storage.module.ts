import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RedisClientService } from 'src/shared/redis-client/redis-client.service';
import { AWSClientService } from 'src/shared/services/aws-client/aws-client.service';
import { StorageResolver } from './storage.resolver';

@Module({
  imports: [ConfigModule],
  providers: [AWSClientService, StorageResolver, RedisClientService],
})
export class StorageModule {}
