// drizzle.config.ts
import type { Config } from "drizzle-kit";

export default {
  schema: "./server/db/schema/index.ts", // Path to your schema file
  out: "./server/db/drizzle", // Output directory for migrations
  driver: "expo", // Using expo-sqlite driver
  dialect: "sqlite",
} satisfies Config;
