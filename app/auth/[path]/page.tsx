import { viewPaths } from "@better-auth-ui/core"
import { Suspense } from "react"
import { notFound } from "next/navigation"

import { Auth } from "@/components/auth/auth"

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

  if (!Object.values(viewPaths.auth).includes(path)) {
    notFound()
  }

  return (
    <div className="flex justify-center my-auto p-4 md:p-6">
      <Auth path={path} />
    </div>
  )
}