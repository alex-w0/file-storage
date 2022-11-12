import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  OnApplicationShutdown,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClient, RedisClientType } from 'redis';
import { randomUUID } from 'crypto';
import { CustomTypeToRedisJSON } from '@shared/utils/json-converter';
import { StoreFileArguments } from '@shared/models/redis-client.model';
import { StorageFile } from '@modules/storage/models/storage-file.model';
import { isStorageDirectory } from '@shared/utils/storage-file-assertions';

@Injectable()
export class RedisClientService implements OnApplicationShutdown {
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

  async onApplicationShutdown() {
    await this.#client.quit();
  }

  #parseRedisJSONToStorageFile(data: any): StorageFile {
    return {
      ...data,
      createdAt: new Date(data.createdAt),
      updatedAt: data.updatedAt ? new Date(data.updatedAt) : undefined,
    };
  }

  async getFiles(
    bucketName: string,
    directoryLevel?: string,
  ): Promise<StorageFile[]> {
    // Fallback to root level if no directory level is defined
    directoryLevel ??= 'root';

    const directoryKey = `${bucketName}:level:${directoryLevel}`;

    const directory = await this.#client.exists(directoryKey);

    if (directory <= 0) {
      throw new NotFoundException(
        'Directory level does not exist, please define a valid uuid!',
      );
    }

    const directoryItems = (await this.#client.json.get(
      directoryKey,
    )) as string[];

    if (directoryItems.length <= 0) {
      return [];
    }

    const directoryItemKeys = directoryItems.map(
      (directoryItem) => `${bucketName}:s3:${directoryItem}`,
    );

    const response = await this.#client.json.mGet(directoryItemKeys, '.');

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

  async storeFile<T extends StorageFile>(
    bucketName: string,
    data: StoreFileArguments,
  ): Promise<T> {
    const s3File: StorageFile = {
      ...data,
      uuid: randomUUID(),
      createdAt: new Date(),
      updatedAt: null,
    };

    const s3RedisKey = `${bucketName}:s3:${s3File.uuid}`;

    await this.#client.json.set(s3RedisKey, '$', CustomTypeToRedisJSON(s3File));
    await this.#client.sAdd(`${bucketName}:s3Keys`, s3File.s3ObjectKey);

    if (isStorageDirectory(s3File)) {
      // Defines on which directory the file is located
      await this.#client.json.set(
        `${bucketName}:level:${s3File.uuid}`,
        '$',
        [],
      );
    }

    // Defines on which directory the file is located
    await this.#client.json.arrAppend(
      `${bucketName}:level:${s3File.parentDirectoryUuid ?? 'root'}`,
      '$',
      s3File.uuid,
    );

    return this.getFile(bucketName, s3File.uuid) as Promise<T>;
  }

  async createBucket(bucketName: string): Promise<boolean> {
    // Redis command: SADD "validBucketNames" "one"
    const bucketPositionIndex = await this.#client.sAdd(
      'validBucketNames',
      bucketName,
    );

    const bucketCreated = bucketPositionIndex >= 0;

    // Create the directory root level key
    if (bucketCreated) {
      await this.#client.json.set(`${bucketName}:level:root`, '$', []);
    }

    return bucketCreated;
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
 * {bucketName}:level:root
 * {bucketName}:level:152326 -> lists all members from this directory, which can contain s3 files but also folders
 */

/** Valid bucket names
 * validBucketNames -> contains the names of valid buckets that were created on AWS S3
 */
