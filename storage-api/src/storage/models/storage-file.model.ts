import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class StorageFile {
  @Field()
  uuid: string;

  @Field()
  s3ObjectKey: string;

  @Field()
  eTag: string;

  @Field()
  location: string;

  @Field()
  createdAt: Date;

  @Field({ nullable: true })
  updatedAt?: Date;
}
