import axios, { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from "axios"

// API Configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://ripple-pro.onrender.com/api/v1"
const API_TIMEOUT = 30000 // 30 seconds

// Create axios instance
const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: API_TIMEOUT,
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
  },
})

// Request interceptor - Add auth token to requests
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Get token from localStorage
    const token = localStorage.getItem("access_token")
    
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  (error: AxiosError) => {
    return Promise.reject(error)
  }
)

// Response interceptor - Handle common errors
apiClient.interceptors.response.use(
  (response: any) => {
    // Return the data directly for successful responses
    return response
  },
  (error: AxiosError) => {
    // Handle specific error cases
    if (error.response) {
      const status = error.response.status

      switch (status) {
        case 401:
          // Unauthorized - Token expired or invalid
          localStorage.removeItem("access_token")
          localStorage.removeItem("user")
          
          // Redirect to login if not already there
          if (typeof window !== "undefined" && window.location.pathname !== "/login") {
            window.location.href = "/login"
          }
          break

        case 403:
          // Forbidden - User doesn't have permission
          console.error("Access forbidden:", error.response.data)
          break

        case 404:
          // Not found
          console.error("Resource not found:", error.response.data)
          break

        case 422:
          // Validation error
          console.error("Validation error:", error.response.data)
          break

        case 500:
        case 502:
        case 503:
        case 504:
          // Server errors
          console.error("Server error:", error.response.data)
          break

        default:
          console.error("API error:", error.response.data)
      }
    } else if (error.request) {
      // Request was made but no response received
      console.error("No response from server:", error.request)
    } else {
      // Something else happened
      console.error("Error:", error.message)
    }

    return Promise.reject(error)
  }
)

export default apiClient

