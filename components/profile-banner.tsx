"use client"

import { useState } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { OnboardingModal } from "@/components/onboarding-modal"

export function ProfileBanner({ onDismiss }) {
  const [showOnboarding, setShowOnboarding] = useState(false)
  const [initialStep, setInitialStep] = useState(0)

  // Check which step to start from
  const handleCompleteNow = () => {
    // Always start from step 1 (index 0) of the onboarding modal
    setInitialStep(0)
    setShowOnboarding(true)
  }

  const handleComplete = () => {
    setShowOnboarding(false)
    if (onDismiss) onDismiss()
  }

  return (
    <>
      <div className="bg-dashboard-purple/10 dark:bg-dashboard-purple/20 border border-dashboard-purple rounded-lg p-4 mb-6 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:justify-between">
        <div className="flex items-center">
          <span className="text-2xl mr-3">🚀</span>
          <p className="text-sm font-medium">You are missing out. Complete your profile set up now to start earning!</p>
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Button
            size="sm"
            className="bg-dashboard-purple hover:bg-dashboard-purple/90 w-full sm:w-auto"
            onClick={handleCompleteNow}
          >
            Complete Now
          </Button>
          {onDismiss && (
            <Button size="sm" variant="ghost" className="p-0 h-8 w-8 rounded-full" onClick={onDismiss}>
              <X className="h-4 w-4" />
              <span className="sr-only">Dismiss</span>
            </Button>
          )}
        </div>
      </div>

      {showOnboarding && <OnboardingModal initialStep={initialStep} onComplete={handleComplete} />}
    </>
  )
}
