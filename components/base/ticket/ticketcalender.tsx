// @/components/base/ticket/ticketcalender.tsx
"use client"

import * as React from "react"
import { format, parse } from "date-fns"
import { useSearchParams, usePathname, useRouter } from "next/navigation"
import { EventCalendar, type CalendarEvent } from "@/components/ui/custom/appcalender"
import type { TicketCardData } from "@/components/base/ticket/card/ticketcard"
import type { KeywordItemType } from "@/lib/ui/calender-color"

interface TicketCalendarProps {
    tickets?: TicketCardData[]
    defaultDate?: Date
}

export function TicketCalendar({ tickets = [], defaultDate }: TicketCalendarProps) {
    const searchParams = useSearchParams()
    const pathname = usePathname()
    const router = useRouter()

    const dateParam = searchParams.get("date")
    const date = dateParam ? parse(dateParam, "yyyy-MM-dd", new Date()) : defaultDate

    const handleDateSelect = React.useCallback((selectedDate: Date | undefined) => {
        if (!selectedDate) return
        const params = new URLSearchParams(searchParams)
        params.set("date", format(selectedDate, "yyyy-MM-dd"))
        router.push(`${pathname}?${params.toString()}`)
    }, [searchParams, pathname, router])

    // Transform the raw tickets into the format the calendar needs
    const calendarEvents = React.useMemo(() => {
        const eventsByDate: Record<string, CalendarEvent[]> = {}

        tickets.forEach((ticket) => {
            const dateObj = new Date(ticket.eventDate)
            const dateKey = format(dateObj, "yyyy-MM-dd")

            // Fallback categorization logic
            let category: KeywordItemType = "technology"
            if (ticket.eventName.toLowerCase().includes("design")) category = "design"
            if (ticket.eventName.toLowerCase().includes("ai")) category = "science"
            if (ticket.eventName.toLowerCase().includes("react")) category = "web-dev"

            const formattedEvent: CalendarEvent = {
                id: ticket.id,
                title: ticket.eventName,
                category: category,
            }

            if (!eventsByDate[dateKey]) {
                eventsByDate[dateKey] = []
            }
            eventsByDate[dateKey].push(formattedEvent)
        })

        return eventsByDate
    }, [tickets])

    return (
        <EventCalendar
            mode="single"
            captionLayout="dropdown"
            selected={date}
            onSelect={handleDateSelect}
            eventsData={calendarEvents}
            className="border rounded-xl"
        />
    )
}