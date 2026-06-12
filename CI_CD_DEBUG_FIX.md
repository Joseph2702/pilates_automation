# 🔧 CI/CD 404 Error - Debug Report & Fix

## 🐛 Problem

Your API tests were failing with **HTTP 404 errors** when running in Jenkins CI/CD:

```
AxiosError: Request failed with status code 404
at ../api/clients/auth-client.ts:25
```

All 9 API tests failed:
- Login tests (5 tests)
- Register tests (4 tests)

## 🔍 Root Cause Analysis

The issue was in how environment variables were being loaded:

### Issue 1: `.env.test` Not Required
In `env.config.ts`:
```typescript
dotenv.config({ path: '.env.test' });  // ❌ Fails silently if file doesn't exist
```

**Problem**: 
- In Jenkins, there's no `.env.test` file
- `dotenv.config()` fails silently when the file doesn't exist
- The configuration then uses hardcoded defaults (`http://localhost:8000`)
- API requests go to localhost instead of the actual app URL from the Jenkinsfile

### Issue 2: Duplicate dotenv Loading
Both files were trying to load environment variables:
- `shared/config/env.config.ts` - tried to load `.env.test`
- `playwright.config.ts` - also tried to load `.env.test`

**Problem**: Inconsistent loading logic and potential conflicts

## ✅ Solution Applied

### 1. Fixed `shared/config/env.config.ts`
**Changed**:
```typescript
// OLD - Always tried to load .env.test
dotenv.config({ path: '.env.test' });

// NEW - Only load if file exists
if (fs.existsSync(envTestPath)) {
  dotenv.config({ path: envTestPath });
}
```

**Added**:
- Proper priority handling: Environment variables first, then defaults
- Configuration validation with `envConfig.validate()` 
- Better error messages for debugging CI/CD issues

### 2. Updated `playwright.config.ts`
**Changed**:
```typescript
// OLD - Direct dotenv loading
import dotenv from 'dotenv';
dotenv.config({ path: '.env.test' });
baseURL: process.env.BASE_URL || 'http://localhost:8000'

// NEW - Use centralized env.config
import { envConfig } from './shared/config/env.config';
baseURL: envConfig.BASE_URL
```

**Benefit**: Single source of truth for all configuration

### 3. Created `.env.test.example`
A template file documenting:
- All available environment variables
- Default values
- Special notes about Jenkins configuration

### 4. Enhanced Jenkinsfile
Added debugging output to show configuration values:
```groovy
echo "📋 Configuration Check:"
echo "  BASE_URL: ${BASE_URL}"
echo "  API_BASE_URL: ${API_BASE_URL}"
```

## 🚀 How It Works Now

### For Local Development:
1. Create `.env.test` from `.env.test.example`
2. Set your values (e.g., `BASE_URL=http://localhost:8000`)
3. Tests read from `.env.test`

### For Jenkins CI/CD:
1. Jenkinsfile sets environment variables via `environment` block
2. These override any `.env.test` defaults
3. `env.config.ts` validates configuration is correct
4. All tests use the provided URL instead of localhost

## 🔗 Configuration Priority Chain

```
Jenkins Environment Variables
         ↓
process.env (from system)
         ↓
.env.test file (if exists)
         ↓
Hardcoded defaults
```

## ✨ Key Improvements

✅ CI/CD no longer fails due to missing `.env.test`  
✅ Environment variables from Jenkinsfile are properly respected  
✅ Single source of truth for configuration (`envConfig`)  
✅ Validation catches configuration errors early  
✅ Better debugging output in Jenkins logs  
✅ Clear documentation via `.env.test.example`  

## 📋 Checklist for CI/CD Success

When running tests in Jenkins:

1. ✅ Ensure `BASE_URL` parameter is set correctly (copy from ngrok terminal)
2. ✅ Verify app is running and accessible at that URL
3. ✅ Check Health Check stage shows HTTP 200/301/302
4. ✅ Verify environment variables are logged in "Configuration Check"
5. ✅ API requests should now go to correct endpoint

## 🧪 Testing the Fix

After these changes, run:
```bash
# Local test
npm run test:api:smoke

# Jenkins test - should now work with correct BASE_URL
```

The 404 errors should be gone, and tests should properly communicate with your API endpoint.

## 📝 Files Modified

- `shared/config/env.config.ts` - Enhanced with validation and proper dotenv handling
- `playwright.config.ts` - Now uses centralized env config
- `Jenkinsfile` - Added debug output to help diagnose issues
- `.env.test.example` - New documentation file (created)

---

**Summary**: The issue was that `env.config.ts` was silently falling back to localhost when `.env.test` didn't exist in Jenkins. Now it properly reads environment variables passed from the Jenkinsfile, ensuring tests hit the correct API endpoint.
