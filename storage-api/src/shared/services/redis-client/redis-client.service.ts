import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClient, RedisClientType } from 'redis';
import { randomUUID } from 'crypto';
import { StorageFile } from 'src/storage/models/storage-file.model';
import {
  CustomTypeToRedisJSON,
  RedisJSONToCustomType,
} from 'src/shared/utils/json-converter';

@Injectable()
export class RedisClientService {
  #client: RedisClientType;

  constructor(private configService: ConfigService) {
    if (!this.configService.get('REDIS_PASSWORD')) {
      throw new InternalServerErrorException(
        'Redis client could not be initialized. Password is not defined!',
      );
    }

    this.#client = createClient({
      password: this.configService.get('REDIS_PASSWORD'),
    });

    (async () => {
      this.#client.on('error', (err) => console.log('Redis Client Error', err));

      await this.#client.connect();
    })();
  }

  async getFiles(bucketName: string) {
    // client.sAdd('users:1:tokens', 'Tm9kZSBSZWRpcw==');
    await this.#client.set('key', 'value');
    const value = await this.#client.get('key');
    console.log(value);
  }

  async getFile(bucketName: string, uuid: string): Promise<StorageFile> {
    const response = await this.#client.json.get(`${bucketName}:s3:${uuid}`);

    return RedisJSONToCustomType(response);
  }

  async storeFile(bucketName: string): Promise<StorageFile> {
    const s3File: StorageFile = {
      uuid: randomUUID(),
      s3ObjectKey: 's3/234',
      createdAt: new Date(),
      updatedAt: null,
    };

    const s3RedisKey = `${bucketName}:s3:${s3File.uuid}`;

    await this.#client.json.set(s3RedisKey, '$', CustomTypeToRedisJSON(s3File));

    return this.getFile(bucketName, s3File.uuid);
  }

  async createBucket(bucketName: string): Promise<boolean> {
    // Redis command: SADD "validBucketNames" "one"
    const bucketPositionIndex = await this.#client.sAdd(
      'validBucketNames',
      bucketName,
    );

    return bucketPositionIndex >= 0;
  }

  async checkIfBucketExist(bucketName: string): Promise<boolean> {
    return this.#client.sIsMember('validBucketNames', bucketName);
  }
}

/** File Structure
 * {bucketName}:s3:152325
 * {bucketName}:s3:152326 (is a directory) will be specified in redis if it is a directory or a file
 * {bucketName}:s3:152327
 */

/** Directory Structure
 * {bucketName}:directory:root
 * {bucketName}:directory:152326 -> lists all members from this directory, which can contain s3 files but also folders
 */

/** Valid bucket names
 * validBucketNames -> contains the names of valid buckets that were created on AWS S3
 */
