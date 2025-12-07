import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface PaginationControlsProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  className?: string
  isMobile?: boolean
}

export function PaginationControls({
  currentPage,
  totalPages,
  onPageChange,
  className,
  isMobile = false,
}: PaginationControlsProps) {
  if (totalPages <= 1) return null

  const buttonClassName = isMobile ? "h-8 w-8 p-0 rounded-full" : ""

  return (
    <div className={cn("flex justify-center items-center gap-2", className)}>
      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
        disabled={currentPage === 1}
        className={buttonClassName}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      <span className="text-sm">
        Page {currentPage} of {totalPages}
      </span>

      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
        disabled={currentPage === totalPages}
        className={buttonClassName}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  )
}

