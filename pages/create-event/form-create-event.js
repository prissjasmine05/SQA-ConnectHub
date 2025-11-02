// pages/create-event/form-create-event.js
import Head from 'next/head';
import { useState } from 'react';
import Navbar from '../../components/Navbar';
import Button from '../../components/Button';

export default function CreateEvent() {
  const [isOnlineEvent, setIsOnlineEvent] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
      eventTitle: formData.get('eventTitle'),
      eventDescription: formData.get('eventDescription'),
      eventCategory: formData.get('eventCategory'),
      startDateTime: formData.get('startDateTime'),
      endDateTime: formData.get('endDateTime'),
      location: formData.get('location'),
      isOnline: isOnlineEvent,
      maxParticipants: formData.get('maxParticipants'),
      registrationLink: formData.get('registrationLink'),
      banner: formData.get('banner'),
    };
    console.log('Event data:', data);
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

          <form onSubmit={handleSubmit} style={styles.form}>
            {/* Event Title */}
            <div style={styles.formGroup}>
              <label style={styles.label}>Event Title</label>
              <input
                type="text"
                name="eventTitle"
                placeholder="Enter event title"
                style={styles.input}
                required
              />
            </div>

            {/* Event Description */}
            <div style={styles.formGroup}>
              <label style={styles.label}>Event Description</label>
              <textarea
                name="eventDescription"
                placeholder=""
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
                placeholder=""
                style={styles.input}
                required
              />
            </div>

            {/* Date & Time */}
            <div style={styles.formRow}>
              <div style={styles.formGroupHalf}>
                <label style={styles.label}>Start Date & Time</label>
                <input
                  type="text"
                  name="startDateTime"
                  placeholder="Select start date & time"
                  style={styles.input}
                  required
                />
              </div>
              <div style={styles.formGroupHalf}>
                <label style={styles.label}>End Date & Time</label>
                <input
                  type="text"
                  name="endDateTime"
                  placeholder="Select end date & time"
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
                placeholder="Enter event location or select 'Online Event'"
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
                type="text"
                name="maxParticipants"
                placeholder="Enter maximum participants"
                style={styles.input}
              />
            </div>

            {/* Registration Link */}
            <div style={styles.formGroup}>
              <label style={styles.label}>Registration Link or Contact Info</label>
              <input
                type="text"
                name="registrationLink"
                placeholder="Provide registration link or contact information"
                style={styles.input}
                required
              />
            </div>

            {/* Upload Banner/Poster */}
            <div style={styles.uploadSection}>
              <label style={styles.uploadLabel}>Upload Event Banner/Poster</label>

              <div style={styles.uploadBox}>
                {imagePreview ? (
                  <img src={imagePreview} alt="Preview" style={styles.imagePreview} />
                ) : (
                  <div style={styles.uploadPlaceholder}>
                    <p style={styles.uploadPlaceholderText}>Upload Event Banner/Poster</p>
                    <p style={styles.uploadHint}>Click the button below to upload</p>
                  </div>
                )}

                {/* Hidden file input */}
                <input
                  type="file"
                  name="banner"
                  id="bannerUpload"
                  accept="image/*"
                  onChange={handleImageUpload}
                  style={{ display: 'none' }}
                />

                {/* Upload button (now INSIDE the box) */}
                <label htmlFor="bannerUpload" style={styles.uploadButtonLabel}>
                  <Button variant="primary" size="medium">
                    Upload Image
                  </Button>
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <div style={styles.submitWrapper}>
              <Button variant="primary" size="medium" fullWidth type="submit">
                Create Event
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
  },
  uploadPlaceholder: { textAlign: 'center', padding: '10px' },
  uploadPlaceholderText: { fontSize: '15px', fontWeight: 600, color: '#1d1d1f', marginBottom: '4px' },
  uploadHint: { fontSize: '13px', color: '#86868b' },
  imagePreview: { width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' },
  uploadButtonLabel: {
    cursor: 'pointer',
  },
  submitWrapper: { marginTop: '16px' },
};
