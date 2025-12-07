import type { SignupFormData } from "./signup-schema"
import type { RegisterRequest } from "@/services/auth"

/**
 * Transform UI form data to API format
 * Maps frontend field names to backend field names
 */
export function transformSignupDataToAPI(formData: SignupFormData): RegisterRequest {
  return {
    first_name: formData.firstName,
    last_name: formData.lastName,
    email: formData.email,
    role: formData.accountType, // accountType → role
    company_name: formData.companyName || undefined, // companyName → company_name
    password: formData.password,
    password_confirmation: formData.confirmPassword, // confirmPassword → password_confirmation
  }
}

