import { Suspense } from "react"
import { AppCalender } from "@/components/ui/custom/calender/appcalender"
import { AppMap } from "@/components/ui/custom/map/appmap"

export default function SavedLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    const calendarEvents = [
        { date: "2026-09-20" },
        { date: "2026-09-25" },
        { date: "2026-10-15" },
        { date: "2026-11-05" },
        { date: "2026-12-10" },
    ]

    const mapEvents = [
        {
            id: "1",
            date: "2026-09-20",
            title: "Exclusive Event",
            venue: "New York, NY",
            latitude: 40.7128,
            longitude: -74.006,
        },
        {
            id: "2",
            date: "2026-09-25",
            title: "Art Exhibition",
            venue: "Los Angeles, CA",
            latitude: 34.0522,
            longitude: -118.2437,
        },
        {
            id: "3",
            date: "2026-10-15",
            title: "Tech Conference 2026",
            venue: "San Francisco, CA",
            latitude: 37.7749,
            longitude: -122.4194,
        },
        {
            id: "4",
            date: "2026-11-05",
            title: "Music Festival",
            venue: "Austin, TX",
            latitude: 30.2672,
            longitude: -97.7431,
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
                        Saved Events
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        Your bookmarked events in one place.
                    </p>
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
                            <div className="lg:sticky lg:top-24 ">
                                <Suspense>
                                    <AppCalender events={calendarEvents} />
                                </Suspense>
                                <div className="mt-10 h-100 w-75 ">
                                    <AppMap
                                        className="rounded-lg border"
                                        events={mapEvents}
                                        center={[-98.5795, 39.8283]}
                                        zoom={3}
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
