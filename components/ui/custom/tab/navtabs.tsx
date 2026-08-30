"use client"

import { LineTabs, type TabItem } from "./line-tabs"
import { usePathname } from "next/navigation"

type NavTabProps = {
    className?: string
    tabs: TabItem[]
};

export function NavTabs({ 
    className, 
    tabs,
}: NavTabProps) {
    const pathname = usePathname()

    const currentActive = (curpath: string): TabItem => {
        const activeTab = tabs.find((tab) => curpath.includes(tab.href || tab.value))
        return activeTab || tabs[0]
    }
    
    return (
        <LineTabs
            className={className}
            tabs={tabs}
            activeTab={currentActive(pathname)}
        />
    )
}
