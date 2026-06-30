import { addDays, isoDay, toDay } from "@rentals/db";

export type SearchDates = {
  from: Date;
  to: Date;
  fromStr: string;
  toStr: string;
  location: string;
};

/** Parse ?from&to&location from the URL, falling back to sensible defaults. */
export function parseDates(sp: {
  [k: string]: string | string[] | undefined;
}): SearchDates {
  const get = (k: string) =>
    Array.isArray(sp[k]) ? (sp[k] as string[])[0] : (sp[k] as string | undefined);

  const fromRaw = get("from");
  const toRaw = get("to");

  let from = fromRaw ? toDay(fromRaw) : addDays(new Date(), 1);
  let to = toRaw ? toDay(toRaw) : addDays(new Date(), 4);
  if (to <= from) to = addDays(from, 3);

  return {
    from,
    to,
    fromStr: isoDay(from),
    toStr: isoDay(to),
    location: get("location") ?? "Main Office, Kos Town",
  };
}

export function dateQuery(d: SearchDates): string {
  const p = new URLSearchParams({
    from: d.fromStr,
    to: d.toStr,
    location: d.location,
  });
  return p.toString();
}
