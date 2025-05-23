import { drizzle } from "drizzle-orm/expo-sqlite";
import { openDatabaseSync } from "expo-sqlite";
import * as schema from "./schema";

export const expo = openDatabaseSync("db.db");
export default drizzle(expo, { schema });
