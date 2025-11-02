// pages/create-event/notifications.js
import React from 'react';
import Navbar from '../../components/Navbar';

export default function Notifications() {
  const newEventRegistrations = [
    {
      id: 1,
      eventName: "Tech Talk: AI in Business",
      registrationDateTime: "2024-03-15 10:00 AM",
      memberName: "Sophia Carter"
    },
    {
      id: 2,
      eventName: "Tech Talk: AI in Business",
      registrationDateTime: "2024-03-16 02:30 PM",
      memberName: "Ethan Clark"
    }
  ];

  const communityPosts = [
    {
      id: 1,
      communityName: "Tech Innovators",
      preview: "We've updated our community guidelines to ensure a safe and inclusive environment for all members.",
      postTitle: "Exciting News: New Community Guidelines"
    },
    {
      id: 2,
      communityName: "Tech Innovators",
      preview: "Get to know Olivia Bennett, a valued member of our community, and her contributions to the tech industry.",
      postTitle: "Member Spotlight: Meet Olivia Bennett"
    }
  ];

  const reports = [
    {
      id: 1,
      reportTitle: "User Reported a Post",
      reportType: "Content Violation",
      relatedItem: "Inappropriate Content"
    },
    {
      id: 2,
      reportTitle: "User Reported an Event",
      reportType: "Spam",
      relatedItem: "Spam Event"
    }
  ];

  return (
    <div style={styles.page}>
      <Navbar />
      
      <main style={styles.main}>
        {/* Page Title */}
        <h1 style={styles.pageTitle}>Notifications</h1>

        {/* New Event Registrations Section */}
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>New Event Registrations</h2>
          
          {newEventRegistrations.map((item) => (
            <div key={item.id} style={styles.notificationCard}>
              <div style={styles.cardContent}>
                <div style={styles.cardTitle}>Event: '{item.eventName}'</div>
                <div style={styles.cardDetail}>Registration Date/Time: {item.registrationDateTime}</div>
                <div style={styles.cardDetail}>Member: {item.memberName}</div>
              </div>
              <button style={styles.actionButton}>View Registrations</button>
            </div>
          ))}
        </section>

        {/* Community Posts & Updates Section */}
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>Community Posts & Updates</h2>
          
          {communityPosts.map((item) => (
            <div key={item.id} style={styles.notificationCard}>
              <div style={styles.cardContent}>
                <div style={styles.cardTitle}>Community: '{item.communityName}'</div>
                <div style={styles.cardDetail}>Preview: '{item.preview}'</div>
                <div style={styles.cardDetail}>Post Title: '{item.postTitle}'</div>
              </div>
              <button style={styles.actionButton}>Review Post</button>
            </div>
          ))}
        </section>

        {/* Reports / Issues Section */}
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>Reports / Issues</h2>
          
          {reports.map((item) => (
            <div key={item.id} style={styles.notificationCard}>
              <div style={styles.cardContent}>
                <div style={styles.cardTitle}>Report: '{item.reportTitle}'</div>
                <div style={styles.cardDetail}>Report Type: '{item.reportType}'</div>
                <div style={styles.cardDetail}>Related {item.reportType === 'Content Violation' ? 'Post' : 'Event'}: '{item.relatedItem}'</div>
              </div>
              <button style={styles.actionButton}>Review Report</button>
            </div>
          ))}
        </section>
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
    maxWidth: '1000px',
    margin: '0 auto',
    padding: '80px 32px 32px',
  },
  pageTitle: {
    fontSize: '40px',
    fontWeight: '700',
    color: '#1d1d1f',
    textAlign: 'center',
    marginBottom: '48px',
    letterSpacing: '-0.02em',
  },
  section: {
    marginBottom: '48px',
  },
  sectionTitle: {
    fontSize: '24px',
    fontWeight: '600',
    color: '#1d1d1f',
    marginBottom: '24px',
    letterSpacing: '-0.01em',
  },
  notificationCard: {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '24px',
    marginBottom: '16px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    gap: '24px',
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#1d1d1f',
    marginBottom: '8px',
  },
  cardDetail: {
    fontSize: '14px',
    color: '#6b7280',
    marginBottom: '4px',
    lineHeight: '1.5',
  },
  actionButton: {
    backgroundColor: '#7c5cdb',
    color: 'white',
    border: 'none',
    borderRadius: '20px',
    padding: '10px 24px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
    transition: 'background-color 0.2s, transform 0.1s',
    flexShrink: 0,
  },
};