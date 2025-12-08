import { create } from 'zustand'
import type { Campaign, CampaignSummary } from '@/services/campaign'

interface CampaignStore {
  // Data
  campaigns: Campaign[]
  setCampaigns: (campaigns: Campaign[]) => void

  summary: CampaignSummary | undefined
  setSummary: (summary: CampaignSummary | undefined) => void

  // Loading States
  isLoadingCampaigns: boolean
  setIsLoadingCampaigns: (loading: boolean) => void

  isLoadingSummary: boolean
  setIsLoadingSummary: (loading: boolean) => void

  isClosing: boolean
  setIsClosing: (closing: boolean) => void

  // Filters & Search
  searchQuery: string
  setSearchQuery: (query: string) => void

  statusFilter: "open" | "closed" | undefined
  setStatusFilter: (filter: "open" | "closed" | undefined) => void

  // UI States
  isMobile: boolean
  setIsMobile: (isMobile: boolean) => void

  // Close Challenge Modal
  showCloseConfirmation: boolean
  selectedChallenge: Campaign | null
  openCloseConfirmation: (challenge: Campaign) => void
  closeCloseConfirmation: () => void

  // Reset
  reset: () => void
}

export const useCampaignStore = create<CampaignStore>((set) => ({
  // Data
  campaigns: [],
  setCampaigns: (campaigns) => set({ campaigns }),

  summary: undefined,
  setSummary: (summary) => set({ summary }),

  // Loading States
  isLoadingCampaigns: false,
  setIsLoadingCampaigns: (loading) => set({ isLoadingCampaigns: loading }),

  isLoadingSummary: false,
  setIsLoadingSummary: (loading) => set({ isLoadingSummary: loading }),

  isClosing: false,
  setIsClosing: (closing) => set({ isClosing: closing }),

  // Filters & Search
  searchQuery: '',
  setSearchQuery: (query) => set({ searchQuery: query }),

  statusFilter: undefined,
  setStatusFilter: (filter) => set({ statusFilter: filter }),

  // UI States
  isMobile: false,
  setIsMobile: (isMobile) => set({ isMobile }),

  // Close Challenge Modal
  showCloseConfirmation: false,
  selectedChallenge: null,
  openCloseConfirmation: (challenge) => set({ 
    showCloseConfirmation: true, 
    selectedChallenge: challenge 
  }),
  closeCloseConfirmation: () => set({ 
    showCloseConfirmation: false, 
    selectedChallenge: null 
  }),

  // Reset
  reset: () => set({
    campaigns: [],
    summary: undefined,
    isLoadingCampaigns: false,
    isLoadingSummary: false,
    isClosing: false,
    searchQuery: '',
    statusFilter: undefined,
    showCloseConfirmation: false,
    selectedChallenge: null,
  }),
}))

