import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClient, RedisClientType } from 'redis';
import { randomUUID } from 'crypto';
import { StorageFile } from 'src/storage/models/storage-file.model';
import {
  CustomTypeToRedisJSON,
  RedisJSONToCustomType,
} from 'src/shared/utils/json-converter';
import { StoreFileArguments } from 'src/shared/models/redis-client.model';

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

  #parseRedisJSONToStorageFile(data: any): StorageFile {
    return {
      ...data,
      createdAt: new Date(data.createdAt),
      updatedAt: data.updatedAt ? new Date(data.updatedAt) : undefined,
    };
  }

  async getFiles(bucketName: string): Promise<StorageFile[]> {
    // Redis command: json.get {bucketName}:s3:{uuid} '.'
    const { cursor, keys } = await this.#client.scan(0, {
      COUNT: 1000,
      MATCH: `${bucketName}:s3:*`,
    });

    const response = await this.#client.json.mGet(keys, '.');

    return response.map(this.#parseRedisJSONToStorageFile);
  }

  async getFile(bucketName: string, uuid: string): Promise<StorageFile | null> {
    const response = await this.#client.json.get(`${bucketName}:s3:${uuid}`);

    return this.#parseRedisJSONToStorageFile(response);
  }

  async deleteFile(bucketName: string, uuid: string): Promise<boolean> {
    const keysDeleted = await this.#client.del(`${bucketName}:s3:${uuid}`);

    return keysDeleted >= 1;
  }

  async storeFile({
    bucketName,
    s3ObjectKey,
    eTag,
    location,
  }: StoreFileArguments): Promise<StorageFile> {
    const s3File: StorageFile = {
      uuid: randomUUID(),
      s3ObjectKey,
      eTag,
      location,
      createdAt: new Date(),
      updatedAt: null,
    };

    const s3RedisKey = `${bucketName}:s3:${s3File.uuid}`;

    await this.#client.json.set(s3RedisKey, '$', CustomTypeToRedisJSON(s3File));
    await this.#client.sAdd(`${bucketName}:s3Keys`, s3File.s3ObjectKey);

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

  async checkIfFileKeyExist(
    bucketName: string,
    s3ObjectKey: string,
  ): Promise<boolean> {
    return this.#client.sIsMember(`${bucketName}:s3Keys`, s3ObjectKey);
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
