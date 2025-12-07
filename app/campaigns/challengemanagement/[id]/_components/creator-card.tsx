import { Button } from "@/components/ui/button"
import { Check, X } from "lucide-react"
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

interface CreatorCardProps {
  creator: Creator
  platforms: string[]
  onApprove: (creatorId: number) => void
  onDecline: (creator: Creator) => void
  onClick: (creator: Creator) => void
  challengeStatus: string
}

export function CreatorCard({ creator, platforms, onApprove, onDecline, onClick, challengeStatus }: CreatorCardProps) {
  return (
    <div
      className="border-b pb-4 cursor-pointer"
      onClick={() => onClick(creator)}
    >
      <div className="flex justify-between items-start mb-2">
        <div>
          <h3 className="font-semibold">{creator.name}</h3>
          <div className="flex space-x-2 mt-1">
            {platforms.map(
              (platform) => creator[platform as keyof Creator] && (
                <div key={platform}>{renderSocialMediaIcon(platform, creator[platform as keyof Creator] as string)}</div>
              ),
            )}
          </div>
        </div>
        {creator.status === "approved" && (
          <span className="text-green-500 flex items-center text-sm">
            <Check className="h-4 w-4 mr-1" /> Approved
          </span>
        )}
        {creator.status === "declined" && (
          <span className="text-red-500 flex items-center text-sm">
            <X className="h-4 w-4 mr-1" /> Declined
          </span>
        )}
      </div>
      <div className="flex justify-between text-sm text-gray-500 mb-2">
        <p>{creator.views.toLocaleString()} views</p>
        <p className="font-semibold text-gray-900">₦{creator.reward.toLocaleString()}</p>
      </div>
      {creator.status === "pending" && (
        <div className="flex space-x-2">
          <Button
            size="sm"
            onClick={(e) => {
              e.stopPropagation()
              onApprove(creator.id)
            }}
            disabled={challengeStatus === "active"}
            className="flex-1"
          >
            Approve
          </Button>
          <Button
            size="sm"
            variant="destructive"
            onClick={(e) => {
              e.stopPropagation()
              onDecline(creator)
            }}
            disabled={challengeStatus === "active"}
            className="flex-1"
          >
            Decline
          </Button>
        </div>
      )}
    </div>
  )
}

