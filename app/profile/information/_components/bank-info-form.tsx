import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ProfileData, nigerianBanks } from "./profile-data"

interface BankInfoFormProps {
  profileData: ProfileData
  isMobile?: boolean
}

export function BankInfoForm({ profileData, isMobile = false }: BankInfoFormProps) {
  const suffix = isMobile ? "-mobile" : ""
  const inputClass = isMobile
    ? "rounded-full border-gray-200 h-14 px-5 bg-gray-50 dark:bg-[#0E0E0E] dark:text-white dark:border-gray-700"
    : "rounded-lg border-gray-200 bg-gray-50 dark:bg-[#0E0E0E] dark:text-white dark:border-gray-700"

  return (
    <div className={isMobile ? "space-y-4" : "grid gap-4 md:grid-cols-2"}>
      <div className="space-y-2">
        <Label htmlFor={`bvn${suffix}`} className="text-gray-700 dark:text-[#A9A9A9]">
          BVN
        </Label>
        <Input
          id={`bvn${suffix}`}
          value={profileData.bvn}
          readOnly
          className={inputClass}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor={`bankCode${suffix}`} className="text-gray-700 dark:text-[#A9A9A9]">
          Bank
        </Label>
        <Select value={profileData.bankCode} disabled>
          <SelectTrigger id={`bankCode${suffix}`} className={inputClass}>
            <SelectValue placeholder="Select bank" />
          </SelectTrigger>
          <SelectContent>
            {nigerianBanks.map((bank) => (
              <SelectItem key={bank.code} value={bank.code}>
                {bank.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor={`accountNumber${suffix}`} className="text-gray-700 dark:text-[#A9A9A9]">
          Account Number
        </Label>
        <Input
          id={`accountNumber${suffix}`}
          value={profileData.accountNumber}
          readOnly
          maxLength={10}
          className={inputClass}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor={`accountName${suffix}`} className="text-gray-700 dark:text-[#A9A9A9]">
          Account Name
        </Label>
        <Input
          id={`accountName${suffix}`}
          value={profileData.accountName}
          readOnly
          className={inputClass}
        />
      </div>
    </div>
  )
}

