import { Card13 } from "@/components/flx/patterns/card/card-13";

export default function EventsPage() {
    return (
        <div className="min-h-dvh bg-background text-foreground lg:mx-20 md:mx-15 mx-5">
            <div className="mx-auto w-full max-w-7xl px-4 pb-8 pt-24 sm:px-6 lg:px-8">
                <div className="space-y-1">
                    <h1 className="text-2xl font-semibold tracking-tight">
                        Events
                    </h1>
                    <Card13 />
                    <p className="text-sm text-muted-foreground">
                        Discover upcoming events.
                    </p>
                </div>
            </div>
        </div>
    )
}