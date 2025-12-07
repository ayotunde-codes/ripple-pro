import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface StatCardProps {
  label: string
  value: string | number
  subtitle?: string
  className?: string
  isMobile?: boolean
}

export function StatCard({ label, value, subtitle, className, isMobile = false }: StatCardProps) {
  if (isMobile) {
    return (
      <div className={cn("bg-[#F9F0FC] dark:bg-[#0E0E0E] rounded-lg p-4", className)}>
        <p className="text-gray-600 dark:text-[#A9A9A9] mb-1">{label}</p>
        <p className="text-xl font-bold dark:text-white">{value}</p>
        {subtitle && <p className="text-sm text-[#B125F9]">{subtitle}</p>}
      </div>
    )
  }

  return (
    <Card className={cn("bg-[#F9F0FC] dark:bg-[#0E0E0E] border-none shadow-sm", className)}>
      <CardContent className="pt-6 px-6 pb-4">
        <div className="space-y-1">
          <p className="text-gray-600 dark:text-[#A9A9A9]">{label}</p>
          <p className="text-2xl font-bold dark:text-white">{value}</p>
          {subtitle && <p className="text-sm text-[#B125F9]">{subtitle}</p>}
        </div>
      </CardContent>
    </Card>
  )
}

