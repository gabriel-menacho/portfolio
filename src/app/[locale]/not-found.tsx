import { getTranslations } from "next-intl/server";

export default async function NotFound() {
  const t = await getTranslations();
  return (
    <main className="mx-auto flex min-h-[50vh] max-w-3xl flex-col justify-center px-8 py-24">
      <h1 className="font-headline text-4xl font-bold tracking-tight">404</h1>
      <p className="text-on-surface-variant mt-4">{t("common.notFound")}</p>
    </main>
  );
}
