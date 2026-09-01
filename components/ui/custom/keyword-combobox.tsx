"use client"

import * as React from "react"
import { useDebouncedValue } from "@tanstack/react-pacer"
import { useQuery } from "@tanstack/react-query"
import { Search, SearchIcon } from "lucide-react"

import {
    Combobox,
    ComboboxChips,
    ComboboxChip,
    ComboboxChipsInput,
    ComboboxContent,
    ComboboxEmpty,
    ComboboxItem,
    ComboboxList,
    ComboboxValue,
    useComboboxAnchor,
} from "@/components/ui/combobox"

import { cn } from "@/lib/utils"
import Link from "next/link"
import { Button } from "../button"

export type KeywordItemType = {
    value: string
    label: string
}

type KeywordComboboxProps = {
    /**
     * List of items to display in the combobox. If `loadItemsAction` is provided, this prop will be ignored.
     */
    items?: KeywordItemType[]
    /**
     * Callback function to handle value changes.
     * @param value - The new value of the combobox.
     */
    onValueChangeAction?: (value: KeywordItemType[]) => void
    /**
     * Callback function to handle querying keywords.
     * @param query - The normalized search input.
     * @returns A promise that resolves to matching keyword items.
     */
    loadItemsAction?: (query: string) => Promise<KeywordItemType[]>
    /**
     * Cache-key namespace for asynchronous autocomplete results. Provide a unique key when rendering comboboxes backed by different data sources.
     */
    queryKey?: readonly string[]
    /**
     * If true, a query redirect component will be displayed at the bottom of the combobox, allowing users to search for the query on a separate page.
     * @default false
     */
    queryRedirect?: boolean
    /**
     * Optional template for the redirect URL. Use `{query}` as a placeholder for the query.
     * @default "/search/?q={query}"
     */
    redirecturlTemplate?: string
    /**
     * Optional template for the redirect message. Use `{query}` as a placeholder for the query.
     * @default "Search {query}"
     */
    redirectmsgTemplate?: string
    /**
     * Minimum number of characters required to trigger the search.
     * @default 2
     */
    minChars?: number
    /**
     * Debounce time in milliseconds for the search input.
     * @default 500
     */
    debounceMs?: number
    /**
     * Placeholder text for the input field.
     * @default "Search keywords"
     */
    placeholder?: string
    /**
     * If true, the combobox will be disabled.
     * @default false
     */
    disabled?: boolean
    className?: string
}


export function KeywordCombobox({
    items = [],
    onValueChangeAction,
    loadItemsAction,
    queryKey = [],
    queryRedirect = false,
    minChars = 2,
    debounceMs = 500,
    placeholder = "Search keywords",
    disabled = false,
    redirecturlTemplate = "/search/?q={query}",
    redirectmsgTemplate = "Search {query}",
    className,
}: KeywordComboboxProps) {
    const anchor = useComboboxAnchor()
    const [query, setQuery] = React.useState("")
    
    const normalizedQuery = query.trim()
    const [debouncedQuery, queryDebouncer] = useDebouncedValue(
        normalizedQuery,
        { wait: debounceMs },
        (state) => state.isPending
    )
    
    const shouldSearch = Boolean(loadItemsAction && debouncedQuery.length >= minChars)
    const loadItems = React.useCallback(() => {
        if (!loadItemsAction) {
            return Promise.resolve<KeywordItemType[]>([])
        }

        return loadItemsAction(debouncedQuery)
    }, [debouncedQuery, loadItemsAction])
    const {
        data: asyncItems = [],
        isFetching,
    } = useQuery({
        queryKey: [...queryKey, "keyword-autocomplete", debouncedQuery],
        queryFn: loadItems,
        enabled: shouldSearch,
        staleTime: 1000 * 60,
        gcTime: 1000 * 60 * 5,
        retry: 1,
        refetchOnWindowFocus: false,
    })

    const isDebouncing = Boolean(
        loadItemsAction && normalizedQuery && queryDebouncer.state
    )
    const loading = shouldSearch && (isDebouncing || isFetching)

    const displayedItems = loadItemsAction ? asyncItems : items

    return (
        <Combobox
            multiple
            autoHighlight
            items={displayedItems}
            itemToStringLabel={(item: KeywordItemType) => item.label}
            itemToStringValue={(item: KeywordItemType) => item.value}
            disabled={disabled}
            onValueChange={(nextValue) => {
                onValueChangeAction?.(nextValue)
            }}
        >
            <ComboboxChips ref={anchor} className={cn("w-full max-w-sm", className)}>
                <ComboboxValue>
                    {(selectedValues: KeywordItemType[]) => (
                        <>
                            {selectedValues.map((option) => (
                                <ComboboxChip
                                    key={option.value}
                                    aria-label={option.label}
                                >
                                    {option.label}
                                </ComboboxChip>
                            ))}

                            <ComboboxChipsInput
                                value={query}
                                onChange={(event) => setQuery(event.target.value)}
                                placeholder={
                                    selectedValues.length > 0 ? "" : placeholder
                                }
                                disabled={disabled}
                            />
                        </>
                    )}
                </ComboboxValue>

                <SearchIcon className="size-4 pointer-events-none text-primary" />
            </ComboboxChips>

            <ComboboxContent anchor={anchor}>
                {loading ? (
                    <div className="px-3 py-2 text-sm text-muted-foreground">
                        Searching...
                    </div>
                ) : (
                    <>
                        <ComboboxEmpty>
                            {debouncedQuery.length >= minChars ? 
                                "No keywords found" : minChars <= 1 ? 
                                    "Start typing to search" : `Enter at least ${minChars} characters to search`}
                        </ComboboxEmpty>

                        <ComboboxList>
                            {(item: KeywordItemType) => (
                                <KeywordItem
                                    key={item.value}
                                    item={item}
                                />
                            )}
                        </ComboboxList>
                    </>
                )}
                
                {/* Bottom query redirect to search page */}
                {queryRedirect && (
                    <div className="border-t-2 border-border bg-primary dark:bg-background">
                        <Button
                            asChild
                            variant="link"
                            className="flex px-4 py-3 h-fit items-center justify-start gap-2.5 text-primary-foreground dark:text-primary"
                        >
                            <Link href={redirecturlTemplate.replace('{query}', encodeURIComponent(normalizedQuery))}>
                                <Search className="h-4 w-4" />
                                <span className="text-wrap">{redirectmsgTemplate.replace('{query}', normalizedQuery)}</span>
                            </Link>
                        </Button>
                    </div>
                )}
            </ComboboxContent>
        </Combobox>
    )
}

const KeywordItem = React.memo(({ item }: { item: KeywordItemType }) => {
    return (
        <ComboboxItem
            value={item}
        >
            {item.label}
        </ComboboxItem>
    )
})