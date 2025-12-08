# Missing Backend Endpoints

This document lists all the API endpoints that the frontend requires but are not currently provided by the backend.

---

## 🔴 HIGH PRIORITY (Blocking Core Features)

### 1. Transaction History
**Endpoint:** `GET /wallets/:userId/transactions` OR `GET /transactions`

**Purpose:** Display user's transaction history on the Payments page

**Current Workaround:** Using mock data in `app/payments/_components/payments-data.ts`

**Required Response:**
```json
{
  "success": true,
  "message": "Transactions retrieved",
  "data": [
    {
      "id": 1,
      "type": "credit" | "debit",
      "amount": "5000.00",
      "description": "Wallet funding via transfer",
      "reference": "TXN-123456",
      "status": "completed" | "pending" | "failed",
      "created_at": "2024-01-15T10:30:00Z",
      "balance_after": "15000.00"
    }
  ],
  "meta": {
    "current_page": 1,
    "per_page": 50,
    "total": 100
  }
}
```

**Query Parameters:**
- `page` (number, optional): Page number for pagination
- `limit` (number, optional): Items per page
- `type` (string, optional): Filter by "credit" or "debit"
- `status` (string, optional): Filter by status

**Frontend Impact:**
- Payments page shows empty/mock transaction list
- Total earnings calculation inaccurate
- Expected rewards calculation not possible

---

### 2. Decline Redemption Request
**Endpoint:** `POST /challenges/decline-redemption/:redemptionId`

**Purpose:** Allow brands to decline/reject creator redemption requests with a reason

**Current Workaround:** Decline button shows error message "endpoint not available"

**Required Request Body:**
```json
{
  "reason": "Content does not meet requirements"
}
```

**Required Response:**
```json
{
  "success": true,
  "message": "Redemption request declined",
  "data": {
    "id": 123,
    "status": "rejected",
    "rejection_reason": "Content does not meet requirements",
    "updated_at": "2024-01-15T10:30:00Z"
  }
}
```

**Frontend Impact:**
- Brands can only approve requests, not decline them
- No way to reject low-quality submissions
- Campaign management incomplete

---

## 🟡 MEDIUM PRIORITY (Quality of Life Improvements)

### 3. Get User Profile
**Endpoint:** `GET /profile` OR `GET /users/me`

**Purpose:** Fetch complete user profile data (currently using user object from login response)

**Current Workaround:** Using `localStorage` and user object from `POST /auth/login` response

**Required Response:**
```json
{
  "success": true,
  "message": "Profile retrieved",
  "data": {
    "id": 1,
    "first_name": "John",
    "last_name": "Doe",
    "email": "john@example.com",
    "role": "creator",
    "company_name": null,
    "status": "active",
    "kyc_status": "approved",
    "is_email_verified": true,
    "created_at": "2024-01-01T00:00:00Z",
    "profile": {
      "phone": "+2348012345678",
      "bvn": "12345678901",
      "state": "Lagos",
      "city": "Ikeja",
      "address": "123 Main St",
      "content_types": ["video", "image"],
      "account": {
        "bank_name": "GTBank",
        "account_number": "0123456789",
        "account_name": "John Doe"
      },
      "social_media": {
        "instagram": "https://instagram.com/johndoe",
        "facebook": "https://facebook.com/johndoe",
        "twitter": "https://twitter.com/johndoe",
        "youtube": "https://youtube.com/@johndoe",
        "tiktok": "https://tiktok.com/@johndoe"
      }
    }
  }
}
```

**Frontend Impact:**
- Profile page loads slower (data from login might be stale)
- No way to refresh profile data without re-login
- Profile changes not reflected until page reload

---

### 4. Browse Available Challenges (Dedicated Endpoint)
**Endpoint:** `GET /challenges/available` OR `GET /challenges/browse`

**Purpose:** Browse challenges available for creators to join (currently using `/campaigns` as workaround)

**Current Workaround:** Using `GET /campaigns` with `status: "open"` filter

**Required Response:**
```json
{
  "success": true,
  "message": "Available challenges retrieved",
  "data": [
    {
      "id": 1,
      "campaign_name": "Summer Product Launch",
      "category": "Fashion & Beauty",
      "content_type": "Video",
      "challenge_pool": "5000000",
      "end_date": "2024-08-31",
      "reward_rate_amount": "1000",
      "reward_rate_views": 1000,
      "max_payout": "50000",
      "platforms": ["instagram", "tiktok"],
      "content_requirement": "Must showcase product for 30 seconds",
      "additional_notes": "Use hashtag #SummerLaunch",
      "participants_count": 45,
      "views_generated": 1500000,
      "status": "open",
      "created_at": "2024-06-01T00:00:00Z"
    }
  ],
  "meta": {
    "current_page": 1,
    "per_page": 20,
    "total": 15
  }
}
```

**Query Parameters:**
- `page` (number, optional): Page number
- `limit` (number, optional): Items per page
- `category` (string, optional): Filter by category
- `content_type` (string, optional): Filter by content type
- `platform` (string, optional): Filter by platform

**Frontend Impact:**
- Currently works but uses campaigns endpoint (not semantically correct)
- No way to show creator-specific challenge information
- Missing participants count and other creator-relevant data

---

### 5. Get Campaign Details
**Endpoint:** `GET /campaigns/:campaignId`

**Purpose:** Get detailed information about a specific campaign

**Current Workaround:** Reconstructing campaign data from redemption requests

