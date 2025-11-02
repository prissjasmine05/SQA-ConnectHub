'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './privacysettings.module.css';

export default function PrivacySettings() {
  const router = useRouter();
  
  const [profileVisibility, setProfileVisibility] = useState('public');
  const [friendRequests, setFriendRequests] = useState('everyone');
  const [activityStatus, setActivityStatus] = useState(true);
  const [messaging, setMessaging] = useState('everyone');

  const handleSaveChanges = () => {
    // Save settings logic here
    alert('Privacy settings saved successfully!');
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.modalCard}>
        {/* Close Button */}
        <button 
          onClick={() => router.push('/user-profile/settings')}
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
          <h1 className={styles.modalTitle}>Privacy Settings</h1>

          {/* Profile Visibility Section */}
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Profile Visibility</h2>
            
            <label className={styles.radioOption}>
              <div className={styles.optionContent}>
                <div className={styles.optionTitle}>Public</div>
                <div className={styles.optionDescription}>Everyone can see your profile</div>
              </div>
              <input
                type="radio"
                name="profileVisibility"
                value="public"
                checked={profileVisibility === 'public'}
                onChange={(e) => setProfileVisibility(e.target.value)}
                className={styles.radioInput}
              />
              <span className={styles.radioCircle}></span>
            </label>

            <label className={styles.radioOption}>
              <div className={styles.optionContent}>
                <div className={styles.optionTitle}>Friends Only</div>
                <div className={styles.optionDescription}>Only your friends can see your profile</div>
              </div>
              <input
                type="radio"
                name="profileVisibility"
                value="friends"
                checked={profileVisibility === 'friends'}
                onChange={(e) => setProfileVisibility(e.target.value)}
                className={styles.radioInput}
              />
              <span className={styles.radioCircle}></span>
            </label>

            <label className={styles.radioOption}>
              <div className={styles.optionContent}>
                <div className={styles.optionTitle}>Private</div>
                <div className={styles.optionDescription}>Only you can see your profile</div>
              </div>
              <input
                type="radio"
                name="profileVisibility"
                value="private"
                checked={profileVisibility === 'private'}
                onChange={(e) => setProfileVisibility(e.target.value)}
                className={styles.radioInput}
              />
              <span className={styles.radioCircle}></span>
            </label>
          </div>

          {/* Friend Requests Section */}
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Friend Requests</h2>
            
            <label className={styles.radioOption}>
              <div className={styles.optionContent}>
                <div className={styles.optionTitle}>Everyone</div>
                <div className={styles.optionDescription}>Anyone can send you a friend request</div>
              </div>
              <input
                type="radio"
                name="friendRequests"
                value="everyone"
                checked={friendRequests === 'everyone'}
                onChange={(e) => setFriendRequests(e.target.value)}
                className={styles.radioInput}
              />
              <span className={styles.radioCircle}></span>
            </label>

            <label className={styles.radioOption}>
              <div className={styles.optionContent}>
                <div className={styles.optionTitle}>Friends of Friends</div>
                <div className={styles.optionDescription}>Only friends of your friends can send you a friend request</div>
              </div>
              <input
                type="radio"
                name="friendRequests"
                value="friendsOfFriends"
                checked={friendRequests === 'friendsOfFriends'}
                onChange={(e) => setFriendRequests(e.target.value)}
                className={styles.radioInput}
              />
              <span className={styles.radioCircle}></span>
            </label>

            <label className={styles.radioOption}>
              <div className={styles.optionContent}>
                <div className={styles.optionTitle}>No One</div>
                <div className={styles.optionDescription}>No one can send you a friend request</div>
              </div>
              <input
                type="radio"
                name="friendRequests"
                value="noOne"
                checked={friendRequests === 'noOne'}
                onChange={(e) => setFriendRequests(e.target.value)}
                className={styles.radioInput}
              />
              <span className={styles.radioCircle}></span>
            </label>
          </div>

          {/* Activity Status Section */}
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Activity Status</h2>
            
            <label className={styles.toggleOption}>
              <div className={styles.optionContent}>
                <div className={styles.optionTitle}>Activity Status</div>
                <div className={styles.optionDescription}>Show when you're active</div>
              </div>
              <input
                type="checkbox"
                checked={activityStatus}
                onChange={(e) => setActivityStatus(e.target.checked)}
                className={styles.toggleInput}
              />
              <span className={styles.toggleSwitch}></span>
            </label>
          </div>

          {/* Messaging Section */}
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Messaging</h2>
            
            <label className={styles.radioOption}>
              <div className={styles.optionContent}>
                <div className={styles.optionTitle}>Everyone</div>
                <div className={styles.optionDescription}>Anyone can message you</div>
              </div>
              <input
                type="radio"
                name="messaging"
                value="everyone"
                checked={messaging === 'everyone'}
                onChange={(e) => setMessaging(e.target.value)}
                className={styles.radioInput}
              />
              <span className={styles.radioCircle}></span>
            </label>

            <label className={styles.radioOption}>
              <div className={styles.optionContent}>
                <div className={styles.optionTitle}>Friends Only</div>
                <div className={styles.optionDescription}>Only your friends can message you</div>
              </div>
              <input
                type="radio"
                name="messaging"
                value="friends"
                checked={messaging === 'friends'}
                onChange={(e) => setMessaging(e.target.value)}
                className={styles.radioInput}
              />
              <span className={styles.radioCircle}></span>
            </label>

            <label className={styles.radioOption}>
              <div className={styles.optionContent}>
                <div className={styles.optionTitle}>No One</div>
                <div className={styles.optionDescription}>No one can message you</div>
              </div>
              <input
                type="radio"
                name="messaging"
                value="noOne"
                checked={messaging === 'noOne'}
                onChange={(e) => setMessaging(e.target.value)}
                className={styles.radioInput}
              />
              <span className={styles.radioCircle}></span>
            </label>
          </div>

          {/* Save Button */}
          <div className={styles.buttonContainer}>
            <button 
              onClick={handleSaveChanges}
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