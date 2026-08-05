"use client"

import { createContext, Fragment, useContext, useState, type ReactNode } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
    Building2,
    Compass,
    House,
    LayoutDashboard,
    Ticket,
    type LucideIcon,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

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
    setNavigation: React.Dispatch<React.SetStateAction<NavigationItem[]>>
}

const NavigationContext = createContext<NavigationContextValue | undefined>(undefined)

export function NavigationProvider({ children }: { children: ReactNode }) {
    const [navigation, setNavigation] = useState<NavigationItem[]>(navigationItems)

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
        if (href === "/") {
            return pathname === "/"
        }

        return pathname.startsWith(href)
    }

    return (
        <aside
            className={cn(
                "group fixed left-4 top-1/2 z-40 -translate-y-1/2",
                "w-14 hover:w-52",
                "overflow-hidden rounded-2xl",
                "border border-border/50",
                "bg-background/90 backdrop-blur-xl",
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
                        />

                        {item.separatorAfter && <Separator />}
                    </Fragment>
                ))}
            </nav>
        </aside>
    )
}

function SidebarItem({
    item,
    active,
}: {
    item: NavigationItem
    active: boolean
}) {
    const Icon = item.icon

    return (
        <Button
            variant={active ? "secondary" : "ghost"}
            asChild
            className={cn(
                "h-10 w-full justify-start gap-3 rounded-xl px-3",
                "text-muted-foreground",
                "hover:text-foreground",
                active && "text-foreground"
            )}
        >
            <Link
                href={item.href}
                aria-current={active ? "page" : undefined}
            >
                <Icon className="size-4 shrink-0" />

                <span
                    className={cn(
                        "whitespace-nowrap",
                        "opacity-0 transition-opacity duration-200",
                        "group-hover:opacity-100"
                    )}
                >
                    {item.label}
                </span>
            </Link>
        </Button>
    )
}