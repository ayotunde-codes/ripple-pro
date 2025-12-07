import { Card, CardContent } from "@/components/ui/card"
import { statsData } from "./campaigns-data"

export function CampaignsStats() {
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

