"use server";

import { revalidatePath } from "next/cache";
import {
  prisma,
  isVehicleAvailable,
  toDay,
  amountDueNow,
  type BookingStatus,
} from "@rentals/db";

function s(fd: FormData, k: string) {
  return String(fd.get(k) ?? "");
}

export async function setBookingStatus(fd: FormData) {
  const id = s(fd, "id");
  const status = s(fd, "status") as BookingStatus;
  await prisma.booking.update({ where: { id }, data: { status } });
  revalidatePath("/bookings");
  revalidatePath(`/bookings/${id}`);
  revalidatePath("/");
}

/** Substitute the booking onto another vehicle in the same group. */
export async function assignVehicle(fd: FormData) {
  const id = s(fd, "id");
  const vehicleId = s(fd, "vehicleId");

  const booking = await prisma.booking.findUnique({ where: { id } });
  if (!booking) return;

  const vehicle = await prisma.vehicle.findUnique({ where: { id: vehicleId } });
  if (!vehicle || vehicle.groupId !== booking.groupId) {
    revalidatePath(`/bookings/${id}`);
    return; // only same-group swaps allowed
  }

  const free = await isVehicleAvailable(
    vehicleId,
    booking.startDate,
    booking.endDate,
    booking.id,
  );
  if (!free) {
    revalidatePath(`/bookings/${id}`);
    return;
  }

  await prisma.booking.update({ where: { id }, data: { vehicleId } });
  revalidatePath(`/bookings/${id}`);
  revalidatePath("/bookings");
}

export async function updatePayment(fd: FormData) {
  const id = s(fd, "id");
  const action = s(fd, "action"); // mark_deposit | mark_paid | refund

  const booking = await prisma.booking.findUnique({ where: { id } });
  if (!booking) return;

  let data: { amountPaid: number; paymentStatus: string } | null = null;
  if (action === "mark_paid") {
    data = { amountPaid: booking.total, paymentStatus: "paid" };
  } else if (action === "mark_deposit") {
    data = {
      amountPaid: amountDueNow(booking.total, "deposit"),
      paymentStatus: "deposit_paid",
    };
  } else if (action === "refund") {
    data = { amountPaid: 0, paymentStatus: "refunded" };
  }
  if (data) {
    await prisma.booking.update({ where: { id }, data });
    revalidatePath(`/bookings/${id}`);
    revalidatePath("/");
  }
}

export async function cancelBooking(fd: FormData) {
  const id = s(fd, "id");
  await prisma.booking.update({ where: { id }, data: { status: "cancelled" } });
  revalidatePath(`/bookings/${id}`);
  revalidatePath("/bookings");
  revalidatePath("/");
}

export async function saveNotes(fd: FormData) {
  const id = s(fd, "id");
  await prisma.booking.update({ where: { id }, data: { notes: s(fd, "notes") } });
  revalidatePath(`/bookings/${id}`);
}

export async function toggleVehicle(fd: FormData) {
  const id = s(fd, "id");
  const v = await prisma.vehicle.findUnique({ where: { id } });
  if (!v) return;
  await prisma.vehicle.update({ where: { id }, data: { active: !v.active } });
  revalidatePath("/fleet");
}

export async function updateGroupPrice(fd: FormData) {
  const id = s(fd, "id");
  const euros = Number(s(fd, "price"));
  if (!Number.isFinite(euros) || euros <= 0) return;
  await prisma.group.update({
    where: { id },
    data: { pricePerDay: Math.round(euros * 100) },
  });
  revalidatePath("/fleet");
}

export async function addBlock(fd: FormData) {
  const vehicleId = s(fd, "vehicleId");
  const from = s(fd, "from");
  const to = s(fd, "to");
  if (!from || !to) return;
  await prisma.blockedDate.create({
    data: {
      vehicleId,
      startDate: toDay(from),
      endDate: toDay(to),
      reason: s(fd, "reason") || "Maintenance",
    },
  });
  revalidatePath("/fleet");
  revalidatePath("/calendar");
}

export async function removeBlock(fd: FormData) {
  const id = s(fd, "id");
  await prisma.blockedDate.delete({ where: { id } });
  revalidatePath("/fleet");
  revalidatePath("/calendar");
}
