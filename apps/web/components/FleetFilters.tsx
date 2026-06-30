"use client";

import { useRouter } from "next/navigation";
import { useI18n } from "@/lib/i18n/provider";

type Cat = { kind: string; label: string };

export function FleetFilters({
  dates,
  category,
  transmission,
  categories,
}: {
  dates: { fromStr: string; toStr: string; location: string };
  category?: string;
  transmission?: string;
  categories: Cat[];
}) {
  const router = useRouter();
  const { t } = useI18n();

  function go(nextCategory: string | null, nextTransmission: string | null) {
    const params = new URLSearchParams({
      from: dates.fromStr,
      to: dates.toStr,
      location: dates.location,
    });
    if (nextCategory) params.set("category", nextCategory);
    if (nextTransmission) params.set("transmission", nextTransmission);
    router.push(`/fleet?${params.toString()}`);
  }

  const transmissions = [
    { key: "automatic", label: t.common.auto },
    { key: "manual", label: t.common.manual },
  ];

  return (
    <div className="space-y-3">
      <Row label={t.fleet.vehicleType}>
        <Chip active={!category} onClick={() => go(null, transmission ?? null)}>
          {t.fleet.all}
        </Chip>
        {categories.map((c) => (
          <Chip
            key={c.kind}
            active={category === c.kind}
            onClick={() => go(c.kind, transmission ?? null)}
          >
            {c.label}
          </Chip>
        ))}
      </Row>

      <Row label={t.fleet.gearbox}>
        <Chip active={!transmission} onClick={() => go(category ?? null, null)}>
          {t.fleet.all}
        </Chip>
        {transmissions.map((tr) => (
          <Chip
            key={tr.key}
            active={transmission === tr.key}
            onClick={() => go(category ?? null, tr.key)}
          >
            {tr.label}
          </Chip>
        ))}
      </Row>
    </div>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="mr-1 text-xs font-semibold uppercase tracking-wide text-ink/45">
        {label}
      </span>
      {children}
    </div>
  );
}

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`chip border transition ${
        active
          ? "border-sea bg-sea text-white"
          : "border-line bg-white text-ink/70 hover:bg-sand-2"
      }`}
    >
      {children}
    </button>
  );
}
