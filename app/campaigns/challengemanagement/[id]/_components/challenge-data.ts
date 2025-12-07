// Mock data for the challenge
export const challengeData = {
  id: 1,
  title: "Summer Product Launch",
  creator: "Brand X",
  totalPool: 10000000,
  paidOut: 3238580,
  views: 1500000,
  participants: 45,
  rewardRate: 1000,
  maxPayout: 100000,
  platforms: ["instagram", "facebook", "twitter", "youtube", "tiktok"],
  requirements: "Must include product showcase for minimum 30 seconds",
  additionalNotes: "Use hashtag #SummerProductLaunch in all posts",
  endDate: "2024-08-01",
  status: "active",
}

// Mock data for creators
export const creatorsData = Array.from({ length: 94 }, (_, i) => ({
  id: i + 1,
  name: `Creator ${i + 1}`,
  instagram: `https://instagram.com/creator${i + 1}`,
  facebook: `https://facebook.com/creator${i + 1}`,
  twitter: `https://twitter.com/creator${i + 1}`,
  youtube: `https://youtube.com/creator${i + 1}`,
  tiktok: `https://tiktok.com/@creator${i + 1}`,
  views: 100000,
  reward: 100000,
  status: Math.random() > 0.7 ? (Math.random() > 0.5 ? "approved" : "declined") : "pending",
}))

