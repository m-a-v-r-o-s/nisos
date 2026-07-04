import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// ---- helpers -------------------------------------------------------------
const day = (offsetFromToday: number) => {
  const d = new Date();
  d.setUTCHours(0, 0, 0, 0);
  d.setUTCDate(d.getUTCDate() + offsetFromToday);
  return d;
};

const ref = () =>
  "NIS-" +
  Math.random().toString(36).slice(2, 7).toUpperCase().replace(/[01OI]/g, "X");

const slug = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

// ---- group + vehicle definitions ----------------------------------------
// Fleet, specs and photos mirror a real Kos Town rental fleet. Images are
// self-hosted under apps/web/public so the site never depends on a third party.
type V = {
  name: string;
  seats?: number;
  doors?: number;
  transmission?: string;
  fuel?: string;
  engineCc?: number;
  luggage?: number;
  image: string;
};

type G = {
  slug: string;
  name: string;
  kind: string;
  tagline: string;
  description: string;
  pricePerDay: number; // cents
  deposit: number; // cents
  hero: string;
  vehicles: V[];
};

const GROUPS: G[] = [
  {
    slug: "economy",
    name: "Economy Cars",
    kind: "CAR",
    tagline: "Small, thrifty, easy to park",
    description:
      "Compact, fuel-sipping cars that slip into the tightest Kos Town spots. Ideal for couples and short island hops.",
    pricePerDay: 3000,
    deposit: 30000,
    hero: "/fleet/fiat-panda.webp",
    vehicles: [
      { name: "Toyota Aygo", seats: 5, doors: 5, transmission: "manual", fuel: "petrol", luggage: 2, image: "/fleet/toyota-aygo.webp" },
      { name: "Fiat Panda", seats: 5, doors: 5, transmission: "manual", fuel: "petrol", luggage: 2, image: "/fleet/fiat-panda.webp" },
      { name: "Opel Corsa", seats: 5, doors: 5, transmission: "manual", fuel: "petrol", luggage: 2, image: "/fleet/opel-corsa.webp" },
    ],
  },
  {
    slug: "compact",
    name: "Compact Cars",
    kind: "CAR",
    tagline: "A little more room and comfort",
    description:
      "Smarter automatic hatchbacks with space for luggage and relaxed driving across the island.",
    pricePerDay: 4500,
    deposit: 40000,
    hero: "/fleet/citroen-c3.webp",
    vehicles: [
      { name: "Citroen C3", seats: 5, doors: 5, transmission: "automatic", fuel: "petrol", luggage: 2, image: "/fleet/citroen-c3.webp" },
      { name: "Fiat 500c", seats: 4, doors: 3, transmission: "automatic", fuel: "petrol", luggage: 2, image: "/fleet/fiat-500c.webp" },
    ],
  },
  {
    slug: "suv",
    name: "SUVs & Crossovers",
    kind: "CAR",
    tagline: "Space and presence for longer trips",
    description:
      "Higher-riding crossovers and SUVs with room for luggage and confidence on the back roads.",
    pricePerDay: 7000,
    deposit: 60000,
    hero: "/fleet/volkswagen-t-cross.webp",
    vehicles: [
      { name: "Volkswagen T-cross", seats: 5, doors: 5, transmission: "automatic", fuel: "petrol", luggage: 2, image: "/fleet/volkswagen-t-cross.webp" },
      { name: "Fiat 500x", seats: 5, doors: 5, transmission: "automatic", fuel: "petrol", luggage: 2, image: "/fleet/fiat-500x.webp" },
      { name: "Jeep Renegade", seats: 4, doors: 5, transmission: "automatic", fuel: "petrol", luggage: 2, image: "/fleet/jeep-renegade.webp" },
    ],
  },
  {
    slug: "scooter-125",
    name: "Scooters 125cc",
    kind: "MOTO",
    tagline: "Nip between beach and town, A1 licence",
    description:
      "Automatic 125cc scooters: the simplest, cheapest way to dart around the island. A1 licence required.",
    pricePerDay: 1800,
    deposit: 15000,
    hero: "/fleet/piaggio-medley-125cc.webp",
    vehicles: [
      { name: "Piaggio Medley 125cc", seats: 2, transmission: "automatic", fuel: "petrol", engineCc: 125, luggage: 2, image: "/fleet/piaggio-medley-125cc.webp" },
      { name: "Piaggio Liberty 125cc", seats: 2, transmission: "automatic", fuel: "petrol", engineCc: 125, luggage: 2, image: "/fleet/piaggio-liberty-125cc.webp" },
    ],
  },
  {
    slug: "atv",
    name: "ATV / Quad",
    kind: "ATV",
    tagline: "Off the beaten track",
    description:
      "Sure-footed quads for dirt roads, hidden coves and the kind of beaches the buses never reach.",
    pricePerDay: 4000,
    deposit: 25000,
    hero: "/fleet/c-force-450.webp",
    vehicles: [
      { name: "C-FORCE 450L", seats: 2, transmission: "automatic", fuel: "petrol", engineCc: 400, image: "/fleet/c-force-450l.webp" },
      { name: "C-FORCE 450", seats: 2, transmission: "automatic", fuel: "petrol", engineCc: 400, image: "/fleet/c-force-450.webp" },
    ],
  },
  {
    slug: "buggy",
    name: "Buggy",
    kind: "BUGGY",
    tagline: "Open-air island cruising",
    description:
      "Wind in your hair, dust on your shoes, the whole coastline in front of you.",
    pricePerDay: 7500,
    deposit: 40000,
    hero: "/fleet/z-force-800.webp",
    vehicles: [
      { name: "Z-FORCE 800", seats: 2, transmission: "manual", fuel: "petrol", engineCc: 800, image: "/fleet/z-force-800.webp" },
    ],
  },
];

