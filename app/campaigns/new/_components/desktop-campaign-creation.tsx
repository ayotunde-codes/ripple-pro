import Link from "next/link"
import { Check, ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DashboardShell } from "@/components/dashboard-shell"
import { cn } from "@/lib/utils"
import { UseFormReturn } from "react-hook-form"
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

interface DesktopCampaignCreationProps {
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

export function DesktopCampaignCreation({
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
}: DesktopCampaignCreationProps) {
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
    <DashboardShell>
      <div className="flex items-center mb-6">
        <Link href="/campaigns" className="mr-4">
          <Button variant="ghost" size="icon" className="rounded-full">
            <ChevronLeft className="h-6 w-6" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold">Create campaign</h1>
          <p className="text-gray-500">Set up a new campaign for creators.</p>
        </div>
      </div>

      <div className="relative flex justify-between mb-8">
        {steps.map((step, index) => (
          <div key={step.id} className="flex flex-col items-center z-10 relative">
            <div
              className={cn(
                "w-16 h-16 rounded-full flex items-center justify-center",
                currentStep > step.id || currentStep === step.id
                  ? "bg-[#B125F9] text-white"
                  : "border border-gray-300 text-gray-400",
              )}
            >
              {currentStep > step.id ? <Check className="h-8 w-8" /> : <span className="text-xl">{step.id}</span>}
            </div>
            <span className="text-sm font-medium text-center mt-2">{step.name}</span>
            {index < steps.length - 1 && (
              <div className="absolute top-8 left-[calc(50%+32px)] w-[calc(100%-64px)] border-t border-dashed border-[#B125F9] -z-10"></div>
            )}
          </div>
        ))}
      </div>

      <div className="bg-white dark:bg-[#080808] rounded-lg p-8 shadow-sm mb-8 text-gray-800 dark:text-white">
        {renderStep()}

        <div className="flex justify-between mt-8">
          <Button
            onClick={handleBack}
            variant="outline"
            className="rounded-full py-6 px-8 border-gray-300 text-gray-700"
          >
            {currentStep === 1 ? "Cancel" : "Previous step"}
          </Button>
          <Button onClick={handleNext} className="bg-[#B125F9] hover:bg-[#B125F9]/90 text-white rounded-full py-6 px-8">
            {currentStep === steps.length ? "Submit" : "Next step"}
          </Button>
        </div>
      </div>

      <ConfirmationDialog
        open={showConfirmation}
        onOpenChange={setShowConfirmation}
        formData={form.getValues()}
        onSubmit={handleSubmit}
      />

      <PaymentStatusDialog status={paymentStatus} onClose={() => setPaymentStatus(null)} />
    </DashboardShell>
  )
}
