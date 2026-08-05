import { Navbar } from "@/components/base/navbar/navbar"
import { MainSidebar, NavigationProvider } from "@/components/base/sidebar/main-sidebar"

export default function BaseLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <NavigationProvider>
            <div className="min-h-dvh bg-background">
                <Navbar />
                <MainSidebar />
                <main>
                    {children}
                </main>
            </div>
        </NavigationProvider>
    )
}