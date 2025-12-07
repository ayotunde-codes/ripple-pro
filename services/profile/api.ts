import apiClient from "../core/apiClient"
import {
  ApiResponse,
  ProfileData,
  UpdatePersonalInfoRequest,
  UpdateBVNRequest,
  UpdateAccountRequest,
  UploadDocumentsRequest,
  KYCSubmission,
  RejectKYCRequest,
} from "./types"

/**
 * Profile API Service
 * All profile and KYC-related API calls
 */
export const profileApi = {
  /**
   * Update personal information
   * PUT /profile/personal
   */
  updatePersonalInfo: async (
    data: UpdatePersonalInfoRequest
  ): Promise<ApiResponse<ProfileData>> => {
    const response = await apiClient.put<ApiResponse<ProfileData>>(
      "/profile/personal",
      data
    )
    return response.data
  },

  /**
   * Update BVN
   * PUT /profile/bvn
   */
  updateBVN: async (data: UpdateBVNRequest): Promise<ApiResponse<ProfileData>> => {
    const response = await apiClient.put<ApiResponse<ProfileData>>(
      "/profile/bvn",
      data
    )
    return response.data
  },

  /**
   * Update account details (bank info)
   * PUT /profile/account
   */
  updateAccount: async (
    data: UpdateAccountRequest
  ): Promise<ApiResponse<ProfileData>> => {
    const response = await apiClient.put<ApiResponse<ProfileData>>(
      "/profile/account",
      data
    )
    return response.data
  },

  /**
   * Upload KYC documents
   * POST /profile/upload
   */
  uploadDocuments: async (
    data: UploadDocumentsRequest
  ): Promise<ApiResponse<ProfileData>> => {
    const formData = new FormData()
    formData.append("nin", data.nin)
    formData.append("id_file", data.id_file)
    formData.append("address_file", data.address_file)

    const response = await apiClient.post<ApiResponse<ProfileData>>(
      "/profile/upload",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    )
    return response.data
  },

  /**
   * Submit KYC for approval
   * GET /kyc/submit
   */
  submitKYC: async (): Promise<ApiResponse<any>> => {
    const response = await apiClient.get<ApiResponse<any>>("/kyc/submit")
    return response.data
  },

  /**
   * Approve KYC (Admin only)
   * GET /kyc/approve/:userId
   */
  approveKYC: async (userId: number): Promise<ApiResponse<any>> => {
    const response = await apiClient.get<ApiResponse<any>>(
      `/kyc/approve/${userId}`
    )
    return response.data
  },

  /**
   * Reject KYC (Admin only)
   * POST /kyc/reject
   */
  rejectKYC: async (data: RejectKYCRequest): Promise<ApiResponse<any>> => {
    const response = await apiClient.post<ApiResponse<any>>("/kyc/reject", data)
    return response.data
  },

  /**
   * View KYC submissions (Admin only)
   * GET /kyc/submissions
   */
  getKYCSubmissions: async (): Promise<ApiResponse<KYCSubmission[]>> => {
    const response = await apiClient.get<ApiResponse<KYCSubmission[]>>(
      "/kyc/submissions"
    )
    return response.data
  },
}

