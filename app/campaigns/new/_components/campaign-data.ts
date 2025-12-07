import { Instagram, Facebook, Youtube, Twitter } from "lucide-react"

export const steps = [
  { id: 1, name: "Challenge details" },
  { id: 2, name: "Reward Setup" },
  { id: 3, name: "Content Requirements" },
  { id: 4, name: "Additional Notes" },
]

export const platforms = [
  {
    id: "instagram",
    name: "Instagram",
    icon: Instagram,
  },
  {
    id: "facebook",
    name: "Facebook",
    icon: Facebook,
  },
  {
    id: "tiktok",
    name: "TikTok",
    icon: "tiktok" as const,
  },
  {
    id: "twitter",
    name: "X (Twitter)",
    icon: Twitter,
  },
  {
    id: "youtube",
    name: "YouTube",
    icon: Youtube,
  },
]

export const calculateMinimumViews = (budget: string, rewardAmount: string, viewsThreshold: string) => {
  if (!budget || !rewardAmount || !viewsThreshold) return null

  const budgetNum = Number.parseFloat(budget)
  const rewardAmountNum = Number.parseFloat(rewardAmount)
  const viewsThresholdNum = Number.parseFloat(viewsThreshold)

  if (isNaN(budgetNum) || isNaN(rewardAmountNum) || isNaN(viewsThresholdNum) || viewsThresholdNum === 0) return null

  // Calculate views: budget / (reward per view)
  const rewardPerView = rewardAmountNum / viewsThresholdNum
  return Math.floor(budgetNum / rewardPerView)
}
