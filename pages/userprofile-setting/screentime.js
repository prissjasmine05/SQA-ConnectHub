'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './screentime.module.css';

export default function ScreenTime() {
  const router = useRouter();
  
  const [dailyLimit, setDailyLimit] = useState(150); // in minutes (2h 30m)
  const [isControlEnabled, setIsControlEnabled] = useState(false);

  // Daily usage data for the last 7 days
  const weeklyData = [
    { day: 'Mon', minutes: 185, percentage: 92 },
    { day: 'Tue', minutes: 165, percentage: 82 },
    { day: 'Wed', minutes: 145, percentage: 72 },
    { day: 'Thu', minutes: 195, percentage: 97 },
    { day: 'Fri', minutes: 175, percentage: 87 },
    { day: 'Sat', minutes: 220, percentage: 100 }
  ];

  const todayUsage = 110; // 1h 50m
  const todayPercentage = (todayUsage / dailyLimit) * 100;

  const formatTime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h${mins}m`;
  };

  const handleSaveSettings = () => {
    // Save settings logic here
    alert('Settings saved successfully!');
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
          <h1 className={styles.modalTitle}>Screen-Time Control</h1>
          <p className={styles.modalSubtitle}>Manage your screen time with daily limits and usage tracking</p>

          {/* Daily Screen Time Card */}
          <div className={styles.statsCard}>
            <div className={styles.statsHeader}>
              <span className={styles.statsLabel}>Daily Screen Time (Last 7 Days)</span>
              <span className={styles.statsIncrease}>Last 7 Days ▲ 15%</span>
            </div>
            
            <div className={styles.currentTime}>{formatTime(todayUsage + 85)}</div>

            {/* Bar Chart */}
            <div className={styles.chartContainer}>
              {weeklyData.map((data, index) => (
                <div key={index} className={styles.barWrapper}>
                  <div className={styles.barColumn}>
                    <div 
                      className={styles.bar}
                      style={{ height: `${data.percentage}%` }}
                    ></div>
                  </div>
                  <span className={styles.barLabel}>{data.day}</span>
                </div>
              ))}
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
              max="360"
              step="15"
              value={dailyLimit}
              onChange={(e) => setDailyLimit(parseInt(e.target.value))}
              className={styles.slider}
            />
          </div>

          {/* Today's Usage */}
          <div className={styles.usageSection}>
            <div className={styles.usageHeader}>
              <span className={styles.usageLabel}>Today's Usage</span>
              <span className={styles.usageTime}>{formatTime(todayUsage)}/{formatTime(dailyLimit)}</span>
            </div>
            <div className={styles.progressBar}>
              <div 
                className={styles.progressFill}
                style={{ width: `${Math.min(todayPercentage, 100)}%` }}
              ></div>
            </div>
          </div>

          {/* Enable Toggle */}
          <div className={styles.toggleSection}>
            <label className={styles.toggleLabel}>
              <input
                type="checkbox"
                checked={isControlEnabled}
                onChange={(e) => setIsControlEnabled(e.target.checked)}
                className={styles.toggleInput}
              />
              <span className={styles.toggleSwitch}></span>
              <span className={styles.toggleText}>Enable Screen-Time Control</span>
            </label>
          </div>

          {/* Save Button */}
          <div className={styles.buttonContainer}>
            <button 
              onClick={handleSaveSettings}
              className={styles.saveButton}
            >
              Save Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}