"use client";

import { Button } from "@/components/ui/button";
import { Share2 } from "lucide-react";
import { toast } from "sonner";

export type ShareData = {
    title: string,
    text: string,
    url: string,
}

type ShareButtonProps = {
    shareData: ShareData
}
export function ShareButton({ shareData }: ShareButtonProps) {
    const handleShare = async () => {
        if (navigator.share) {
            try {
                if (!navigator.canShare || navigator.canShare(shareData)) {
                    await navigator.share(shareData);
                    toast.success("Event shared successfully")
                    return;
                }
            } catch (error) {
                if (error instanceof DOMException && error.name === "AbortError") {
                    return;
                }
                toast.error("Could not share event")
            }
        }

        // Fallback to clipboard
        try {
            if (!navigator.clipboard) {
                throw new Error("Clipboard API not supported");
            }
            await navigator.clipboard.writeText(shareData.url);
            toast.success("Event link copied")
        } catch {
            toast.error("Could not copy event link")
        }
    };

    return (
        <Button size="icon"
            className="h-11 w-11 bg-secondary text-secondary-foreground hover:bg-secondary-foreground hover:text-secondary"
            aria-label="Share event"
            onClick={handleShare}
        >
            <Share2 className="size-4" />
        </Button>
    )
}