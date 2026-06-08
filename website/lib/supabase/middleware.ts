import { type NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";

/**
 * Refreshes the Supabase auth session on every request and gates
 * the /admin area: unauthenticated visitors are bounced to /admin/login;
 * authenticated visitors hitting /admin/login are bounced to /admin.
 */
export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({ request });

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  const path = request.nextUrl.pathname;
  const isLogin = path === "/admin/login";
  const isAdminArea = path.startsWith("/admin");

  // If Supabase isn't configured or the auth call fails, never take the whole
  // site down with a 500 (MIDDLEWARE_INVOCATION_FAILED). Fail open for public
  // routes; only the /admin gate depends on a working session lookup.
  if (!url || !key) {
    if (isAdminArea && !isLogin) {
      const redirect = request.nextUrl.clone();
      redirect.pathname = "/admin/login";
      return NextResponse.redirect(redirect);
    }
    return response;
  }

  try {
    const supabase = createServerClient(url, key, {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value),
          );
          response = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options),
          );
        },
      },
    });

    // Touch the session so any pending refresh happens server-side.
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (isAdminArea && !isLogin && !user) {
      const redirect = request.nextUrl.clone();
      redirect.pathname = "/admin/login";
      return NextResponse.redirect(redirect);
    }

    if (isLogin && user) {
      const redirect = request.nextUrl.clone();
      redirect.pathname = "/admin";
      return NextResponse.redirect(redirect);
    }

    return response;
  } catch (error) {
    console.error("[middleware] session refresh failed:", error);
    // Auth lookup failed — protect the admin area by bouncing to login,
    // but let every public route render normally.
    if (isAdminArea && !isLogin) {
      const redirect = request.nextUrl.clone();
      redirect.pathname = "/admin/login";
      return NextResponse.redirect(redirect);
    }
    return response;
  }
}
