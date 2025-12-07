// Mock data for available challenges
export const availableChallenges = [
  {
    id: 1,
    title: "Summer Product Launch",
    creator: "Brand X",
    category: "High Fashion",
    totalPool: 10000000,
    paidOut: 4200000,
    views: 250000,
    participants: 45,
    rewardRate: 1000,
    maxPayout: 100000,
    platforms: ["instagram", "tiktok", "youtube"],
    requirements: "Must include product showcase for minimum 30 seconds",
    endDate: "2024-08-01",
    hasProfilePic: false,
    assetLinks: ["https://brand-assets.com/summer-campaign", "https://brand-assets.com/product-images"],
    additionalNotes:
      "Please ensure all content follows our brand guidelines. Videos should be between 30-60 seconds for optimal engagement.",
  },
  {
    id: 2,
    title: "Holiday Campaign",
    creator: "Fashion Co.",
    category: "Lifestyle",
    totalPool: 15000000,
    paidOut: 4500750,
    views: 320000,
    participants: 62,
    rewardRate: 1500,
    maxPayout: 150000,
    platforms: ["instagram", "facebook", "tiktok"],
    requirements: "Feature holiday theme and tag @fashionco in all posts",
    endDate: "2024-12-15",
    hasProfilePic: true,
    assetLinks: ["https://brand-assets.com/summer-campaign", "https://brand-assets.com/product-images"],
    additionalNotes:
      "Please ensure all content follows our brand guidelines. Videos should be between 30-60 seconds for optimal engagement.",
  },
]

export type Challenge = (typeof availableChallenges)[0]

