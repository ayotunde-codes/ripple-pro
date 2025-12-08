"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "@/components/ui/use-toast"
import { useCurrentUser } from "@/services/auth"
import { useWallet } from "@/services/wallet"
import { useCreateCampaign } from "@/services/campaign"
import { MobileCampaignCreation } from "./_components/mobile-campaign-creation"
import { DesktopCampaignCreation } from "./_components/desktop-campaign-creation"
import { steps } from "./_components/campaign-data"
import { campaignSchema, initialFormData, type CampaignFormData } from "./_components/campaign-schema"
import { transformCampaignToAPI } from "./_components/campaign-utils"

export default function NewChallengePage() {
  const router = useRouter()
  const { data: currentUser } = useCurrentUser()
  const { data: walletData } = useWallet(currentUser?.id || 0)
  const createCampaign = useCreateCampaign()
  
  const [currentStep, setCurrentStep] = useState(1)
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [paymentStatus, setPaymentStatus] = useState<"loading" | "success" | "error" | null>(null)
  const [isMobile, setIsMobile] = useState(false)
  const [budgetError, setBudgetError] = useState("")

  const walletBalance = parseFloat(walletData?.data?.balance || "0")

  const form = useForm<CampaignFormData>({
    resolver: zodResolver(campaignSchema),
    defaultValues: initialFormData,
    mode: "onChange",
  })

  // Check if we're on mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  // Handle next step
  const handleNext = async () => {
    setBudgetError("")

    // Validate current step fields
    let isValid = false

    switch (currentStep) {
      case 1:
        isValid = await form.trigger(["name", "contentType", "category", "platforms"])
        break
      case 2:
        isValid = await form.trigger(["budget", "endDate", "rewardAmount", "viewsThreshold", "maxPayout"])
        
        // Additional budget validation
        if (isValid) {
          const budget = Number.parseFloat(form.getValues("budget"))
          if (!isNaN(budget) && budget > walletBalance) {
            setBudgetError("Insufficient wallet balance")
            return
          }
        }
        break
      case 3:
        isValid = true // Optional fields
        break
      case 4:
        isValid = true // Optional fields
        break
      default:
        isValid = false
    }

    if (!isValid) return

    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
      // Scroll to top on mobile
      if (isMobile) {
        window.scrollTo(0, 0)
      }
    } else {
      setShowConfirmation(true)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
      // Scroll to top on mobile
      if (isMobile) {
        window.scrollTo(0, 0)
      }
    } else {
      router.back()
    }
  }

  const handleSubmit = async () => {
    const formData = form.getValues()
    
    // Transform and submit to API
    setShowConfirmation(false)
    setPaymentStatus("loading")

    try {
      const campaignData = transformCampaignToAPI(formData)
      
      await createCampaign.mutateAsync(campaignData)
      
      setPaymentStatus("success")
      toast({
        title: "Campaign Created",
        description: "Your campaign has been created successfully and is now live!",
      })
      
      setTimeout(() => {
        router.push("/campaigns")
      }, 2000)
    } catch (error: any) {
      setPaymentStatus("error")
      toast({
        title: "Campaign Creation Failed",
        description: error?.response?.data?.message || "An error occurred while creating your campaign",
        variant: "destructive",
      })
    }
  }

  // Mobile view
  if (isMobile) {
    return (
      <MobileCampaignCreation
        currentStep={currentStep}
        form={form}
        budgetError={budgetError}
        walletBalance={walletBalance}
        showConfirmation={showConfirmation}
        setShowConfirmation={setShowConfirmation}
        paymentStatus={paymentStatus}
        setPaymentStatus={setPaymentStatus}
        handleNext={handleNext}
        handleBack={handleBack}
        handleSubmit={handleSubmit}
      />
    )
  }

  // Desktop view
  return (
    <DesktopCampaignCreation
      currentStep={currentStep}
      form={form}
      budgetError={budgetError}
      walletBalance={walletBalance}
      showConfirmation={showConfirmation}
      setShowConfirmation={setShowConfirmation}
      paymentStatus={paymentStatus}
      setPaymentStatus={setPaymentStatus}
      handleNext={handleNext}
      handleBack={handleBack}
      handleSubmit={handleSubmit}
    />
  )
}
