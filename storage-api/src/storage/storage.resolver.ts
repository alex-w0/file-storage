import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UploadStorageFileInput } from './dto/new-storage-file.input';
import { StorageFile } from './models/storage-file.model';

import { ListObjectsCommand } from '@aws-sdk/client-s3';
import { AWSClientService } from 'src/shared/services/aws-client/aws-client.service';

@Resolver(() => StorageFile)
export class StorageResolver {
  constructor(private awsClientService: AWSClientService) {}

  @Query(() => [StorageFile])
  async files(): Promise<StorageFile[]> {
    const command = new ListObjectsCommand({
      Bucket: 'oekotex',
    });
    const res = await this.awsClientService.s3Client.send(command);

    res.Contents[0].StorageClass;

    console.log(res);
    return [
      {
        name: 'File 1',
      },
    ];
  }

  @Query(() => StorageFile)
  file(@Args('id') id: string): StorageFile {
    return {
      name: 'File 1',
    };
  }

  @Mutation(() => StorageFile)
  async uploadFile(
    @Args('data') uploadStorageFileData: UploadStorageFileInput,
  ) {
    return {
      name: 'File 1',
    };
  }
}
