import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

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
}

type EventCarouselProps = {
  children: React.ReactNode
  className?: string
  title?: string
}

export function EventCarousel({ children, className, title }: EventCarouselProps) {
  return (
    <div className="w-full">
      {title && (
        <h2 className="text-xl md:text-2xl font-semibold mb-4">{title}</h2>
      )}
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
    </div>
  )
}

export function EventCarouselItem({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <CarouselItem className="basis-[90%] sm:basis-1/2 lg:basis-1/4">
      <div className="p-0.5">
        {children}
      </div>
    </CarouselItem>
  )
}