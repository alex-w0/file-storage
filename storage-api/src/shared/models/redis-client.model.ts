import { StorageDirectory } from 'src/storage/models/storage-directory.model';
import { StorageImage } from 'src/storage/models/storage-image.model';

export type StoreFileArguments =
  | Omit<StorageImage, 'uuid' | 'createdAt' | 'updatedAt'>
  | Omit<StorageDirectory, 'uuid' | 'createdAt' | 'updatedAt'>;
