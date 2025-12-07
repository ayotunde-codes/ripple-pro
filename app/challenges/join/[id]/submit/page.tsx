"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { Check, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { DashboardShell } from "@/components/dashboard-shell"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"

// Mock data for available challenges - same as in challenges page
const availableChallenges = [
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
  },
  {
    id: 3,
    title: "Tech Gadget Review",
    creator: "TechWorld",
    category: "Technology",
    totalPool: 8000000,
    paidOut: 1200250,
    views: 95000,
    participants: 28,
    rewardRate: 2000,
    maxPayout: 80000,
    platforms: ["youtube", "tiktok"],
    requirements: "Detailed review of product features with honest feedback",
    endDate: "2024-09-30",
    hasProfilePic: false,
  },
  {
    id: 4,
    title: "Fitness Challenge",
    creator: "GymBrand",
    category: "Health & Fitness",
    totalPool: 12000000,
    paidOut: 5800500,
    views: 430000,
    participants: 75,
    rewardRate: 1200,
    maxPayout: 120000,
    platforms: ["instagram", "tiktok", "youtube"],
    requirements: "Show workout routine using our products for at least 45 seconds",
    endDate: "2024-07-15",
    hasProfilePic: true,
  },
  {
    id: 5,
    title: "Food Recipe Contest",
    creator: "CookingSupplies",
    category: "Food & Beverage",
    totalPool: 7500000,
    paidOut: 2100300,
    views: 180000,
    participants: 42,
    rewardRate: 1250,
    maxPayout: 75000,
    platforms: ["instagram", "youtube", "facebook"],
    requirements: "Create a unique recipe using our cookware and show the final result",
    endDate: "2024-10-10",
    hasProfilePic: false,
  },
  {
    id: 6,
    title: "Travel Vlog Series",
    creator: "TravelAgency",
    category: "Travel",
    totalPool: 20000000,
    paidOut: 8500750,
    views: 750000,
    participants: 35,
    rewardRate: 1800,
    maxPayout: 200000,
    platforms: ["youtube", "instagram"],
    requirements: "Document travel experience and mention our booking service",
    endDate: "2024-11-20",
    hasProfilePic: true,
  },
  {
    id: 7,
    title: "Beauty Product Review",
    creator: "BeautyBrand",
    category: "Beauty",
    totalPool: 9000000,
    paidOut: 3200000,
    views: 280000,
    participants: 50,
    rewardRate: 1100,
    maxPayout: 90000,
    platforms: ["instagram", "youtube", "tiktok"],
    requirements: "Demonstrate product application and results",
    endDate: "2024-09-15",
    hasProfilePic: true,
  },
  {
    id: 8,
    title: "Gaming Tournament",
    creator: "GameStudio",
    category: "Gaming",
    totalPool: 18000000,
    paidOut: 7200000,
    views: 600000,
    participants: 85,
    rewardRate: 1300,
    maxPayout: 180000,
    platforms: ["youtube", "tiktok"],
    requirements: "Stream gameplay and provide commentary",
    endDate: "2024-10-30",
    hasProfilePic: false,
  },
]

export default function SubmitChallengePage() {
  const router = useRouter()
  const params = useParams()
  const challengeId = Number.parseInt(params.id as string)

  const [challenge, setChallenge] = useState(null)
  const [submissionLinks, setSubmissionLinks] = useState({
    instagram: "",
    facebook: "",
    twitter: "",
    youtube: "",
    tiktok: "",
  })
  const [showSuccess, setShowSuccess] = useState(false)

  useEffect(() => {
    // Find the challenge by ID
    const foundChallenge = availableChallenges.find((c) => c.id === challengeId)
    setChallenge(foundChallenge)
  }, [challengeId])

  const handleSubmitLinks = async (e) => {
    e.preventDefault()
    setShowSuccess(true)

    // Clear submission links after successful submission
    setSubmissionLinks({
      instagram: "",
      facebook: "",
      twitter: "",
      youtube: "",
      tiktok: "",
    })

    setTimeout(() => {
      setShowSuccess(false)
      router.push("/challenges")
    }, 3000)
  }

  if (!challenge) {
    return (
      <DashboardShell>
        <div className="flex items-center justify-center h-[60vh]">
          <p className="text-lg">Loading challenge details...</p>
        </div>
      </DashboardShell>
    )
  }

  return (
    <DashboardShell>
      <div className="container mx-auto max-w-4xl">
        {/* Back button */}
        <Button variant="ghost" className="mb-4" onClick={() => router.push(`/challenges/join/${challengeId}`)}>
          <X className="h-4 w-4 mr-2" /> Back to Challenge Details
        </Button>

        <Card className="border rounded-lg overflow-hidden dark:bg-[#0E0E0E]">
          <CardContent className="p-6">
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-bold dark:text-white">{challenge.title}</h1>
                <p className="text-gray-600 dark:text-[#A9A9A9] mt-2">Submit your content links</p>
              </div>

              <form onSubmit={handleSubmitLinks} className="space-y-6">
                {challenge.platforms.map((platform) => (
                  <div key={platform} className="space-y-2">
                    <label className="text-sm font-medium capitalize dark:text-[#A9A9A9]">{platform} link</label>
                    <Input
                      placeholder={`Enter your ${platform} content link`}
                      className="rounded-full border-gray-300 py-6"
                      value={submissionLinks[platform] || ""}
                      onChange={(e) => {
                        setSubmissionLinks({
                          ...submissionLinks,
                          [platform]: e.target.value,
                        })
                      }}
                      required
                    />
                  </div>
                ))}

                <div className="flex gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1 rounded-full py-6"
                    onClick={() => router.push(`/challenges/join/${challengeId}`)}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="flex-1 bg-[#B125F9] text-white hover:bg-[#B125F9]/90 rounded-full py-6"
                  >
                    Submit links
                  </Button>
                </div>
              </form>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Success Modal */}
      <Dialog open={showSuccess} onOpenChange={setShowSuccess}>
        <DialogContent className="max-w-md dark:bg-[#0E0E0E]">
          <div className="flex flex-col items-center justify-center py-8">
            <div className="rounded-full bg-green-100 p-3 mb-4">
              <Check className="h-12 w-12 text-green-600" />
            </div>
            <DialogTitle className="dark:text-white">Submission Successful!</DialogTitle>
            <p className="text-center text-gray-600 dark:text-[#A9A9A9] mt-2">
              Your challenge submission was successful. Best of luck!
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </DashboardShell>
  )
}
