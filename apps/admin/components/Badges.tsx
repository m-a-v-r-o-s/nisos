import { STATUS_BADGE, PAYMENT_BADGE } from "@/lib/ui";
import type { BookingStatus, PaymentStatus } from "@rentals/db/shared";
import { getDictionary } from "@/lib/i18n/server";

export function StatusBadge({ status }: { status: string }) {
  const t = getDictionary();
  const k = status as BookingStatus;
  return (
    <span className={`chip ${STATUS_BADGE[k] ?? STATUS_BADGE.pending}`}>
      {t.status[k] ?? status}
    </span>
  );
}

export function PaymentBadge({ status }: { status: string }) {
  const t = getDictionary();
  const k = status as PaymentStatus;
  return (
    <span className={`chip ${PAYMENT_BADGE[k] ?? PAYMENT_BADGE.pending}`}>
      {t.payment[k] ?? status}
    </span>
  );
}
