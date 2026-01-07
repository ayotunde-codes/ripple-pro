"use client"

import { useState, useEffect, useMemo, useCallback } from "react"
import { UseFormReturn } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, ChevronRight, ChevronLeft } from "lucide-react"
import { Form } from "@/components/ui/form"
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { ProfileAvatar } from "./profile-avatar"
import { PersonalInfoForm } from "./personal-info-form"
import { SocialMediaForm } from "./social-media-form"
import { BankInfoForm } from "./bank-info-form"
import { 
  PersonalInfoFormData, 
  BVNFormData, 
  BankAccountFormData, 
  SocialMediaFormData 
} from "./profile-schemas"

interface Country {
  id: number
  name: string
}

interface ProfileStepFormProps {
  profileImage: string | null
  isVerified: boolean
  countries?: Country[]
  isLoadingCountries?: boolean
  onImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void
  onStepSubmit: (step: number, data: any, autoAdvance?: boolean) => void
  onStepChange?: (step: number) => void
  isLoading: {
    personal: boolean
    bvn: boolean
    account: boolean
    social: boolean
  }
  completedSteps: Set<number>
  forms: {
    personalInfo: UseFormReturn<PersonalInfoFormData>
    bvn: UseFormReturn<BVNFormData>
    bankAccount: UseFormReturn<BankAccountFormData>
    socialMedia: UseFormReturn<SocialMediaFormData>
  }
}

const STEPS = [
  { id: 1, title: "Personal Information", description: "Basic details" },
  { id: 2, title: "BVN", description: "Bank Verification Number" },
  { id: 3, title: "Bank Account", description: "Settlement account details" },
  { id: 4, title: "Social Media", description: "Social media links" },
]

