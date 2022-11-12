import { StorageDirectory } from 'src/modules/storage/models/storage-directory.model';
import { StorageImage } from 'src/modules/storage/models/storage-image.model';

export type StoreFileArguments =
  | Omit<StorageImage, 'uuid' | 'createdAt' | 'updatedAt'>
  | Omit<StorageDirectory, 'uuid' | 'createdAt' | 'updatedAt'>;
