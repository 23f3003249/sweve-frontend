"use client"

import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
} from "@/components/ui/pagination"
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'
import { useSearchParams } from "next/navigation"

export function NavPagination({ totalPages }: { totalPages: number }) {
    const searchParams = useSearchParams()
    const page = parseInt(searchParams.get("p") || "1")
    const currentPage = Math.min(totalPages, Math.max(1, page))
    const pageItems: (number | "ellipsis")[] = []

    if (totalPages <= 7) {
        pageItems.push(...Array.from({ length: totalPages }, (_, index) => index + 1))
    } else {
        pageItems.push(1)

        const startPage = Math.max(2, currentPage - 1)
        const endPage = Math.min(totalPages - 1, currentPage + 1)

        if (startPage > 2) {
            pageItems.push("ellipsis")
        }

        for (let pageNumber = startPage; pageNumber <= endPage; pageNumber++) {
            pageItems.push(pageNumber)
        }

        if (endPage < totalPages - 1) {
            pageItems.push("ellipsis")
        }

        pageItems.push(totalPages)
    }

    return (
        <Pagination >
            <PaginationContent>
                <PaginationItem>
                    <PaginationLink href={`?p=${Math.max(1, currentPage - 1)}`} aria-label="Go to previous page" size="icon">
                        <ChevronLeftIcon className="size-4" />
                    </PaginationLink>
                </PaginationItem>
                {pageItems.map((item, index) => (
                    <PaginationItem key={item === "ellipsis" ? `ellipsis-${index}` : item}>
                        {item === "ellipsis" ? (
                            <PaginationEllipsis />
                        ) : (
                            <PaginationLink href={`?p=${item}`} isActive={currentPage === item}>
                                {item}
                            </PaginationLink>
                        )}
                    </PaginationItem>
                ))}
                <PaginationItem>
                    <PaginationLink href={`?p=${Math.min(totalPages, currentPage + 1)}`} aria-label="Go to next page" size="icon">
                        <ChevronRightIcon className="size-4" />
                    </PaginationLink>
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    )
}