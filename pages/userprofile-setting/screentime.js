'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from './screentime.module.css';

export default function ScreenTimeControlPage() {
  const router = useRouter();
  const [dailyLimit, setDailyLimit] = useState(150); // 2h 30m = 150 minutes
  const [isEnabled, setIsEnabled] = useState(false);

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

  // Data chart untuk 7 hari terakhir (dalam jam)
  const chartData = [
    { day: 'Mon', hours: 3.2 },
    { day: 'Tue', hours: 2.8 },
    { day: 'Wed', hours: 3.5 },
    { day: 'Thu', hours: 2.5 },
    { day: 'Fri', hours: 2.0 },
    { day: 'Sat', hours: 3.8 },
    { day: 'Sun', hours: 3.0 },
  ];

  const maxHours = 4;
  const todayUsage = 90; // 1h 30m = 90 minutes

  const formatTime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  return (
    <div className={styles.mainContainer}>
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
        <h1 className={styles.modalTitle}>Screen-Time Control</h1>
        <p className={styles.modalSubtitle}>
          Manage your screen time with daily limits and usage tracking.
        </p>

        {/* Daily Screen Time Stats */}
        <div className={styles.statsSection}>
          <span className={styles.statsLabel}>Daily Screen Time (Last 7 Days)</span>
          <div className={styles.currentTime}>3h 15m</div>
          <span className={styles.statsIncrease}>Last 7 Days +15%</span>

          {/* Chart */}
          <div className={styles.chartContainer}>
            {chartData.map((data, index) => {
              const heightPercent = (data.hours / maxHours) * 100;
              return (
                <div key={index} className={styles.barWrapper}>
                  <div className={styles.barColumn}>
                    <div 
                      className={styles.bar}
                      style={{ height: `${heightPercent}%` }}
                    ></div>
                  </div>
                  <span className={styles.barLabel}>{data.day}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Set Daily Limit */}
        <div className={styles.limitSection}>
          <div className={styles.limitHeader}>
            <span className={styles.limitLabel}>Set Daily Limit</span>
            <span className={styles.limitValue}>{formatTime(dailyLimit)}</span>
          </div>
          <input 
            type="range"
            min="30"
            max="480"
            step="30"
            value={dailyLimit}
            onChange={(e) => setDailyLimit(parseInt(e.target.value))}
            className={styles.slider}
          />
        </div>

        {/* Today's Usage */}
        <div className={styles.usageSection}>
          <div className={styles.usageHeader}>
            <span className={styles.usageLabel}>Today's Usage</span>
            <span className={styles.usageTime}>{formatTime(todayUsage)} / {formatTime(dailyLimit)}</span>
          </div>
          <div className={styles.progressBar}>
            <div 
              className={styles.progressFill}
              style={{ width: `${(todayUsage / dailyLimit) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Enable Screen-Time Control */}
        <div className={styles.toggleSection}>
          <label className={styles.toggleLabel}>
            <input 
              type="checkbox"
              checked={isEnabled}
              onChange={(e) => setIsEnabled(e.target.checked)}
              className={styles.toggleInput}
            />
            <div className={styles.toggleSwitch}></div>
            <span className={styles.toggleText}>Enable Screen-Time Control</span>
          </label>
        </div>

        {/* Save Button */}
        <div className={styles.buttonContainer}>
          <button 
            onClick={() => router.push('/user-profile/settings')}
            className={styles.saveButton}
          >
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
}