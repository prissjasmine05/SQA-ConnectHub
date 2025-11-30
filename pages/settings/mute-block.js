import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Navbar from '../../components/Navbar';

export default function MuteBlockSettings() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('muted');
  const [searchTerm, setSearchTerm] = useState('');
  const [newKeyword, setNewKeyword] = useState('');

  // Mock data - replace with real data from API
  const [mutedUsers, setMutedUsers] = useState([
    { id: 1, name: 'John Doe', username: '@johndoe', avatar: '👤', mutedAt: '2024-01-15' },
    { id: 2, name: 'Jane Smith', username: '@janesmith', avatar: '👩', mutedAt: '2024-01-10' },
  ]);

  const [blockedUsers, setBlockedUsers] = useState([
    { id: 3, name: 'Bad User', username: '@baduser', avatar: '😠', blockedAt: '2024-01-12' },
  ]);

  const [mutedKeywords, setMutedKeywords] = useState([
    { id: 1, keyword: 'spam', addedAt: '2024-01-14' },
    { id: 2, keyword: 'promotion', addedAt: '2024-01-13' },
    { id: 3, keyword: 'offensive', addedAt: '2024-01-11' },
  ]);

  const handleUnmute = (userId) => {
    setMutedUsers(prev => prev.filter(user => user.id !== userId));
  };

  const handleUnblock = (userId) => {
    setBlockedUsers(prev => prev.filter(user => user.id !== userId));
  };

  const handleRemoveKeyword = (keywordId) => {
    setMutedKeywords(prev => prev.filter(keyword => keyword.id !== keywordId));
  };

  const handleAddKeyword = () => {
    if (newKeyword.trim()) {
      const newId = Math.max(...mutedKeywords.map(k => k.id), 0) + 1;
      setMutedKeywords(prev => [...prev, {
        id: newId,
        keyword: newKeyword.trim().toLowerCase(),
        addedAt: new Date().toISOString().split('T')[0]
      }]);
      setNewKeyword('');
    }
  };

  const filteredMutedUsers = mutedUsers.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredBlockedUsers = blockedUsers.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredKeywords = mutedKeywords.filter(keyword =>
    keyword.keyword.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
            <h1 style={styles.title}>Mute & Block</h1>
          </div>

          <div style={styles.content}>
            <div style={styles.description}>
              <p>Manage accounts and words you've muted or blocked. Muted content won't appear in your timeline, but you can still visit their profiles. Blocked users cannot interact with you.</p>
            </div>

            {/* Tabs */}
            <div style={styles.tabs}>
              <button
                style={{
                  ...styles.tab,
                  ...(activeTab === 'muted' && styles.activeTab)
                }}
                onClick={() => setActiveTab('muted')}
              >
                Muted Users ({mutedUsers.length})
              </button>
              <button
                style={{
                  ...styles.tab,
                  ...(activeTab === 'blocked' && styles.activeTab)
                }}
                onClick={() => setActiveTab('blocked')}
              >
                Blocked Users ({blockedUsers.length})
              </button>
              <button
                style={{
                  ...styles.tab,
                  ...(activeTab === 'keywords' && styles.activeTab)
                }}
                onClick={() => setActiveTab('keywords')}
              >
                Muted Keywords ({mutedKeywords.length})
              </button>
            </div>

            {/* Search */}
            <div style={styles.searchSection}>
              <input
                type="text"
                placeholder={`Search ${activeTab === 'keywords' ? 'keywords' : 'users'}...`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={styles.searchInput}
              />
            </div>

            {/* Content based on active tab */}
            <div style={styles.tabContent}>
              {activeTab === 'muted' && (
                <div style={styles.usersList}>
                  {filteredMutedUsers.length === 0 ? (
                    <div style={styles.emptyState}>
                      <span style={styles.emptyIcon}>🔇</span>
                      <h3>No muted users</h3>
                      <p>Users you mute will appear here. You won't see their posts in your timeline.</p>
                    </div>
                  ) : (
                    filteredMutedUsers.map(user => (
                      <div key={user.id} style={styles.userItem}>
                        <div style={styles.userInfo}>
                          <div style={styles.userAvatar}>{user.avatar}</div>
                          <div style={styles.userDetails}>
                            <h4 style={styles.userName}>{user.name}</h4>
                            <p style={styles.userUsername}>{user.username}</p>
                            <p style={styles.userMeta}>Muted on {user.mutedAt}</p>
                          </div>
                        </div>
                        <button
                          style={styles.actionButton}
                          onClick={() => handleUnmute(user.id)}
                        >
                          Unmute
                        </button>
                      </div>
                    ))
                  )}
                </div>
              )}

              {activeTab === 'blocked' && (
                <div style={styles.usersList}>
                  {filteredBlockedUsers.length === 0 ? (
                    <div style={styles.emptyState}>
                      <span style={styles.emptyIcon}>🚫</span>
                      <h3>No blocked users</h3>
                      <p>Users you block will appear here. They won't be able to interact with you.</p>
                    </div>
                  ) : (
                    filteredBlockedUsers.map(user => (
                      <div key={user.id} style={styles.userItem}>
                        <div style={styles.userInfo}>
                          <div style={styles.userAvatar}>{user.avatar}</div>
                          <div style={styles.userDetails}>
                            <h4 style={styles.userName}>{user.name}</h4>
                            <p style={styles.userUsername}>{user.username}</p>
                            <p style={styles.userMeta}>Blocked on {user.blockedAt}</p>
                          </div>
                        </div>
                        <button
                          style={{...styles.actionButton, ...styles.unblockButton}}
                          onClick={() => handleUnblock(user.id)}
                        >
                          Unblock
                        </button>
                      </div>
                    ))
                  )}
                </div>
              )}

              {activeTab === 'keywords' && (
                <div style={styles.keywordsList}>
                  {/* Add new keyword */}
                  <div style={styles.addKeywordSection}>
                    <input
                      type="text"
                      placeholder="Add a keyword to mute..."
                      value={newKeyword}
                      onChange={(e) => setNewKeyword(e.target.value)}
                      style={styles.keywordInput}
                      onKeyPress={(e) => e.key === 'Enter' && handleAddKeyword()}
                    />
                    <button style={styles.addButton} onClick={handleAddKeyword}>
                      Add
                    </button>
                  </div>

                  {filteredKeywords.length === 0 ? (
                    <div style={styles.emptyState}>
                      <span style={styles.emptyIcon}>🔤</span>
                      <h3>No muted keywords</h3>
                      <p>Add keywords to hide posts containing these words from your timeline.</p>
                    </div>
                  ) : (
                    <div style={styles.keywordsGrid}>
                      {filteredKeywords.map(keyword => (
                        <div key={keyword.id} style={styles.keywordItem}>
                          <span style={styles.keywordText}>{keyword.keyword}</span>
                          <span style={styles.keywordMeta}>Added {keyword.addedAt}</span>
                          <button
                            style={styles.removeButton}
                            onClick={() => handleRemoveKeyword(keyword.id)}
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
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
    gap: '24px',
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
  tabs: {
    display: 'flex',
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '4px',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
  },
  tab: {
    flex: 1,
    padding: '12px 16px',
    backgroundColor: 'transparent',
    border: 'none',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '500',
    color: '#6b7280',
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
  activeTab: {
    backgroundColor: '#3b82f6',
    color: 'white',
  },
  searchSection: {
    display: 'flex',
  },
  searchInput: {
    flex: 1,
    padding: '12px 16px',
    borderRadius: '12px',
    border: '1px solid #d1d5db',
    fontSize: '16px',
    backgroundColor: 'white',
  },
  tabContent: {
    backgroundColor: 'white',
    borderRadius: '16px',
    padding: '24px',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    minHeight: '400px',
  },
  usersList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  userItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '16px',
    borderRadius: '12px',
    border: '1px solid #f3f4f6',
    backgroundColor: '#fafafa',
  },
  userInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  userAvatar: {
    width: '48px',
    height: '48px',
    borderRadius: '50%',
    backgroundColor: '#e5e7eb',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '24px',
  },
  userDetails: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2px',
  },
  userName: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#1f2937',
    margin: 0,
  },
  userUsername: {
    fontSize: '14px',
    color: '#6b7280',
    margin: 0,
  },
  userMeta: {
    fontSize: '12px',
    color: '#9ca3af',
    margin: 0,
  },
  actionButton: {
    padding: '8px 16px',
    borderRadius: '8px',
    border: '1px solid #d1d5db',
    backgroundColor: 'white',
    color: '#374151',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
  unblockButton: {
    borderColor: '#ef4444',
    color: '#ef4444',
  },
  keywordsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  addKeywordSection: {
    display: 'flex',
    gap: '12px',
  },
  keywordInput: {
    flex: 1,
    padding: '12px 16px',
    borderRadius: '8px',
    border: '1px solid #d1d5db',
    fontSize: '14px',
  },
  addButton: {
    padding: '12px 20px',
    borderRadius: '8px',
    border: 'none',
    backgroundColor: '#3b82f6',
    color: 'white',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
  },
  keywordsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
    gap: '12px',
  },
  keywordItem: {
    display: 'flex',
    flexDirection: 'column',
    padding: '12px',
    borderRadius: '8px',
    border: '1px solid #e5e7eb',
    backgroundColor: '#f9fafb',
    position: 'relative',
  },
  keywordText: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#374151',
  },
  keywordMeta: {
    fontSize: '12px',
    color: '#9ca3af',
    marginTop: '4px',
  },
  removeButton: {
    position: 'absolute',
    top: '8px',
    right: '8px',
    width: '20px',
    height: '20px',
    borderRadius: '50%',
    border: 'none',
    backgroundColor: '#ef4444',
    color: 'white',
    fontSize: '14px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyState: {
    textAlign: 'center',
    padding: '60px 20px',
    color: '#6b7280',
  },
  emptyIcon: {
    fontSize: '48px',
    marginBottom: '16px',
    display: 'block',
  },
};
