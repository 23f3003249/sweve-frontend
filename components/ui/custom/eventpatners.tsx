import Image from "next/image"

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Card, CardContent } from "@/components/ui/card"

export type EventPartner = {
  name: string
  title: string
  imageSrc: string
  imageAlt?: string
  order: number
}

type EventPartnersProps = {
  partners: EventPartner[]
}

export default function EventPartners({ partners }: EventPartnersProps) {
  return (
    <TooltipProvider>
      <div className="flex flex-col gap-4">
        {[...partners]
          .sort((first, second) => first.order - second.order)
          .map((partner) => (
            <div key={`${partner.order}-${partner.name}`} className="space-y-1.5">
              <h3 className="text-l font-medium text-foreground mb-4">{partner.title}</h3>
              <Card size="sm" className="h-30 w-52 rounded-lg mb-3">
                <CardContent className="flex h-full items-center justify-center ">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="relative h-full w-full">
                        <Image
                          src={partner.imageSrc}
                          alt={partner.imageAlt ?? partner.name}
                          fill
                          sizes="(max-width: 640px) 100vw, 320px"
                          className="object-contain"
                        />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>{partner.name}</TooltipContent>
                  </Tooltip>
                </CardContent>
              </Card>
            </div>
          ))}
      </div>
    </TooltipProvider>
  )
}