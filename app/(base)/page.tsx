import HeroCarousel, { type HeroCarouselSlide, } from "@/components/base/herocarousel";
import { EventCard } from "@/components/events/card/eventcard";
import { EventCardData, EventCarousel, EventCarouselItem } from "@/components/events/cardcarousel";

export default function Home() {
  const heroSlides: HeroCarouselSlide[] = [
    {
      id: "hero-1",
      imageSrc:
        "https://images.unsplash.com/photo-1504384308090-c894fdcc538d",
      imageAlt: "People working in a modern office",
      eventType: "CONFERENCE",
      dateTime: "Nov 15, 2024 • 10:00 AM",
      title: "Tech Innovation Summit 2024",
      location: "San Francisco, CA",
      description: "Connect with builders and leaders shaping the next generation of technology.",
      registerUrl: "/events/tech-summit-2024/register",
      price: "$299",
    },
    {
      id: "hero-2",
      imageSrc:
        "https://images.unsplash.com/photo-1675794211521-97136b75e3bf",
      imageAlt: "Abstract 3D artwork",
      eventType: "WORKSHOP",
      dateTime: "Dec 3, 2024 • 2:00 PM",
      title: "AI & Machine Learning Workshop",
      location: "New York, NY",
      description: "Build practical skills with hands-on sessions led by AI practitioners.",
      registerUrl: "/events/ai-workshop/register",
      price: "$199",
    },
  ];

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

  return (
    <div className="flex flex-col flex-1 min-h-dvh bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full flex-col justify-between bg-background">
        <div className="relative h-[calc(100dvh-12rem)] w-full">
          <HeroCarousel slides={heroSlides} />
        </div>
      </main>
      <section className="mx-5 md:mx-15">
        <div className="mx-auto w-full max-w-[100rem] px-2 pb-4 pt-24 sm:px-7 lg:px-9">
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
                  href={`/events/${event.id}`}
                  actions={["save", "preview"]}
                />
              </EventCarouselItem>
            ))}
          </EventCarousel>
        </div>
      </section>
    </div>
  );
}
