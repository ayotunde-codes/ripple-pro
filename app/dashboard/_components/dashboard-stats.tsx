import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

interface DashboardStatsProps {
  stats: {
    walletBalance: number
    totalEarnings: number
    activeChallenges: number
    totalViews: number
  }
  isLoading: boolean
}

export function DashboardStats({ stats, isLoading }: DashboardStatsProps) {
  const statsData = [
    {
      title: "Wallet Balance",
      value: `₦${stats.walletBalance.toLocaleString()}`,
    },
    {
      title: "Total Earnings",
      value: `₦${stats.totalEarnings.toLocaleString()}`,
    },
    {
      title: "Active Challenges",
      value: stats.activeChallenges.toString(),
    },
    {
      title: "Total Views",
      value: stats.totalViews.toLocaleString(),
    },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {statsData.map((stat, index) => (
        <Card key={index} className="bg-primary-light border-none shadow-sm dark:bg-[#0E0E0E]">
          <CardContent className="pt-6 px-6 pb-4">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground dark:text-[#A9A9A9]">{stat.title}</p>
              {isLoading ? (
                <Skeleton className="h-8 w-24" />
              ) : (
                <p className="text-2xl font-bold dark:text-foreground-dark">{stat.value}</p>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

export function MobileDashboardStats({ stats, isLoading }: DashboardStatsProps) {
  const statsData = [
    {
      title: "Wallet Balance",
      value: `₦${stats.walletBalance.toLocaleString()}`,
    },
    {
      title: "Total Earnings",
      value: `₦${stats.totalEarnings.toLocaleString()}`,
    },
    {
      title: "Active Challenges",
      value: stats.activeChallenges.toString(),
    },
    {
      title: "Total Views",
      value: stats.totalViews.toLocaleString(),
    },
  ]

  return (
    <div className="grid grid-cols-2 gap-4">
      {statsData.map((stat, index) => (
        <Card key={index} className="mobile-card bg-primary-light">
          <CardContent className="p-4">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">{stat.title}</p>
              {isLoading ? (
                <Skeleton className="h-6 w-16" />
              ) : (
                <p className="mobile-card-value">{stat.value}</p>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

