"use client"

import { CalendarDays, MapPin, Ticket, } from "lucide-react"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import Link from "next/link"
import type { EventCardData } from "@/components/base/events/cardcarousel"
import { BookmarkButton } from "@/components/ui/custom/button/bookmarkbutton"
import { ShareButton, type ShareData } from "@/components/ui/custom/button/sharebutton"

export type EventCardActionType = "save" | "preview"

export type EventCardProps = EventCardData & {
  actions?: EventCardActionType[],
  className?: string,
  href?: string,
}

type EventBadgesProps = Pick<EventCardProps, "category" | "price">

function EventBadges({ category, price }: EventBadgesProps) {
  return (
    <div className="flex items-center justify-between gap-2">
      <Badge className="w-fit p-2.5">{category}</Badge>
      {price && (
        <Badge className="w-fit bg-transparent text-lg text-white">{price}</Badge>
      )}
    </div>
  )
}

type EventDetailsProps = Pick<EventCardProps, "title" | "date" | "location"> & {
  className?: string
  titleClassName?: string
  metadataClassName?: string
}

function EventDetails({
  title,
  date,
  location,
  className,
  titleClassName,
  metadataClassName,
}: EventDetailsProps) {
  return (
    <div className={className}>
      <h3 className={cn("text-lg font-bold", titleClassName)}>{title}</h3>
      <div
        className={cn(
          "flex flex-col items-start gap-1 text-sm text-zinc-300",
          metadataClassName
        )}
      >
        <div className="flex items-center gap-1">
          <CalendarDays className="size-4 shrink-0 text-primary" />
          <span>{date}</span>
        </div>
        <div className="flex items-center gap-1">
          <MapPin className="size-4 shrink-0 text-primary" />
          <span>{location}</span>
        </div>
      </div>
    </div>
  )
}

export function EventCard({
  className,
  id,
  title,
  imageSrc,
  imageAlt,
  category,
  date,
  location,
  price,
  isBookmarked,
  actions = [],
  registerUrl,
  href,
}: EventCardProps) {
  const hasSaveAction = actions.includes("save");
  const eventHref = href ?? `/events/${id}`


  // Prepare share data for the event
  const shareData: ShareData = {
    title,
    text: `Check out this event: ${title} on ${date} at ${location}.`,
    url: eventHref,
  };

  return (
    <Card data-event-id={id} className={cn("group/card relative w-full rounded-xl p-0", className)}>
      <Link
        href={eventHref}
        aria-label={`View ${title}`}
        className="absolute inset-0 z-10"
      />

      <div className="relative aspect-square overflow-hidden rounded-xl">
        {/* Image */}
        <Image
          src={imageSrc}
          alt={imageAlt ?? title}
          fill
          className="object-cover transition-transform "
        />

        {/* Top dark gradient */}
        <div className="absolute inset-x-0 top-0 h-1/3 bg-linear-to-b from-black/60 to-transparent" />

        {/* Bottom dark gradient */}
        <div className="absolute inset-x-0 bottom-0 h-2/3 bg-linear-to-t from-black/70 to-transparent" />

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/0 backdrop-blur-0 transition-all duration-500 group-hover/card:bg-black/10 group-hover/card:backdrop-blur-sm ease-in-out" />

        {/* Default content */}
        <div className="pointer-events-none absolute inset-0 flex flex-col justify-between p-5 text-white transition-all duration-300 sm:group-hover/card:opacity-0">
          <EventBadges category={category} price={price} />
          <EventDetails
            title={title}
            date={date}
            location={location}
            className="space-y-0.5"
          />
        </div>
      </div>

      {/* Hover content */}
      <div className="absolute inset-x-0 bottom-0 z-20 hidden translate-y-0 flex-col gap-4 p-5 text-white opacity-0 ease-out transition-all duration-500 sm:flex sm:translate-y-4 sm:group-hover/card:translate-y-0 sm:group-hover/card:opacity-100">
        <div>
          <EventBadges category={category} price={price} />
          <EventDetails
            title={title}
            date={date}
            location={location}
            titleClassName="mt-2"
            metadataClassName="mt-1"
          />
        </div>

        {/* Actions */}
        <div className="relative z-20 flex items-center gap-2">
          <Button asChild variant="default" className="h-11 flex-1">
            <Link href={registerUrl} className="flex flex-row gap-1 font-semibold" >
              <Ticket className="size-4.5" />
              REGISTER
            </Link>
          </Button>
          {hasSaveAction && (
            <BookmarkButton
              isSaved={isBookmarked}
              onChangeAction={(saved) => console.log("Bookmark toggled:", id, saved)}
            />
          )}

          <ShareButton shareData={shareData} />
        </div>
      </div>
    </Card>
  )
}
