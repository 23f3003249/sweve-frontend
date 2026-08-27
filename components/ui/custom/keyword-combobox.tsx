"use client"

import * as React from "react"
import { SearchIcon } from "lucide-react"

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
     * Callback function to handel querying keywords.
     * @param query - The latest query
     * @returns `Promise<KeywordItemType[]>` A promise that resolves to an array of `KeywordItemType` objects.
     */
    loadItemsAction?: (query: string) => Promise<KeywordItemType[]>
    debounceMs?: number
    placeholder?: string
    disabled?: boolean
    className?: string
}


export function KeywordCombobox({
    items = [],
    onValueChangeAction,
    loadItemsAction,
    debounceMs = 300,
    placeholder = "Search event keywords",
    disabled = false,
    className,
}: KeywordComboboxProps) {
    const [query, setQuery] = React.useState("")
    const [asyncItems, setAsyncItems] = React.useState<KeywordItemType[]>([])
    const [loading, setLoading] = React.useState(false)

    React.useEffect(() => {
        if (!loadItemsAction) {
            return
        }

        const search = query.trim()

        if (!search) {
            setAsyncItems([])
            return
        }
        setLoading(true)
        
        let cancelled = false

        const timer = window.setTimeout(async () => {
            try {
                const results = await loadItemsAction(search)

                if (!cancelled) {
                    setAsyncItems(results)
                }
            } catch {
                if (!cancelled) {
                    setAsyncItems([])
                }
            } finally {
                if (!cancelled) {
                    setLoading(false)
                }
            }
        }, debounceMs)

        return () => {
            cancelled = true
            window.clearTimeout(timer)
        }
    }, [query, debounceMs, loadItemsAction])

    const displayedItems = loadItemsAction ? asyncItems : items
    const anchor = useComboboxAnchor()

    return (
        <Combobox
            multiple
            autoHighlight
            items={displayedItems}
            itemToStringLabel={(item: KeywordItemType) => item.label}
            itemToStringValue={(item: KeywordItemType) => item.value}
            disabled={disabled}
            onValueChange={(nextValue) => {
                // console.log("KeywordCombobox onValueChange:", nextValue)
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
                                onChange={(event) => {
                                    if (!event.target.value) {
                                        setLoading(false)
                                    }
                                    setQuery(event.target.value)
                                }}
                                placeholder={
                                    selectedValues.length > 0 ? "" : placeholder
                                }
                                disabled={disabled}
                            />
                        </>
                    )}
                </ComboboxValue>

                <SearchIcon className="size-4 text-muted-foreground pointer-events-none text-primary" />
            </ComboboxChips>

            <ComboboxContent anchor={anchor}>
                {loading ? (
                    <div className="px-3 py-2 text-sm text-muted-foreground">
                        Searching...
                    </div>
                ) : (
                    <>
                        <ComboboxEmpty>
                            {query ? "No keywords found." : "Start typing to search."}
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