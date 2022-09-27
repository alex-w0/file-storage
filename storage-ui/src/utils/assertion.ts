import type { StorageDirectory, StorageFile } from "@/generated/graphql";

export function isStorageDirectory(
  storageFile: StorageFile
): storageFile is StorageDirectory {
  return storageFile.__typename === "StorageDirectory";
}
