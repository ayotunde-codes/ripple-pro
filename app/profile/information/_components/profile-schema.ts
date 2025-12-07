import { z } from "zod"

// Personal Info Schema
export const personalInfoSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  middleName: z.string().optional(),
  lastName: z.string().min(1, "Last name is required"),
  phoneNumber: z.string().min(10, "Phone number must be at least 10 digits"),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  country: z.string().min(1, "Country is required"),
})

export type PersonalInfoFormData = z.infer<typeof personalInfoSchema>

// Bank Info Schema
export const bankInfoSchema = z.object({
  bvn: z.string().length(11, "BVN must be 11 digits"),
  bankCode: z.string().min(1, "Bank is required"),
  accountNumber: z.string().length(10, "Account number must be 10 digits"),
  accountName: z.string().min(1, "Account name is required"),
})

export type BankInfoFormData = z.infer<typeof bankInfoSchema>

// Social Media Schema (optional fields)
export const socialMediaSchema = z.object({
  instagram: z.string().optional(),
  facebook: z.string().optional(),
  twitter: z.string().optional(),
  tiktok: z.string().optional(),
  youtube: z.string().optional(),
})

export type SocialMediaFormData = z.infer<typeof socialMediaSchema>

