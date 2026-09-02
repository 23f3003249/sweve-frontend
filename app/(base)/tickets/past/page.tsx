import { type TicketCardData } from "@/components/base/ticket/card/ticketcard";
import { TicketCalendarSection } from "@/components/base/ticket/ticket-calendar-section";

export default function TicketPage({
    searchParams,
}: {
    searchParams: Promise<{ date?: string }>
}) {
    return <TicketPageContent searchParams={searchParams} />
}

async function TicketPageContent({
    searchParams,
}: {
    searchParams: Promise<{ date?: string }>
}) {
    const params = await searchParams

    const tickets: TicketCardData[] = [
        {
            id: "ticket-3",
            eventName: "Web Development Bootcamp",
            imageSrc:
                "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80",
            imageAlt: "Web Development",
            eventDate: "Nov 10, 2026",
            eventstartTime: "11:00 AM",
            eventLocation: "Online",
            ticketType: "Standard",
            ticketStatus: "past",
            buyerName: "Alex Chen",
            buyerImageSrc: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80",
            eventType: "online",
        },
        {
            id: "ticket-9",
            eventName: "Cloud Architecture Summit",
            imageSrc:
                "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80",
            imageAlt: "Cloud Architecture Summit",
            eventDate: "Oct 5, 2026",
            eventstartTime: "09:00 AM",
            eventLocation: "Hybrid - San Francisco & Online",
            ticketType: "VIP",
            ticketStatus: "past",
            buyerName: "Alex Chen",
            buyerImageSrc: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80",
            eventType: "hybrid",
        },
        {
            id: "ticket-10",
            eventName: "Mobile Dev Conference",
            imageSrc:
                "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80",
            imageAlt: "Mobile Dev Conference",
            eventDate: "Sep 20, 2026",
            eventstartTime: "10:00 AM",
            eventLocation: "Moscone Center, San Francisco",
            ticketType: "General",
            ticketStatus: "past",
            buyerName: "Alex Chen",
            buyerImageSrc: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80",
            eventType: "inperson",
        }
    ]

    return <TicketCalendarSection tickets={tickets} selectedDateStr={params.date} />
}