import { Tabs, TabsList, TabsPanel, TabsTab } from "@/components/ui/tabs"
import Link from "next/link"
import React from "react"

/**
 * ### Individual tab item data 
 * 
 * An independent tab data representation in the list of tabs. 
 * Useful for adding sub-navigation inside a page or categorizing content.  
 * 
 * Used with the `LineTabs` component.
 */
export type TabItem = {
  /**
   * Display name of the tab, displayed in the tabs list. 
   */
  name: string
  /**
   * Unique value of the tab, Use it like a key for identifying the tab.
   */
  value: string
  /**
   * Optional description of the tab, displayed below the tabs list as `TabPanel` when the tab is active. 
   */
  description?: string
  /**
   * Optional href for the tab, useful if you want the tab to be a link navigatable through routing.  
   * 
   * If not provided, then either provide custom `render` element for the tab implementation in `LineTabs`
   * or the tab will be native button with no navigation.
   */
  href?: string
  /**
   * Optional icon for the tab, displayed within the tabs list. 
   */
  icon?: React.ReactNode
}

export type TabRenderProps = {
  /**
   * Individual tab item data 
   */
  tab: TabItem
  /**
   * Whether the tab is currently active or not. 
   */
  isActive: boolean
}

export type LineTabProps = {
  className?: string
  /**
   * List of tab items to be displayed in the tabs list. 
   */
  tabs: TabItem[]
  /**
   * Currently active tab, use when the component is controlled.
   */
  activeTab?: TabItem
  /**
   * Default tab to be selected when the component is first rendered.
   * Use when the component is not controlled.
   */
  defaultTab?: TabItem
  /**
   * ### Custom implementation for the tab item
   * 
   * Optional render element for the tab content. 
   * If provied it will rendered as a tab wrapped in a `div` instead of a link or native button.
   * 
   * By default all tabs are rendered as links if `href` is provided, or as native buttons if not.
   * @param tab - Individual tab item data
   * @param isActive - Whether the tab is currently active or not
   * @usage 
   * ```tsx
   * <LineTabs
   *    tabs={tabs}
   *    render={({ tab, isActive }) => (
   *      <Link href={tab.href || '#'} className={isActive ? 'active' : 'inactive'}>
   *        {tab.icon}
   *        {tab.name}
   *      </Link>
   *    )}
   * />
   * ```
   */
  render?: React.ElementType<TabRenderProps>
};


/**
 * ### Line Tabs
 *
 * A customizable underline based tab component for displaying multiple tabs with optional navigation and content panels.  
 * 
 * Useful for creating tabbed interfaces with optional routing and custom rendering of tab items for sub-navigation or content organization.
 * 
 * @example
 * ```tsx
 * // Sub navigation example use case
 * 
 * const tabs: TabItem[] = [
 *    {
 *        name: "Upcoming",
 *        value: "upcoming",
 *        description: "View your upcoming events",
 *        href: "/tickets/upcoming",
 *    },
 *    ...
 * ]
 * 
 * const pathname = usePathname()
 *
 * const currentActive = (curpath: string): TabItem => {
 *    const activeTab = tabs.find((tab) => curpath.includes(tab.href || tab.value))
 *    return activeTab || tabs[0]
 * }
 * 
 * return (
 *    <LineTabs
 *        className={className}
 *        tabs={tabs}
 *        activeTab={currentActive(pathname)}
 *    />
 * )
 * ```
 */
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
      <Link prefetch href={tab.href || '#'}>
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
            
            // Render custom implementation or native 
            Render || tab.href ? 
              <TabsTab 
                className="gap-2" 
                key={tab.value} 
                value={tab} 
                nativeButton={false} 
                render={renderTabContent(tab)} 
              /> :
              <TabsTab 
                className="gap-2" 
                key={tab.value} 
                value={tab} 
              >
                {tab.icon}
                {tab.name}
              </TabsTab>
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
