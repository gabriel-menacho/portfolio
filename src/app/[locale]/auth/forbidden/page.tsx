import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

type Props = { params: Promise<{ locale: string }> };

export default async function ForbiddenPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations();

  return (
    <main className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-6 py-24">
      <h1 className="font-headline text-3xl font-bold tracking-tight">403</h1>
      <p className="text-on-surface-variant mt-3 text-sm">
        {t("auth.forbidden")}
      </p>
      <Link
        className="border-outline-variant/20 font-headline hover:border-primary-container hover:text-primary-container mt-8 inline-flex rounded-sm border px-4 py-2 text-sm"
        href="/"
      >
        Home
      </Link>
      <Link
        className="border-outline-variant/20 font-headline hover:border-primary-container hover:text-primary-container mt-3 inline-flex rounded-sm border px-4 py-2 text-sm"
        href={`/${locale}/auth/login`}
      >
        {t("nav.signIn")}
      </Link>
    </main>
  );
}
