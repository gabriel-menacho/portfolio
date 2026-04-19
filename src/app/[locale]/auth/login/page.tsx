import { getTranslations } from "next-intl/server";
import { GithubSignIn } from "@/components/auth/github-sign-in";

type Props = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ next?: string }>;
};

export default async function LoginPage({ params, searchParams }: Props) {
  const { locale } = await params;
  const sp = await searchParams;
  const nextPath = sp.next ?? `/${locale}/admin`;
  const t = await getTranslations();

  return (
    <main className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-6 py-24">
      <h1 className="font-headline text-3xl font-bold tracking-tight">
        {t("nav.signIn")}
      </h1>
      <p className="text-on-surface-variant mt-3 text-sm">
        Sign in with GitHub to access the admin console.
      </p>
      <div className="mt-10">
        <GithubSignIn label={t("auth.github")} nextPath={nextPath} />
      </div>
    </main>
  );
}
