import { memo } from "react"
import { useFormContext } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { PersonalInfoFormData } from "./profile-schemas"

interface Country {
  id: number
  name: string
}

interface PersonalInfoFormProps {
  isMobile?: boolean
  countries?: Country[]
  isLoadingCountries?: boolean
}

export const PersonalInfoForm = memo(function PersonalInfoForm({ 
  isMobile = false, 
  countries = [],
  isLoadingCountries = false,
}: PersonalInfoFormProps) {
  const { control } = useFormContext<PersonalInfoFormData>()
  
  const suffix = isMobile ? "-mobile" : ""
  const inputClass = isMobile
    ? "rounded-full border-gray-200 h-14 px-5 bg-gray-50 dark:bg-[#0E0E0E] dark:text-white dark:border-gray-700"
    : "rounded-lg border-gray-200 bg-gray-50 dark:bg-[#0E0E0E] dark:text-white dark:border-gray-700"

  return (
    <div className={isMobile ? "space-y-4" : "grid gap-4 md:grid-cols-2"}>
      <FormField
        control={control}
        name="firstName"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-gray-700 dark:text-[#A9A9A9]">
              First Name
            </FormLabel>
            <FormControl>
              <Input
                {...field}
                id={`firstName${suffix}`}
                placeholder="Enter first name"
                className={inputClass}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="middleName"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-gray-700 dark:text-[#A9A9A9]">
              Middle Name (Optional)
            </FormLabel>
            <FormControl>
              <Input
                {...field}
                id={`middleName${suffix}`}
                placeholder="Enter middle name"
                className={inputClass}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="lastName"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-gray-700 dark:text-[#A9A9A9]">
              Last Name
            </FormLabel>
            <FormControl>
              <Input
                {...field}
                id={`lastName${suffix}`}
                placeholder="Enter last name"
                className={inputClass}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-gray-700 dark:text-[#A9A9A9]">
              Email
            </FormLabel>
            <FormControl>
              <Input
                {...field}
                id={`email${suffix}`}
                readOnly
                placeholder="Enter email"
                className={inputClass}
                title="Email cannot be changed"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="phoneNumber"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-gray-700 dark:text-[#A9A9A9]">
              Phone Number <span className="text-red-500">*</span>
            </FormLabel>
            <FormControl>
              <Input
                {...field}
                id={`phoneNumber${suffix}`}
                type="tel"
                placeholder="Enter phone number"
                className={inputClass}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="dateOfBirth"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-gray-700 dark:text-[#A9A9A9]">
              Date of Birth <span className="text-red-500">*</span>
            </FormLabel>
            <FormControl>
              <Input
                {...field}
                id={`dateOfBirth${suffix}`}
                type="date"
                max={new Date().toISOString().split('T')[0]}
                className={inputClass}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="countryId"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-gray-700 dark:text-[#A9A9A9]">
              Country <span className="text-red-500">*</span>
            </FormLabel>
            <Select 
              value={field.value?.toString() || ""}
              onValueChange={(value) => field.onChange(Number(value))}
              disabled={isLoadingCountries}
            >
              <FormControl>
                <SelectTrigger id={`country${suffix}`} className={inputClass}>
                  <SelectValue placeholder={isLoadingCountries ? "Loading countries..." : "Select country"} />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {countries.map((country) => (
                  <SelectItem key={country.id} value={country.id.toString()}>
                    {country.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  )
})

