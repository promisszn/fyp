# Google Authentication Integration Guide

This document outlines how Google authentication has been integrated into your surveying application and what steps are needed to complete the setup.

## Frontend Integration (✅ Complete)

### What's Been Implemented:

1. **Google Sign-In Button Component** (`app/components/GoogleSignInButton.vue`)
   - Custom button with Google branding
   - Handles Google Identity Services integration
   - Emits success/error events with credentials

2. **Google Auth Composable** (`app/composables/useGoogleAuth.ts`)
   - Reusable authentication logic
   - Handles token storage and user redirection
   - Error handling and loading states

3. **Updated Login Page** (`app/pages/login.vue`)
   - Added Google Sign-In option above email/OTP form
   - Maintains existing email/OTP flow as fallback
   - Proper error handling for both auth methods

4. **Google Identity Services Plugin** (`app/plugins/google-auth.client.ts`)
   - Loads Google's JavaScript SDK
   - Client-side only initialization

5. **Environment Configuration**
   - Added `GOOGLE_CLIENT_ID` to Nuxt runtime config
   - Environment example file created

## Backend Integration Required (❌ Pending)

### What Your Backend Needs to Implement:

1. **New API Endpoint: `POST /auth/google`**
   ```json
   {
     "credential": "eyJhbGciOiJSUzI1NiIsInR5..." // Google JWT token
   }
   ```

2. **Google JWT Verification**
   - Verify the JWT token signature using Google's public keys
   - Extract user information (email, name, etc.)
   - Create or find existing user account

3. **Response Format** (should match your existing `/auth/login` response):
   ```json
   {
     "data": {
       "api_token": "...",
       "refresh_token": "...",
       "token": "...",
       "user": {
         "profile_set": true/false,
         "email": "user@example.com",
         "name": "User Name",
         // ... other user fields
       }
     }
   }
   ```

## Setup Instructions

### 1. Google Cloud Console Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable the "Google+ API" or "Google Identity Services"
4. Go to "Credentials" → "Create Credentials" → "OAuth 2.0 Client IDs"
5. Configure OAuth consent screen
6. Add authorized JavaScript origins:
   - `http://localhost:4000` (development)
   - Your production domain
7. Copy the Client ID

### 2. Environment Configuration

1. Copy `.env.example` to `.env`
2. Add your Google Client ID:
   ```
   GOOGLE_CLIENT_ID=your-actual-client-id.apps.googleusercontent.com
   ```

### 3. Backend Implementation Example

Here's what your backend endpoint should look like (example in Node.js):

```javascript
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

app.post('/auth/google', async (req, res) => {
  try {
    const { credential } = req.body;
    
    // Verify the Google JWT token
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    
    const payload = ticket.getPayload();
    const { email, name, picture } = payload;
    
    // Find or create user in your database
    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({
        email,
        name,
        profile_picture: picture,
        profile_set: false, // or true if you auto-complete profile
      });
    }
    
    // Generate your app's tokens (same as email/OTP flow)
    const tokens = generateAuthTokens(user);
    
    res.json({
      data: {
        api_token: tokens.apiToken,
        refresh_token: tokens.refreshToken,
        token: tokens.accessToken,
        user: user,
      }
    });
  } catch (error) {
    res.status(400).json({ message: 'Invalid Google token' });
  }
});
```

## Testing the Integration

1. Set up environment variables
2. Implement backend endpoint
3. Start your development server: `npm run dev`
4. Go to `http://localhost:4000/login`
5. Click "Continue with Google"
6. Verify the authentication flow works

## Security Considerations

- Always verify Google JWT tokens server-side
- Never trust client-side token data
- Implement proper CSRF protection
- Use HTTPS in production
- Regularly rotate API keys

## Troubleshooting

- **"Google Client ID not configured"**: Check your `.env` file
- **"Invalid Google token"**: Verify backend JWT verification
- **Button not loading**: Check browser console for Google SDK errors
- **CORS issues**: Add your domain to Google Cloud Console authorized origins