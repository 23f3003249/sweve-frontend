import { Navbar } from "@/components/base/navbar/navbar"
import { MainSidebar, type NavigationItem } from "@/components/base/sidebar/main-sidebar"
import { MainSidebarSkeleton } from "@/components/base/sidebar/main-sidebar-skeleton"
import { Suspense } from "react"

const navigationItems: NavigationItem[] = [
    {
        label: "Home",
        href: "/",
    },
    {
        label: "Events",
        href: "/events",
    },
    {
        label: "New",
        href: "/create",
        special: true,
        localPropAnchor: "beginner",
    },
    {
        label: "Organizers",
        href: "/organizations",
    },
    {
        label: "My Tickets",
        href: "/tickets",
    },
    {
        label: "Dashboard",
        href: "/dashboard",
        // HlocalPropAnchor: "beginner",
    },
]

export default function BaseLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <div className="min-h-dvh bg-background">
            <Navbar />
            <Suspense fallback={MainSidebarSkeleton({ navItems: navigationItems })}>
                <MainSidebar navItems={navigationItems} />
            </Suspense>
            <main>
                {children}
            </main>
        </div>
    )
}