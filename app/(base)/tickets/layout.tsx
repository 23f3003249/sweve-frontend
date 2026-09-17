import { NavTabs } from "@/components/ui/custom/tab/navtabs"
import { type TabItem } from "@/components/ui/custom/tab/line-tabs"
import { Suspense } from "react"
import { AppCalender } from "@/components/ui/custom/calender/appcalender"
import { AppMap } from "@/components/ui/custom/map/appmap";

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
        { date: "2026-09-15" },
        { date: "2026-09-15" },
        { date: "2026-09-15" },
        { date: "2026-09-15" },
        { date: "2026-09-20" },
    ]
    const mapEvents = [
        {
            id: "1",
            date: "2026-09-20",
            title: "Music Festival",
            venue: "Central Park",
            latitude: 40.7829,
            longitude: -73.9654,
        },
        {
            id: "2",
            date: "2026-09-22",
            title: "Tech Meetup",
            venue: "Brooklyn Expo",
            latitude: 40.6782,
            longitude: -73.9442,
        },
        {
            id: "3",
            date: "2026-09-25",
            title: "Art Exhibition",
            venue: "Manhattan Gallery",
            latitude: 40.7128,
            longitude: -74.006,
        },
    ];
    const currentDate = new Date(calendarEvents[0].date)
    const formattedDate = currentDate.toLocaleDateString("en-US", {
        weekday: "long",
        month: "short",
        day: "numeric",
        year: "numeric",
    })

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
                    <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_350px]">
                        <div>
                            <div className="mb-5 flex items-center gap-4">
                                <span className="shrink-0 text-md font-medium">
                                    {formattedDate}
                                </span>
                                <div className="h-px flex-1 bg-border" />
                            </div>

                            {children}
                        </div>
                        <div className="flex flex-col items-center gap-6">
                            <div className="w-full lg:sticky lg:top-24 ">
                                <Suspense>
                                    <AppCalender events={calendarEvents} />
                                </Suspense>
                                <div className="mt-10 h-100 max-w-75 ">
                                    <AppMap
                                        events={mapEvents}
                                        center={[-74.006, 40.7128]}
                                        zoom={10}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}