import { Camera } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface ProfileAvatarProps {
  profileImage: string | null
  firstName: string
  lastName: string
  onImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void
  isMobile?: boolean
}

export function ProfileAvatar({ profileImage, firstName, lastName, onImageUpload, isMobile = false }: ProfileAvatarProps) {
  const inputId = isMobile ? "profile-image-mobile" : "profile-image"
  const avatarClass = isMobile ? "h-24 w-24 border-2 border-white shadow-md" : "h-24 w-24"
  const fallbackClass = isMobile
    ? "bg-white text-[#B125F9] text-2xl"
    : "bg-gradient-to-r from-[#E43EFC] to-[#B125F9] text-white text-2xl"
  const labelClass = isMobile
    ? "absolute bottom-0 right-0 bg-[#B125F9] text-white p-1.5 rounded-full cursor-pointer shadow-md"
    : "absolute bottom-0 right-0 bg-gradient-to-r from-[#E43EFC] to-[#B125F9] text-white p-1 rounded-full cursor-pointer"

  return (
    <div className={`flex flex-col items-center ${isMobile ? "mb-6" : "mb-6"}`}>
      <div className="relative">
        <Avatar className={avatarClass}>
          {profileImage ? (
            <AvatarImage src={profileImage} alt="Profile" />
          ) : (
            <AvatarFallback className={fallbackClass}>
              {firstName.charAt(0)}
              {lastName.charAt(0)}
            </AvatarFallback>
          )}
        </Avatar>
        <label htmlFor={inputId} className={labelClass}>
          <Camera className="h-4 w-4" />
        </label>
        <input id={inputId} type="file" accept="image/*" className="hidden" onChange={onImageUpload} />
      </div>
      {!isMobile && (
        <p className="text-sm text-muted-foreground mt-2 dark:text-[#A9A9A9]">
          Click the camera icon to upload a profile picture
        </p>
      )}
    </div>
  )
}

