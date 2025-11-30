import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Navbar from '../../components/Navbar';

export default function Settings() {
  const router = useRouter();
  const [hoveredItem, setHoveredItem] = useState(null);

  const settingsItems = [
    {
      id: 'community',
      title: 'Community',
      description: 'Manage your community',
      icon: '#',
      color: '#f3e8ff',
      route: '/settings/community'
    },
    {
      id: 'screen-time',
      title: 'Screen Time Control',
      description: 'Manage your screen time',
      icon: '⏰',
      color: '#dcfce7',
      route: '/settings/screen-time'
    },
    {
      id: 'change-account',
      title: 'Change Account',
      description: 'Manage your account info community',
      icon: '#',
      color: '#e0f2fe',
      route: '/settings/change-account',
      highlighted: true
    },
    {
      id: 'privacy',
      title: 'Privacy Settings',
      description: 'Manage your privacy settings',
      icon: '🔒',
      color: '#e9d5ff',
      route: '/settings/privacy'
    },
    {
      id: 'interest',
      title: 'Interest',
      description: 'Manage your interest',
      icon: '⭐',
      color: '#fed7aa',
      route: '/settings/interest'
    },
    {
      id: 'mute-block',
      title: 'Mute & Block',
      description: 'Manage the accounts and words that you\'ve muted or blocked',
      icon: '🚫',
      color: '#bfdbfe',
      route: '/settings/mute-block'
    }
  ];

  const handleItemClick = (route) => {
    router.push(route);
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
              ×
            </button>
            <h1 style={styles.title}>Settings</h1>
          </div>

          <div style={styles.content}>
            {/* Account Section */}
            <section style={styles.section}>
              <h2 style={styles.sectionTitle}>Account</h2>
              <div style={styles.itemsList}>
                {settingsItems.slice(0, 3).map((item) => (
                  <div
                    key={item.id}
                    style={{
                      ...styles.settingsItem,
                      backgroundColor: item.color,
                      ...(item.highlighted && styles.highlightedItem),
                      ...(hoveredItem === item.id && styles.hoveredItem)
                    }}
                    onClick={() => handleItemClick(item.route)}
                    onMouseEnter={() => setHoveredItem(item.id)}
                    onMouseLeave={() => setHoveredItem(null)}
                  >
                    <div style={styles.itemIcon}>
                      <span>{item.icon}</span>
                    </div>
                    <div style={styles.itemContent}>
                      <h3 style={styles.itemTitle}>{item.title}</h3>
                      <p style={styles.itemDescription}>{item.description}</p>
                    </div>
                    <div style={styles.itemArrow}>
                      <span>›</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Privacy Section */}
            <section style={styles.section}>
              <h2 style={styles.sectionTitle}>Privacy</h2>
              <div style={styles.itemsList}>
                {settingsItems.slice(3).map((item) => (
                  <div
                    key={item.id}
                    style={{
                      ...styles.settingsItem,
                      backgroundColor: item.color,
                      ...(hoveredItem === item.id && styles.hoveredItem)
                    }}
                    onClick={() => handleItemClick(item.route)}
                    onMouseEnter={() => setHoveredItem(item.id)}
                    onMouseLeave={() => setHoveredItem(null)}
                  >
                    <div style={styles.itemIcon}>
                      <span>{item.icon}</span>
                    </div>
                    <div style={styles.itemContent}>
                      <h3 style={styles.itemTitle}>{item.title}</h3>
                      <p style={styles.itemDescription}>{item.description}</p>
                    </div>
                    <div style={styles.itemArrow}>
                      <span>›</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
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
    maxWidth: '800px',
    margin: '0 auto',
    padding: '0 20px',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '40px',
    position: 'relative',
  },
  backButton: {
    position: 'absolute',
    right: 0,
    background: 'none',
    border: 'none',
    fontSize: '32px',
    cursor: 'pointer',
    color: '#64748b',
    padding: '8px',
    borderRadius: '8px',
    transition: 'background-color 0.2s',
  },
  title: {
    fontSize: '36px',
    fontWeight: '700',
    color: '#1e293b',
    margin: 0,
    flex: 1,
    textAlign: 'center',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    gap: '32px',
  },
  section: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  sectionTitle: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#374151',
    margin: 0,
    marginBottom: '8px',
  },
  itemsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  settingsItem: {
    display: 'flex',
    alignItems: 'center',
    padding: '20px',
    borderRadius: '16px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    border: '1px solid transparent',
  },
  highlightedItem: {
    border: '2px solid #3b82f6',
    boxShadow: '0 0 0 1px #3b82f6',
  },
  hoveredItem: {
    transform: 'translateY(-2px)',
    boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)',
  },
  itemIcon: {
    width: '48px',
    height: '48px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '24px',
    marginRight: '16px',
    flexShrink: 0,
  },
  itemContent: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },
  itemTitle: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#1f2937',
    margin: 0,
  },
  itemDescription: {
    fontSize: '14px',
    color: '#6b7280',
    margin: 0,
    lineHeight: '1.4',
  },
  itemArrow: {
    fontSize: '20px',
    color: '#9ca3af',
    marginLeft: '12px',
    flexShrink: 0,
  },
};
