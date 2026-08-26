"use client"

import * as React from "react"
import { WheelGesturesPlugin } from 'embla-carousel-wheel-gestures'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
} from "@/components/ui/carousel"

export type OrganizationCardData = {
  id: string
  name: string
  logoSrc: string
  logoAlt?: string
  bannerSrc: string
  bannerAlt?: string
  category: string
  description?: string
  href: string
}

type OrganizationCarouselProps = {
  children: React.ReactNode
  className?: string
  title?: string
}

export function OrganizationCarousel({
  children,
  className,
  title,
}: OrganizationCarouselProps) {
  return (
    <div className="w-full">
      {title && (
        <h2 className="mb-4 text-xl font-semibold md:text-2xl">
          {title}
        </h2>
      )}

      <Carousel
        opts={{
          align: "start",
        }}
        plugins={[WheelGesturesPlugin({})]}
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

export function OrganizationCarouselItem({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <CarouselItem className="pl-3 md:pl-4 basis-[90%] sm:basis-1/2 lg:basis-1/4">
      <div className="p-0.5">
        {children}
      </div>
    </CarouselItem>
  )
}