import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import styles from './createpost.module.css';

export default function CreatePostPage() {
  const router = useRouter();
  const [postContent, setPostContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [uploadedMedia, setUploadedMedia] = useState([]);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch('/api/auth/me', {
          credentials: 'include'
        });

        if (!res.ok) {
          router.push('/create-acc');
          return;
        }

        const data = await res.json();
        
        // Check if user needs to complete interests
        if (!data.user.interests || data.user.interests.length === 0) {
          router.push('/create-acc');
          return;
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        router.push('/create-acc');
      }
    };

    checkAuth();
  }, [router]);

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

  const handleSubmit = async () => {
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

      // Success! Redirect back to profile
      router.push('/user-profile?refresh=true');
    } catch (err) {
      console.error('Create post error:', err);
      setError(err.message || 'Failed to create post');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.mainContainer}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.logo}>
          <div className={styles.logoIcon}></div>
          <span className={styles.logoText}>ConnectHub</span>
        </div>
        <button 
          onClick={() => router.push('/user-profile')}
          className={styles.closeButton}
        >
          ✕
        </button>
      </div>

      {/* Content */}
      <div className={styles.content}>
        <h1 className={styles.title}>Create a new post</h1>

        {/* Textarea */}
        <div className={styles.textareaWrapper}>
          <textarea 
            value={postContent}
            onChange={(e) => setPostContent(e.target.value)}
            placeholder="What's on your mind?"
            className={styles.textarea}
          />
        </div>

        {/* Media Options */}
        <div className={styles.mediaOptions}>
          <button 
            className={styles.mediaButton}
            onClick={handlePhotoUpload}
            disabled={uploading}
          >
            <div className={`${styles.iconWrapper} ${styles.iconWrapperBlue}`}>
              <svg 
                className={`${styles.mediaIcon} ${styles.iconBlue}`}
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" 
                />
              </svg>
            </div>
            <div className={styles.mediaInfo}>
              <div className={styles.mediaTitle}>
                {uploading ? 'Uploading...' : 'Add Photo'}
              </div>
              <div className={styles.mediaDescription}>Upload an image from your device</div>
            </div>
          </button>

          <button 
            className={styles.mediaButton}
            onClick={handleVideoUpload}
            disabled={uploading}
          >
            <div className={`${styles.iconWrapper} ${styles.iconWrapperPurple}`}>
              <svg 
                className={`${styles.mediaIcon} ${styles.iconPurple}`}
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" 
                />
              </svg>
            </div>
            <div className={styles.mediaInfo}>
              <div className={styles.mediaTitle}>
                {uploading ? 'Uploading...' : 'Add Video'}
              </div>
              <div className={styles.mediaDescription}>Upload a video from your device</div>
            </div>
          </button>
        </div>

        {/* Media Preview */}
        {uploadedMedia.length > 0 && (
          <div className={styles.mediaPreview}>
            <h3 className={styles.previewTitle}>Uploaded Media:</h3>
            <div className={styles.mediaGrid}>
              {uploadedMedia.map((media, index) => (
                <div key={index} className={styles.mediaItem}>
                  {media.type === 'image' ? (
                    <img 
                      src={media.url} 
                      alt="Upload preview" 
                      className={styles.previewImage}
                    />
                  ) : (
                    <video 
                      src={media.url} 
                      className={styles.previewVideo}
                      controls
                    />
                  )}
                  <button 
                    onClick={() => removeMedia(index)}
                    className={styles.removeButton}
                  >
                    ✕
                  </button>
                  <div className={styles.mediaInfo}>
                    <span className={styles.mediaType}>{media.type}</span>
                    <span className={styles.mediaSize}>
                      {(media.size / 1024 / 1024).toFixed(2)} MB
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className={styles.errorMessage}>
            {error}
          </div>
        )}

        {/* Post Button */}
        <button 
          onClick={handleSubmit}
          disabled={loading || !postContent.trim()}
          className={styles.postButton}
        >
          {loading ? 'Posting...' : 'Post'}
        </button>
      </div>
    </div>
  );
}