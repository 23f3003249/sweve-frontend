"use client"

import { useState } from "react"
import { Bookmark } from "lucide-react"
import { AnimatePresence, motion } from "motion/react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const CONFETTI_COLORS = [
    "bg-red-500",
    "bg-orange-400",
    "bg-yellow-400",
    "bg-rose-500",
    "bg-purple-500",
    "bg-blue-400",
    "bg-amber-400",
    "bg-fuchsia-500",
]

const BOOKMARK_CONFETTI = Array.from({ length: 12 }, (_, i) => {
    const angle = -160 + (i / 11) * 140
    const rad = (angle * Math.PI) / 180
    const dist = 35 + (i % 3) * 12

    return {
        id: i,
        x: Math.cos(rad) * dist,
        y: Math.sin(rad) * dist,
        rotate: (i % 2 === 0 ? 1 : -1) * (100 + i * 18),
        color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
        w: i % 2 === 0 ? 6 : 5,
        h: i % 3 === 0 ? 5 : 3,
        dur: 0.55 + (i % 4) * 0.07,
    }
})

type BookmarkButtonProps = {
    /** Controlled state from backend */
    isSaved?: boolean
    /** Uncontrolled initial state (used if isSaved is not provided) */
    defaultSaved?: boolean
    /** Called when user toggles - should trigger API call */
    onChangeAction?: (saved: boolean) => void
    className?: string
}

export function BookmarkButton({
    isSaved: controlledIsSaved,
    defaultSaved = false,
    onChangeAction,
    className,
}: BookmarkButtonProps) {
    const [internalIsSaved, setInternalIsSaved] = useState(defaultSaved)
    const isSaved = controlledIsSaved ?? internalIsSaved
    const [bookmarkClickKey, setBookmarkClickKey] = useState(0)

    const handleBookmark = () => {
        const next = !isSaved

        setInternalIsSaved(next)
        onChangeAction?.(next)

        if (next) {
            setBookmarkClickKey((key) => key + 1)
            toast.success("Saved to bookmarks")
            return
        }

        toast.info("Removed from bookmarks")
    }

    return (
        <div className={cn("relative", className)}>
            <AnimatePresence>
                {isSaved &&
                    BOOKMARK_CONFETTI.map((p) => (
                        <motion.span
                            key={`${p.id}-${bookmarkClickKey}`}
                            className={cn(
                                "absolute z-20 rounded-sm pointer-events-none",
                                p.color
                            )}
                            style={{
                                width: p.w,
                                height: p.h,
                                left: "50%",
                                top: "50%",
                                marginLeft: -(p.w / 2),
                                marginTop: -(p.h / 2),
                            }}
                            initial={{
                                x: 0,
                                y: 0,
                                rotate: 0,
                                opacity: 1,
                                scale: 1,
                            }}
                            animate={{
                                x: p.x,
                                y: [0, p.y * 0.6, p.y],
                                rotate: p.rotate,
                                opacity: [1, 1, 0],
                                scale: 0.7,
                            }}
                            exit={{ opacity: 0 }}
                            transition={{
                                duration: p.dur,
                                ease: [0.22, 1, 0.36, 1],
                            }}
                        />
                    ))}
            </AnimatePresence>
            <motion.div
                animate={
                    isSaved
                        ? { scale: [1, 1.4, 0.85, 1.1, 1] }
                        : { scale: [1, 0.85, 1] }
                }
                transition={{ duration: 0.4, ease: "easeOut" }}
            >
                <Button
                    size="icon"
                    className="h-11 w-11 bg-secondary text-secondary-foreground hover:bg-secondary-foreground hover:text-secondary"
                    aria-label={isSaved ? "Remove saved event" : "Save event"}
                    aria-pressed={isSaved}
                    onClick={handleBookmark}
                >
                    <Bookmark
                        className={cn(
                            "size-4 transition-colors duration-300",
                            isSaved && "fill-primary text-primary"
                        )}
                    />
                </Button>
            </motion.div>
        </div>
    )
}