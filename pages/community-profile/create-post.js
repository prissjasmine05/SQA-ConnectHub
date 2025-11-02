// pages/community-profile/create-post.js
import React, { useState } from 'react';
import Image from 'next/image';
import Button from '../../components/Button';

export default function CreatePost() {
  const [postContent, setPostContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Post content:', postContent);
    // Add your API call here
  };

  return (
    <div style={styles.page}>
      {/* Header */}
      <div style={styles.header}>
        <div style={styles.headerLeft}>
          {/* Ganti SVG dengan logo */}
          <Image 
            src="/images/LogoConnectHub.png"
            alt="ConnectHub Logo"
            width={150}
            height={40}
            priority
            style={{ objectFit: 'contain' }}
          />
       </div>

        <button 
          style={styles.closeButton}
          onClick={() => window.history.back()}
        >
          <svg 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2"
            strokeLinecap="round"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>

      {/* Main Content */}
      <div style={styles.container}>
        <div style={styles.content}>
          {/* Title */}
          <h1 style={styles.title}>Create a new post</h1>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            {/* Text Area */}
            <textarea
              placeholder="What's on your mind?"
              value={postContent}
              onChange={(e) => setPostContent(e.target.value)}
              style={styles.textarea}
            />

            {/* Action Buttons */}
            <div style={styles.actionGrid}>
              {/* Add Photo */}
              <button type="button" style={styles.actionButton}>
                <div style={{...styles.iconCircle, backgroundColor: '#E3F2FD'}}>
                  <svg 
                    width="24" 
                    height="24" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="#2196F3" 
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                    <circle cx="8.5" cy="8.5" r="1.5"></circle>
                    <polyline points="21 15 16 10 5 21"></polyline>
                  </svg>
                </div>
                <div style={styles.actionText}>
                  <div style={styles.actionTitle}>Add Photo</div>
                  <div style={styles.actionSubtitle}>Upload an image from your device</div>
                </div>
              </button>

              {/* Add Video */}
              <button type="button" style={styles.actionButton}>
                <div style={{...styles.iconCircle, backgroundColor: '#F3E5F5'}}>
                  <svg 
                    width="24" 
                    height="24" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="#9C27B0" 
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polygon points="23 7 16 12 23 17 23 7"></polygon>
                    <rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>
                  </svg>
                </div>
                <div style={styles.actionText}>
                  <div style={styles.actionTitle}>Add Video</div>
                  <div style={styles.actionSubtitle}>Upload a video from your device</div>
                </div>
              </button>
            </div>

            {/* Add Event Button */}
            <button type="button" style={styles.eventButton}>
              <div style={{...styles.iconCircle, backgroundColor: '#FFF3E0'}}>
                <svg 
                  width="24" 
                  height="24" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="#FF9800" 
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polygon points="23 7 16 12 23 17 23 7"></polygon>
                  <rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>
                </svg>
              </div>
              <div style={styles.actionText}>
                <div style={styles.actionTitle}>Add Event</div>
                <div style={styles.actionSubtitle}>Upload your event details</div>
              </div>
            </button>

            {/* Post Button */}
            <Button variant="primary" size="medium" fullWidth type="submit">
              Post
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: '100vh',
    backgroundColor: 'white',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px 32px',
    borderBottom: '1px solid #e5e5e5',
  },
  headerLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  brandName: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#1d1d1f',
    margin: 0,
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  },
  closeButton: {
    width: '40px',
    height: '40px',
    border: 'none',
    backgroundColor: 'transparent',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '8px',
    transition: 'background-color 0.2s',
  },
  container: {
    display: 'flex',
    justifyContent: 'center',
    padding: '48px 20px',
  },
  content: {
    width: '100%',
    maxWidth: '600px',
  },
  title: {
    fontSize: '32px',
    fontWeight: '700',
    color: '#1d1d1f',
    marginBottom: '24px',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  },
  textarea: {
    width: '100%',
    minHeight: '140px',
    padding: '16px',
    fontSize: '15px',
    border: '1px solid #e5e5e5',
    borderRadius: '12px',
    backgroundColor: '#fafafa',
    resize: 'none',
    outline: 'none',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    marginBottom: '24px',
    boxSizing: 'border-box',
  },
  actionGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '16px',
    marginBottom: '16px',
  },
  actionButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '16px',
    border: '1px solid #e5e5e5',
    borderRadius: '12px',
    backgroundColor: 'white',
    cursor: 'pointer',
    transition: 'all 0.2s',
    textAlign: 'left',
  },
  eventButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '16px',
    border: '1px solid #e5e5e5',
    borderRadius: '12px',
    backgroundColor: 'white',
    cursor: 'pointer',
    transition: 'all 0.2s',
    width: '100%',
    marginBottom: '24px',
    textAlign: 'left',
  },
  iconCircle: {
    width: '48px',
    height: '48px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  actionText: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },
  actionTitle: {
    fontSize: '15px',
    fontWeight: '600',
    color: '#1d1d1f',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  },
  actionSubtitle: {
    fontSize: '13px',
    color: '#86868b',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  },
};