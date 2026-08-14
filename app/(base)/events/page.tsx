import { EventCarousel, EventCarouselItem, type EventCardData } from "@/components/events/cardcarousel";
import { EventCard } from "@/components/events/card/eventcard";

const events: EventCardData[] = [
    {
        id: "event-1",
        title: "Internal Event 1",
        imageSrc: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80",
        imageAlt: "Internal Event 1",
        date: "Nov 10, 2027",
        location: "San Francisco, CA",
        price: "$455",
        category: "DESIGN",
        registerUrl: "/events/event-1/register"
    },
    {
        id: "event-2",
        title: "Internal Event 2",
        imageSrc: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80",
        imageAlt: "Internal Event 2",
        date: "Nov 10, 2027",
        location: "San Francisco, CA",
        price: "$455",
        category: "DESIGN",
        registerUrl: "/events/event-2/register"
    },
    {
        id: "event-3",
        title: "Internal Event 3",
        imageSrc: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80",
        imageAlt: "Internal Event 3",
        date: "Nov 10, 2027",
        location: "San Francisco, CA",
        price: "$455",
        category: "DESIGN",
        registerUrl: "/events/event-3/register"
    },
    {
        id: "event-4",
        title: "Internal Event 4",
        imageSrc: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80",
        imageAlt: "Internal Event 4",
        date: "Nov 10, 2027",
        location: "San Francisco, CA",
        price: "$455",
        category: "DESIGN",
        registerUrl: "/events/event-4/register"
    },
]

export default function EventsPage() {

    return (
        <div className="min-h-dvh bg-background text-foreground lg:mx-10 md:mx-12 mx-5">
            <div className="mx-auto w-full h max-w-7xl px-2 pb-4 pt-24 sm:px-8 lg:px-9">
                <div className="space-y-1">
                    <h1 className="text-2xl font-semibold tracking-tight">
                        Events
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        Discover upcoming events.
                    </p>
                </div>
                <div className="mt-8">
                    <EventCarousel title="Upcoming Events">
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
                                    registerUrl={`/events/${event.id}/register`}
                                    actions={['save', 'preview']}
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