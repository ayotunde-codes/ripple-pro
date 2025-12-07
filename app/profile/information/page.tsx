"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { toast } from "@/components/ui/use-toast"
import { useMobile } from "@/hooks/use-mobile"
import { MobileProfileView } from "./_components/mobile-profile-view"
import { DesktopProfileView } from "./_components/desktop-profile-view"
import { initialProfileData, ProfileData } from "./_components/profile-data"

export default function ProfileInformationPage() {
  const router = useRouter()
  const isMobile = useMobile()
  const [isVerified, setIsVerified] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [profileImage, setProfileImage] = useState<string | null>(null)
  const [isLoadingSocial, setIsLoadingSocial] = useState(false)
  const [profileData, setProfileData] = useState<ProfileData>(initialProfileData)

  useEffect(() => {
    // Check if the logged-in user is the verified account or unverified test account
    const loggedInEmail = localStorage.getItem("userEmail")
    if (loggedInEmail === "joshuaolugbode12+1@gmail.com") {
      // This is our test unverified user
      setIsVerified(false)
    }

    // In a real app, we would fetch the user's profile data here
  }, [])

  const handleSaveChanges = () => {
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Profile updated",
        description: "Your profile information has been updated successfully.",
      })
    }, 1500)
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
    setIsLoadingSocial(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoadingSocial(false)
      toast({
        title: "Social media updated",
        description: "Your social media information has been updated successfully.",
      })
    }, 1500)
  }

  const handleCancel = () => {
    router.push("/dashboard")
  }

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn")
    localStorage.removeItem("userEmail")
    router.push("/login")
  }

  // Mobile view
  if (isMobile) {
    return (
      <MobileProfileView
        profileData={profileData}
        profileImage={profileImage}
        isLoadingSocial={isLoadingSocial}
        onImageUpload={handleImageUpload}
        onSaveSocialMedia={handleSaveSocialMedia}
        onLogout={handleLogout}
      />
    )
  }

  // Desktop view
  return (
    <DesktopProfileView
      profileData={profileData}
      profileImage={profileImage}
      isVerified={isVerified}
      isLoading={isLoading}
      onImageUpload={handleImageUpload}
      onSaveChanges={handleSaveChanges}
      onCancel={handleCancel}
    />
  )
}
