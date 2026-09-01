import { Navbar } from "@/components/base/navbar/navbar"
import { BaseSidebar } from "./components/base-sidebar"

export default function BaseLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <div className="min-h-dvh bg-background">
            <Navbar />
            <BaseSidebar />
            <main>
                {children}
            </main>
        </div>
    )
}