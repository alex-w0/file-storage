import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class StorageFile {
  @Field()
  uuid: string;

  @Field()
  storageKey: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
