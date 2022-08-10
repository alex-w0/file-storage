import { Injectable } from '@nestjs/common';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { RedisClientService } from '../services/redis-client/redis-client.service';

@ValidatorConstraint({ name: 'BucketNameExists', async: true })
@Injectable()
export class BucketExistsRule implements ValidatorConstraintInterface {
  constructor(private redisClientService: RedisClientService) {}

  async validate(value: string) {
    const bucketExists = await this.redisClientService.checkIfBucketExist(
      value,
    );

    return bucketExists;
  }

  defaultMessage() {
    return 'Bucket name does not exist';
  }
}
