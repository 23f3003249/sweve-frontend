import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export type TicketTab = "upcoming" | "past" | "cancelled";

export type TicketTabProps = {
    className?: string;
    activeTab?: TicketTab;
    onTabChange?: (tab: TicketTab) => void;
};

function isTicketTab(value: string): value is TicketTab {
    return value === "upcoming" || value === "past" || value === "cancelled";
}

export function TicketTab({ className, activeTab = "upcoming", onTabChange }: TicketTabProps) {
    return (
        <Tabs
            value={activeTab}
            onValueChange={(value) => {
                if (isTicketTab(value)) {
                    onTabChange?.(value);
                }
            }}
            className={`w-fit ${className ?? ""}`}
        >
            <TabsList className="w-fit" variant="line">
                <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                <TabsTrigger value="past">Past</TabsTrigger>
                <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
            </TabsList>
        </Tabs>
    );
}
