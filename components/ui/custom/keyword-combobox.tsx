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
} from "@/components/ui/combobox"

export type KeywordOption = {
    value: string
    label: string
}

type KeywordComboboxProps = {
    options?: KeywordOption[]
    value?: string[]
    onValueChangeAction?: (value: string[]) => void
    loadOptionsAction?: (query: string) => Promise<KeywordOption[]>
    debounceMs?: number
    placeholder?: string
    disabled?: boolean
    className?: string
}

/** 
 * @example
 * ```
 * const keywordOptions: KeywordOption[] = [
 *     { value: "design", label: "Design" },
 *     { value: "technology", label: "Technology" },
 *     { value: "business", label: "Business" },
 *     { value: "web-dev", label: "Web Dev" },
 * ];
 *   
 * async function loadKeywordOptions(query: string) {
 *     return keywordOptions.filter((option) =>
 *         option.label.toLowerCase().includes(query.toLowerCase())
 *     );
 * }
 * 
 * const [selectedKeywords, setSelectedKeywords] = React.useState<string[]>([])
 * ```
 * 
 * JSX:
 * ```
 * <KeywordCombobox
        loadOptionsAction={loadKeywordOptions}
        value={selectedKeywords}
        onValueChangeAction={setSelectedKeywords}
        placeholder="Search event keywords"
        className="w-full max-w-sm"
    />
 * ```
 */
export function KeywordCombobox({
    options = [],
    value = [],
    onValueChangeAction,
    loadOptionsAction,
    debounceMs = 300,
    placeholder = "Search event keywords",
    disabled = false,
    className,
}: KeywordComboboxProps) {
    const [query, setQuery] = React.useState("")
    const [asyncOptions, setAsyncOptions] = React.useState<KeywordOption[]>([])
    const [loading, setLoading] = React.useState(false)

    React.useEffect(() => {
        if (!loadOptionsAction) {
            return
        }

        const search = query.trim()

        if (!search) {
            return
        }

        let cancelled = false

        const timer = window.setTimeout(async () => {
            setLoading(true)

            try {
                const results = await loadOptionsAction(search)

                if (!cancelled) {
                    setAsyncOptions(results)
                }
            } catch {
                if (!cancelled) {
                    setAsyncOptions([])
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
    }, [query, debounceMs, loadOptionsAction])

    const displayedOptions = loadOptionsAction ? asyncOptions : options

    return (
        <Combobox
            multiple
            value={value}
            disabled={disabled}
            onValueChange={(nextValue) => {
                onValueChangeAction?.(nextValue)
            }}
        >
            <ComboboxChips className={className}>
                <ComboboxValue>
                    {(selectedValues: KeywordOption[]) => (
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
                                    setLoading(false)
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

            <ComboboxContent>
                {loading ? (
                    <div className="px-3 py-2 text-sm text-muted-foreground">
                        Searching...
                    </div>
                ) : (
                    <>
                        <ComboboxEmpty>
                            {query ? "No keywords found." : "Start typing to search."}
                        </ComboboxEmpty>

                        {displayedOptions.length > 0 && (
                            <ComboboxList>
                                {displayedOptions.map((option) => (
                                    <ComboboxItem
                                        key={option.value}
                                        value={option}
                                    >
                                        {option.label}
                                    </ComboboxItem>
                                ))}
                            </ComboboxList>
                        )}
                    </>
                )}
            </ComboboxContent>
        </Combobox>
    )
}