async function main() {
  console.log("Resetting data…");
  await prisma.blockedDate.deleteMany();
  await prisma.booking.deleteMany();
  await prisma.vehicle.deleteMany();
  await prisma.customer.deleteMany();
  await prisma.group.deleteMany();

  console.log("Seeding groups + vehicles…");
  const vehicleIndex: { id: string; groupId: string; name: string }[] = [];

  for (let gi = 0; gi < GROUPS.length; gi++) {
    const g = GROUPS[gi];
    const group = await prisma.group.create({
      data: {
        slug: g.slug,
        name: g.name,
        kind: g.kind,
        tagline: g.tagline,
        description: g.description,
        pricePerDay: g.pricePerDay,
        deposit: g.deposit,
        heroImage: g.hero,
        sortOrder: gi,
      },
    });

    for (let vi = 0; vi < g.vehicles.length; vi++) {
      const v = g.vehicles[vi];
      const created = await prisma.vehicle.create({
        data: {
          groupId: group.id,
          name: v.name,
          slug: slug(`${g.slug}-${v.name}-${vi}`),
          image: v.image,
          plate: `${g.slug.toUpperCase().slice(0, 2)}-${1000 + gi * 100 + vi}`,
          seats: v.seats ?? null,
          doors: v.doors ?? null,
          transmission: v.transmission ?? "n/a",
          fuel: v.fuel ?? "petrol",
          engineCc: v.engineCc ?? null,
          luggage: v.luggage ?? null,
          sortOrder: vi,
        },
      });
      vehicleIndex.push({ id: created.id, groupId: group.id, name: v.name });
    }
  }

  console.log("Seeding customers…");
  const customers = await Promise.all(
    [
      ["Maria", "Nikolaou", "maria.n@example.com", "+30 690 111 2233", "Greece"],
      ["James", "Whitfield", "james.w@example.co.uk", "+44 7700 900123", "United Kingdom"],
      ["Lukas", "Berger", "l.berger@example.de", "+49 151 23456789", "Germany"],
      ["Sofia", "Rossi", "sofia.rossi@example.it", "+39 333 1122334", "Italy"],
      ["Emma", "Andersson", "emma.a@example.se", "+46 70 123 4567", "Sweden"],
    ].map(([firstName, lastName, email, phone, country]) =>
      prisma.customer.create({
        data: { firstName, lastName, email, phone, country },
      }),
    ),
  );

  console.log("Seeding bookings…");
  // a spread of bookings so the CRM dashboard/calendar look alive
  const sampleBookings = [
    { vName: "Toyota Aygo", cust: 0, start: -1, end: 4, method: "stripe", option: "deposit", status: "active" },
    { vName: "Fiat Panda", cust: 1, start: 2, end: 6, method: "cash", option: "none", status: "confirmed" },
    { vName: "Citroen C3", cust: 2, start: 0, end: 3, method: "stripe", option: "full", status: "active" },
    { vName: "Volkswagen T-cross", cust: 3, start: 5, end: 9, method: "stripe", option: "deposit", status: "confirmed" },
    { vName: "Piaggio Liberty 125cc", cust: 4, start: -3, end: 0, method: "cash", option: "none", status: "completed" },
    { vName: "Z-FORCE 800", cust: 1, start: 1, end: 4, method: "stripe", option: "full", status: "confirmed" },
    { vName: "C-FORCE 450L", cust: 0, start: 7, end: 10, method: "cash", option: "none", status: "pending" },
    { vName: "Piaggio Medley 125cc", cust: 2, start: 3, end: 8, method: "stripe", option: "deposit", status: "confirmed" },
  ];

  // minimal inline quote (mirrors pricing.buildQuote, kept dep-free here)
  const groupsBySlug = await prisma.group.findMany();
  const vById = await prisma.vehicle.findMany({ include: { group: true } });

  for (const b of sampleBookings) {
    const vehicle = vById.find((v) => v.name === b.vName);
    if (!vehicle) continue;
    const start = day(b.start);
    const end = day(b.end);
    const days = Math.max(1, Math.round((+end - +start) / 86_400_000));
    const total = vehicle.group.pricePerDay * days;
    const amountPaid =
      b.option === "full" ? total : b.option === "deposit" ? Math.round(total * 0.3) : 0;
    const paymentStatus =
      b.option === "full" ? "paid" : b.option === "deposit" ? "deposit_paid" : "pending";

    await prisma.booking.create({
      data: {
        reference: ref(),
        vehicleId: vehicle.id,
        groupId: vehicle.groupId,
        customerId: customers[b.cust].id,
        startDate: start,
        endDate: end,
        pickupLocation: "Main Office, Kos Town",
        dropoffLocation: "Main Office, Kos Town",
        days,
        pricePerDay: vehicle.group.pricePerDay,
        total,
        deposit: vehicle.group.deposit,
        paymentMethod: b.method,
        paymentOption: b.option,
        amountPaid,
        paymentStatus,
        status: b.status,
      },
    });
  }

  console.log("Seeding maintenance blocks…");
  const serviced = vById.find((v) => v.name === "Opel Corsa");
  if (serviced) {
    await prisma.blockedDate.create({
      data: {
        vehicleId: serviced.id,
        startDate: day(2),
        endDate: day(4),
        reason: "Scheduled service",
      },
    });
  }

  const counts = {
    groups: groupsBySlug.length,
    vehicles: vById.length,
    customers: customers.length,
    bookings: sampleBookings.length,
  };
  console.log("Done:", counts);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
