import { RedisJSON } from '@redis/json/dist/commands';

export function RedisJSONToCustomType<T>(redisJSON: RedisJSON): T {
  return redisJSON as unknown as T;
}

export function CustomTypeToRedisJSON(redisJSON: unknown): RedisJSON {
  return redisJSON as RedisJSON;
}
