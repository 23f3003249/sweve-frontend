// lib/calendar-colors.ts

export type KeywordItemType = "design" | "technology" | "business" | "web-dev" | "marketing" | "finance" | "healthcare" | "education" | "entertainment" | "sports" | "travel" | "food" | "fashion" | "art" | "music" | "photography" | "gaming" | "science" | "politics" | "environment";

export const categoryColorMap: Record<KeywordItemType, string> = {
    design: "bg-pink-500",
    technology: "bg-blue-500",
    business: "bg-slate-700",
    "web-dev": "bg-indigo-500",
    marketing: "bg-orange-500",
    finance: "bg-emerald-600",
    healthcare: "bg-red-500",
    education: "bg-yellow-500",
    entertainment: "bg-purple-500",
    sports: "bg-lime-500",
    travel: "bg-sky-400",
    food: "bg-amber-600",
    fashion: "bg-fuchsia-500",
    art: "bg-rose-400",
    music: "bg-violet-500",
    photography: "bg-cyan-500",
    gaming: "bg-green-500",
    science: "bg-teal-500",
    politics: "bg-gray-600",
    environment: "bg-emerald-400",
}