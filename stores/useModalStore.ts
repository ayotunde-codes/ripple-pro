import { create } from 'zustand'

interface ModalStore {
  // Funding Modal
  showFundingModal: boolean
  toggleFundingModal: () => void
  openFundingModal: () => void
  closeFundingModal: () => void

  // Withdrawal Modal
  showWithdrawalModal: boolean
  withdrawalAmount: string
  setWithdrawalAmount: (amount: string) => void
  toggleWithdrawalModal: () => void
  openWithdrawalModal: () => void
  closeWithdrawalModal: () => void

  // OTP Modal
  showOtpModal: boolean
  otp: string
  otpError: string
  setOtp: (otp: string) => void
  setOtpError: (error: string) => void
  toggleOtpModal: () => void
  openOtpModal: () => void
  closeOtpModal: () => void

  // Success Modal
  showSuccessModal: boolean
  successMessage: string
  toggleSuccessModal: () => void
  openSuccessModal: (message?: string) => void
  closeSuccessModal: () => void

  // Verification Prompt
  showVerificationPrompt: boolean
  toggleVerificationPrompt: () => void
  openVerificationPrompt: () => void
  closeVerificationPrompt: () => void

  // Onboarding Modal
  showOnboarding: boolean
  onboardingInitialStep: number
  setOnboardingInitialStep: (step: number) => void
  toggleOnboarding: () => void
  openOnboarding: (initialStep?: number) => void
  closeOnboarding: () => void

  // Virtual Account Copy State
  copied: boolean
  setCopied: (copied: boolean) => void

  // Reset all modals
  resetModals: () => void
}

export const useModalStore = create<ModalStore>((set) => ({
  // Funding Modal
  showFundingModal: false,
  toggleFundingModal: () => set((state) => ({ showFundingModal: !state.showFundingModal })),
  openFundingModal: () => set({ showFundingModal: true }),
  closeFundingModal: () => set({ showFundingModal: false }),

  // Withdrawal Modal
  showWithdrawalModal: false,
  withdrawalAmount: '',
  setWithdrawalAmount: (amount) => set({ withdrawalAmount: amount }),
  toggleWithdrawalModal: () => set((state) => ({ showWithdrawalModal: !state.showWithdrawalModal })),
  openWithdrawalModal: () => set({ showWithdrawalModal: true }),
  closeWithdrawalModal: () => set({ showWithdrawalModal: false, withdrawalAmount: '' }),

  // OTP Modal
  showOtpModal: false,
  otp: '',
  otpError: '',
  setOtp: (otp) => set({ otp }),
  setOtpError: (error) => set({ otpError: error }),
  toggleOtpModal: () => set((state) => ({ showOtpModal: !state.showOtpModal })),
  openOtpModal: () => set({ showOtpModal: true }),
  closeOtpModal: () => set({ showOtpModal: false, otp: '', otpError: '' }),

  // Success Modal
  showSuccessModal: false,
  successMessage: '',
  toggleSuccessModal: () => set((state) => ({ showSuccessModal: !state.showSuccessModal })),
  openSuccessModal: (message = 'Success!') => set({ showSuccessModal: true, successMessage: message }),
  closeSuccessModal: () => set({ showSuccessModal: false, successMessage: '' }),

  // Verification Prompt
  showVerificationPrompt: false,
  toggleVerificationPrompt: () => set((state) => ({ showVerificationPrompt: !state.showVerificationPrompt })),
  openVerificationPrompt: () => set({ showVerificationPrompt: true }),
  closeVerificationPrompt: () => set({ showVerificationPrompt: false }),

  // Onboarding Modal
  showOnboarding: false,
  onboardingInitialStep: 0,
  setOnboardingInitialStep: (step) => set({ onboardingInitialStep: step }),
  toggleOnboarding: () => set((state) => ({ showOnboarding: !state.showOnboarding })),
  openOnboarding: (initialStep = 0) => set({ showOnboarding: true, onboardingInitialStep: initialStep }),
  closeOnboarding: () => set({ showOnboarding: false, onboardingInitialStep: 0 }),

  // Virtual Account Copy State
  copied: false,
  setCopied: (copied) => set({ copied }),

  // Reset all modals
  resetModals: () => set({
    showFundingModal: false,
    showWithdrawalModal: false,
    withdrawalAmount: '',
    showOtpModal: false,
    otp: '',
    otpError: '',
    showSuccessModal: false,
    successMessage: '',
    showVerificationPrompt: false,
    showOnboarding: false,
    onboardingInitialStep: 0,
    copied: false,
  }),
}))

