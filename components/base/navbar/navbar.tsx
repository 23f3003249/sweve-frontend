import Link from 'next/link'
import { BookmarkIcon } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { UserButton } from '@/components/auth/user/user-button'

import { SearchBtn } from './search'

export function Navbar() {
    return (
        <header className={cn('fixed inset-x-0 top-0 z-50 w-full', 'transition-[background-color,border-color,backdrop-filter] duration-300')}>
            <nav className="flex h-16 w-full items-center justify-between px-4 sm:px-6 lg:px-8 bg-background/50 backdrop-blur-md border-b border-border/50 shadow-md">
                {/* Brand */}
                <Link href="/" className="text-xl font-semibold tracking-tight text-foreground">
                    sweve
                </Link>

                {/* Actions */}
                <div className="flex items-center gap-2">
                    {/* Search */}
                    <SearchBtn type="button" variant="ghost" size="icon" aria-label="Search" />

                    {/* Saved Events */}
                    <Button variant="ghost" size="icon" asChild>
                        <Link href="/saved" aria-label="Saved events">
                            <BookmarkIcon />
                        </Link>
                    </Button>

                    {/* Profile */}
                    <UserButton size="icon" />
                </div>
            </nav>
        </header>
    );
}
