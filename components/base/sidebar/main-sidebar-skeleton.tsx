import { Fragment } from "react"
import Link from "next/link"
import {
    type LucideIcon, ChevronLeft, ChevronRight, Info,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

import { iconMap, NavigationItem } from "./main-sidebar"

export function MainSidebarSkeleton({ navItems }: { navItems: NavigationItem[] }) {
    navItems.forEach((item) => {
        if (!item.icon) {
            item.icon = iconMap[item.href]
        }
    })


    const MOBILE_NAV_SLOTS = 5
    const hasMore = navItems.length > MOBILE_NAV_SLOTS
    const MOBILE_PAGE_SIZE = MOBILE_NAV_SLOTS - 1
    const navigationPages = hasMore ? Array.from(
        {
            length: Math.ceil(navItems.length / MOBILE_PAGE_SIZE),
        },
        (_, index) => {
            const maxStartIndex = Math.max(0, navItems.length - MOBILE_PAGE_SIZE)
            const startIndex = Math.min(index * MOBILE_PAGE_SIZE, maxStartIndex)

            return navItems.slice(startIndex, startIndex + MOBILE_PAGE_SIZE)
        }
    )
        : [navItems]
    
    const currentPage = 0
    const mobileVisibleItems = navigationPages[currentPage]

    return (
        <>
            {/* Desktop sidebar */}
            <aside
                className={cn(
                    "group fixed left-4 top-1/2 z-40 hidden -translate-y-1/2 sm:block",
                    "w-14 hover:w-52",
                    "overflow-hidden rounded-2xl",
                    "border border-border/50",
                    "bg-background/60 backdrop-blur-xl",
                    "shadow-md",
                    "transition-[width] duration-300 ease-out"
                )}
                aria-label="Main navigation desktop"
            >
                <nav
                    className="flex flex-col gap-1 p-1.5"
                >
                    {navItems.map((item) => (
                        <Fragment key={item.href}>
                            <SidebarItem
                                item={item}
                                active={false}
                                mobile={false}
                            />

                            {item.separatorAfter && <Separator />}
                        </Fragment>
                    ))}
                </nav>
            </aside>

            {/* Mobile bottom bar */}
            <aside
                className={cn(
                    "fixed inset-x-0 bottom-0 z-40 sm:hidden",
                    "border-t border-border/50",
                    "bg-background/60 backdrop-blur-xl",
                    "shadow-md",
                    "pb-[env(safe-area-inset-bottom)]"
                )}
                aria-label="Main navigation mobile"
            >
                <nav className="flex items-center justify-around gap-1 px-2 py-2">
                    {mobileVisibleItems.map((item) => (
                        <SidebarItem
                            key={item.href}
                            item={item}
                            active={false}
                            mobile
                        />
                    ))}

                    {hasMore && (
                        <Button variant="ghost" className="h-11 w-11 shrink-0 rounded-xl p-0"
                            aria-label={
                                currentPage === navigationPages.length - 1
                                    ? "Previous navigation"
                                    : "Next navigation"
                            }
                        >
                            {currentPage === navigationPages.length - 1 ? (
                                <ChevronLeft className="size-5" />
                            ) : (
                                <ChevronRight className="size-5" />
                            )}
                        </Button>
                    )}
                </nav>
            </aside>
        </>
    )
}

function SidebarItem({
    item,
    active,
    mobile,
}: {
    item: NavigationItem
    active: boolean
    mobile: boolean
}) {
    const Icon = item.icon || Info

    if (item.localPropAnchor) {
    }

    if (item.HlocalPropAnchor) {
    }

    return (
        !item.localPropAnchor && 
        <Item item={item} active={active} mobile={mobile} Icon={Icon} />
    )
}

function Item({
    item,
    Icon,
    active,
    mobile,
}: {
    item: NavigationItem
    Icon: LucideIcon
    active: boolean
    mobile: boolean
}) {
    return (
        <Button
            variant={item.special ? "default" : (active ? "secondary" : "ghost")}
            asChild
            className={cn(
                "shrink-0 rounded-xl transition-all duration-300 ease-out",
                !item.special && "text-muted-foreground",
                item.special ? "hover:bg-primary text-zinc-900" : "hover:text-foreground",
                !item.special && active && "text-foreground",

                mobile
                    ? "h-11 w-11 justify-center p-0"
                    : "h-10 w-full justify-start gap-3 px-3"
            )}
        >
            <Link
                href={item.href}
                aria-label={item.label}
                aria-current={active ? "page" : undefined}
            >
                <Icon className={cn("shrink-0", mobile ? "size-5" : "size-4")} />

                {!mobile && (
                    <span
                        className={cn(
                            "whitespace-nowrap",
                            "opacity-0 transition-opacity duration-200",
                            "group-hover:opacity-100"
                        )}
                    >
                        {item.label}
                    </span>
                )}
            </Link>
        </Button>
    )
}