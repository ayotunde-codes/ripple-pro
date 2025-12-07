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
  detail: () => [...profileKeys.all, "detail"] as const,
  kyc: () => [...profileKeys.all, "kyc"] as const,
  kycSubmissions: () => [...profileKeys.all, "kyc", "submissions"] as const,
}

/**
 * Get profile data query
 * Note: API doesn't have GET /profile endpoint yet
 * This is a placeholder that returns null for now
 * TODO: Implement once backend adds GET /profile endpoint
 */
export const useProfile = () => {
  return useQuery({
    queryKey: profileKeys.detail(),
    queryFn: async () => {
      // TODO: Replace with actual API call when endpoint is available
      // return profileApi.getProfile()
      return null
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 10, // 10 minutes
    enabled: false, // Disabled until endpoint is available
  })
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
      // Invalidate profile and auth queries to refetch
      queryClient.invalidateQueries({ queryKey: profileKeys.all })
      queryClient.invalidateQueries({ queryKey: ["auth", "user"] })
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
    },
    onError: (error: any) => {
      console.error("Failed to update account:", error)
    },
  })
}

/**
 * Combined update for bank info (BVN + Account)
 * Updates both BVN and account details
 */
export const useUpdateBankInfo = () => {
  const queryClient = useQueryClient()
  const updateBVN = useUpdateBVN()
  const updateAccount = useUpdateAccount()

  return useMutation({
    mutationFn: async ({
      bvn,
      account,
    }: {
      bvn: string
      account: UpdateAccountRequest
    }) => {
      // Update BVN first
      await profileApi.updateBVN({ bvn })
      // Then update account details
      const accountResponse = await profileApi.updateAccount(account)
      return accountResponse
    },
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: profileKeys.all })
    },
    onError: (error: any) => {
      console.error("Failed to update bank info:", error)
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

