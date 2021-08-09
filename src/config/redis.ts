import redis from "redis";
import { logger } from "../logger/winston";

// process.env.REDIS_HOST
const client = redis.createClient();

/**
 * Initializes Redis connection using configs and logs status
 */
const initializeRedis = () => {
  // Testing out
  client.set("status", "server up");
  client.get("status", (err: any) => {
    if (err) {
      logger.error("Redis Connection Failed");
    } else {
      logger.info("Successfully Connected to redis");
    }
  });
};

export { initializeRedis, client };
