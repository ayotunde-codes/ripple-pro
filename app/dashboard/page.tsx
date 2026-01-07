"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "@/components/ui/use-toast"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { AlertCircle } from "lucide-react"
import { useCurrentUser } from "@/services/auth"
import { useWallet, useWithdraw } from "@/services/wallet"
import { useCampaigns } from "@/services/campaign"
import { useMySubmissions } from "@/services/challenge"
import { useModalStore, useDashboardStore } from "@/stores"
import { DashboardShell } from "@/components/dashboard-shell"
import { MobileDashboard } from "./_components/mobile-dashboard"
import { DesktopDashboard } from "./_components/desktop-dashboard"

export default function DashboardPage() {
  const router = useRouter()

  // Zustand stores
  const dashboardStore = useDashboardStore()
  const setStats = dashboardStore?.setStats || (() => {})
  const setRecentChallenges = dashboardStore?.setRecentChallenges || (() => {})
  const setVirtualAccount = dashboardStore?.setVirtualAccount || (() => {})
  const setIsLoading = dashboardStore?.setIsLoading || (() => {})
  const setIsMobileView = dashboardStore?.setIsMobileView || (() => {})
  const setShowBanner = dashboardStore?.setShowBanner || (() => {})
  const isMobileView = dashboardStore?.isMobileView || false

  const modalStore = useModalStore()
  const withdrawalAmount = modalStore?.withdrawalAmount || ''
  const closeWithdrawalModal = modalStore?.closeWithdrawalModal || (() => {})
  const openSuccessModal = modalStore?.openSuccessModal || (() => {})
  const setWithdrawalAmount = modalStore?.setWithdrawalAmount || (() => {})
  const setCopied = modalStore?.setCopied || (() => {})
  const closeOnboarding = modalStore?.closeOnboarding || (() => {})
  const closeVerificationPrompt = modalStore?.closeVerificationPrompt || (() => {})
  const openOnboarding = modalStore?.openOnboarding || (() => {})

  // API hooks
  const { data: currentUser, isLoading: isLoadingUser } = useCurrentUser()
  const { data: walletData, isLoading: isLoadingWallet } = useWallet(currentUser?.id || 0)
  const { data: campaignsData, isLoading: isLoadingCampaigns } = useCampaigns({ length: 5 })
  const { data: submissionsData, isLoading: isLoadingSubmissions } = useMySubmissions({ length: 5 })
  const withdrawMutation = useWithdraw()

  // Determine if user is verified
  const isVerified = currentUser?.kyc_status === "approved" || currentUser?.is_email_verified
  
  // Check if profile is complete
  // Since we don't have GET /profile, we use localStorage as a flag
  // This gets set when user successfully saves profile
  const [profileComplete, setProfileComplete] = useState<boolean | null>(null)
  
  useEffect(() => {
    const complete = localStorage.getItem("profileComplete") === "true"
    setProfileComplete(complete)
  }, [])

  // Update store with API data
  useEffect(() => {
    const isLoading = isLoadingUser || isLoadingWallet || isLoadingCampaigns || isLoadingSubmissions
    setIsLoading(isLoading)

    if (!isLoading) {
      // Calculate and set stats
      const stats = {
        walletBalance: Number(walletData?.data?.balance || 0),
        totalEarnings: submissionsData?.data?.reduce((sum, sub) => sum + (sub.earnings || 0), 0) || 0,
        activeChallenges: campaignsData?.meta?.total || 0,
        totalViews: submissionsData?.data?.reduce((sum, sub) => sum + (sub.views || 0), 0) || 0,
      }
      setStats(stats)

      // Set recent challenges
      const recentChallenges = campaignsData?.data?.slice(0, 5) || []
      setRecentChallenges(recentChallenges)

      // Set virtual account
      const virtualAccount = walletData?.data?.virtual_accounts?.[0] || null
      setVirtualAccount(virtualAccount)
    }
  }, [walletData, campaignsData, submissionsData, isLoadingUser, isLoadingWallet, isLoadingCampaigns, isLoadingSubmissions, setStats, setRecentChallenges, setVirtualAccount, setIsLoading])

  // Check screen size
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobileView(window.innerWidth < 768)
    }

    checkScreenSize()
    window.addEventListener("resize", checkScreenSize)

    return () => window.removeEventListener("resize", checkScreenSize)
  }, [setIsMobileView])

  // Show banner if user is not verified
  useEffect(() => {
    if (currentUser && !isVerified) {
      setShowBanner(true)
    }
  }, [currentUser, isVerified, setShowBanner])

  // Handlers
  const handleOnboardingComplete = () => {
    closeOnboarding()
  }

  const handleCompleteVerification = () => {
    closeVerificationPrompt()
    openOnboarding()
  }

  const handleCopyAccountNumber = () => {
    const virtualAccount = useDashboardStore.getState().virtualAccount
    if (virtualAccount?.account_number) {
      navigator.clipboard.writeText(virtualAccount.account_number)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
      toast({
        title: "Copied!",
        description: "Account number copied to clipboard",
      })
    }
  }

  const handleWithdrawalSubmit = () => {
    if (!withdrawalAmount || Number(withdrawalAmount) <= 0) {
      toast({
        title: "Invalid amount",
        description: "Please enter a valid withdrawal amount",
        variant: "destructive",
      })
      return
    }

    const amount = Number(withdrawalAmount)
    const balance = Number(walletData?.data?.balance || 0)

    if (amount > balance) {
      toast({
        title: "Insufficient funds",
        description: "You don't have enough balance for this withdrawal",
        variant: "destructive",
      })
      return
    }

    withdrawMutation.mutate(
      { amount: amount.toString() },
      {
        onSuccess: () => {
          closeWithdrawalModal()
          openSuccessModal("Withdrawal successful")
          setWithdrawalAmount("")
          toast({
            title: "Withdrawal successful",
            description: "Your withdrawal has been processed",
          })
          setTimeout(() => {
            useModalStore.getState().closeSuccessModal()
          }, 3000)
        },
        onError: (error: any) => {
          toast({
            title: "Withdrawal failed",
            description: error?.response?.data?.message || "Failed to process withdrawal",
            variant: "destructive",
          })
        },
      }
    )
  }

  const handleQuickAction = (action: string) => {
    if (!isVerified) {
      useModalStore.getState().openVerificationPrompt()
    } else {
      switch (action) {
        case "newChallenge":
          router.push("/campaigns/new")
          break
        case "myChallenges":
          router.push("/challenges?tab=my-challenges")
          break
        case "fundWallet":
          useModalStore.getState().openFundingModal()
          break
        case "withdraw":
          useModalStore.getState().openWithdrawalModal()
          break
      }
    }
  }

  const handleViewAllChallenges = () => {
    router.push("/challenges?tab=my-challenges")
  }

  return (
    <DashboardShell>
      <div className="pb-16 md:pb-0">
        {/* Profile Completion Prompt - Show if profile is not complete */}
        {profileComplete === false && (
          <Alert className="border-orange-500 bg-orange-50 dark:bg-orange-950 mb-6">
            <AlertCircle className="h-4 w-4 text-orange-600" />
            <AlertDescription className="flex items-center justify-between">
              <span className="text-orange-600 dark:text-orange-400">
                <strong>Complete your profile</strong> to continue. This is required before you can access all features.
              </span>
              <Button
                onClick={() => router.push("/profile/information")}
                className="ml-4 bg-orange-600 hover:bg-orange-700 text-white"
                size="sm"
              >
                Complete Profile
              </Button>
            </AlertDescription>
          </Alert>
        )}
        
        {isMobileView ? (
          <MobileDashboard 
            onQuickAction={handleQuickAction}
            onViewAllChallenges={handleViewAllChallenges}
          />
        ) : (
          <DesktopDashboard
            onCompleteVerification={handleCompleteVerification}
            onOnboardingComplete={handleOnboardingComplete}
            onCopyAccountNumber={handleCopyAccountNumber}
            onWithdrawalSubmit={handleWithdrawalSubmit}
            onQuickAction={handleQuickAction}
            onViewAllChallenges={handleViewAllChallenges}
            isWithdrawing={withdrawMutation.isPending}
          />
        )}
      </div>
    </DashboardShell>
  )
}
