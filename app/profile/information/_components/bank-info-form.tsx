import { useFormContext } from "react-hook-form"
import { useMemo } from "react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { useBanks } from "@/services/profile"
import { BankAccountFormData } from "./profile-schemas"

interface BankInfoFormProps {
  isMobile?: boolean
}

export function BankInfoForm({ isMobile = false }: BankInfoFormProps) {
  const { control } = useFormContext<BankAccountFormData>()
  const { data: banksData, isLoading: isLoadingBanks } = useBanks()
  
  // Memoize banks array to prevent unnecessary re-renders
  const banks = useMemo(() => banksData?.data || [], [banksData?.data])
  
  // Create a lookup map for O(1) bank name retrieval instead of O(n) find
  const bankNameMap = useMemo(() => {
    const map = new Map<string, string>()
    banks.forEach(bank => {
      map.set(bank.code, bank.name)
    })
    return map
  }, [banks])
  
  const suffix = isMobile ? "-mobile" : ""
  const inputClass = useMemo(() => isMobile
    ? "rounded-full border-gray-200 h-14 px-5 bg-gray-50 dark:bg-[#0E0E0E] dark:text-white dark:border-gray-700"
    : "rounded-lg border-gray-200 bg-gray-50 dark:bg-[#0E0E0E] dark:text-white dark:border-gray-700", [isMobile])

  return (
    <div className={isMobile ? "space-y-4" : "grid gap-4 md:grid-cols-2"}>
      <FormField
        control={control}
        name="bankCode"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-gray-700 dark:text-[#A9A9A9]">
              Bank
            </FormLabel>
            <Select 
              value={field.value || ""}
              onValueChange={field.onChange}
              disabled={isLoadingBanks}
            >
              <FormControl>
                <SelectTrigger id={`bankCode${suffix}`} className={inputClass}>
                  <SelectValue placeholder={isLoadingBanks ? "Loading banks..." : "Select bank"}>
                    {field.value ? bankNameMap.get(field.value) || "Select bank" : "Select bank"}
                  </SelectValue>
                </SelectTrigger>
              </FormControl>
              <SelectContent className="max-h-[300px] overflow-y-auto">
                {banks.map((bank, index) => (
                  <SelectItem key={index} value={bank.code}>
                    {bank.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="accountNumber"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-gray-700 dark:text-[#A9A9A9]">
              Account Number
            </FormLabel>
            <FormControl>
              <Input
                {...field}
                id={`accountNumber${suffix}`}
                maxLength={10}
                placeholder="Enter 10-digit account number"
                className={inputClass}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="accountName"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-gray-700 dark:text-[#A9A9A9]">
              Account Name
            </FormLabel>
            <FormControl>
              <Input
                {...field}
                id={`accountName${suffix}`}
                placeholder="Enter account name"
                className={inputClass}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  )
}

