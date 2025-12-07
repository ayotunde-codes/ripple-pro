import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { renderPlatformIcons } from "./platform-icons"

interface Challenge {
  id: number
  title: string
  creator: string
  category: string
  totalPool: number
  paidOut: number
  views: number
  participants: number
  rewardRate: number
  maxPayout: number
  platforms: string[]
  requirements: string
  endDate: string
  hasProfilePic: boolean
}

interface ChallengeCardProps {
  challenge: Challenge
  onJoinChallenge: (challenge: Challenge) => void
}

export function MobileChallengeCard({ challenge, onJoinChallenge }: ChallengeCardProps) {
  return (
    <Card key={challenge.id} className="border rounded-lg overflow-hidden dark:bg-[#0E0E0E]">
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              {challenge.hasProfilePic ? (
                <AvatarImage
                  src={`/generic-placeholder-graphic.png?height=40&width=40`}
                  alt={challenge.creator}
                />
              ) : (
                <AvatarFallback className="bg-gray-200 text-gray-600">{challenge.title.charAt(0)}</AvatarFallback>
              )}
            </Avatar>
            <div>
              <h3 className="font-semibold text-base dark:text-white">{challenge.title}</h3>
              <p className="text-sm text-gray-600 dark:text-[#A9A9A9]">{challenge.category}</p>
            </div>
          </div>
          <div className="flex gap-1">{renderPlatformIcons(challenge.platforms)}</div>
        </div>

        <div className="flex justify-between text-sm mb-1">
          <span className="text-gray-600 dark:text-[#A9A9A9]">
            Pool: ₦{(challenge.totalPool / 1000000).toFixed(0)}M
          </span>
          <span className="text-gray-600 dark:text-[#A9A9A9]">
            ₦{(challenge.paidOut / 1000000).toFixed(1)}M Paid
          </span>
        </div>

        <div className="h-2 bg-gray-200 rounded-full overflow-hidden mb-3">
          <div
            className="h-full bg-[#B125F9]"
            style={{ width: `${Math.floor((challenge.paidOut / challenge.totalPool) * 100)}%` }}
          />
        </div>

        <div className="flex justify-between text-sm text-gray-600 dark:text-[#A9A9A9] mb-3">
          <span>₦{challenge.rewardRate} per 1k views</span>
          <span>{challenge.participants} participants</span>
        </div>

        <Button
          className="w-full bg-[#B125F9] text-white hover:bg-[#B125F9]/90 rounded-full"
          onClick={() => onJoinChallenge(challenge)}
        >
          Join challenge
        </Button>
      </CardContent>
    </Card>
  )
}

interface DesktopChallengeCardProps extends ChallengeCardProps {
  funEmoji: string
}

export function DesktopChallengeCard({ challenge, onJoinChallenge, funEmoji }: DesktopChallengeCardProps) {
  return (
    <Card key={challenge.id} className="hover:shadow-lg transition-shadow h-full flex flex-col dark:bg-[#0E0E0E]">
      <CardContent className="pt-6 flex-1 flex flex-col">
        <div className="space-y-4 flex-1 flex flex-col">
          <div className="flex items-center gap-4">
            <Avatar className="h-10 w-10 flex-shrink-0">
              {challenge.hasProfilePic ? (
                <AvatarImage src={`/generic-placeholder-graphic.png?height=40&width=40`} alt={challenge.creator} />
              ) : (
                <AvatarFallback className="bg-gradient-to-br from-dashboard-pink to-dashboard-purple text-white">
                  {funEmoji}
                </AvatarFallback>
              )}
            </Avatar>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold truncate dark:text-white" title={challenge.title}>
                {challenge.title.length > 20 ? `${challenge.title.substring(0, 20)}...` : challenge.title}
              </h3>
              <p className="text-sm text-muted-foreground dark:text-[#A9A9A9] truncate" title={challenge.creator}>
                {challenge.category}
              </p>
            </div>
            <div className="flex-shrink-0 flex overflow-hidden">{renderPlatformIcons(challenge.platforms)}</div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="truncate dark:text-[#A9A9A9]">
                Pool: ₦{(challenge.totalPool / 1000000).toFixed(1)}M
              </span>
              <span className="truncate ml-1 dark:text-[#A9A9A9]">
                ₦{(challenge.paidOut / 1000000).toFixed(1)}M Paid
              </span>
            </div>
            <div className="h-2 bg-secondary rounded-full overflow-hidden">
              <div
                className="h-full bg-dashboard-purple"
                style={{ width: `${Math.floor((challenge.paidOut / challenge.totalPool) * 100)}%` }}
              />
            </div>
          </div>
          <div className="flex justify-between text-sm text-muted-foreground dark:text-[#A9A9A9]">
            <span className="truncate">₦{challenge.rewardRate} per 1k views</span>
            <span className="truncate ml-1">{challenge.participants} participants</span>
          </div>
          <Button
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90 mt-auto"
            onClick={() => onJoinChallenge(challenge)}
          >
            Join Challenge
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

