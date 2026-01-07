import { useFormContext } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { useSupportedPlatforms } from "@/services/profile"
import { SocialMediaFormData } from "./profile-schemas"

/**
 * Map platform name from API to field name
 */
const mapPlatformNameToField = (platformName: string): string => {
  const mapping: Record<string, string> = {
    "Instagram": "instagram",
    "Facebook": "facebook",
    "X(Twitter)": "twitter",
    "X (Twitter)": "twitter",
    "TikTok": "tiktok",
    "YouTube": "youtube",
  }
  
  // Try exact match first
  if (mapping[platformName]) {
    return mapping[platformName]
  }
  
  // Fallback: convert to lowercase and remove special characters
  return platformName.toLowerCase().replace(/[^a-z0-9]/g, "")
}

/**
 * Get placeholder text for a platform
 */
const getPlatformPlaceholder = (platformName: string): string => {
  const placeholderMap: Record<string, string> = {
    "Instagram": "@username or https://instagram.com/...",
    "Facebook": "@username or https://facebook.com/...",
    "X(Twitter)": "@username or https://x.com/...",
    "X (Twitter)": "@username or https://x.com/...",
    "TikTok": "@username or https://tiktok.com/@...",
    "YouTube": "@username or https://youtube.com/@...",
  }
  
  return placeholderMap[platformName] || "Enter username or URL"
}

interface SocialMediaFormProps {
  isMobile?: boolean
}

export function SocialMediaForm({ isMobile = false }: SocialMediaFormProps) {
  const { control } = useFormContext<SocialMediaFormData>()
  const { data: platformsData, isLoading: isLoadingPlatforms } = useSupportedPlatforms()
  const platforms = platformsData?.data || []
  
  const suffix = isMobile ? "-mobile" : ""
  const inputClass = isMobile
    ? "rounded-full border-gray-200 h-14 px-5 dark:bg-[#0E0E0E] dark:text-white dark:border-gray-700"
    : "rounded-lg border-gray-200 dark:bg-[#0E0E0E] dark:text-white dark:border-gray-700"

  // Map API platforms to form format
  const socialPlatforms = platforms.map((platform) => ({
    id: mapPlatformNameToField(platform.name),
    label: platform.name,
    fieldKey: `social_${mapPlatformNameToField(platform.name)}` as keyof SocialMediaFormData,
  }))

  if (isLoadingPlatforms) {
    return (
      <div className="flex items-center justify-center py-8">
        <p className="text-muted-foreground">Loading platforms...</p>
      </div>
    )
  }

  if (platforms.length === 0) {
    return (
      <div className="flex items-center justify-center py-8">
        <p className="text-muted-foreground">No platforms available</p>
      </div>
    )
  }

  return (
    <div className={isMobile ? "space-y-4" : "grid gap-4 md:grid-cols-2"}>
      {socialPlatforms.map((platform) => (
        <FormField
          key={platform.id}
          control={control}
          name={platform.fieldKey}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-700 dark:text-[#A9A9A9]">
                {platform.label} <span className="text-xs text-gray-500">(@username or URL)</span>
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  id={`${platform.id}${suffix}`}
                  type="text"
                  placeholder={getPlatformPlaceholder(platform.label)}
                  className={inputClass}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      ))}
    </div>
  )
}
