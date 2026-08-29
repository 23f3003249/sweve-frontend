import { EventCarousel, EventCarouselItem, type EventCardData } from "@/components/events/cardcarousel";
import { EventCard } from "@/components/events/card/eventcard";
import { KeywordCombobox, type KeywordItemType } from "@/components/ui/custom/keyword-combobox";


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

const searchItems: KeywordItemType[] = [
    { value: "design", label: "Design" },
    { value: "technology", label: "Technology" },
    { value: "business", label: "Business" },
    { value: "web-dev", label: "Web Dev" },
    { value: "marketing", label: "Marketing" },
    { value: "finance", label: "Finance" },
    { value: "healthcare", label: "Healthcare" },
    { value: "education", label: "Education" },
    { value: "entertainment", label: "Entertainment" },
    { value: "sports", label: "Sports" },
    { value: "travel", label: "Travel" },
    { value: "food", label: "Food" },
    { value: "fashion", label: "Fashion" },
    { value: "art", label: "Art" },
    { value: "music", label: "Music" },
    { value: "photography", label: "Photography" },
    { value: "gaming", label: "Gaming" },
    { value: "science", label: "Science" },
    { value: "politics", label: "Politics" },
    { value: "environment", label: "Environment" },
];


export default function EventsPage() {
    // const itemSearch = React.useCallback(async (
    //   query: string,
    // ): Promise<KeywordItemType[]> => {
    //     console.log(`/auto-complete?q=${query}`);
    //     // Simulate network delay
    //     await new Promise((resolve) => {
    //         setTimeout(resolve, Math.random() * 5000 + 100);
    //     });
        
    //     // Simulate occasional network errors (30% chance)
    //     if (Math.random() < 0.3 || query === 'will_error') {
    //         return Promise.reject(new Error("Network error occurred"));
    //     }
        
    //     return searchItems.filter((item) => {
    //         return item.label.toLowerCase().includes(query.toLowerCase());
    //     });
    // }, [])
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
                <div className="space-y-6 mt-15">
                    <KeywordCombobox
                        queryRedirect
                        items={searchItems}
                        placeholder="Search event or category"
                        className="p-3"
                        redirecturlTemplate="/events/search/?q={query}"
                        redirectmsgTemplate="Search {query} as event"
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