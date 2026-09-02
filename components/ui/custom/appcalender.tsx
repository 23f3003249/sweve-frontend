"use client"

import * as React from "react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

// Import your existing shadcn components
import { Calendar, CalendarDayButton } from "@/components/ui/calendar"
import { categoryColorMap, type KeywordItemType } from "@/lib/ui/calender-color"

export type CalendarEvent = {
  id: string
  title: string
  category: KeywordItemType
}

// Extend the standard Calendar props so it remains fully flexible
type EventCalendarProps = React.ComponentProps<typeof Calendar> & {
  eventsData?: Record<string, CalendarEvent[]> // Keyed by YYYY-MM-DD
  maxVisibleDots?: number
}

export function EventCalendar({
  eventsData = {},
  maxVisibleDots = 3,
  className,
  components,
  ...props
}: EventCalendarProps) {
  return (
    <Calendar
      className={cn(
        "[--cell-size:--spacing(13)] [--cell-radius:--radius-lg] p-2",
        className
      )}
      components={{
        ...components, // Preserve any other component overrides passed in
        DayButton: ({ children, modifiers, day, ...buttonProps }) => {
          const dateKey = format(day.date, "yyyy-MM-dd")
          const dayEvents = eventsData[dateKey] || []

          const visibleEvents = dayEvents.slice(0, maxVisibleDots)
          const extraEventsCount = dayEvents.length - maxVisibleDots

          return (
            <CalendarDayButton
              day={day}
              modifiers={modifiers}
              {...buttonProps}
              // Switch to a relative flex column to handle the dots gracefully
              className="relative flex flex-col items-center justify-center p-0"
            >
              {/* Default date number */}
              <span>{children}</span>

              {/* Event Dots Container */}
              {!modifiers.outside && dayEvents.length > 0 && (
                <div className="absolute bottom-1 flex items-center justify-center gap-0.5 w-full">
                  {visibleEvents.map((event) => (
                    <div
                      key={event.id}
                      className={`h-1 w-1 rounded-full ${categoryColorMap[event.category] || "bg-muted-foreground" // using shadcn semantic color fallback
                        }`}
                    />
                  ))}

                  {/* Overflow indicator */}
                  {extraEventsCount > 0 && (
                    <span className="text-[10px] font-bold text-muted-foreground dark:text-background">
                      +{extraEventsCount}
                    </span>
                  )}
                </div>
              )}
            </CalendarDayButton>
          )
        },
      }}
      {...props}
    />
  )
}