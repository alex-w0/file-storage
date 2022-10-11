import { StorageImage } from 'src/storage/models/storage-image.model';
import { StorageFile } from 'src/storage/models/storage-file.model';
import { StorageFileType } from '../enums/storage-file-type';
import { StorageDirectory } from 'src/storage/models/storage-directory.model';

export function isStorageImage(
  storageFile: StorageFile,
): storageFile is StorageImage {
  return storageFile.storageType === StorageFileType.Image;
}

export function isStorageDirectory(
  storageFile: StorageFile,
): storageFile is StorageDirectory {
  return storageFile.storageType === StorageFileType.Directory;
}
