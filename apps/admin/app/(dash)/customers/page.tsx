import { prisma, formatMoney } from "@rentals/db";
import { getDictionary } from "@/lib/i18n/server";
import { format } from "@/lib/i18n/format";
import { CustomerSearch } from "@/components/CustomerSearch";

export const dynamic = "force-dynamic";

export default async function CustomersPage({
  searchParams,
}: {
  searchParams: { q?: string };
}) {
  const t = getDictionary();
  const q = (searchParams.q ?? "").trim();

  // Match every whitespace-separated token against any of name / email / phone,
  // so "maria" or "maria nikolaou" or a phone/email fragment all work.
  const tokens = q.split(/\s+/).filter(Boolean);
  const where = tokens.length
    ? {
        AND: tokens.map((tok) => ({
          OR: [
            { firstName: { contains: tok } },
            { lastName: { contains: tok } },
            { email: { contains: tok } },
            { phone: { contains: tok } },
          ],
        })),
      }
    : {};

  const customers = await prisma.customer.findMany({
    where,
    orderBy: { createdAt: "desc" },
    include: {
      bookings: {
        select: { total: true, amountPaid: true, status: true },
      },
    },
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-ink">{t.customers.title}</h1>
        <p className="text-sm text-slate-500">{format(t.customers.total, { count: customers.length })}</p>
      </div>

      <CustomerSearch initial={q} />

      <div className="card overflow-x-auto">
        <table className="w-full min-w-[640px]">
          <thead className="border-b border-slate-200">
            <tr>
              <th className="th">{t.th.name}</th><th className="th">{t.th.contact}</th>
              <th className="th">{t.th.country}</th><th className="th">{t.th.bookings}</th>
              <th className="th">{t.th.paidToDate}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {customers.map((c) => {
              const active = c.bookings.filter((b) => b.status !== "cancelled").length;
              const paid = c.bookings.reduce((n, b) => n + b.amountPaid, 0);
              return (
                <tr key={c.id} className="hover:bg-slate-50">
                  <td className="td font-medium text-ink">{c.firstName} {c.lastName}</td>
                  <td className="td">
                    <a href={`mailto:${c.email}`} className="text-sea hover:underline">{c.email}</a>
                    {c.phone && <div className="text-xs text-slate-400">{c.phone}</div>}
                  </td>
                  <td className="td text-slate-500">{c.country ?? t.common.dash}</td>
                  <td className="td">{active}</td>
                  <td className="td font-medium">{formatMoney(paid)}</td>
                </tr>
              );
            })}
            {customers.length === 0 && (
              <tr><td colSpan={5} className="px-5 py-10 text-center text-sm text-slate-400">{q ? t.customers.noMatch : t.customers.noCustomers}</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
