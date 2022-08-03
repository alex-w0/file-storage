import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class StorageFile {
  @Field()
  name: string;
}
