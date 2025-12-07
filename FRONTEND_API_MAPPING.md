# Frontend to API Mapping

This document maps your existing frontend pages/components to the required backend API endpoints.

---

## 🔐 Authentication Pages

### `/signup` (Signup Page)
**Component**: `app/signup/_components/signup-form.tsx`

**API Endpoint**: `POST /api/v1/auth/register`

**Form Fields Mapping**:
```typescript
// Frontend → Backend
{
  firstName → first_name
  lastName → last_name
  email → email
  accountType → role  // "creator" or "brand"
  companyName → company_name  // Only if accountType === "brand"
  password → password
  confirmPassword → password_confirmation
}
```

**Flow**:
1. User fills signup form
2. Call `/auth/register` endpoint
3. Store user data (without token yet)
4. Redirect to email verification page
5. User enters OTP code
6. Call `/auth/verify-email` with email and code
7. On success, redirect to login

**Next Steps**:
- Create `app/verify-email/page.tsx` for OTP verification
- Integrate with `/auth/verify-email` endpoint

---

### `/login` (Login Page)
**Status**: ⚠️ Not yet created

**API Endpoint**: `POST /api/v1/auth/login`

**Required Fields**:
```typescript
{
  email: string
  password: string
}
```

**Response Handling**:
```typescript
const response = await loginAPI({ email, password });
// Store in localStorage/sessionStorage or state management
localStorage.setItem('access_token', response.data.access_token);
localStorage.setItem('user', JSON.stringify(response.data.user));
// Redirect to dashboard
router.push('/dashboard');
```

**Create**: `app/login/page.tsx`

---

## 👤 Profile Pages

### `/profile/information` (Profile Information Page)
**Component**: `app/profile/information/page.tsx`

**Related API Endpoints**:

#### 1. Get Current Profile (Need to add)
- **Endpoint**: Not in collection - likely `GET /api/v1/profile` or included in user object from login

#### 2. Update Personal Info
- **Endpoint**: `PUT /api/v1/profile/personal`
- **Form**: `app/profile/information/_components/personal-info-form.tsx`
- **Mapping**:
```typescript
{
  firstName → first_name
  middleName → middle_name
  lastName → last_name
  phoneNumber → phone_number
  dob → dob  // Format: "YYYY-MM-DD"
  country → country_id  // Convert country name to ID
}
```

#### 3. Update Social Media (Not in API)
- **Component**: `app/profile/information/_components/social-media-form.tsx`
- **Status**: ⚠️ No corresponding API endpoint found
- **Action**: Check with backend team or update profile API to include social media

#### 4. Update Bank Info
- **Endpoint**: `PUT /api/v1/profile/account`
- **Form**: `app/profile/information/_components/bank-info-form.tsx`
- **Mapping**:
```typescript
{
  accountNumber → account_number
  accountName → account_name
  bankName → bank_code  // Convert bank name to code
  bvn → (separate endpoint) PUT /api/v1/profile/bvn
}
```

#### 5. Upload Documents
- **Endpoint**: `POST /api/v1/profile/upload` (multipart/form-data)
- **Files**:
```typescript
const formData = new FormData();
formData.append('nin', ninNumber);
formData.append('id_file', idFile);
formData.append('address_file', addressFile);
```

#### 6. Submit KYC
- **Endpoint**: `GET /api/v1/kyc/submit`
- **Call after all documents uploaded**

---

## 💰 Payment/Wallet Pages

### `/payments` (Payments Page)
**Component**: `app/payments/page.tsx`

**Related API Endpoints**:

#### 1. Get Wallet Info
- **Endpoint**: `GET /api/v1/wallets/:userId`
- **Use**: Display wallet balance, virtual account details
- **Call on page load**

#### 2. Get Transactions (Not in API)
- **Status**: ⚠️ No endpoint for transaction history found
- **Current**: Using mock data in `app/payments/_components/payments-data.ts`
- **Action**: Request transaction history endpoint from backend

#### 3. Fund Wallet
- **Endpoint**: `POST /api/v1/wallets/credit/initialize`
- **Component**: `app/payments/_components/payment-modals.tsx` (Fund Wallet Dialog)
- **Flow**:
```typescript
1. User enters amount
2. Call /wallets/credit/initialize
3. Get Paystack authorization_url from response
4. Redirect to Paystack: window.location.href = authorizationUrl
5. User completes payment on Paystack
6. Paystack redirects back with reference
7. Call /wallets/credit with reference to complete
```

#### 4. Withdraw
- **Endpoint**: `POST /api/v1/wallets/withdraw`
- **Component**: `app/payments/_components/payment-modals.tsx` (Withdrawal Dialog)
- **Body**:
```typescript
{
  amount: string
}
```

---

## 🎯 Campaign Pages

### `/campaigns` (Campaigns List Page)
**Component**: `app/campaigns/page.tsx`

**Related API Endpoints**:

