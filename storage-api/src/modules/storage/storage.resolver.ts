import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import {
  BucketNameArgs,
  CreateBucketArgs,
  CreateDirectoryInput,
  UploadStorageFileInput,
} from './dto/new-storage-file.input';
import { StorageImage } from './models/storage-image.model';

import { AWSClientService } from '@shared/services/aws-client/aws-client.service';
import { RedisClientService } from '@shared/services/redis-client/redis-client.service';
import { StorageFile, StorageFileUnion } from './models/storage-file.model';
import { StorageDirectory } from './models/storage-directory.model';
import { StorageFilesOptions } from './dto/storage-file.input';

@Resolver(() => StorageImage)
export class StorageResolver {
  constructor(
    private awsClientService: AWSClientService,
    private redisClientService: RedisClientService,
  ) {}

  @Query(() => [StorageFileUnion])
  async files(
    @Args('bucketNameArguments') { bucketName }: BucketNameArgs,
    @Args({
      name: 'options',
      type: () => StorageFilesOptions,
      nullable: true,
    })
    options: StorageFilesOptions,
  ): Promise<StorageFile[]> {
    const files = await this.redisClientService.getFiles(
      bucketName,
      options?.directoryLevel,
    );

    return files;
  }

  @Query(() => StorageFileUnion)
  async file(
    @Args('bucketNameArguments') { bucketName }: BucketNameArgs,
    @Args('uuid') uuid: string,
  ): Promise<StorageFile> {
    return this.redisClientService.getFile(bucketName, uuid);
  }

  @Mutation(() => StorageImage)
  async uploadFile(
    @Args('bucketNameArguments') { bucketName }: BucketNameArgs,
    @Args('data') uploadStorageFileData: UploadStorageFileInput,
  ) {
    return this.awsClientService.uploadS3File(
      bucketName,
      uploadStorageFileData,
    );
  }

  @Mutation(() => StorageDirectory)
  async createDirectory(
    @Args('bucketNameArguments') { bucketName }: BucketNameArgs,
    @Args('data') createDirectoryData: CreateDirectoryInput,
  ) {
    return this.awsClientService.createS3Directory(
      bucketName,
      createDirectoryData,
    );
  }

  @Mutation(() => StorageFileUnion)
  async deleteFile(
    @Args('bucketNameArguments') { bucketName }: BucketNameArgs,
    @Args('uuid') uuid: string,
  ) {
    return this.awsClientService.deleteS3File(bucketName, uuid);
  }

  @Mutation(() => Boolean)
  async createBucket(
    @Args('createBucketArguments') { bucketName }: CreateBucketArgs,
  ) {
    return this.awsClientService.createS3Bucket(bucketName);
  }
}
