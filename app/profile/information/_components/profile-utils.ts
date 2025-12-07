import type { PersonalInfoFormData, BankInfoFormData } from "./profile-schema"
import type { UpdatePersonalInfoRequest, UpdateAccountRequest } from "@/services/profile"
import type { ProfileData } from "./profile-data"
import type { countries } from "./profile-data"

/**
 * Transform UI form data to API format for personal info
 */
export function transformPersonalInfoToAPI(
  formData: PersonalInfoFormData
): UpdatePersonalInfoRequest {
  // Find country ID by code
  const countryId = 1 // Default - in real app, map country code to ID
  
  return {
    first_name: formData.firstName,
    middle_name: formData.middleName,
    last_name: formData.lastName,
    phone_number: formData.phoneNumber,
    dob: formData.dateOfBirth,
    country_id: countryId,
  }
}

/**
 * Transform UI form data to API format for bank info
 */
export function transformBankInfoToAPI(
  formData: BankInfoFormData
): { account: UpdateAccountRequest; bvn: string } {
  return {
    account: {
      account_name: formData.accountName,
      account_number: formData.accountNumber,
      bank_code: formData.bankCode,
    },
    bvn: formData.bvn,
  }
}

/**
 * Transform API profile data to UI format
 */
export function transformAPIToProfileData(apiData: any): Partial<ProfileData> {
  return {
    firstName: apiData?.user?.first_name || "",
    middleName: "", // API doesn't return middle name in user object
    lastName: apiData?.user?.last_name || "",
    email: apiData?.user?.email || "",
    country: apiData?.country?.code || "",
    dateOfBirth: apiData?.dob?.split(" ")[0] || "", // "1987-09-09 00:00:00" → "1987-09-09"
    bvn: apiData?.bvn || "",
    bankCode: apiData?.bankDetails?.bank?.code || "",
    accountNumber: apiData?.bankDetails?.account_number || "",
    accountName: apiData?.bankDetails?.account_name || "",
  }
}

