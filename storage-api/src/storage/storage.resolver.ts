import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import {
  BucketNameArgs,
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
        storageKey: s3Object.Key,
        createdAt: s3Object.LastModified,
        updatedAt: s3Object.LastModified,
      };
    });
  }

  @Query(() => StorageFile)
  file(
    @Args('bucketNameArguments') { bucketName }: BucketNameArgs,
    @Args('id') id: string,
  ): StorageFile {
    return {
      uuid: '123',
      storageKey: 'File 1',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }

  @Mutation(() => StorageFile)
  async uploadFile(
    @Args('bucketNameArguments') { bucketName }: BucketNameArgs,
    @Args('data') uploadStorageFileData: UploadStorageFileInput,
  ) {
    await this.awsClientService.uploadS3File(bucketName);
    // const response = await this.awsClientService.s3Client.send(command);

    return {
      name: 'File 1',
    };
  }
}
