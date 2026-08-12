import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

type EventCarouselProps = {
  children: React.ReactNode
  className?: string
}

export function EventCarousel({ children, className, }: EventCarouselProps) {
  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className={className}
    >
      <CarouselContent>
        {children}
      </CarouselContent>
      <CarouselPrevious className="hidden sm:inline-flex" />
      <CarouselNext className="hidden sm:inline-flex" />
    </Carousel>
  )
}

export function EventCarouselItem({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <CarouselItem className="basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
      <div className="p-1">
        {children}
      </div>
    </CarouselItem>
  )
}