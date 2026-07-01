import type { Dictionary } from "@/lib/i18n/dictionaries/en";

// Shared nav items for the desktop sidebar and the mobile drawer.
export const NAV: { href: string; key: keyof Dictionary["nav"]; icon: string }[] = [
  { href: "/", key: "dashboard", icon: "M3 12l9-9 9 9M5 10v10h14V10" },
  { href: "/bookings", key: "bookings", icon: "M4 5h16M4 12h16M4 19h16" },
  { href: "/calendar", key: "calendar", icon: "M4 6h16v14H4zM4 10h16M8 3v4M16 3v4" },
  { href: "/fleet", key: "fleet", icon: "M5 13l1.5-4.5A2 2 0 0 1 8.4 7h7.2a2 2 0 0 1 1.9 1.5L19 13v5H5zM7 18v2M17 18v2" },
  { href: "/customers", key: "customers", icon: "M16 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0zM3 21a7 7 0 0 1 18 0" },
];
