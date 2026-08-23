"use client"

import * as React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { type CarouselApi, Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button"
import { Bookmark, CalendarDays, MapPin, Share2, Ticket, } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { toast } from "sonner";

// Confetti animation for bookmark
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


export type HeroCarouselSlide = {
  id: string;
  imageSrc: string;
  imageAlt?: string;
  eventType: string;
  dateTime: string;
  title: string;
  location: string;
  description?: string;
  registerUrl: string;
  price?: string;
};

type HeroCarouselProps = {
  slides: HeroCarouselSlide[];
};

export default function HeroCarousel({
  slides,
}: HeroCarouselProps) {
  const [api, setApi] = React.useState<CarouselApi>()
  const [current, setCurrent] = React.useState(0)
  const [count, setCount] = React.useState(0)
  const [copied, setCopied] = React.useState(false);
  const [savedEvents, setSavedEvents] = React.useState<Set<string>>(new Set());
  const [bookmarkClickKey, setBookmarkClickKey] = React.useState(0);

  // Function to handle sharing the event
  const handleShare = async (slide: HeroCarouselSlide) => {
    const shareData = {
      title: slide.title,
      text: `Check out this event: ${slide.title} on ${slide.dateTime} at ${slide.location}.`,
      url: slide.registerUrl,
    };

    if (navigator.share) {
      try {
        if (!navigator.canShare || navigator.canShare(shareData)) {
          await navigator.share(shareData);
          toast.success("Event shared successfully");
          return;
        }
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") {
          return;
        }
        toast.error("Could not share event");
      }
    }

    try {
      await navigator.clipboard.writeText(slide.registerUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      toast.success("Event link copied");
    } catch (error) {
      toast.error("Could not copy event link");
    }
  };

  // Function to handle bookmarking the event
  const handleManualNav = React.useCallback((selectedIndex: number) => {
    api?.scrollTo(selectedIndex)
  }, [api])

  // Auto-slide
  const plugin = React.useRef(
    Autoplay({
      delay: 10000
    })
  )

  React.useEffect(() => {
    if (!api) return

    const len = api.scrollSnapList().length;
    setCount(len);
    setCurrent(api.selectedScrollSnap() + 1)

    const onSelect = () => setCurrent(api.selectedScrollSnap() + 1)
    api.on("select", onSelect)

    return () => {
      api.off("select", onSelect)
    }
  }, [api])


  // Function to handle bookmarking the event
  const handleBookmark = (eventId: string) => {
    const isCurrentlySaved = savedEvents.has(eventId);

    setSavedEvents((prev) => {
      const next = new Set(prev);

      if (isCurrentlySaved) {
        next.delete(eventId);
      } else {
        next.add(eventId);
      }
      return next;
    });
    if (!isCurrentlySaved) {
      setBookmarkClickKey((key) => key + 1);
      toast.success("Saved to bookmarks");
      return;
    }
    toast.info("Removed from bookmarks");
  };

  return (
    <div className="relative h-full w-full">
      <Carousel
        className="h-full w-full *:data-[slot=carousel-content]:h-full"
        setApi={setApi}
        plugins={[plugin.current]}
        opts={{ loop: true }}
      >
        <CarouselContent className="h-full">
          {slides.map((slide, index) => (
            <CarouselItem key={slide.id} className="relative h-full">
              <Image
                src={slide.imageSrc}
                alt={slide.imageAlt ?? ""}
                fill
                className="h-full w-full object-cover"
                priority={index === 0}
              />

              {/* Event Information Overlay */}
              <div className="absolute inset-x-0 bottom-0 z-10 bg-linear-to-t from-black/80 via-black/60 to-transparent p-4 pb-6 pt-32 text-white sm:pl-24 sm:p-15">
                <div className="flex max-w-full flex-col items-start gap-3 ml-6 mb-6 sm:ml-8 sm:mb-10 sm:max-w-3xl sm:gap-5">
                  <Badge className="px-2.5 py-1.5 text-[10px] sm:p-3 sm:text-xs">{slide.eventType}</Badge>
                  <h3 className="max-w-full text-2xl font-bold leading-tight tracking-tight sm:max-w-2xl sm:text-4xl md:text-5xl">
                    {slide.title}
                  </h3>
                  <div className="flex flex-wrap items-center gap-2 text-sm text-zinc-100 sm:gap-3">
                    <div className="flex items-center gap-2 rounded-full bg-black/50 px-2.5 py-1.5 backdrop-blur-sm sm:px-3.5 sm:py-2">
                      <CalendarDays className="size-3.5 shrink-0" />
                      <span className="text-[10px] sm:text-xs md:text-md">{slide.dateTime}</span>
                    </div>
                    <div className="flex items-center gap-2 rounded-full bg-black/50 px-2.5 py-1.5 backdrop-blur-sm sm:px-3.5">
                      <MapPin className="size-3.5 shrink-0" />
                      <span className="text-[10px] sm:text-xs md:text-md">{slide.location}</span>
                    </div>
                    {slide.price && (
                      <Badge variant="default" className="h-auto px-2.5 py-1 text-[10px] font-semibold sm:px-3 sm:py-1.5 sm:text-sm">
                        {slide.price}
                      </Badge>
                    )}
                  </div>
                  {slide.description && (
                    <p className="max-w-full text-xs leading-5 text-zinc-300/90 sm:max-w-2xl sm:text-sm md:text-base sm:leading-6">
                      {slide.description}
                    </p>
                  )}
                  <div className="flex flex-wrap items-center gap-2 font-sans">
                    <Button asChild variant="default" className="h-10 px-4 text-xs font-bold shadow-lg sm:h-11 sm:px-5 sm:text-sm">
                      <Link href={slide.registerUrl} className="flex flex-row items-center gap-1.5">
                        <Ticket className="size-4 sm:size-4.5" />
                        REGISTER
                      </Link>
                    </Button>
                    {/* For bookmark */}
                    <div className="relative">
                      <AnimatePresence>
                        {savedEvents.has(slide.id) &&
                          BOOKMARK_CONFETTI.map((p) => (
                            <motion.span
                              key={`${slide.id}-${p.id}-${bookmarkClickKey}`}
                              className={cn(
                                "pointer-events-none absolute z-20 rounded-sm",
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
                          savedEvents.has(slide.id)
                            ? { scale: [1, 1.4, 0.85, 1.1, 1] }
                            : { scale: [1, 0.85, 1] }
                        }
                        transition={{
                          duration: 0.4,
                          ease: "easeOut",
                        }}
                      >
                        <Button
                          size="icon"
                          className="h-10 w-10 bg-zinc-100 text-zinc-900 hover:bg-zinc-900 hover:text-zinc-100 sm:h-11 sm:w-11"
                          aria-label={
                            savedEvents.has(slide.id)
                              ? "Remove saved event"
                              : "Save event"
                          }
                          aria-pressed={savedEvents.has(slide.id)}
                          onClick={() => handleBookmark(slide.id)}
                        >
                          <Bookmark
                            className={cn(
                              "size-4 transition-colors duration-300",
                              savedEvents.has(slide.id) && "fill-current"
                            )}
                          />
                        </Button>
                      </motion.div>
                    </div>
                    {/* for sharing */}
                    <Button size="icon" className="h-10 w-10 bg-zinc-100 text-zinc-900 hover:bg-zinc-900 hover:text-zinc-100 sm:h-11 sm:w-11" aria-label={copied ? "Link copied" : "Share event"} onClick={() => handleShare(slide)} >
                      {copied ? "✓" : <Share2 className="size-4" />}
                    </Button>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Carousel Controls */}
        <div className="absolute -bottom-10 left-1/2 flex -translate-x-1/2 items-center gap-2">

          <CarouselPrevious size={"icon-xs"} className="static! inset-auto! opacity-0 md:opacity-100 m-0! translate-x-0! translate-y-0!" />

          {Array.from({ length: count }).map((_, index) => (
            <button key={index}
              className={cn(
                "h-3 w-3 rounded-full border-2 transition-border duration-200 ease-in",
                current === index + 1 && "border-primary",
              )}
              onClick={() => handleManualNav(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
          <CarouselNext size={"icon-xs"} className="static! inset-auto! opacity-0 md:opacity-100 m-0! translate-x-0! translate-y-0!" />
        </div>
      </Carousel>
    </div>
  );
}