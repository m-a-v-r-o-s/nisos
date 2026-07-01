// Writes .env files pointing both apps and the Prisma CLI at the same Postgres.
// Existing files are left untouched (so your DB URL / Stripe keys survive re-runs).
// Override the default by setting DATABASE_URL before running `npm run env`.
import { writeFileSync, existsSync, mkdirSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
// Local default assumes a Postgres on :5432 (e.g. the docker one-liner in README).
const url =
  process.env.DATABASE_URL ||
  "postgresql://postgres:postgres@localhost:5432/rentals?schema=public";

const targets = [
  {
    path: join(root, "packages", "db", ".env"),
    body: `DATABASE_URL="${url}"\n`,
  },
  {
    path: join(root, "apps", "web", ".env.local"),
    body:
      `DATABASE_URL="${url}"\n` +
      `NEXT_PUBLIC_WEB_URL="http://localhost:3000"\n` +
      `# Add Stripe TEST keys to use real checkout; leave blank for simulated demo checkout.\n` +
      `STRIPE_SECRET_KEY=""\n` +
      `STRIPE_WEBHOOK_SECRET=""\n` +
      `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=""\n`,
  },
  {
    path: join(root, "apps", "admin", ".env.local"),
    body: `DATABASE_URL="${url}"\nADMIN_PASSWORD="admin1234"\n`,
  },
];

for (const t of targets) {
  mkdirSync(dirname(t.path), { recursive: true });
  if (existsSync(t.path)) {
    console.log("• kept existing", t.path.replace(root + "/", ""));
    continue;
  }
  writeFileSync(t.path, t.body);
  console.log("• wrote", t.path.replace(root + "/", ""));
}
console.log("Database URL:", url);
