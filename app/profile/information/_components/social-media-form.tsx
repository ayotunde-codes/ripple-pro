import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ProfileData } from "./profile-data"

interface SocialMediaFormProps {
  profileData: ProfileData
  isMobile?: boolean
  onChange?: (field: keyof ProfileData, value: string) => void
}

export function SocialMediaForm({ profileData, isMobile = false, onChange }: SocialMediaFormProps) {
  const suffix = isMobile ? "-mobile" : ""
  const inputClass = isMobile
    ? "rounded-full border-gray-200 h-14 px-5 flex-1 dark:bg-[#0E0E0E] dark:text-white dark:border-gray-700"
    : "rounded-lg border-gray-200 flex-1 dark:bg-[#0E0E0E] dark:text-white dark:border-gray-700"
  const prefixClass = isMobile
    ? "inline-flex items-center px-3 h-14 rounded-l-full border border-r-0 border-gray-200 bg-muted text-muted-foreground dark:bg-[#1A1A1A] dark:border-gray-700 dark:text-[#A9A9A9]"
    : "inline-flex items-center px-3 rounded-l-lg border border-r-0 border-gray-200 bg-muted text-muted-foreground dark:bg-[#1A1A1A] dark:border-gray-700 dark:text-[#A9A9A9]"

  const socialPlatforms = [
    { id: "instagram", label: "Instagram", prefix: "@" },
    { id: "facebook", label: "Facebook", prefix: "@" },
    { id: "twitter", label: "X (Twitter)", prefix: "@" },
    { id: "tiktok", label: "TikTok", prefix: "@" },
    { id: "youtube", label: "YouTube", prefix: "@" },
  ]

  return (
    <div className={isMobile ? "space-y-4" : "grid gap-4 md:grid-cols-2"}>
      {socialPlatforms.map((platform) => (
        <div key={platform.id} className="space-y-2">
          <Label htmlFor={`${platform.id}${suffix}`} className="text-gray-700 dark:text-[#A9A9A9]">
            {platform.label}
          </Label>
          <div className="flex">
            <span className={prefixClass}>{platform.prefix}</span>
            <Input
              id={`${platform.id}${suffix}`}
              value={profileData[platform.id as keyof ProfileData] as string}
              onChange={(e) => onChange?.(platform.id as keyof ProfileData, e.target.value)}
              placeholder={`Enter ${platform.label} username`}
              className={inputClass}
            />
          </div>
        </div>
      ))}
    </div>
  )
}

