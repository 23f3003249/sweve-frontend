"use client"

import * as React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { type CarouselApi, 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious, 
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button"
import { 
  Bookmark, 
  CalendarDays, 
  MapPin, 
  Share2, 
  Ticket,
} from "lucide-react";
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
  const [api, setApi] = React.useState<CarouselApi>()
  const [current, setCurrent] = React.useState(0)
  const [count, setCount] = React.useState(0)

  // Auto-slide
  const plugin = React.useRef(
    Autoplay({ delay: 10000 })
  )

  React.useEffect(() => {
    if (!api) return

    const len = api.scrollSnapList().length
    setCount(len)
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
              <div className="absolute inset-x-0 bottom-0 z-10 bg-linear-to-t from-black/80 via-black/60 to-transparent p-10 pt-32 text-white sm:pl-24 sm:p-15">
                <div className="flex max-w-3xl flex-col items-start mb-10 sm:ml-8 gap-5">
                  <Badge className="p-3">{slide.eventType}</Badge>
                  <h3 className="max-w-2xl text-3xl font-bold tracking-tight leading-tight sm:text-5xl">
                    {slide.title}
                  </h3>
                  <div className="flex flex-wrap items-center gap-3 text-sm text-white/90">
                    <div className="flex items-center gap-2 rounded-full bg-black/50 px-3.5 py-2 backdrop-blur-sm">
                      <CalendarDays className="size-3.5 shrink-0" />
                      <span className="text-xs md:text-md">{slide.dateTime}</span>
                    </div>
                    <div className="flex items-center gap-2 rounded-full bg-black/50 px-3.5 py-1.5 backdrop-blur-sm">
                      <MapPin className="size-3.5 shrink-0" />
                      <span className="text-xs md:text-md">{slide.location}</span>
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
                    <Button size="icon" className="h-11 w-11 bg-zinc-100 text-zinc-900 hover:bg-zinc-900 hover:text-zinc-100" aria-label="Save event">
                      <Bookmark className="size-4" />
                    </Button>
                    <Button size="icon" className="h-11 w-11 bg-zinc-100 text-zinc-900 hover:bg-zinc-900 hover:text-zinc-100" aria-label="Share event">
                      <Share2 className="size-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Carousel Controls */}
        <div className="absolute -bottom-10 left-1/2 flex -translate-x-1/2 items-center gap-2">

          <CarouselPrevious className="static! inset-auto! m-0! translate-x-0! translate-y-0!" />

          {Array.from({ length: count }).map((_, index) => (
            <button key={index}
              className={cn(
                "h-3.5 w-3.5 rounded-full border-2 transition-border duration-200 ease-in", 
                current === index + 1 && "border-primary",
              )}
              onClick={() => api?.scrollTo(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}

          <CarouselNext className="static! inset-auto! m-0! translate-x-0! translate-y-0!" />

        </div>
      </Carousel>
    </div>
  );
}