// Base API Response structure
export interface ApiResponse<T = any> {
  success: boolean
  message: string
  data: T
}

// Country
export interface Country {
  id: number
  name: string
  code: string
}

// Bank
export interface Bank {
  code: string
  name: string
}

// Bank Details
export interface BankDetails {
  account_name: string
  account_number: string
  bank: Bank
}

// Profile Document
export interface ProfileDocument {
  id: number
  type: "nin" | "address"
  url: string
  created_at: string
}

// Profile Data
export interface ProfileData {
  dob: string | null
  phone_number: string | null
  bvn: string | null
  country: Country | null
  bankDetails: BankDetails | null
  user: {
    id: number
    first_name: string
    last_name: string
    email: string
    role: string
    status: string
    kyc_status: string
    is_email_verified: boolean
    rejection_reason: string | null
    created_at: string
    updated_at: string
  }
  documents?: ProfileDocument[]
}

// Update Personal Info Request
export interface UpdatePersonalInfoRequest {
  first_name: string
  middle_name?: string
  last_name: string
  phone_number: string
  dob: string // YYYY-MM-DD
  country_id: number
}

// Update BVN Request
export interface UpdateBVNRequest {
  bvn: string
}

// Update Account Details Request
export interface UpdateAccountRequest {
  account_name: string
  account_number: string
  bank_code: string
}

// Upload Documents Request (FormData)
export interface UploadDocumentsRequest {
  nin: string
  id_file: File
  address_file: File
}

// KYC Status Response
export interface KYCSubmission {
  dob: string
  phone_number: string
  bvn: string
  country: Country
  bankDetails: BankDetails
  user: {
    id: number
    first_name: string
    last_name: string
    email: string
    role: string
    status: string
    kyc_status: "pending" | "approved" | "rejected"
    is_email_verified: boolean
    rejection_reason: string | null
    created_at: string
    updated_at: string
  }
  documents: ProfileDocument[]
}

// Reject KYC Request (Admin)
export interface RejectKYCRequest {
  user_id: number
  reason: string
}

