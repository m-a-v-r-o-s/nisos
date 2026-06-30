import { prisma } from "./client";
import { BLOCKING_STATUSES } from "./constants";
import { rangesOverlap, toDay } from "./dates";

/**
 * Is a specific vehicle free for [start, end]?
 * Occupied if any blocking booking OR maintenance block overlaps the range.
 * `excludeBookingId` lets the CRM edit a booking without it clashing with itself.
 */
export async function isVehicleAvailable(
  vehicleId: string,
  start: Date,
  end: Date,
  excludeBookingId?: string,
): Promise<boolean> {
  const [bookings, blocks] = await Promise.all([
    prisma.booking.findMany({
      where: {
        vehicleId,
        status: { in: BLOCKING_STATUSES },
        ...(excludeBookingId ? { id: { not: excludeBookingId } } : {}),
      },
      select: { startDate: true, endDate: true },
    }),
    prisma.blockedDate.findMany({
      where: { vehicleId },
      select: { startDate: true, endDate: true },
    }),
  ]);

  const clash = [...bookings, ...blocks].some((b) =>
    rangesOverlap(start, end, b.startDate, b.endDate),
  );
  return !clash;
}

export type VehicleAvailability = {
  vehicleId: string;
  available: boolean;
};

/** Availability for every active vehicle in a group over a range. */
export async function getGroupVehicleAvailability(
  groupId: string,
  start: Date,
  end: Date,
): Promise<VehicleAvailability[]> {
  const vehicles = await prisma.vehicle.findMany({
    where: { groupId, active: true },
    select: {
      id: true,
      bookings: {
        where: { status: { in: BLOCKING_STATUSES } },
        select: { startDate: true, endDate: true },
      },
      blockedDates: { select: { startDate: true, endDate: true } },
    },
  });

  return vehicles.map((v) => {
    const clash = [...v.bookings, ...v.blockedDates].some((b) =>
      rangesOverlap(start, end, b.startDate, b.endDate),
    );
    return { vehicleId: v.id, available: !clash };
  });
}

/** How many vehicles in a group are free for a range (drives "X left" badges). */
export async function countGroupAvailability(
  groupId: string,
  start: Date,
  end: Date,
): Promise<{ total: number; available: number }> {
  const list = await getGroupVehicleAvailability(groupId, start, end);
  return {
    total: list.length,
    available: list.filter((v) => v.available).length,
  };
}

/** Bookings that overlap a single calendar day - for the CRM dashboard/calendar. */
export async function bookingsOnDay(day: Date) {
  const d = toDay(day);
  return prisma.booking.findMany({
    where: {
      status: { in: BLOCKING_STATUSES },
      startDate: { lte: d },
      endDate: { gte: d },
    },
    include: { vehicle: true, customer: true, group: true },
    orderBy: { startDate: "asc" },
  });
}
