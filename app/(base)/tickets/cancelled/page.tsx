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
            eventType: "inperson",
        },
        {
            id: "ticket-7",
            eventName: "Serverless Conf 2026",
            imageSrc:
                "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80",
            imageAlt: "Serverless Conf",
            eventDate: "Jul 15, 2026",
            eventstartTime: "11:00 AM",
            eventLocation: "Online",
            ticketType: "Standard",
            ticketStatus: "cancelled",
            buyerName: "Alex Chen",
            buyerImageSrc: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80",
            eventType: "online",
        },
        {
            id: "ticket-8",
            eventName: "Kubernetes Summit",
            imageSrc:
                "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?auto=format&fit=crop&w=800&q=80",
            imageAlt: "Kubernetes Summit",
            eventDate: "Jun 10, 2026",
            eventstartTime: "09:30 AM",
            eventLocation: "Hybrid - Seattle & Virtual",
            ticketType: "Early Bird",
            ticketStatus: "cancelled",
            buyerName: "Alex Chen",
            buyerImageSrc: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80",
            eventType: "hybrid",
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