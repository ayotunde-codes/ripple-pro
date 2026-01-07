# Paystack Integration Fix

## Issue
After calling the initialize endpoint, the response was received correctly:
```json
{
    "authorization_url": "https://checkout.paystack.com/0klse754tr24lag",
    "access_code": "0klse754tr24lag",
    "reference": "0jmt82zzgs"
}
```

But the Paystack checkout popup was not appearing.

## Root Cause
The `PaystackPop` was being called incorrectly. According to Paystack's official documentation, you must:
1. Create a new instance of `PaystackPop` using `new PaystackPop()`
2. Then call `resumeTransaction(access_code)` on that instance

## Fix Applied

### Before (Incorrect)
```javascript
if (window.PaystackPop) {
  window.PaystackPop.resumeTransaction(access_code) // ❌ Wrong - treating it as a static method
}
```

### After (Correct)
```javascript
if (window.PaystackPop) {
  const popup = new window.PaystackPop() // ✅ Create instance first
  popup.resumeTransaction(access_code)   // ✅ Then call method
}
```

## Complete Implementation

```javascript
const handlePaystackPayment = async () => {
  try {
    // 1. Initialize transaction with backend
    const response = await initializeFunding.mutateAsync({
      amount: Number.parseFloat(amount),
    })

    if (response.success && response.data) {
      const { access_code, reference, authorization_url } = response.data.data

      // 2. Open Paystack popup with access_code
      if (typeof window !== "undefined" && window.PaystackPop) {
        const popup = new window.PaystackPop()
        popup.resumeTransaction(access_code)
        
        // Show success message
        toast({
          title: "Payment initiated",
          description: "Complete your payment in the popup window",
        })
        
        // Close modal after popup opens
        setTimeout(() => {
          setAmount("")
          onOpenChange(false)
          if (onSuccess) {
            onSuccess()
          }
        }, 1000)
      } else if (authorization_url) {
        // Fallback: Redirect if popup fails to load
        window.location.href = authorization_url
      }
    }
  } catch (error) {
    // Handle errors
  }
}
```

## Paystack Flow

1. **Initialize Transaction** (Backend)
   ```
   POST /api/v1/wallets/credit/initialize
   Body: { amount: 5000 }
   ```

2. **Get Response**
   ```json
   {
     "access_code": "0klse754tr24lag",
     "authorization_url": "https://checkout.paystack.com/0klse754tr24lag",
     "reference": "0jmt82zzgs"
   }
   ```

3. **Open Popup** (Frontend)
   ```javascript
   const popup = new PaystackPop()
   popup.resumeTransaction('0klse754tr24lag')
   ```

4. **User Completes Payment**
   - Paystack popup appears
   - User enters card details or selects bank transfer
   - Payment is processed

5. **Webhook Notification** (Backend)
   - Paystack sends webhook to your backend
   - Backend verifies transaction
   - Backend credits user's wallet

6. **Frontend Updates**
   - Wallet balance refreshes automatically
   - User sees updated balance

## TypeScript Types Updated

```typescript
declare global {
  interface Window {
    PaystackPop?: new () => {
      resumeTransaction: (accessCode: string) => void
      newTransaction: (config: any) => void
    }
  }
}
```

## Testing Steps

1. ✅ Click "Fund Wallet"
2. ✅ Select "Paystack" payment method
3. ✅ Enter amount (e.g., 5000)
4. ✅ Click "Pay with Paystack"
5. ✅ Paystack popup should appear
6. ✅ Complete payment in popup
7. ✅ Wallet balance should update (after webhook)

## Additional Features

- **Fallback Redirect**: If popup fails to load, redirects to `authorization_url`
- **Error Handling**: Shows user-friendly error messages
- **Loading States**: Disables button while processing
- **Auto-close Modal**: Closes after payment initiation
- **Wallet Refresh**: Automatically refetches wallet balance after payment

## References

- [Paystack Accept Payments Docs](https://paystack.com/docs/payments/accept-payments/)
- [Paystack Inline JavaScript](https://paystack.com/docs/payments/accept-payments/#inline-javascript)
- [Paystack Transaction API](https://paystack.com/docs/api/transaction/)


