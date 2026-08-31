import { Card } from "@/components/ui/card";
import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { CalendarDays, Clock3, MapPin, Monitor, Wifi } from "lucide-react"
import { Badge } from "@/components/ui/badge";
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
    eventType: EventType;
}

export type TicketCardProps = TicketCardData & {
    className?: string
}

function EventTypeIcon({ type }: { type: EventType }) {
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
        <Card data-ticket-id={id} className={cn("w-full max-w-3xl p-3.5 overflow-hidden rounded-lg relative ", className)} >
            {/* Event type icon - top right */}
            <div className="absolute top-3 right-3 z-10">
                <EventTypeIcon type={eventType} />
            </div>
            {/* Ticket information */}
            {/* Banner */}
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-6 ">
                <div className="w-full shrink-0 sm:w-40">

                    <AspectRatio ratio={1.1} >
                        <Image
                            src={imageSrc}
                            alt={imageAlt ?? `${eventName} banner`}
                            fill
                            className="rounded-lg object-cover"
                        />
                    </AspectRatio>
                </div>
                <div className="flex min-w-0 flex-1 flex-col justify-center ">
                    {/* Event name - responsive title size (text-base mobile, text-lg desktop) */}
                    <div className="flex items-center gap-2">
                        <h3 className="truncate text-base font-semibold sm:text-xl">{eventName}</h3>
                    </div>

                    {/* Date and time */}
                    <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-1 text-xs ">
                        <div className="flex items-center gap-2.5">
                            <CalendarDays className="size-4 shrink-0 text-primary" />
                            <span>{eventDate}</span>
                        </div>
                        <div className="flex items-center gap-2.5">
                            <Clock3 className="size-4 shrink-0 text-primary" />
                            <span>{eventstartTime}</span>
                        </div>
                    </div>
                    {/* Location */}
                    <div className="mt-2 flex items-center gap-2.5 text-xs">
                        <MapPin className="size-4 shrink-0 text-primary" />
                        <span className="truncate">{eventLocation}</span>
                    </div>

                    <div className="mt-5">
                        <Badge className="font-semibold rounded-sm w-24">{ticketType}</Badge>
                    </div>

                </div>
            </div>
        </Card>
    )
}