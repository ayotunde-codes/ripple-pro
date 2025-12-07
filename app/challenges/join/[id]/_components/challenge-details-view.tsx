import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"
import { PlatformIcons } from "./platform-icons"
import type { Challenge } from "./challenge-data"

interface ChallengeDetailsViewProps {
  challenge: Challenge
  onClose: () => void
  onJoin: () => void
}

export function ChallengeDetailsView({ challenge, onClose, onJoin }: ChallengeDetailsViewProps) {
  const { theme } = useTheme()
  const isDarkMode = theme === "dark"

  return (
    <div className="container mx-auto max-w-md px-4">
      <div
        className={`${isDarkMode ? "bg-black text-white" : "bg-[#FDF4FF] text-[#1F1F1F]"} rounded-xl p-6 relative mb-20`}
      >
        {/* Close button */}
        <button onClick={onClose} className={`absolute top-6 right-6 ${isDarkMode ? "text-white" : "text-black"}`}>
          <X size={20} />
        </button>

        {/* Title */}
        <h1 className="text-xl font-semibold mb-2">{challenge.title}</h1>

        {/* Subtitle */}
        <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"} mb-6`}>
          Review challenge details and requirements
        </p>

        {/* Details */}
        <div className="space-y-4">
          <div
            className={`flex justify-between items-center py-2 border-b ${isDarkMode ? "border-gray-800" : "border-gray-200"}`}
          >
            <span className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>Reward Rate</span>
            <span className="text-sm font-medium">₦{challenge.rewardRate} per 1k views</span>
          </div>

          <div
            className={`flex justify-between items-center py-2 border-b ${isDarkMode ? "border-gray-800" : "border-gray-200"}`}
          >
            <span className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>Total Pool</span>
            <span className="text-sm font-medium">₦{challenge.totalPool.toLocaleString()}</span>
          </div>

          <div
            className={`flex justify-between items-center py-2 border-b ${isDarkMode ? "border-gray-800" : "border-gray-200"}`}
          >
            <span className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>Max Payout</span>
            <span className="text-sm font-medium">₦{challenge.maxPayout.toLocaleString()} per submission</span>
          </div>

          <div
            className={`flex justify-between items-center py-2 border-b ${isDarkMode ? "border-gray-800" : "border-gray-200"}`}
          >
            <span className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>End Date</span>
            <span className="text-sm font-medium">{challenge.endDate}</span>
          </div>

          <div
            className={`flex justify-between items-start py-2 border-b ${isDarkMode ? "border-gray-800" : "border-gray-200"}`}
          >
            <span className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>Requirements</span>
            <span className="text-sm font-medium text-right max-w-[60%]">{challenge.requirements}</span>
          </div>

          <div
            className={`flex justify-between items-start py-2 border-b ${isDarkMode ? "border-gray-800" : "border-gray-200"}`}
          >
            <span className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>Asset Links</span>
            <div className="text-sm font-medium text-right max-w-[60%]">
              {challenge.assetLinks &&
                challenge.assetLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`block ${isDarkMode ? "text-blue-400 hover:text-blue-300" : "text-blue-600 hover:text-blue-500"}`}
                  >
                    {link.replace(/^https?:\/\//, "").split("/")[0]}
                  </a>
                ))}
            </div>
          </div>

          <div
            className={`flex justify-between items-start py-2 border-b ${isDarkMode ? "border-gray-800" : "border-gray-200"}`}
          >
            <span className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>Additional Notes</span>
            <span className="text-sm font-medium text-right max-w-[60%]">{challenge.additionalNotes}</span>
          </div>

          <div className="flex justify-between items-center py-2">
            <span className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>Platforms</span>
            <PlatformIcons platforms={challenge.platforms} />
          </div>
        </div>

        {/* Join button */}
        <Button
          className="w-full bg-[#B125F9] hover:bg-[#B125F9]/90 text-white rounded-full py-6 mt-8"
          onClick={onJoin}
        >
          Join challenge
        </Button>
      </div>
    </div>
  )
}

