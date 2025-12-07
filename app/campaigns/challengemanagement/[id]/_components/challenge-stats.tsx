import { Card, CardContent } from "@/components/ui/card"
import { StatCard } from "@/components/shared/stat-card"
import { formatCurrency } from "@/lib/utils"

interface ChallengeStatsProps {
  challenge: {
    views: number
    totalPool: number
    paidOut: number
    participants: number
  }
  isMobile?: boolean
}

export function ChallengeStats({ challenge, isMobile = false }: ChallengeStatsProps) {
  if (isMobile) {
    return (
      <div className="grid grid-cols-2 gap-4">
        <StatCard label="Views generated" value={challenge.views.toLocaleString()} isMobile={true} />
        <StatCard
          label="Challenge Pool"
          value={`₦${(challenge.totalPool / 1000000).toFixed(0)}M`}
          isMobile={true}
        />
        <StatCard
          label="Pool Balance"
          value={formatCurrency(challenge.totalPool - challenge.paidOut)}
          isMobile={true}
        />
        <StatCard label="Participants" value={challenge.participants.toString()} isMobile={true} />
      </div>
    )
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <StatCard label="Views generated" value={challenge.views.toLocaleString()} />
      <StatCard label="Challenge Pool" value={formatCurrency(challenge.totalPool)} />
      <StatCard label="Pool Balance" value={formatCurrency(challenge.totalPool - challenge.paidOut)} />
      <StatCard label="Participants" value={challenge.participants.toString()} />
    </div>
  )
}

interface ChallengeDetailsCardProps {
  challenge: {
    rewardRate: number
    maxPayout: number
    requirements: string
    additionalNotes?: string
    endDate: string
  }
}

export function ChallengeDetailsCard({ challenge }: ChallengeDetailsCardProps) {
  return (
    <Card className="bg-[#F9F0FC] dark:bg-[#0E0E0E] border-none">
      <CardContent className="pt-6">
        <div className="space-y-3">
          <div>
            <p className="text-sm font-medium text-gray-600 dark:text-[#A9A9A9]">Reward Rate</p>
            <p className="dark:text-white">₦{challenge.rewardRate.toLocaleString()} per 1k views</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600 dark:text-[#A9A9A9]">Max Payout per Creator</p>
            <p className="dark:text-white">₦{challenge.maxPayout.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600 dark:text-[#A9A9A9]">Requirements</p>
            <p className="dark:text-white">{challenge.requirements}</p>
          </div>
          {challenge.additionalNotes && (
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-[#A9A9A9]">Additional Notes</p>
              <p className="dark:text-white">{challenge.additionalNotes}</p>
            </div>
          )}
          <div>
            <p className="text-sm font-medium text-gray-600 dark:text-[#A9A9A9]">End Date</p>
            <p className="dark:text-white">{new Date(challenge.endDate).toLocaleDateString()}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

