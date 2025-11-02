'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './interest.module.css';

export default function ManageInterest() {
  const router = useRouter();
  
  const [interests, setInterests] = useState([
    { id: 1, name: 'Pedal', icon: '🚴' },
    { id: 2, name: 'Shopping', icon: '🛍️' },
    { id: 3, name: 'Fitness', icon: '💪' },
    { id: 4, name: 'Art', icon: '🎨' },
    { id: 5, name: 'Photography', icon: '📷' }
  ]);

  const [searchTerm, setSearchTerm] = useState('');

  const handleRemoveInterest = (interestId) => {
    setInterests(interests.filter(i => i.id !== interestId));
  };

  const filteredInterests = interests.filter(interest =>
    interest.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={styles.mainContainer}>
      <div className={styles.modalCard}>
        {/* Close Button */}
        <button 
          onClick={() => router.push('/user-profile/settings')}
          className={styles.closeButton}
        >
          ×
        </button>

        {/* Header */}
        <div className={styles.modalHeader}>
          <div className={styles.logoIcon}></div>
          <span className={styles.logoText}>ConnectHub</span>
        </div>

        <div className={styles.modalContent}>
          <h1 className={styles.modalTitle}>Manage Your Interest</h1>

          {/* Search Bar */}
          <div className={styles.searchContainer}>
            <svg className={styles.searchIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              className={styles.searchInput}
              placeholder="Search interests"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Joined Communities Section */}
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Joined Communities</h2>

            <div className={styles.interestsList}>
              {filteredInterests.map(interest => (
                <div key={interest.id} className={styles.interestItem}>
                  <div className={styles.iconWrapper}>
                    <span className={styles.interestIcon}>{interest.icon}</span>
                  </div>
                  <span className={styles.interestName}>{interest.name}</span>
                  <button 
                    className={styles.removeButton}
                    onClick={() => handleRemoveInterest(interest.id)}
                  >
                    Remove
                  </button>
                </div>
              ))}

              {filteredInterests.length === 0 && (
                <div className={styles.noInterests}>
                  <p>No interests found matching your search.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}