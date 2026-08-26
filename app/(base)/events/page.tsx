"use client";

import * as React from "react";
import { EventCarousel, EventCarouselItem, type EventCardData } from "@/components/events/cardcarousel";
import { EventCard } from "@/components/events/card/eventcard";
import { KeywordCombobox, type KeywordOption } from "@/components/ui/custom/keyword-combobox";

const keywordOptions: KeywordOption[] = [
    { value: "design", label: "Design" },
    { value: "technology", label: "Technology" },
    { value: "business", label: "Business" },
    { value: "web-dev", label: "Web Dev" },
];

async function loadKeywordOptions(query: string) {
    return keywordOptions.filter((option) =>
        option.label.toLowerCase().includes(query.toLowerCase())
    );
}

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
    const [selectedKeywords, setSelectedKeywords] = React.useState<string[]>([])

    return (
        <div className="min-h-dvh bg-background text-foreground md:mx-15 mx-5">
            <div className="mx-auto w-full max-w-[100rem] pb-4 pt-24 px-2 sm:px-8 lg:px-9">
                <div className="space-y-1">
                    <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">
                        Events
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        Discover upcoming events.
                    </p>
                </div>
                <div className="space-y-6 mt-8">
                    <KeywordCombobox
                        loadOptionsAction={loadKeywordOptions}
                        value={selectedKeywords}
                        onValueChangeAction={setSelectedKeywords}
                        placeholder="Search event keywords"
                        className="w-full max-w-sm"
                    />

                    <EventCarousel title="Upcoming Events" url="/">
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
                                    href={`/events/${event.id}`}
                                    actions={['save', 'preview']}
                                />
                            </EventCarouselItem>
                        ))}
                    </EventCarousel>
                </div>
            </div>
        </div>
    )
}