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
        <Card data-ticket-id={id} className={cn("w-full p-3 overflow-hidden", className)} >
            {/* Ticket information */}
            {/* Banner */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-3 ">
                <div className="w-full shrink-0 sm:w-28">

                    <AspectRatio ratio={1} >
                        <Image
                            src={imageSrc}
                            alt={imageAlt ?? `${eventName} banner`}
                            fill
                            className="rounded-xl object-cover"
                        />
                    </AspectRatio>
                </div>
                <div className="flex min-w-0 flex-1 flex-col justify-center ">
                    {/* Event name - responsive title size (text-lg mobile, text-2xl desktop) */}
                    <div className="flex items-center gap-2">
                        <h3 className="truncate text-lg font-semibold sm:text-2xl">{eventName}</h3>
                        {/*badge hidden on mobile, shown inline with buyer row instead */}
                        <Badge className="hidden font-semibold sm:ml-2 sm:inline-flex">{ticketType}</Badge>
                    </div>

                    {/* Date and time */}
                    <div className="mt-2 flex flex-wrap items-center gap-x-5 gap-y-1 text-sm ">
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
                    <div className="mt-2 flex items-center gap-1.5 text-sm ">
                        <MapPin className="size-4 shrink-0 text-primary" />
                        <span className="truncate">{eventLocation}</span>
                    </div>

                    {/* Mobile-only row with badge + buyer side by side */}
                    <div className="mt-2 flex items-center gap-2 sm:hidden">
                        <Badge className="font-semibold">{ticketType}</Badge>
                        <div className="flex items-center gap-1.5 text-sm font-medium">
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
                <div className="hidden shrink-0 flex-col items-end justify-center gap-2 sm:pt-0 sm:pr-4 sm:flex">
                    {/* Buyer */}
                    <div className="flex items-center gap-1.5 text-sm font-medium">
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