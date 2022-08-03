import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UploadStorageFileInput } from './dto/new-storage-file.input';
import { StorageFile } from './models/storage-file.model';

@Resolver(() => StorageFile)
export class StorageResolver {
  @Query(() => [StorageFile])
  files(): StorageFile[] {
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
