import Link from "next/link"

import { Ripple } from "@/components/ui/ripple"

export default function AuthLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <main className="relative isolate flex min-h-dvh items-center justify-center overflow-hidden bg-background p-4 md:p-6">
            {/* Background */}
            <div
                className="pointer-events-none absolute inset-0"
                aria-hidden="true"
            >
                <Ripple />
            </div>

            {/* Auth content */}
            <div className="relative z-10 flex w-full flex-col items-center justify-center">
                <Link
                    href="/"
                    className="mb-4 flex items-center gap-2 font-semibold"
                >
                    Sweve Inc.
                </Link>
                {children}
            </div>
        </main>
    )
}