import { NavTabs } from "@/components/ui/custom/tab/navtabs"
import { type TabItem } from "@/components/ui/custom/tab/line-tabs"
import { Suspense } from "react"
import { AppCalender } from "@/components/ui/custom/calender/appcalender"

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
    const calendarEvents = [
        { date: "2026-09-10" },
        { date: "2026-09-10" },
        { date: "2026-09-15" },
        { date: "2026-09-20" },
    ]

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
                    <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
                        <div>
                            {children}
                        </div>
                        <div className="lg:sticky lg:top-24 lg:self-start flex justify-center" >
                            <Suspense>
                                <AppCalender events={calendarEvents} />
                            </Suspense>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}