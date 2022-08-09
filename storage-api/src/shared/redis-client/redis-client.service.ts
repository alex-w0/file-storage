import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClient, RedisClientType } from 'redis';
import { randomUUID } from 'crypto';

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

  async storeS3File(bucketName: string): Promise<void> {
    const s3RedisKey = `${bucketName}:s3:${randomUUID()}`;

    await this.#client.set(s3RedisKey, 'value44414');

    const response = await this.#client.get(s3RedisKey);

    console.log('Response', response);
  }
}

/** File Structure
 * {bucketName}:s3:152325
 * {bucketName}:s3:152326 (is a directory) will be specified in redis if it is a directory or a file
 * {bucketName}:s3:152327
 */

/** File Structure
 * {bucketName}:level:root
 * {bucketName}:level:152326 -> lists all members from this directory, which can contain s3 files but also folders
 */
