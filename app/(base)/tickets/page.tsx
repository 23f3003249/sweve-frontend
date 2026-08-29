"use client"

import { TicketCard, type TicketCardData } from "@/components/base/ticket/card/ticketcard";
import { TicketTab } from "@/components/base/ticket/tickettab"
import { useState } from "react";

export default function TicketPage() {
    const TABS = ["upcoming", "past", "cancelled"] as const;
    const [activeTab, setActiveTab] = useState<typeof TABS[number]>("upcoming")

    const tickets: TicketCardData[] = [
        {
            id: "ticket-1",
            eventName: "Calcutta Hacks 2027",
            imageSrc:
                "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80",
            imageAlt: "Calcutta Hacks",
            eventDate: "Oct 15, 2027",
            eventstartTime: "09:00 AM",
            eventLocation: "Science City, Kolkata",
            ticketType: "Participant",
            ticketStatus: "upcoming",
            buyerName: "Alex Chen",
            buyerImageSrc: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100&q=80",
        },
        {
            id: "ticket-2",
            eventName: "AI & ML Workshop",
            imageSrc:
                "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=80",
            imageAlt: "AI Workshop",
            eventDate: "Dec 3, 2027",
            eventstartTime: "10:00 AM",
            eventLocation: "Kolkata, India",
            ticketType: "General",
            ticketStatus: "upcoming",
            buyerName: "Alex Chen",
            buyerImageSrc: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80",
        },
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
        },
        {
            id: "ticket-9",
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
            buyerImageSrc: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80",
        },
        {
            id: "ticket-4",
            eventName: "React Conference 2027",
            imageSrc:
                "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80",
            imageAlt: "React Conference",
            eventDate: "Mar 20, 2027",
            eventstartTime: "09:30 AM",
            eventLocation: "Bangalore, India",
            ticketType: "VIP",
            ticketStatus: "upcoming",
            buyerName: "Alex Chen",
            buyerImageSrc: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=100&q=80",
        },
        {
            id: "ticket-5",
            eventName: "Design Systems Summit",
            imageSrc:
                "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80",
            imageAlt: "Design Systems Summit",
            eventDate: "Jun 15, 2027",
            eventstartTime: "10:00 AM",
            eventLocation: "Mumbai, India",
            ticketType: "Early Bird",
            ticketStatus: "upcoming",
            buyerName: "Alex Chen",
            buyerImageSrc: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=100&q=80",
        },
        {
            id: "ticket-6",
            eventName: "DevOps Days Kolkata",
            imageSrc:
                "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?auto=format&fit=crop&w=800&q=80",
            imageAlt: "DevOps Days",
            eventDate: "Aug 5, 2026",
            eventstartTime: "02:00 PM",
            eventLocation: "Kolkata, India",
            ticketType: "General",
            ticketStatus: "cancelled",
            buyerName: "Alex Chen",
            buyerImageSrc: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80",
        },
    ]
        ;

    const ticketCards = (status: typeof activeTab) =>
        tickets
            .filter((ticket) => ticket.ticketStatus === status)
            .map((ticket) => <TicketCard key={ticket.id} {...ticket} />);

    return (
        <div className="min-h-dvh bg-background text-foreground lg:mx-15 md:mx-15 sm:mx-15">
            <div className="mx-auto w-full px-5 pt-24 pb-8 sm:px-8 lg:px-9">
                <div className="space-y-1">
                    <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
                        Tickets
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        View your tickets for events
                    </p>
                    <div className="mt-10 w-fit">
                        <TicketTab
                            activeTab={activeTab}
                            onTabChange={setActiveTab}
                        />
                    </div>
                    <div className="mt-5 w-full">
                        {/* Tickets */}
                        <div className="space-y-4 ">
                            {ticketCards(activeTab)}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}