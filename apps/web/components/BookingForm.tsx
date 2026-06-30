"use client";

import { useMemo, useState } from "react";
import {
  ADD_ONS,
  LOCATIONS,
  buildQuote,
  amountDueNow,
  formatMoney,
} from "@rentals/db/shared";
import { createBooking } from "@/app/book/[slug]/actions";
import { useI18n } from "@/lib/i18n/provider";
import { format } from "@/lib/i18n/format";

type Props = {
  vehicleSlug: string;
  vehicleName: string;
  pricePerDay: number;
  deposit: number;
  initialFrom: string;
  initialTo: string;
  initialLocation: string;
  error?: string;
};

export function BookingForm(props: Props) {
  const { t } = useI18n();
  const tf = t.bookingForm;
  const addOnLabels = t.addOns as Record<string, { label: string; description: string }>;
  const unit = (n: number) => (n === 1 ? t.common.day : t.common.days);
  const [from, setFrom] = useState(props.initialFrom);
  const [to, setTo] = useState(props.initialTo);
  const [location, setLocation] = useState(props.initialLocation);
  const [addOns, setAddOns] = useState<string[]>([]);
  const [method, setMethod] = useState<"stripe" | "cash">("stripe");
  const [option, setOption] = useState<"deposit" | "full">("deposit");
  const [submitting, setSubmitting] = useState(false);

  const quote = useMemo(
    () => buildQuote({ pricePerDay: props.pricePerDay, start: from, end: to, addOnKeys: addOns }),
    [props.pricePerDay, from, to, addOns],
  );
  const payOption = method === "cash" ? "none" : option;
  const dueNow = amountDueNow(quote.total, payOption);

  function toggleAddOn(key: string) {
    setAddOns((cur) =>
      cur.includes(key) ? cur.filter((k) => k !== key) : [...cur, key],
    );
  }

  const today = new Date().toISOString().slice(0, 10);

  return (
    <form
      action={createBooking}
      onSubmit={() => setSubmitting(true)}
      className="grid gap-8 lg:grid-cols-[1.5fr_1fr]"
    >
      <input type="hidden" name="vehicleSlug" value={props.vehicleSlug} />

      {/* LEFT: inputs */}
      <div className="space-y-8">
        {props.error && tf.errors[props.error as keyof typeof tf.errors] && (
          <div className="rounded-xl border border-coral/40 bg-coral/10 px-4 py-3 text-sm text-coral">
            {tf.errors[props.error as keyof typeof tf.errors]}
          </div>
        )}

        {/* dates */}
        <fieldset className="space-y-3">
          <legend className="font-display text-lg font-semibold">{tf.datesLegend}</legend>
          <div className="grid gap-3 sm:grid-cols-3">
            <div>
              <label className="label" htmlFor="from">{tf.pickup}</label>
              <input id="from" name="from" type="date" min={today} className="field"
                value={from} onChange={(e) => setFrom(e.target.value)} required />
            </div>
            <div>
              <label className="label" htmlFor="to">{tf.dropoff}</label>
              <input id="to" name="to" type="date" min={from} className="field"
                value={to} onChange={(e) => setTo(e.target.value)} required />
            </div>
            <div>
              <label className="label" htmlFor="location">{tf.location}</label>
              <select id="location" name="location" className="field"
                value={location} onChange={(e) => setLocation(e.target.value)}>
                {LOCATIONS.map((l) => <option key={l} value={l}>{t.locations[l] ?? l}</option>)}
              </select>
            </div>
          </div>
        </fieldset>

        {/* add-ons */}
        <fieldset className="space-y-3">
          <legend className="font-display text-lg font-semibold">{tf.addOnsLegend}</legend>
          <div className="grid gap-2 sm:grid-cols-2">
            {ADD_ONS.map((a) => {
              const checked = addOns.includes(a.key);
              const labels = addOnLabels[a.key];
              return (
                <label key={a.key}
                  className={`flex cursor-pointer items-start gap-3 rounded-xl border p-3 text-sm transition ${
                    checked ? "border-surf bg-surf/5" : "border-line bg-white"
                  }`}>
                  <input type="checkbox" name="addOns" value={a.key} checked={checked}
                    onChange={() => toggleAddOn(a.key)} className="mt-0.5 accent-surf" />
                  <span>
                    <span className="font-medium">{labels?.label ?? a.label}</span>
                    <span className="block text-xs text-ink/55">{labels?.description ?? a.description}</span>
                    <span className="mt-1 block text-xs font-semibold text-sea">
                      {formatMoney(a.price)}{a.per === "day" ? tf.perDaySuffix : tf.flatSuffix}
                    </span>
                  </span>
                </label>
              );
            })}
          </div>
        </fieldset>

        {/* customer */}
        <fieldset className="space-y-3">
          <legend className="font-display text-lg font-semibold">{tf.detailsLegend}</legend>
          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <label className="label" htmlFor="firstName">{tf.firstName}</label>
              <input id="firstName" name="firstName" className="field" required />
            </div>
            <div>
              <label className="label" htmlFor="lastName">{tf.lastName}</label>
              <input id="lastName" name="lastName" className="field" required />
            </div>
            <div>
              <label className="label" htmlFor="email">{tf.email}</label>
              <input id="email" name="email" type="email" className="field" required />
            </div>
            <div>
              <label className="label" htmlFor="phone">{tf.phone}</label>
              <input id="phone" name="phone" className="field" />
            </div>
            <div className="sm:col-span-2">
              <label className="label" htmlFor="country">{tf.country}</label>
              <input id="country" name="country" className="field" />
            </div>
          </div>
        </fieldset>

        {/* payment */}
        <fieldset className="space-y-3">
          <legend className="font-display text-lg font-semibold">{tf.paymentLegend}</legend>
          <input type="hidden" name="paymentMethod" value={method} />
          <input type="hidden" name="paymentOption" value={payOption} />
          <div className="grid gap-2 sm:grid-cols-2">
            <button type="button" onClick={() => setMethod("stripe")}
              className={`rounded-xl border p-4 text-left text-sm transition ${
                method === "stripe" ? "border-surf bg-surf/5" : "border-line bg-white"
              }`}>
              <span className="font-semibold">{tf.payOnline}</span>
              <span className="block text-xs text-ink/55">{tf.payOnlineDesc}</span>
            </button>
            <button type="button" onClick={() => setMethod("cash")}
              className={`rounded-xl border p-4 text-left text-sm transition ${
                method === "cash" ? "border-surf bg-surf/5" : "border-line bg-white"
              }`}>
              <span className="font-semibold">{tf.cash}</span>
              <span className="block text-xs text-ink/55">{tf.cashDesc}</span>
            </button>
          </div>

          {method === "stripe" && (
            <div className="grid gap-2 sm:grid-cols-2">
              <button type="button" onClick={() => setOption("deposit")}
                className={`rounded-xl border p-3 text-left text-sm transition ${
                  option === "deposit" ? "border-sea bg-sea/5" : "border-line bg-white"
                }`}>
                <span className="font-semibold">{tf.depositNow}</span>
                <span className="block text-xs text-ink/55">{tf.depositNowDesc}</span>
              </button>
              <button type="button" onClick={() => setOption("full")}
                className={`rounded-xl border p-3 text-left text-sm transition ${
                  option === "full" ? "border-sea bg-sea/5" : "border-line bg-white"
                }`}>
                <span className="font-semibold">{tf.payFull}</span>
                <span className="block text-xs text-ink/55">{tf.payFullDesc}</span>
              </button>
            </div>
          )}
        </fieldset>
      </div>

      {/* RIGHT: summary */}
      <aside className="lg:sticky lg:top-24 lg:self-start">
        <div className="rounded-xl2 border border-line bg-white p-6 shadow-card">
          <h3 className="font-display text-lg font-semibold">{props.vehicleName}</h3>
          <p className="text-xs uppercase tracking-wide text-ink/45">{tf.summary}</p>

          <dl className="mt-5 space-y-2 text-sm">
            <Row label={format(tf.rentalTimes, { price: formatMoney(props.pricePerDay), days: quote.days, unit: unit(quote.days) })} value={formatMoney(quote.base)} />
            {quote.addOns.map((a) => (
              <Row key={a.key} label={addOnLabels[a.key]?.label ?? a.label} value={formatMoney(a.price)} muted />
            ))}
            <div className="my-3 border-t border-line" />
            <Row label={tf.totalRental} value={formatMoney(quote.total)} bold />
            <Row
              label={method === "cash" ? tf.payAtPickup : option === "deposit" ? tf.depositDueNow : tf.dueNow}
              value={formatMoney(method === "cash" ? quote.total : dueNow)}
              accent
            />
            {method !== "cash" && option === "deposit" && (
              <Row label={tf.balanceAtPickup} value={formatMoney(quote.total - dueNow)} muted />
            )}
          </dl>

          <p className="mt-4 text-xs text-ink/50">
            {format(tf.depositNote, { deposit: formatMoney(props.deposit) })}
          </p>

          <button type="submit" disabled={submitting} className="btn-primary mt-5 w-full">
            {submitting ? tf.processing : method === "cash" ? tf.reserveCash : tf.continuePayment}
          </button>
        </div>
      </aside>
    </form>
  );
}

function Row({
  label, value, bold, accent, muted,
}: {
  label: string; value: string; bold?: boolean; accent?: boolean; muted?: boolean;
}) {
  return (
    <div className="flex items-center justify-between">
      <dt className={muted ? "text-ink/55" : "text-ink/75"}>{label}</dt>
      <dd className={`${bold ? "font-display text-base font-bold" : ""} ${accent ? "font-display text-base font-bold text-sea" : ""}`}>
        {value}
      </dd>
    </div>
  );
}
