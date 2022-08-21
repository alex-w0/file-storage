import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import {
  BucketNameArgs,
  CreateBucketArgs,
  UploadStorageFileInput,
} from './dto/new-storage-file.input';
import { StorageFile } from './models/storage-file.model';

import { ListObjectsV2Command } from '@aws-sdk/client-s3';
import { AWSClientService } from 'src/shared/services/aws-client/aws-client.service';
import { RedisClientService } from 'src/shared/services/redis-client/redis-client.service';

@Resolver(() => StorageFile)
export class StorageResolver {
  constructor(
    private awsClientService: AWSClientService,
    private redisClientService: RedisClientService,
  ) {}

  @Query(() => [StorageFile])
  async files(
    @Args('bucketNameArguments') { bucketName }: BucketNameArgs,
  ): Promise<StorageFile[]> {
    const command = new ListObjectsV2Command({
      Bucket: bucketName,
    });

    const response = await this.awsClientService.s3Client.send(command);

    await this.redisClientService.getFiles(bucketName);

    return response.Contents.map((s3Object) => {
      return {
        uuid: '123',
        location: 'test',
        eTag: '123',
        s3ObjectKey: s3Object.Key,
        createdAt: s3Object.LastModified,
        updatedAt: s3Object.LastModified,
      };
    });
  }

  @Query(() => StorageFile)
  async file(
    @Args('bucketNameArguments') { bucketName }: BucketNameArgs,
    @Args('uuid') uuid: string,
  ): Promise<StorageFile> {
    return this.redisClientService.getFile(bucketName, uuid);
  }

  @Mutation(() => StorageFile)
  async uploadFile(
    @Args('bucketNameArguments') { bucketName }: BucketNameArgs,
    @Args('data') uploadStorageFileData: UploadStorageFileInput,
  ) {
    return this.awsClientService.uploadS3File(
      bucketName,
      uploadStorageFileData,
    );
  }

  @Mutation(() => StorageFile)
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
