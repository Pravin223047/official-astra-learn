import { drizzle } from "drizzle-orm/neon-http";

type Database = ReturnType<typeof drizzle>;

let database: Database | undefined;

function getDatabase(): Database {
  if (!database) {
    const connectionString = process.env.NEXT_PUBLIC_NEON_DATABASE_URL;

    if (!connectionString) {
      throw new Error("NEXT_PUBLIC_NEON_DATABASE_URL is not configured.");
    }

    database = drizzle(connectionString);
  }

  return database;
}

export const db = new Proxy({} as Database, {
  get(_target, property) {
    const instance = getDatabase();
    const value = Reflect.get(instance, property, instance);

    return typeof value === "function" ? value.bind(instance) : value;
  },
});
