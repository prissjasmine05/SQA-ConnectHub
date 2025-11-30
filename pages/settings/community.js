import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Navbar from '../../components/Navbar';

export default function CommunitySettings() {
  const router = useRouter();
  const [communities, setCommunities] = useState([
    {
      id: 1,
      name: 'Tech Enthusiasts',
      members: 12000,
      role: 'Admin',
      joined: '2024-01-01',
      notifications: true,
      avatar: '💻'
    },
    {
      id: 2,
      name: 'Fitness Community',
      members: 5600,
      role: 'Member',
      joined: '2024-01-15',
      notifications: true,
      avatar: '💪'
    },
    {
      id: 3,
      name: 'Book Club',
      members: 890,
      role: 'Moderator',
      joined: '2024-02-01',
      notifications: false,
      avatar: '📚'
    }
  ]);

  const handleToggleNotifications = (communityId) => {
    setCommunities(prev => prev.map(community =>
      community.id === communityId
        ? { ...community, notifications: !community.notifications }
        : community
    ));
  };

  const handleLeaveCommunity = (communityId) => {
    if (confirm('Are you sure you want to leave this community?')) {
      setCommunities(prev => prev.filter(community => community.id !== communityId));
    }
  };

  return (
    <div style={styles.page}>
      <Navbar />
      
      <main style={styles.main}>
        <div style={styles.container}>
          <div style={styles.header}>
            <button 
              style={styles.backButton}
              onClick={() => router.back()}
            >
              ←
            </button>
            <h1 style={styles.title}>Community Settings</h1>
          </div>

          <div style={styles.content}>
            <div style={styles.description}>
              <p>Manage your community memberships, notifications, and permissions.</p>
            </div>

            <div style={styles.communitiesList}>
              <h2 style={styles.sectionTitle}>Your Communities ({communities.length})</h2>
              
              {communities.map(community => (
                <div key={community.id} style={styles.communityCard}>
                  <div style={styles.communityHeader}>
                    <div style={styles.communityInfo}>
                      <div style={styles.communityAvatar}>{community.avatar}</div>
                      <div style={styles.communityDetails}>
                        <h3 style={styles.communityName}>{community.name}</h3>
                        <p style={styles.communityMeta}>
                          {community.members.toLocaleString()} members • {community.role} • Joined {community.joined}
                        </p>
                      </div>
                    </div>
                    <div style={styles.communityActions}>
                      <button
                        style={styles.viewButton}
                        onClick={() => router.push(`/community-profile/${community.id}`)}
                      >
                        View
                      </button>
                      {community.role !== 'Admin' && (
                        <button
                          style={styles.leaveButton}
                          onClick={() => handleLeaveCommunity(community.id)}
                        >
                          Leave
                        </button>
                      )}
                    </div>
                  </div>

                  <div style={styles.communitySettings}>
                    <div style={styles.settingItem}>
                      <div style={styles.settingInfo}>
                        <span style={styles.settingLabel}>Notifications</span>
                        <span style={styles.settingDescription}>
                          Receive notifications for new posts and activities
                        </span>
                      </div>
                      <button
                        style={{
                          ...styles.toggle,
                          backgroundColor: community.notifications ? '#10b981' : '#e5e7eb'
                        }}
                        onClick={() => handleToggleNotifications(community.id)}
                      >
                        <div style={{
                          ...styles.toggleThumb,
                          transform: community.notifications ? 'translateX(20px)' : 'translateX(2px)'
                        }} />
                      </button>
                    </div>

                    {community.role === 'Admin' && (
                      <div style={styles.adminActions}>
                        <button style={styles.adminButton}>
                          Manage Members
                        </button>
                        <button style={styles.adminButton}>
                          Community Settings
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div style={styles.globalSettings}>
              <h2 style={styles.sectionTitle}>Global Community Settings</h2>
              <div style={styles.settingsCard}>
                <div style={styles.settingItem}>
                  <div style={styles.settingInfo}>
                    <span style={styles.settingLabel}>Auto-join suggested communities</span>
                    <span style={styles.settingDescription}>
                      Automatically join communities based on your interests
                    </span>
                  </div>
                  <button style={{...styles.toggle, backgroundColor: '#e5e7eb'}}>
                    <div style={{...styles.toggleThumb, transform: 'translateX(2px)'}} />
                  </button>
                </div>

                <div style={styles.settingItem}>
                  <div style={styles.settingInfo}>
                    <span style={styles.settingLabel}>Community discovery</span>
                    <span style={styles.settingDescription}>
                      Show your communities in discovery recommendations
                    </span>
                  </div>
                  <button style={{...styles.toggle, backgroundColor: '#10b981'}}>
                    <div style={{...styles.toggleThumb, transform: 'translateX(20px)'}} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

const styles = {
  page: {
    minHeight: '100vh',
    backgroundColor: '#f8fafc',
    fontFamily: 'system-ui, -apple-system, sans-serif',
  },
  main: {
    paddingTop: '80px',
    paddingBottom: '40px',
  },
  container: {
    maxWidth: '900px',
    margin: '0 auto',
    padding: '0 20px',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '32px',
    gap: '16px',
  },
  backButton: {
    background: 'none',
    border: 'none',
    fontSize: '24px',
    cursor: 'pointer',
    color: '#64748b',
    padding: '8px',
    borderRadius: '8px',
    transition: 'background-color 0.2s',
  },
  title: {
    fontSize: '32px',
    fontWeight: '700',
    color: '#1e293b',
    margin: 0,
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    gap: '32px',
  },
  description: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '12px',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    fontSize: '14px',
    color: '#6b7280',
    lineHeight: '1.5',
  },
  sectionTitle: {
    fontSize: '20px',
    fontWeight: '600',
    color: '#374151',
    margin: '0 0 20px 0',
  },
  communitiesList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  communityCard: {
    backgroundColor: 'white',
    borderRadius: '16px',
    padding: '24px',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  communityHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  communityInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
  },
  communityAvatar: {
    width: '56px',
    height: '56px',
    borderRadius: '50%',
    backgroundColor: '#f3f4f6',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '28px',
  },
  communityDetails: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },
  communityName: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#1f2937',
    margin: 0,
  },
  communityMeta: {
    fontSize: '14px',
    color: '#6b7280',
    margin: 0,
  },
  communityActions: {
    display: 'flex',
    gap: '8px',
  },
  viewButton: {
    padding: '8px 16px',
    borderRadius: '8px',
    border: '1px solid #3b82f6',
    backgroundColor: 'white',
    color: '#3b82f6',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
  },
  leaveButton: {
    padding: '8px 16px',
    borderRadius: '8px',
    border: '1px solid #ef4444',
    backgroundColor: 'white',
    color: '#ef4444',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
  },
  communitySettings: {
    paddingTop: '20px',
    borderTop: '1px solid #f3f4f6',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  settingItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  settingInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },
  settingLabel: {
    fontSize: '16px',
    fontWeight: '500',
    color: '#374151',
  },
  settingDescription: {
    fontSize: '14px',
    color: '#6b7280',
  },
  toggle: {
    width: '44px',
    height: '24px',
    borderRadius: '12px',
    border: 'none',
    cursor: 'pointer',
    position: 'relative',
    transition: 'background-color 0.2s',
  },
  toggleThumb: {
    width: '20px',
    height: '20px',
    borderRadius: '50%',
    backgroundColor: 'white',
    position: 'absolute',
    top: '2px',
    transition: 'transform 0.2s',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.3)',
  },
  adminActions: {
    display: 'flex',
    gap: '12px',
  },
  adminButton: {
    padding: '10px 16px',
    borderRadius: '8px',
    border: '1px solid #d1d5db',
    backgroundColor: 'white',
    color: '#374151',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
  },
  globalSettings: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  settingsCard: {
    backgroundColor: 'white',
    borderRadius: '16px',
    padding: '24px',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
};
