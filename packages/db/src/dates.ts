// Lightweight date helpers so we don't couple the db package to date-fns.
// All availability math works at day granularity in UTC to avoid TZ drift.

export function toDay(input: Date | string): Date {
  const d = typeof input === "string" ? new Date(input) : input;
  return new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()));
}

export function addDays(input: Date | string, n: number): Date {
  const d = toDay(input);
  d.setUTCDate(d.getUTCDate() + n);
  return d;
}

/** Number of rental days between pickup and return (min 1). */
export function rentalDays(start: Date | string, end: Date | string): number {
  const ms = toDay(end).getTime() - toDay(start).getTime();
  const days = Math.round(ms / 86_400_000);
  return Math.max(1, days);
}

/** Inclusive overlap: two date ranges conflict if they touch on any day. */
export function rangesOverlap(
  aStart: Date | string,
  aEnd: Date | string,
  bStart: Date | string,
  bEnd: Date | string,
): boolean {
  return toDay(aStart) <= toDay(bEnd) && toDay(bStart) <= toDay(aEnd);
}

export function formatDay(input: Date | string, locale = "en-GB"): string {
  return toDay(input).toLocaleDateString(locale, {
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}

export function isoDay(input: Date | string): string {
  return toDay(input).toISOString().slice(0, 10);
}
