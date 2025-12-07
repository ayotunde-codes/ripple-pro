import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ProfileData, countries, contentTypes, categories } from "./profile-data"

interface PersonalInfoFormProps {
  profileData: ProfileData
  isMobile?: boolean
  onChange?: (field: keyof ProfileData, value: string) => void
}

export function PersonalInfoForm({ profileData, isMobile = false, onChange }: PersonalInfoFormProps) {
  const suffix = isMobile ? "-mobile" : ""
  const inputClass = isMobile
    ? "rounded-full border-gray-200 h-14 px-5 bg-gray-50 dark:bg-[#0E0E0E] dark:text-white dark:border-gray-700"
    : "rounded-lg border-gray-200 bg-gray-50 dark:bg-[#0E0E0E] dark:text-white dark:border-gray-700"

  return (
    <div className={isMobile ? "space-y-4" : "grid gap-4 md:grid-cols-2"}>
      <div className="space-y-2">
        <Label htmlFor={`firstName${suffix}`} className="text-gray-700 dark:text-[#A9A9A9]">
          First Name
        </Label>
        <Input
          id={`firstName${suffix}`}
          value={profileData.firstName}
          onChange={(e) => onChange?.("firstName", e.target.value)}
          placeholder="Enter first name"
          className={inputClass}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor={`middleName${suffix}`} className="text-gray-700 dark:text-[#A9A9A9]">
          Middle Name (Optional)
        </Label>
        <Input
          id={`middleName${suffix}`}
          value={profileData.middleName}
          onChange={(e) => onChange?.("middleName", e.target.value)}
          placeholder="Enter middle name"
          className={inputClass}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor={`lastName${suffix}`} className="text-gray-700 dark:text-[#A9A9A9]">
          Last Name
        </Label>
        <Input
          id={`lastName${suffix}`}
          value={profileData.lastName}
          onChange={(e) => onChange?.("lastName", e.target.value)}
          placeholder="Enter last name"
          className={inputClass}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor={`email${suffix}`} className="text-gray-700 dark:text-[#A9A9A9]">
          Email
        </Label>
        <Input
          id={`email${suffix}`}
          value={profileData.email}
          readOnly
          placeholder="Enter email"
          className={inputClass}
          title="Email cannot be changed"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor={`contentType${suffix}`} className="text-gray-700 dark:text-[#A9A9A9]">
          Content type
        </Label>
        <Select 
          value={profileData.contentType}
          onValueChange={(value) => onChange?.("contentType", value)}
        >
          <SelectTrigger id={`contentType${suffix}`} className={inputClass}>
            <SelectValue placeholder="Select content type" />
          </SelectTrigger>
          <SelectContent>
            {contentTypes.map((type) => (
              <SelectItem key={type.value} value={type.value}>
                {type.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor={`category${suffix}`} className="text-gray-700 dark:text-[#A9A9A9]">
          Category
        </Label>
        <Select 
          value={profileData.category}
          onValueChange={(value) => onChange?.("category", value)}
        >
          <SelectTrigger id={`category${suffix}`} className={inputClass}>
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category.value} value={category.value}>
                {category.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}

