"use client"

import { Bookmark, CalendarDays, Share2, MapPin, Ticket, } from "lucide-react"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import Link from "next/link"
import type { EventCardData } from "@/components/events/cardcarousel"
import { useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { toast } from "sonner"

// Confetti animation for bookmark action
const CONFETTI_COLORS = [
  "bg-red-500",
  "bg-orange-400",
  "bg-yellow-400",
  "bg-rose-500",
  "bg-purple-500",
  "bg-blue-400",
  "bg-amber-400",
  "bg-fuchsia-500",
];

const BOOKMARK_CONFETTI = Array.from({ length: 12 }, (_, i) => {
  const angle = -160 + (i / 11) * 140;
  const rad = (angle * Math.PI) / 180;
  const dist = 35 + (i % 3) * 12;

  return {
    id: i,
    x: Math.cos(rad) * dist,
    y: Math.sin(rad) * dist,
    rotate: (i % 2 === 0 ? 1 : -1) * (100 + i * 18),
    color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
    w: i % 2 === 0 ? 6 : 5,
    h: i % 3 === 0 ? 5 : 3,
    dur: 0.55 + (i % 4) * 0.07,
  };
});


export type EventCardActionType = "save" | "preview"

export type EventCardProps = EventCardData & {
  actions?: EventCardActionType[],
  className?: string,
}

export type ShareData = {
  title: string,
  text: string,
  url: string,
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
  actions = [],
  registerUrl,
}: EventCardProps) {
  const hasSaveAction = actions.includes("save");
  const [copied, setCopied] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [bookmarkClickKey, setBookmarkClickKey] = useState(0);

  // Prepare share data for the event
  const shareData: ShareData = {
    title,
    text: `Check out this event: ${title} on ${date} at ${location}.`,
    url: registerUrl,
  };
  // Function to handle sharing the event
  const handleShare = async () => {
    if (navigator.share) {
      try {
        if (!navigator.canShare || navigator.canShare(shareData)) {
          await navigator.share(shareData);
          toast.success("Event shared successfully")
          return;
        }
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") {
          return;
        }
        toast.error("Could not share event")
      }
    }

    // Fallback to clipboard
    try {
      if (!navigator.clipboard) {
        throw new Error("Clipboard API not supported");
      }
      await navigator.clipboard.writeText(registerUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      toast.success("Event link copied")
    } catch (error) {
      toast.error("Could not copy event link")
    }
  };

  // Function to handle bookmarking the event
  const handleBookmark = () => {
    const next = !isSaved;
    setIsSaved(next);
    // Only trigger confetti when saving
    if (next) {
      setBookmarkClickKey((key) => key + 1);
      toast.success("Saved to bookmarks")
      return;
    }
    toast.info("Removed from bookmarks")
  };


  return (
    <Card data-event-id={id} className={cn("group/card relative w-full p-0 rounded-xl", className)}>
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
        <div className="absolute inset-0 flex flex-col justify-between p-5 text-white transition-all duration-300 sm:group-hover/card:opacity-0">
          {/* Badges */}
          <div className="flex items-center justify-between gap-2">
            <Badge className="w-fit p-2.5">{category}</Badge>
            {price && (<Badge className="w-fit text-lg bg-transparent text-white">{price}</Badge>)}
          </div>

          {/* Event information */}
          <div className="space-y-0.5" >
            <h3 className="text-lg font-bold">{title}</h3>
            <div className="flex flex-col items-start gap-1 text-sm text-zinc-300">
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
        </div>

        {/* Hover content */}
        <div className="absolute hidden inset-x-0 bottom-0 sm:flex translate-y-0 flex-col gap-4 p-5 text-white opacity-0 ease-out transition-all duration-500 sm:translate-y-4 sm:group-hover/card:translate-y-0 sm:group-hover/card:opacity-100">
          {/* Event information */}
          <div>
            <div className="flex items-center justify-between gap-2">
              <Badge className="w-fit p-2.5">{category}</Badge>
              {price && (<Badge className="w-fit text-lg bg-transparent text-white">{price}</Badge>)}
            </div>
            <h3 className="mt-2 text-lg font-bold">{title}</h3>
            <div className="flex flex-col items-start gap-1 mt-1 text-sm text-zinc-300">
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

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Button asChild variant="default" className="h-11 flex-1">
              <Link href={registerUrl} className="flex flex-row gap-1 font-semibold" >
                <Ticket className="size-4.5" />
                REGISTER
              </Link>
            </Button>

            <Button size="icon" className="h-11 w-11 bg-secondary text-secondary-foreground hover:bg-secondary-foreground hover:text-secondary" aria-label="Share event" onClick={handleShare}>
              <Share2 className="size-4" />
            </Button>

            {hasSaveAction && (
              <div className="relative">
                {/* Confetti */}
                <AnimatePresence>
                  {isSaved &&
                    BOOKMARK_CONFETTI.map((p) => (
                      <motion.span
                        key={`${p.id}-${bookmarkClickKey}`}
                        className={cn(
                          "absolute rounded-sm pointer-events-none z-20",
                          p.color
                        )}
                        style={{
                          width: p.w,
                          height: p.h,
                          left: "50%",
                          top: "50%",
                          marginLeft: -(p.w / 2),
                          marginTop: -(p.h / 2),
                        }}
                        initial={{
                          x: 0,
                          y: 0,
                          rotate: 0,
                          opacity: 1,
                          scale: 1,
                        }}
                        animate={{
                          x: p.x,
                          y: [0, p.y * 0.6, p.y],
                          rotate: p.rotate,
                          opacity: [1, 1, 0],
                          scale: 0.7,
                        }}
                        exit={{ opacity: 0 }}
                        transition={{
                          duration: p.dur,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                      />
                    ))}
                </AnimatePresence>

                <motion.div
                  animate={
                    isSaved
                      ? { scale: [1, 1.4, 0.85, 1.1, 1] }
                      : { scale: [1, 0.85, 1] }
                  }
                  transition={{ duration: 0.4, ease: "easeOut" }}
                >
                  <Button
                    size="icon"
                    className="h-11 w-11 bg-secondary text-secondary-foreground hover:bg-secondary-foreground hover:text-secondary"
                    aria-label={isSaved ? "Remove saved event" : "Save event"}
                    aria-pressed={isSaved}
                    onClick={handleBookmark}
                  >
                    <Bookmark
                      className={cn(
                        "size-4 transition-colors duration-300",
                        isSaved && "fill-current"
                      )}
                    />
                  </Button>
                </motion.div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Card>
  )
}
