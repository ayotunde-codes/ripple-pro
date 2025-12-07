# RipplePro API Endpoints Documentation

Base URL: `{{url}}/api/v1`

All authenticated endpoints require Bearer token in Authorization header.

---

## 🔐 Authentication

### 1. Register
- **Endpoint**: `POST /auth/register`
- **Auth Required**: No
- **Body**:
```json
{
  "first_name": "Simon",
  "last_name": "Jude",
  "email": "simon@gmail.com",
  "role": "brand" | "creator",
  "company_name": "RealJay", // Required for brands
  "password": "password",
  "password_confirmation": "password"
}
```
- **Response**:
```json
{
  "success": true,
  "message": "User registered. Kindly enter the verification code sent to your email",
  "data": {
    "first_name": "Simon",
    "last_name": "Jude",
    "email": "simon@gmail.com",
    "role": "creator",
    "status": "active",
    "is_email_verified": false,
    "created_at": "2025-05-21T15:40:41.000000Z",
    "updated_at": "2025-05-21T15:40:41.000000Z"
  }
}
```

### 2. Login
- **Endpoint**: `POST /auth/login`
- **Auth Required**: No
- **Body**:
```json
{
  "email": "simon@gmail.com",
  "password": "password"
}
```
- **Response**:
```json
{
  "success": true,
  "message": "Login Successful",
  "data": {
    "message": "Login successful",
    "access_token": "2|93sHigzcjYUAX2Cv0IOa1gpXKg4WvbklmUgec5WD080511f9",
    "token_type": "Bearer",
    "user": {
      "first_name": "James",
      "last_name": "Nwachukwu",
      "email": "nwachukwujames7@gmail.com",
      "role": "brand",
      "status": "active",
      "is_email_verified": true,
      "created_at": "2025-05-21T15:35:53.000000Z",
      "updated_at": "2025-05-21T16:02:55.000000Z"
    }
  }
}
```

### 3. Verify Email
- **Endpoint**: `POST /auth/verify-email`
- **Auth Required**: No
- **Body**:
```json
{
  "email": "simon@gmail.com",
  "code": "962447"
}
```
- **Response**:
```json
{
  "success": true,
  "message": "Email verified successfully",
  "data": []
}
```

### 4. Resend Verification Code
- **Endpoint**: `POST /auth/resend-code`
- **Auth Required**: No
- **Body**:
```json
{
  "email": "peter-3@gmail.com"
}
```
- **Response**:
```json
{
  "success": true,
  "message": "Verification code resent",
  "data": []
}
```

### 5. Forgot Password
- **Endpoint**: `POST /auth/forgot-password`
- **Auth Required**: No
- **Body**:
```json
{
  "email": "nwachukwujames7@gmail.com"
}
```
- **Response**:
```json
{
  "success": true,
  "message": "if your account exists with us, we have sent an email to the email address, kindly use the token to verifiy your account",
  "data": []
}
```

### 6. Logout
- **Endpoint**: `POST /auth/logout`
- **Auth Required**: Yes
- **Response**:
```json
{
  "success": true,
  "message": "Logged out successfully",
  "data": []
}
```

---

## 👤 Profile Management

### 1. Update Personal Info
- **Endpoint**: `PUT /profile/personal`
- **Auth Required**: Yes
- **Body**:
```json
{
  "first_name": "Obinna",
  "middle_name": "Jude",
  "last_name": "ben",
  "phone_number": "07030408955",
  "dob": "1987-09-09",
  "country_id": 1
}
```
- **Response**:
```json
{
  "success": true,
  "message": "Profile updated successfully",
  "data": {
    "dob": "1987-09-09 00:00:00",
    "phone_number": "07030408955",
    "bvn": null,
    "country": {
      "id": 1,
      "name": "Afghanistan",
      "code": "AF"
    },
    "bank": null,
    "user": {
      "first_name": "Obinna",
      "last_name": "Ben",
      "email": "nwachukwujames7@gmail.com",
      "role": "brand",
      "status": "active",
      "is_email_verified": true,
      "created_at": "2025-05-21T15:35:53.000000Z",
      "updated_at": "2025-05-24T10:42:42.000000Z"
    }
  }
}
```

### 2. Update BVN
- **Endpoint**: `PUT /profile/bvn`
- **Auth Required**: Yes
- **Body**:
```json
{
  "bvn": "22222222222"
}
```
- **Response**: Similar to personal info response with updated BVN

