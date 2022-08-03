import { Module } from '@nestjs/common';
import { StorageResolver } from './storage.resolver';

@Module({
  providers: [StorageResolver],
})
export class StorageModule {}
