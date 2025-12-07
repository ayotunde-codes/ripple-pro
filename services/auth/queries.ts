import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { authApi } from "./api"
import {
  RegisterRequest,
  LoginRequest,
  VerifyEmailRequest,
  ResendCodeRequest,
  ForgotPasswordRequest,
  ResetPasswordRequest,
} from "./types"

/**
 * React Query hooks for authentication
 */

// Query keys
export const authKeys = {
  all: ["auth"] as const,
  user: () => [...authKeys.all, "user"] as const,
  token: () => [...authKeys.all, "token"] as const,
}

/**
 * Register mutation
 * Usage: const { mutate, isLoading, error } = useRegister()
 */
export const useRegister = () => {
  const router = useRouter()

  return useMutation({
    mutationFn: (data: RegisterRequest) => authApi.register(data),
    onSuccess: (response) => {
      // Redirect to verify email page
      if (response.success) {
        router.push(`/verify-email?email=${encodeURIComponent(response.data.email)}`)
      }
    },
    onError: (error: any) => {
      console.error("Registration failed:", error)
    },
  })
}

/**
 * Login mutation
 * Usage: const { mutate, isLoading, error } = useLogin()
 */
export const useLogin = () => {
  const router = useRouter()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: LoginRequest) => authApi.login(data),
    onSuccess: (response) => {
      if (response.success) {
        // Invalidate user queries to refetch
        queryClient.invalidateQueries({ queryKey: authKeys.user() })
        
        // Redirect to dashboard
        router.push("/dashboard")
      }
    },
    onError: (error: any) => {
      console.error("Login failed:", error)
    },
  })
}

/**
 * Verify email mutation
 * Usage: const { mutate, isLoading, error } = useVerifyEmail()
 */
export const useVerifyEmail = () => {
  const router = useRouter()

  return useMutation({
    mutationFn: (data: VerifyEmailRequest) => authApi.verifyEmail(data),
    onSuccess: (response) => {
      if (response.success) {
        // Redirect to login page
        router.push("/login")
      }
    },
    onError: (error: any) => {
      console.error("Email verification failed:", error)
    },
  })
}

/**
 * Resend verification code mutation
 * Usage: const { mutate, isLoading, error } = useResendCode()
 */
export const useResendCode = () => {
  return useMutation({
    mutationFn: (data: ResendCodeRequest) => authApi.resendCode(data),
    onSuccess: (response) => {
      console.log("Verification code resent:", response.message)
    },
    onError: (error: any) => {
      console.error("Failed to resend code:", error)
    },
  })
}

/**
 * Forgot password mutation
 * Usage: const { mutate, isLoading, error } = useForgotPassword()
 */
export const useForgotPassword = () => {
  const router = useRouter()

  return useMutation({
    mutationFn: (data: ForgotPasswordRequest) => authApi.forgotPassword(data),
    onSuccess: (response) => {
      if (response.success) {
        // Redirect to check email page or show success message
        console.log("Password reset email sent:", response.message)
      }
    },
    onError: (error: any) => {
      console.error("Failed to send reset email:", error)
    },
  })
}

/**
 * Reset password mutation
 * Usage: const { mutate, isLoading, error } = useResetPassword()
 */
export const useResetPassword = () => {
  const router = useRouter()

  return useMutation({
    mutationFn: (data: ResetPasswordRequest) => authApi.resetPassword(data),
    onSuccess: (response) => {
      if (response.success) {
        // Redirect to login
        router.push("/login")
      }
    },
    onError: (error: any) => {
      console.error("Password reset failed:", error)
    },
  })
}

/**
 * Logout mutation
 * Usage: const { mutate, isLoading, error } = useLogout()
 */
export const useLogout = () => {
  const router = useRouter()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: () => authApi.logout(),
    onSuccess: () => {
      // Clear all queries
      queryClient.clear()
      
      // Redirect to login
      router.push("/login")
    },
    onError: (error: any) => {
      console.error("Logout failed:", error)
      
      // Even if API call fails, clear local data and redirect
      localStorage.removeItem("access_token")
      localStorage.removeItem("user")
      queryClient.clear()
      router.push("/login")
    },
  })
}

/**
 * Get current user query
 * Usage: const { data: user, isLoading } = useCurrentUser()
 */
export const useCurrentUser = () => {
  return useQuery({
    queryKey: authKeys.user(),
    queryFn: () => authApi.getCurrentUser(),
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 10, // 10 minutes (formerly cacheTime)
  })
}

/**
 * Check authentication status
 * Usage: const { data: isAuthenticated, isLoading } = useIsAuthenticated()
 */
export const useIsAuthenticated = () => {
  return useQuery({
    queryKey: authKeys.token(),
    queryFn: () => authApi.isAuthenticated(),
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 10, // 10 minutes
  })
}

