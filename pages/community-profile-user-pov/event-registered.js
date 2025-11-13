'use client';

import { useRouter } from 'next/navigation';
import styles from './event-registered.module.css';

export default function EventRegistered() {
  const router = useRouter();

  const handleClose = () => {
    router.back();
  };

  const handleRemind = () => {
    alert('Reminder set! We will notify you before the event.');
  };

  return (
    <>
      <div className={styles.header}>
        <div className={styles.logo}>
          <span className={styles.logoIcon}>■</span>
          <span className={styles.logoText}>ConnectHub</span>
        </div>
        <button className={styles.closeBtn} onClick={handleClose}>×</button>
      </div>

      <div className={styles.container}>
        <div className={styles.successContent}>
          <h1 className={styles.successTitle}>Event Registered Successfully!</h1>
          <p className={styles.successMessage}>
            Congratulations! You have successfully registered for the event. We look forward to seeing you there!
          </p>

          <div className={styles.successEventCard}>
            <div className={styles.eventInfoSection}>
              <h2 className={styles.eventName}>Tech Innovators Summit</h2>
              <p className={styles.eventDescription}>
                Join us for a day of insightful discussions, networking, and exploring the latest trends in technology.
              </p>
              <button className={styles.remindBtn} onClick={handleRemind}>Remind Me</button>
            </div>
            <div className={styles.eventImageSection}>
              <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=500&q=80" alt="Tech Summit Event" />
            </div>
          </div>

          <div className={styles.detailsGrid}>
            <div className={styles.detailColumn}>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Date</span>
                <span className={styles.detailValue}>July 22, 2024</span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Location</span>
                <span className={styles.detailValue}>Innovation Center, 123 Tech Drive, San Francisco, CA</span>
              </div>
            </div>
            <div className={styles.detailColumn}>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Time & Duration</span>
                <span className={styles.detailValue}>9:00 AM - 5:00 PM (8 hours)</span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Check-in Instructions</span>
                <span className={styles.detailValue}>Please arrive 30 minutes early for registration and check-in.</span>
              </div>
            </div>
          </div>

          <div className={styles.actionButtons}>
            {/* Back to Home button - goes to main page */}
            <button 
              type="button"
              className={styles.secondaryBtn} 
              onClick={() => router.push('/main-page')}
            >
              Back to Home
            </button>
            {/* Claim Voucher button - goes to voucher claimed page */}
            <button 
              type="button"
              className={styles.primaryBtn} 
              onClick={() => router.push('/community-profile-user-pov/voucher-claimed')}
            >
              Claim Voucher
            </button>
          </div>
        </div>
      </div>
    </>
  );
}