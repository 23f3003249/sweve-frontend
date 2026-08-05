import Link from "next/link"
import { BookmarkIcon, SearchIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { UserButton } from "@/components/auth/user/user-button"


export function Navbar() {

    return (
        <header
            className={cn(
                "fixed inset-x-0 top-0 z-50 w-full",
                "transition-[background-color,border-color,backdrop-filter] duration-300",
            )}
        >
            <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

                {/* Brand */}
                <Link
                    href="/"
                    className="text-xl font-semibold tracking-tight text-foreground"
                >
                    sweve
                </Link>

                {/* Actions */}
                <div className="flex items-center gap-1">

                    {/* Search */}
                    <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        aria-label="Search"
                    >
                        <SearchIcon />
                    </Button>

                    {/* Saved Events */}
                    <Button
                        variant="ghost"
                        size="icon"
                        asChild
                    >
                        <Link
                            href="/saved"
                            aria-label="Saved events"
                        >
                            <BookmarkIcon />
                        </Link>
                    </Button>


                    {/* Profile */}
                    <UserButton size="icon" />
                </div>
            </div>
        </header>
    )
}