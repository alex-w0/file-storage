import { Field, InputType } from '@nestjs/graphql';
import { Validate } from 'class-validator';
import { FileUpload, GraphQLUpload } from 'graphql-upload-minimal';
import { BucketExistsRule } from 'src/shared/validators/bucket-exists-rule';

@InputType()
export class UploadStorageFileInput {
  @Field()
  name: string;

  // TODO: Write validator that checks if the file does not reach the max file size
  @Field(() => GraphQLUpload)
  file: Promise<FileUpload>;
}

@InputType()
export class CreateDirectoryInput {
  @Field({ nullable: true })
  directoryLevelUuid?: string;

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
