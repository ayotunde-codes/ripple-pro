# RipplePro API Quick Reference

Base URL: `{{url}}/api/v1`

## 📋 All Endpoints at a Glance

| Category | Method | Endpoint | Auth | Description |
|----------|--------|----------|------|-------------|
| **Authentication** |
| Auth | POST | `/auth/register` | ❌ | Register new user (brand/creator) |
| Auth | POST | `/auth/login` | ❌ | User login |
| Auth | POST | `/auth/verify-email` | ❌ | Verify email with code |
| Auth | POST | `/auth/resend-code` | ❌ | Resend verification code |
| Auth | POST | `/auth/forgot-password` | ❌ | Request password reset |
| Auth | POST | `/auth/logout` | ✅ | Logout user |
| **Profile** |
| Profile | PUT | `/profile/personal` | ✅ | Update personal information |
| Profile | PUT | `/profile/bvn` | ✅ | Update BVN |
| Profile | PUT | `/profile/account` | ✅ | Update bank account details |
| Profile | POST | `/profile/upload` | ✅ | Upload KYC documents (multipart) |
| **KYC** |
| KYC | GET | `/kyc/submit` | ✅ | Submit KYC for approval |
| KYC | GET | `/kyc/approve/:userId` | ✅ | Approve user KYC (Admin) |
| KYC | POST | `/kyc/reject` | ✅ | Reject user KYC (Admin) |
| KYC | GET | `/kyc/submissions` | ✅ | View all KYC submissions (Admin) |
| **Wallets** |
| Wallet | GET | `/wallets/:userId` | ✅ | Get user wallet details |
| Wallet | POST | `/wallets/credit/initialize` | ✅ | Initialize wallet funding |
| Wallet | POST | `/wallets/credit` | ✅ | Complete wallet funding |
| Wallet | POST | `/wallets/withdraw` | ✅ | Withdraw from wallet |
| **Campaigns** |
| Campaign | POST | `/campaigns` | ✅ | Create new campaign (Brand) |
| Campaign | GET | `/campaigns` | ✅ | Get all campaigns (paginated) |
| Campaign | GET | `/campaigns/summary` | ✅ | Get campaign statistics |
| Campaign | GET | `/campaigns/close/:campaignId` | ✅ | Close a campaign (Brand) |
| Campaign | GET | `/campaigns/:campaignId/redemption-requests` | ✅ | View redemption requests for campaign |
| **Challenges** |
| Challenge | POST | `/challenges/:challengeId` | ✅ | Join challenge (Creator) |
| Challenge | GET | `/challenges/my-submissions` | ✅ | View my challenge submissions |
| Challenge | GET | `/challenges/redeem-reward/:challengeId` | ✅ | Request reward redemption |
| Challenge | GET | `/challenges/approve-redemption/:redemptionId` | ✅ | Approve redemption (Brand) |

---

## 🎯 Query Parameters Reference

### `/campaigns` (GET)
- `length` - Items per page (default: 15)
- `search` - Search campaigns by name
- `status` - Filter by status: `open`, `closed`

### `/challenges/my-submissions` (GET)
- `length` - Items per page (default: 15)
- `search` - Search submissions
- `status` - Filter by status

---

## 📦 Common Request Bodies

### Register User
```json
{
  "first_name": "string",
  "last_name": "string",
  "email": "string",
  "role": "brand" | "creator",
  "company_name": "string",  // Required for brand
  "password": "string",
  "password_confirmation": "string"
}
```

### Create Campaign
```json
{
  "campaign_name": "string",
  "category": "string",
  "content_type": "string",
  "social_media_platforms": ["instagram", "tiktok", "youtube"],
  "challenge_pool": "string",
  "end_date": "YYYY-MM-DD",
  "reward_rate_amount": "string",
  "reward_rate_views": "string",
  "max_payout": "string",
  "asset_links": ["url1", "url2"],
  "content_requirement": "string",
  "additional_notes": "string"
}
```

### Join Challenge
```json
{
  "social_media_links": ["url1", "url2"]
}
```

### Update Personal Info
```json
{
  "first_name": "string",
  "middle_name": "string",
  "last_name": "string",
  "phone_number": "string",
  "dob": "YYYY-MM-DD",
  "country_id": number
}
```

### Update Bank Account
```json
{
  "account_name": "string",
  "account_number": "string",
  "bank_code": "string"
}
```

### Initialize Wallet Funding
```json
{
  "amount": number
}
```

---

## 📊 Response Structures

### Standard Success Response
```json
{
  "success": true,
  "message": "Operation successful",
  "data": {}
}
```

### Standard Error Response
```json
{
  "success": false,
  "message": "Error description",
  "data": []
}
```

### Paginated Response
```json
{
  "data": [],
  "links": {
    "first": "url",
    "last": "url",
    "prev": "url",
    "next": "url"
  },
  "meta": {
    "current_page": 1,
    "from": 1,
    "last_page": 5,
    "per_page": 15,
    "to": 15,
    "total": 75
  }
}
```

---

## 🔐 Authentication

**Header Required for Protected Endpoints:**
```
Authorization: Bearer {access_token}
```

Get access token from `/auth/login` response.

---

## 🎨 Status Values

### Campaign Status
- `open` - Campaign is active
- `closed` - Campaign has ended

### Redemption Status
- `pending` - Awaiting approval
- `approved` - Approved by brand
- `rejected` - Rejected by brand

### KYC Status
- `pending` - Under review
- `approved` - Verified
- `rejected` - Not verified

### User Status
- `active` - Active account
- `inactive` - Deactivated account

---

## 🏷️ User Roles

- `brand` - Business/Company creating campaigns
- `creator` - Content creator participating in challenges

---

## 💡 Integration Tips

1. **Store Token Securely**: Save access token after login
2. **Handle Token Expiry**: Implement refresh/re-login flow
3. **Paginate Large Lists**: Use `length` parameter for campaigns and submissions
4. **Validate Before Submit**: Check data format before API calls
5. **Handle File Uploads**: Use `FormData` for document uploads
6. **Monitor Wallet Balance**: Check before creating campaigns
7. **Track Campaign Status**: Poll for status updates if needed

---

## 🔄 Typical User Flows

### Brand Flow
1. Register → Verify Email → Login
2. Update Profile → Upload KYC → Submit KYC
3. (Admin approves KYC)
4. Fund Wallet (via Paystack)
5. Create Campaign
6. Monitor Submissions
7. Approve/Reject Redemption Requests
8. Close Campaign

### Creator Flow
1. Register → Verify Email → Login
2. Update Profile → Upload KYC → Submit KYC
3. (Admin approves KYC)
4. Browse & Join Challenges
5. Submit Content Links
6. Monitor Earnings & Views
7. Request Reward Redemption
8. Withdraw Earnings

---

## 🌐 Environment Variables Needed

```env
NEXT_PUBLIC_API_BASE_URL=https://api.ripplepro.com/api/v1
NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY=pk_test_xxx
```

---

## 📌 Important Notes

- All monetary amounts are in NGN (Nigerian Naira)
- Dates should be in `YYYY-MM-DD` format
- Phone numbers should be Nigerian format
- BVN must be 11 digits
- Email verification is required before full access
- KYC approval required for wallet operations
- Minimum withdrawal amount may apply
- Campaign end dates must be in the future

