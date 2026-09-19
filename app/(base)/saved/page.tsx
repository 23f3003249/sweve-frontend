import { EventCard } from "@/components/base/events/card/eventcard";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
} from "@/components/ui/pagination"
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'


const eventData = [
    {
        id: "1",
        title: "Exclusive Event",
        imageSrc: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80",
        imageAlt: "Another Great Event",
        date: "2026-09-20",
        location: "New York, NY",
        price: "$150",
        category: "Concert",
        registerUrl: "https://example.com/register",
    },
    {
        id: "2",
        title: "Another Great Event",
        imageSrc: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80",
        imageAlt: "Another Great Event",
        date: "2026-09-25",
        location: "Los Angeles, CA",
        price: "$200",
        category: "Art Exhibition",
        registerUrl: "https://example.com/event/2",
    },
    {
        id: "2",
        title: "Another Great Event",
        imageSrc: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80",
        imageAlt: "Another Great Event",
        date: "2026-09-25",
        location: "Los Angeles, CA",
        price: "$200",
        category: "Art Exhibition",
        registerUrl: "https://example.com/event/2",
    },
    {
        id: "2",
        title: "Another Great Event",
        imageSrc: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80",
        imageAlt: "Another Great Event",
        date: "2026-09-25",
        location: "Los Angeles, CA",
        price: "$200",
        category: "Art Exhibition",
        registerUrl: "https://example.com/event/2",
    }, {
        id: "2",
        title: "Another Great Event",
        imageSrc: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80",
        imageAlt: "Another Great Event",
        date: "2026-09-25",
        location: "Los Angeles, CA",
        price: "$200",
        category: "Art Exhibition",
        registerUrl: "https://example.com/event/2",
    }, {
        id: "2",
        title: "Another Great Event",
        imageSrc: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80",
        imageAlt: "Another Great Event",
        date: "2026-09-25",
        location: "Los Angeles, CA",
        price: "$200",
        category: "Art Exhibition",
        registerUrl: "https://example.com/event/2",
    }, {
        id: "2",
        title: "Another Great Event",
        imageSrc: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80",
        imageAlt: "Another Great Event",
        date: "2026-09-25",
        location: "Los Angeles, CA",
        price: "$200",
        category: "Art Exhibition",
        registerUrl: "https://example.com/event/2",
    }, {
        id: "2",
        title: "Another Great Event",
        imageSrc: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80",
        imageAlt: "Another Great Event",
        date: "2026-09-25",
        location: "Los Angeles, CA",
        price: "$200",
        category: "Art Exhibition",
        registerUrl: "https://example.com/event/2",
    },
];

export default function whistlistPage() {
    return (
        <div className="min-h-dvh bg-background text-foreground md:mx-15 mx-5">
            <div className="mx-auto w-full max-w-[100rem] pb-4 pt-24 px-2 sm:px-8 lg:px-9">
                <div className="space-y-1">
                    <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">
                        My Whistlist
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        Don&apos;t miss out on these exclusive experiences.
                    </p>
                </div>
                <div className="mt-15">
                    <h1>Saved Recently</h1>

                    <div className="grid grid-cols-1 gap-6 mt-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                        {eventData.map(event => (
                            <div key={event.id}>
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
                                    href={`/events/${event.id}`}
                                    actions={['save']} />
                            </div>

                        ))}
                    </div>
                    <Pagination className="mt-10 justify-center">
                        <PaginationContent>
                            <PaginationItem>
                                <PaginationLink href="#" aria-label="Go to previous page" size="icon">
                                    <ChevronLeftIcon className="size-4" />
                                </PaginationLink>
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationLink href="#">1</PaginationLink>
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationLink href="#" isActive>
                                    2
                                </PaginationLink>
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationLink href="#">3</PaginationLink>
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationLink href="#" aria-label="Go to next page" size="icon">
                                    <ChevronRightIcon className="size-4" />
                                </PaginationLink>
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                </div>
            </div>
        </div>
    );
}
