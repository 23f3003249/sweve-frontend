import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export type HostedByData = {
  name: string
  logoSrc: string
  logoAlt?: string
  href: string
}

type HostedByProps = {
  host: HostedByData
  onFollow?: () => void
}

export default function HostedBy({ host, onFollow }: HostedByProps) {
  return (
    <Card>
      <CardHeader className="text-lg text-foreground">Hosted By</CardHeader>
      <CardContent className="flex items-center justify-between gap-4">
        <Link href={host.href} className="flex min-w-0 items-center gap-4">
          <div className="relative size-12 shrink-0 overflow-hidden rounded-full">
            <Image
              src={host.logoSrc}
              alt={host.logoAlt ?? `${host.name} logo`}
              fill
              sizes="48px"
              unoptimized
              className="object-contain"
            />
          </div>
          <h3 className="truncate text-lg font-semibold text-foreground">{host.name}</h3>
        </Link>
        <Button type="button" variant="outline" size="sm" className="shrink-0" onClick={onFollow}>
          Follow
        </Button>
      </CardContent>
    </Card>
  )
}
