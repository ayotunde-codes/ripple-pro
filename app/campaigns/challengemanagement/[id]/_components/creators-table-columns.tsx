import { Button } from "@/components/ui/button"
import { Check, X } from "lucide-react"
import { formatCurrency } from "@/lib/utils"
import { renderSocialMediaIcon } from "./social-media-icons"

interface Creator {
  id: number
  name: string
  instagram?: string
  facebook?: string
  twitter?: string
  youtube?: string
  tiktok?: string
  views: number
  reward: number
  status: string
}

interface GetColumnsProps {
  platforms: string[]
  onApprove: (creatorId: number) => void
  onDecline: (creator: Creator) => void
  challengeStatus: string
}

export const getCreatorsTableColumns = ({ platforms, onApprove, onDecline, challengeStatus }: GetColumnsProps) => {
  const columns: any[] = [
    {
      accessorKey: "name",
      header: "Creator Name",
      sortingFn: "text",
      enableSorting: true,
    },
  ]

  // Add platform columns dynamically
  if (platforms.includes("instagram")) {
    columns.push({
      accessorKey: "instagram",
      header: "Instagram",
      cell: ({ row }: any) => renderSocialMediaIcon("instagram", row.original.instagram),
    })
  }
  if (platforms.includes("facebook")) {
    columns.push({
      accessorKey: "facebook",
      header: "Facebook",
      cell: ({ row }: any) => renderSocialMediaIcon("facebook", row.original.facebook),
    })
  }
  if (platforms.includes("twitter")) {
    columns.push({
      accessorKey: "twitter",
      header: "X (Twitter)",
      cell: ({ row }: any) => renderSocialMediaIcon("twitter", row.original.twitter),
    })
  }
  if (platforms.includes("youtube")) {
    columns.push({
      accessorKey: "youtube",
      header: "YouTube",
      cell: ({ row }: any) => renderSocialMediaIcon("youtube", row.original.youtube),
    })
  }
  if (platforms.includes("tiktok")) {
    columns.push({
      accessorKey: "tiktok",
      header: "TikTok",
      cell: ({ row }: any) => renderSocialMediaIcon("tiktok", row.original.tiktok),
    })
  }

  columns.push(
    {
      accessorKey: "views",
      header: "Views Generated",
      enableSorting: true,
    },
    {
      accessorKey: "reward",
      header: "Reward Earned",
      cell: ({ row }: any) => formatCurrency(row.original.reward),
    },
    {
      id: "actions",
      cell: ({ row }: any) => {
        const status = row.original.status

        if (status === "approved") {
          return (
            <div className="flex justify-end">
              <span className="text-green-500 flex items-center">
                <Check className="h-5 w-5 mr-1" /> Approved
              </span>
            </div>
          )
        } else if (status === "declined") {
          return (
            <div className="flex justify-end">
              <span className="text-red-500 flex items-center">
                <X className="h-5 w-5 mr-1" /> Declined
              </span>
            </div>
          )
        } else {
          return (
            <div className="flex justify-end space-x-2">
              <Button size="sm" onClick={() => onApprove(row.original.id)} disabled={challengeStatus === "active"}>
                Approve
              </Button>
              <Button
                size="sm"
                variant="destructive"
                onClick={() => onDecline(row.original)}
                disabled={challengeStatus === "active"}
              >
                Decline
              </Button>
            </div>
          )
        }
      },
    },
  )

  return columns
}

