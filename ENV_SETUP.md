# Environment Variables Setup

## Create .env.local file

Create a file named `.env.local` in the project root with the following content:

```env
# API Configuration
NEXT_PUBLIC_API_BASE_URL=https://ripple-pro.onrender.com/api/v1

# Paystack Configuration (Optional)
NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY=your_paystack_public_key_here
```

## Important Notes

1. **File Location**: Place `.env.local` in the root directory (same level as `package.json`)

2. **Never Commit**: `.env.local` is already in `.gitignore` - never commit this file

3. **Restart Server**: After creating/modifying `.env.local`, restart your dev server:
   ```bash
   # Stop the server (Ctrl+C)
   npm run dev
   ```

4. **Production**: Use your hosting platform's environment variables settings for production

## API URL Information

**Production URL**: `https://ripple-pro.onrender.com/api/v1` (already configured above)

For different environments:
- **Local Development**: `http://localhost:8000/api/v1` (if running backend locally)
- **Production**: `https://ripple-pro.onrender.com/api/v1` (default)

## Verifying Setup

After creating `.env.local`, verify it's working:

```typescript
// In any component or page
console.log('API URL:', process.env.NEXT_PUBLIC_API_BASE_URL)
// Should output: https://ripple-pro.onrender.com/api/v1
```

If you see `undefined`, check:
1. File is named exactly `.env.local`
2. Variables start with `NEXT_PUBLIC_`
3. Dev server was restarted after creating the file

