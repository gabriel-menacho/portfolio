import { createServerClient } from "@supabase/ssr";
import createIntlMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { routing } from "@/i18n/routing";
import { env } from "@/lib/env";
import { updateSession } from "@/lib/supabase/middleware";

const intlMiddleware = createIntlMiddleware(routing);

const adminPath = /^\/(en|es|pt)\/admin(\/|$)/;

function githubIdFromUser(
  user: import("@supabase/supabase-js").User | null,
): string | null {
  if (!user) return null;
  const identities = user.identities ?? [];
  const gh = identities.find((i) => i.provider === "github");
  return gh?.id ?? null;
}

export async function middleware(request: NextRequest) {
  const response = intlMiddleware(request);
  const sessionResponse = await updateSession(request, response);

  if (adminPath.test(request.nextUrl.pathname)) {
    const supabase = createServerClient(
      env.NEXT_PUBLIC_SUPABASE_URL,
      env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll();
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value }) =>
              request.cookies.set(name, value),
            );
            cookiesToSet.forEach(({ name, value, options }) =>
              sessionResponse.cookies.set(name, value, options),
            );
          },
        },
      },
    );

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      const locale = request.nextUrl.pathname.split("/")[1] ?? "en";
      const url = request.nextUrl.clone();
      url.pathname = `/${locale}/auth/login`;
      url.searchParams.set("next", request.nextUrl.pathname);
      return NextResponse.redirect(url);
    }

    const allowed = env.ALLOWED_GITHUB_IDS;
    const ghId = githubIdFromUser(user);
    if (allowed.length === 0 || !ghId || !allowed.includes(ghId)) {
      await supabase.auth.signOut();
      const locale = request.nextUrl.pathname.split("/")[1] ?? "en";
      const url = request.nextUrl.clone();
      url.pathname = `/${locale}/auth/forbidden`;
      return NextResponse.redirect(url);
    }
  }

  return sessionResponse;
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
