"use client"
import { EventCarousel, EventCarouselItem } from "@/components/examples/c-carousel-4";
import { EventCard } from "@/components/flx/patterns/card/eventcard";

type Event = {
    id: string
    title: string
    imageSrc: string
    imageAlt?: string
    date: string
    location: string
    price: string
    category: string
}

const events: Event[] = [
    {
        id: "event-1",
        title: "Internal Event 1",
        imageSrc: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80",
        imageAlt: "Internal Event 1",
        date: "Nov 10, 2027",
        location: "San Francisco, CA",
        price: "$455",
        category: "DESIGN",
    },
]

export default function EventsPage() {
    const handleRegister = (event: Event) => {
        console.log("Register:", event.id)
        // Later:
        // router.push(`/events/${event.id}/register`)
    }
    const handleSave = (event: Event) => {
        console.log("Save:", event.id)
        // Later:
        // API call to save the event
    }
    const handlePreview = (event: Event) => {
        console.log("Preview:", event.id)
        // Later:
        // Open your preview Dialog
    }

    return (
        <div className="min-h-dvh bg-background text-foreground lg:mx-20 md:mx-15 mx-5">
            <div className="mx-auto w-full max-w-7xl px-4 pb-8 pt-24 sm:px-6 lg:px-8">
                <div className="space-y-1">
                    <h1 className="text-2xl font-semibold tracking-tight">
                        Events
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        Discover upcoming events.
                    </p>
                </div>
                <div className="mt-8">
                    <EventCarousel>
                        {events.map((event) => (
                            <EventCarouselItem key={event.id}>
                                <EventCard
                                    id={event.id}
                                    title={event.title}
                                    imageSrc={event.imageSrc}
                                    imageAlt={event.imageAlt}
                                    category={event.category}
                                    date={event.date}
                                    location={event.location}
                                    price={event.price}
                                    actions={[
                                        {
                                            type: "register",
                                            label: "REGISTER",
                                            onClick: () => handleRegister(event),
                                        },
                                        {
                                            type: "save",
                                            label: "Save event",
                                            onClick: () => handleSave(event),
                                        },
                                        {
                                            type: "preview",
                                            label: "Preview event",
                                            onClick: () => handlePreview(event),
                                        },
                                    ]}
                                />
                            </EventCarouselItem>
                        ))}
                    </EventCarousel>
                </div>
                <div>
                </div>
            </div>
        </div>
    )
}