### 3. Update Account Details (Bank Info)
- **Endpoint**: `PUT /profile/account`
- **Auth Required**: Yes
- **Body**:
```json
{
  "account_name": "Nwachukwu",
  "account_number": "0001544571",
  "bank_code": "044"
}
```
- **Response**:
```json
{
  "success": true,
  "message": "Profile updated successfully",
  "data": {
    "dob": "1987-09-09 00:00:00",
    "phone_number": "07030408955",
    "bvn": "22222222222",
    "country": {...},
    "bankDetails": {
      "account_name": "Nwachukwu",
      "account_number": "0001544571",
      "bank": {
        "code": "044",
        "name": "Access Bank"
      }
    },
    "user": {...}
  }
}
```

### 4. Upload Documents (KYC)
- **Endpoint**: `POST /profile/upload`
- **Auth Required**: Yes
- **Content-Type**: `multipart/form-data`
- **Body**:
  - `nin` (text): NIN number
  - `id_file` (file): ID document image
  - `address_file` (file): Address proof document
- **Response**:
```json
{
  "success": true,
  "message": "Profile files uploaded successfully",
  "data": {
    "documents": [
      {
        "id": 5,
        "type": "nin",
        "url": "http://localhost:8020/storage/uploads/...",
        "created_at": "2025-12-03T14:37:09.000000Z"
      },
      {
        "id": 6,
        "type": "address",
        "url": "http://localhost:8020/storage/uploads/...",
        "created_at": "2025-12-03T14:37:09.000000Z"
      }
    ],
    ...profileData
  }
}
```

---

## 📋 KYC Management

### 1. Submit KYC for Approval
- **Endpoint**: `GET /kyc/submit`
- **Auth Required**: Yes
- **Response**:
```json
{
  "success": true,
  "message": "KYC submitted for approval",
  "data": []
}
```

### 2. Approve KYC (Admin)
- **Endpoint**: `GET /kyc/approve/:userId`
- **Auth Required**: Yes (Admin)
- **Response**:
```json
{
  "success": true,
  "message": "Kyc approved successfully",
  "data": []
}
```

### 3. Reject KYC (Admin)
- **Endpoint**: `POST /kyc/reject`
- **Auth Required**: Yes (Admin)
- **Body**:
```json
{
  "user_id": 1,
  "reason": "Not qualified"
}
```
- **Response**:
```json
{
  "success": false,
  "message": "KYC not submitted for approval",
  "data": []
}
```

### 4. View KYC Submissions (Admin)
- **Endpoint**: `GET /kyc/submissions`
- **Auth Required**: Yes (Admin)
- **Response**:
```json
{
  "success": true,
  "message": "KYC submissions fetched successfully",
  "data": [
    {
      "dob": "1987-09-09 00:00:00",
      "phone_number": "07030408955",
      "bvn": "22222222222",
      "country": {...},
      "bankDetails": {...},
      "user": {
        "id": 2,
        "first_name": "Obinna",
        "kyc_status": "approved",
        ...
      },
      "documents": [...]
    }
  ]
}
```

---

## 💰 Wallet Management

### 1. Get Wallet
- **Endpoint**: `GET /wallets/:userId`
- **Auth Required**: Yes
- **Response**:
```json
{
  "success": true,
  "message": "Wallet fetched successfully",
  "data": {
    "id": 1,
    "currency": "NGN",
    "balance": "0.00",
    "virtual_accounts": [
      {
        "account_number": "7076355795",
        "account_name": "Obinna Ben",
        "bank": "Access",
        "user_id": 2
      }
    ],
    "user": {...}
  }
}
```

### 2. Initialize Wallet Credit (Fund Wallet)
- **Endpoint**: `POST /wallets/credit/initialize`
- **Auth Required**: Yes
- **Body**:
```json
{
  "amount": 50000
}
```
- **Response**:
```json
{
  "success": true,
  "message": "Wallet credit initialized successfully",
  "data": {
    "status": true,
    "message": "Authorization URL created",
    "data": {
      "authorization_url": "https://checkout.paystack.com/bgit1k3st8fpc8y",
      "access_code": "bgit1k3st8fpc8y",
      "reference": "hu4icu6ll0"
    }
  }
}
```

### 3. Complete Wallet Credit
- **Endpoint**: `POST /wallets/credit`
- **Auth Required**: Yes
- **Body**:
```json
{
  "reference": "bw1c80u0c3"
}
```

