import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { profileApi } from "./api"
import {
  UpdatePersonalInfoRequest,
  UpdateBVNRequest,
  UpdateAccountRequest,
  UploadDocumentsRequest,
  RejectKYCRequest,
} from "./types"

/**
 * React Query hooks for profile and KYC management
 */

// Query keys
export const profileKeys = {
  all: ["profile"] as const,
  kyc: () => [...profileKeys.all, "kyc"] as const,
  kycSubmissions: () => [...profileKeys.all, "kyc", "submissions"] as const,
}

/**
 * Update personal information mutation
 */
export const useUpdatePersonalInfo = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: UpdatePersonalInfoRequest) =>
      profileApi.updatePersonalInfo(data),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: profileKeys.all })
      console.log("Profile updated:", response.message)
    },
    onError: (error: any) => {
      console.error("Failed to update profile:", error)
    },
  })
}

/**
 * Update BVN mutation
 */
export const useUpdateBVN = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: UpdateBVNRequest) => profileApi.updateBVN(data),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: profileKeys.all })
      console.log("BVN updated:", response.message)
    },
    onError: (error: any) => {
      console.error("Failed to update BVN:", error)
    },
  })
}

/**
 * Update account details mutation
 */
export const useUpdateAccount = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: UpdateAccountRequest) => profileApi.updateAccount(data),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: profileKeys.all })
      console.log("Account details updated:", response.message)
    },
    onError: (error: any) => {
      console.error("Failed to update account:", error)
    },
  })
}

/**
 * Upload KYC documents mutation
 */
export const useUploadDocuments = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: UploadDocumentsRequest) =>
      profileApi.uploadDocuments(data),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: profileKeys.all })
      console.log("Documents uploaded:", response.message)
    },
    onError: (error: any) => {
      console.error("Failed to upload documents:", error)
    },
  })
}

/**
 * Submit KYC for approval mutation
 */
export const useSubmitKYC = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: () => profileApi.submitKYC(),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: profileKeys.kyc() })
      console.log("KYC submitted:", response.message)
    },
    onError: (error: any) => {
      console.error("Failed to submit KYC:", error)
    },
  })
}

/**
 * Approve KYC mutation (Admin only)
 */
export const useApproveKYC = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (userId: number) => profileApi.approveKYC(userId),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: profileKeys.kycSubmissions() })
      console.log("KYC approved:", response.message)
    },
    onError: (error: any) => {
      console.error("Failed to approve KYC:", error)
    },
  })
}

/**
 * Reject KYC mutation (Admin only)
 */
export const useRejectKYC = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: RejectKYCRequest) => profileApi.rejectKYC(data),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: profileKeys.kycSubmissions() })
      console.log("KYC rejected:", response.message)
    },
    onError: (error: any) => {
      console.error("Failed to reject KYC:", error)
    },
  })
}

/**
 * Get KYC submissions query (Admin only)
 */
export const useKYCSubmissions = () => {
  return useQuery({
    queryKey: profileKeys.kycSubmissions(),
    queryFn: () => profileApi.getKYCSubmissions(),
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 10, // 10 minutes
  })
}

