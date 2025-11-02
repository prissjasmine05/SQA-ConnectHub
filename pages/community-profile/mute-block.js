// pages/community-profile/mute-block.js
import { useState } from 'react';
import Navbar from '../../components/Navbar';

export default function MuteBlock() {
  const [mutedMembers, setMutedMembers] = useState([
    { id: 1, name: 'Sophia Clark', role: 'Member', avatar: '👩' },
    { id: 2, name: 'Ethan Bennett', role: 'Moderator', avatar: '👨' }
  ]);

  const [blockedMembers, setBlockedMembers] = useState([
    { id: 3, name: 'Olivia Hayes', role: 'Member', avatar: '👩' },
    { id: 4, name: 'Liam Carter', role: 'Member', avatar: '👨' }
  ]);

  const [mutedKeywords] = useState(['Porn', 'Politics', 'Terrorist']);
  const [searchQuery, setSearchQuery] = useState('');

  const handleUnmute = (id) => {
    setMutedMembers(mutedMembers.filter(member => member.id !== id));
  };

  const handleUnblock = (id) => {
    setBlockedMembers(blockedMembers.filter(member => member.id !== id));
  };

  return (
    <div style={styles.pageWrapper}>
      <Navbar />
      
      <div style={styles.container}>
        <div style={styles.header}>
          <h1 style={styles.title}>Mute & Block</h1>
          <p style={styles.subtitle}>
            Manage members and keywords that you've muted or blocked in this community.
          </p>
        </div>

        <div style={styles.searchBox}>
          <svg 
            style={styles.searchIcon}
            width="20" 
            height="20" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="#999" 
            strokeWidth="2"
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.35-4.35"></path>
          </svg>
          <input
            type="text"
            placeholder="Search members or keywords"
            style={styles.searchInput}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Muted Members</h2>
          <div style={styles.memberList}>
            {mutedMembers.map(member => (
              <div key={member.id} style={styles.memberItem}>
                <div style={styles.memberInfo}>
                  <div style={styles.avatar}>{member.avatar}</div>
                  <div style={styles.memberDetails}>
                    <div style={styles.memberName}>{member.name}</div>
                    <div style={styles.memberRole}>{member.role}</div>
                  </div>
                </div>
                <button 
                  style={styles.unmuteBtn}
                  onClick={() => handleUnmute(member.id)}
                >
                  Unmute
                </button>
              </div>
            ))}
          </div>
        </div>

        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Blocked Members</h2>
          <div style={styles.memberList}>
            {blockedMembers.map(member => (
              <div key={member.id} style={styles.memberItem}>
                <div style={styles.memberInfo}>
                  <div style={styles.avatar}>{member.avatar}</div>
                  <div style={styles.memberDetails}>
                    <div style={styles.memberName}>{member.name}</div>
                    <div style={styles.memberRole}>{member.role}</div>
                  </div>
                </div>
                <button 
                  style={styles.unblockBtn}
                  onClick={() => handleUnblock(member.id)}
                >
                  Unblock
                </button>
              </div>
            ))}
          </div>
        </div>

        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Muted Keywords</h2>
          <div style={styles.keywordList}>
            {mutedKeywords.map((keyword, index) => (
              <div key={index} style={styles.keywordTag}>
                {keyword}
              </div>
            ))}
          </div>
          <p style={styles.infoText}>
            Muted members can still access the community but their posts and comments will be hidden from you. Blocked members will no longer be able to interact with the community.
          </p>
        </div>
      </div>
    </div>
  );
}

const styles = {
  pageWrapper: {
    minHeight: '100vh',
    backgroundColor: '#F0F0FF',
  },
  container: {
    maxWidth: '900px',
    margin: '0 auto',
    padding: '80px 32px 32px',
  },
  header: {
    marginBottom: '32px',
  },
  title: {
    fontSize: '36px',
    fontWeight: '700',
    color: '#1d1d1f',
    margin: '0 0 12px 0',
    letterSpacing: '-0.02em',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  },
  subtitle: {
    fontSize: '15px',
    color: '#6e6e73',
    margin: '0',
    lineHeight: '1.6',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  },
  searchBox: {
    position: 'relative',
    marginBottom: '40px',
  },
  searchIcon: {
    position: 'absolute',
    left: '20px',
    top: '50%',
    transform: 'translateY(-50%)',
    pointerEvents: 'none',
    zIndex: 1,
  },
  searchInput: {
    width: '100%',
    padding: '16px 20px 16px 52px',
    border: 'none',
    borderRadius: '12px',
    backgroundColor: 'white',
    fontSize: '15px',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    outline: 'none',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
    boxSizing: 'border-box',
  },
  section: {
    marginBottom: '48px',
  },
  sectionTitle: {
    fontSize: '20px',
    fontWeight: '600',
    color: '#1d1d1f',
    margin: '0 0 20px 0',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  },
  memberList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  memberItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0',
  },
  memberInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
  },
  avatar: {
    width: '56px',
    height: '56px',
    borderRadius: '50%',
    backgroundColor: '#f3f4f6',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '28px',
  },
  memberDetails: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },
  memberName: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#1d1d1f',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  },
  memberRole: {
    fontSize: '14px',
    color: '#86868b',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  },
  unmuteBtn: {
    padding: '10px 24px',
    border: 'none',
    borderRadius: '6px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    backgroundColor: '#7c5cdb',
    color: 'white',
  },
  unblockBtn: {
    padding: '10px 24px',
    border: 'none',
    borderRadius: '6px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    backgroundColor: '#7c5cdb',
    color: 'white',
  },
  keywordList: {
    display: 'flex',
    gap: '12px',
    marginBottom: '20px',
    flexWrap: 'wrap',
  },
  keywordTag: {
    padding: '10px 24px',
    backgroundColor: '#ff3b30',
    color: 'white',
    borderRadius: '6px',
    fontSize: '14px',
    fontWeight: '600',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  },
  infoText: {
    fontSize: '14px',
    color: '#6e6e73',
    lineHeight: '1.6',
    margin: '0',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  },
};