import { NavTabs } from "@/components/ui/custom/tab/navtabs"
import { type TabItem } from "@/components/ui/custom/tab/line-tabs"
import { Suspense } from "react"

const navigationTabs: TabItem[] = [
    {
        name: "Upcoming",
        value: "upcoming",
        description: "View your upcoming events",
        href: "/tickets/upcoming",
    },
    {
        name: "Past",
        value: "past",
        description: "View your past events",
        href: "/tickets/past",
    },
    {
        name: "Cancelled",
        value: "cancelled",
        description: "View your cancelled events",
        href: "/tickets/cancelled",
    },
]

export default function BaseLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <div className="min-h-dvh bg-background text-foreground lg:mx-15 md:mx-15 sm:mx-15">
            <div className="mx-auto w-full px-5 pt-24 pb-8 sm:px-8 lg:px-9">
                <div className="space-y-1">
                    <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
                        Tickets
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        View your tickets for events
                    </p>
                    <div className="mt-10">
                        <Suspense>
                            <NavTabs
                                tabs={navigationTabs}
                            />
                        </Suspense>
                    </div>
                    {children}
                </div>
            </div>
        </div>
    )
}