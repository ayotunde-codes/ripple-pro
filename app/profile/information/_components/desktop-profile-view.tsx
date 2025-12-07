import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, X } from "lucide-react"
import { ProfileAvatar } from "./profile-avatar"
import { PersonalInfoForm } from "./personal-info-form"
import { SocialMediaForm } from "./social-media-form"
import { BankInfoForm } from "./bank-info-form"
import { ProfileData } from "./profile-data"

interface DesktopProfileViewProps {
  profileData: ProfileData
  profileImage: string | null
  isVerified: boolean
  isLoading: boolean
  onImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void
  onSaveChanges: () => void
  onCancel: () => void
  onFieldChange: (field: keyof ProfileData, value: string) => void
}

export function DesktopProfileView({
  profileData,
  profileImage,
  isVerified,
  isLoading,
  onImageUpload,
  onSaveChanges,
  onCancel,
  onFieldChange,
}: DesktopProfileViewProps) {
  return (
    <div className="space-y-6">
      <Card className="border-gray-200 shadow-sm rounded-xl dark:bg-[#0E0E0E] dark:border-border-dark">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="dark:text-foreground-dark">Profile Information</CardTitle>
            <Badge
              variant={isVerified ? "default" : "outline"}
              className={isVerified ? "bg-green-500 hover:bg-green-600" : "text-red-500 border-red-500"}
            >
              {isVerified ? (
                <span className="flex items-center">
                  <Check className="mr-1 h-3 w-3" /> Verified
                </span>
              ) : (
                <span className="flex items-center">
                  <X className="mr-1 h-3 w-3" /> Unverified
                </span>
              )}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <ProfileAvatar
            profileImage={profileImage}
            firstName={profileData.firstName}
            lastName={profileData.lastName}
            onImageUpload={onImageUpload}
            isMobile={false}
          />

          <PersonalInfoForm profileData={profileData} isMobile={false} onChange={onFieldChange} />
        </CardContent>
      </Card>

      <Card className="border-gray-200 shadow-sm rounded-xl dark:bg-[#0E0E0E] dark:border-border-dark">
        <CardHeader>
          <CardTitle className="dark:text-foreground-dark">Social Media Accounts</CardTitle>
        </CardHeader>
        <CardContent>
          <SocialMediaForm profileData={profileData} isMobile={false} onChange={onFieldChange} />
        </CardContent>
      </Card>

      <Card className="border-gray-200 shadow-sm rounded-xl dark:bg-[#0E0E0E] dark:border-border-dark">
        <CardHeader>
          <CardTitle className="dark:text-foreground-dark">Settlement Account</CardTitle>
        </CardHeader>
        <CardContent>
          <BankInfoForm profileData={profileData} isMobile={false} onChange={onFieldChange} />
        </CardContent>
      </Card>

      <div className="flex justify-end gap-4">
        <Button variant="outline" onClick={onCancel} className="rounded-full">
          Cancel
        </Button>
        <Button
          onClick={onSaveChanges}
          disabled={isLoading}
          className="bg-gradient-to-r from-[#E43EFC] to-[#B125F9] hover:from-[#E43EFC]/90 hover:to-[#B125F9]/90 text-white rounded-full"
        >
          {isLoading ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </div>
  )
}

