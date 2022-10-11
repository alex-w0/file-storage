import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class StorageFilesOptions {
  @Field({ nullable: true })
  directoryLevel?: string;
}
