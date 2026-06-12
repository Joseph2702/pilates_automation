# 🆘 Jenkins API 404 Error - Troubleshooting Guide

## Quick Diagnostic Checklist

When you see `AxiosError: Request failed with status code 404` in Jenkins:

### ✅ Step 1: Check Jenkins Console Output
Look for the "Configuration Check" section:
```
📋 Configuration Check:
  BASE_URL: https://your-ngrok-url.ngrok-free.dev
  API_BASE_URL: https://your-ngrok-url.ngrok-free.dev/api
  ADMIN_EMAIL: admin@pilates.com
  CI: true
```

**If values look wrong**: The Jenkinsfile parameters are incorrect

### ✅ Step 2: Verify Health Check Passed
Before API tests run, you should see:
```
✅ App is alive! (HTTP 200)
```

**If this fails**: Your app isn't running or URL is wrong

### ✅ Step 3: Check BASE_URL Format
The URL MUST be correct:
- ✅ `https://your-url.ngrok-free.dev/` (with trailing slash)
- ❌ `https://your-url.ngrok-free.dev` (missing trailing slash)
- ❌ `http://localhost:8000` (Jenkins can't reach localhost)

### ✅ Step 4: Verify API Server Response
In Jenkins console, add manual test:
```bash
curl -v https://your-ngrok-url.ngrok-free.dev/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@pilates.com","password":"admin123"}'
```

Should return JSON response, NOT 404.

## Common Causes & Fixes

### ❌ Problem: "404 on all endpoints"
**Likely Cause**: BASE_URL points to wrong server or app isn't running

**Fix**:
1. Verify app is running: `php artisan serve`
2. Check ngrok is active: `ngrok http 8000`
3. Copy exact ngrok URL from ngrok terminal
4. Paste into Jenkins build parameter
5. Re-run build

### ❌ Problem: "404 only on /api/ endpoints"
**Likely Cause**: API_BASE_URL is wrong or routes not registered

**Fix**:
1. Check Laravel routes: `php artisan route:list | grep auth`
2. Verify routes exist: Should see `/api/auth/login`, `/api/auth/register`
3. Clear route cache: `php artisan route:clear`
4. Re-run tests

### ❌ Problem: "Some tests pass, some fail"
**Likely Cause**: Intermittent app/network issues

**Fix**:
1. Check app logs: `tail -f storage/logs/laravel.log`
2. Verify database is accessible
3. Check if test data exists (test users)
4. Increase timeout values if needed

### ❌ Problem: ".env.test file not found"
**This should NOT cause failures anymore** (we fixed it), but if you see this:

**Fix**:
- It's OK if `.env.test` doesn't exist
- Jenkins should use Jenkinsfile environment variables
- If tests still fail, check Jenkinsfile environment block

## Debug Mode

Enable verbose logging:

### Option 1: Set DEBUG in Jenkinsfile
```groovy
environment {
    DEBUG = 'true'
    // ... other vars
}
```

### Option 2: Add debug output before tests
```bash
echo "Checking API endpoint:"
curl -v "${API_BASE_URL}/auth/login"
```

### Option 3: Check BaseClient configuration
In tests, you can log the actual URL being used:
```typescript
console.log('API Base URL:', apiConfig.baseURL);
```

## Network Issues (ngrok)

If you keep losing connection to ngrok:

### Check ngrok status
```bash
curl https://api.ngrok.com/api/tunnels
```

### Restart ngrok
```bash
# Kill old process
pkill ngrok

# Start fresh
ngrok http 8000

# Copy new URL from terminal
```

### ngrok URL expires
By default, ngrok free URLs are valid for 2 hours. After that, you get a new URL.

**Solution**: 
- Check ngrok terminal for new URL
- Update Jenkins build parameter with new URL
- Re-run test

## Environment Variables Reference

| Variable | Set In | Example | Purpose |
|----------|--------|---------|---------|
| `BASE_URL` | Jenkinsfile parameter | `https://abc123.ngrok-free.dev/` | App homepage URL |
| `API_BASE_URL` | Jenkinsfile auto-generated | `${BASE_URL}/api` | API endpoint base |
| `ADMIN_EMAIL` | Jenkinsfile environment | `admin@pilates.com` | Test user email |
| `ADMIN_PASSWORD` | Jenkinsfile environment | `admin123` | Test user password |
| `CI` | Jenkinsfile environment | `true` | Signals we're in CI mode |

## Testing Endpoints Manually

Before running full test suite, verify endpoints work:

### Register endpoint
```bash
curl -X POST https://your-url/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "testuser@test.com",
    "password": "password123",
    "password_confirmation": "password123",
    "phone": "081234567890"
  }'
```

### Login endpoint
```bash
curl -X POST https://your-url/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@pilates.com",
    "password": "admin123"
  }'
```

Both should return JSON with `success: true` and `data.token`, NOT 404.

## Logs to Check

### 1. Jenkins Console Output
- Location: Jenkins > Job > Build #X > Console Output
- Shows: Stage execution, environment variables, test output
- Useful for: Tracking where tests fail

### 2. Playwright Report
- Location: Jenkins > Build > Allure Report
- Shows: Test results, failure details, screenshots
- Useful for: Understanding why specific test failed

### 3. Laravel App Logs
- Location: `storage/logs/laravel.log` on your app server
- Shows: API errors, database issues, exceptions
- Useful for: Debugging API-side problems

### 4. ngrok Logs
- Location: ngrok terminal window
- Shows: HTTP requests tunneled through ngrok
- Useful for: Verifying requests reach your app

## Still Having Issues?

### Collect debug info:

1. **Jenkins console output** (full)
2. **Allure Report** (test failure details)
3. **laravel.log** (app errors)
4. **ngrok terminal** (connection logs)
5. **Exact error message** (from test output)

Then check the [CI_CD_DEBUG_FIX.md](./CI_CD_DEBUG_FIX.md) document for detailed explanation of the fix.

---

**Remember**: The most common issue is that `BASE_URL` in Jenkins doesn't match where the app is actually running.
