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
      registerUrl: "/events/tech-summit-2024/",
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
      registerUrl: "/events/ai-workshop/",
      price: "$199",
    },
    {
      id: "hero-3",
      imageSrc:
        "https://images.unsplash.com/photo-1540575467063-178a50c2df87",
      imageAlt: "Developer coding on laptop",
      eventType: "HACKATHON",
      dateTime: "Jan 20, 2025 • 9:00 AM",
      title: "Global Hackathon 2025",
      location: "London, UK",
      description: "48 hours of coding, collaboration, and innovation. Open to all skill levels.",
      registerUrl: "/events/global-hackathon-2025/",
      price: "Free",
    },
    {
      id: "hero-4",
      imageSrc:
        "https://images.unsplash.com/photo-1522071820081-009f0129c71c",
      imageAlt: "Conference stage with speaker",
      eventType: "SUMMIT",
      dateTime: "Feb 14, 2025 • 10:00 AM",
      title: "Web3 & Blockchain Summit",
      location: "Singapore",
      description: "Explore the future of decentralized technology with industry pioneers.",
      registerUrl: "/events/web3-blockchain-summit/",
      price: "$449",
    },
    {
      id: "hero-5",
      imageSrc:
        "https://images.unsplash.com/photo-1492684223066-81342ee5ff30",
      imageAlt: "Design team collaborating",
      eventType: "WORKSHOP",
      dateTime: "Mar 8, 2025 • 1:00 PM",
      title: "Design Thinking Bootcamp",
      location: "Berlin, Germany",
      description: "Master human-centered design methodologies in this intensive 3-day workshop.",
      registerUrl: "/events/design-thinking-bootcamp/",
      price: "$599",
    },
    {
      id: "hero-6",
      imageSrc:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71",
      imageAlt: "Data visualization dashboard",
      eventType: "CONFERENCE",
      dateTime: "Apr 5, 2025 • 9:30 AM",
      title: "Data Science Conference 2025",
      location: "Toronto, Canada",
      description: "Latest advances in ML, analytics, and data engineering from top practitioners.",
      registerUrl: "/events/data-science-conf-2025/",
      price: "$399",
    },
  ];

  const events: EventCardData[] = [
    {
      id: "event-1",
      title: "React Conf 2024",
      imageSrc: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=800&q=80",
      imageAlt: "React Conference",
      date: "Oct 15, 2024",
      location: "San Francisco, CA",
      price: "$599",
      category: "TECH",
      registerUrl: "/events/react-conf-2024/"
    },
    {
      id: "event-2",
      title: "Design Systems Summit",
      imageSrc: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?auto=format&fit=crop&w=800&q=80",
      imageAlt: "Design Systems Workshop",
      date: "Oct 22, 2024",
      location: "New York, NY",
      price: "$349",
      category: "DESIGN",
      registerUrl: "/events/design-systems-summit/"
    },
    {
      id: "event-3",
      title: "Node.js Interactive",
      imageSrc: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80",
      imageAlt: "Node.js Conference",
      date: "Nov 5, 2024",
      location: "Austin, TX",
      price: "$449",
      category: "TECH",
      registerUrl: "/events/nodejs-interactive/"
    },
    {
      id: "event-4",
      title: "UX Research Masterclass",
      imageSrc: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=800&q=80",
      imageAlt: "UX Research Workshop",
      date: "Nov 12, 2024",
      location: "Seattle, WA",
      price: "$299",
      category: "DESIGN",
      registerUrl: "/events/ux-research-masterclass/"
    },
    {
      id: "event-5",
      title: "Kubernetes Community Days",
      imageSrc: "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?auto=format&fit=crop&w=800&q=80",
      imageAlt: "Kubernetes Event",
      date: "Nov 19, 2024",
      location: "Chicago, IL",
      price: "$199",
      category: "DEVOPS",
      registerUrl: "/events/k8s-community-days/"
    },
    {
      id: "event-6",
      title: "AI/ML Product Workshop",
      imageSrc: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=80",
      imageAlt: "AI Workshop",
      date: "Dec 3, 2024",
      location: "Boston, MA",
      price: "$399",
      category: "AI",
      registerUrl: "/events/ai-ml-workshop/"
    },
    {
      id: "event-7",
      title: "Frontend Architecture Conference",
      imageSrc: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80",
      imageAlt: "Frontend Architecture",
      date: "Dec 10, 2024",
      location: "Denver, CO",
      price: "$499",
      category: "TECH",
      registerUrl: "/events/frontend-arch-conf/"
    },
    {
      id: "event-8",
      title: "DevOps Days Global",
      imageSrc: "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=800&q=80",
      imageAlt: "DevOps Conference",
      date: "Jan 15, 2025",
      location: "Virtual",
      price: "Free",
      category: "DEVOPS",
      registerUrl: "/events/devops-days-global/"
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
