import { eq } from "drizzle-orm";
import db from "../db";
import { spendings, type NewSpending } from "../db/schema/spendings";

export async function createSpending(spending: NewSpending) {
  const result = await db.insert(spendings).values(spending).returning();
  return result[0];
}

export async function updateSpending(
  id: number,
  spending: Partial<NewSpending>
) {
  const result = await db
    .update(spendings)
    .set(spending)
    .where(eq(spendings.id, id))
    .returning();
  return result[0];
}

export async function deleteSpending(id: number) {
  const result = await db
    .delete(spendings)
    .where(eq(spendings.id, id))
    .returning();
  return result[0];
}
