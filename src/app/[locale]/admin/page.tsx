import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export default async function AdminHomePage() {
  const t = await getTranslations();

  const cards = [
    { href: "/admin/profile", title: t("admin.profile") },
    { href: "/admin/stack", title: t("admin.stack") },
    { href: "/admin/experiences", title: t("admin.experiences") },
    { href: "/admin/projects", title: t("admin.projects") },
    { href: "/admin/hire-requests", title: t("admin.hireRequests") },
  ] as const;

  return (
    <div>
      <h1 className="font-headline text-3xl font-bold tracking-tight">
        {t("admin.title")}
      </h1>
      <p className="text-on-surface-variant mt-3 max-w-2xl">
        {t("admin.subtitle")}
      </p>
      <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2">
        {cards.map((c) => (
          <Link
            className="bg-surface-container font-headline text-on-surface hover:bg-surface-container-high rounded-sm p-6 text-lg font-semibold transition-colors"
            href={c.href}
            key={c.href}
          >
            {c.title}
          </Link>
        ))}
      </div>
    </div>
  );
}
