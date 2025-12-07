"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { toast } from "@/components/ui/use-toast"
import { useMobile } from "@/hooks/use-mobile"
import { useCurrentUser } from "@/services/auth"
import { useUpdatePersonalInfo, useUpdateBankInfo, useUpdateSocialMedia } from "@/services/profile"
import { MobileProfileView } from "./_components/mobile-profile-view"
import { DesktopProfileView } from "./_components/desktop-profile-view"
import { initialProfileData, ProfileData } from "./_components/profile-data"

export default function ProfileInformationPage() {
  const router = useRouter()
  const isMobile = useMobile()
  
  // Get current user from React Query
  const { data: currentUser } = useCurrentUser()
  
  // API mutations
  const updatePersonalInfo = useUpdatePersonalInfo()
  const updateBankInfo = useUpdateBankInfo()
  const updateSocialMedia = useUpdateSocialMedia()
  
  const [profileImage, setProfileImage] = useState<string | null>(null)
  const [profileData, setProfileData] = useState<ProfileData>(initialProfileData)

  // Initialize profile data from current user
  useEffect(() => {
    if (currentUser) {
      setProfileData(prev => ({
        ...prev,
        firstName: currentUser.first_name || prev.firstName,
        lastName: currentUser.last_name || prev.lastName,
        email: currentUser.email || prev.email,
      }))
    }
  }, [currentUser])

  const handleSavePersonalInfo = () => {
    updatePersonalInfo.mutate(
      {
        first_name: profileData.firstName,
        middle_name: profileData.middleName,
        last_name: profileData.lastName,
        phone_number: profileData.email, // TODO: Add phone field to UI
        dob: profileData.dateOfBirth,
        country_id: 1, // TODO: Map country code to ID
      },
      {
        onSuccess: () => {
          toast({
            title: "Profile updated",
            description: "Your personal information has been updated successfully.",
          })
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
  }

  const handleSaveBankInfo = () => {
    updateBankInfo.mutate(
      {
        bvn: profileData.bvn,
        account: {
          account_name: profileData.accountName,
          account_number: profileData.accountNumber,
          bank_code: profileData.bankCode,
        },
      },
      {
        onSuccess: () => {
          toast({
            title: "Bank info updated",
            description: "Your settlement account has been updated successfully.",
          })
        },
        onError: (error: any) => {
          toast({
            title: "Update failed",
            description: error?.response?.data?.message || "Failed to update bank info",
            variant: "destructive",
          })
        },
      }
    )
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        setProfileImage(event.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSaveSocialMedia = () => {
    updateSocialMedia.mutate(
      {
        instagram: profileData.instagram,
        facebook: profileData.facebook,
        twitter: profileData.twitter,
        tiktok: profileData.tiktok,
        youtube: profileData.youtube,
      },
      {
        onSuccess: () => {
          toast({
            title: "Social media updated",
            description: "Your social media accounts have been updated successfully.",
          })
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
  }

  const handleCancel = () => {
    router.push("/dashboard")
  }

  // Update profile data field
  const handleFieldChange = (field: keyof ProfileData, value: string) => {
    setProfileData(prev => ({ ...prev, [field]: value }))
  }

  // Mobile view
  if (isMobile) {
    return (
      <MobileProfileView
        profileData={profileData}
        profileImage={profileImage}
        isLoadingSocial={updateSocialMedia.isPending}
        onImageUpload={handleImageUpload}
        onSaveSocialMedia={handleSaveSocialMedia}
        onFieldChange={handleFieldChange}
      />
    )
  }

  // Desktop view
  return (
    <DesktopProfileView
      profileData={profileData}
      profileImage={profileImage}
      isVerified={currentUser?.kyc_verified || currentUser?.status === "active"}
      isLoading={updatePersonalInfo.isPending || updateBankInfo.isPending}
      onImageUpload={handleImageUpload}
      onSaveChanges={handleSaveBankInfo}
      onCancel={handleCancel}
      onFieldChange={handleFieldChange}
    />
  )
}
