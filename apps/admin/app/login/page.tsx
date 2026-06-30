import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { BRAND } from "@rentals/db";
import { ADMIN_COOKIE, ADMIN_COOKIE_VALUE } from "@/lib/auth";
import { getDictionary } from "@/lib/i18n/server";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

async function login(formData: FormData) {
  "use server";
  const password = String(formData.get("password") ?? "");
  const expected = process.env.ADMIN_PASSWORD ?? "demo1234";
  if (password === expected) {
    cookies().set(ADMIN_COOKIE, ADMIN_COOKIE_VALUE, {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 12,
    });
    redirect("/");
  }
  redirect("/login?error=1");
}

export default function LoginPage({
  searchParams,
}: {
  searchParams: { error?: string };
}) {
  const t = getDictionary();
  return (
    <div className="grid min-h-screen place-items-center bg-ink px-4">
      <div className="w-full max-w-sm">
        <div className="mb-6 text-center text-white">
          <div className="font-display text-2xl font-bold">{BRAND.name}</div>
          <div className="text-sm text-white/60">{t.login.opsConsole}</div>
        </div>
        <form action={login} className="card space-y-4 p-6">
          <div>
            <label className="label" htmlFor="password">{t.login.password}</label>
            <input id="password" name="password" type="password" className="field" autoFocus required />
          </div>
          {searchParams.error && (
            <p className="text-sm text-red-600">{t.login.wrongPassword}</p>
          )}
          <button className="btn-primary w-full">{t.login.signIn}</button>
          <p className="text-center text-xs text-slate-400">
            {t.login.demoPassword} <code className="font-mono">demo1234</code>
          </p>
        </form>
        <div className="mt-5 flex justify-center">
          <LanguageSwitcher />
        </div>
      </div>
    </div>
  );
}
