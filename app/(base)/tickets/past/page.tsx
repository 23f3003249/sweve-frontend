import { TicketCard, type TicketCardData } from "@/components/base/ticket/card/ticketcard";

export default function TicketPage() {

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
        }
    ]

    return (
        <div className="mt-5 w-full">
            {/* Tickets */}
            <div className="space-y-4 ">
                {tickets.map((ticket) => <TicketCard key={ticket.id} {...ticket} />)}
            </div>
        </div>
    )
}