"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EventCategoryCard } from "@/components/base/ticket/card/eventcategorycard";
import { type TicketCardData } from "@/components/base/ticket/card/ticketcard";
import { type AvatarItemType } from "@/components/ui/custom/avatar/avatar-stacked";

const savedEvents: TicketCardData[] = [
    {
        id: "1",
        eventName: "Exclusive Event",
        imageSrc: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80",
        imageAlt: "Exclusive Event",
        eventDate: "Sep 20, 2026",
        eventstartTime: "07:00 PM",
        eventLocation: "New York, NY",
        ticketType: "VIP",
        ticketStatus: "upcoming",
        buyerName: "Alex Chen",
        buyerImageSrc: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100&q=80",
        eventType: "inperson",
    },
    {
        id: "2",
        eventName: "Art Exhibition",
        imageSrc: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80",
        imageAlt: "Art Exhibition",
        eventDate: "Sep 25, 2026",
        eventstartTime: "10:00 AM",
        eventLocation: "Los Angeles, CA",
        ticketType: "General",
        ticketStatus: "upcoming",
        buyerName: "Alex Chen",
        buyerImageSrc: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80",
        eventType: "inperson",
    },
    {
        id: "3",
        eventName: "Tech Conference 2026",
        imageSrc: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80",
        imageAlt: "Tech Conference",
        eventDate: "Oct 15, 2026",
        eventstartTime: "09:00 AM",
        eventLocation: "San Francisco, CA",
        ticketType: "Early Bird",
        ticketStatus: "upcoming",
        buyerName: "Alex Chen",
        buyerImageSrc: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=100&q=80",
        eventType: "hybrid",
    },
    {
        id: "4",
        eventName: "Music Festival",
        imageSrc: "https://images.unsplash.com/photo-1493225457124-a3eb161f15f7?auto=format&fit=crop&w=800&q=80",
        imageAlt: "Music Festival",
        eventDate: "Nov 5, 2026",
        eventstartTime: "06:00 PM",
        eventLocation: "Austin, TX",
        ticketType: "General",
        ticketStatus: "upcoming",
        buyerName: "Alex Chen",
        buyerImageSrc: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80",
        eventType: "inperson",
    },
    {
        id: "5",
        eventName: "Design Workshop",
        imageSrc: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80",
        imageAlt: "Design Workshop",
        eventDate: "Dec 10, 2026",
        eventstartTime: "02:00 PM",
        eventLocation: "Online",
        ticketType: "Standard",
        ticketStatus: "upcoming",
        buyerName: "Alex Chen",
        buyerImageSrc: "https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?auto=format&fit=crop&w=100&q=80",
        eventType: "online",
    }
];

const avatarItems: AvatarItemType[] = [
    {
        src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb",
        identifier: "John Doe",
        fallback: "JD",
    },
    {
        src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
        identifier: "Jane Smith",
        fallback: "JS",
    },
    {
        src: "https://images.unsplash.com/photo-1599566150163-29194dcaad36",
        identifier: "Alice Johnson",
        fallback: "AJ",
    },
    {
        src: "https://images.unsplash.com/photo-1740252117070-7aa2955b25f8",
        identifier: "Bob Brown",
        fallback: "BB",
    },
    {
        src: "https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1",
        identifier: "Charlie Davis",
        fallback: "CD",
    }
];

function formatCategoryTitle(slug: string) {
    return slug
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
}

export default function CategoryPage() {
    const { eventcatid } = useParams() as { eventcatid: string };
    const title = formatCategoryTitle(eventcatid);
    const formattedDate = new Date(savedEvents[0].eventDate).toLocaleDateString("en-US", {
        weekday: "long",
        month: "short",
        day: "numeric",
        year: "numeric",
    });

    return (
        <>
            <div className="flex items-center gap-2">
                <Button asChild variant="ghost" size="icon">
                    <Link href="/events" aria-label="Back to events">
                        <ChevronLeft />
                    </Link>
                </Button>
                <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">{title}</h1>
            </div>
            <div className="mt-5 mb-5 flex items-center gap-4">
                <span className="shrink-0 text-md font-medium">{formattedDate}</span>
                <div className="h-px flex-1 bg-border" />
            </div>
            <div className="space-y-4">
                {savedEvents.map((event) => (
                    <EventCategoryCard key={event.id} avatarItems={avatarItems} {...event} />
                ))}
            </div>
        </>
    );
}