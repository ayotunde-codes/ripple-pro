import { StatCard } from "@/components/shared/stat-card"

export function PaymentsStats({ isMobile = false }: { isMobile?: boolean }) {
  if (isMobile) {
    return (
      <>
        <div className="bg-[#F9F0FC] dark:bg-[#0E0E0E] rounded-lg p-4 mb-4">
          <p className="text-gray-600 dark:text-[#A9A9A9] mb-1">Wallet Balance</p>
          <p className="text-3xl font-bold dark:text-white">₦750,000</p>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-8">
          <StatCard label="Total Earnings" value="₦1,250,000" isMobile={true} />
          <StatCard label="Expected Rewards" value="₦350,000" isMobile={true} />
        </div>
      </>
    )
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-6">
      <StatCard label="Wallet Balance" value="₦750,000" />
      <StatCard label="Total Earnings" value="₦1,250,000" />
      <StatCard label="Expected Rewards" value="₦350,000" />
    </div>
  )
}

