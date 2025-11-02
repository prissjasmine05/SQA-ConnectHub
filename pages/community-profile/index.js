// pages/community-profile/index.js
import React, { useState } from 'react';
import Navbar from '../../components/Navbar';

export default function Community() {
  const [hoveredTab, setHoveredTab] = useState(null);

  return (
    <div style={styles.page}>
      <Navbar />
      
      <main style={styles.main}>
        {/* Hero Section */}
        <section style={styles.hero}>
          <div style={styles.communityIcon}>
            <div style={styles.iconCircle}>
              <span style={styles.iconEmoji}>🌟</span>
            </div>
          </div>

          <h1 style={styles.title}>Tech Enthusiasts Community</h1>
          
          <p style={styles.description}>
            A vibrant community for tech lovers to discuss the latest trends, gadgets, and innovations. Join us to share your insights and connect with fellow enthusiasts.
          </p>

          <div style={styles.members}>12K members · Public group</div>

          <div style={styles.actions}>
            <button style={styles.joinButton}>
              Edit Community
            </button>
            <button style={styles.settingsButton}>
              <span>⚙️</span>
            </button>
          </div>

          {/* Tabs */}
          <div style={styles.tabsWrapper}>
            <div style={styles.tabs}>
              <button 
                style={{
                  ...styles.tab, 
                  ...styles.tabActive,
                  ...(hoveredTab === 'posts' && styles.tabHover)
                }}
                onMouseEnter={() => setHoveredTab('posts')}
                onMouseLeave={() => setHoveredTab(null)}
              >
                Posts
              </button>
              <button 
                style={{
                  ...styles.tab,
                  ...(hoveredTab === 'members' && styles.tabHover)
                }}
                onMouseEnter={() => setHoveredTab('members')}
                onMouseLeave={() => setHoveredTab(null)}
              >
                Members
              </button>
              <button 
                style={{
                  ...styles.tab,
                  ...(hoveredTab === 'events' && styles.tabHover)
                }}
                onClick={() => window.location.href = '/create-event'}
                onMouseEnter={() => setHoveredTab('events')}
                onMouseLeave={() => setHoveredTab(null)}
              >
                Events
              </button>
              <button 
                style={{
                  ...styles.tab,
                  ...(hoveredTab === 'about' && styles.tabHover)
                }}
                onMouseEnter={() => setHoveredTab('about')}
                onMouseLeave={() => setHoveredTab(null)}
              >
                About
              </button>
            </div>
          </div>
        </section>

        {/* Posts Section */}
        <section style={styles.posts}>
          {/* Post 1 */}
          <article style={styles.post}>
            <div style={styles.postHeader}>
              <div style={styles.authorInfo}>
                <div style={styles.avatar}>🌿</div>
                <div>
                  <div style={styles.authorName}>Eco Warriors</div>
                  <div style={styles.category}>in Sustainable Living</div>
                </div>
              </div>
            </div>

            <div style={styles.postContent}>
              <div style={styles.postText}>
                <h2 style={styles.postTitle}>Exploring the Latest in Sustainable Living</h2>
                <p style={styles.postBody}>
                  Discover innovative ways to reduce your carbon footprint and live a more eco-friendly lifestyle. From renewable energy solutions to zero-waste tips, join the conversation and share your ideas.
                </p>
              </div>
              <div style={styles.postImage}>
                <img 
                  src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=400&h=300&fit=crop" 
                  alt="Sustainable Living"
                  style={styles.image}
                />
              </div>
            </div>

            <div style={styles.postFooter}>
              <div style={styles.stats}>
                <span style={styles.stat}>❤️ 1.2k</span>
                <span style={styles.stat}>💬 345</span>
                <span style={styles.stat}>🔗 189</span>
              </div>
              <span style={styles.time}>2 hours ago</span>
            </div>
          </article>

          {/* Post 2 */}
          <article style={styles.post}>
            <div style={styles.postHeader}>
              <div style={styles.authorInfo}>
                <div style={{...styles.avatar, backgroundColor: '#86efac'}}>🌱</div>
                <div>
                  <div style={styles.authorName}>Green Thumbs</div>
                  <div style={styles.category}>in Urban Gardening</div>
                </div>
              </div>
            </div>

            <div style={styles.postContent}>
              <div style={styles.postText}>
                <h2 style={styles.postTitle}>The Art of Urban Gardening</h2>
                <p style={styles.postBody}>
                  Transform your city space into a green oasis. Learn about vertical gardening, container planting, and the best crops for urban environments. Share your gardening successes and challenges.
                </p>
              </div>
              <div style={styles.postImage}>
                <img 
                  src="https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=400&h=300&fit=crop" 
                  alt="Urban Gardening"
                  style={styles.image}
                />
              </div>
            </div>

            <div style={styles.postFooter}>
              <div style={styles.stats}>
                <span style={styles.stat}>❤️ 876</span>
                <span style={styles.stat}>💬 123</span>
                <span style={styles.stat}>🔗 98</span>
              </div>
              <span style={styles.time}>5 hours ago</span>
            </div>
          </article>
        </section>

        {/* Floating Action Button */}
        <button 
          style={styles.fab}
          onClick={() => window.location.href = '/community-profile/create-post'}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.1)';
            e.currentTarget.style.boxShadow = '0 8px 20px rgba(124, 92, 219, 0.5)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(124, 92, 219, 0.4)';
          }}
        >
          <span style={styles.fabIcon}>+</span>
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
    paddingTop: '64px',
    maxWidth: '680px',
    margin: '0 auto',
    padding: '64px 16px 32px',
  },
  hero: {
    textAlign: 'center',
    marginBottom: '32px',
  },
  communityIcon: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '24px',
  },
  iconCircle: {
    width: '100px',
    height: '100px',
    borderRadius: '50%',
    backgroundColor: '#fef3c7',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '48px',
  },
  iconEmoji: {
    fontSize: '48px',
  },
  title: {
    fontSize: '32px',
    fontWeight: '700',
    color: '#111827',
    marginBottom: '16px',
    letterSpacing: '-0.02em',
  },
  description: {
    fontSize: '15px',
    color: '#6b7280',
    lineHeight: '1.6',
    maxWidth: '600px',
    margin: '0 auto 16px',
  },
  members: {
    fontSize: '14px',
    color: '#6b7280',
    marginBottom: '24px',
    fontWeight: '500',
  },
  actions: {
    display: 'flex',
    gap: '12px',
    justifyContent: 'center',
    marginBottom: '32px',
  },
  joinButton: {
    backgroundColor: '#6366f1',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    padding: '12px 24px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    transition: 'background-color 0.2s',
  },
  joinIcon: {
    fontSize: '16px',
  },
  settingsButton: {
    backgroundColor: 'white',
    border: '1px solid #e5e7eb',
    borderRadius: '8px',
    padding: '12px 16px',
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
  },
  tabsWrapper: {
    width: '100%',
    maxWidth: '680px',
    margin: '0 auto',
    borderBottom: '1px solid #e5e7eb',
  },
  tabs: {
    display: 'flex',
    gap: '32px',
    justifyContent: 'flex-start',
    paddingLeft: '0',
  },
  tab: {
    backgroundColor: 'transparent',
    border: 'none',
    borderBottom: '2px solid transparent',
    padding: '12px 4px',
    fontSize: '15px',
    fontWeight: '500',
    color: '#6b7280',
    cursor: 'pointer',
    position: 'relative',
    transition: 'all 0.2s ease',
  },
  tabActive: {
    color: '#7c5cdb',
    borderBottom: '2px solid #7c5cdb',
  },
  tabHover: {
    color: '#7c5cdb',
  },
  posts: {
    marginTop: '32px',
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
  },
  post: {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '24px',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
  },
  postHeader: {
    marginBottom: '16px',
  },
  authorInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  avatar: {
    width: '48px',
    height: '48px',
    borderRadius: '50%',
    backgroundColor: '#d4f4dd',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '24px',
  },
  authorName: {
    fontSize: '15px',
    fontWeight: '600',
    color: '#111827',
  },
  category: {
    fontSize: '13px',
    color: '#6b7280',
  },
  postContent: {
    display: 'flex',
    gap: '20px',
    marginBottom: '16px',
  },
  postText: {
    flex: 1,
  },
  postTitle: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#111827',
    marginBottom: '8px',
    lineHeight: '1.4',
  },
  postBody: {
    fontSize: '14px',
    color: '#6b7280',
    lineHeight: '1.6',
  },
  postImage: {
    width: '180px',
    height: '140px',
    borderRadius: '8px',
    overflow: 'hidden',
    flexShrink: 0,
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  postFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: '16px',
    borderTop: '1px solid #f3f4f6',
  },
  stats: {
    display: 'flex',
    gap: '16px',
  },
  stat: {
    fontSize: '14px',
    color: '#6b7280',
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
  },
  time: {
    fontSize: '13px',
    color: '#9ca3af',
  },
  fab: {
    position: 'fixed',
    bottom: '32px',
    right: '32px',
    width: '64px',
    height: '64px',
    borderRadius: '50%',
    backgroundColor: '#6366f1',
    color: 'white',
    border: 'none',
    fontSize: '32px',
    cursor: 'pointer',
    boxShadow: '0 4px 12px rgba(99, 102, 241, 0.4)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'transform 0.2s, box-shadow 0.2s',
  },
  fabIcon: {
    lineHeight: '1',
  },
};