import { neon } from "@neondatabase/serverless";

/** Neon (Postgres) client. Reads DATABASE_URL at call time so a missing value fails loudly. */
export function getSql() {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error("DATABASE_URL is not set");
  return neon(url);
}
