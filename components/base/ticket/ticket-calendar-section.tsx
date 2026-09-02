"use client"

import { Suspense } from "react"
import { format, parse } from "date-fns"
import { Separator } from "@/components/ui/separator"
import { TicketCard, type TicketCardData } from "@/components/base/ticket/card/ticketcard"
import { TicketCalendar } from "@/components/base/ticket/ticketcalender"

interface TicketCalendarSectionProps {
    tickets: TicketCardData[]
    selectedDateStr?: string
}

export function TicketCalendarSection({ tickets, selectedDateStr }: TicketCalendarSectionProps) {
    const referenceDate = new Date("2024-01-01T00:00:00Z")

    const sortedByDate = [...tickets].sort((a, b) =>
        new Date(a.eventDate).getTime() - new Date(b.eventDate).getTime()
    )
    const defaultDate = sortedByDate[0]?.eventDate
    const currentSelectedDateStr = selectedDateStr || (defaultDate ? format(new Date(defaultDate), "yyyy-MM-dd") : undefined);
    const currentSelectedDate = currentSelectedDateStr ? parse(currentSelectedDateStr, "yyyy-MM-dd", referenceDate) : null;

    const filteredTickets = currentSelectedDateStr
        ? tickets.filter(ticket => {
            const ticketDate = new Date(ticket.eventDate)
            const selected = parse(currentSelectedDateStr, "yyyy-MM-dd", referenceDate)
            return format(ticketDate, "yyyy-MM-dd") === format(selected, "yyyy-MM-dd")
        })
        : tickets

    return (
        <div className="flex w-full flex-col gap-6 lg:flex-row lg:items-start">
            <div className="flex-1 min-w-0 space-y-4">
                {currentSelectedDate && (
                    <div className="mb-6 flex items-center gap-4">
                        <h2 className="text-lg font-semibold whitespace-nowrap">{format(currentSelectedDate, "MMMM d, yyyy")}</h2>
                        <Separator className="flex-1 max-w-xl" />
                    </div>
                )}
                {filteredTickets.length > 0 ? (
                    filteredTickets.map((ticket) => <TicketCard key={ticket.id} {...ticket} />)
                ) : (
                    <p className="text-muted-foreground">No tickets for this date.</p>
                )}
            </div>
            <div className="hidden shrink-0 lg:sticky lg:top-20 lg:block">
                <Suspense fallback={<div className="h-75 w-70 animate-pulse rounded-md border bg-muted" />}>
                    <TicketCalendar tickets={tickets} defaultDate={currentSelectedDate || undefined} />
                </Suspense>
            </div>
        </div>
    )
}
