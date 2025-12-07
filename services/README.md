# Services Layer Documentation

This folder contains all API service integrations, organized by feature.

## 📁 Folder Structure

```
services/
├── core/
│   └── apiClient.ts          # Axios instance with interceptors
├── auth/
│   ├── types.ts              # TypeScript types/interfaces
│   ├── api.ts                # API functions (axios calls)
│   ├── queries.ts            # React Query hooks (useMutation, useQuery)
│   └── index.ts              # Barrel export
├── profile/
│   ├── types.ts
│   ├── api.ts
│   ├── queries.ts
│   └── index.ts
├── wallet/
│   ├── types.ts
│   ├── api.ts
│   ├── queries.ts
│   └── index.ts
├── campaign/
│   ├── types.ts
│   ├── api.ts
│   ├── queries.ts
│   └── index.ts
└── challenge/
    ├── types.ts
    ├── api.ts
    ├── queries.ts
    └── index.ts
```

## 🎯 Service Architecture

Each service folder follows a consistent pattern:

### 1. `types.ts`
Defines all TypeScript interfaces and types for:
- API request payloads
- API response structures
- Domain models
- Enums and constants

**Example:**
```typescript
export interface LoginRequest {
  email: string
  password: string
}

export interface LoginResponse {
  access_token: string
  user: User
}
```

### 2. `api.ts`
Contains raw API functions using axios:
- Pure functions that make HTTP calls
- No React dependencies
- Can be used outside React components
- Uses `apiClient` from `core/`

**Example:**
```typescript
export const authApi = {
  login: async (data: LoginRequest) => {
    const response = await apiClient.post('/auth/login', data)
    return response.data
  }
}
```

### 3. `queries.ts`
React Query hooks wrapping API functions:
- `useMutation` for POST/PUT/DELETE operations
- `useQuery` for GET operations
- Handles loading states, caching, refetching
- Side effects (redirects, toast notifications)

**Example:**
```typescript
export const useLogin = () => {
  return useMutation({
    mutationFn: (data: LoginRequest) => authApi.login(data),
    onSuccess: (response) => {
      router.push('/dashboard')
    }
  })
}
```

### 4. `index.ts`
Barrel export for clean imports:
```typescript
export * from './types'
export * from './api'
export * from './queries'
```

## 🚀 Usage Examples

### In React Components

```typescript
import { useLogin, LoginRequest } from '@/services/auth'

function LoginForm() {
  const { mutate: login, isPending, error } = useLogin()

  const handleSubmit = (data: LoginRequest) => {
    login(data)
  }

  return (
    // Your form JSX
  )
}
```

### Outside React (API functions)

```typescript
import { authApi } from '@/services/auth'

// In a server action, middleware, or utility
async function checkAuth() {
  const user = authApi.getCurrentUser()
  return user
}
```

## 🔑 Core API Client

The `core/apiClient.ts` provides a configured axios instance:

### Features:
- ✅ Automatic token injection
- ✅ Response/request interceptors
- ✅ Error handling (401, 403, 422, 500, etc.)
- ✅ Automatic redirect on auth failure
- ✅ Base URL configuration
- ✅ Timeout handling

### Configuration:

**Environment Variables:**
```env
NEXT_PUBLIC_API_BASE_URL=https://api.ripplepro.com/api/v1
```

## 📝 Creating a New Service

Follow these steps to add a new service:

### 1. Create folder structure
```bash
mkdir -p services/feature-name
touch services/feature-name/{types.ts,api.ts,queries.ts,index.ts}
```

### 2. Define types (`types.ts`)
```typescript
export interface FeatureRequest {
  // request payload
}

export interface FeatureResponse {
  // response structure
}
```

### 3. Create API functions (`api.ts`)
```typescript
import apiClient from '../core/apiClient'

export const featureApi = {
  getItems: async () => {
    const response = await apiClient.get('/feature')
    return response.data
  },
  
  createItem: async (data: FeatureRequest) => {
    const response = await apiClient.post('/feature', data)
    return response.data
  }
}
```

### 4. Create React Query hooks (`queries.ts`)
```typescript
import { useQuery, useMutation } from '@tanstack/react-query'
import { featureApi } from './api'

export const featureKeys = {
  all: ['feature'] as const,
  lists: () => [...featureKeys.all, 'list'] as const,
  detail: (id: string) => [...featureKeys.all, 'detail', id] as const,
}

export const useFeatureList = () => {
  return useQuery({
    queryKey: featureKeys.lists(),
    queryFn: () => featureApi.getItems(),
  })
}

export const useCreateFeature = () => {
  return useMutation({
    mutationFn: (data: FeatureRequest) => featureApi.createItem(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: featureKeys.lists() })
    },
  })
}
```

### 5. Export everything (`index.ts`)
```typescript
export * from './types'
export * from './api'
export * from './queries'
```

## 🎨 Naming Conventions

### Files:
- `types.ts` - TypeScript definitions
- `api.ts` - API functions
- `queries.ts` - React Query hooks
- `index.ts` - Barrel exports

### Variables:
- API object: `featureApi` (e.g., `authApi`, `campaignApi`)
- Query keys: `featureKeys` (e.g., `authKeys`, `campaignKeys`)
- Hooks: `useFeatureName` (e.g., `useLogin`, `useCampaigns`)
- Types: `PascalCase` (e.g., `LoginRequest`, `User`)

## ⚡ React Query Best Practices

### Query Keys
Always use factory functions for consistency:
```typescript
export const campaignKeys = {
  all: ['campaign'] as const,
  lists: () => [...campaignKeys.all, 'list'] as const,
  list: (filters: string) => [...campaignKeys.all, 'list', filters] as const,
  details: () => [...campaignKeys.all, 'detail'] as const,
  detail: (id: string) => [...campaignKeys.all, 'detail', id] as const,
}
```

### Mutations with Invalidation
```typescript
const { mutate } = useMutation({
  mutationFn: createCampaign,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: campaignKeys.lists() })
  }
})
```

### Error Handling
```typescript
const { mutate, error } = useMutation({
  mutationFn: login,
  onError: (error) => {
    toast.error(error.message)
  }
})
```

## 🔒 Authentication Flow

1. User logs in → `useLogin()` mutation
2. Token stored in localStorage (in `api.ts`)
3. Token automatically added to all requests (in `apiClient.ts`)
4. On 401 error → Clear token, redirect to login (in `apiClient.ts`)
5. On logout → Clear token, clear queries, redirect (in `queries.ts`)

## 📊 Current Services Status

- ✅ **auth** - Complete (register, login, verify, logout)
- ⏳ **profile** - To be implemented
- ⏳ **wallet** - To be implemented
- ⏳ **campaign** - To be implemented
- ⏳ **challenge** - To be implemented

## 🛠️ Development Tips

1. **Test API functions first** before creating hooks
2. **Use TypeScript strictly** - define all types
3. **Handle errors gracefully** - show user-friendly messages
4. **Invalidate queries** after mutations to refresh data
5. **Use optimistic updates** for better UX when appropriate
6. **Cache strategically** - set appropriate `staleTime` and `gcTime`
7. **Keep API functions pure** - no side effects in `api.ts`
8. **Put side effects in hooks** - redirects, toasts in `queries.ts`

## 📚 Resources

- [TanStack Query Docs](https://tanstack.com/query/latest)
- [Axios Documentation](https://axios-http.com/)
- [API Endpoints Reference](../API_ENDPOINTS.md)
- [Frontend API Mapping](../FRONTEND_API_MAPPING.md)

