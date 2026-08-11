import { Bookmark, CalendarDays, Eye, MapPin, Ticket, } from "lucide-react"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export function Card13() {
  return (
    <Card className="group/card relative w-full max-w-sm overflow-hidden p-0 border border-border/30 font-sans">
      <div className="relative aspect-square overflow-hidden rounded-xl">
        {/* Image */}
        <Image
          src="https://images.unsplash.com/photo-1525268771113-32d9e9021a97?q=80&w=880&auto=format&fit=crop"
          alt="Event"
          width={500}
          height={500}
          className="
            absolute inset-0
            h-full w-full
            object-cover
            transition-transform duration-700
            group-hover/card:scale-105
          "
        />

        {/* Top dark gradient */}
        <div className="absolute inset-x-0 top-0 h-1/2 bg-linear-to-b from-black/70 to-transparent" />

        {/* Bottom dark gradient */}
        <div className="absolute inset-x-0 bottom-0 h-2/3 bg-linear-to-t from-black/90 via-black/40 to-transparent" />

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/0 backdrop-blur-0 transition-all duration-300 group-hover/card:bg-black/50 group-hover/card:backdrop-blur-sm" />

        {/* Default content */}
        <div className="absolute inset-0 flex flex-col justify-between p-5 text-white transition-all duration-300 group-hover/card:opacity-0">
          {/* Badges */}
          <div className="flex items-start justify-between gap-2">
            <Badge variant="default" className="w-fit">DESIGN</Badge>
            <Badge variant="ghost" className="w-fit text-lg font-bold">$ 455
            </Badge>
          </div>

          {/* Event information */}
          <div className="space-y-1">
            <h3 className="text-2xl font-bold" >Internal Event 1</h3>
            <div className="flex items-center gap-1.5 text-sm">
              <CalendarDays className="size-3.5 shrink-0" />
              <span>Nov 10, 2027</span>
              <MapPin className="size-3.5 shrink-0" />
              <span>San Francisco, CA</span>
            </div>
          </div>
        </div>

        {/* Hover content */}
        <div className="absolute font-sans inset-x-0 bottom-0 flex translate-y-4 flex-col gap-4 p-5 text-white opacity-0 transition-all duration-300 group-hover/card:translate-y-0 group-hover/card:opacity-100">
          {/* Event information */}
          <div>
            <Badge variant="default" className="w-fit">DESIGN</Badge>
            <h3 className="mt-2 text-2xl font-bold">Internal Event 1</h3>
            <div className="mt-1 flex items-center gap-1.5 text-sm">
              <CalendarDays className="size-3.5 shrink-0" />
              <span>Nov 10, 2027</span>
              <MapPin className="size-3.5 shrink-0" />
              <span>San Francisco, CA</span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 font-sans">
            {/* Register */}
            <Button variant="default" className="h-11 flex-1 font-bold shadow-lg">
              <Ticket className="size-4.5" />
              REGISTER
            </Button>

            {/* Save */}
            <Button variant="ghost" size="icon" className="h-11 w-11" aria-label="Save event">
              <Bookmark className="size-4" />
            </Button>

            {/* Preview */}
            <Button variant="ghost" size="icon" className="h-11 w-11" aria-label="Preview event">
              <Eye className="size-4" />
            </Button>
          </div>
        </div>
      </div>
    </Card>
  )
}