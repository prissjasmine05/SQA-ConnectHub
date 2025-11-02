'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './editprofile.module.css';

export default function EditProfilePage() {
  const router = useRouter();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');

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

        {/* Form */}
        <form className={styles.form}>
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
              onChange={(e) => setEmail(e.target.value)}
              className={styles.input}
            />
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
            <label className={styles.label}>Phone Number</label>
            <input 
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className={styles.input}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Password</label>
            <div className={styles.passwordGroup}>
              <input 
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={styles.input}
              />
              <button 
                type="button"
                className={styles.changePasswordButton}
              >
                Change Password
              </button>
            </div>
          </div>
        </form>

        {/* Actions */}
        <div className={styles.actions}>
          <button 
            onClick={() => router.push('/user-profile')}
            className={styles.saveButton}
          >
            Save Changes
          </button>
          
          <div className={styles.divider}>or</div>
          
          <button 
            onClick={() => router.push('/user-profile')}
            className={styles.logoutButton}
          >
            Log Out
          </button>
          
          <button className={styles.contingentLink}>
            Change to Community Account?
          </button>
        </div>
      </div>
    </div>
  );
}