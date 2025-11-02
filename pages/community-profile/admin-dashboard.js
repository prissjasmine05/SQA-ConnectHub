// pages/community-profile/admin-dashboard
import React, { useState } from 'react';
import Image from 'next/image';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('flagged');

  const flaggedPosts = [
    {
      content: 'This is an example of a flagged post that needs review.',
      user: 'User123',
      reason: 'Hate Speech'
    },
    {
      content: 'Another flagged post for potential policy violation.',
      user: 'User456',
      reason: 'Harassment'
    },
    {
      content: 'This post has been reported multiple times.',
      user: 'User789',
      reason: 'Spam'
    }
  ];

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
          <h1 style={styles.title}>Admin Dashboard</h1>
          <p style={styles.subtitle}>Manage content, monitor performance, and ensure a safe community.</p>

          {/* Key Metrics */}
          <h2 style={styles.sectionTitle}>Key Metrics</h2>
          <div style={styles.metricsGrid}>
            <div style={{...styles.metricCard, backgroundColor: '#F0FDF4'}}>
              <div style={styles.metricLabel}>Active Users</div>
              <div style={styles.metricValue}>12,345</div>
              <div style={{...styles.metricChange, color: '#16A34A'}}>+5%</div>
            </div>

            <div style={{...styles.metricCard, backgroundColor: '#ECFEFF'}}>
              <div style={styles.metricLabel}>New Posts</div>
              <div style={styles.metricValue}>5,678</div>
              <div style={{...styles.metricChange, color: '#0891B2'}}>+12%</div>
            </div>

            <div style={{...styles.metricCard, backgroundColor: '#FCE7F3'}}>
              <div style={styles.metricLabel}>Reported Content</div>
              <div style={styles.metricValue}>123</div>
              <div style={{...styles.metricChange, color: '#DC2626'}}>-8%</div>
            </div>
          </div>

          {/* Content Moderation */}
          <h2 style={styles.sectionTitle}>Content Moderation</h2>
          
          {/* Tabs */}
          <div style={styles.tabs}>
            <button 
              style={{
                ...styles.tab,
                ...(activeTab === 'flagged' ? styles.tabActive : {})
              }}
              onClick={() => setActiveTab('flagged')}
            >
              Flagged Posts
            </button>
            <button 
              style={{
                ...styles.tab,
                ...(activeTab === 'reports' ? styles.tabActive : {})
              }}
              onClick={() => setActiveTab('reports')}
            >
              User Reports
            </button>
          </div>

          {/* Table */}
          <div style={styles.tableContainer}>
            <table style={styles.table}>
              <thead>
                <tr style={styles.tableHeaderRow}>
                  <th style={{...styles.tableHeader, width: '35%'}}>Post Content</th>
                  <th style={{...styles.tableHeader, width: '15%'}}>User</th>
                  <th style={{...styles.tableHeader, width: '20%'}}>Reason</th>
                  <th style={{...styles.tableHeader, width: '15%', textAlign: 'right'}}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {flaggedPosts.map((post, index) => (
                  <tr key={index} style={styles.tableRow}>
                    <td style={styles.tableCell}>
                      <div style={styles.postContent}>{post.content}</div>
                    </td>
                    <td style={styles.tableCell}>
                      <div style={styles.userName}>{post.user}</div>
                    </td>
                    <td style={styles.tableCell}>
                      <div style={styles.reason}>{post.reason}</div>
                    </td>
                    <td style={{...styles.tableCell, textAlign: 'right'}}>
                      <button style={styles.reviewButton}>Review</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: '100vh',
    backgroundColor: '#F0F0FF',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px 32px',
    borderBottom: '1px solid #e5e5e5',
    backgroundColor: 'white',
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
    marginBottom: '8px',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  },
  subtitle: {
    fontSize: '16px',
    color: '#6b7280',
    marginBottom: '40px',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  },
  sectionTitle: {
    fontSize: '18px',
    fontWeight: '700',
    color: '#1d1d1f',
    marginBottom: '16px',
    marginTop: '40px',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  },
  metricsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '16px',
    marginBottom: '24px',
  },
  metricCard: {
    padding: '24px',
    borderRadius: '12px',
  },
  metricLabel: {
    fontSize: '14px',
    color: '#6b7280',
    marginBottom: '8px',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  },
  metricValue: {
    fontSize: '28px',
    fontWeight: '700',
    color: '#1d1d1f',
    marginBottom: '4px',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  },
  metricChange: {
    fontSize: '14px',
    fontWeight: '600',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  },
  tabs: {
    display: 'flex',
    gap: '8px',
    marginBottom: '16px',
    borderBottom: '1px solid #e5e5e5',
  },
  tab: {
    padding: '12px 16px',
    border: 'none',
    backgroundColor: 'transparent',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500',
    color: '#6b7280',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    borderBottom: '2px solid transparent',
    transition: 'color 0.2s, border-color 0.2s',
  },
  tabActive: {
    color: '#1d1d1f',
    fontWeight: '600',
    borderBottom: '2px solid #1d1d1f',
  },
  tableContainer: {
    backgroundColor: 'white',
    borderRadius: '12px',
    overflow: 'hidden',
    border: '1px solid #e5e5e5',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  tableHeaderRow: {
    backgroundColor: '#F9FAFB',
  },
  tableHeader: {
    padding: '16px 20px',
    textAlign: 'left',
    fontSize: '13px',
    fontWeight: '600',
    color: '#6b7280',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    borderBottom: '1px solid #e5e5e5',
  },
  tableRow: {
    borderBottom: '1px solid #f3f4f6',
  },
  tableCell: {
    padding: '20px',
    verticalAlign: 'top',
  },
  postContent: {
    fontSize: '14px',
    color: '#6b7280',
    lineHeight: '1.5',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  },
  userName: {
    fontSize: '14px',
    color: '#1d1d1f',
    fontWeight: '500',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  },
  reason: {
    fontSize: '14px',
    color: '#1d1d1f',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  },
  reviewButton: {
    padding: '6px 16px',
    border: 'none',
    backgroundColor: 'transparent',
    color: '#3B82F6',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  },
};