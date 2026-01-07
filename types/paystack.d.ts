declare module "@paystack/inline-js" {
  export default class PaystackPop {
    constructor()
    resumeTransaction(accessCode: string): void
    newTransaction(config: {
      key?: string
      email?: string
      amount?: number
      ref?: string
      onSuccess?: (transaction: any) => void
      onCancel?: () => void
    }): void
  }
}


