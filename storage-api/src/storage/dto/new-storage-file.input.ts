import { Field, InputType } from '@nestjs/graphql';
import { Validate } from 'class-validator';
import { FileUpload, GraphQLUpload } from 'graphql-upload-minimal';
import { BucketExistsRule } from 'src/shared/validators/bucket-exists-rule';

@InputType()
export class UploadStorageFileInput {
  @Field()
  name: string;

  @Field(() => GraphQLUpload)
  file: Promise<FileUpload>;
}

@InputType()
export class BucketNameArgs {
  @Validate(BucketExistsRule)
  @Field()
  bucketName: string;
}

@InputType()
export class CreateBucketArgs {
  @Field()
  bucketName: string;
}
