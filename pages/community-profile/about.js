// pages/community-profile/about.js
import React, { useState } from 'react';
import Navbar from '../../components/Navbar';

export default function CommunityAbout() {
  const [activeTab, setActiveTab] = useState('About');
  const [hoveredTab, setHoveredTab] = useState(null);

  const memberAvatars = ['👨', '👩', '👨', '👩', '👨'];

  return (
    <div style={styles.page}>
      <Navbar />
      
      <main style={styles.main}>
        {/* Community Header */}
        <div style={styles.communityHeader}>
          <h1 style={styles.communityTitle}>Tech Enthusiasts Community</h1>
          <p style={styles.communityDescription}>
            A vibrant community for tech lovers to discuss the latest trends, gadgets, and innovations. Join us to share your insights and connect with fellow enthusiasts.
          </p>
        </div>

        {/* Tabs */}
        <div style={styles.tabs}>
          <button 
            style={{
              ...styles.tab,
              ...(activeTab === 'Posts' && styles.tabActive),
              ...(hoveredTab === 'Posts' && styles.tabHover)
            }}
            onClick={() => setActiveTab('Posts')}
            onMouseEnter={() => setHoveredTab('Posts')}
            onMouseLeave={() => setHoveredTab(null)}
          >
            Posts
          </button>
          <button 
            style={{
              ...styles.tab,
              ...(activeTab === 'Members' && styles.tabActive),
              ...(hoveredTab === 'Members' && styles.tabHover)
            }}
            onClick={() => setActiveTab('Members')}
            onMouseEnter={() => setHoveredTab('Members')}
            onMouseLeave={() => setHoveredTab(null)}
          >
            Members
          </button>
          <button 
            style={{
              ...styles.tab,
              ...(activeTab === 'Events' && styles.tabActive),
              ...(hoveredTab === 'Events' && styles.tabHover)
            }}
            onClick={() => setActiveTab('Events')}
            onMouseEnter={() => setHoveredTab('Events')}
            onMouseLeave={() => setHoveredTab(null)}
          >
            Events
          </button>
          <button 
            style={{
              ...styles.tab,
              ...(activeTab === 'About' && styles.tabActive),
              ...(hoveredTab === 'About' && styles.tabHover)
            }}
            onClick={() => setActiveTab('About')}
            onMouseEnter={() => setHoveredTab('About')}
            onMouseLeave={() => setHoveredTab(null)}
          >
            About
          </button>
        </div>

        {/* Community Rules */}
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>Community Rules</h2>
          
          <div style={styles.rulesList}>
            <div style={styles.ruleItem}>
              <input type="checkbox" checked readOnly style={styles.checkbox} />
              <span style={styles.ruleText}>Be respectful and considerate of others' opinions.</span>
            </div>
            <div style={styles.ruleItem}>
              <input type="checkbox" checked readOnly style={styles.checkbox} />
              <span style={styles.ruleText}>Keep discussions relevant to technology and related topics.</span>
            </div>
            <div style={styles.ruleItem}>
              <input type="checkbox" checked readOnly style={styles.checkbox} />
              <span style={styles.ruleText}>No spamming or self-promotion without prior approval from admins.</span>
            </div>
          </div>
        </section>

        {/* Members Section */}
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>Members (1,234)</h2>
          
          <div style={styles.membersAvatars}>
            {memberAvatars.map((avatar, index) => (
              <div key={index} style={styles.memberAvatar}>
                {avatar}
              </div>
            ))}
          </div>
        </section>

        {/* Community Overview */}
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>Community Overview</h2>
          
          <div style={styles.overviewList}>
            <div style={styles.overviewItem}>
              <input type="checkbox" checked readOnly style={styles.checkbox} />
              <span style={styles.overviewText}>Region: Jakarta & Surrounding Areas</span>
            </div>
            <div style={styles.overviewItem}>
              <input type="checkbox" checked readOnly style={styles.checkbox} />
              <span style={styles.overviewText}>Age Range: 18 - 30 years old</span>
            </div>
            <div style={styles.overviewItem}>
              <input type="checkbox" checked readOnly style={styles.checkbox} />
              <span style={styles.overviewText}>Who Can Join: Students, young professionals, and tech enthusiasts</span>
            </div>
          </div>
        </section>

        {/* Edit Button */}
        <button style={styles.editButton}>
          Edit
        </button>
      </main>
    </div>
  );
}

const styles = {
  page: {
    backgroundColor: '#F0F0FF',
    minHeight: '100vh',
  },
  main: {
    paddingTop: '60px',
    maxWidth: '900px',
    margin: '0 auto',
    padding: '80px 32px 32px',
  },
  communityHeader: {
    marginBottom: '32px',
  },
  communityTitle: {
    fontSize: '36px',
    fontWeight: '700',
    color: '#1d1d1f',
    marginBottom: '12px',
    letterSpacing: '-0.02em',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  },
  communityDescription: {
    fontSize: '15px',
    color: '#6b7280',
    lineHeight: '1.6',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  },
  tabs: {
    display: 'flex',
    gap: '32px',
    marginBottom: '32px',
    borderBottom: '1px solid #e5e7eb',
  },
  tab: {
    background: 'none',
    border: 'none',
    borderBottom: '2px solid transparent',
    fontSize: '15px',
    fontWeight: '500',
    color: '#6b7280',
    cursor: 'pointer',
    padding: '12px 0',
    position: 'relative',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    transition: 'all 0.2s ease',
  },
  tabActive: {
    background: 'none',
    border: 'none',
    fontSize: '15px',
    fontWeight: '600',
    color: '#7c5cdb',
    cursor: 'pointer',
    padding: '12px 0',
    position: 'relative',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    borderBottom: '2px solid #7c5cdb',
  },
  tabHover: {
    color: '#7c5cdb',
  },
  section: {
    marginBottom: '40px',
  },
  sectionTitle: {
    fontSize: '20px',
    fontWeight: '700',
    color: '#1d1d1f',
    marginBottom: '20px',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  },
  rulesList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  ruleItem: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '12px',
  },
  checkbox: {
    width: '18px',
    height: '18px',
    marginTop: '2px',
    cursor: 'pointer',
    accentColor: '#7c5cdb',
  },
  ruleText: {
    fontSize: '15px',
    color: '#1d1d1f',
    lineHeight: '1.6',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  },
  membersAvatars: {
    display: 'flex',
    gap: '12px',
  },
  memberAvatar: {
    width: '48px',
    height: '48px',
    borderRadius: '50%',
    backgroundColor: '#f3f4f6',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '24px',
    border: '2px solid white',
  },
  overviewList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  overviewItem: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '12px',
  },
  overviewText: {
    fontSize: '15px',
    color: '#1d1d1f',
    lineHeight: '1.6',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  },
  editButton: {
    width: '100%',
    maxWidth: '540px',
    margin: '0 auto',
    display: 'block',
    backgroundColor: '#7c5cdb',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    padding: '14px 24px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    marginTop: '40px',
  },
};