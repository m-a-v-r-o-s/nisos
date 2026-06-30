import { ADD_ONS, DEPOSIT_PERCENT, type PaymentOption } from "./constants";
import { rentalDays } from "./dates";

export type QuoteInput = {
  pricePerDay: number; // cents
  start: Date | string;
  end: Date | string;
  addOnKeys?: string[];
};

export type QuotedAddOn = {
  key: string;
  label: string;
  price: number; // cents, line total
};

export type Quote = {
  days: number;
  pricePerDay: number;
  base: number; // cents
  addOns: QuotedAddOn[];
  addOnsTotal: number; // cents
  total: number; // cents
};

export function buildQuote({
  pricePerDay,
  start,
  end,
  addOnKeys = [],
}: QuoteInput): Quote {
  const days = rentalDays(start, end);
  const base = pricePerDay * days;

  const addOns: QuotedAddOn[] = addOnKeys
    .map((key) => ADD_ONS.find((a) => a.key === key))
    .filter((a): a is (typeof ADD_ONS)[number] => Boolean(a))
    .map((a) => ({
      key: a.key,
      label: a.label,
      price: a.per === "day" ? a.price * days : a.price,
    }));

  const addOnsTotal = addOns.reduce((sum, a) => sum + a.price, 0);

  return {
    days,
    pricePerDay,
    base,
    addOns,
    addOnsTotal,
    total: base + addOnsTotal,
  };
}

/** Amount charged online now, based on the customer's payment choice. */
export function amountDueNow(total: number, option: PaymentOption): number {
  if (option === "full") return total;
  if (option === "deposit") return Math.round(total * DEPOSIT_PERCENT);
  return 0; // cash on pickup
}

export function formatMoney(cents: number, currency = "EUR", locale = "en-IE"): string {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(cents / 100);
}
