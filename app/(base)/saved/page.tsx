import { EventCard } from "@/components/base/events/card/eventcard";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
} from "@/components/ui/pagination"
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'


const eventData = [
    { id: "1", title: "Exclusive Event", imageSrc: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80", imageAlt: "Another Great Event", date: "2026-09-20", location: "New York, NY", price: "$150", category: "Concert", registerUrl: "https://example.com/register", },
    { id: "2", title: "Another Great Event", imageSrc: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80", imageAlt: "Another Great Event", date: "2026-09-25", location: "Los Angeles, CA", price: "$200", category: "Art Exhibition", registerUrl: "https://example.com/event/2", },
    { id: "3", title: "Another Great Event", imageSrc: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80", imageAlt: "Another Great Event", date: "2026-09-25", location: "Los Angeles, CA", price: "$200", category: "Art Exhibition", registerUrl: "https://example.com/event/3", },
    { id: "4", title: "Another Great Event", imageSrc: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80", imageAlt: "Another Great Event", date: "2026-09-25", location: "Los Angeles, CA", price: "$200", category: "Art Exhibition", registerUrl: "https://example.com/event/4", },
    { id: "5", title: "Another Great Event", imageSrc: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80", imageAlt: "Another Great Event", date: "2026-09-25", location: "Los Angeles, CA", price: "$200", category: "Art Exhibition", registerUrl: "https://example.com/event/5", },
    { id: "6", title: "Another Great Event", imageSrc: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80", imageAlt: "Another Great Event", date: "2026-09-25", location: "Los Angeles, CA", price: "$200", category: "Art Exhibition", registerUrl: "https://example.com/event/6", },
    { id: "7", title: "Another Great Event", imageSrc: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80", imageAlt: "Another Great Event", date: "2026-09-25", location: "Los Angeles, CA", price: "$200", category: "Art Exhibition", registerUrl: "https://example.com/event/7", },
    { id: "8", title: "Another Great Event", imageSrc: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80", imageAlt: "Another Great Event", date: "2026-09-25", location: "Los Angeles, CA", price: "$200", category: "Art Exhibition", registerUrl: "https://example.com/event/8", },
    { id: "9", title: "Another Great Event", imageSrc: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80", imageAlt: "Another Great Event", date: "2026-09-25", location: "Los Angeles, CA", price: "$200", category: "Art Exhibition", registerUrl: "https://example.com/event/9", },
    { id: "10", title: "Another Great Event", imageSrc: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80", imageAlt: "Another Great Event", date: "2026-09-25", location: "Los Angeles, CA", price: "$200", category: "Art Exhibition", registerUrl: "https://example.com/event/10", },
];

const ITEMS_PER_PAGE = 16;

export default function whistlistPage() {
    return (
        <div className="min-h-dvh bg-background text-foreground md:mx-15 mx-5">
            <div className="mx-auto w-full max-w-[100rem] pb-4 pt-24 px-2 sm:px-8 lg:px-9">
                <div className="space-y-1">
                    <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">
                        My Whislist
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        Don&apos;t miss out on these exclusive experiences.
                    </p>
                </div>
                <div className="mt-15">
                    <h1 className="text-xl md:text-2xl font-semibold mb-4 tracking-tight">Saved Recently</h1>

                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {eventData.slice(0, ITEMS_PER_PAGE).map(event => (
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
                                    actions={['save']}
                                    isBookmarked={true}
                                />
                            </div>

                        ))}
                    </div>
                    <div className="mt-15 mb-20 sm:mb-16 lg:mb-10">
                        <Pagination >
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
                                    <PaginationEllipsis />
                                </PaginationItem>
                                <PaginationItem>
                                    <PaginationLink href="#">10</PaginationLink>
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
        </div>
    );
}
