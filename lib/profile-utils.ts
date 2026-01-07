/**
 * Profile completion utilities
 * Check if user profile is complete based on required fields
 */

import { User } from "@/services/auth/types"

/**
 * Check if user profile is complete
 * Profile is complete when user has: phone_number, dob, and country_id
 * 
 * Note: Since we don't have GET /profile endpoint, we check if these fields
 * exist in the user object or profile data from API responses
 */
export const isProfileComplete = (user: User | null | undefined, profileData?: any): boolean => {
  if (!user) return false

  // Check if profile data has required fields
  if (profileData) {
    return !!(
      profileData.phone_number &&
      profileData.dob &&
      profileData.country?.id
    )
  }

  // If we have profile data in user object (from login/update responses)
  // This is a fallback - ideally we'd have a dedicated profile endpoint
  // For now, we'll check if user has been through profile update flow
  // by checking if they have a profile (this is a workaround)
  
  // Since we can't reliably check without GET /profile endpoint,
  // we'll use a different approach: check localStorage or track completion
  // For now, return true if user exists (we'll improve this when GET /profile is available)
  
  return true // Temporary - will be improved when GET /profile endpoint is available
}

/**
 * Get missing profile fields
 */
export const getMissingProfileFields = (profileData: any): string[] => {
  const missing: string[] = []
  
  if (!profileData?.phone_number) missing.push("Phone Number")
  if (!profileData?.dob) missing.push("Date of Birth")
  if (!profileData?.country?.id) missing.push("Country")
  
  return missing
}

