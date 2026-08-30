import { TicketCard, type TicketCardData } from "@/components/base/ticket/card/ticketcard";

export default function TicketPage() {

    const tickets: TicketCardData[] = [
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

    return (
        <div className="mt-5 w-full">
            {/* Tickets */}
            <div className="space-y-4 ">
                {tickets.map((ticket) => <TicketCard key={ticket.id} {...ticket} />)}
            </div>
        </div>
    )
}