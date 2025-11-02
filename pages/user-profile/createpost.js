'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './createpost.module.css';

export default function CreatePostPage() {
  const router = useRouter();
  const [postContent, setPostContent] = useState('');

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
          <button className={styles.mediaButton}>
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
              <div className={styles.mediaTitle}>Add Photo</div>
              <div className={styles.mediaDescription}>Upload an image from your device</div>
            </div>
          </button>

          <button className={styles.mediaButton}>
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
              <div className={styles.mediaTitle}>Add Video</div>
              <div className={styles.mediaDescription}>Upload a video from your device</div>
            </div>
          </button>
        </div>

        {/* Post Button */}
        <button 
          onClick={() => router.push('/user-profile')}
          className={styles.postButton}
        >
          Post
        </button>
      </div>
    </div>
  );
}