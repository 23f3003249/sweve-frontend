"use client"

import { Calendar, CalendarDayButton } from "@/components/ui/calendar"
import { useState } from "react"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"

export type CalendarEvent = {
    date: string
}

type AppCalenderProps = {
    events?: CalendarEvent[]
    className?: string
}
const progressValues = [20, 40, 65, 80, 100]

const GradientBar = ({ value }: { value: number }) => (
    <Progress value={value} className=" h-1 w-6 bg-purple-500/20 [&>div]:bg-linear-to-r [&>div]:from-green-500 [&>div]:via-yellow-500 [&>div]:to-red-500 " />
)

function getDateKey(date: Date) {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, "0")
    const day = String(date.getDate()).padStart(2, "0")

    return `${year}-${month}-${day}`
}

function getProgressFromEventCount(eventCount: number) {
    if (eventCount <= 0) {
        return undefined
    }

    const index = Math.min(
        eventCount - 1,
        progressValues.length - 1
    )

    return progressValues[index]
}

export function AppCalender({ events = [], className }: AppCalenderProps) {
    const [date, setDate] = useState<Date | undefined>(new Date());
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
                    const progress = getProgressFromEventCount(eventCount)

                    return (
                        <CalendarDayButton day={day} modifiers={modifiers} {...props} className="flex h-full flex-col gap-1">
                            {children}
                            {progress !== undefined && (
                                <span><GradientBar value={progress} /> </span>
                            )}
                        </CalendarDayButton>
                    )
                },
            }}
        />
    )
}
