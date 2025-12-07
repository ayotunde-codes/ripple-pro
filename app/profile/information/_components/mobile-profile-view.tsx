"use client"

import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { useLogout } from "@/services/auth"
import { toast } from "@/components/ui/use-toast"
import { ProfileAvatar } from "./profile-avatar"
import { PersonalInfoForm } from "./personal-info-form"
import { SocialMediaForm } from "./social-media-form"
import { BankInfoForm } from "./bank-info-form"
import { ProfileData } from "./profile-data"

interface MobileProfileViewProps {
  profileData: ProfileData
  profileImage: string | null
  isLoadingSocial: boolean
  onImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void
  onSaveSocialMedia: () => void
  onFieldChange: (field: keyof ProfileData, value: string) => void
}

export function MobileProfileView({
  profileData,
  profileImage,
  isLoadingSocial,
  onImageUpload,
  onSaveSocialMedia,
  onFieldChange,
}: MobileProfileViewProps) {
  const logout = useLogout()

  const handleLogout = () => {
    logout.mutate(undefined, {
      onSuccess: () => {
        toast({
          title: "Logged out",
          description: "You have been successfully logged out.",
        })
      },
    })
  }

  return (
    <div className="space-y-6 pb-36">
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Profile Information</h2>
          <ThemeToggle />
        </div>

        <ProfileAvatar
          profileImage={profileImage}
          firstName={profileData.firstName}
          lastName={profileData.lastName}
          onImageUpload={onImageUpload}
          isMobile={true}
        />

        <PersonalInfoForm profileData={profileData} isMobile={true} onChange={onFieldChange} />
      </div>

      {/* Social Media Accounts Section */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Social Media Accounts</h2>
        <SocialMediaForm profileData={profileData} isMobile={true} onChange={onFieldChange} />
      </div>

      {/* Settlement Account Section */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Settlement Account</h2>
        <BankInfoForm profileData={profileData} isMobile={true} onChange={onFieldChange} />
      </div>

      {/* Mobile Logout and Save Changes Buttons */}
      <div className="md:hidden mt-8 mb-24 space-y-4">
        <Button
          variant="destructive"
          className="w-full flex items-center justify-center gap-2 py-6"
          onClick={handleLogout}
          disabled={logout.isPending}
        >
          <LogOut className="h-4 w-4" />
          <span>{logout.isPending ? "Logging out..." : "Log out"}</span>
        </Button>

        <Button
          className="w-full bg-gradient-to-r from-[#E43EFC] to-[#B125F9] text-white rounded-full py-6"
          onClick={onSaveSocialMedia}
          disabled={isLoadingSocial}
        >
          {isLoadingSocial ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </div>
  )
}

