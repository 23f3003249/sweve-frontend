"use client"

import { Calendar, CalendarDayButton } from "@/components/ui/calendar"
import { useState } from "react"
import { cn } from "@/lib/utils"

export type CalendarEvent = {
    date: string
}

type AppCalenderProps = {
    events?: CalendarEvent[]
    className?: string
}

function getDateKey(date: Date) {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, "0")
    const day = String(date.getDate()).padStart(2, "0")

    return `${year}-${month}-${day}`
}

function getStatusClass(eventCount: number) {
    if (eventCount <= 0) {
        return undefined
    } else if (eventCount <= 3) {
        return "bg-chart-1"
    } else if (eventCount <= 6) {
        return "bg-chart-2"
    } else if (eventCount <= 9) {
        return "bg-chart-3"
    } else if (eventCount <= 12) {
        return "bg-chart-4"
    } else {
        return "bg-chart-5"
    }
}

export function AppCalender({ events = [], className }: AppCalenderProps) {
    const [date, setDate] = useState<Date | undefined>();
    const eventCountMap = new Map<string, number>()

    for (const event of events) {
        const count = eventCountMap.get(event.date) ?? 0
        eventCountMap.set(event.date, count + 1)
    }

    return (
        <Calendar
            mode="single"
            captionLayout="dropdown"
            selected={date}
            onSelect={setDate}
            showOutsideDays={false}
            className={cn("rounded-lg border [--cell-size:--spacing(9)] md:[--cell-size:--spacing(10)]", className)}
            components={{
                DayButton: ({ children, modifiers, day, ...props }) => {
                    const dateKey = getDateKey(day.date)
                    const eventCount = eventCountMap.get(dateKey) ?? 0
                    const statusClass = getStatusClass(eventCount)

                    return (
                        <CalendarDayButton day={day} modifiers={modifiers} {...props} className="flex h-full flex-col gap-1 dark:hover:data-[selected-single=true]:bg-primary">
                            {children}
                            {statusClass !== undefined && (
                                <span className={cn("h-1 w-6 rounded-full", statusClass)} />
                            )}
                        </CalendarDayButton>
                    )
                },
            }}
        />
    )
}
