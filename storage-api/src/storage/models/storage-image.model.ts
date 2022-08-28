import { Field, ObjectType } from '@nestjs/graphql';
import { StorageFileType } from 'src/shared/enums/storage-file-type';
import { StorageBaseAttributes } from './base.model';

@ObjectType()
export class StorageImageMetaData {
  @Field({ nullable: true })
  titleTag?: string;

  @Field({ nullable: true })
  altTag?: string;
}

@ObjectType()
export class StorageImage extends StorageBaseAttributes {
  storageType: StorageFileType.Image;

  @Field()
  url: string;

  @Field()
  metaData: StorageImageMetaData;
}
