import Image from "next/image";
import { CalendarDays, Clock3, MapPin, Monitor, Ticket, Wifi } from "lucide-react"

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export type EventType = "inperson" | "online" | "hybrid";

export type TicketCardData = {
    id: string;
    eventName: string;
    imageSrc: string;
    imageAlt: string;
    eventDate: string;
    eventstartTime: string;
    eventLocation: string;
    ticketType: string;
    ticketStatus: "upcoming" | "past" | "cancelled";
    buyerName: string;
    buyerImageSrc?: string;
    eventType?: EventType;
}

export type TicketCardProps = TicketCardData & {
    className?: string
}

function EventTypeIcon({ type }: { type: EventType | undefined }) {
    switch (type) {
        case "online":
            return <Monitor className="size-4 text-primary" aria-label="Online event" />;
        case "hybrid":
            return <Wifi className="size-4 text-primary" aria-label="Hybrid event" />;
        case "inperson":
        default:
            return <MapPin className="size-4 text-primary" aria-label="In-person event" />;
    }
}

export function TicketCard({
    className,
    id,
    eventName,
    imageSrc,
    imageAlt,
    eventDate,
    eventstartTime,
    eventLocation,
    ticketType,
    eventType,
}: TicketCardProps) {
    return (
        <Card data-ticket-id={id} className={cn("w-full max-w-3xl p-2.5 sm:h-50 overflow-hidden rounded-lg relative ", className)} >
            {/* Event type icon - top right */}
            <div className="absolute top-5 right-5 z-10">
                <EventTypeIcon type={eventType} />
            </div>
            {/* Ticket information */}
            {/* Banner */}
            <div className="flex flex-col h-full gap-3 sm:flex-row sm:items-center sm:gap-6 ">
                <div className="w-full shrink-0 sm:w-45">

                    <AspectRatio ratio={1} >
                        <Image
                            src={imageSrc}
                            alt={imageAlt ?? `${eventName} banner`}
                            fill
                            className="rounded-lg object-cover"
                        />
                    </AspectRatio>
                </div>
                <div className="flex min-w-0 pr-6 flex-1 h-full flex-col">
                    {/* Event name - responsive title size (text-base mobile, text-lg desktop) */}
                    <div className="flex items-center gap-2">
                        <h3 className="text-2xl font-semibold md:text-3xl">{eventName}</h3>
                    </div>

                    {/* Date and time */}
                    <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-1 text-xs text-muted-foreground">
                        <div className="flex items-center gap-2">
                            <CalendarDays className="size-5 shrink-0 text-primary/80" />
                            <span>{eventDate}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Clock3 className="size-5 shrink-0 text-primary/80" />
                            <span>{eventstartTime}</span>
                        </div>
                    </div>
                    {/* Location */}
                    <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
                        <MapPin className="size-5 shrink-0 text-primary/80" />
                        <span className="truncate">{eventLocation}</span>
                    </div>

                    <div className="mt-5 w-fit flex items-center gap-2 rounded-sm py-2 px-3 font-semibold tracking-wide border border-border bg-accent text-accent-foreground">
                        <Ticket className="size-4.5 text-primary/80" />
                        <span className="text-accent-foreground">
                            {ticketType}
                        </span>
                    </div>

                </div>
            </div>
        </Card>
    )
}