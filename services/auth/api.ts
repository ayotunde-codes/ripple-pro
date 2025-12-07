import apiClient from "../core/apiClient"
import {
  ApiResponse,
  User,
  RegisterRequest,
  RegisterResponse,
  LoginRequest,
  LoginResponse,
  VerifyEmailRequest,
  ResendCodeRequest,
  ForgotPasswordRequest,
  ResetPasswordRequest,
} from "./types"

/**
 * Auth API Service
 * All authentication-related API calls
 */
export const authApi = {
  /**
   * Register a new user (brand or creator)
   * POST /auth/register
   */
  register: async (data: RegisterRequest): Promise<ApiResponse<RegisterResponse>> => {
    const response = await apiClient.post<ApiResponse<RegisterResponse>>(
      "/auth/register",
      data
    )
    return response.data
  },

  /**
   * Login user
   * POST /auth/login
   */
  login: async (data: LoginRequest): Promise<ApiResponse<LoginResponse>> => {
    const response = await apiClient.post<ApiResponse<LoginResponse>>(
      "/auth/login",
      data
    )
    
    // Store token and user in localStorage
    if (response.data.success && response.data.data) {
      localStorage.setItem("access_token", response.data.data.access_token)
      localStorage.setItem("user", JSON.stringify(response.data.data.user))
    }
    
    return response.data
  },

  /**
   * Verify email with code
   * POST /auth/verify-email
   */
  verifyEmail: async (data: VerifyEmailRequest): Promise<ApiResponse<any>> => {
    const response = await apiClient.post<ApiResponse<any>>(
      "/auth/verify-email",
      data
    )
    return response.data
  },

  /**
   * Resend verification code
   * POST /auth/resend-code
   */
  resendCode: async (data: ResendCodeRequest): Promise<ApiResponse<any>> => {
    const response = await apiClient.post<ApiResponse<any>>(
      "/auth/resend-code",
      data
    )
    return response.data
  },

  /**
   * Request password reset
   * POST /auth/forgot-password
   */
  forgotPassword: async (data: ForgotPasswordRequest): Promise<ApiResponse<any>> => {
    const response = await apiClient.post<ApiResponse<any>>(
      "/auth/forgot-password",
      data
    )
    return response.data
  },

  /**
   * Reset password with token
   * POST /auth/reset-password
   */
  resetPassword: async (data: ResetPasswordRequest): Promise<ApiResponse<any>> => {
    const response = await apiClient.post<ApiResponse<any>>(
      "/auth/reset-password",
      data
    )
    return response.data
  },

  /**
   * Logout user
   * POST /auth/logout
   */
  logout: async (): Promise<ApiResponse<any>> => {
    const response = await apiClient.post<ApiResponse<any>>("/auth/logout")
    
    // Clear localStorage
    localStorage.removeItem("access_token")
    localStorage.removeItem("user")
    
    return response.data
  },

  /**
   * Get current user from localStorage
   * This is a helper function, not an API call
   * Note: For SSR safety, this returns null on server
   */
  getCurrentUser: () => {
    if (typeof window === "undefined") return null
    
    const userStr = localStorage.getItem("user")
    if (!userStr) return null
    
    try {
      return JSON.parse(userStr)
    } catch {
      return null
    }
  },

  /**
   * Update stored user data in localStorage
   * Call this after profile updates to keep user data in sync
   */
  updateStoredUser: (userData: Partial<User>) => {
    if (typeof window === "undefined") return
    
    const currentUser = authApi.getCurrentUser()
    if (currentUser) {
      const updatedUser = { ...currentUser, ...userData }
      localStorage.setItem("user", JSON.stringify(updatedUser))
    }
  },

  /**
   * Get current token from localStorage
   * This is a helper function, not an API call
   */
  getToken: () => {
    if (typeof window === "undefined") return null
    return localStorage.getItem("access_token")
  },

  /**
   * Check if user is authenticated
   * This is a helper function, not an API call
   */
  isAuthenticated: () => {
    return !!authApi.getToken()
  },
}

