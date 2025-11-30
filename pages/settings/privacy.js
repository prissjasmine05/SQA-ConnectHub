import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Navbar from '../../components/Navbar';

export default function PrivacySettings() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '', type: '' });
  const [settings, setSettings] = useState({
    profileVisibility: 'public',
    messagePermissions: 'friends',
    friendRequests: 'everyone',
    activityStatus: true,
    readReceipts: true,
    lastSeen: true,
    dataCollection: false,
    personalization: true,
    analyticsSharing: false,
    locationSharing: false,
    phoneNumberVisibility: 'friends',
    emailVisibility: 'private',
    searchable: true,
    blockedUsers: [],
    mutedUsers: []
  });

  // Load existing settings
  useEffect(() => {
    const loadSettings = async () => {
      try {
        const response = await fetch('/api/user/privacy-settings', {
          credentials: 'include'
        });
        
        if (response.ok) {
          const data = await response.json();
          setSettings(prev => ({ ...prev, ...data.settings }));
        }
      } catch (error) {
        console.error('Error loading privacy settings:', error);
      } finally {
        setLoading(false);
      }
    };

    loadSettings();
  }, []);

  const handleToggle = (setting) => {
    setSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  const handleSelectChange = (setting, value) => {
    setSettings(prev => ({
      ...prev,
      [setting]: value
    }));
  };

  const handleSaveSettings = async () => {
    setSaving(true);
    try {
      const response = await fetch('/api/user/privacy-settings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({ settings })
      });

      if (response.ok) {
        setToast({ show: true, message: 'Privacy settings saved successfully!', type: 'success' });
        setTimeout(() => setToast({ show: false, message: '', type: '' }), 3000);
      } else {
        throw new Error('Failed to save settings');
      }
    } catch (error) {
      console.error('Error saving privacy settings:', error);
      setToast({ show: true, message: 'Failed to save settings. Please try again.', type: 'error' });
      setTimeout(() => setToast({ show: false, message: '', type: '' }), 3000);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div style={styles.page}>
        <Navbar />
        <div style={styles.main}>
          <div style={styles.container}>
            <div style={styles.loading}>Loading privacy settings...</div>
          </div>
        </div>
      </div>
    );
  }

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
            <h1 style={styles.title}>Privacy Settings</h1>
          </div>

          <div style={styles.content}>
            {/* Profile Privacy */}
            <section style={styles.section}>
              <h2 style={styles.sectionTitle}>Profile Privacy</h2>
              <div style={styles.settingItem}>
                <div style={styles.settingInfo}>
                  <h3 style={styles.settingTitle}>Profile Visibility</h3>
                  <p style={styles.settingDescription}>Who can see your profile information</p>
                </div>
                <select 
                  style={styles.select}
                  value={settings.profileVisibility}
                  onChange={(e) => handleSelectChange('profileVisibility', e.target.value)}
                >
                  <option value="public">Public</option>
                  <option value="friends">Friends Only</option>
                  <option value="private">Private</option>
                </select>
              </div>

              <div style={styles.settingItem}>
                <div style={styles.settingInfo}>
                  <h3 style={styles.settingTitle}>Message Permissions</h3>
                  <p style={styles.settingDescription}>Who can send you direct messages</p>
                </div>
                <select 
                  style={styles.select}
                  value={settings.messagePermissions}
                  onChange={(e) => handleSelectChange('messagePermissions', e.target.value)}
                >
                  <option value="everyone">Everyone</option>
                  <option value="friends">Friends Only</option>
                  <option value="none">No One</option>
                </select>
              </div>

              <div style={styles.settingItem}>
                <div style={styles.settingInfo}>
                  <h3 style={styles.settingTitle}>Friend Requests</h3>
                  <p style={styles.settingDescription}>Who can send you friend requests</p>
                </div>
                <select 
                  style={styles.select}
                  value={settings.friendRequests}
                  onChange={(e) => handleSelectChange('friendRequests', e.target.value)}
                >
                  <option value="everyone">Everyone</option>
                  <option value="friends-of-friends">Friends of Friends</option>
                  <option value="none">No One</option>
                </select>
              </div>
            </section>

            {/* Activity Privacy */}
            <section style={styles.section}>
              <h2 style={styles.sectionTitle}>Activity Privacy</h2>
              <div style={styles.settingItem}>
                <div style={styles.settingInfo}>
                  <h3 style={styles.settingTitle}>Activity Status</h3>
                  <p style={styles.settingDescription}>Show when you're active or recently active</p>
                </div>
                <button
                  style={{
                    ...styles.toggle,
                    backgroundColor: settings.activityStatus ? '#10b981' : '#e5e7eb'
                  }}
                  onClick={() => handleToggle('activityStatus')}
                >
                  <div style={{
                    ...styles.toggleThumb,
                    transform: settings.activityStatus ? 'translateX(20px)' : 'translateX(2px)'
                  }} />
                </button>
              </div>

              <div style={styles.settingItem}>
                <div style={styles.settingInfo}>
                  <h3 style={styles.settingTitle}>Read Receipts</h3>
                  <p style={styles.settingDescription}>Let others know when you've read their messages</p>
                </div>
                <button
                  style={{
                    ...styles.toggle,
                    backgroundColor: settings.readReceipts ? '#10b981' : '#e5e7eb'
                  }}
                  onClick={() => handleToggle('readReceipts')}
                >
                  <div style={{
                    ...styles.toggleThumb,
                    transform: settings.readReceipts ? 'translateX(20px)' : 'translateX(2px)'
                  }} />
                </button>
              </div>

              <div style={styles.settingItem}>
                <div style={styles.settingInfo}>
                  <h3 style={styles.settingTitle}>Last Seen</h3>
                  <p style={styles.settingDescription}>Show when you were last active</p>
                </div>
                <button
                  style={{
                    ...styles.toggle,
                    backgroundColor: settings.lastSeen ? '#10b981' : '#e5e7eb'
                  }}
                  onClick={() => handleToggle('lastSeen')}
                >
                  <div style={{
                    ...styles.toggleThumb,
                    transform: settings.lastSeen ? 'translateX(20px)' : 'translateX(2px)'
                  }} />
                </button>
              </div>
            </section>

            {/* Data Privacy */}
            <section style={styles.section}>
              <h2 style={styles.sectionTitle}>Data Privacy</h2>
              <div style={styles.settingItem}>
                <div style={styles.settingInfo}>
                  <h3 style={styles.settingTitle}>Data Collection</h3>
                  <p style={styles.settingDescription}>Allow collection of usage data for service improvement</p>
                </div>
                <button
                  style={{
                    ...styles.toggle,
                    backgroundColor: settings.dataCollection ? '#10b981' : '#e5e7eb'
                  }}
                  onClick={() => handleToggle('dataCollection')}
                >
                  <div style={{
                    ...styles.toggleThumb,
                    transform: settings.dataCollection ? 'translateX(20px)' : 'translateX(2px)'
                  }} />
                </button>
              </div>

              <div style={styles.settingItem}>
                <div style={styles.settingInfo}>
                  <h3 style={styles.settingTitle}>Personalization</h3>
                  <p style={styles.settingDescription}>Use your activity to personalize your experience</p>
                </div>
                <button
                  style={{
                    ...styles.toggle,
                    backgroundColor: settings.personalization ? '#10b981' : '#e5e7eb'
                  }}
                  onClick={() => handleToggle('personalization')}
                >
                  <div style={{
                    ...styles.toggleThumb,
                    transform: settings.personalization ? 'translateX(20px)' : 'translateX(2px)'
                  }} />
                </button>
              </div>

              <div style={styles.settingItem}>
                <div style={styles.settingInfo}>
                  <h3 style={styles.settingTitle}>Analytics Sharing</h3>
                  <p style={styles.settingDescription}>Share anonymized analytics data with third parties</p>
                </div>
                <button
                  style={{
                    ...styles.toggle,
                    backgroundColor: settings.analyticsSharing ? '#10b981' : '#e5e7eb'
                  }}
                  onClick={() => handleToggle('analyticsSharing')}
                >
                  <div style={{
                    ...styles.toggleThumb,
                    transform: settings.analyticsSharing ? 'translateX(20px)' : 'translateX(2px)'
                  }} />
                </button>
              </div>
              <div style={styles.settingItem}>
                <div style={styles.settingInfo}>
                  <h3 style={styles.settingTitle}>Location Sharing</h3>
                  <p style={styles.settingDescription}>Allow location-based features and recommendations</p>
                </div>
                <button
                  style={{
                    ...styles.toggle,
                    backgroundColor: settings.locationSharing ? '#10b981' : '#e5e7eb'
                  }}
                  onClick={() => handleToggle('locationSharing')}
                >
                  <div style={{
                    ...styles.toggleThumb,
                    transform: settings.locationSharing ? 'translateX(20px)' : 'translateX(2px)'
                  }} />
                </button>
              </div>
            </section>

            {/* Contact Information */}
            <section style={styles.section}>
              <h2 style={styles.sectionTitle}>Contact Information</h2>
              <div style={styles.settingItem}>
                <div style={styles.settingInfo}>
                  <h3 style={styles.settingTitle}>Phone Number Visibility</h3>
                  <p style={styles.settingDescription}>Who can see your phone number</p>
                </div>
                <select 
                  style={styles.select}
                  value={settings.phoneNumberVisibility}
                  onChange={(e) => handleSelectChange('phoneNumberVisibility', e.target.value)}
                >
                  <option value="public">Public</option>
                  <option value="friends">Friends Only</option>
                  <option value="private">Private</option>
                </select>
              </div>

              <div style={styles.settingItem}>
                <div style={styles.settingInfo}>
                  <h3 style={styles.settingTitle}>Email Visibility</h3>
                  <p style={styles.settingDescription}>Who can see your email address</p>
                </div>
                <select 
                  style={styles.select}
                  value={settings.emailVisibility}
                  onChange={(e) => handleSelectChange('emailVisibility', e.target.value)}
                >
                  <option value="public">Public</option>
                  <option value="friends">Friends Only</option>
                  <option value="private">Private</option>
                </select>
              </div>

              <div style={styles.settingItem}>
                <div style={styles.settingInfo}>
                  <h3 style={styles.settingTitle}>Searchable Profile</h3>
                  <p style={styles.settingDescription}>Allow others to find you through search</p>
                </div>
                <button
                  style={{
                    ...styles.toggle,
                    backgroundColor: settings.searchable ? '#10b981' : '#e5e7eb'
                  }}
                  onClick={() => handleToggle('searchable')}
                >
                  <div style={{
                    ...styles.toggleThumb,
                    transform: settings.searchable ? 'translateX(20px)' : 'translateX(2px)'
                  }} />
                </button>
              </div>
            </section>

            {/* Advanced Privacy */}
            <section style={styles.section}>
              <h2 style={styles.sectionTitle}>Advanced Privacy</h2>
              <div style={styles.advancedItem}>
                <div style={styles.settingInfo}>
                  <h3 style={styles.settingTitle}>Blocked Users</h3>
                  <p style={styles.settingDescription}>Manage users you've blocked</p>
                </div>
                <button 
                  style={styles.manageButton}
                  onClick={() => router.push('/settings/mute-block')}
                >
                  Manage ({settings.blockedUsers?.length || 0})
                </button>
              </div>

              <div style={styles.advancedItem}>
                <div style={styles.settingInfo}>
                  <h3 style={styles.settingTitle}>Download Your Data</h3>
                  <p style={styles.settingDescription}>Download a copy of your data</p>
                </div>
                <button style={styles.downloadButton}>
                  Request Download
                </button>
              </div>

              <div style={styles.advancedItem}>
                <div style={styles.settingInfo}>
                  <h3 style={styles.settingTitle}>Delete Account</h3>
                  <p style={styles.settingDescription}>Permanently delete your account and all data</p>
                </div>
                <button 
                  style={styles.deleteButton}
                  onClick={() => alert('Account deletion feature will be implemented soon.')}
                >
                  Delete Account
                </button>
              </div>
            </section>

            {/* Save Button */}
            <div style={styles.actions}>
              <button 
                style={{
                  ...styles.saveButton,
                  ...(saving && styles.savingButton)
                }}
                onClick={handleSaveSettings}
                disabled={saving}
              >
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
              <button style={styles.cancelButton} onClick={() => router.back()}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Toast Notification */}
      {toast.show && (
        <div style={{
          ...styles.toast,
          backgroundColor: toast.type === 'success' ? '#10b981' : '#ef4444'
        }}>
          <span>{toast.message}</span>
          <button 
            style={styles.toastClose}
            onClick={() => setToast({ show: false, message: '', type: '' })}
          >
            ×
          </button>
        </div>
      )}
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
    maxWidth: '800px',
    margin: '0 auto',
    padding: '0 20px',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '40px',
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
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
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
  section: {
    backgroundColor: 'white',
    borderRadius: '16px',
    padding: '24px',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
  },
  sectionTitle: {
    fontSize: '20px',
    fontWeight: '600',
    color: '#374151',
    margin: '0 0 20px 0',
  },
  settingItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '16px 0',
    borderBottom: '1px solid #f3f4f6',
  },
  settingInfo: {
    flex: 1,
  },
  settingTitle: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#1f2937',
    margin: '0 0 4px 0',
  },
  settingDescription: {
    fontSize: '14px',
    color: '#6b7280',
    margin: 0,
    lineHeight: '1.4',
  },
  select: {
    padding: '8px 12px',
    borderRadius: '8px',
    border: '1px solid #d1d5db',
    fontSize: '14px',
    color: '#374151',
    backgroundColor: 'white',
    cursor: 'pointer',
    minWidth: '120px',
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
  actions: {
    display: 'flex',
    gap: '12px',
    justifyContent: 'flex-end',
    paddingTop: '20px',
  },
  saveButton: {
    backgroundColor: '#3b82f6',
    color: 'white',
    border: 'none',
    padding: '12px 24px',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
  },
  cancelButton: {
    backgroundColor: '#6b7280',
    color: 'white',
    border: 'none',
    padding: '12px 24px',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
  },
  loading: {
    textAlign: 'center',
    padding: '60px 20px',
    fontSize: '18px',
    color: '#6b7280',
  },
  savingButton: {
    backgroundColor: '#9ca3af',
    cursor: 'not-allowed',
  },
  advancedItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '20px 0',
    borderBottom: '1px solid #f3f4f6',
  },
  manageButton: {
    backgroundColor: '#3b82f6',
    color: 'white',
    border: 'none',
    padding: '10px 16px',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
  },
  downloadButton: {
    backgroundColor: '#10b981',
    color: 'white',
    border: 'none',
    padding: '10px 16px',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
  },
  deleteButton: {
    backgroundColor: '#ef4444',
    color: 'white',
    border: 'none',
    padding: '10px 16px',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
  },
  toast: {
    position: 'fixed',
    bottom: '20px',
    right: '20px',
    color: 'white',
    padding: '16px 20px',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
    zIndex: 1000,
    fontSize: '14px',
    fontWeight: '500',
  },
  toastClose: {
    background: 'none',
    border: 'none',
    color: 'white',
    fontSize: '18px',
    cursor: 'pointer',
    padding: '0',
    width: '20px',
    height: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
};
