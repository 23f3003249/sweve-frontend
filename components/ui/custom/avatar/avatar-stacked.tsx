import {
    Avatar,
    AvatarFallback,
    AvatarGroup,
    AvatarGroupCount,
    AvatarImage,
} from "@/components/ui/avatar"

import { cva, VariantProps } from "class-variance-authority"
import { getImageProps } from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"

const AvatarVariants = cva(
    "-space-x-(--overlap)",
    {
        variants: {
            /**
             * Defines the color of the ring around avatars
             */
            mask: {
                default: "*:data-[slot=avatar]:ring-background",
                primary: "*:data-[slot=avatar]:ring-primary",
                secondary: "*:data-[slot=avatar]:ring-secondary",
                muted: "*:data-[slot=avatar]:ring-muted-foreground",
                destructive: "*:data-[slot=avatar]:ring-destructive",
                outline: "*:data-[slot=avatar]:ring-foreground",
            },
            /**
             * Defines size of the ring around avatars
             */
            ring: {
                default: "*:data-[slot=avatar]:ring-2",
                sm: "*:data-[slot=avatar]:ring-1",
                lg: "*:data-[slot=avatar]:ring-3",
                hidden: "*:data-[slot=avatar]:ring-0",
            }
        },
        defaultVariants: {
            mask: "default",
            ring: "default",
        },
    }
)

export type AvatarItemType = {
    /**
     * The source URL of the avatar image
     */
    src: string
    /**
     * The identifier for the avatar, used for accessibility and alternate text
     */
    identifier: string
    /**
     * The fallback text to display when the image is not available. 
     * Typically, this would be initials or a short representation of the identifier.
     */
    fallback?: string
    /**
     * Optional href for the avatar. If provided, the avatar will be wrapped in a link.
     * Useful for linking to user profiles or other relevant pages.
     */
    href?: string
}

export type AvatarStackedProps = {
    className?: string
    /**
     * List of avatars
     */
    items: AvatarItemType[]
    /**
     * Max number of avatars to be displayed
     */
    maxItems?: number
    /**
     * Size of individual avatars
     * @default "default"
     */
    size?: React.ComponentProps<typeof Avatar>['size']
    /**
     * Overlap amount for avatars in a stacked order in percentage
     * @default 25%
     */
    overlap?: number
    /**
     * If provided then it will be rendered instead of the ending count component  
     */
    endComponent?: React.ReactNode
} & VariantProps<typeof AvatarVariants>


export function AvatarStacked({
    className,
    items,
    maxItems,
    size = "default",
    overlap = 25,
    mask,
    ring,
    endComponent
}: AvatarStackedProps) {
    const visibleItems = maxItems ? items.slice(0, maxItems) : items

    return (
        <AvatarGroup
            style={
                {
                    "--overlap": `${overlap / 100}rem`,
                } as React.CSSProperties
            }
            className={cn(
                AvatarVariants({ mask, ring }),
                className
            )}
        >
            {/* Render the visible avatar items */}
            {visibleItems.map((item, index) =>
                <OptimizedAvatarItem key={index} item={item} size={size} />
            )}

            {/* Render the count of remaining items if maxItems is set and there are more items */}
            {endComponent ?
                endComponent :
                (Boolean(maxItems) && maxItems && items.length > maxItems) &&
                <AvatarGroupCount>
                    +{items.length - maxItems}
                </AvatarGroupCount>
            }
        </AvatarGroup>
    )
}


export function OptimizedAvatarItem({
    item,
    size,
}: {
    item: AvatarItemType
    size?: React.ComponentProps<typeof Avatar>['size']
}) {

    // Get the Next.js optimized Image props for the avatar image
    const { props: nextImageProps } = getImageProps({
        src: item.src,
        alt: "@" + item.identifier,
        fill: true,
    });

    if (item.href) {
        return (
            <Avatar asChild size={size}>
                <Link href={item.href} aria-label={item.identifier}>
                    <AvatarImage {...nextImageProps} />
                    <AvatarFallback>{item.fallback}</AvatarFallback>
                </Link>
            </Avatar>
        )
    }
    return (
        <Avatar size={size} aria-label={item.identifier}>
            <AvatarImage {...nextImageProps} />
            <AvatarFallback>{item.fallback}</AvatarFallback>
        </Avatar>
    )
}