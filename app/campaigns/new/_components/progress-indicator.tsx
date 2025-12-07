import { Check } from "lucide-react"
import { cn } from "@/lib/utils"
import { steps } from "./campaign-data"

interface ProgressIndicatorProps {
  currentStep: number
  isMobile?: boolean
}

export function ProgressIndicator({ currentStep, isMobile = false }: ProgressIndicatorProps) {
  if (isMobile) {
    return (
      <div className="relative flex justify-between mb-8">
        {steps.map((step, index) => (
          <div key={step.id} className="flex flex-col items-center z-10">
            <div
              className={cn(
                "w-12 h-12 rounded-full flex items-center justify-center",
                currentStep > step.id || currentStep === step.id
                  ? "bg-[#B125F9] text-white"
                  : "border border-gray-300 text-gray-400",
              )}
            >
              {currentStep > step.id ? <Check className="h-6 w-6" /> : <span>{step.id}</span>}
            </div>
            <span className="text-xs text-center mt-2 max-w-[70px]">{step.name}</span>
          </div>
        ))}
        {/* Dotted lines connecting the steps */}
        <div className="absolute top-6 left-0 w-full h-0 border-t border-dashed border-[#B125F9] -z-0"></div>
      </div>
    )
  }

  return (
    <div className="hidden md:flex items-center mb-8">
      {steps.map((step, index) => (
        <div key={step.id} className="flex items-center">
          <div
            className={cn(
              "w-12 h-12 rounded-full flex items-center justify-center",
              currentStep > step.id || currentStep === step.id
                ? "bg-[#B125F9] text-white"
                : "border border-gray-300 text-gray-400",
            )}
          >
            {currentStep > step.id ? <Check className="h-6 w-6" /> : <span>{step.id}</span>}
          </div>
          <div className="ml-4 mr-8">
            <p className="text-sm font-medium">{step.name}</p>
          </div>
          {index < steps.length - 1 && <div className="flex-grow border-t border-dashed border-[#B125F9] mx-4"></div>}
        </div>
      ))}
    </div>
  )
}

