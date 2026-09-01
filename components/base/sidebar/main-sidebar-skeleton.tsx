import { Fragment } from "react"
import {
    ChevronLeft, ChevronRight, Info,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

import { Item, type NavigationItem } from "./main-sidebar"

export function MainSidebarSkeleton({ navItems }: { navItems: NavigationItem[] }) {


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
                            {
                                !item.localPropAnchor && 
                                <Item 
                                    item={item} 
                                    active={false} 
                                    mobile={false} 
                                    Icon={item.icon || Info} 
                                />
                            }

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
                        !item.localPropAnchor && 
                        <Item 
                            key={item.href}
                            item={item} 
                            active={false} 
                            mobile
                            Icon={item.icon || Info} 
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
