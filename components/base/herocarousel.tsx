"use client"

import * as React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { type CarouselApi, Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button"
import { CalendarDays, MapPin, Ticket, } from "lucide-react";
import Link from "next/link";
import { BookmarkButton } from "../ui/custom/button/bookmarkbutton";
import { ShareButton } from "../ui/custom/button/sharebutton";

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
  isSaved?: boolean;
};

type HeroCarouselProps = {
  slides: HeroCarouselSlide[];
  onBookmarkToggle?: (slideId: string, saved: boolean) => void;
};

export default function HeroCarousel({
  slides,
  onBookmarkToggle,
}: HeroCarouselProps) {
  const [api, setApi] = React.useState<CarouselApi>()
  const [current, setCurrent] = React.useState(0)
  const [count, setCount] = React.useState(0)

  // Function to handle bookmarking the event
  const handleManualNav = React.useCallback((selectedIndex: number) => {
    api?.scrollTo(selectedIndex)
  }, [api])

  // Auto-slide
  const plugin = React.useMemo(() =>
    Autoplay({
      delay: 10000
    })
    , [])

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


  return (
    <div className="relative h-full w-full">
      <Carousel
        className="h-full w-full *:data-[slot=carousel-content]:h-full"
        setApi={setApi}
        plugins={[plugin]}
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
                    {/* Bookmark */}
                    <BookmarkButton
                      isSaved={slide.isSaved}
                      onChangeAction={(saved) => onBookmarkToggle?.(slide.id, saved)}
                    />

                    {/* Share */}
                    <ShareButton
                      shareData={{
                        title: slide.title,
                        text: `Check out this event: ${slide.title} on ${slide.dateTime} at ${slide.location}.`,
                        url: slide.registerUrl,
                      }}
                    />

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