import { z } from "zod"

export const signupSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  accountType: z.enum(["brand", "creator"]),
  companyName: z.string().optional(),
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string(),
  agreeTerms: z.boolean().refine((val) => val === true, {
    message: "You must agree to the terms and conditions",
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
}).refine((data) => {
  if (data.accountType === "brand" && !data.companyName?.trim()) {
    return false
  }
  return true
}, {
  message: "Company name is required for brands",
  path: ["companyName"],
})

export type SignupFormData = z.infer<typeof signupSchema>

