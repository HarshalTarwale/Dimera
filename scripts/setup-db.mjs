// One-time (safe to re-run) database setup: npm run db:setup
import { neon } from "@neondatabase/serverless";

if (!process.env.DATABASE_URL) {
  console.error("DATABASE_URL is not set (expected in .env.local).");
  process.exit(1);
}

const sql = neon(process.env.DATABASE_URL);

await sql`
  CREATE TABLE IF NOT EXISTS reservations (
    id               uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at       timestamptz NOT NULL DEFAULT now(),
    service          text NOT NULL,
    stylist          text NOT NULL,
    appointment_date date NOT NULL,
    appointment_time text NOT NULL,
    name             text NOT NULL,
    email            text NOT NULL,
    phone            text NOT NULL,
    notes            text,
    status           text NOT NULL DEFAULT 'pending'
  )
`;
await sql`
  CREATE INDEX IF NOT EXISTS reservations_slot_idx
  ON reservations (appointment_date, appointment_time)
`;

const [{ count }] = await sql`SELECT count(*)::int AS count FROM reservations`;
console.log(`reservations table is ready (${count} rows).`);