### 4. Withdraw Funds
- **Endpoint**: `POST /wallets/withdraw`
- **Auth Required**: Yes
- **Body**:
```json
{
  "amount": "50"
}
```

---

## 🎯 Campaign Management

### 1. Create Campaign
- **Endpoint**: `POST /campaigns`
- **Auth Required**: Yes
- **Body**:
```json
{
  "campaign_name": "testing",
  "category": "fashion",
  "content_type": "video",
  "social_media_platforms": ["instagram"],
  "challenge_pool": "10000",
  "end_date": "2025-06-10",
  "reward_rate_amount": "2",
  "reward_rate_views": "500",
  "max_payout": "2000",
  "asset_links": ["https://google.com"],
  "content_requirement": "just testing",
  "additional_notes": "never mind"
}
```
- **Response**:
```json
{
  "success": true,
  "message": "Campaign created successfully",
  "data": {
    "id": 7,
    "campaign_name": "testing",
    "category": "fashion",
    "content_type": "video",
    "challenge_pool": "10000",
    "end_date": "2025-06-10T00:00:00.000000Z",
    "reward_rate_amount": "2",
    "reward_rate_views": "500",
    "max_payout": "2000",
    "asset_links": ["https://google.com"],
    "content_requirement": "just testing",
    "additional_notes": "never mind",
    "social_media_platforms": ["Instagram"]
  }
}
```

### 2. Get Campaigns
- **Endpoint**: `GET /campaigns`
- **Auth Required**: Yes
- **Query Params**:
  - `length` (optional): Number of items per page (default: 15)
  - `search` (optional): Search term
  - `status` (optional): Filter by status (open, closed)
- **Response**:
```json
{
  "data": [
    {
      "id": 13,
      "campaign_name": "testing",
      "category": "fashion",
      "content_type": "video",
      "challenge_pool": "10000.00",
      "end_date": "2025-06-10T00:00:00.000000Z",
      "created_at": "2025-06-08T09:19:15.000000Z",
      "status": "open",
      "reward_rate_amount": "2.00",
      "reward_rate_views": 500,
      "max_payout": "2000.00",
      "paid_out": "30.00",
      "balance": 9970,
      "views": 7718,
      "asset_links": ["https://google.com"],
      "content_requirement": "just testing",
      "additional_notes": "never mind",
      "social_media_platforms": ["Instagram"]
    }
  ],
  "links": {
    "first": "http://localhost:8000/api/v1/campaigns?page=1",
    "last": "http://localhost:8000/api/v1/campaigns?page=2",
    "prev": null,
    "next": "http://localhost:8000/api/v1/campaigns?page=2"
  },
  "meta": {
    "current_page": 1,
    "from": 1,
    "last_page": 2,
    "per_page": 5,
    "to": 5,
    "total": 9
  }
}
```

### 3. Get Campaign Summary
- **Endpoint**: `GET /campaigns/summary`
- **Auth Required**: Yes
- **Response**:
```json
{
  "success": true,
  "message": "Summary fetched successfully",
  "data": {
    "total_campaigns": 9,
    "active_campaigns": 9,
    "total_spend": 90000,
    "total_views": ""
  }
}
```

### 4. Close Campaign
- **Endpoint**: `GET /campaigns/close/:campaignId`
- **Auth Required**: Yes
- **Response**:
```json
{
  "success": true,
  "message": "Campaign closed successfully",
  "data": {
    "id": 2,
    "status": "closed",
    "balance": 9994,
    ...campaignDetails
  }
}
```

### 5. Get Redemption Requests
- **Endpoint**: `GET /campaigns/:campaignId/redemption-requests`
- **Auth Required**: Yes
- **Response**:
```json
{
  "success": true,
  "message": "Redemption requests fetched successfully",
  "data": [
    {
      "id": 3,
      "amount": "6.00",
      "status": "pending",
      "created_at": "2025-12-05T14:32:57.000000Z",
      "challenge": {
        "id": 2,
        "challange_name": "testing",
        "earnings": 6,
        "views": 1547,
        "date_entered": "2025-12-05T12:06:09.000000Z",
        "status": "closed",
        "social_media_links": ["https://www.youtube.com/watch?v=Hc9XfxqRfnY"]
      },
      "user": {
        "id": 13,
        "first_name": "Obinna",
        "last_name": "Ben",
        "email": "simon@gmail.com",
        "role": "brand",
        "kyc_status": "approved",
        ...
      }
    }
  ]
}
```

---

