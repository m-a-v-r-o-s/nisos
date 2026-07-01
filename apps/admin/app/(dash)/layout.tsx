import { Sidebar } from "@/components/Sidebar";
import { MobileNav } from "@/components/MobileNav";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { getDictionary } from "@/lib/i18n/server";

export default function DashLayout({ children }: { children: React.ReactNode }) {
  const t = getDictionary();
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-14 items-center justify-between border-b border-slate-200 bg-white px-4 lg:hidden">
          <div className="flex items-center gap-2">
            <MobileNav />
            <span className="font-display font-bold">{t.layout.consoleTitle}</span>
          </div>
          <LanguageSwitcher buttonClassName="border-slate-300 bg-white text-slate-700 hover:bg-slate-50" />
        </header>
        <div className="flex-1 p-5 sm:p-8">{children}</div>
      </div>
    </div>
  );
}
