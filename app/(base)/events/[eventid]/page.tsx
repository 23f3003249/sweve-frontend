import EventMenu from "@/components/ui/custom/menu/eventmenu";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Settings, CalendarDays, MapPin, Users, Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { EventCardData } from "@/components/base/events/cardcarousel";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { AppMap } from "@/components/ui/custom/map/appmap";
import { FeaturedPeople } from "@/components/ui/custom/carousel/featuredpeople";
import EventPartners, { EventPartner } from "@/components/ui/custom/eventpatners";
import { FaqsAccordion } from "@/components/ui/custom/accordion/faq/eventfaq";
import HostedBy, { HostedByData } from "@/components/ui/custom/host/hostedby";
import CoHost, { CoHostData } from "@/components/ui/custom/host/cohost";

const events: EventCardData[] = [
  {
    id: "event-1",
    title: "Internal Event 1",
    imageSrc: "https://images.unsplash.com/photo-1675794211521-97136b75e3bf?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Internal Event 1",
    date: "Nov 10, 2027",
    eventTime: "10:00 AM - 6:00 PM",
    location: "San Francisco, CA",
    venue: "Moscone Center",
    latitude: 37.7749,
    longitude: -122.4194,
    price: "$455",
    category: "DESIGN",
    registerUrl: "/events/event-1/register",
    eventTag: "Featured",
    organizedBy: "TechCorp",
    description: "Join us for an exciting event featuring industry experts, networking opportunities, and hands-on workshops. This event brings together professionals from various backgrounds to share knowledge and build connections. Learn about the latest trends in design and technology while connecting with like-minded individuals.",
    featuredPeople: [
      { name: "Alex Morgan", designation: "Judge", imageSrc: "https://picsum.photos/seed/alex-morgan/400/400" },
      { name: "Priya Shah", designation: "Guest", imageSrc: "https://picsum.photos/seed/priya-shah/400/400" },
      { name: "Jordan Lee", designation: "Team member", imageSrc: "https://picsum.photos/seed/jordan-lee/400/400" },
      { name: "Maya Chen", designation: "Guest", imageSrc: "https://picsum.photos/seed/maya-chen/400/400" },
      { name: "Sam Rivera", designation: "Team member", imageSrc: "https://picsum.photos/seed/sam-rivera/400/400" },
    ],
  },
]