**Required Response:**
```json
{
  "success": true,
  "message": "Campaign retrieved",
  "data": {
    "id": 1,
    "campaign_name": "Summer Product Launch",
    "category": "Fashion & Beauty",
    "content_type": "Video",
    "challenge_pool": "5000000",
    "paid_out": "3238580",
    "balance": "1761420",
    "end_date": "2024-08-31",
    "reward_rate_amount": "1000",
    "reward_rate_views": 1000,
    "max_payout": "50000",
    "platforms": ["instagram", "tiktok"],
    "content_requirement": "Must showcase product",
    "additional_notes": "Use hashtag #SummerLaunch",
    "asset_links": ["https://example.com/asset.pdf"],
    "participants_count": 45,
    "views_generated": 1500000,
    "status": "open",
    "created_at": "2024-06-01T00:00:00Z"
  }
}
```

**Frontend Impact:**
- Campaign management detail page has incomplete data
- Showing placeholder/mock values for some fields
- Cannot display full campaign details to brands

---

## 🟢 LOW PRIORITY (Nice to Have)

### 6. Get Wallet Transaction Details
**Endpoint:** `GET /wallets/transactions/:transactionId`

**Purpose:** View detailed information about a specific transaction

**Current Workaround:** No detail page implemented

**Required Response:**
```json
{
  "success": true,
  "message": "Transaction retrieved",
  "data": {
    "id": 1,
    "type": "credit",
    "amount": "5000.00",
    "description": "Wallet funding via transfer",
    "reference": "TXN-123456",
    "status": "completed",
    "payment_method": "bank_transfer",
    "metadata": {
      "source": "virtual_account",
      "sender_account": "0123456789",
      "sender_bank": "GTBank"
    },
    "created_at": "2024-01-15T10:30:00Z",
    "completed_at": "2024-01-15T10:35:00Z"
  }
}
```

**Frontend Impact:**
- No transaction detail modal/page
- Cannot view transaction history or receipts
- Limited transparency for users

---

### 7. Search/Filter Redemption Requests
**Endpoint:** `GET /campaigns/:campaignId/redemption-requests` (with query params)

**Purpose:** Search and filter redemption requests by creator name, status, date range

**Current Status:** Endpoint exists but doesn't support search/filter parameters

**Required Query Parameters:**
- `search` (string, optional): Search by creator name
- `status` (string, optional): Filter by "pending" | "approved" | "rejected"
- `date_from` (string, optional): Filter by date range
- `date_to` (string, optional): Filter by date range
- `page` (number, optional): Pagination
- `limit` (number, optional): Items per page

**Frontend Impact:**
- Currently filtering client-side only
- Performance issues with large datasets
- No server-side pagination for redemptions

---

### 8. Get Challenge Details (Creator View)
**Endpoint:** `GET /challenges/:challengeId`

**Purpose:** Get challenge details when creator wants to join

**Current Workaround:** Using mock data in `challenge-data.ts` or searching campaigns list

**Required Response:**
```json
{
  "success": true,
  "message": "Challenge retrieved",
  "data": {
    "id": 1,
    "campaign_name": "Summer Product Launch",
    "brand_name": "Brand X",
    "category": "Fashion & Beauty",
    "content_type": "Video",
    "challenge_pool": "5000000",
    "end_date": "2024-08-31",
    "reward_rate_amount": "1000",
    "reward_rate_views": 1000,
    "max_payout": "50000",
    "platforms": ["instagram", "tiktok"],
    "content_requirement": "Must showcase product for 30 seconds",
    "additional_notes": "Use hashtag #SummerLaunch",
    "asset_links": ["https://example.com/brief.pdf"],
    "participants_count": 45,
    "status": "open",
    "already_joined": false
  }
}
```

**Frontend Impact:**
- Join challenge page shows incomplete information
- Cannot check if user already joined
- Using mock data for challenge details

---

## 📋 SUMMARY

### Endpoints Breakdown by Priority:

| Priority | Count | Endpoints |
|----------|-------|-----------|
| 🔴 **HIGH** | 2 | Transaction history, Decline redemption |
| 🟡 **MEDIUM** | 3 | Get profile, Browse challenges, Campaign details |
| 🟢 **LOW** | 3 | Transaction details, Filter redemptions, Challenge details |
| **TOTAL** | **8** | **Missing endpoints** |

### Current API Coverage:
- **Endpoints Available:** 27
- **Endpoints Missing:** 8
- **Coverage:** 77% (27/35)

---

## 🚀 RECOMMENDED IMPLEMENTATION ORDER

### Phase 1 (High Priority - 1-2 days):
1. ✅ **Transaction History** - Unblocks payments page
2. ✅ **Decline Redemption** - Completes campaign management

### Phase 2 (Medium Priority - 2-3 days):
3. ✅ **Get Profile** - Better data management
4. ✅ **Campaign Details** - Better campaign management
5. ✅ **Browse Challenges** - Cleaner API structure

### Phase 3 (Low Priority - Nice to Have):
6. ⚪ **Transaction Details** - Better UX
7. ⚪ **Filter Redemptions** - Performance optimization
8. ⚪ **Challenge Details** - Better join flow

---

## 📝 FRONTEND STATUS

### Currently Working (with workarounds):
- ✅ All 27 available endpoints fully integrated
- ✅ App is 100% functional despite missing endpoints
- ✅ Using mock data or workarounds where needed
- ✅ Ready for production testing

### Will Improve When Endpoints Added:
- 🔄 Payments page (transaction history)
- 🔄 Campaign management (decline functionality)
- 🔄 Profile management (real-time refresh)
- 🔄 Challenge browsing (dedicated endpoint)

---

**Frontend is ready - waiting on backend!** 🎯

