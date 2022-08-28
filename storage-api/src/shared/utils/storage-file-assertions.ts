import { StorageImage } from 'src/storage/models/storage-image.model';
import { StorageFile } from 'src/storage/models/storage-file.model';
import { StorageFileType } from '../enums/storage-file-type';

export function isStorageImage(
  storageFile: StorageFile,
): storageFile is StorageImage {
  return storageFile.storageType === StorageFileType.Image;
}
