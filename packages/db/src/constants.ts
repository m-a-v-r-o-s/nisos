// Single source of truth for enum-like values and business config.
// Imported by both apps and the seed so labels/colors never drift.

export const VEHICLE_KINDS = ["CAR", "ATV", "BUGGY", "MOTO"] as const;
export type VehicleKind = (typeof VEHICLE_KINDS)[number];

export const BOOKING_STATUSES = [
  "pending",
  "confirmed",
  "active",
  "completed",
  "cancelled",
] as const;
export type BookingStatus = (typeof BOOKING_STATUSES)[number];

export const PAYMENT_STATUSES = [
  "pending",
  "deposit_paid",
  "paid",
  "refunded",
] as const;
export type PaymentStatus = (typeof PAYMENT_STATUSES)[number];

export const PAYMENT_METHODS = ["stripe", "cash"] as const;
export type PaymentMethod = (typeof PAYMENT_METHODS)[number];

export const PAYMENT_OPTIONS = ["deposit", "full", "none"] as const;
export type PaymentOption = (typeof PAYMENT_OPTIONS)[number];

// Statuses that occupy a vehicle (block availability) when they overlap dates.
export const BLOCKING_STATUSES: BookingStatus[] = [
  "pending",
  "confirmed",
  "active",
];

// Human labels + UI colors for statuses (used by the CRM).
export const STATUS_META: Record<
  BookingStatus,
  { label: string; color: string }
> = {
  pending: { label: "Pending", color: "amber" },
  confirmed: { label: "Confirmed", color: "blue" },
  active: { label: "Out now", color: "green" },
  completed: { label: "Completed", color: "slate" },
  cancelled: { label: "Cancelled", color: "red" },
};

export const PAYMENT_STATUS_META: Record<
  PaymentStatus,
  { label: string; color: string }
> = {
  pending: { label: "Unpaid", color: "red" },
  deposit_paid: { label: "Deposit paid", color: "amber" },
  paid: { label: "Paid in full", color: "green" },
  refunded: { label: "Refunded", color: "slate" },
};

// Pickup / drop-off locations offered to customers (demo data).
export const LOCATIONS = [
  "Main Office, Kos Town",
  "Kos Airport",
  "Kos Port / Ferry Terminal",
  "Hotel delivery",
] as const;

// Optional rental add-ons (cents/day unless noted).
export type AddOnDef = {
  key: string;
  label: string;
  price: number; // cents
  per: "day" | "rental";
  description: string;
};

export const ADD_ONS: AddOnDef[] = [
  {
    key: "extra_driver",
    label: "Additional driver",
    price: 500,
    per: "day",
    description: "Add a second named driver to the contract.",
  },
  {
    key: "child_seat",
    label: "Child seat",
    price: 400,
    per: "day",
    description: "Group 1/2/3 seat, fitted at pickup.",
  },
  {
    key: "full_insurance",
    label: "Full coverage (zero excess)",
    price: 1200,
    per: "day",
    description: "Waives the security deposit excess.",
  },
  {
    key: "delivery",
    label: "Hotel / port delivery",
    price: 2500,
    per: "rental",
    description: "We bring the vehicle to you and collect it.",
  },
];

// Default share of the total taken as deposit at "deposit now" checkout.
export const DEPOSIT_PERCENT = 0.3;

export const BRAND = {
  name: "Nisos Rentals",
  shortName: "Nisos",
  tagline: "Wheels for the island, on your terms.",
  phone: "+30 22420 00000",
  email: "hello@nisosrentals.gr",
  hours: "Mon-Sun: 08:00 - 21:00",
  address: "Akti Miaouli 5, Kos Town 85300",
  currency: "EUR",
};
