import { useEffect } from 'react';
import { useRouter } from 'next/router';
import styles from './settings.module.css';

export default function SettingsPage() {
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch('/api/auth/me', {
          credentials: 'include'
        });

        if (!res.ok) {
          router.push('/create-acc');
          return;
        }

        const data = await res.json();
        
        // Check if user needs to complete interests
        if (!data.user.interests || data.user.interests.length === 0) {
          router.push('/create-acc');
          return;
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        router.push('/create-acc');
      }
    };

    checkAuth();
  }, [router]);

  return (
    <div className={styles.mainContainer}>
      <div className={styles.modalCard}>
        {/* Close Button */}
        <button 
          onClick={() => router.push('/user-profile')}
          className={styles.closeButton}
        >
          ×
        </button>

        {/* Header */}
        <div className={styles.modalHeader}>
          <div className={styles.logoIcon}></div>
          <span className={styles.logoText}>ConnectHub</span>
        </div>

        <div className={styles.modalContent}>
          <h1 className={styles.modalTitle}>Settings</h1>

          {/* Account Section */}
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Account</h2>
            <div className={styles.settingsList}>
              <button 
                onClick={() => router.push('/userprofile-setting/managecommunity')}
                className={`${styles.settingItem} ${styles.settingItemPink}`}
              >
                <div className={styles.iconContainer}>
                  <span>#</span>
                </div>
                <div className={styles.settingInfo}>
                  <div className={styles.settingTitle}>Community</div>
                  <div className={styles.settingDescription}>Manage your community</div>
                </div>
              </button>

              <button 
                onClick={() => router.push('/userprofile-setting/screentime')}
                className={`${styles.settingItem} ${styles.settingItemGreen}`}
              >
                <div className={styles.iconContainer}>
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className={styles.settingInfo}>
                  <div className={styles.settingTitle}>Screen Time Control</div>
                  <div className={styles.settingDescription}>Manage your screen time</div>
                </div>
              </button>

              <button 
                onClick={() => router.push('/userprofile-setting/changeaccount')}
                className={`${styles.settingItem} ${styles.settingItemBeige}`}
              >
                <div className={styles.iconContainer}>
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div className={styles.settingInfo}>
                  <div className={styles.settingTitle}>Account</div>
                  <div className={styles.settingDescription}>Manage your account, add another account, or logout</div>
                </div>
              </button>
            </div>
          </div>

          {/* Privacy Section */}
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Privacy</h2>
            <div className={styles.settingsList}>
              <button 
                onClick={() => router.push('/userprofile-setting/privacysettings')}
                className={`${styles.settingItem} ${styles.settingItemPurple}`}
              >
                <div className={styles.iconContainer}>
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <div className={styles.settingInfo}>
                  <div className={styles.settingTitle}>Privacy Settings</div>
                  <div className={styles.settingDescription}>Manage your privacy settings</div>
                </div>
              </button>

              <button 
                onClick={() => router.push('/userprofile-setting/interest')}
                className={`${styles.settingItem} ${styles.settingItemPeach}`}
              >
                <div className={styles.iconContainer}>
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                </div>
                <div className={styles.settingInfo}>
                  <div className={styles.settingTitle}>Interest</div>
                  <div className={styles.settingDescription}>Manage your interest</div>
                </div>
              </button>

              <button className={`${styles.settingItem} ${styles.settingItemBlue}`}>
                <div className={styles.iconContainer}>
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                  </svg>
                </div>
                <div className={styles.settingInfo}>
                  <div className={styles.settingTitle}>Mute & Block</div>
                  <div className={styles.settingDescription}>Manage the accounts and words that you've muted or blocked</div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}