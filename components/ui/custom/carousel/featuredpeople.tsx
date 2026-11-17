"use client"

import * as React from "react"
import Autoplay from "embla-carousel-autoplay"
import { WheelGesturesPlugin } from "embla-carousel-wheel-gestures"
import { Card } from "@/components/ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel"

export type FeaturedPerson = {
    name: string
    designation: string
    imageSrc: string
}

export function FeaturedPeople({ people }: { people: FeaturedPerson[] }) {
    const wheelGestures = React.useMemo(() => WheelGesturesPlugin(), [])
    const autoplay = React.useMemo(
        () => Autoplay({ delay: 1800, stopOnInteraction: false, stopOnMouseEnter: true }),
        [],
    )

    return (
        <Carousel
            opts={{
                align: "start",
                loop: true,
                dragFree: true,
            }}
            plugins={[autoplay, wheelGestures]}
            className="w-full max-w-3xl"
        >
            <CarouselContent className="-ml-3">
                {people.map((person) => (
                    <CarouselItem key={person.name} className="basis-1/2 pl-3 sm:basis-1/3">
                        <div className="p-1 text-center">
                            <Card className="overflow-hidden rounded-full border-0 bg-transparent p-0 shadow-none">
                                <img
                                    src={person.imageSrc}
                                    alt={person.name}
                                    width={400}
                                    height={400}
                                    className="aspect-square w-full rounded-full object-cover"
                                />
                            </Card>
                            <div className="pt-3">
                                <div className="font-medium text-foreground">{person.name}</div>
                                <div className="text-xs text-muted-foreground">{person.designation}</div>
                            </div>
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
        </Carousel>
    )
}