## 🎮 Challenge Management (Creator Side)

### 1. Join Challenge
- **Endpoint**: `POST /challenges/:challengeId`
- **Auth Required**: Yes
- **Body**:
```json
{
  "social_media_links": [
    "https://google.com",
    "https://facebook.com"
  ]
}
```
- **Response**:
```json
{
  "success": true,
  "message": "Successfully joined challenge",
  "data": {
    "challange_name": "testing",
    "earnings": null,
    "views": null,
    "date_entered": "2025-06-08T12:23:41.000000Z",
    "status": "open",
    "social_media_links": [
      "https://google.com",
      "https://facebook.com"
    ]
  }
}
```

### 2. My Submissions
- **Endpoint**: `GET /challenges/my-submissions`
- **Auth Required**: Yes
- **Query Params**:
  - `search` (optional): Search term
  - `length` (optional): Items per page
  - `status` (optional): Filter by status
- **Response**:
```json
{
  "data": [
    {
      "id": 2,
      "challange_name": "testing",
      "earnings": 95,
      "views": 7718,
      "date_entered": "2025-06-08T12:23:41.000000Z",
      "status": "open",
      "social_media_links": [
        "https://google.com",
        "https://www.youtube.com/watch?v=v5tAdjf0o3E"
      ]
    }
  ],
  "links": {...},
  "meta": {
    "current_page": 1,
    "per_page": 15,
    "total": 2
  }
}
```

### 3. Redeem Reward
- **Endpoint**: `GET /challenges/redeem-reward/:challengeId`
- **Auth Required**: Yes
- **Response**:
```json
{
  "success": true,
  "message": "Redemption request created successfully",
  "data": {
    "id": 3,
    "amount": 6,
    "status": "pending",
    "created_at": "2025-12-05T14:32:57.000000Z",
    "challenge": {
      "id": 2,
      "challange_name": "testing",
      "earnings": 6,
      "views": 1547,
      "status": "closed",
      ...
    },
    "user": {...}
  }
}
```

### 4. Approve Redemption (Brand/Admin)
- **Endpoint**: `GET /challenges/approve-redemption/:redemptionId`
- **Auth Required**: Yes
- **Response**:
```json
{
  "success": true,
  "message": "Redemption request approved successfully",
  "data": {
    "id": 3,
    "amount": "6.00",
    "status": "approved",
    ...
  }
}
```

---

## 🌐 Utility Endpoints

### 1. Get Paystack Bank List
- **Endpoint**: `GET /paystack/banks` (exact path not specified in collection)
- **Auth Required**: Likely Yes
- **Note**: Used for bank selection dropdowns

### 2. Verify Account Number
- **Endpoint**: `GET /verify-account` (exact path not specified)
- **Auth Required**: Likely Yes
- **Note**: Used to verify bank account details

---

## 📡 Webhooks

### Paystack Deposit Webhook
- **Endpoint**: Not fully specified in collection
- **Note**: Handles Paystack payment completion callbacks

---

## 📊 API Response Structure

All responses follow this standard format:

```json
{
  "success": true | false,
  "message": "Description of result",
  "data": {} | []
}
```

### Paginated Responses Include:
- `data`: Array of items
- `links`: Navigation links (first, last, prev, next)
- `meta`: Pagination metadata (current_page, per_page, total, etc.)

---

## 🔑 Authentication

All authenticated endpoints require:

**Header**: `Authorization: Bearer {access_token}`

Token is received from the login endpoint and should be stored securely.

---

## 🎯 Field Mappings

### Frontend → Backend Field Names:

**Campaign Creation:**
- `name` → `campaign_name`
- `rewardAmount` → `reward_rate_amount`
- `viewsThreshold` → `reward_rate_views`
- `budget` → `challenge_pool`
- `platforms` → `social_media_platforms`
- `requirements` → `content_requirement`

**Profile:**
- Standard snake_case for all fields
- Dates in `YYYY-MM-DD` format

---

## 📝 Notes

1. **Date Format**: `YYYY-MM-DD` for inputs, ISO 8601 in responses
2. **Currency**: All amounts in NGN (Nigerian Naira)
3. **Pagination**: Default 15 items per page
4. **File Uploads**: Use `multipart/form-data`
5. **Status Values**:
   - Campaigns: `open`, `closed`
   - Redemptions: `pending`, `approved`, `rejected`
   - KYC: `pending`, `approved`, `rejected`
6. **Roles**: `brand`, `creator`

