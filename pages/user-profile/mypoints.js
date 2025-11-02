'use client';
import { useRouter } from 'next/navigation';
import styles from './mypoints.module.css';

export default function MyPointsPage() {
  const router = useRouter();

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
          <h1 className={styles.modalTitle}>Your Points</h1>

          {/* Total Points */}
          <div className={styles.totalPointsSection}>
            <div className={styles.pointsHeader}>
              <span className={styles.pointsLabel}>Total Points</span>
              <span className={styles.pointsValue}>120 Points</span>
            </div>
            <div className={styles.progressBar}>
              <div className={styles.progressFill} style={{width: '60%'}}></div>
            </div>
            <p className={styles.pointsDescription}>
              You earn 5 points by joining and participating in any community event.
            </p>
          </div>

          {/* Events Attended */}
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Events Attended</h2>
            <div className={styles.eventsList}>
              <div className={`${styles.eventItem} ${styles.eventItemGreen}`}>
                <div className={`${styles.eventIcon} ${styles.eventIconGreen}`}>
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

              <div className={`${styles.eventItem} ${styles.eventItemPink}`}>
                <div className={`${styles.eventIcon} ${styles.eventIconPink}`}>
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <div className={styles.eventInfo}>
                  <div className={styles.eventName}>Community Clean-up</div>
                  <div className={styles.eventPoints}>5 pts</div>
                </div>
              </div>

              <div className={`${styles.eventItem} ${styles.eventItemYellow}`}>
                <div className={`${styles.eventIcon} ${styles.eventIconYellow}`}>
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

          {/* Vouchers */}
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Vouchers</h2>
            <div className={styles.vouchersList}>
              <div className={styles.voucherItem}>
                <div className={styles.voucherInfo}>
                  <div className={styles.voucherIcon}>
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  <div className={styles.voucherDetails}>
                    <div className={styles.voucherName}>Exclusive Badge</div>
                    <div className={styles.voucherCost}>50 points</div>
                  </div>
                </div>
                <button className={styles.claimButton}>Klaim Voucher</button>
              </div>

              <div className={styles.voucherItem}>
                <div className={styles.voucherInfo}>
                  <div className={styles.voucherIcon}>
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className={styles.voucherDetails}>
                    <div className={styles.voucherName}>Event Priority</div>
                    <div className={styles.voucherCost}>50 points</div>
                  </div>
                </div>
                <button className={styles.claimButton}>Klaim Voucher</button>
              </div>

              <div className={styles.voucherItem}>
                <div className={styles.voucherInfo}>
                  <div className={styles.voucherIcon}>
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <div className={styles.voucherDetails}>
                    <div className={styles.voucherName}>Featured Member</div>
                    <div className={styles.voucherCost}>50 points</div>
                  </div>
                </div>
                <button className={styles.claimButton}>Klaim Voucher</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}