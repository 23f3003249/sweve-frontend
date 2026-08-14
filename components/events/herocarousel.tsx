"use client";

import * as React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Carousel, type CarouselApi, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, } from "@/components/ui/carousel";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button"
import { Bookmark, CalendarDays, MapPin, Share2, Ticket } from "lucide-react";
import Link from "next/link";

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
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  // Auto-slide timer
  const intervalRef = React.useRef<ReturnType<typeof setInterval> | null>(null);
  const resetAutoSlide = React.useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    intervalRef.current = setInterval(() => { api?.scrollNext(); }, 10000);
  }, [api]);

  React.useEffect(() => {
    if (!api) return;
    const len = api.scrollSnapList().length;
    setCount(len);
    setCurrent(api.selectedScrollSnap() + 1);

    const onSelect = () => setCurrent(api.selectedScrollSnap() + 1);
    api.on("select", onSelect);
    resetAutoSlide();

    return () => {
      api.off("select", onSelect);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [api, resetAutoSlide]);

  const handleManualNav = React.useCallback(
    (fn: () => void) => {
      fn();
      resetAutoSlide();
    },
    [resetAutoSlide]
  );

  return (
    <div className="relative h-full w-full">
      <Carousel
        className="h-full w-full *:data-[slot=carousel-content]:h-full"
        setApi={setApi}
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
                sizes="100vw"
                priority={index === 0}
              />
              <div className="absolute inset-x-0 bottom-0 z-10 bg-linear-to-t from-black/80 to-transparent p-6 pt-32 text-white sm:pl-24 sm:p-8">
                <div className="flex max-w-3xl flex-col items-start gap-3">
                  <Badge variant="default">{slide.eventType}</Badge>
                  <h3 className="max-w-2xl text-3xl font-bold tracking-tight sm:text-5xl">
                    {slide.title}
                  </h3>
                  <div className="flex flex-wrap items-center gap-2 text-sm text-white/90">
                    <div className="flex items-center gap-2 rounded-full bg-black/30 px-3 py-1.5 backdrop-blur-sm">
                      <CalendarDays className="size-3.5 shrink-0" />
                      <span>{slide.dateTime}</span>
                    </div>
                    <div className="flex items-center gap-2 rounded-full bg-black/30 px-3 py-1.5 backdrop-blur-sm">
                      <MapPin className="size-3.5 shrink-0" />
                      <span>{slide.location}</span>
                    </div>
                    {slide.price && (
                      <Badge variant="default" className="h-auto px-3 py-1.5 text-sm font-semibold">
                        {slide.price}
                      </Badge>
                    )}
                  </div>
                  {slide.description && (
                    <p className="max-w-2xl text-sm leading-6 text-white/80 sm:text-base">
                      {slide.description}
                    </p>
                  )}
                  <div className="flex flex-wrap items-center gap-2 font-sans">
                    <Button asChild variant="default" className="h-11 px-5 font-bold shadow-lg">
                      <Link href={slide.registerUrl} className="flex flex-row gap-1">
                        <Ticket className="size-4.5" />
                        REGISTER
                      </Link>
                    </Button>
                    <Button variant="ghost" size="icon" className="h-11 w-11" aria-label="Save event">
                      <Bookmark className="size-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-11 w-11" aria-label="Share event">
                      <Share2 className="size-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="absolute -bottom-10 left-1/2 flex -translate-x-1/2 items-center gap-2">
          <CarouselPrevious
            className="static! inset-auto! m-0! translate-x-0! translate-y-0!"
            onClick={() => handleManualNav(() => api?.scrollPrev())} />

          {Array.from({ length: count }).map((_, index) => (
            <button key={index}
              className={cn(
                "h-3.5 w-3.5 rounded-full border-2",
                {
                  "border-primary": current === index + 1,
                }
              )}
              onClick={() => handleManualNav(() => api?.scrollTo(index))
              }
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}

          <CarouselNext
            className="static! inset-auto! m-0! translate-x-0! translate-y-0!"
            onClick={() =>
              handleManualNav(() => api?.scrollNext())
            }
          />

        </div>
      </Carousel>
    </div>
  );
}