#### 1. Get All Campaigns
- **Endpoint**: `GET /api/v1/campaigns`
- **Query Params**:
```typescript
{
  length?: number  // Items per page
  search?: string  // Search term
  status?: "open" | "closed"
}
```
- **Replace**: Mock data in `app/campaigns/_components/campaigns-data.ts`

#### 2. Get Campaign Summary
- **Endpoint**: `GET /api/v1/campaigns/summary`
- **Use**: Display stats cards
- **Component**: `app/campaigns/_components/campaigns-stats.tsx`

#### 3. Close Campaign
- **Endpoint**: `GET /api/v1/campaigns/close/:campaignId`
- **Component**: `app/campaigns/_components/close-challenge-dialog.tsx`

---

### `/campaigns/new` (Create Campaign Page)
**Component**: `app/campaigns/new/page.tsx`

**API Endpoint**: `POST /api/v1/campaigns`

**Form Data Mapping** (Multi-step form):
```typescript
// app/campaigns/new/_components/campaign-data.ts
// CampaignFormData → API Request

{
  // Step 1: Challenge Details
  name → campaign_name
  category → category
  platforms → social_media_platforms  // ["instagram", "tiktok"]
  endDate → end_date  // "YYYY-MM-DD"
  
  // Step 2: Reward Settings
  rewardAmount → reward_rate_amount  // "2"
  viewsThreshold → reward_rate_views  // "500"
  maxPayout → max_payout  // "2000"
  budget → challenge_pool  // "10000"
  
  // Step 3: Content Requirements
  contentType → content_type  // "video"
  requirements → content_requirement
  assetLinks → asset_links  // ["url1", "url2"]
  additionalNotes → additional_notes
  
  // Step 4: Payment (handled separately via wallet)
}
```

**Pre-submit Validation**:
```typescript
// Check wallet balance before submitting
const wallet = await fetch(`/api/v1/wallets/${userId}`);
if (wallet.balance < formData.budget) {
  // Show error or redirect to fund wallet
}
```

---

### `/campaigns/challengemanagement/[id]` (Challenge Management Page)
**Component**: `app/campaigns/challengemanagement/[id]/page.tsx`

**Related API Endpoints**:

#### 1. Get Single Campaign (Not explicit)
- **Likely**: `GET /api/v1/campaigns/:id` (not in collection)
- **Alternative**: Filter from `GET /api/v1/campaigns` results
- **Use**: Display challenge details and stats

#### 2. Get Redemption Requests
- **Endpoint**: `GET /api/v1/campaigns/:campaignId/redemption-requests`
- **Use**: Display creator submissions requesting payout
- **Component**: `app/campaigns/challengemanagement/[id]/_components/creators-table-columns.tsx`

#### 3. Approve Redemption
- **Endpoint**: `GET /api/v1/challenges/approve-redemption/:redemptionId`
- **Component**: `app/campaigns/challengemanagement/[id]/_components/challenge-modals.tsx`

#### 4. Auto-Payout Feature
- **Status**: ⚠️ No API endpoint found for bulk auto-payout
- **Action**: Request from backend team

---

## 🏆 Challenge Pages (Creator Side)

### `/challenges` (Challenges List Page)
**Component**: `app/challenges/page.tsx`

**Related API Endpoints**:

#### 1. Get Available Challenges (Same as Get Campaigns)
- **Endpoint**: `GET /api/v1/campaigns`
- **Query**: `?status=open`
- **Use**: Display in "Explore" tab
- **Replace**: Mock data in `app/challenges/_components/challenges-data.ts`

#### 2. Get My Submissions
- **Endpoint**: `GET /api/v1/challenges/my-submissions`
- **Query Params**:
```typescript
{
  search?: string
  length?: number
  status?: string
}
```
- **Use**: Display in "My Submissions" tab

---

### `/challenges/join/[id]` (Join Challenge Page)
**Component**: `app/challenges/join/[id]/page.tsx`

**Related API Endpoints**:

#### 1. Get Challenge Details
- **Endpoint**: Needs `GET /api/v1/campaigns/:id` (not in collection)
- **Current**: Using mock data from `app/challenges/join/[id]/_components/challenge-data.ts`

#### 2. Join Challenge
- **Endpoint**: `POST /api/v1/challenges/:challengeId`
- **Component**: `app/challenges/join/[id]/_components/submission-form-view.tsx`
- **Body**:
```typescript
{
  social_media_links: ["url1", "url2"]
}
```

#### 3. Redeem Reward
- **Endpoint**: `GET /api/v1/challenges/redeem-reward/:challengeId`
- **Use**: After challenge closes and earnings > 0

---

## 📊 Dashboard Page

### `/dashboard` (Dashboard Page)
**Component**: `app/dashboard/page.tsx`

**Related API Endpoints**:

#### 1. Get Dashboard Stats
- **Status**: ⚠️ No single dashboard endpoint
- **Alternative**: Combine multiple endpoints:
  - `GET /api/v1/wallets/:userId` → Wallet balance
  - `GET /api/v1/campaigns/summary` → Campaign stats (for brands)
  - `GET /api/v1/challenges/my-submissions` → Challenge stats (for creators)

