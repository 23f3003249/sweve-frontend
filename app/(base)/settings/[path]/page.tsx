import { viewPaths } from "@better-auth-ui/core"
import { dehydrate, HydrationBoundary } from "@tanstack/react-query"
import { notFound } from "next/navigation"

import { Settings } from "@/components/auth/settings/settings"
import { getQueryClient } from "@/lib/query-client"
import { ensureSession, getSession } from "@/lib/auth-server"
import { Suspense } from "react"
import { connection } from "next/server"

export function generateStaticParams() {
    return [{ path: "account" }, { path: "security" }]
}

export default async function SettingsPage({
    params
}: {
    params: Promise<{
        path: string
    }>
}) {
    return (
        <Suspense fallback={<div className="flex justify-center my-auto p-4 md:p-6" />}>
            <SettingsPageContent params={params} />
        </Suspense>
    )
}

export async function SettingsPageContent({
    params
}: {
    params: Promise<{
        path: string
    }>
}) {
    const { path } = await params
    
    if (!Object.values(viewPaths.settings).includes(path)) {
        notFound()
    }
    
    // Yet to validate the effects of prefetching session for react-query.
    // const queryClient = getQueryClient()

    // await connection()
    // queryClient.prefetchQuery({
    //     queryKey: ["auth", "getSession"],
    //     queryFn: getSession
    // })
    
    await ensureSession({ authRedirectUrl: encodeURIComponent(`/settings/${path}`) })
    
    return (
        // <HydrationBoundary state={dehydrate(queryClient)}>
            <div className="w-full max-w-3xl mt-15 mx-auto p-4 md:p-6">
                <Settings path={path} />
            </div>
        // </HydrationBoundary>
    )
}