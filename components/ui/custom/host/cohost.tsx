import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export type CoHostData = {
  name: string
  logoSrc: string
  logoAlt?: string
  href: string
}

type CoHostProps = {
  hosts: CoHostData[]
}

export default function CoHost({ hosts }: CoHostProps) {
  return (
    <Card>
      <CardHeader className="text-lg text-foreground">Co-hosted By</CardHeader>
      <CardContent className="grid grid-cols-3 gap-3">
        {hosts.map((host) => (
          <Card key={host.name} size="sm">
            <CardContent className="p-3">
              <Link
                href={host.href}
                className="flex min-w-0 flex-col items-center gap-2 text-center"
              >
                <div className="relative size-14 overflow-hidden rounded-full">
                  <Image
                    src={host.logoSrc}
                    alt={host.logoAlt ?? `${host.name} logo`}
                    fill
                    sizes="56px"
                    unoptimized
                    className="object-contain"
                  />
                </div>
                <span className="w-full truncate text-sm font-medium text-foreground">{host.name}</span>
              </Link>
            </CardContent>
          </Card>
        ))}
      </CardContent>
    </Card>
  )
}
