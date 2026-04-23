import { getTranslations } from "next-intl/server";
import type { ReactNode } from "react";
import { Link } from "@/i18n/navigation";
import { signOut } from "@/app/[locale]/admin/actions";
import { AdminSnackbarProvider } from "@/components/admin/admin-snackbar";
import { cn } from "@/lib/utils";

export default async function AdminLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations();

  const links = [
    { href: "/admin", label: t("admin.title") },
    { href: "/admin/profile", label: t("admin.profile") },
    { href: "/admin/stack", label: t("admin.stack") },
    { href: "/admin/experiences", label: t("admin.experiences") },
    { href: "/admin/projects", label: t("admin.projects") },
  ] as const;

  return (
    <AdminSnackbarProvider>
      <div className="bg-surface text-on-surface min-h-screen">
        <div className="mx-auto flex max-w-7xl flex-col gap-10 px-6 py-10 md:flex-row md:px-8">
          <aside className="md:w-56">
            <div className="font-headline text-primary-fixed-dim mb-8 text-xs tracking-[0.3em] uppercase">
              Admin
            </div>
            <nav className="font-headline flex flex-col gap-3 text-sm">
              {links.map((l) => (
                <Link
                  className="text-on-surface-variant hover:text-primary-container transition-colors"
                  href={l.href}
                  key={l.href}
                >
                  {l.label}
                </Link>
              ))}
            </nav>
            <form action={signOut.bind(null, locale)} className="mt-10">
              <button
                className="border-outline-variant/20 font-headline text-on-surface-variant hover:border-primary-container hover:text-primary-container w-full rounded-sm border px-4 py-2 text-xs tracking-widest uppercase"
                type="submit"
              >
                {t("admin.signOut")}
              </button>
            </form>
          </aside>
          <main className={cn("bg-surface-container-low flex-1 rounded-sm p-8")}>
            {children}
          </main>
        </div>
      </div>
    </AdminSnackbarProvider>
  );
}
