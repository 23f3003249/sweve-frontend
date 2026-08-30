import { Card } from "@/components/ui/card";
import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { CalendarDays, Clock3, MapPin } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

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
}

export type TicketCardProps = TicketCardData & {
    className?: string
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
    buyerName,
    buyerImageSrc,
}: TicketCardProps) {
    return (
        <Card data-ticket-id={id} className={cn("w-full max-w-3xl p-2 overflow-hidden", className)} >
            {/* Ticket information */}
            {/* Banner */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-3 ">
                <div className="w-full shrink-0 sm:w-40">

                    <AspectRatio ratio={3 / 2} >
                        <Image
                            src={imageSrc}
                            alt={imageAlt ?? `${eventName} banner`}
                            fill
                            className="rounded-xl object-cover"
                        />
                    </AspectRatio>
                </div>
                <div className="flex min-w-0 flex-1 flex-col justify-center ">
                    {/* Event name - responsive title size (text-base mobile, text-lg desktop) */}
                    <div className="flex items-center gap-2">
                        <h3 className="truncate text-base font-semibold sm:text-lg">{eventName}</h3>
                    </div>

                    {/* Date and time */}
                    <div className="mt-2 flex flex-wrap items-center gap-x-5 gap-y-1 text-xs ">
                        <div className="flex items-center gap-1.5">
                            <CalendarDays className="size-4 shrink-0 text-primary" />
                            <span>{eventDate}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <Clock3 className="size-4 shrink-0 text-primary" />
                            <span>{eventstartTime}</span>
                        </div>
                    </div>
                    {/* Location */}
                    <div className="mt-2 flex items-center gap-1.5 text-xs">
                        <MapPin className="size-4 shrink-0 text-primary" />
                        <span className="truncate">{eventLocation}</span>
                    </div>

                    {/* Badge & Mobile Buyer row after venue */}
                    <div className="mt-2 flex items-center gap-3">
                        <Badge className="font-semibold rounded-sm">{ticketType}</Badge>
                        <div className="flex items-center gap-1.5 text-xs font-medium sm:hidden">
                            <Avatar className="size-6" size="sm">
                                <AvatarImage src={buyerImageSrc} alt={buyerName} />
                                <AvatarFallback>{buyerName.charAt(0).toUpperCase()}</AvatarFallback>
                            </Avatar>
                            <span className="truncate whitespace-nowrap">{buyerName}</span>
                        </div>
                    </div>

                </div>
                {/*Right-side ticket + buyer section */}
                {/*hidden on mobile (buyer shown above), desktop layout preserved */}
                <div className="hidden shrink-0 flex-col items-end justify-cecenter gap-2 sm:pt-0 sm:pr-2 sm:flex">
                    {/* Buyer */}
                    <div className="flex items-center gap-1.5 text-xs font-medium">
                        <Avatar className="size-8" size="sm">
                            <AvatarImage src={buyerImageSrc} alt={buyerName} />
                            <AvatarFallback>{buyerName.charAt(0).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <span className="whitespace-nowrap">{buyerName}</span>
                    </div>
                </div>
            </div>
        </Card >
    )
}