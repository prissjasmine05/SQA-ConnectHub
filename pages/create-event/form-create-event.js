// pages/create-event/form-create-event.js
import Head from 'next/head';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Navbar from '../../components/Navbar';
import Button from '../../components/Button';

export default function CreateEvent() {
  const router = useRouter();
  const [isOnlineEvent, setIsOnlineEvent] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [user, setUser] = useState(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadError, setUploadError] = useState('');

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const res = await fetch('/api/auth/me', { credentials: 'include' });
      if (res.ok) {
        const data = await res.json();
        
        // Check if user needs to complete interests
        if (!data.user.interests || data.user.interests.length === 0) {
          router.push('/create-acc');
          return;
        }
        
        setUser(data.user);
      } else {
        router.push('/create-acc');
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      router.push('/create-acc');
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setUploadError('Please select an image file');
      return;
    }

    // Validate file size (max 10MB for events)
    if (file.size > 10 * 1024 * 1024) {
      setUploadError('Image size must be less than 10MB');
      return;
    }

    setUploadError('');
    setUploadingImage(true);

    // Show preview immediately
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);

    // Upload to server
    try {
      const formData = new FormData();
      formData.append('media', file);

      const res = await fetch('/api/upload', {
        method: 'POST',
        credentials: 'include',
        body: formData
      });

      const data = await res.json();
      
      if (res.ok && data.files && data.files.length > 0) {
        setUploadedImageUrl(data.files[0].url);
      } else {
        setUploadError(data.message || 'Upload failed');
        setImagePreview(null);
      }
    } catch (error) {
      setUploadError('Upload failed. Please try again.');
      setImagePreview(null);
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const formData = new FormData(e.target);
      
      const eventData = {
        title: formData.get('eventTitle'),
        description: formData.get('eventDescription'),
        location: {
          type: isOnlineEvent ? 'online' : 'physical',
          ...(isOnlineEvent ? 
            { meetingLink: formData.get('registrationLink') } : 
            { 
              address: formData.get('location'),
              city: formData.get('location')?.split(',')[0] || 'Jakarta'
            }
          )
        },
        dateTime: {
          start: new Date(formData.get('startDateTime')),
          end: new Date(formData.get('endDateTime'))
        },
        capacity: formData.get('maxParticipants') ? parseInt(formData.get('maxParticipants')) : null,
        tags: formData.get('eventCategory') ? [formData.get('eventCategory')] : [],
        image: uploadedImageUrl || null,
        price: formData.get('eventPrice') ? parseFloat(formData.get('eventPrice')) : 0
      };

      const res = await fetch('/api/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(eventData)
      });

      const data = await res.json();

      if (res.ok) {
        alert('Event created successfully!');
        router.push('/main-page/events');
      } else {
        setError(data.message || 'Failed to create event');
      }
    } catch (error) {
      console.error('Create event error:', error);
      setError('Failed to create event. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Create New Event - ConnectHub</title>
      </Head>

      <Navbar />

      <div style={styles.container}>
        <div style={styles.formWrapper}>
          <h1 style={styles.title}>Create New Event</h1>

          {error && (
            <div style={styles.errorMessage}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} style={styles.form}>
            {/* Event Title */}
            <div style={styles.formGroup}>
              <label style={styles.label}>Event Title</label>
              <input
                type="text"
                name="eventTitle"
                placeholder="e.g., Tech Talk: AI in Daily Life, Photography Workshop, Book Club Meeting"
                style={styles.input}
                required
              />
            </div>

            {/* Event Description */}
            <div style={styles.formGroup}>
              <label style={styles.label}>Event Description</label>
              <textarea
                name="eventDescription"
                placeholder="Describe your event, what attendees can expect, agenda, requirements, etc."
                style={styles.textarea}
                rows="4"
                required
              />
            </div>

            {/* Event Category/Type */}
            <div style={styles.formGroup}>
              <label style={styles.label}>Event Category/Type</label>
              <input
                type="text"
                name="eventCategory"
                placeholder="e.g., Workshop, Networking, Conference, Social, Sports"
                style={styles.input}
                required
              />
            </div>

            {/* Date & Time */}
            <div style={styles.formRow}>
              <div style={styles.formGroupHalf}>
                <label style={styles.label}>Start Date & Time</label>
                <input
                  type="datetime-local"
                  name="startDateTime"
                  style={styles.input}
                  required
                />
              </div>
              <div style={styles.formGroupHalf}>
                <label style={styles.label}>End Date & Time</label>
                <input
                  type="datetime-local"
                  name="endDateTime"
                  style={styles.input}
                  required
                />
              </div>
            </div>

            {/* Location */}
            <div style={styles.formGroup}>
              <label style={styles.label}>Location</label>
              <input
                type="text"
                name="location"
                placeholder={isOnlineEvent ? "Location disabled for online events" : "e.g., Starbucks Central Park, Jakarta or Co-working Space, Bandung"}
                style={styles.input}
                disabled={isOnlineEvent}
                required={!isOnlineEvent}
              />
            </div>

            {/* Online Event Checkbox */}
            <div style={styles.checkboxGroup}>
              <input
                type="checkbox"
                id="onlineEvent"
                checked={isOnlineEvent}
                onChange={(e) => setIsOnlineEvent(e.target.checked)}
                style={styles.checkbox}
              />
              <label htmlFor="onlineEvent" style={styles.checkboxLabel}>
                Online Event
              </label>
            </div>

            {/* Max Participants */}
            <div style={styles.formGroup}>
              <label style={styles.label}>Maximum Number of Participants (optional)</label>
              <input
                type="number"
                name="maxParticipants"
                placeholder="Enter maximum participants"
                style={styles.input}
                min="1"
              />
            </div>

            {/* Event Price */}
            <div style={styles.formGroup}>
              <label style={styles.label}>Event Price (IDR, leave empty for free event)</label>
              <input
                type="number"
                name="eventPrice"
                placeholder="Enter event price (e.g., 50000)"
                style={styles.input}
                min="0"
                step="1000"
              />
            </div>

            {/* Registration Link */}
            <div style={styles.formGroup}>
              <label style={styles.label}>
                {isOnlineEvent ? 'Meeting Link' : 'Registration Link or Contact Info'}
              </label>
              <input
                type="url"
                name="registrationLink"
                placeholder={isOnlineEvent ? 
                  "https://zoom.us/j/123456789 or https://meet.google.com/xyz" : 
                  "Provide registration link or contact information"
                }
                style={styles.input}
                required={isOnlineEvent}
              />
            </div>

            {/* Upload Banner/Poster */}
            <div style={styles.uploadSection}>
              <label style={styles.uploadLabel}>Upload Event Banner/Poster (Optional)</label>
              
              {uploadError && (
                <div style={styles.uploadError}>
                  {uploadError}
                </div>
              )}

              <div 
                style={styles.uploadBox}
                className="upload-box"
                onClick={() => !uploadingImage && !imagePreview && document.getElementById('bannerUpload').click()}
              >
                {uploadingImage ? (
                  <div style={styles.uploadingState}>
                    <div style={styles.spinner}></div>
                    <p style={styles.uploadingText}>Uploading image...</p>
                  </div>
                ) : imagePreview ? (
                  <div style={styles.imagePreviewContainer}>
                    <img src={imagePreview} alt="Preview" style={styles.imagePreview} />
                    <div style={styles.imageOverlay}>
                      <button 
                        type="button" 
                        onClick={() => document.getElementById('bannerUpload').click()}
                        style={styles.changeImageBtn}
                        className="change-image-btn"
                      >
                        Change Image
                      </button>
                      <button 
                        type="button" 
                        onClick={() => {
                          setImagePreview(null);
                          setUploadedImageUrl(null);
                          setUploadError('');
                        }}
                        style={styles.removeImageButton}
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                ) : (
                  <div style={styles.uploadPlaceholder}>
                    <div style={styles.uploadIcon}>📷</div>
                    <p style={styles.uploadPlaceholderText}>Upload Event Banner/Poster</p>
                    <p style={styles.uploadHint}>PNG, JPG up to 10MB</p>
                    <button 
                      type="button" 
                      onClick={() => document.getElementById('bannerUpload').click()}
                      style={styles.uploadButton}
                      className="upload-button"
                    >
                      Choose Image
                    </button>
                  </div>
                )}

                {/* Hidden file input */}
                <input
                  type="file"
                  name="banner"
                  id="bannerUpload"
                  accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
                  onChange={handleImageUpload}
                  style={{ display: 'none' }}
                  disabled={uploadingImage}
                  key={Math.random()} // Force re-render
                />
              </div>
            </div>

            {/* Submit Button */}
            <div style={styles.submitWrapper}>
              <Button 
                variant="primary" 
                size="medium" 
                fullWidth 
                type="submit"
                disabled={loading}
              >
                {loading ? 'Creating Event...' : 'Create Event'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

const styles = {
  container: {
    minHeight: 'calc(100vh - 60px)',
    backgroundColor: '#F0F0FF',
    display: 'flex',
    justifyContent: 'center',
    padding: '48px 20px',
  },
  formWrapper: {
    background: 'white',
    borderRadius: '12px',
    padding: '48px 56px',
    maxWidth: '720px',
    width: '100%',
    boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
  },
  title: {
    fontSize: '32px',
    fontWeight: 700,
    textAlign: 'center',
    marginBottom: '40px',
    color: '#1d1d1f',
  },
  errorMessage: {
    backgroundColor: '#FEF2F2',
    border: '1px solid #FECACA',
    color: '#DC2626',
    padding: '12px 16px',
    borderRadius: '8px',
    fontSize: '14px',
    marginBottom: '24px',
    textAlign: 'center',
  },
  form: { display: 'flex', flexDirection: 'column', gap: '24px' },
  formGroup: { display: 'flex', flexDirection: 'column', gap: '8px' },
  formRow: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' },
  formGroupHalf: { display: 'flex', flexDirection: 'column', gap: '8px' },
  label: { fontSize: '14px', fontWeight: 600, color: '#1d1d1f' },
  input: {
    width: '100%',
    padding: '12px 16px',
    border: '1px solid #d2d2d7',
    borderRadius: '8px',
    fontSize: '14px',
  },
  textarea: {
    width: '100%',
    padding: '12px 16px',
    border: '1px solid #d2d2d7',
    borderRadius: '8px',
    fontSize: '14px',
    minHeight: '100px',
    resize: 'vertical',
  },
  checkboxGroup: { display: 'flex', alignItems: 'center', gap: '8px', marginTop: '-8px' },
  checkbox: { width: '18px', height: '18px', cursor: 'pointer', accentColor: '#7c5cdb' },
  checkboxLabel: { fontSize: '14px', color: '#1d1d1f', fontWeight: 500, cursor: 'pointer' },
  uploadSection: { display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '8px' },
  uploadLabel: { fontSize: '14px', fontWeight: 600, color: '#1d1d1f' },
  uploadError: {
    backgroundColor: '#FEF2F2',
    border: '1px solid #FECACA',
    color: '#DC2626',
    padding: '8px 12px',
    borderRadius: '6px',
    fontSize: '13px',
  },
  uploadBox: {
    width: '100%',
    minHeight: '220px',
    border: '2px dashed #d2d2d7',
    borderRadius: '8px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fafafa',
    gap: '16px',
    position: 'relative',
    overflow: 'hidden',
    transition: 'all 0.2s ease',
    cursor: 'pointer',
  },
  uploadPlaceholder: { 
    textAlign: 'center', 
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '12px'
  },
  uploadIcon: {
    fontSize: '48px',
    opacity: 0.5,
  },
  uploadPlaceholderText: { 
    fontSize: '15px', 
    fontWeight: 600, 
    color: '#1d1d1f', 
    margin: 0
  },
  uploadHint: { 
    fontSize: '13px', 
    color: '#86868b',
    margin: 0
  },
  uploadingState: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '12px',
  },
  spinner: {
    width: '32px',
    height: '32px',
    border: '3px solid #f3f3f3',
    borderTop: '3px solid #7c5cdb',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
  },
  uploadingText: {
    fontSize: '14px',
    color: '#6B7280',
    margin: 0,
  },
  imagePreviewContainer: {
    width: '100%',
    height: '100%',
    position: 'relative',
  },
  imagePreview: { 
    width: '100%', 
    height: '220px', 
    objectFit: 'cover', 
    borderRadius: '6px' 
  },
  imageOverlay: {
    position: 'absolute',
    top: '8px',
    right: '8px',
    display: 'flex',
    gap: '8px',
  },
  changeImageButton: {
    cursor: 'pointer',
  },
  changeImageBtn: {
    backgroundColor: 'rgba(255,255,255,0.9)',
    color: '#374151',
    border: '1px solid #D1D5DB',
    borderRadius: '6px',
    padding: '6px 12px',
    fontSize: '12px',
    fontWeight: 500,
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  },
  removeImageButton: {
    background: 'rgba(0,0,0,0.7)',
    color: 'white',
    border: 'none',
    borderRadius: '50%',
    width: '28px',
    height: '28px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: 'bold',
  },
  uploadButtonLabel: {
    cursor: 'pointer',
  },
  uploadButton: {
    backgroundColor: '#7c5cdb',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    padding: '12px 24px',
    fontSize: '14px',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    ':hover': {
      backgroundColor: '#6d4bc7',
      transform: 'translateY(-1px)',
    },
  },
  submitWrapper: { marginTop: '16px' },
};

// Add CSS for animations and hover effects
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    
    .upload-button:hover {
      background-color: #6d4bc7 !important;
      transform: translateY(-1px);
    }
    
    .upload-box:hover {
      border-color: #7c5cdb !important;
      background-color: #f8f6ff !important;
    }
    
    .change-image-btn:hover {
      background-color: rgba(255,255,255,1) !important;
      border-color: #7c5cdb !important;
    }
  `;
  document.head.appendChild(style);
}
