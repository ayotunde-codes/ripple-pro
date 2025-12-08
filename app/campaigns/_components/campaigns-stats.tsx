import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { useCampaignStore } from "@/stores"

export function CampaignsStats() {
  const { summary, isLoadingSummary } = useCampaignStore()

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(value)
  }

  const statsData = [
    {
      title: "Total Campaigns",
      value: summary?.total_campaigns?.toString() || "0",
    },
    {
      title: "Active Campaigns",
      value: summary?.active_campaigns?.toString() || "0",
    },
    {
      title: "Total Spend",
      value: formatCurrency(summary?.total_spend || 0),
    },
    {
      title: "Total Views",
      value: summary?.total_views?.toString() || "0",
    },
  ]

  if (isLoadingSummary) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[1, 2, 3, 4].map((i) => (
          <Skeleton key={i} className="h-28 rounded-lg" />
        ))}
      </div>
    )
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {statsData.map((stat, index) => (
        <Card key={index} className="bg-[#F9F0FC] dark:bg-[#0E0E0E] border-none shadow-sm">
          <CardContent className="pt-6 px-6 pb-4">
            <div className="space-y-1">
              <p className="text-gray-600 dark:text-[#A9A9A9]">{stat.title}</p>
              <p className="text-2xl font-bold dark:text-white">{stat.value}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

export function MobileCampaignsStats() {
  const { summary, isLoadingSummary } = useCampaignStore()

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(value)
  }

  const statsData = [
    {
      title: "Total Campaigns",
      value: summary?.total_campaigns?.toString() || "0",
    },
    {
      title: "Active Campaigns",
      value: summary?.active_campaigns?.toString() || "0",
    },
    {
      title: "Total Spend",
      value: formatCurrency(summary?.total_spend || 0),
    },
    {
      title: "Total Views",
      value: summary?.total_views?.toString() || "0",
    },
  ]

  if (isLoadingSummary) {
    return (
      <div className="grid grid-cols-2 gap-4 mt-6">
        {[1, 2, 3, 4].map((i) => (
          <Skeleton key={i} className="h-20 rounded-lg" />
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 gap-4 mt-6">
      {statsData.map((stat, index) => (
        <div key={index} className="bg-[#F9F0FC] dark:bg-[#0E0E0E] rounded-lg p-4">
          <p className="text-gray-600 dark:text-[#A9A9A9] text-sm">{stat.title}</p>
          <p className="text-2xl font-bold dark:text-white">{stat.value}</p>
        </div>
      ))}
    </div>
  )
}
