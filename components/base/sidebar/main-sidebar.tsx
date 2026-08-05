"use client"

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

type NavigationItem = {
    label: string
    href: string
    icon: LucideIcon
}

const mainNavigation: NavigationItem[] = [
    {
        label: "Home",
        href: "/",
        icon: House,
    },
    {
        label: "Discover",
        href: "/events",
        icon: Compass,
    },
    {
        label: "Organizers",
        href: "/organizations",
        icon: Building2,
    },
]

const ticketNavigation: NavigationItem[] = [
    {
        label: "My Tickets",
        href: "/tickets",
        icon: Ticket,
    },
]

const dashboardNavigation: NavigationItem[] = [
    {
        label: "Dashboard",
        href: "/dashboard",
        icon: LayoutDashboard,
    },
]

export function MainSidebar() {
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
                {/* Main navigation */}
                {mainNavigation.map((item) => (
                    <SidebarItem
                        key={item.href}
                        item={item}
                        active={isActive(item.href)}
                    />
                ))}

                <SidebarSeparator />

                {/* Tickets */}
                {ticketNavigation.map((item) => (
                    <SidebarItem
                        key={item.href}
                        item={item}
                        active={isActive(item.href)}
                    />
                ))}

                <SidebarSeparator />

                {/* Dashboard */}
                {dashboardNavigation.map((item) => (
                    <SidebarItem
                        key={item.href}
                        item={item}
                        active={isActive(item.href)}
                    />
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

function SidebarSeparator() {
    return (
        <div className="my-1.5 px-2">
            <div className="h-px bg-border" />
        </div>
    )
}