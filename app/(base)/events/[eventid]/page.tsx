import Link from "next/link";
import { Suspense } from "react";

type Props = {
  params: Promise<{
    eventid: string
  }>
}

async function EventPageContent({ params }: Props) {
  const { eventid } = await params

  return (
    <>
      <div className="space-y-2">
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">Event: {eventid}</h1>
        <p className="text-sm text-muted-foreground">This is a placeholder event detail page for <strong>{eventid}</strong>. Replace with real data fetching and layout as needed.</p>
      </div>

      <div className="mt-6 flex items-center gap-4">
        <Link href={`/events/${eventid}/register`} className="text-sm font-semibold px-3 py-2 rounded-md bg-primary text-white">Register</Link>
      </div>
    </>
  )
}

export default function EventPage({ params }: Props) {
  return (
    <div className="min-h-dvh bg-background text-foreground md:mx-15 mx-5">
      <div className="mx-auto w-full max-w-[100rem] pb-4 pt-24 px-2 sm:px-8 lg:px-9">
        <div className="mt-6 flex items-center gap-4">
          <Link href="/events" className="text-sm font-medium text-primary underline">Back to Events</Link>
        </div>
        <Suspense fallback={<div className="mt-6 text-sm text-muted-foreground">Loading event details...</div>}>
          <EventPageContent params={params} />
        </Suspense>
      </div>
    </div>
  )
}
