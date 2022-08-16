import { Field, InputType } from '@nestjs/graphql';
import { Validate } from 'class-validator';
import { BucketExistsRule } from 'src/shared/validators/bucket-exists-rule';

@InputType()
export class UploadStorageFileInput {
  @Field()
  name: string;
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
