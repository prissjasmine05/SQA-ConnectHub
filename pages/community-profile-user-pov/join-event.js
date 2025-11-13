'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './join-event.module.css';

export default function JoinEvent() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('myself');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: ''
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (formData.fullName && formData.email && formData.phone) {
      // Store data in localStorage (optional)
      localStorage.setItem('registeredUser', JSON.stringify(formData));
      
      // Redirect to event registered page
      router.push('/event-registered');
    }
  };

  const handleClose = () => {
    router.back();
  };

  return (
    <>
      <div className={styles.header}>
        <div className={styles.logo}>
          <span className={styles.logoIcon}>■</span>
          <span className={styles.logoText}>ConnectHub</span>
        </div>
        <button className={styles.closeBtn} onClick={handleClose}>×</button>
      </div>

      <div className={styles.container}>
        <div className={styles.mainContent}>
          <div className={styles.contentLeft}>
            <h1 className={styles.pageTitle}>Join Event</h1>
            
            <div className={styles.tabContainer}>
              <button 
                className={`${styles.tabBtn} ${activeTab === 'myself' ? styles.active : ''}`}
                onClick={() => setActiveTab('myself')}
              >
                Myself
              </button>
              <button 
                className={`${styles.tabBtn} ${activeTab === 'guest' ? styles.active : ''}`}
                onClick={() => setActiveTab('guest')}
              >
                Guest
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className={styles.eventForm}>
              <div className={styles.formGroup}>
                <label htmlFor="fullName">Full Name</label>
                <input 
                  type="text" 
                  id="fullName" 
                  placeholder="Full Name" 
                  required
                  value={formData.fullName}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className={styles.formGroup}>
                <label htmlFor="email">Email</label>
                <input 
                  type="email" 
                  id="email" 
                  placeholder="Email" 
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className={styles.formGroup}>
                <label htmlFor="phone">Phone</label>
                <input 
                  type="tel" 
                  id="phone" 
                  placeholder="Phone" 
                  required
                  value={formData.phone}
                  onChange={handleInputChange}
                />
              </div>
              
              <button 
                type="button" 
                className={styles.submitBtn}
                onClick={() => router.push('/community-profile-user-pov/event-registered')}
              >
                Join Event
              </button>
            </form>
            
            <div className={styles.termsContainer}>
              <p className={styles.termsText}>By registering for this event, I confirm and agree that:</p>
              <ol className={styles.termsList}>
                <li>I will provide accurate personal information when registering.</li>
                <li>Any cancellation must be requested no later than one (1) day before the event.</li>
                <li>My contact details may be used for event-related updates and communication.</li>
                <li>I am responsible for my own participation and conduct during the event.</li>
                <li>The organizer reserves the right to make changes to the schedule or cancel the event if necessary.</li>
              </ol>
            </div>
          </div>

          <div className={styles.contentRight}>
            <div className={styles.eventCard}>
              <div className={styles.eventImage}>
                <img src="https://images.unsplash.com/photo-1565301660306-29e08751cc53?w=500&q=80" alt="Event workspace" />
                <div className={styles.eventOverlayText}>work to ul<br />nateed noteds<br />safe to work</div>
              </div>
              
              <div className={styles.eventDetails}>
                <div className={styles.detailRow}>
                  <span className={styles.detailLabel}>Date</span>
                  <span className={styles.detailValue}>July 15, 2024</span>
                </div>
                <div className={styles.detailRow}>
                  <span className={styles.detailLabel}>Time & Duration</span>
                  <span className={styles.detailValue}>6:00 PM - 8:00 PM (2 hours)</span>
                </div>
                <div className={styles.detailRow}>
                  <span className={styles.detailLabel}>Location</span>
                  <span className={styles.detailValue}>Central Park, New York</span>
                </div>
                <div className={styles.detailRow}>
                  <span className={styles.detailLabel}>Check-in Instructions</span>
                  <span className={styles.detailValue}>Please check in at the main entrance.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}