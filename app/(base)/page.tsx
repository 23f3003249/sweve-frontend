import HeroCarousel, { type HeroCarouselSlide, } from "@/components/events/herocarousel";

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
    {
      id: "hero-3",
      imageSrc:
        "https://images.unsplash.com/photo-1504384308090-c894fdcc538d",
      imageAlt: "Abstract artwork",
      eventType: "MEETUP",
      dateTime: "Jan 20, 2025 • 6:00 PM",
      title: "Developer Community Meetup",
      location: "Austin, TX",
      description: "Share ideas, meet local developers, and grow your professional network.",
      registerUrl: "/events/dev-meetup/register",
      price: "Free",
    },
  ];

  return (
    <div className="flex flex-col flex-1 min-h-dvh bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full flex-col justify-between bg-background">
        <div className="relative h-[calc(100dvh-8rem)] w-full">
          <HeroCarousel slides={heroSlides} />
        </div>
      </main>
    </div>
  );
}
