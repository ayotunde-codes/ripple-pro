# RipplePro Setup Guide

Complete guide to set up and use the RipplePro application.

---

## 📦 Installation

### 1. Install Dependencies

```bash
npm install
```

This will install:
- `axios` - HTTP client for API calls
- `@tanstack/react-query` - Data fetching and caching
- `@tanstack/react-query-devtools` - Development tools for React Query
- All other existing dependencies

### 2. Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_API_BASE_URL=https://ripple-pro.onrender.com/api/v1
```

**Note**: This is your production API URL. For local development, use `http://localhost:8000/api/v1` if running backend locally.

### 3. Start Development Server

```bash
npm run dev
```

---

## 🏗️ Project Structure

```
ripple-pro/
├── app/                      # Next.js app directory
│   ├── (pages)/             # All your pages
│   └── layout.tsx           # Root layout with providers
│
├── services/                 # API integration layer ⭐ NEW
│   ├── core/
│   │   └── apiClient.ts     # Configured axios instance
│   ├── auth/                # Authentication service
│   ├── profile/             # Profile & KYC service
│   ├── wallet/              # Wallet & payments service
│   ├── campaign/            # Campaign management
│   ├── challenge/           # Challenge participation
│   └── README.md            # Services documentation
│
├── providers/               # React providers ⭐ NEW
│   ├── query-provider.tsx   # React Query setup
│   └── index.tsx            # Combined providers
│
├── components/              # Reusable UI components
│   ├── ui/                  # shadcn/ui components
│   └── shared/              # Shared app components
│
└── .env.local              # Environment variables ⭐ NEW
```

---

## 🚀 Using the Services

### Basic Usage in Components

```typescript
import { useLogin, useCampaigns, useWallet } from '@/services'

function MyComponent() {
  // Mutations (POST, PUT, DELETE)
  const { mutate: login, isPending, error } = useLogin()
  
  // Queries (GET)
  const { data: campaigns, isLoading } = useCampaigns({ status: 'open' })
  const { data: wallet } = useWallet(userId)

  const handleLogin = (credentials) => {
    login(credentials)  // Auto-redirects on success!
  }

  if (isLoading) return <div>Loading...</div>

  return <div>{/* Your UI */}</div>
}
```

### Available Services

#### 1. Authentication (`@/services/auth`)

```typescript
import { 
  useLogin, 
  useRegister, 
  useVerifyEmail,
  useLogout,
  useCurrentUser 
} from '@/services/auth'

// Login
const { mutate: login } = useLogin()
login({ email, password })

// Register
const { mutate: register } = useRegister()
register({ first_name, last_name, email, role, password, password_confirmation })

// Get current user
const { data: user } = useCurrentUser()
```

#### 2. Profile (`@/services/profile`)

```typescript
import { 
  useUpdatePersonalInfo,
  useUpdateBVN,
  useUpdateAccount,
  useUploadDocuments,
  useSubmitKYC 
} from '@/services/profile'

// Update profile
const { mutate: updateProfile } = useUpdatePersonalInfo()
updateProfile({ first_name, last_name, phone_number, dob, country_id })

// Upload KYC documents
const { mutate: uploadDocs } = useUploadDocuments()
uploadDocs({ nin, id_file, address_file })
```

#### 3. Wallet (`@/services/wallet`)

```typescript
import { 
  useWallet,
  useInitializeFunding,
  useWithdraw 
} from '@/services/wallet'

// Get wallet balance
const { data: wallet } = useWallet(userId)
console.log(wallet?.data.balance)

// Fund wallet (Paystack)
const { mutate: fundWallet } = useInitializeFunding()
fundWallet({ amount: 5000 })  // Redirects to Paystack

// Withdraw
const { mutate: withdraw } = useWithdraw()
withdraw({ amount: "1000" })
```

#### 4. Campaigns (`@/services/campaign`)

```typescript
import { 
  useCampaigns,
  useCreateCampaign,
  useCampaignSummary,
  useCloseCampaign,
  useRedemptionRequests 
} from '@/services/campaign'

// Get all campaigns
const { data: campaigns } = useCampaigns({ 
  status: 'open',
  search: 'fashion',
  length: 10 
})

// Create campaign
const { mutate: createCampaign } = useCreateCampaign()
createCampaign({
  campaign_name: "My Campaign",
  category: "fashion",
  challenge_pool: "10000",
  // ... other fields
})

// Get summary stats
const { data: summary } = useCampaignSummary()
```

#### 5. Challenges (`@/services/challenge`)

```typescript
import { 
  useMySubmissions,
  useJoinChallenge,
  useRedeemReward 
} from '@/services/challenge'

// Get my submissions
const { data: submissions } = useMySubmissions({ status: 'open' })

// Join a challenge
const { mutate: joinChallenge } = useJoinChallenge()
joinChallenge({ 
  challengeId: 1, 
  data: { social_media_links: ['https://...'] } 
})

// Redeem reward
const { mutate: redeemReward } = useRedeemReward()
redeemReward(challengeId)
```

