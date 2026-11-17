"use client";

import {
    MoreVertical, Flag, Share,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const title = "Table Row Actions";

const EventMenu = () => (
    <div>
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button className="h-8 w-8" size="icon" variant="outline">
                    <MoreVertical className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end"
                className="w-40 border border-border/50 bg-background/60 backdrop-blur-xl shadow-md p-1.5"
            >
                <DropdownMenuItem className="text-muted-foreground cursor-pointer gap-2 rounded-lg">
                    <Share className="size-4" /> Share Event
                </DropdownMenuItem>
                <DropdownMenuSeparator className="my-1" />
                <DropdownMenuItem className="cursor-pointer gap-2 rounded-lg" variant="destructive">
                    <Flag className="size-4" /> Report
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    </div>
);

export default EventMenu;
