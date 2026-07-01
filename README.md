# Nisos Rentals - monorepo

A two-app vehicle-rental platform for a Greek-island rental business:

- **`apps/web`** - public booking website (port **3000**). Browse the fleet by group, see live availability for your dates, book a specific vehicle, and pay a deposit / in full online (Stripe) **or** cash on pickup.
- **`apps/admin`** - operations console / CRM (port **3001**). Dashboard, bookings management, vehicle substitution, payments, fleet & maintenance, customers, and a 14-day availability calendar.
- **`packages/db`** - a shared Prisma data layer (schema, client, seed, availability + pricing logic) used by both apps.

The booking model: a customer books **a specific vehicle**, but every booking carries an *"or a similar vehicle from the same group"* clause, so operations can substitute within the group. A booked vehicle immediately drops out of public availability for those dates.

---

## Quick start

```bash
# from the repo root
npm run setup     # install deps, write .env files, generate client, create + seed the DB
npm run dev       # runs web (:3000) and admin (:3001) together
```

Then open:

- Public site → http://localhost:3000
- CRM → http://localhost:3001 (demo password: **demo1234**)

`npm run setup` runs these in order: `npm install` → `npm run env` → `db:generate` → `db:push` → `db:seed`.

> **Postgres required.** Both apps share one PostgreSQL database. Spin one up locally first, e.g.
> `docker run -d -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=rentals -p 5432:5432 postgres:16-alpine`,
> then run `npm run setup` (its default `DATABASE_URL` points at that container). To use a different
> DB, set `DATABASE_URL` before `npm run setup`, or edit the generated `.env` / `.env.local` files.

---

## Useful scripts (root)

| Script | What it does |
| --- | --- |
| `npm run dev` | Run both apps concurrently |
| `npm run dev:web` / `npm run dev:admin` | Run one app |
| `npm run db:seed` | Re-seed sample data |
| `npm run db:reset` | Wipe + recreate + reseed the database |
| `npm run -w @rentals/db studio` | Open Prisma Studio to inspect data |
| `npm run build` | Production build of both apps |

---

## Payments

The demo runs **with no Stripe account needed** - when no `STRIPE_SECRET_KEY` is set, the online-payment path simulates a successful test charge and confirms the booking.

To use real **Stripe test mode**:

1. Put your test keys in `apps/web/.env.local`:
   ```
   STRIPE_SECRET_KEY="sk_test_…"
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_…"
   STRIPE_WEBHOOK_SECRET="whsec_…"   # from `stripe listen`
   ```
2. Forward webhooks while developing:
   ```
   stripe listen --forward-to localhost:3000/api/stripe/webhook
   ```

The confirmation page also reconciles payment status on return from Checkout, so it works locally even without the webhook.

---

## Deploying to Railway

Both apps are separate services that **share one Postgres**, so a single managed DB is required.

1. **Add the database.** In your Railway project: **New → Database → PostgreSQL**.
2. **Point both services at it.** On the **web** and **admin** services → **Variables**, add
   `DATABASE_URL` = `${{Postgres.DATABASE_URL}}` (Railway variable reference). On **admin** also set
   `ADMIN_PASSWORD`. The build already generates the Prisma client (root `postinstall`).
3. **Create the tables + seed, once.** From your machine, grab the Postgres **public** URL (Postgres
   service → **Connect → Public Network**) and run:
   ```bash
   DATABASE_URL="postgresql://…public-url…" npm run db:push
   DATABASE_URL="postgresql://…public-url…" npm run db:seed
   ```
   (Or `railway run npm run db:push && railway run npm run db:seed` with the Railway CLI linked.)
4. **Redeploy** both services. They now boot with a ready, shared database.

No app code changes are needed to move databases - money is stored as integer cents and all queries go
through Prisma. For real production, also replace the demo cookie auth in `apps/admin`
(`middleware.ts` + `app/login`) with a real provider (NextAuth, Clerk, etc.) and lock down `ADMIN_PASSWORD`.

---

## Project layout

```
packages/db
  prisma/schema.prisma     groups, vehicles, customers, bookings, blocked dates
  prisma/seed.ts           8 groups, ~30 vehicles, sample bookings & customers
  src/constants.ts         statuses, add-ons, locations, brand config
  src/availability.ts      isVehicleAvailable, group availability, day lookups
  src/pricing.ts           buildQuote, amountDueNow, formatMoney
  src/shared.ts            client-safe entry (no Prisma) for "use client" code

apps/web                   public booking site (Next 14 App Router, Tailwind)
apps/admin                 CRM / operations console
```

**Import rule:** server code imports from `@rentals/db`; client components import pure
helpers/constants from `@rentals/db/shared` (this keeps Prisma out of the browser bundle).

---

## Vehicle groups (seed data)

Economy Cars, Compact Cars, SUVs & Crossovers, Scooters 125cc, ATV / Quad, Buggy.
Prices, deposits and the fleet are sample data - edit them in the CRM (Fleet page)
or in `packages/db/prisma/seed.ts`.

---

## Notes / next steps

- Vehicle and group photos are self-hosted under `apps/web/public/fleet` and `apps/web/public/groups`. The homepage hero still uses an Unsplash image (allow-listed in `next.config.mjs`).
- Brand name, contact details and copy live in `packages/db/src/constants.ts` (`BRAND`).
- Real per-group pricing, locations, delivery fee, driver rules and deposit policy
  are placeholders - update `seed.ts` / the Fleet page with the real figures.