#### 2. Get Recent Challenges
- **Endpoint**: `GET /api/v1/challenges/my-submissions?length=5`
- **Component**: `app/dashboard/_components/recent-challenges.tsx`

#### 3. Wallet Operations
- **Same as Payments page**

---

## 🔧 Shared Components

### `components/shared/stat-card.tsx`
- Used across multiple pages
- Display data from various API endpoints
- No direct API integration needed

### `components/shared/search-input.tsx`
- Client-side search component
- Used with API query parameters

### `components/shared/pagination-controls.tsx`
- Works with API pagination metadata
- Uses `meta` object from paginated responses

---

## 🚨 Missing API Endpoints

These features exist in frontend but have no corresponding backend endpoint:

1. **Transaction History**
   - Frontend: `/payments` page transaction table
   - Needed: `GET /api/v1/transactions` or similar

2. **Single Campaign Details**
   - Frontend: Challenge management and join pages
   - Needed: `GET /api/v1/campaigns/:id`

3. **Social Media Profiles in User Profile**
   - Frontend: `social-media-form.tsx`
   - Needed: Update to `PUT /api/v1/profile/personal` or separate endpoint

4. **Dashboard Summary**
   - Frontend: Dashboard page
   - Needed: `GET /api/v1/dashboard/summary` combining wallet, campaigns, and earnings

5. **Auto-Payout for Creators**
   - Frontend: Auto-payout toggle in challenge management
   - Needed: `POST /api/v1/campaigns/:id/auto-payout`

6. **Get Countries List**
   - Frontend: Country dropdown in profile
   - Needed: `GET /api/v1/countries`

7. **Get Banks List**
   - Referenced in collection but no endpoint
   - Needed: `GET /api/v1/banks` or Paystack integration

---

## 📝 Integration Checklist

### Phase 1: Authentication ✅
- [ ] Create login page
- [ ] Create verify email page
- [ ] Integrate signup with `/auth/register`
- [ ] Integrate email verification with `/auth/verify-email`
- [ ] Integrate login with `/auth/login`
- [ ] Implement logout with `/auth/logout`
- [ ] Create auth context/state management
- [ ] Implement protected routes

### Phase 2: Profile Management
- [ ] Get current user profile data
- [ ] Integrate personal info form with `/profile/personal`
- [ ] Integrate BVN update with `/profile/bvn`
- [ ] Integrate bank details with `/profile/account`
- [ ] Implement document upload with `/profile/upload`
- [ ] Add KYC submission flow with `/kyc/submit`
- [ ] Handle social media (pending backend support)

### Phase 3: Wallet & Payments
- [ ] Integrate wallet balance with `/wallets/:userId`
- [ ] Implement Paystack funding flow
- [ ] Integrate withdrawal with `/wallets/withdraw`
- [ ] Request transaction history endpoint
- [ ] Display transaction list

### Phase 4: Campaigns (Brand)
- [ ] Replace mock campaigns with API data
- [ ] Integrate campaign creation with `/campaigns` POST
- [ ] Get campaign summary stats
- [ ] Implement close campaign functionality
- [ ] Show redemption requests per campaign
- [ ] Approve/reject redemptions

### Phase 5: Challenges (Creator)
- [ ] Show available challenges from campaigns API
- [ ] Integrate join challenge flow
- [ ] Display my submissions from API
- [ ] Implement redeem reward functionality
- [ ] Track earnings and views

### Phase 6: Dashboard
- [ ] Aggregate stats from multiple endpoints
- [ ] Display recent activities
- [ ] Show wallet overview
- [ ] Quick actions integration

### Phase 7: Polish
- [ ] Error handling for all API calls
- [ ] Loading states
- [ ] Success/failure notifications
- [ ] Retry logic for failed requests
- [ ] Offline handling
- [ ] API response caching where appropriate

---

## 🛠️ Recommended API Service Structure

Create a centralized API service:

```typescript
// lib/api/client.ts
import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Add auth token to requests
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle token expiry
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Redirect to login
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default apiClient;
```

```typescript
// lib/api/services/auth.service.ts
import apiClient from '../client';

export const authService = {
  register: (data) => apiClient.post('/auth/register', data),
  login: (data) => apiClient.post('/auth/login', data),
  verifyEmail: (data) => apiClient.post('/auth/verify-email', data),
  logout: () => apiClient.post('/auth/logout'),
  // ... more methods
};
```

Similar structure for:
- `profile.service.ts`
- `wallet.service.ts`
- `campaign.service.ts`
- `challenge.service.ts`

---

## 🎯 Next Immediate Steps

1. **Create API service layer** following structure above
2. **Implement authentication flow** (login, signup, verify)
3. **Set up protected routes** using Next.js middleware
4. **Replace mock data** with real API calls starting with campaigns
5. **Test each integration** thoroughly before moving to next

