import { ref } from 'vue';

export interface GoogleAuthResponse {
  credential: string;
  select_by: string;
}

export interface BackendAuthResponse {
  data: {
    api_token: string;
    refresh_token: string;
    token: string;
    user: {
      profile_set: boolean;
      [key: string]: any;
    };
  };
}

export const useGoogleAuth = () => {
  const loading = ref(false);
  const error = ref('');
  const config = useRuntimeConfig();
  const toast = useToast();

  const signInWithGoogle = async (): Promise<boolean> => {
    loading.value = true;
    error.value = '';

    try {
      if (!config.public.GOOGLE_CLIENT_ID) {
        throw new Error('Google Client ID not configured');
      }

      // For now, we'll implement a placeholder for Google Sign-In
      // In production, you'd integrate with Google's JavaScript SDK
      console.log('Google Sign-In would be triggered here');
      
      // This is a placeholder - you'll need to implement actual Google OAuth flow
      // The credential would come from Google's response
      const mockCredential = 'google-jwt-token-from-oauth-flow';

      // Send the Google credential to your backend
      const authResponse = await $fetch<BackendAuthResponse>(`${config.public.BASE_URL}/auth/google`, {
        method: 'POST',
        body: {
          credential: mockCredential,
        },
      });

      if (authResponse?.data) {
        // Store auth tokens similar to your existing OTP flow
        const apiToken = useCookie('api_token');
        const refreshToken = useCookie('refresh_token');
        const token = useCookie('token');
        const user = useCookie('user');

        apiToken.value = authResponse.data.api_token;
        refreshToken.value = authResponse.data.refresh_token;
        token.value = authResponse.data.token;
        user.value = JSON.stringify(authResponse.data.user);

        toast.add({
          title: 'Successfully signed in with Google',
          color: 'success',
        });

        // Redirect based on profile status
        const userObj = authResponse.data.user;
        if (userObj && userObj.profile_set === false) {
          await navigateTo('/set-profile');
        } else {
          await navigateTo('/dashboard');
        }

        return true;
      }

      throw new Error('Invalid response from server');
    } catch (err: any) {
      error.value = err.message || 'Google sign-in failed';
      toast.add({
        title: 'Google sign-in failed',
        description: error.value,
        color: 'error',
      });
      return false;
    } finally {
      loading.value = false;
    }
  };

  const signOut = async () => {
    try {
      // Clear cookies
      const apiToken = useCookie('api_token');
      const refreshToken = useCookie('refresh_token');
      const token = useCookie('token');
      const user = useCookie('user');

      apiToken.value = null;
      refreshToken.value = null;
      token.value = null;
      user.value = null;

      await navigateTo('/login');
    } catch (err) {
      console.error('Sign out error:', err);
    }
  };

  return {
    loading: readonly(loading),
    error: readonly(error),
    signInWithGoogle,
    signOut,
  };
};