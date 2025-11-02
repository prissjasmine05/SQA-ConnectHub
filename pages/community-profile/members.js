// pages/community-profile/members.js
import React, { useState } from 'react';
import Navbar from '../../components/Navbar';

export default function CommunityMembers() {
  const [activeTab, setActiveTab] = useState('Members');
  const [searchQuery, setSearchQuery] = useState('');
  const [hoveredTab, setHoveredTab] = useState(null);

  const members = [
    { id: 1, name: 'Ethan Carter', status: 'Active', avatar: '👨' },
    { id: 2, name: 'Sophia Bennett', status: 'Inactive', avatar: '👩' },
    { id: 3, name: 'Liam Harper', status: 'Active', avatar: '👨' },
    { id: 4, name: 'Olivia Foster', status: 'Inactive', avatar: '👩' },
    { id: 5, name: 'Noah Parker', status: 'Active', avatar: '👨' },
    { id: 6, name: 'Ava Mitchell', status: 'Inactive', avatar: '👩' },
    { id: 7, name: 'Isabella Coleman', status: 'Inactive', avatar: '👩' },
    { id: 8, name: 'Aiden Brooks', status: 'Active', avatar: '👨' },
    { id: 9, name: 'Jackson Reed', status: 'Active', avatar: '👨' },
    { id: 10, name: 'Mia Hughes', status: 'Inactive', avatar: '👩' },
  ];

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

        {/* Search Bar */}
        <div style={styles.searchWrapper}>
          <div style={styles.searchContainer}>
            <svg 
              style={styles.searchIcon}
              width="20" 
              height="20" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="#9ca3af" 
              strokeWidth="2"
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.35-4.35"></path>
            </svg>
            
            <input
              type="text"
              placeholder="Search members"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={styles.searchInput}
            />
          </div>
        </div>

        {/* Members List */}
        <div style={styles.membersList}>
          {members.map((member) => (
            <div key={member.id} style={styles.memberCard}>
              <div style={styles.memberInfo}>
                <div style={styles.avatar}>{member.avatar}</div>
                <div style={styles.memberDetails}>
                  <div style={styles.memberName}>{member.name}</div>
                  <div style={styles.memberStatus}>{member.status}</div>
                </div>
              </div>
              <button style={styles.kickButton}>Kick</button>
            </div>
          ))}
        </div>
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
  searchWrapper: {
    marginBottom: '24px',
  },
  searchContainer: {
    position: 'relative',
    width: '100%',
  },
  searchIcon: {
    position: 'absolute',
    left: '16px',
    top: '50%',
    transform: 'translateY(-50%)',
    zIndex: 1,
  },
  searchInput: {
    width: '100%',
    padding: '12px 12px 12px 48px',
    fontSize: '15px',
    border: '1px solid #d1d5db',
    borderRadius: '8px',
    backgroundColor: '#f3f4f6',
    outline: 'none',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    boxSizing: 'border-box',
  },
  membersList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  memberCard: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px 20px',
    backgroundColor: 'white',
    borderRadius: '12px',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
  },
  memberInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
  },
  avatar: {
    width: '48px',
    height: '48px',
    borderRadius: '50%',
    backgroundColor: '#f3f4f6',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '24px',
  },
  memberDetails: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },
  memberName: {
    fontSize: '15px',
    fontWeight: '600',
    color: '#1d1d1f',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  },
  memberStatus: {
    fontSize: '13px',
    color: '#6b7280',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  },
  kickButton: {
    padding: '8px 24px',
    backgroundColor: '#7c5cdb',
    color: 'white',
    border: 'none',
    borderRadius: '20px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  },
};