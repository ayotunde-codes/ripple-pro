import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
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
  onLogout: () => void
}

export function MobileProfileView({
  profileData,
  profileImage,
  isLoadingSocial,
  onImageUpload,
  onSaveSocialMedia,
  onLogout,
}: MobileProfileViewProps) {
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

        <PersonalInfoForm profileData={profileData} isMobile={true} />
      </div>

      {/* Social Media Accounts Section */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Social Media Accounts</h2>
        <SocialMediaForm profileData={profileData} isMobile={true} />
      </div>

      {/* Settlement Account Section */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Settlement Account</h2>
        <BankInfoForm profileData={profileData} isMobile={true} />
      </div>

      {/* Mobile Logout and Save Changes Buttons */}
      <div className="md:hidden mt-8 mb-24 space-y-4">
        <Button
          variant="destructive"
          className="w-full flex items-center justify-center gap-2 py-6"
          onClick={onLogout}
        >
          <LogOut className="h-4 w-4" />
          <span>Log out</span>
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

