import { Card, CardContent } from "@/components/ui/card"
import { statsData } from "./dashboard-data"

export function DashboardStats() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {statsData.map((stat, index) => (
        <Card key={index} className="bg-primary-light border-none shadow-sm dark:bg-[#0E0E0E]">
          <CardContent className="pt-6 px-6 pb-4">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground dark:text-[#A9A9A9]">{stat.title}</p>
              <p className="text-2xl font-bold dark:text-foreground-dark">{stat.value}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

export function MobileDashboardStats() {
  return (
    <div className="grid grid-cols-2 gap-4">
      {statsData.map((stat, index) => (
        <Card key={index} className="mobile-card bg-primary-light">
          <CardContent className="p-4">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">{stat.title}</p>
              <p className="mobile-card-value">{stat.value}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