---

## 🎨 UI Components

### Loading States

All queries provide `isLoading` and `isPending` states:

```typescript
const { data, isLoading } = useCampaigns()

if (isLoading) {
  return <Skeleton /> // or your loading component
}

return <div>{/* Render data */}</div>
```

### Error Handling

```typescript
const { mutate, error, isError } = useLogin()

if (isError) {
  return <div>Error: {error.message}</div>
}
```

### Success Feedback

```typescript
import { toast } from "sonner"

const { mutate: createCampaign } = useCreateCampaign()

const handleSubmit = (data) => {
  createCampaign(data, {
    onSuccess: () => {
      toast.success("Campaign created successfully!")
    },
    onError: (error) => {
      toast.error(`Failed: ${error.message}`)
    }
  })
}
```

---

## 🔐 Authentication Flow

### 1. User Registration

```typescript
// On signup page
const { mutate: register } = useRegister()

register({
  first_name: "John",
  last_name: "Doe",
  email: "john@example.com",
  role: "creator", // or "brand"
  password: "password",
  password_confirmation: "password"
})
// Auto-redirects to verify-email page
```

### 2. Email Verification

```typescript
// On verify-email page
const { mutate: verifyEmail } = useVerifyEmail()

verifyEmail({
  email: "john@example.com",
  code: "123456"
})
// Auto-redirects to login page
```

### 3. Login

```typescript
// On login page
const { mutate: login } = useLogin()

login({
  email: "john@example.com",
  password: "password"
})
// Token stored automatically
// Auto-redirects to dashboard
```

### 4. Protected Routes

The API client automatically:
- Adds Bearer token to all requests
- Redirects to login on 401 (unauthorized)
- Clears token on logout

---

## 🔧 Advanced Usage

### Custom Query Options

```typescript
const { data, refetch } = useCampaigns(
  { status: 'open' },
  {
    staleTime: 1000 * 60 * 10, // 10 minutes
    enabled: !!userId, // Only run if userId exists
    onSuccess: (data) => {
      console.log('Campaigns loaded:', data)
    }
  }
)
```

### Manual API Calls (Outside React)

```typescript
import { authApi, campaignApi } from '@/services'

// In server actions, middleware, or utils
async function serverFunction() {
  const user = authApi.getCurrentUser()
  const campaigns = await campaignApi.getCampaigns({ status: 'open' })
  return campaigns
}
```

### Query Invalidation

```typescript
import { useQueryClient } from '@tanstack/react-query'
import { campaignKeys } from '@/services/campaign'

const queryClient = useQueryClient()

// After creating a campaign
queryClient.invalidateQueries({ queryKey: campaignKeys.lists() })
```

---

## 🐛 Debugging

### React Query Devtools

In development mode, React Query Devtools are automatically enabled.

**Access**: Look for the React Query logo in the bottom-left corner of your browser.

**Features**:
- View all queries and their states
- See cached data
- Manually refetch or invalidate queries
- Track mutation status

### API Client Errors

All errors are logged to the console with detailed information:

```
❌ API Error:
  Status: 422
  Message: Validation failed
  Data: { email: ["Email already exists"] }
```

---

## 📚 Additional Resources

- [API Endpoints Documentation](./API_ENDPOINTS.md)
- [Frontend API Mapping](./FRONTEND_API_MAPPING.md)
- [Services README](./services/README.md)
- [React Query Docs](https://tanstack.com/query/latest)
- [Axios Documentation](https://axios-http.com/)

---

## ✅ Next Steps

1. ✅ Dependencies installed
2. ✅ Environment variables configured
3. ✅ Development server running
4. 🔄 Start integrating services into your pages
5. 🔄 Replace mock data with real API calls
6. 🔄 Test authentication flow
7. 🔄 Test all CRUD operations

---

## 🆘 Troubleshooting

### Issue: "Module not found: axios"
**Solution**: Run `npm install`

### Issue: "useQuery is not defined"
**Solution**: Ensure you're importing from `@tanstack/react-query`, not `react-query`

### Issue: "API calls returning 401"
**Solution**: Check if token is stored in localStorage. Try logging in again.

### Issue: "CORS errors"
**Solution**: Ensure your backend API has CORS enabled for your frontend URL.

### Issue: "Environment variable not found"
**Solution**: 
- Check `.env.local` exists and has `NEXT_PUBLIC_` prefix
- Restart development server after adding/changing env vars

---

## 📞 Support

For issues or questions:
1. Check the documentation files
2. Review the services README
3. Check React Query docs for data fetching issues
4. Review the Postman collection for API details

