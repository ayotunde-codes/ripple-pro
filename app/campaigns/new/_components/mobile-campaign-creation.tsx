import { ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { MobileHeader } from "@/components/mobile-header"
import { MobileBottomNav } from "@/components/mobile-bottom-nav"
import { UseFormReturn } from "react-hook-form"
import { ProgressIndicator } from "./progress-indicator"
import { ConfirmationDialog } from "./confirmation-dialog"
import { PaymentStatusDialog } from "./payment-status-dialog"
import {
  Step1ChallengeDetails,
  Step2RewardSetup,
  Step3ContentRequirements,
  Step4AdditionalNotes,
} from "./campaign-form-steps"
import { steps } from "./campaign-data"
import type { CampaignFormData } from "./campaign-schema"

interface MobileCampaignCreationProps {
  currentStep: number
  form: UseFormReturn<CampaignFormData>
  budgetError: string
  walletBalance: number
  showConfirmation: boolean
  setShowConfirmation: (show: boolean) => void
  paymentStatus: "loading" | "success" | "error" | null
  setPaymentStatus: (status: "loading" | "success" | "error" | null) => void
  handleNext: () => void
  handleBack: () => void
  handleSubmit: () => void
}

export function MobileCampaignCreation({
  currentStep,
  form,
  budgetError,
  walletBalance,
  showConfirmation,
  setShowConfirmation,
  paymentStatus,
  setPaymentStatus,
  handleNext,
  handleBack,
  handleSubmit,
}: MobileCampaignCreationProps) {
  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1ChallengeDetails form={form} />
      case 2:
        return <Step2RewardSetup form={form} budgetError={budgetError} walletBalance={walletBalance} />
      case 3:
        return <Step3ContentRequirements form={form} />
      case 4:
        return <Step4AdditionalNotes form={form} />
      default:
        return null
    }
  }

  return (
    <div className="pb-28">
      <MobileHeader />
      <div className="px-4 py-6">
        <div className="flex items-center mb-4">
          <button onClick={handleBack} className="mr-4">
            <ChevronLeft className="h-6 w-6" />
          </button>
          <div>
            <h1 className="text-2xl font-bold">Create campaign</h1>
            <p className="text-gray-500">Set up a new campaign for creators.</p>
          </div>
        </div>

        <ProgressIndicator currentStep={currentStep} isMobile />

        <div className="mb-24">{renderStep()}</div>

        <div className="fixed bottom-20 left-0 right-0 p-4 bg-white dark:bg-[#080808] border-t border-gray-200 dark:border-gray-700 text-gray-800 dark:text-white">
          <div className="flex flex-col gap-3">
            <Button
              onClick={handleNext}
              className="w-full bg-[#B125F9] hover:bg-[#B125F9]/90 text-white rounded-full py-6"
            >
              {currentStep === steps.length ? "Submit" : "Next step"}
            </Button>
            <Button
              onClick={handleBack}
              variant="outline"
              className="w-full rounded-full py-6 border-gray-300 dark:border-gray-500 text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              {currentStep === 1 ? "Back" : "Previous step"}
            </Button>
          </div>
        </div>

        <MobileBottomNav />
      </div>

      <ConfirmationDialog
        open={showConfirmation}
        onOpenChange={setShowConfirmation}
        formData={form.getValues()}
        onSubmit={handleSubmit}
      />

      <PaymentStatusDialog status={paymentStatus} onClose={() => setPaymentStatus(null)} />
    </div>
  )
}
