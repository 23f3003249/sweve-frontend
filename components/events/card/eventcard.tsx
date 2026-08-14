"use client"

import { Bookmark, CalendarDays, Eye, MapPin, Ticket, } from "lucide-react"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import Link from "next/link"
import type { EventCardData } from "@/components/events/cardcarousel"

export type EventCardActionType = "save" | "preview"

export type EventCardProps = EventCardData & {
  actions?: EventCardActionType[],
  className?: string,
}

export function EventCard({ id, title, imageSrc, imageAlt, category, date, location, price, actions = [], className, registerUrl
}: EventCardProps) {
  const hasSaveAction = actions.includes("save")
  const hasPreviewAction = actions.includes("preview")

  return (
    <Card data-event-id={id} className={cn("group/card relative w-full p-0 border border-border/50 rounded-xl", className)}>
      <div className="relative aspect-square overflow-hidden rounded-xl">
        {/* Image */}
        <Image
          src={imageSrc}
          alt={imageAlt ?? title}
          fill
          sizes="(max-width: 640px) 90vw, (max-width: 1024px) 40vw, 320px"
          className="object-cover transition-transform "
        />

        {/* Top dark gradient */}
        <div className="absolute inset-x-0 top-0 h-1/2 bg-linear-to-b from-black/70 to-transparent" />

        {/* Bottom dark gradient */}
        <div className="absolute inset-x-0 bottom-0 h-2/3 bg-linear-to-t from-black/90 via-black/40 to-transparent" />

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/0 backdrop-blur-0 transition-all duration-500 group-hover/card:bg-black/50 group-hover/card:backdrop-blur-sm ease-in-out" />

        {/* Default content */}
        <div className="absolute inset-0 flex flex-col justify-between p-5 text-white opacity-0 transition-all duration-300 sm:opacity-100 sm:group-hover/card:opacity-0">
          {/* Badges */}
          <div className="flex items-start justify-between gap-2">
            <Badge variant="default" className="w-fit">{category}</Badge>
            {price && (<Badge variant="ghost" className="w-fit text-lg font-bold">{price}</Badge>)}
          </div>
          {/* Event information */}
          <EventMeta
            title={title}
            date={date}
            location={location}
          />
        </div>

        {/* Hover content */}
        <div className="absolute inset-x-0 bottom-0 flex translate-y-0 flex-col gap-4 p-5 text-white opacity-100 ease-out transition-all duration-500 sm:translate-y-4 sm:opacity-0 sm:group-hover/card:translate-y-0 sm:group-hover/card:opacity-100">
          {/* Event information */}
          <div>
            <div className="flex items-center justify-between gap-2">
              <Badge variant="default" className="w-fit">{category}</Badge>
              {price && (<Badge variant="ghost" className="w-fit text-lg ">{price}</Badge>)}
            </div>
            <h3 className="mt-2 text-lg font-bold">{title}</h3>
            <div className="mt-0.5 flex flex-col items-start gap-0.5 text-sm text-white/80">
              <div className="flex items-center gap-1">
                <CalendarDays className="size-3.5 shrink-0" />
                <span>{date}</span>
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="size-3.5 shrink-0" />
                <span>{location}</span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Button variant="default" className="h-11 flex-1">
              <Link href={registerUrl} className="flex flex-row gap-1"><Ticket className="size-4.5" />REGISTER</Link>
            </Button>

            {hasSaveAction && (<Button variant="ghost" size="icon" className="h-11 w-11" aria-label="Save event">
              <Bookmark className="size-4" /> </Button>
            )}

            {hasPreviewAction && (<Button variant="ghost" size="icon" className="h-11 w-11" aria-label="Preview event">
              <Eye className="size-4" /> </Button>
            )}
          </div>
        </div>
      </div>
    </Card>
  )
}

function EventMeta({ title, date, location }: { title: string, date: string, location: string, }) {
  return (
    <div className={cn("space-y-0.5")} >
      <h3 className={cn("text-lg font-bold")}>{title}</h3>
      <div className="flex flex-col items-start gap-0.5 text-sm text-white/80">
        <div className="flex items-center gap-1">
          <CalendarDays className="size-3.5 shrink-0" />
          <span>{date}</span>
        </div>
        <div className="flex items-center gap-1">
          <MapPin className="size-3.5 shrink-0" />
          <span>{location}</span>
        </div>
      </div>
    </div>
  )
}