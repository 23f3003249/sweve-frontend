import { Tabs, TabsList, TabsPanel, TabsTab } from "@/components/ui/tabs"
import Link from "next/link"
import React from "react"

export type TabItem = {
  name: string
  value: string
  description?: string
  href?: string
  icon?: React.ReactNode
}

export type TabRenderProps = {
  tab: TabItem
  isActive: boolean
}

export type LineTabProps = {
  className?: string
  tabs: TabItem[]
  activeTab?: TabItem
  defaultTab?: TabItem
  render?: React.ElementType<TabRenderProps>
};

export function LineTabs({
  className,
  tabs,
  defaultTab,
  activeTab,
  render: Render,
}: LineTabProps) {

  const renderTabContent = (tab: TabItem) => {
    const isActive = activeTab === tab

    if (Render) {
      return <div> <Render tab={tab} isActive={isActive} /> </div>
    }

    return (
      <Link href={tab.href || '#'}>
        {tab.icon}
        {tab.name}
      </Link>
    )
  }

  return (
    <Tabs
      className={className} 
      value={activeTab}
      defaultValue={defaultTab}
    >
      <div className="border-b pb-2">
        <TabsList variant="underline">
          {tabs.map((tab) => (
            <TabsTab 
              className="gap-2" 
              key={tab.value} 
              value={tab} 
              nativeButton={false} 
              render={renderTabContent(tab)} 
            />
          ))}
        </TabsList>
      </div>
      {tabs.map((tab) => (
        tab.description && (
          <TabsPanel key={tab.value} value={tab}>
            <p className="px-2 py-4 text-muted-foreground text-sm">
              {tab.description}
            </p>
          </TabsPanel>
        )
      ))}
    </Tabs>
  )
}
