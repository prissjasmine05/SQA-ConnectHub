// pages/create-event/index.js
import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import Button from '../../components/Button';

export default function CreateEvent() {
  const [hoveredTab, setHoveredTab] = useState(null);

  const events = [
    {
      id: 1,
      title: 'Tech Talk: AI in Everyday Life',
      description: 'Join us for an insightful discussion on how artificial intelligence is shaping our daily routines and future innovations.',
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=200&fit=crop',
      imageAlt: 'AI Technology'
    },
    {
      id: 2,
      title: 'Book Club: "The Silent Observer"',
      description: 'Dive into a thrilling mystery novel with fellow book enthusiasts. Share your thoughts and theories in a lively discussion.',
      image: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=400&h=200&fit=crop',
      imageAlt: 'Book Club'
    },
    {
      id: 3,
      title: 'Photography',
      description: 'Capture the beauty of Central Park with a guided photography walk. All skill levels are welcome.',
      image: 'https://images.unsplash.com/photo-1511406361295-0a1ff814c0ce?w=400&h=200&fit=crop',
      imageAlt: 'Photography'
    },
    {
      id: 4,
      title: 'Coding Workshop for Beginners',
      description: 'Learn the basics of coding in a hands-on workshop designed for beginners. No prior experience required.',
      image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=200&fit=crop',
      imageAlt: 'Coding Workshop'
    }
  ];

  return (
    <div style={styles.page}>
      <Navbar />
      
      <main style={styles.main}>
        {/* Header Section */}
        <section style={styles.header}>
          <h1 style={styles.title}>Community Events</h1>
          
          <p style={styles.description}>
            A vibrant community for tech lovers to discuss the latest trends, gadgets, and innovations. Join us to share your insights and connect with fellow enthusiasts.
          </p>

          {/* Tabs */}
          <div style={styles.tabsWrapper}>
            <div style={styles.tabs}>
              <button 
                style={{
                  ...styles.tab,
                  ...(hoveredTab === 'posts' && styles.tabHover)
                }}
                onClick={() => window.location.href = '/community-profile'}
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
                  ...styles.tabActive
                }}
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

        {/* Events List */}
        <section style={styles.events}>
          {events.map((event) => (
            <article key={event.id} style={styles.eventCard}>
              <div style={styles.eventContent}>
                <h2 style={styles.eventTitle}>{event.title}</h2>
                <p style={styles.eventDescription}>{event.description}</p>
                <div style={styles.buttonWrapper}>
                  <Button variant="primary" size="medium">
                    Participants
                  </Button>
                </div>
              </div>
              <div style={styles.eventImage}>
                <img 
                  src={event.image}
                  alt={event.imageAlt}
                  style={styles.image}
                />
              </div>
            </article>
          ))}
        </section>

        {/* Floating Action Button */}
        <button 
          style={styles.fab}
          onClick={() => window.location.href = '/create-event/form-create-event'}
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
    paddingTop: '60px',
    maxWidth: '800px',
    margin: '0 auto',
    padding: '80px 24px 32px',
  },
  header: {
    marginBottom: '40px',
  },
  title: {
    fontSize: '36px',
    fontWeight: '700',
    color: '#1d1d1f',
    marginBottom: '12px',
    letterSpacing: '-0.02em',
  },
  description: {
    fontSize: '15px',
    color: '#6b7280',
    lineHeight: '1.6',
    marginBottom: '32px',
  },
  tabsWrapper: {
    width: '100%',
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
    fontWeight: '600',
  },
  tabHover: {
    color: '#7c5cdb',
  },
  events: {
    marginTop: '32px',
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
  },
  eventCard: {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '28px',
    display: 'flex',
    gap: '24px',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
  },
  eventContent: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  eventTitle: {
    fontSize: '20px',
    fontWeight: '600',
    color: '#1d1d1f',
    marginBottom: '8px',
    lineHeight: '1.3',
  },
  eventDescription: {
    fontSize: '14px',
    color: '#6b7280',
    lineHeight: '1.6',
    marginBottom: '20px',
    flex: 1,
  },
  buttonWrapper: {
    alignSelf: 'flex-start',
  },
  eventImage: {
    width: '220px',
    height: '140px',
    borderRadius: '12px',
    overflow: 'hidden',
    flexShrink: 0,
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  fab: {
    position: 'fixed',
    bottom: '32px',
    right: '32px',
    width: '64px',
    height: '64px',
    borderRadius: '50%',
    backgroundColor: '#7c5cdb',
    color: 'white',
    border: 'none',
    fontSize: '32px',
    cursor: 'pointer',
    boxShadow: '0 4px 12px rgba(124, 92, 219, 0.4)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'transform 0.2s, box-shadow 0.2s',
  },
  fabIcon: {
    lineHeight: '1',
  },
};