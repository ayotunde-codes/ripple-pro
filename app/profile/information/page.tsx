"use client"

import type React from "react"
import { useState, useEffect, useMemo, useCallback } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "@/components/ui/use-toast"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { AlertCircle, Loader2 } from "lucide-react"
import { useMobile } from "@/hooks/use-mobile"
import { useCurrentUser } from "@/services/auth"
import { 
  useUpdatePersonalInfo, 
  useUpdateBVN, 
  useUpdateAccount, 
  useUpdateSocialMedia,
  useCountries,
  useUserProfile
} from "@/services/profile"
import dynamic from "next/dynamic"
import { 
  personalInfoSchema, 
  bvnSchema, 
  bankAccountSchema, 
  socialMediaSchema,
  type PersonalInfoFormData,
  type BVNFormData,
  type BankAccountFormData,
  type SocialMediaFormData
} from "./_components/profile-schemas"

// Lazy load ProfileStepForm to reduce initial bundle size
const ProfileStepForm = dynamic(
  () => import("./_components/profile-step-form").then((mod) => ({ default: mod.ProfileStepForm })),
  { 
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-6 w-6 animate-spin text-[#B125F9]" />
      </div>
    )
  }
)

export default function ProfileInformationPage() {
  const router = useRouter()
  const isMobile = useMobile()
  
  // Get current user from React Query
  const { data: currentUser } = useCurrentUser()
  
  // Fetch user profile with profile stages
  const { 
    data: userProfileData, 
    isLoading: isLoadingProfile, 
    isFetching: isFetchingProfile,
    refetch: refetchUserProfile 
  } = useUserProfile()
  const profileStages = userProfileData?.data?.profile_stages
  
  // Fetch countries
  const { data: countriesData, isLoading: isLoadingCountries, isFetching: isFetchingCountries } = useCountries()
  const countries = useMemo(() => countriesData?.data || [], [countriesData?.data])
  
  // API mutations
  const updatePersonalInfo = useUpdatePersonalInfo()
  const updateBVN = useUpdateBVN()
  const updateAccount = useUpdateAccount()
  const updateSocialMedia = useUpdateSocialMedia()
  
  const [profileImage, setProfileImage] = useState<string | null>(null)
  
  // Initialize completed steps from profile stages
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set())
  
  // Initialize React Hook Form instances for each step
  const personalInfoForm = useForm<PersonalInfoFormData>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      firstName: "",
      middleName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      dateOfBirth: "",
      countryId: 0,
    },
  })

  const bvnForm = useForm<BVNFormData>({
    resolver: zodResolver(bvnSchema),
    defaultValues: {
      bvn: "",
    },
  })

  const bankAccountForm = useForm<BankAccountFormData>({
    resolver: zodResolver(bankAccountSchema),
    defaultValues: {
      bankCode: "",
      accountNumber: "",
      accountName: "",
    },
  })

  const socialMediaForm = useForm<SocialMediaFormData>({
    resolver: zodResolver(socialMediaSchema),
    defaultValues: {
      social_instagram: "",
      social_facebook: "",
      social_twitter: "",
      social_tiktok: "",
      social_youtube: "",
    },
  })
  
  // Memoize completed steps calculation
  const completedStepsMemo = useMemo(() => {
    if (!profileStages) return new Set<number>()
    const steps = new Set<number>()
    if (profileStages.personal_info_completed) steps.add(1)
    if (profileStages.bvn_completed) steps.add(2)
    if (profileStages.account_details_completed) steps.add(3)
    if (profileStages.social_media_linked) steps.add(4)
    return steps
  }, [profileStages])

  useEffect(() => {
    setCompletedSteps(completedStepsMemo)
  }, [completedStepsMemo])

  // Initialize form data from current user
  useEffect(() => {
    if (currentUser) {
      personalInfoForm.reset({
        firstName: currentUser.first_name || "",
        lastName: currentUser.last_name || "",
        email: currentUser.email || "",
        middleName: "",
        phoneNumber: "",
        dateOfBirth: "",
        countryId: 0,
      })
    }
  }, [currentUser, personalInfoForm])

  // Memoize profile completion check
  const isProfileComplete = useMemo(() => {
    if (!profileStages) return false
    return (
      profileStages.personal_info_completed &&
      profileStages.bvn_completed &&
      profileStages.account_details_completed &&
      profileStages.social_media_linked
    )
  }, [profileStages])

  const handleStepSubmit = useCallback((step: number, data: any, autoAdvance: boolean = false) => {
    switch (step) {
      case 1: // Personal Info
        const personalData = data as PersonalInfoFormData
        updatePersonalInfo.mutate(
          {
            first_name: personalData.firstName,
            middle_name: personalData.middleName || undefined,
            last_name: personalData.lastName,
            phone_number: personalData.phoneNumber,
            dob: personalData.dateOfBirth,
            country_id: personalData.countryId,
          },
          {
            onSuccess: () => {
              setCompletedSteps(prev => {
                const newSet = new Set(prev)
                newSet.add(1)
                return newSet
              })
              refetchUserProfile() // Refresh profile stages
              localStorage.setItem("profileComplete", "true")
              
              toast({
                title: "Personal info saved",
                description: "Your personal information has been updated successfully.",
              })
              
              // Note: Step advancement is handled by ProfileStepForm internally
              // No need to manually update step from here
            },
            onError: (error: any) => {
              toast({
                title: "Update failed",
                description: error?.response?.data?.message || "Failed to update profile",
                variant: "destructive",
              })
            },
          }
        )
        break

      case 2: // BVN
        const bvnData = data as BVNFormData
        updateBVN.mutate(
          { bvn: bvnData.bvn },
          {
            onSuccess: () => {
              setCompletedSteps(prev => {
                const newSet = new Set(prev)
                newSet.add(2)
                return newSet
              })
              refetchUserProfile() // Refresh profile stages
              toast({
                title: "BVN saved",
                description: "Your BVN has been updated successfully.",
              })
              
              // Note: Step advancement is handled by ProfileStepForm internally
              // No need to manually update step from here
            },
            onError: (error: any) => {
              toast({
                title: "Update failed",
                description: error?.response?.data?.message || "Failed to update BVN",
                variant: "destructive",
              })
            },
          }
        )
        break

      case 3: // Bank Account
        const bankData = data as BankAccountFormData
        updateAccount.mutate(
          {
            account_name: bankData.accountName,
            account_number: bankData.accountNumber,
            bank_code: bankData.bankCode,
          },
      {
        onSuccess: () => {
              setCompletedSteps(prev => {
                const newSet = new Set(prev)
                newSet.add(3)
                return newSet
              })
              refetchUserProfile() // Refresh profile stages
          toast({
                title: "Bank account saved",
            description: "Your settlement account has been updated successfully.",
          })
              
              // Note: Step advancement is handled by ProfileStepForm internally
              // No need to manually update step from here
        },
        onError: (error: any) => {
          toast({
            title: "Update failed",
                description: error?.response?.data?.message || "Failed to update bank account",
                variant: "destructive",
              })
            },
          }
        )
        break

      case 4: // Social Media
        const socialData = data as SocialMediaFormData
        
        // Helper function to convert username to URL or return URL as-is
        const convertToUrl = (input: string, platformName: string): string => {
          const trimmed = input.trim()
          
          // If it's already a URL (starts with http:// or https://), return as-is
          if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
            return trimmed
          }
          
          // Treat as username - remove @ if present, then convert to URL
          const username = trimmed.startsWith("@") ? trimmed.substring(1) : trimmed
          const baseUrlMap: Record<string, string> = {
            "Instagram": "https://instagram.com/",
            "Facebook": "https://facebook.com/",
            "X(Twitter)": "https://x.com/",
            "TikTok": "https://tiktok.com/@",
            "YouTube": "https://youtube.com/@",
          }
          const baseUrl = baseUrlMap[platformName] || "https://"
          return `${baseUrl}${username}`
        }
        
        // Collect all social media URLs
        const socialLinks: Array<{ platform: string; url: string }> = []
        
        // Map profile data fields to platform names
        const platformMap: Record<string, string> = {
          social_instagram: "Instagram",
          social_facebook: "Facebook",
          social_twitter: "X(Twitter)",
          social_tiktok: "TikTok",
          social_youtube: "YouTube",
        }

        Object.entries(platformMap).forEach(([fieldKey, platformName]) => {
          const input = socialData[fieldKey as keyof SocialMediaFormData] as string
          if (input && input.trim()) {
            const url = convertToUrl(input, platformName)
            socialLinks.push({ platform: platformName, url })
          }
        })

        updateSocialMedia.mutate(
          { links: socialLinks },
          {
            onSuccess: (response) => {
              const updatedCount = response.data.updated_links.length
              const failedCount = response.data.failed_links.length
              
              setCompletedSteps(prev => {
                const newSet = new Set(prev)
                newSet.add(4)
                return newSet
              })
              refetchUserProfile() // Refresh profile stages
              
              toast({
                title: "Social media saved",
                description: `${updatedCount} link(s) updated successfully${failedCount > 0 ? `. ${failedCount} failed.` : "."}`,
              })
              
              // Check if all profile stages are complete
              setTimeout(() => {
                refetchUserProfile().then((result) => {
                  const stages = result.data?.data?.profile_stages
                  if (stages && 
                      stages.personal_info_completed &&
                      stages.bvn_completed &&
                      stages.account_details_completed &&
                      stages.social_media_linked) {
                    // All steps complete, redirect to KYC
                    setTimeout(() => {
                      router.push("/profile/kyc")
                    }, 500)
                  }
                })
              }, 500)
            },
            onError: (error: any) => {
              toast({
                title: "Update failed",
                description: error?.response?.data?.message || "Failed to update social media",
            variant: "destructive",
          })
        },
      }
    )
        break
    }
  }, [
    updatePersonalInfo,
    updateBVN,
    updateAccount,
    updateSocialMedia,
    refetchUserProfile,
    router,
    completedSteps
  ])

  const handleImageUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        setProfileImage(event.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }, [])

  const kycStatus = useMemo(
    () => userProfileData?.data?.kyc_status || currentUser?.kyc_status || "pending",
    [userProfileData?.data?.kyc_status, currentUser?.kyc_status]
  )
  const needsKYC = useMemo(() => kycStatus === "pending", [kycStatus])
  
  // Check if profile is incomplete - show prominent alert
  const profileIncomplete = useMemo(() => !isProfileComplete, [isProfileComplete])
  
  // Memoize completion message based on profile stages
  const completionMessage = useMemo(() => {
    if (!profileStages) return "Complete your profile to continue."
    
    const incomplete: string[] = []
    if (!profileStages.personal_info_completed) incomplete.push("Personal Information")
    if (!profileStages.bvn_completed) incomplete.push("BVN")
    if (!profileStages.account_details_completed) incomplete.push("Bank Account")
    if (!profileStages.social_media_linked) incomplete.push("Social Media")
    
    if (incomplete.length === 0) {
      return "Profile complete! You can now proceed to KYC verification."
    }
    
    return `Please complete: ${incomplete.join(", ")}`
  }, [profileStages])

  // Show loading state while profile is being fetched initially
  // Use isLoading for initial load, isFetching for refetches
  const isInitialLoading = useMemo(
    () => isLoadingProfile || isLoadingCountries,
    [isLoadingProfile, isLoadingCountries]
  )
  const isRefetching = useMemo(
    () => isFetchingProfile || isFetchingCountries,
    [isFetchingProfile, isFetchingCountries]
  )
  
  // Memoize loading states object
  const loadingStates = useMemo(() => ({
    personal: updatePersonalInfo.isPending || isRefetching,
    bvn: updateBVN.isPending || isRefetching,
    account: updateAccount.isPending || isRefetching,
    social: updateSocialMedia.isPending || isRefetching,
  }), [
    updatePersonalInfo.isPending,
    updateBVN.isPending,
    updateAccount.isPending,
    updateSocialMedia.isPending,
    isRefetching
  ])
  
  // Show full loading screen on initial load
  if (isInitialLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-[#B125F9]" />
          <p className="text-gray-600 dark:text-gray-400">Loading profile information...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Profile Completion Alert - Show first if incomplete */}
      {profileIncomplete && (
        <Alert className="border-orange-500 bg-orange-50 dark:bg-orange-950">
          <AlertCircle className="h-4 w-4 text-orange-600" />
          <AlertDescription className="flex items-center justify-between">
            <span className="text-orange-600 dark:text-orange-400">
              <strong>Complete your profile</strong> to continue. {completionMessage}
            </span>
          </AlertDescription>
        </Alert>
      )}
      
      {/* KYC Prompt Alert - Show after profile is complete */}
      {!profileIncomplete && needsKYC && completedSteps.size === 4 && (
        <Alert className="border-blue-500 bg-blue-50 dark:bg-blue-950">
          <AlertCircle className="h-4 w-4 text-blue-600" />
          <AlertDescription className="flex items-center justify-between">
            <span className="text-blue-600 dark:text-blue-400">
              <strong>Complete your KYC verification</strong> to access all features and start earning. 
              Upload your documents to get verified.
            </span>
            <Button
              onClick={() => router.push("/profile/kyc")}
              className="ml-4 bg-blue-600 hover:bg-blue-700 text-white"
              size="sm"
            >
              Complete KYC
            </Button>
          </AlertDescription>
        </Alert>
      )}
      
      {/* Show subtle loading indicator during refetches */}
      {isRefetching && (
        <div className="flex items-center justify-center py-2">
          <Loader2 className="h-4 w-4 animate-spin text-[#B125F9] mr-2" />
          <p className="text-sm text-gray-600 dark:text-gray-400">Updating profile...</p>
        </div>
      )}
      
      <ProfileStepForm
        profileImage={profileImage}
        isVerified={userProfileData?.data?.kyc_status === "approved"}
        countries={countries}
        isLoadingCountries={isLoadingCountries || isFetchingCountries}
        onImageUpload={handleImageUpload}
        onStepSubmit={handleStepSubmit}
        isLoading={loadingStates}
        completedSteps={completedSteps}
        forms={{
          personalInfo: personalInfoForm,
          bvn: bvnForm,
          bankAccount: bankAccountForm,
          socialMedia: socialMediaForm,
        }}
      />
    </div>
  )
}
