// Writes .env files with an ABSOLUTE SQLite path so both apps and the Prisma CLI
// resolve to the same database file regardless of which directory they run from.
// Existing files are left untouched (so your Stripe keys/edits survive re-runs).
import { writeFileSync, existsSync, mkdirSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const dbFile = join(root, "packages", "db", "prisma", "dev.db");
const url = `file:${dbFile}`;

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
    body: `DATABASE_URL="${url}"\nADMIN_PASSWORD="demo1234"\n`,
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
