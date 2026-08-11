import { backendUrl } from "./env/env";
import { sessionCookieName } from "./env/env.public";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { cacheLife, cacheTag } from 'next/cache';

/**
 * Fetches the session data from the backend using the provided session cookie. 
 * @Cached `Tag: user-session` Can be used outside suspense boundaries. But for `await cookie()` it might be still needed.
 * @param session_cookie - The session cookie value. Do not include the "better-auth.session_token=" prefix; only provide the token value.
 * @returns A promise that resolves to the session data {session, user} or null if the request fails.
 */
export async function fetchSession(session_cookie: string): Promise<{ session: any; user: any } | null> {
    "use cache"
    cacheLife({
      stale: 300,      // 5 minutes (Serve instantly on client navigations)
      revalidate: 300, // 5 minutes (Trigger backend refresh after 5 mins)
      expire: 600,     // 10 minutes (Hard delete from server memory if inactive)
    })
    cacheTag('user-session') // Tag for session-related cache entries

    const response = await fetch(`${backendUrl}/api/auth/get-session`, {
        method: 'GET',
        headers: {
            'Cookie': `${sessionCookieName}=${session_cookie};`,
        },
    });

    if (response.ok) {
        return response.json();
    }

    return null;
}

/**
 * Retrieves the current session and user data from the backend using the session cookie stored in the request headers.
 * @returns A promise that resolves to the session data {session, user} or null if the request fails or no session cookie is found.
 */
export async function getSession(): Promise<{ session: any; user: any } | null> {
    const cookiestore = await cookies()
    const session = await fetchSession(cookiestore.get(sessionCookieName)?.value!)

    return session
}

/**
 * Ensures a session object is returned. Checks user session from cookies and redirected to specified URL if not authenticated.
 * @uses getSession() to fetch the session data.
 * @param redirectUrl - The URL to redirect to if the user is not authenticated. Defaults to `/auth/sign-in`.
 * @example
 * // Redirects to an error page if the user is not authenticated. Skips authentication.
 * const { session, user } = await ensureSession({ redirectUrl: '/unauthorized' });
 * @param authRedirectUrl - The URL to redirect to after successful authentication. Defaults to `/`.
 * @example
 * // Will redirect to sign in page and redirects to the home page after successful authentication
 * const { session, user } = await ensureSession({ authRedirectUrl: '/' });
 * @default redirectUrl = "/auth/sign-in?redirectTo=/"
 * @default authRedirectUrl = "/"
 */
export async function ensureSession(
    { redirectUrl, authRedirectUrl }: { redirectUrl?: string; authRedirectUrl?: string } = {}
): Promise<{ session: any; user: any }> {

    const session = await getSession()
    if (!session) redirect(redirectUrl || `/auth/sign-in?redirectTo=${authRedirectUrl || encodeURIComponent('/')}`)

    return session
}

/**
 * Checks if the user is authenticated.
 * @uses getSession() to fetch the session data.
 * @returns A promise that resolves to true if the user is authenticated, or false otherwise.
 */
export const isAuthenticated = async ():Promise<boolean> => await getSession() !== null
