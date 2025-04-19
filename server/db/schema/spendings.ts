// src/db/schema.ts
import { sqliteTable, text, integer, real } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";

export const spendings = sqliteTable("spendings", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  description: text("description").notNull(),
  amount: real("amount").notNull(),
  // Store date as Unix timestamp (milliseconds) for easier querying
  date: integer("date", { mode: "timestamp_ms" })
    .notNull()
    .default(sql`(unixepoch('now', 'subsec') * 1000)`), // Default to current time
});

// Define types for insertion and selection if needed (often inferred)
export type Spending = typeof spendings.$inferSelect;
export type NewSpending = typeof spendings.$inferInsert;
