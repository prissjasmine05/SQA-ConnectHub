import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import styles from './managecommunity.module.css';

export default function ManageCommunity() {
  const router = useRouter();
  
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

        // Fetch user communities
        fetchUserCommunities();
      } catch (error) {
        console.error('Auth check failed:', error);
        router.push('/create-acc');
      }
    };

    checkAuth();
  }, [router]);

  const fetchUserCommunities = async () => {
    try {
      setLoading(true);
      
      const response = await fetch('/api/user/communities', {
        credentials: 'include'
      });

      if (response.ok) {
        const data = await response.json();
        
        // Make sure communities is an array and has required properties
        const communitiesData = Array.isArray(data.communities) ? data.communities : [];
        
        // Validate each community has required fields
        const validCommunities = communitiesData.filter(community => {
          return community && community._id && community.name;
        });
        
        setCommunities(validCommunities);
      } else {
        console.error('Failed to fetch communities');
      }
    } catch (error) {
      console.error('Error fetching communities:', error);
    } finally {
      setLoading(false);
    }
  };
  
  const [communities, setCommunities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const handleLeaveCommunity = async (communityId, communityName) => {
    if (!confirm(`Are you sure you want to leave "${communityName}"?`)) return;

    try {
      const response = await fetch('/api/communities/leave', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({ communityId })
      });

      if (response.ok) {
        alert('Left community successfully');
        setCommunities(communities.filter(c => c._id !== communityId));
      } else {
        const error = await response.json();
        alert(error.message || 'Failed to leave community');
      }
    } catch (error) {
      console.error('Error leaving community:', error);
      alert('Failed to leave community');
    }
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
              placeholder="Search communities"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className={styles.communitiesSection}>
            <h2 className={styles.sectionTitle}>Joined Communities</h2>

            <div className={styles.communitiesList}>
              {loading ? (
                <div className={styles.loadingState}>
                  <p>Loading communities...</p>
                </div>
              ) : filteredCommunities.length > 0 ? (
                filteredCommunities.map(community => (
                  <div key={community._id} className={styles.communityItem}>
                    <div className={styles.communityIconWrapper} style={{ backgroundColor: community.color || '#8B9D83' }}>
                      <span className={styles.communityIcon}>{community.icon || '👥'}</span>
                    </div>
                    <div className={styles.communityInfo}>
                      <h3 className={styles.communityName}>{community.name}</h3>
                      <p className={styles.communityDescription}>{community.description}</p>
                      <div className={styles.communityMeta}>
                        <span>👥 {community.members?.length || 0} members</span>
                        <span>📅 Joined {new Date(community.joinedAt || community.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <div className={styles.communityActions}>
                      <button 
                        className={styles.viewButton}
                        onClick={() => router.push(`/community-profile?id=${community._id}`)}
                      >
                        View
                      </button>
                      <button 
                        className={styles.leaveButton}
                        onClick={() => handleLeaveCommunity(community._id, community.name)}
                      >
                        Leave
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className={styles.noCommunities}>
                  <p>No communities found matching your search.</p>
                  <button 
                    className={styles.exploreButton}
                    onClick={() => router.push('/main-page/explore')}
                  >
                    Explore Communities
                  </button>
                  <button 
                    className={styles.exploreButton}
                    onClick={fetchUserCommunities}
                    style={{marginLeft: '8px', background: '#10B981'}}
                  >
                    Refresh
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}