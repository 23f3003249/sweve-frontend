"use client"

import {
    createContext,
    Fragment,
    useContext,
    useState,
    type Dispatch,
    type ReactNode,
    type SetStateAction,
} from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
    Building2,
    Compass,
    House,
    LayoutDashboard,
    MoreHorizontal,
    Ticket,
    type LucideIcon,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

type NavigationItem = {
    label: string
    href: string
    icon: LucideIcon
    separatorAfter?: boolean
}

const navigationItems: NavigationItem[] = [
    {
        label: "Home",
        href: "/",
        icon: House,
    },
    {
        label: "Events",
        href: "/events",
        icon: Compass,
    },
    {
        label: "Organizers",
        href: "/organizations",
        icon: Building2,
        separatorAfter: true,
    },
    {
        label: "My Tickets",
        href: "/tickets",
        icon: Ticket,
        separatorAfter: true,
    },
    {
        label: "Dashboard",
        href: "/dashboard",
        icon: LayoutDashboard,
    },
]

type NavigationContextValue = {
    navigation: NavigationItem[]
    setNavigation: Dispatch<SetStateAction<NavigationItem[]>>
}

const NavigationContext = createContext<NavigationContextValue | undefined>(
    undefined
)

export function NavigationProvider({ children }: { children: ReactNode }) {
    const [navigation, setNavigation] =
        useState<NavigationItem[]>(navigationItems)

    return (
        <NavigationContext.Provider value={{ navigation, setNavigation }}>
            {children}
        </NavigationContext.Provider>
    )
}

export function useNavigation() {
    const context = useContext(NavigationContext)

    if (!context) {
        throw new Error("useNavigation must be used within a NavigationProvider")
    }

    return context
}

export function MainSidebar() {
    const { navigation } = useNavigation()
    const pathname = usePathname()

    const isActive = (href: string) => {
        if (href === "/") return pathname === "/"
        return pathname.startsWith(href)
    }

    const mobileLimit = 5
    const hasMore = navigation.length > mobileLimit
    const mobileVisibleItems = hasMore
        ? navigation.slice(0, mobileLimit - 1)
        : navigation
    const mobileOverflowItems = hasMore
        ? navigation.slice(mobileLimit - 1)
        : []

    const isOverflowActive = mobileOverflowItems.some((item) =>
        isActive(item.href)
    )

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
                    "shadow-lg",
                    "transition-[width] duration-300 ease-out"
                )}
            >
                <nav
                    className="flex flex-col gap-1 p-1.5"
                    aria-label="Main navigation"
                >
                    {navigation.map((item) => (
                        <Fragment key={item.href}>
                            <SidebarItem
                                item={item}
                                active={isActive(item.href)}
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
                    "shadow-lg",
                    "pb-[env(safe-area-inset-bottom)]"
                )}
                aria-label="Main navigation"
            >
                <nav className="flex items-center justify-around gap-1 px-2 py-2">
                    {mobileVisibleItems.map((item) => (
                        <Fragment key={item.href}>
                        <SidebarItem
                            item={item}
                            active={isActive(item.href)}
                            mobile
                        />

                            {item.separatorAfter && <Separator orientation="vertical"/>}
                        </Fragment>
                    ))}

                    {hasMore && (
                        <MobileMoreMenu
                            items={mobileOverflowItems}
                            active={isOverflowActive}
                            isActive={isActive}
                        />
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
    const Icon = item.icon

    return (
        <Button
            variant={active ? "secondary" : "ghost"}
            asChild
            className={cn(
                "shrink-0 rounded-xl",
                "text-muted-foreground",
                "hover:text-foreground",
                active && "text-foreground",

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

function MobileMoreMenu({
    items,
    active,
    isActive,
}: {
    items: NavigationItem[]
    active: boolean
    isActive: (href: string) => boolean
}) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    className={cn(
                        "h-11 w-11 shrink-0 justify-center rounded-xl p-0",
                        "text-muted-foreground",
                        "hover:bg-secondary hover:text-foreground",
                        active && "bg-secondary text-foreground"
                    )}
                    aria-label="More navigation"
                >
                    <MoreHorizontal className="size-5 shrink-0" />
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
                align="end"
                side="top"
                sideOffset={8}
                className={cn(
                    "w-auto",
                    "my-2", "rounded-lg",
                    "border-border/50",
                    "bg-background/90 backdrop-blur-xl",
                    "shadow-lg"
                )}
            >
                {items.map((item, index) => {
                    const Icon = item.icon
                    const itemActive = isActive(item.href)

                    return (
                        <Fragment key={item.href}>
                            <DropdownMenuItem asChild>
                                <Link
                                    href={item.href}
                                    aria-current={
                                        itemActive ? "page" : undefined
                                    }
                                    className={cn(
                                        "flex items-center gap-3",
                                        itemActive &&
                                        "bg-secondary text-foreground"
                                    )}
                                >
                                    <Icon className="size-4 shrink-0" />

                                    <span>{item.label}</span>
                                </Link>
                            </DropdownMenuItem>

                            {item.separatorAfter &&
                                index !== items.length - 1 && (
                                    <DropdownMenuSeparator />
                                )}
                        </Fragment>
                    )
                })}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}