import { Card, CardContent } from "@/components/ui/card"
import { DataTable } from "@/components/ui/data-table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { UserChallenge } from "@/services/challenge/types"

interface UserChallengesTableProps {
  challenges: UserChallenge[]
  isLoading: boolean
  onRedeem: (challengeId: number) => void
  isRedeeming: boolean
}

export function UserChallengesTable({
  challenges,
  isLoading,
  onRedeem,
  isRedeeming,
}: UserChallengesTableProps) {
  // Helper function to determine if challenge can be redeemed
  const canRedeem = (challenge: UserChallenge) => {
    // Can redeem if there are earnings and status is not already pending/approved
    const hasEarnings = Number(challenge.earnings || 0) > 0
    const notAlreadyRedeemed = !challenge.redemption_status || challenge.redemption_status === "rejected"
    return hasEarnings && notAlreadyRedeemed
  }

  const getRedemptionStatusBadge = (status?: string) => {
    if (!status) return null

    const statusConfig = {
      pending: { label: "Pending", className: "bg-yellow-100 text-yellow-800" },
      approved: { label: "Approved", className: "bg-green-100 text-green-800" },
      rejected: { label: "Rejected", className: "bg-red-100 text-red-800" },
    }

    const config = statusConfig[status as keyof typeof statusConfig]
    if (!config) return null

    return (
      <Badge className={config.className}>
        {config.label}
      </Badge>
    )
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardContent className="pt-6">
          <DataTable
            columns={[
              {
                accessorKey: "challenge.campaign_name",
                header: "Challenge Name",
                cell: ({ row }) => (
                  <span className="font-medium">
                    {row.original.challenge?.campaign_name || "N/A"}
                  </span>
                ),
              },
              {
                accessorFn: (row) => Number(row.earnings || 0).toLocaleString(),
                header: "Earnings",
                id: "earnings",
                cell: ({ row }) => (
                  <div className="text-right">
                    ₦{Number(row.original.earnings || 0).toLocaleString()}
                  </div>
                ),
              },
              {
                accessorFn: (row) => Number(row.views || 0).toLocaleString(),
                header: "Views",
                id: "views",
                cell: ({ row }) => (
                  <div className="text-right">
                    {Number(row.original.views || 0).toLocaleString()}
                  </div>
                ),
              },
              {
                accessorFn: (row) => new Date(row.created_at).toLocaleDateString(),
                header: "Date Entered",
                id: "date",
                cell: ({ row }) => (
                  <div className="text-right">
                    {new Date(row.original.created_at).toLocaleDateString()}
                  </div>
                ),
              },
              {
                accessorKey: "redemption_status",
                header: "Status",
                cell: ({ row }) => (
                  <div className="text-right">
                    {row.original.redemption_status ? (
                      getRedemptionStatusBadge(row.original.redemption_status)
                    ) : (
                      <Badge className="bg-gray-100 text-gray-800">
                        Active
                      </Badge>
                    )}
                  </div>
                ),
              },
              {
                id: "actions",
                header: "Actions",
                cell: ({ row }) => {
                  const challenge = row.original
                  const redeemable = canRedeem(challenge)

                  return (
                    <div className="text-right">
                      {redeemable ? (
                        <Button
                          size="sm"
                          onClick={() => onRedeem(challenge.challenge_id)}
                          disabled={isRedeeming}
                        >
                          {isRedeeming ? "Processing..." : "Redeem"}
                        </Button>
                      ) : challenge.redemption_status === "pending" ? (
                        <span className="text-sm text-gray-500">Awaiting approval</span>
                      ) : challenge.redemption_status === "approved" ? (
                        <span className="text-sm text-green-600">Paid out</span>
                      ) : Number(challenge.earnings || 0) === 0 ? (
                        <span className="text-sm text-gray-400">No earnings</span>
                      ) : null}
                    </div>
                  )
                },
              },
            ]}
            data={challenges}
            isLoading={isLoading}
          />
        </CardContent>
      </Card>
    </div>
  )
}
