"use client"

import Image from "next/image"
import Link from "next/link"
import { Check } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

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

export type OrganizationCardProps = OrganizationCardData & {
    className?: string
}

export function OrganizationCard({
    className,
    id,
    name,
    logoSrc,
    logoAlt,
    bannerSrc,
    bannerAlt,
    category,
    description,
    href = "#",
}: OrganizationCardProps) {
    const [isFollowing, setIsFollowing] = useState(false)

    const handleFollow = () => {
        setIsFollowing((prev) => !prev)
    }

    const cardContent = (
        <Card
            data-organization-id={id}
            className={cn(
                "group relative w-full overflow-hidden rounded-lg border-0 p-0",
                className
            )}
        >
            {/* Banner */}
            <div className="relative aspect-video w-full overflow-hidden">
                <Image
                    src={bannerSrc}
                    alt={bannerAlt ?? `${name} banner`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 25vw"
                />
            </div>

            {/* Content */}
            <div className="px-[5%] pb-[5%]">
                {/* Logo + Follow */}
                <div className="flex items-end justify-between gap-4">
                    {/* Logo */}
                    <div className="relative mt-[-10%] aspect-square w-[22%] shrink-0 overflow-hidden rounded-md bg-background shadow-md">
                        <Image
                            src={logoSrc}
                            alt={logoAlt ?? `${name} logo`}
                            fill
                            className="object-cover"
                            sizes="12vw"
                        />
                    </div>

                    {/* Follow */}
                    <Button
                        type="button"
                        variant={isFollowing ? "secondary" : "default"}
                        size="sm"
                        className="mb-[1%] rounded-md px-[1em] font-medium"
                        onClick={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                            handleFollow()
                        }}
                    >
                        {isFollowing ? (
                            <>
                                <Check className="size-4" />
                                Following
                            </>
                        ) : (
                            "Follow"
                        )}
                    </Button>
                </div>

                {/* Organization info */}
                <div className="mt-[3%]">
                    <p className="text-sm text-muted-foreground">
                        {category}
                    </p>

                    <h3 className="mt-1 text-lg font-semibold tracking-tight">
                        {name}
                    </h3>

                    {description && (
                        <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                            {description}
                        </p>
                    )}
                </div>
            </div>
        </Card>
    )

    return href && href !== "#" ? (
        <Link href={href} className="block">
            {cardContent}
        </Link>
    ) : (
        cardContent
    )
}