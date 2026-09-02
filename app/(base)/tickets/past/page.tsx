import { TicketCard, type TicketCardData } from "@/components/base/ticket/card/ticketcard";
import { type AvatarItemType } from "@/components/ui/custom/avatar/avatar-stacked";

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

const avataritems: AvatarItemType[] = [
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
]

export default function TicketPage() {

    return (
        <div className="mt-5 w-full">
            {/* Tickets */}
            <div className="space-y-4 ">
                {tickets.map((ticket) => <TicketCard key={ticket.id} avatarItems={avataritems} {...ticket} />)}
            </div>
        </div>
    )
}