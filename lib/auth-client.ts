import { usernameClient } from "better-auth/client/plugins"
import { createAuthClient } from "better-auth/react" // make sure to import from better-auth/react
import { webUrl } from "./env/env.public"

export const authClient =  createAuthClient({
    baseURL: webUrl,
    plugins: [
        usernameClient()
    ]
})