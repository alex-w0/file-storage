import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UploadStorageFileInput {
  @Field()
  name: string;
}
