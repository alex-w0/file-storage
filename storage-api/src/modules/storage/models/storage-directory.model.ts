import { Field, ObjectType } from '@nestjs/graphql';
import { StorageFileType } from 'src/shared/enums/storage-file-type';
import { StorageBaseAttributes } from './base.model';

@ObjectType()
export class StorageDirectoryMetaData {
  @Field()
  name: string;
}

@ObjectType()
export class StorageDirectory extends StorageBaseAttributes {
  storageType: StorageFileType.Directory;

  @Field()
  metaData: StorageDirectoryMetaData;
}
