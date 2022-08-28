import { createUnionType } from '@nestjs/graphql';
import { StorageDirectory } from './storage-directory.model';
import { StorageImage } from './storage-image.model';

export const StorageFileUnion = createUnionType({
  name: 'StorageFile',
  types: () => [StorageDirectory, StorageImage] as const,
});

export type StorageFile = typeof StorageFileUnion;
