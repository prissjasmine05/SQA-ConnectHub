'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from './privacysettings.module.css';

export default function PrivacySettingsPage() {
  const router = useRouter();
  const [profileVisibility, setProfileVisibility] = useState('public');
  const [friendRequests, setFriendRequests] = useState('everyone');
  const [activityStatus, setActivityStatus] = useState(false);
  const [messaging, setMessaging] = useState('everyone');

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
          onClick={() => router.push('/user-profile/settings')}
          className={styles.closeButton}
        >
          ✕
        </button>

        {/* Header */}
        <div className={styles.modalHeader}>
          <div className={styles.logoIcon}></div>
          <span className={styles.logoText}>ConnectHub</span>
        </div>

        {/* Content */}
        <div className={styles.modalContent}>
          <h1 className={styles.modalTitle}>Privacy Settings</h1>

          {/* Profile Visibility */}
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Profile Visibility</h2>
            
            <label className={styles.radioOption}>
              <input 
                type="radio"
                name="profileVisibility"
                value="public"
                checked={profileVisibility === 'public'}
                onChange={(e) => setProfileVisibility(e.target.value)}
                className={styles.radioInput}
              />
              <div className={styles.optionContent}>
                <div className={styles.optionTitle}>Public</div>
                <div className={styles.optionDescription}>Everyone can see your profile</div>
              </div>
              <div className={styles.radioCircle}></div>
            </label>

            <label className={styles.radioOption}>
              <input 
                type="radio"
                name="profileVisibility"
                value="friends"
                checked={profileVisibility === 'friends'}
                onChange={(e) => setProfileVisibility(e.target.value)}
                className={styles.radioInput}
              />
              <div className={styles.optionContent}>
                <div className={styles.optionTitle}>Friends Only</div>
                <div className={styles.optionDescription}>Only your friends can see your profile</div>
              </div>
              <div className={styles.radioCircle}></div>
            </label>

            <label className={styles.radioOption}>
              <input 
                type="radio"
                name="profileVisibility"
                value="private"
                checked={profileVisibility === 'private'}
                onChange={(e) => setProfileVisibility(e.target.value)}
                className={styles.radioInput}
              />
              <div className={styles.optionContent}>
                <div className={styles.optionTitle}>Private</div>
                <div className={styles.optionDescription}>Only you can see your profile</div>
              </div>
              <div className={styles.radioCircle}></div>
            </label>
          </div>

          {/* Friend Requests */}
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Friend Requests</h2>
            
            <label className={styles.radioOption}>
              <input 
                type="radio"
                name="friendRequests"
                value="everyone"
                checked={friendRequests === 'everyone'}
                onChange={(e) => setFriendRequests(e.target.value)}
                className={styles.radioInput}
              />
              <div className={styles.optionContent}>
                <div className={styles.optionTitle}>Everyone</div>
                <div className={styles.optionDescription}>Anyone can send you a friend request</div>
              </div>
              <div className={styles.radioCircle}></div>
            </label>

            <label className={styles.radioOption}>
              <input 
                type="radio"
                name="friendRequests"
                value="friends-of-friends"
                checked={friendRequests === 'friends-of-friends'}
                onChange={(e) => setFriendRequests(e.target.value)}
                className={styles.radioInput}
              />
              <div className={styles.optionContent}>
                <div className={styles.optionTitle}>Friends of Friends</div>
                <div className={styles.optionDescription}>Only friends of your friends can send you a friend request</div>
              </div>
              <div className={styles.radioCircle}></div>
            </label>

            <label className={styles.radioOption}>
              <input 
                type="radio"
                name="friendRequests"
                value="no-one"
                checked={friendRequests === 'no-one'}
                onChange={(e) => setFriendRequests(e.target.value)}
                className={styles.radioInput}
              />
              <div className={styles.optionContent}>
                <div className={styles.optionTitle}>No One</div>
                <div className={styles.optionDescription}>No one can send you a friend request</div>
              </div>
              <div className={styles.radioCircle}></div>
            </label>
          </div>

          {/* Activity Status */}
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Activity Status</h2>
            
            <label className={styles.toggleOption}>
              <input 
                type="checkbox"
                checked={activityStatus}
                onChange={(e) => setActivityStatus(e.target.checked)}
                className={styles.toggleInput}
              />
              <div className={styles.optionContent}>
                <div className={styles.optionTitle}>Activity Status</div>
                <div className={styles.optionDescription}>Show when you're active</div>
              </div>
              <div className={styles.toggleSwitch}></div>
            </label>
          </div>

          {/* Messaging */}
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Messaging</h2>
            
            <label className={styles.radioOption}>
              <input 
                type="radio"
                name="messaging"
                value="everyone"
                checked={messaging === 'everyone'}
                onChange={(e) => setMessaging(e.target.value)}
                className={styles.radioInput}
              />
              <div className={styles.optionContent}>
                <div className={styles.optionTitle}>Everyone</div>
                <div className={styles.optionDescription}>Anyone can message you</div>
              </div>
              <div className={styles.radioCircle}></div>
            </label>

            <label className={styles.radioOption}>
              <input 
                type="radio"
                name="messaging"
                value="friends"
                checked={messaging === 'friends'}
                onChange={(e) => setMessaging(e.target.value)}
                className={styles.radioInput}
              />
              <div className={styles.optionContent}>
                <div className={styles.optionTitle}>Friends Only</div>
                <div className={styles.optionDescription}>Only your friends can message you</div>
              </div>
              <div className={styles.radioCircle}></div>
            </label>

            <label className={styles.radioOption}>
              <input 
                type="radio"
                name="messaging"
                value="no-one"
                checked={messaging === 'no-one'}
                onChange={(e) => setMessaging(e.target.value)}
                className={styles.radioInput}
              />
              <div className={styles.optionContent}>
                <div className={styles.optionTitle}>No One</div>
                <div className={styles.optionDescription}>No one can message you</div>
              </div>
              <div className={styles.radioCircle}></div>
            </label>
          </div>

          {/* Save Button */}
          <div className={styles.buttonContainer}>
            <button 
              onClick={() => router.push('/user-profile/settings')}
              className={styles.saveButton}
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}