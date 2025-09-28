# Google OAuth Integration

This document explains the Google OAuth integration added to the AI Content Manager application.

## Overview

The application now supports Google OAuth login alongside the existing email/password authentication system. Users can sign in using their Google account without creating a separate account.

## Implementation

### Frontend Components

1. **Login Component** (`src/pages/Login.tsx`)

   - Added Google login button with proper styling
   - Handles Google OAuth initiation
   - Shows loading state during authentication

2. **Google Callback Component** (`src/pages/GoogleCallback.tsx`)

   - Handles the OAuth callback from Google
   - Processes authorization code
   - Manages authentication success/failure states
   - Redirects users appropriately

3. **Auth API** (`src/lib/auth.ts`)
   - `initiateGoogleLogin()`: Redirects to Google OAuth endpoint
   - `handleGoogleCallback()`: Processes OAuth callback
   - `refreshToken()`: Handles token refresh
   - `logoutUser()`: Enhanced logout with API call

### Routes

- `/auth/google/callback` - Handles Google OAuth callback

### Backend API Endpoints

The frontend integrates with these backend endpoints:

```
GET  /api/v1/auth/google              - Start Google OAuth
POST /api/v1/auth/login               - Regular login
POST /api/v1/auth/register            - User registration
POST /api/v1/auth/refresh-token       - Refresh access token
POST /api/v1/auth/logout              - Logout user
GET  /api/v1/auth/profile             - Get user profile
```

### Callback URLs

The backend redirects to:

- `/auth/callback?token=...&user=...` - Actual implementation with token and user data

## User Flow

### Google OAuth Login Flow (Actual Implementation)

1. User clicks "Google" button on login page
2. Frontend calls `authAPI.initiateGoogleLogin()`
3. User is redirected to Google OAuth consent screen (`/api/v1/auth/google`)
4. After consent, backend processes OAuth and redirects to `/auth/callback?token=...&user=...`
5. `AuthCallback` component processes the callback with token and user data
6. Frontend parses URL parameters and stores authentication data
7. User is logged in and redirected to dashboard

### Regular Login Flow (Unchanged)

1. User enters email/password
2. Frontend calls `authAPI.login(credentials)`
3. Backend validates credentials and returns tokens
4. Frontend stores tokens and redirects to dashboard

## Security Features

- OAuth state parameter for CSRF protection
- Secure token storage in localStorage
- Automatic token refresh capability
- Proper error handling and fallbacks
- Server-side logout for token invalidation

## Error Handling

- Network errors during OAuth flow
- Invalid or expired authorization codes
- User cancellation of OAuth consent
- Backend authentication failures
- Graceful fallback to local logout if API fails

## Benefits

1. **Improved UX**: One-click login with Google account
2. **Security**: Leverages Google's robust authentication
3. **Reduced Friction**: No need to remember another password
4. **Compatibility**: Works alongside existing authentication
5. **Scalability**: Easy to add more OAuth providers (LinkedIn, etc.)

## Future Enhancements

- Add LinkedIn OAuth (button already exists in UI)
- Implement account linking for users with both email and OAuth accounts
- Add social profile data import
- Enhanced error messages and user feedback
