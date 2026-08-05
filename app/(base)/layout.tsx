import { Navbar } from "@/components/base/navbar/navbar"
import { MainSidebar } from "@/components/base/sidebar/main-sidebar"

export default function BaseLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <div className="min-h-dvh bg-background">
            <Navbar />
            <MainSidebar />
            <main>
                {children}
            </main>
        </div>
    )
}