const eventPartners: EventPartner[] = [
  { name: "Microsoft", title: "Gold Sponsor", imageSrc: "https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?auto=format&fit=crop&w=400&q=80", order: 1 },
  { name: "Infosys", title: "Silver Sponsor", imageSrc: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=400&q=80", order: 2 },
  { name: "Google", title: "Platinum Sponsor", imageSrc: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=400&q=80", order: 3 },
  { name: "Amazon Web Services", title: "Cloud Partner", imageSrc: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=400&q=80", order: 4 },
]

const eventFaqs = [
  {
    question: "What is the event about?",
    answer: "This event is about showcasing the latest trends in design and technology, featuring industry experts and networking opportunities."
  },
  {
    question: "Who can attend the event?",
    answer: "The event is open to professionals, students, and enthusiasts interested in design and technology."
  },
  {
    question: "How can I register for the event?",
    answer: "You can register for the event by clicking on the 'Register' button on the event page and filling out the registration form."
  },
  {
    question: "Is there a virtual attendance option?",
    answer: "Yes, we offer a virtual attendance option with live streaming of all sessions and virtual networking opportunities."
  },
  {
    question: "What is the refund policy?",
    answer: "Full refunds are available up to 30 days before the event. After that, we offer a 50% refund up to 7 days before the event."
  },
  {
    question: "Will recordings be available after the event?",
    answer: "Yes, all sessions will be recorded and made available to registered attendees within 2 weeks after the event."
  },
]

const eventHost: HostedByData = {
  name: "TechCorp",
  logoSrc: "https://picsum.photos/seed/techcorp/200/200",
  href: "/organizations/techcorp",
}

const eventCoHosts: CoHostData[] = [
  { name: "GitHub", logoSrc: "https://picsum.photos/seed/github/200/200", href: "https://github.com" },
  { name: "Google", logoSrc: "https://picsum.photos/seed/google/200/200", href: "https://google.com" },
  { name: "X", logoSrc: "https://picsum.photos/seed/x/200/200", href: "https://x.com" },
]

type Props = {
  params: Promise<{
    eventid: string
  }>
}

async function EventPageContent({ params }: Props) {
  const { eventid } = await params
  const event = events.find(e => e.id === eventid) || events[0]

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center gap-2.5">
        <Badge className="text-sm">{event.category}</Badge>
      </div>

      <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-white">{event.title}</h1>

      <div className="flex flex-wrap items-center gap-5 text-sm md:text-base text-white">
        <div className="flex items-center gap-2">
          <CalendarDays className="size-4 shrink-0" />
          <span>{event.date}</span>
        </div>
        <div className="flex items-center gap-2">
          <MapPin className="size-4 shrink-0" />
          <span>{event.location}</span>
        </div>
        {event.organizedBy && (
          <Link href="/organizations" className="flex items-center gap-2">
            <Users className="size-4 shrink-0" />
            <span className="font-semibold">By {event.organizedBy}</span>
          </Link>
        )}
      </div>
      <div className="flex flex-wrap items-center gap-2.5">
        {event.eventTag && <Badge variant="secondary" className="text-sm">{event.eventTag}</Badge>}
        {event.organizedBy && <Badge variant="secondary" className="text-sm">{event.organizedBy}</Badge>}
      </div>
    </div>
  )
}

function EventDetailsColumns({ event }: { event: EventCardData }) {
  return (
    <section className="mx-auto w-full max-w-6xl px-6 py-14 sm:px-8">
      {/* Primary two-column content: description on the left, image on the right. */}
      <div className="grid grid-cols-1 items-start gap-10 md:grid-cols-2 md:gap-16">
        {/* Left column: event description, separator, and manually editable schedule. */}
        <div className="w-full max-w-2xl space-y-5 text-center md:text-left">
          <h2 className="text-2xl font-semibold tracking-tight">About the Event</h2>
          <p className="leading-relaxed text-muted-foreground">{event.description}</p>
          <div className="flex justify-center">
            <Button variant="outline" className="w-full max-w-1/2">
              <Clock className="mr-2 size-4" />
              View Event Timeline
            </Button>
          </div>

          {/* Separator and Date, Time & Venue remain in the left column. */}
          <Separator className="my-10" />
          <div className="space-y-5">
            <h2 className="text-2xl font-semibold tracking-tight">Date, Time & Venue</h2>
            <div className="space-y-4 text-muted-foreground">
              <div className="flex items-start justify-center gap-3 md:justify-start">
                <CalendarDays className="mt-1 size-5 shrink-0 text-primary" />
                <div className="flex flex-1 items-start justify-between gap-4">
                  <div>
                    <div className="text-lg text-foreground">{event.date}</div>
                    {event.eventTime && <div className="text-sm">{event.eventTime}</div>}
                  </div>
                  <Button variant="outline" size="sm" className="shrink-0">
                    Add to calendar
                  </Button>
                </div>
              </div>
              <div className="flex items-start justify-center gap-3 md:justify-start">
                <MapPin className="mt-1 size-5 shrink-0 text-primary" />
                <div className="flex-1 space-y-3">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="text-foreground">{event.venue ?? event.location}</div>
                      <div>{event.location}</div>
                    </div>
                    {event.latitude !== undefined && event.longitude !== undefined && (
                      <Button variant="outline" size="sm" className="shrink-0">Get direction</Button>
                    )}
                  </div>
                  {event.latitude !== undefined && event.longitude !== undefined && (
                    <div className="h-64 w-full overflow-hidden rounded-lg">
                      <AppMap
                        className="h-full rounded-lg border"
                        events={[{
                          id: event.id,
                          date: event.date,
                          title: event.title,
                          venue: event.venue ?? event.location,
                          latitude: event.latitude,
                          longitude: event.longitude,
                        }]}
                        center={[event.longitude, event.latitude]}
                        zoom={12}
                      />
                    </div>
                  )}
                </div>
              </div>
              <div className="mt-10 space-y-4">
                <h2 className="text-2xl font-semibold tracking-tight text-foreground mb-6">Featured People</h2>
                {event.featuredPeople && <FeaturedPeople people={event.featuredPeople} />}
              </div>
              <div className="mt-10 space-y-4">
                <h2 className="text-2xl font-semibold tracking-tight text-foreground mb-6">Event Partners</h2>
                <EventPartners partners={eventPartners} />
              </div>
              <div className="mt-10 space-y-4">
                <HostedBy host={eventHost} />
              </div>
              <div className="mt-10 space-y-4">
                <CoHost hosts={eventCoHosts} />
              </div>

              <div className="mt-10 space-y-4">
                <h2 className="mb-6 text-2xl font-semibold tracking-tight text-foreground">Frequently Asked Questions</h2>
                <FaqsAccordion faqs={eventFaqs} />
              </div>
            </div>
          </div>
        </div>


        {/* Right column: event image. */}
        <div className="relative aspect-square w-full max-w-md overflow-hidden rounded-xl md:justify-self-start">
          <Image
            src={event.imageSrc}
            alt={event.imageAlt ?? event.title}
            fill
            sizes="(max-width: 768px) 100vw, 28rem"
            className="object-cover"
          />
        </div>
      </div >
    </section >
  )
}

export default function EventPage({ params }: Props) {
  return (
    <>
      <div
        className="relative flex h-[calc(100dvh-12rem)] w-full flex-col justify-between overflow-hidden bg-cover bg-center text-foreground"
        style={{ backgroundImage: `url(${events[0].imageSrc})` }}
      >
        <div className="relative mx-auto flex h-full w-full max-w-[100rem] flex-col justify-between px-4 pb-6 pt-24 sm:px-8 lg:px-9">
          <div className="mt-6 flex items-center justify-between">
            {/* Left side */}
            <Link href="/events" aria-label="Back to events"><ChevronLeft /></Link>

            {/* Right side */}
            <div className="flex gap-4">
              <EventMenu />
              <Link href="/dashboard/overview">
                <Button variant="default"><Settings /></Button>
              </Link>
            </div>
          </div>

          <div className="p-4 pb-6 sm:pl-18 sm:p-15">
            <div className="ml-6 mb-6 sm:ml-8 sm:mb-10">
              <Suspense fallback={<div className="mt-6 text-sm text-muted-foreground">Loading event details...</div>}>
                <EventPageContent params={params} />
              </Suspense>
            </div>
          </div>
        </div>
      </div>
      <EventDetailsColumns event={events[0]} />
    </>
  )
}
