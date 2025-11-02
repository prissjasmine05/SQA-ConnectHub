// pages/community-profile/settings.js
import React from 'react';
import Image from 'next/image';

export default function SettingsAdmin() {
  return (
    <div style={styles.page}>
      {/* Header */}
                  <div style={styles.header}>
                    <div style={styles.headerLeft}>
                      {/* Ganti SVG dengan logo */}
                      <Image 
                        src="/images/LogoConnectHub.png"
                        alt="ConnectHub Logo"
                        width={150}
                        height={40}
                        priority
                        style={{ objectFit: 'contain' }}
                      />
                   </div>
            
                    <button 
                      style={styles.closeButton}
                      onClick={() => window.history.back()}
                    >
                      <svg 
                        width="24" 
                        height="24" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2"
                        strokeLinecap="round"
                      >
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                      </svg>
                    </button>
                  </div>

      {/* Main Content */}
      <div style={styles.container}>
        <div style={styles.content}>
          {/* Title */}
          <h1 style={styles.title}>Settings</h1>

          {/* Account Section */}
          <section style={styles.section}>
            <h2 style={styles.sectionTitle}>Account</h2>

            {/* Change Account */}
            <button style={{...styles.settingCard, backgroundColor: '#FCE7F3'}}>
              <div style={styles.iconWrapper}>
                <svg 
                  width="24" 
                  height="24" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="#1d1d1f" 
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="4" y1="9" x2="20" y2="9"></line>
                  <line x1="4" y1="15" x2="20" y2="15"></line>
                  <line x1="10" y1="3" x2="8" y2="21"></line>
                  <line x1="16" y1="3" x2="14" y2="21"></line>
                </svg>
              </div>
              <div style={styles.cardContent}>
                <div style={styles.cardTitle}>Change Account</div>
                <div style={styles.cardDescription}>Manage your community</div>
              </div>
            </button>

            {/* Admin Dashboard */}
            <button style={{...styles.settingCard, backgroundColor: '#D1FAE5'}}>
              <div style={styles.iconWrapper}>
                <svg 
                  width="24" 
                  height="24" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="#1d1d1f" 
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
                </svg>
              </div>
              <div style={styles.cardContent}>
                <div style={styles.cardTitle}>Admin Dashboard</div>
                <div style={styles.cardDescription}>Track performance and review analytics to manage your community effectively</div>
              </div>
            </button>
          </section>

          {/* Privacy Section */}
          <section style={styles.section}>
            <h2 style={styles.sectionTitle}>Privacy</h2>

            {/* Privacy Settings */}
            <button style={{...styles.settingCard, backgroundColor: '#F3E8FF'}}>
              <div style={styles.iconWrapper}>
                <svg 
                  width="24" 
                  height="24" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="#1d1d1f" 
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
              </div>
              <div style={styles.cardContent}>
                <div style={styles.cardTitle}>Privacy Settings</div>
                <div style={styles.cardDescription}>Manage your privacy settings</div>
              </div>
            </button>

            {/* Mute & Block */}
            <button style={{...styles.settingCard, backgroundColor: '#DBEAFE'}}>
              <div style={styles.iconWrapper}>
                <svg 
                  width="24" 
                  height="24" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="#1d1d1f" 
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="4.93" y1="4.93" x2="19.07" y2="19.07"></line>
                </svg>
              </div>
              <div style={styles.cardContent}>
                <div style={styles.cardTitle}>Mute & Block</div>
                <div style={styles.cardDescription}>Manage the accounts and words that you've muted or blocked</div>
              </div>
            </button>
          </section>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: '100vh',
    backgroundColor: 'white',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px 32px',
    borderBottom: '1px solid #e5e5e5',
  },
  headerLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  brandName: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#1d1d1f',
    margin: 0,
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  },
  closeButton: {
    width: '40px',
    height: '40px',
    border: 'none',
    backgroundColor: 'transparent',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '8px',
    transition: 'background-color 0.2s',
  },
  container: {
    display: 'flex',
    justifyContent: 'center',
    padding: '48px 20px',
  },
  content: {
    width: '100%',
    maxWidth: '900px',
  },
  title: {
    fontSize: '36px',
    fontWeight: '700',
    color: '#1d1d1f',
    marginBottom: '40px',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  },
  section: {
    marginBottom: '40px',
  },
  sectionTitle: {
    fontSize: '18px',
    fontWeight: '700',
    color: '#1d1d1f',
    marginBottom: '16px',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  },
  settingCard: {
    width: '100%',
    display: 'flex',
    alignItems: 'flex-start',
    gap: '16px',
    padding: '20px 24px',
    marginBottom: '12px',
    border: 'none',
    borderRadius: '12px',
    cursor: 'pointer',
    transition: 'transform 0.2s, box-shadow 0.2s',
    textAlign: 'left',
  },
  iconWrapper: {
    width: '48px',
    height: '48px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    backgroundColor: 'white',
    borderRadius: '12px',
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#1d1d1f',
    marginBottom: '4px',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  },
  cardDescription: {
    fontSize: '14px',
    color: '#6b7280',
    lineHeight: '1.5',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  },
};