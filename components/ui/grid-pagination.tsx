"use client"

import * as React from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface GridPaginationProps<T> {
  items: T[]
  renderItem: (item: T) => React.ReactNode
  searchKey: keyof T
  pageSize?: number
  searchValue?: string
  onSearchChange?: (value: string) => void
}

export function GridPagination<T>({
  items,
  renderItem,
  searchKey,
  pageSize = 6,
  searchValue,
  onSearchChange,
}: GridPaginationProps<T>) {
  const [page, setPage] = React.useState(1)
  const [search, setSearch] = React.useState("")

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearch(value)
    if (onSearchChange) {
      onSearchChange(value)
    }
  }

  const filteredItems = React.useMemo(() => {
    // If external search value is provided, use that instead
    const searchStr = searchValue !== undefined ? searchValue : search

    return items.filter((item) => {
      const itemValue = String(item[searchKey]).toLowerCase()
      return itemValue.includes(searchStr.toLowerCase())
    })
  }, [items, search, searchKey, searchValue])

  const totalPages = Math.ceil(filteredItems.length / pageSize)
  const paginatedItems = filteredItems.slice((page - 1) * pageSize, page * pageSize)

  // Reset to first page when search changes
  React.useEffect(() => {
    setPage(1)
  }, [search, searchValue])

  return (
    <div className="space-y-4">
      {/* Only render search if no external search control is provided */}
      {onSearchChange === undefined && (
        <div className="flex items-center gap-2">
          <Search className="h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search..." value={search} onChange={handleSearchChange} className="max-w-sm" />
        </div>
      )}

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {paginatedItems.map((item, index) => renderItem(item))}
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-end space-x-2 py-4">
          <div className="flex-1 text-sm text-muted-foreground">
            Page {page} of {totalPages}
          </div>
          <div className="space-x-2">
            <Button variant="outline" size="sm" onClick={() => setPage(page - 1)} disabled={page === 1}>
              Previous
            </Button>
            <Button variant="outline" size="sm" onClick={() => setPage(page + 1)} disabled={page === totalPages}>
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
