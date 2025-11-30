'use client';
import { useState,useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from './editprofile.module.css';

export default function EditProfilePage() {
  const router = useRouter();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [bio, setBio] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const res = await fetch('/api/auth/me', { credentials: 'include' });
      
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
      
      const user = data.user;
      setFullName(user.fullName || '');
      setEmail(user.email || '');
      setUsername(user.username || '');
      setPhoneNumber(user.phoneNumber || '');
      setBio(user.bio || '');
    } catch (error) {
      console.error('Error fetching profile:', error);
      router.push('/create-acc');
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const updateData = {
        fullName,
        username,
        phoneNumber,
        bio
      };

      // Only include password fields if both are provided
      if (currentPassword && newPassword) {
        updateData.currentPassword = currentPassword;
        updateData.newPassword = newPassword;
      }

      const res = await fetch('/api/user/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(updateData)
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Failed to update profile');
      }

      setSuccess('Profile updated successfully');
      setCurrentPassword('');
      setNewPassword('');
      
      setTimeout(() => {
        router.push('/user-profile');
      }, 1500);
    } catch (err) {
      console.error('Update profile error:', err);
      setError(err.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.mainContainer}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.logo}>
          <div className={styles.logoIcon}></div>
          <span className={styles.logoText}>ConnectHub</span>
        </div>
        <button 
          onClick={() => router.push('/user-profile')}
          className={styles.closeButton}
        >
          ✕
        </button>
      </div>

      {/* Content */}
      <div className={styles.content}>
        <h1 className={styles.title}>Edit Profile</h1>

        {/* Profile Picture */}
        <div className={styles.profilePictureSection}>
          <div className={styles.profileImageWrapper}>
            <img 
              src="/api/placeholder/140/140" 
              alt="Profile" 
              className={styles.profileImage}
            />
          </div>
          <div className={styles.pictureLabel}>Profile Picture</div>
          <p className={styles.pictureHint}>Upload a new profile picture</p>
          <button className={styles.uploadButton}>Upload/Change</button>
        </div>

        {/* Messages */}
        {error && (
          <div className={styles.errorMessage}>
            {error}
          </div>
        )}
        {success && (
          <div className={styles.successMessage}>
            {success}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSave} className={styles.form}>
          <div className={styles.formGroup}>
            <label className={styles.label}>Full Name</label>
            <input 
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className={styles.input}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Email Address</label>
            <input 
              type="email"
              value={email}
              disabled
              className={`${styles.input} ${styles.disabled}`}
            />
            <small>Email cannot be changed</small>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Username</label>
            <input 
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={styles.input}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Bio</label>
            <textarea 
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className={styles.textarea}
              rows={3}
              placeholder="Tell us about yourself..."
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Phone Number</label>
            <input 
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className={styles.input}
            />
          </div>

          <div className={styles.passwordSection}>
            <h3 className={styles.sectionTitle}>Change Password</h3>
            <div className={styles.formGroup}>
              <label className={styles.label}>Current Password</label>
              <input 
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className={styles.input}
                placeholder="Enter current password"
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>New Password</label>
              <input 
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className={styles.input}
                placeholder="Enter new password"
              />
            </div>
          </div>
        </form>

        {/* Actions */}
        <div className={styles.actions}>
          <button 
            type="submit"
            onClick={handleSave}
            disabled={loading}
            className={styles.saveButton}
          >
            {loading ? 'Saving...' : 'Save Changes'}
          </button>
          
          <div className={styles.divider}>or</div>
          
          <button 
            type="button"
            onClick={() => router.push('/user-profile')}
            className={styles.cancelButton}
          >
            Cancel
          </button>
          
          <button 
            type="button"
            onClick={() => router.push('/setting-to-community')}
            className={styles.contingentLink}
          >
            Change to Community Account?
          </button>
        </div>
      </div>
    </div>
  );
}