'use client'

import * as React from 'react'
import {
    CalculatorIcon,
    CalendarIcon,
    CreditCardIcon,
    SearchIcon,
    SettingsIcon,
    SmileIcon,
    UserIcon
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
    Command,
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
    CommandShortcut
} from '@/components/ui/command'

import Link from 'next/link'

export function SearchBtn(props: React.ComponentProps<typeof Button>) {
    const [open, setOpen] = React.useState(false) 
    const { onClick, ...rest } = props 

    return (
        <>
            <Button
                onClick={(e) => {
                    setOpen(true) 
                    if (onClick) onClick(e) 
                }}
                {...rest}
            >
                <SearchIcon />
            </Button>
            <CommandDialog open={open} onOpenChange={setOpen}>
                <Command>
                    <CommandInput placeholder="Type a command or search..." />
                    <CommandList>
                        <CommandEmpty>No results found.</CommandEmpty>
                        <CommandGroup heading="Suggestions">
                            <Link href="/saved" aria-label="Saved events">
                                <CommandItem>
                                    <CalendarIcon />
                                    <span>Calendar</span>
                                </CommandItem>
                            </Link>
                            <CommandItem>
                                <SmileIcon />
                                <span>Search Emoji</span>
                            </CommandItem>
                            <CommandItem>
                                <CalculatorIcon />
                                <span>Calculator</span>
                            </CommandItem>
                        </CommandGroup>
                        <CommandSeparator />
                        <CommandGroup heading="Settings">
                            <CommandItem>
                                <UserIcon />
                                <span>Profile</span>
                                <CommandShortcut>⌘P</CommandShortcut>
                            </CommandItem>
                            <CommandItem>
                                <CreditCardIcon />
                                <span>Billing</span>
                                <CommandShortcut>⌘B</CommandShortcut>
                            </CommandItem>
                            <CommandItem>
                                <SettingsIcon />
                                <span>Settings</span>
                                <CommandShortcut>⌘S</CommandShortcut>
                            </CommandItem>
                        </CommandGroup>
                    </CommandList>
                </Command>
            </CommandDialog>
        </>
    ) 
}
