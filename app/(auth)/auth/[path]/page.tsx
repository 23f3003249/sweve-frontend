import { viewPaths } from "@better-auth-ui/core"
import { Suspense } from "react"
import { notFound } from "next/navigation"

import { Auth } from "@/components/auth/auth"
import { phoneNumberPlugin } from "@/lib/auth/phone-number-plugin"
import { twoFactorPlugin } from "@/lib/auth/two-factor-plugin"

const phoneNumberAuthPlugin = phoneNumberPlugin({ signIn: false })
const twoFactorAuthPlugin = twoFactorPlugin()

const validAuthPaths = new Set(
  [
    ...Object.values(viewPaths.auth),
    ...(
      Object.keys(phoneNumberAuthPlugin.views.auth) as Array<
        keyof typeof phoneNumberAuthPlugin.viewPaths.auth
      >
    ).map((key) => phoneNumberAuthPlugin.viewPaths.auth[key]),
    ...(
      Object.keys(twoFactorAuthPlugin.views.auth) as Array<
        keyof typeof twoFactorAuthPlugin.viewPaths.auth
      >
    ).map((key) => twoFactorAuthPlugin.viewPaths.auth[key])
  ].filter((path): path is string => typeof path === "string")
)

export function generateStaticParams() {
  console.log("\n /auth/[path]:", Array.from(validAuthPaths))
  return Array.from(validAuthPaths).map((path) => ({ path }))
}

export default function AuthPage({
  params
}: {
  params: Promise<{
    path: string
  }>
}) {
  return (
    <Suspense fallback={<div className="flex justify-center my-auto p-4 md:p-6" />}>
      <AuthPageContent params={params} />
    </Suspense>
  )
}

async function AuthPageContent({
  params
}: {
  params: Promise<{
    path: string
  }>
}) {
  const { path } = await params

  if (!validAuthPaths.has(path)) {
    notFound()
  }

  return (
    <Auth path={path} />
  )

}