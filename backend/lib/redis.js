import Redis from "ioredis";
import dotenv from "dotenv";

dotenv.config();

export const redis = new Redis(process.env.UPSTASH_REDIS_URL);

export const deleteRedisToken = (userId) =>
  redis.del(`refresh_token:${userId}`);
