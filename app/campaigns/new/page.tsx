"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { MobileCampaignCreation } from "./_components/mobile-campaign-creation"
import { DesktopCampaignCreation } from "./_components/desktop-campaign-creation"
import { steps } from "./_components/campaign-data"
import { campaignSchema, initialFormData, type CampaignFormData } from "./_components/campaign-schema"

export default function NewChallengePage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [paymentStatus, setPaymentStatus] = useState<"loading" | "success" | "error" | null>(null)
  const [isMobile, setIsMobile] = useState(false)
  const [walletBalance] = useState(750000) // Mock wallet balance (₦750,000)
  const [budgetError, setBudgetError] = useState("")

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
    // Simulate payment processing
    setShowConfirmation(false)
    setPaymentStatus("loading")

    try {
      // Mock payment API call
      await new Promise((resolve) => setTimeout(resolve, 2000))
      setPaymentStatus("success")
      setTimeout(() => {
        router.push("/campaigns")
      }, 3000)
    } catch (error) {
      setPaymentStatus("error")
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
