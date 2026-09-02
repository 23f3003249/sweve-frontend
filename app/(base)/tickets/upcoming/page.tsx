import { type TicketCardData } from "@/components/base/ticket/card/ticketcard";
import { TicketCalendarSection } from "@/components/base/ticket/ticket-calendar-section";
import { Suspense } from "react";

export default function TicketPage({
    searchParams,
}: {
    searchParams: Promise<{ date?: string }>
}) {
    return (
        <Suspense fallback={<div className="mt-5 w-full space-y-4">
            <div className="h-48 animate-pulse rounded-lg bg-muted" /></div>}>
            <TicketPageContent searchParams={searchParams} />
        </Suspense>
    )
}

async function TicketPageContent({
    searchParams,
}: {
    searchParams: Promise<{ date?: string }>
}) {
    const params = await searchParams

    const tickets: TicketCardData[] = [
        {
            id: "ticket-1",
            eventName: "Calcutta Hacks 2027",
            imageSrc:
                "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80",
            imageAlt: "Calcutta Hacks",
            eventDate: "September 15, 2026",
            eventstartTime: "09:00 AM",
            eventLocation: "Science City, Kolkata",
            ticketType: "Participant",
            ticketStatus: "upcoming",
            buyerName: "Alex Chen",
            buyerImageSrc: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100&q=80",
            eventType: "inperson",
        },
        {
            id: "ticket-2",
            eventName: "AI & ML Workshop",
            imageSrc:
                "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=80",
            imageAlt: "AI Workshop",
            eventDate: "Dec 3, 2027",
            eventstartTime: "10:00 AM",
            eventLocation: "Online",
            ticketType: "General",
            ticketStatus: "upcoming",
            buyerName: "Alex Chen",
            buyerImageSrc: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80",
            eventType: "online",
        },
        {
            id: "ticket-4",
            eventName: "React Conference 2027",
            imageSrc:
                "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80",
            imageAlt: "React Conference",
            eventDate: "Mar 20, 2027",
            eventstartTime: "09:30 AM",
            eventLocation: "Hybrid - Bangalore & Virtual",
            ticketType: "VIP",
            ticketStatus: "upcoming",
            buyerName: "Alex Chen",
            buyerImageSrc: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=100&q=80",
            eventType: "hybrid",
        },
        {
            id: "ticket-98",
            eventName: "Design Systems Summit",
            imageSrc:
                "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80",
            imageAlt: "Design Systems Summit",
            eventDate: "September 15, 2026",
            eventstartTime: "10:00 AM",
            eventLocation: "Mumbai, India",
            ticketType: "Early Bird",
            ticketStatus: "upcoming",
            buyerName: "Alex Chen",
            buyerImageSrc: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=100&q=80",
            eventType: "inperson",
        },
        {
            id: "ticket-43",
            eventName: "Calcutta Hacks 2027",
            imageSrc:
                "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80",
            imageAlt: "Calcutta Hacks",
            eventDate: "September 15, 2026",
            eventstartTime: "09:00 AM",
            eventLocation: "Science City, Kolkata",
            ticketType: "Participant",
            ticketStatus: "upcoming",
            buyerName: "Alex Chen",
            buyerImageSrc: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100&q=80",
            eventType: "inperson",
        },
        {
            id: "ticket-11",
            eventName: "Calcutta Hacks 2027",
            imageSrc:
                "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80",
            imageAlt: "Calcutta Hacks",
            eventDate: "September 15, 2026",
            eventstartTime: "09:00 AM",
            eventLocation: "Science City, Kolkata",
            ticketType: "Participant",
            ticketStatus: "upcoming",
            buyerName: "Alex Chen",
            buyerImageSrc: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100&q=80",
            eventType: "inperson",
        },
        {
            id: "ticket-16",
            eventName: "Calcutta Hacks 2027",
            imageSrc:
                "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80",
            imageAlt: "Calcutta Hacks",
            eventDate: "September 15, 2026",
            eventstartTime: "09:00 AM",
            eventLocation: "Science City, Kolkata",
            ticketType: "Participant",
            ticketStatus: "upcoming",
            buyerName: "Alex Chen",
            buyerImageSrc: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100&q=80",
            eventType: "inperson",
        },
    ]

    return <TicketCalendarSection tickets={tickets} selectedDateStr={params.date} />
}