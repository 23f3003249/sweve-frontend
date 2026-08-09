import { backendUrl } from "./env/env";
import { cacheLife, cacheTag } from 'next/cache';

/**
 * Fetches the session data from the backend using the provided session cookie. 
 * @Cached `Tag: user-session` Can be used outside suspense boundaries. But for `await cookie()` it might be still needed.
 * @param session_cookie - The session cookie value. Do not include the "better-auth.session_token=" prefix; only provide the token value.
 * @returns A promise that resolves to the session data {session, user} or null if the request fails.
 */
export async function getSession(session_cookie: string) {
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
            'Cookie': `better-auth.session_token=${session_cookie};`,
        },
    });

    if (response.ok) {
        return response.json();
    }

    return null;
}

/**
 * Checks if the user is authenticated.
 * @param session_cookie - The session cookie value. Do not include the "better-auth.session_token=" prefix; only provide the token value.
 * @returns A promise that resolves to true if the user is authenticated, or false otherwise.
 */
export async function isAuthenticated(session_cookie: string) {
    const session = await getSession(session_cookie);
    return session !== null;
}