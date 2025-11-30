'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from './mypoints.module.css';

export default function MyPointsPage() {
  const router = useRouter();
  const totalPoints = 120;
  const maxPoints = 150;
  const progressPercentage = (totalPoints / maxPoints) * 100;

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
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.logoContainer}>
          <div className={styles.logoIcon}></div>
          <span className={styles.logoText}>ConnectHub</span>
        </div>
        <button 
          onClick={() => router.push('/user-profile')}
          className={styles.closeButton}
        >
          ×
        </button>
      </div>

      <div className={styles.content}>
        <h1 className={styles.pageTitle}>Your Points</h1>

        {/* Total Points Section */}
        <div className={styles.totalPointsSection}>
          <div className={styles.totalPointsHeader}>
            <span className={styles.totalPointsLabel}>Total Points</span>
            <span className={styles.totalPointsValue}>{totalPoints} Points</span>
          </div>
          <div className={styles.progressBarContainer}>
            <div 
              className={styles.progressBar} 
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
          <p className={styles.pointsDescription}>
            You earn 5 points by joining and participating in any community event.
          </p>
        </div>

        {/* Events Attended Section */}
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Events Attended</h2>
          <div className={styles.eventsList}>
            <div className={styles.eventItem}>
              <div className={`${styles.eventIconContainer} ${styles.eventIconGreen}`}>
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div className={styles.eventInfo}>
                <div className={styles.eventName}>Photography Workshop</div>
                <div className={styles.eventPoints}>5 pts</div>
              </div>
            </div>

            <div className={styles.eventItem}>
              <div className={`${styles.eventIconContainer} ${styles.eventIconPink}`}>
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                </svg>
              </div>
              <div className={styles.eventInfo}>
                <div className={styles.eventName}>Community Clean-up</div>
                <div className={styles.eventPoints}>5 pts</div>
              </div>
            </div>

            <div className={styles.eventItem}>
              <div className={`${styles.eventIconContainer} ${styles.eventIconBeige}`}>
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <div className={styles.eventInfo}>
                <div className={styles.eventName}>Book Club Meetup</div>
                <div className={styles.eventPoints}>5 pts</div>
              </div>
            </div>
          </div>
        </div>

        {/* Vouchers Section */}
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Vouchers</h2>
          <div className={styles.vouchersList}>
            <div className={styles.voucherItem}>
              <div className={`${styles.voucherIconContainer} ${styles.voucherIconBlue}`}>
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
              <div className={styles.voucherInfo}>
                <div className={styles.voucherName}>Exclusive Badge</div>
                <div className={styles.voucherPoints}>50 points</div>
              </div>
              <button className={styles.claimButton}>Klaim Voucher</button>
            </div>

            <div className={styles.voucherItem}>
              <div className={`${styles.voucherIconContainer} ${styles.voucherIconYellow}`}>
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div className={styles.voucherInfo}>
                <div className={styles.voucherName}>Event Priority</div>
                <div className={styles.voucherPoints}>50 points</div>
              </div>
              <button className={styles.claimButton}>Klaim Voucher</button>
            </div>

            <div className={styles.voucherItem}>
              <div className={`${styles.voucherIconContainer} ${styles.voucherIconPurple}`}>
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div className={styles.voucherInfo}>
                <div className={styles.voucherName}>Featured Member</div>
                <div className={styles.voucherPoints}>50 points</div>
              </div>
              <button className={styles.claimButton}>Klaim Voucher</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}