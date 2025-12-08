import { create } from 'zustand'

interface DashboardStats {
  walletBalance: number
  totalEarnings: number
  activeChallenges: number
  totalViews: number
}

interface DashboardStore {
  // Stats
  stats: DashboardStats
  setStats: (stats: DashboardStats) => void

  // Recent Challenges
  recentChallenges: any[]
  setRecentChallenges: (challenges: any[]) => void

  // Virtual Account
  virtualAccount: any
  setVirtualAccount: (account: any) => void

  // Loading States
  isLoading: boolean
  setIsLoading: (loading: boolean) => void

  // Mobile View
  isMobileView: boolean
  setIsMobileView: (isMobile: boolean) => void

  // Banner
  showBanner: boolean
  setShowBanner: (show: boolean) => void
  dismissBanner: () => void

  // Reset
  reset: () => void
}

const defaultStats: DashboardStats = {
  walletBalance: 0,
  totalEarnings: 0,
  activeChallenges: 0,
  totalViews: 0,
}

export const useDashboardStore = create<DashboardStore>((set) => ({
  // Stats
  stats: defaultStats,
  setStats: (stats) => set({ stats }),

  // Recent Challenges
  recentChallenges: [],
  setRecentChallenges: (challenges) => set({ recentChallenges: challenges }),

  // Virtual Account
  virtualAccount: null,
  setVirtualAccount: (account) => set({ virtualAccount: account }),

  // Loading States
  isLoading: false,
  setIsLoading: (loading) => set({ isLoading: loading }),

  // Mobile View
  isMobileView: false,
  setIsMobileView: (isMobile) => set({ isMobileView: isMobile }),

  // Banner
  showBanner: false,
  setShowBanner: (show) => set({ showBanner: show }),
  dismissBanner: () => set({ showBanner: false }),

  // Reset
  reset: () => set({
    stats: defaultStats,
    recentChallenges: [],
    virtualAccount: null,
    isLoading: false,
    showBanner: false,
  }),
}))

