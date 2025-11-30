import { useEffect } from 'react';
import { useRouter } from 'next/router';

export const useAuthRedirect = () => {
  const router = useRouter();

  const checkAuthAndRedirect = async () => {
    try {
      const res = await fetch('/api/auth/me', { credentials: 'include' });
      
      if (!res.ok) {
        // Not authenticated, redirect to login
        if (router.pathname !== '/create-acc') {
          router.replace('/create-acc');
        }
        return { user: null, needsInterests: false };
      }

      const { user } = await res.json();
      
      // Check if user needs to complete interests
      const needsInterests = !user.interests || user.interests.length === 0;
      
      if (needsInterests && router.pathname !== '/create-acc') {
        router.replace('/create-acc');
        return { user, needsInterests: true };
      }

      // If user has completed onboarding but is on create-acc page, redirect to main
      if (!needsInterests && router.pathname === '/create-acc') {
        router.replace('/main-page');
        return { user, needsInterests: false };
      }

      return { user, needsInterests };
    } catch (error) {
      console.error('Auth check error:', error);
      if (router.pathname !== '/create-acc') {
        router.replace('/create-acc');
      }
      return { user: null, needsInterests: false };
    }
  };

  return checkAuthAndRedirect;
};
