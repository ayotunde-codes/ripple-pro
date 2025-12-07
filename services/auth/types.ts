// Base API Response structure
export interface ApiResponse<T = any> {
  success: boolean
  message: string
  data: T
}

// User roles
export type UserRole = "brand" | "creator"

// User status
export type UserStatus = "active" | "inactive"

// KYC status
export type KYCStatus = "pending" | "approved" | "rejected"

// User object
export interface User {
  id?: number
  first_name: string
  last_name: string
  email: string
  role: UserRole
  status: UserStatus
  is_email_verified: boolean
  kyc_status?: KYCStatus
  rejection_reason?: string | null
  created_at?: string
  updated_at?: string
}

// Register request
export interface RegisterRequest {
  first_name: string
  last_name: string
  email: string
  role: UserRole
  company_name?: string // Required for brands
  password: string
  password_confirmation: string
}

// Register response
export interface RegisterResponse {
  first_name: string
  last_name: string
  email: string
  role: UserRole
  status: UserStatus
  is_email_verified: boolean
  created_at: string
  updated_at: string
}

// Login request
export interface LoginRequest {
  email: string
  password: string
}

// Login response
export interface LoginResponse {
  message: string
  access_token: string
  token_type: string
  user: User
}

// Verify email request
export interface VerifyEmailRequest {
  email: string
  code: string
}

// Resend code request
export interface ResendCodeRequest {
  email: string
}

// Forgot password request
export interface ForgotPasswordRequest {
  email: string
}

// Reset password request
export interface ResetPasswordRequest {
  email: string
  token: string
  password: string
  password_confirmation: string
}

// Auth state for context/store
export interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  isLoading: boolean
}

