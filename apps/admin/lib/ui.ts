import type { BookingStatus, PaymentStatus } from "@rentals/db/shared";

export const STATUS_BADGE: Record<BookingStatus, string> = {
  pending: "bg-amber-100 text-amber-700",
  confirmed: "bg-blue-100 text-blue-700",
  active: "bg-emerald-100 text-emerald-700",
  completed: "bg-slate-100 text-slate-600",
  cancelled: "bg-red-100 text-red-600",
};

export const PAYMENT_BADGE: Record<PaymentStatus, string> = {
  pending: "bg-red-100 text-red-600",
  deposit_paid: "bg-amber-100 text-amber-700",
  paid: "bg-emerald-100 text-emerald-700",
  refunded: "bg-slate-100 text-slate-600",
};
