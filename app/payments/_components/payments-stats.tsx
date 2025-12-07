import { StatCard } from "@/components/shared/stat-card"
import { Skeleton } from "@/components/ui/skeleton"

interface VirtualAccount {
  account_number: string
  account_name: string
  bank: string
  user_id: number
}

interface PaymentsStatsProps {
  isMobile?: boolean
  walletBalance: number
  virtualAccount?: VirtualAccount
  isLoading: boolean
}

export function PaymentsStats({ isMobile = false, walletBalance, isLoading }: PaymentsStatsProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(amount)
  }

  const balance = formatCurrency(walletBalance)
  // These are not available from API yet
  const totalEarnings = "Coming soon"
  const expectedRewards = "Coming soon"

  if (isLoading) {
    if (isMobile) {
      return (
        <>
          <Skeleton className="h-24 rounded-lg mb-4" />
          <div className="grid grid-cols-2 gap-4 mb-8">
            <Skeleton className="h-20 rounded-lg" />
            <Skeleton className="h-20 rounded-lg" />
          </div>
        </>
      )
    }

    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-6">
        <Skeleton className="h-28 rounded-lg" />
        <Skeleton className="h-28 rounded-lg" />
        <Skeleton className="h-28 rounded-lg" />
      </div>
    )
  }

  if (isMobile) {
    return (
      <>
        <div className="bg-[#F9F0FC] dark:bg-[#0E0E0E] rounded-lg p-4 mb-4">
          <p className="text-gray-600 dark:text-[#A9A9A9] mb-1">Wallet Balance</p>
          <p className="text-3xl font-bold dark:text-white">{balance}</p>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-8">
          <StatCard label="Total Earnings" value={totalEarnings} isMobile={true} />
          <StatCard label="Expected Rewards" value={expectedRewards} isMobile={true} />
        </div>
      </>
    )
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-6">
      <StatCard label="Wallet Balance" value={balance} />
      <StatCard label="Total Earnings" value={totalEarnings} />
      <StatCard label="Expected Rewards" value={expectedRewards} />
    </div>
  )
}