export function ProfileStepForm({
  profileImage,
  isVerified,
  countries = [],
  isLoadingCountries = false,
  onImageUpload,
  onStepSubmit,
  onStepChange,
  isLoading,
  completedSteps,
  forms,
}: ProfileStepFormProps) {
  const [currentStep, setCurrentStep] = useState(1)
  
  // Expose step change handler to parent
  useEffect(() => {
    if (onStepChange) {
      onStepChange(currentStep)
    }
  }, [currentStep, onStepChange])

  const handlePrevious = useCallback(() => {
    setCurrentStep(prev => prev > 1 ? prev - 1 : prev)
  }, [])

  const handleNext = useCallback(() => {
    setCurrentStep(prev => prev < STEPS.length ? prev + 1 : prev)
  }, [])

  const isStepComplete = useCallback((step: number) => completedSteps.has(step), [completedSteps])
  
  const isCurrentStepLoading = useMemo(() => {
    if (currentStep === 1) return isLoading.personal
    if (currentStep === 2) return isLoading.bvn
    if (currentStep === 3) return isLoading.account
    if (currentStep === 4) return isLoading.social
    return false
  }, [currentStep, isLoading])

  // Get current form based on step
  const getCurrentForm = () => {
    switch (currentStep) {
      case 1: return forms.personalInfo
      case 2: return forms.bvn
      case 3: return forms.bankAccount
      case 4: return forms.socialMedia
      default: return forms.personalInfo
    }
  }

  const handleStepSubmit = useCallback((autoAdvance: boolean = false) => {
    const form = getCurrentForm()
    const wasIncomplete = !completedSteps.has(currentStep)
    
    form.handleSubmit(
      (data) => {
        onStepSubmit(currentStep, data, autoAdvance && wasIncomplete)
        
        // Auto-advance to next step if this was first-time completion
        if (autoAdvance && wasIncomplete && currentStep < STEPS.length) {
          setTimeout(() => {
            setCurrentStep(prev => prev + 1)
          }, 500)
        }
      },
      (errors) => {
        // Validation errors will be shown by FormMessage components
        console.log("Form validation errors:", errors)
      }
    )()
  }, [currentStep, completedSteps, onStepSubmit, forms])

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <Form {...forms.personalInfo}>
            <Card className="border-gray-200 shadow-sm rounded-xl dark:bg-[#0E0E0E] dark:border-border-dark">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="dark:text-foreground-dark">Personal Information</CardTitle>
                  {isStepComplete(1) && (
                    <Badge className="bg-green-500 hover:bg-green-600">
                      <Check className="mr-1 h-3 w-3" /> Completed
                    </Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <ProfileAvatar
                  profileImage={profileImage}
                  firstName={forms.personalInfo.watch("firstName") || ""}
                  lastName={forms.personalInfo.watch("lastName") || ""}
                  onImageUpload={onImageUpload}
                  isMobile={false}
                />
                <PersonalInfoForm
                  isMobile={false}
                  countries={countries}
                  isLoadingCountries={isLoadingCountries}
                />
              </CardContent>
            </Card>
          </Form>
        )
      case 2:
        return (
          <Form {...forms.bvn}>
            <Card className="border-gray-200 shadow-sm rounded-xl dark:bg-[#0E0E0E] dark:border-border-dark">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="dark:text-foreground-dark">Bank Verification Number (BVN)</CardTitle>
                  {isStepComplete(2) && (
                    <Badge className="bg-green-500 hover:bg-green-600">
                      <Check className="mr-1 h-3 w-3" /> Completed
                    </Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <FormField
                  control={forms.bvn.control}
                  name="bvn"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700 dark:text-[#A9A9A9]">
                        BVN
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="text"
                          maxLength={11}
                          placeholder="Enter 11-digit BVN"
                          className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 dark:bg-[#0E0E0E] dark:text-white dark:border-gray-700"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          </Form>
        )
      case 3:
        return (
          <Form {...forms.bankAccount}>
            <Card className="border-gray-200 shadow-sm rounded-xl dark:bg-[#0E0E0E] dark:border-border-dark">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="dark:text-foreground-dark">Settlement Account</CardTitle>
                  {isStepComplete(3) && (
                    <Badge className="bg-green-500 hover:bg-green-600">
                      <Check className="mr-1 h-3 w-3" /> Completed
                    </Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <BankInfoForm isMobile={false} />
              </CardContent>
            </Card>
          </Form>
        )
      case 4:
        return (
          <Form {...forms.socialMedia}>
            <Card className="border-gray-200 shadow-sm rounded-xl dark:bg-[#0E0E0E] dark:border-border-dark">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="dark:text-foreground-dark">Social Media Accounts</CardTitle>
                  {isStepComplete(4) && (
                    <Badge className="bg-green-500 hover:bg-green-600">
                      <Check className="mr-1 h-3 w-3" /> Completed
                    </Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <SocialMediaForm isMobile={false} />
              </CardContent>
            </Card>
          </Form>
        )
      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      {/* Step Indicator */}
      <div className="flex items-center justify-between">
        {STEPS.map((step, index) => (
          <div key={step.id} className="flex items-center flex-1">
            <div className="flex flex-col items-center flex-1">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-colors ${
                  currentStep === step.id
                    ? "bg-gradient-to-r from-[#E43EFC] to-[#B125F9] text-white"
                    : isStepComplete(step.id)
                    ? "bg-green-500 text-white"
                    : "bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400"
                }`}
              >
                {isStepComplete(step.id) ? (
                  <Check className="h-5 w-5" />
                ) : (
                  step.id
                )}
              </div>
              <div className="mt-2 text-center">
                <p
                  className={`text-xs font-medium ${
                    currentStep === step.id
                      ? "text-[#E43EFC] dark:text-[#B125F9]"
                      : isStepComplete(step.id)
                      ? "text-green-500"
                      : "text-gray-500 dark:text-gray-400"
                  }`}
                >
                  {step.title}
                </p>
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
                  {step.description}
                </p>
              </div>
            </div>
            {index < STEPS.length - 1 && (
              <div
                className={`flex-1 h-0.5 mx-2 ${
                  isStepComplete(step.id) ? "bg-green-500" : "bg-gray-200 dark:bg-gray-700"
                }`}
              />
            )}
          </div>
        ))}
      </div>

      {/* Step Content */}
      {renderStepContent()}

      {/* Navigation Buttons */}
      <div className="flex justify-between gap-4">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={currentStep === 1 || isCurrentStepLoading}
          className="rounded-full"
        >
          <ChevronLeft className="mr-2 h-4 w-4" />
          Previous
        </Button>
        <div className="flex gap-4">
          {currentStep < STEPS.length && (
            <>
              <Button
                variant="outline"
                onClick={handleNext}
                disabled={isCurrentStepLoading}
                className="rounded-full"
              >
                Skip
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
              {!isStepComplete(currentStep) && (
                <Button
                  onClick={() => handleStepSubmit(true)}
                  disabled={isCurrentStepLoading}
                  className="bg-gradient-to-r from-[#E43EFC] to-[#B125F9] hover:from-[#E43EFC]/90 hover:to-[#B125F9]/90 text-white rounded-full"
                >
                  {isCurrentStepLoading ? "Saving..." : "Save & Next"}
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              )}
            </>
          )}
          <Button
            onClick={() => handleStepSubmit(false)}
            disabled={isCurrentStepLoading}
            className="bg-gradient-to-r from-[#E43EFC] to-[#B125F9] hover:from-[#E43EFC]/90 hover:to-[#B125F9]/90 text-white rounded-full"
          >
            {isCurrentStepLoading
              ? "Saving..."
              : isStepComplete(currentStep)
              ? "Update"
              : currentStep === STEPS.length
              ? "Save & Continue to KYC"
              : "Save"}
          </Button>
        </div>
      </div>
    </div>
  )
}

