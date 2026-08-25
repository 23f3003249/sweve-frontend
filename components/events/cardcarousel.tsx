"use client"

import * as React from "react"
import { WheelGesturesPlugin } from 'embla-carousel-wheel-gestures'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
} from "@/components/ui/carousel"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ChevronRight } from "lucide-react"

export type EventCardData = {
  id: string
  title: string
  imageSrc: string
  imageAlt?: string
  date: string
  location: string
  price: string
  category: string
  registerUrl: string
  isBookmarked?: boolean
}

type EventCarouselProps = {
  children: React.ReactNode
  className?: string
  title?: string
  url?: string
}

export function EventCarousel({ children, className, title, url }: EventCarouselProps) {
  const plugin = React.useRef(
    WheelGesturesPlugin({})
  )
  return (
    <div className="w-full">
      {title && (
        <div className="w-full justify-between flex">
          <h2 className="text-xl md:text-2xl font-semibold mb-4">{title}</h2>
          {url && (
            <Button asChild variant="ghost">
              <Link href={url} aria-label="View more" className="text-sm md:text-base font-medium">
                <ChevronRight/>
              </Link>
            </Button>
          )}
        </div>
      )}
      <Carousel
        opts={{
          align: "start",
        }}
        plugins={[plugin.current]}
        className={className}
      >
        <CarouselContent>
          {children}
        </CarouselContent>
        {/* <CarouselPrevious className="hidden sm:inline-flex" /> */}
        <CarouselNext className="hidden sm:inline-flex" />
      </Carousel>
    </div>
  )
}

export function EventCarouselItem({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <CarouselItem className="pl-3 md:pl-4 basis-[90%] sm:basis-1/2 lg:basis-1/3 xl:basis-1/4">
      <div className="p-0.5">
        {children}
      </div>
    </CarouselItem>
  )
}