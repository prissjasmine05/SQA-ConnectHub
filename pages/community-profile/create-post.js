import React, { useState } from 'react';
import Image from 'next/image';
import Button from '../../components/Button';

export default function CreatePost() {
  const [postContent, setPostContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [uploadedMedia, setUploadedMedia] = useState([]);
  const [uploading, setUploading] = useState(false);

  const handleFileUpload = async (files, type) => {
    if (!files || files.length === 0) return;

    setUploading(true);
    setError('');

    try {
      const formData = new FormData();
      Array.from(files).forEach(file => {
        formData.append('media', file);
      });

      const res = await fetch('/api/upload', {
        method: 'POST',
        credentials: 'include',
        body: formData
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Upload failed');
      }

      setUploadedMedia(prev => [...prev, ...data.files]);
    } catch (err) {
      console.error('Upload error:', err);
      setError(err.message || 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const handlePhotoUpload = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.multiple = true;
    input.onchange = (e) => handleFileUpload(e.target.files, 'image');
    input.click();
  };

  const handleVideoUpload = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'video/*';
    input.multiple = true;
    input.onchange = (e) => handleFileUpload(e.target.files, 'video');
    input.click();
  };

  const removeMedia = (index) => {
    setUploadedMedia(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!postContent.trim() && uploadedMedia.length === 0) {
      setError('Please write something or add media to post');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ 
          content: postContent,
          media: uploadedMedia
        })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Failed to create post');
      }

      // Redirect back to community
      window.history.back();
    } catch (err) {
      console.error('Create post error:', err);
      setError(err.message || 'Failed to create post');
    } finally {
      setLoading(false);
    }
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
              <button 
                type="button" 
                style={{
                  ...styles.actionButton,
                  opacity: uploading ? 0.6 : 1,
                  cursor: uploading ? 'not-allowed' : 'pointer'
                }}
                onClick={handlePhotoUpload}
                disabled={uploading}
              >
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
                  <div style={styles.actionTitle}>
                    {uploading ? 'Uploading...' : 'Add Photo'}
                  </div>
                  <div style={styles.actionSubtitle}>Upload an image from your device</div>
                </div>
              </button>

              {/* Add Video */}
              <button 
                type="button" 
                style={{
                  ...styles.actionButton,
                  opacity: uploading ? 0.6 : 1,
                  cursor: uploading ? 'not-allowed' : 'pointer'
                }}
                onClick={handleVideoUpload}
                disabled={uploading}
              >
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
                  <div style={styles.actionTitle}>
                    {uploading ? 'Uploading...' : 'Add Video'}
                  </div>
                  <div style={styles.actionSubtitle}>Upload a video from your device</div>
                </div>
              </button>
            </div>

            {/* Media Preview */}
            {uploadedMedia.length > 0 && (
              <div style={styles.mediaPreview}>
                <h3 style={styles.previewTitle}>Uploaded Media:</h3>
                <div style={styles.mediaGrid}>
                  {uploadedMedia.map((media, index) => (
                    <div key={index} style={styles.mediaItem}>
                      {media.type === 'image' ? (
                        <img 
                          src={media.url} 
                          alt="Upload preview" 
                          style={styles.previewMedia}
                        />
                      ) : (
                        <video 
                          src={media.url} 
                          style={styles.previewMedia}
                          controls
                        />
                      )}
                      <button 
                        onClick={() => removeMedia(index)}
                        style={styles.removeButton}
                        type="button"
                      >
                        ✕
                      </button>
                      <div style={styles.mediaInfoBar}>
                        <span style={styles.mediaType}>{media.type}</span>
                        <span style={styles.mediaSize}>
                          {(media.size / 1024 / 1024).toFixed(2)} MB
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

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

            {/* Error Message */}
            {error && (
              <div style={{
                color: '#d32f2f',
                backgroundColor: '#ffebee',
                padding: '12px',
                borderRadius: '8px',
                marginBottom: '16px',
                fontSize: '14px'
              }}>
                {error}
              </div>
            )}

            {/* Post Button */}
            <Button 
              variant="primary" 
              size="medium" 
              fullWidth 
              type="submit"
              disabled={loading || !postContent.trim()}
            >
              {loading ? 'Posting...' : 'Post'}
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
  // Media Preview Styles
  mediaPreview: {
    marginBottom: '24px',
    padding: '20px',
    backgroundColor: '#f8f9fa',
    borderRadius: '12px',
    border: '1px solid #e5e5e5',
  },
  previewTitle: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#1d1d1f',
    marginBottom: '16px',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  },
  mediaGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
    gap: '16px',
  },
  mediaItem: {
    position: 'relative',
    borderRadius: '8px',
    overflow: 'hidden',
    backgroundColor: 'white',
    border: '1px solid #e5e5e5',
  },
  previewMedia: {
    width: '100%',
    height: '150px',
    objectFit: 'cover',
    display: 'block',
  },
  removeButton: {
    position: 'absolute',
    top: '8px',
    right: '8px',
    width: '24px',
    height: '24px',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    color: 'white',
    border: 'none',
    borderRadius: '50%',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '12px',
    transition: 'background-color 0.2s',
  },
  mediaInfoBar: {
    padding: '8px 12px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    borderTop: '1px solid #e5e5e5',
  },
  mediaType: {
    fontSize: '12px',
    fontWeight: '500',
    color: '#666',
    textTransform: 'uppercase',
  },
  mediaSize: {
    fontSize: '12px',
    color: '#999',
  },
};