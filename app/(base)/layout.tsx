import { Navbar } from "@/components/base/navbar/navbar"
import { MainSidebar, type NavigationItem } from "@/components/base/sidebar/main-sidebar"

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
        label: "Organizers",
        href: "/organizations",
        separatorAfter: true,
    },
    {
        label: "My Tickets",
        href: "/tickets",
        separatorAfter: true,
    },
    {
        label: "Dashboard",
        href: "/dashboard",
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
            <MainSidebar navItems={navigationItems} />
            <main>
                {children}
            </main>
        </div>
    )
}