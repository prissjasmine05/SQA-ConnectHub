'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './managecommunity.module.css';

export default function ManageCommunity() {
  const router = useRouter();
  
  const [communities, setCommunities] = useState([
    {
      id: 1,
      name: 'PhotoVerse',
      description: 'A community for photography enthusiasts to share their work and tips.',
      icon: '📷',
      color: '#8B9D83'
    },
    {
      id: 2,
      name: 'TechTalk',
      description: 'Discuss the latest tech trends and gadgets.',
      icon: '💻',
      color: '#5A8B8B'
    },
    {
      id: 3,
      name: 'Culinary Corner',
      description: 'Share your favorite recipes and cooking tips.',
      icon: '🍳',
      color: '#E8DCC4'
    },
    {
      id: 4,
      name: 'Bookworm Haven',
      description: 'A space for book lovers to discuss their favorite reads.',
      icon: '📚',
      color: '#D4D4D4'
    },
    {
      id: 5,
      name: 'FitLife',
      description: 'Connect with fellow fitness enthusiasts and share workout routines.',
      icon: '💪',
      color: '#D9C4A8'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');

  const handleLeaveCommunity = (communityId) => {
    setCommunities(communities.filter(c => c.id !== communityId));
  };

  const filteredCommunities = communities.filter(community =>
    community.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    community.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={styles.mainContainer}>
      <div className={styles.modalCard}>
        {/* Close Button */}
        

        {/* Header */}
        <div className={styles.modalHeader}>
          <div className={styles.logoIcon}></div>
          <span className={styles.logoText}>ConnectHub</span>
          <button 
          onClick={() => router.push('/user-profile/settings')}
          className={styles.closeButton}
        >
          ×
        </button>
        </div>

        <div className={styles.modalContent}>
          <h1 className={styles.modalTitle}>Manage Your Community</h1>

          <div className={styles.searchContainer}>
            <span className={styles.searchIcon}>🔍</span>
            <input
              type="text"
              className={styles.searchInput}
              placeholder="Search interests"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className={styles.communitiesSection}>
            <h2 className={styles.sectionTitle}>Joined Communities</h2>

            <div className={styles.communitiesList}>
              {filteredCommunities.map(community => (
                <div key={community.id} className={styles.communityItem}>
                  <div className={styles.communityIconWrapper} style={{ backgroundColor: community.color }}>
                    <span className={styles.communityIcon}>{community.icon}</span>
                  </div>
                  <div className={styles.communityInfo}>
                    <h3 className={styles.communityName}>{community.name}</h3>
                    <p className={styles.communityDescription}>{community.description}</p>
                  </div>
                  <button 
                    className={styles.leaveButton}
                    onClick={() => handleLeaveCommunity(community.id)}
                  >
                    Leave
                  </button>
                </div>
              ))}

              {filteredCommunities.length === 0 && (
                <div className={styles.noCommunities}>
                  <p>No communities found matching your search.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}