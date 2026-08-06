"use client"

import { QueryClientProvider } from "@tanstack/react-query"
import { AuthProvider } from "@/components/auth/auth-provider"

import Link from "next/link"
import { useRouter } from "next/navigation"
import type { ReactNode } from "react"
import { deleteUserPlugin } from "@/lib/auth/delete-user-plugin"
import { authClient } from "@/lib/auth-client"
import { getQueryClient } from "@/lib/query-client"

import { themePlugin } from "@/lib/auth/theme-plugin"
import { useTheme } from "next-themes"

export function Providers({ children }: { children: ReactNode }) {
  const router = useRouter()
  const queryClient = getQueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider
        authClient={authClient}
        redirectTo="/settings/account"
        socialProviders={["google", "github"]}
        navigate={({ to, replace }) =>
          replace ? router.replace(to) : router.push(to)
        }
        plugins={[deleteUserPlugin(), themePlugin({ useTheme })]}
        Link={Link}
      >
        {children}

      </AuthProvider>
    </QueryClientProvider>
  )
}