import { createUnionType } from '@nestjs/graphql';
import { isStorageImage } from '@shared/utils/storage-file-assertions';
import { StorageDirectory } from './storage-directory.model';
import { StorageImage } from './storage-image.model';

export const StorageFileUnion = createUnionType({
  name: 'StorageFile',
  types: () => [StorageDirectory, StorageImage] as const,
  resolveType(value) {
    if (isStorageImage(value)) {
      return StorageImage;
    }
    return StorageDirectory;
  },
});

export type StorageFile = typeof StorageFileUnion;
