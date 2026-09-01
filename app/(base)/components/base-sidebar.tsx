"use client"

import { MainSidebar, type NavigationItem } from "@/components/base/sidebar/main-sidebar";
import { MainSidebarSkeleton } from "@/components/base/sidebar/main-sidebar-skeleton";
import { 
    Building2, Compass, House, 
    LayoutDashboard, Sparkle, Ticket 
} from "lucide-react";
import { Suspense } from "react";

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
        label: "New",
        href: "/create",
        icon: Sparkle,
        special: true,
        localPropAnchor: "beginner",
    },
    {
        label: "Organizers",
        href: "/organizations",
        icon: Building2,
    },
    {
        label: "My Tickets",
        href: "/tickets/upcoming",
        icon: Ticket,
    },
    {
        label: "Dashboard",
        href: "/dashboard",
        icon: LayoutDashboard,
        // HlocalPropAnchor: "beginner",
    },
]

export function BaseSidebar() {
    return (
        <Suspense fallback={MainSidebarSkeleton({ navItems: navigationItems })}>
            <MainSidebar navItems={navigationItems} />
        </Suspense>
    )
}