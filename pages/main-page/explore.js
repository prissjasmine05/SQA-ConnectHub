import Head from 'next/head';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Navbar from '../../components/Navbar';
import styles from './Explore.module.css';
import mainStyles from './MainPage.module.css';

export default function ExplorePage() {
  const router = useRouter();
  const [communities, setCommunities] = useState([]);
  const [trendingGroups, setTrendingGroups] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [joiningId, setJoiningId] = useState(null);
  const [showJoinModal, setShowJoinModal] = useState(null);
  const [showWelcomeModal, setShowWelcomeModal] = useState(null);
  const [toast, setToast] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Get from auth context

  // Fallback data for demo purposes
  const fallbackCommunities = [
    { _id: '1', name: 'Tech Enthusiasts', memberCount: 130000, banner: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400', description: 'A community for technology lovers', tags: ['technology'] },
    { _id: '2', name: 'Book Lovers', memberCount: 85000, banner: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400', description: 'Discuss your favorite books', tags: ['books'] },
    { _id: '3', name: 'Fitness Fanatics', memberCount: 150000, banner: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400', description: 'Stay fit and healthy together', tags: ['fitness'] },
    { _id: '4', name: 'Travel Explorers', memberCount: 95000, banner: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400', description: 'Share travel experiences', tags: ['travel'] },
    { _id: '5', name: 'Foodies', memberCount: 110000, banner: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400', description: 'Food lovers unite', tags: ['food'] }
  ];

  const fallbackTrending = [
    { _id: '6', name: 'AI & Machine Learning', memberCount: 50000, banner: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400', description: 'Explore AI technologies', tags: ['technology'] },
    { _id: '7', name: 'Sustainable Living', memberCount: 40000, banner: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=400', description: 'Live sustainably', tags: ['lifestyle'] },
    { _id: '8', name: 'Indie Game Development', memberCount: 35000, banner: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400', description: 'Create amazing games', tags: ['technology'] },
    { _id: '9', name: 'Urban Photography', memberCount: 45000, banner: 'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=400', description: 'Capture city life', tags: ['photography'] },
    { _id: '10', name: 'Minimalist Fashion', memberCount: 55000, banner: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=400', description: 'Simple and elegant style', tags: ['fashion'] }
  ];

  const topics = [
    { id: 1, name: 'All', color: '#E0E0E0', icon: '🌟' },
    { id: 2, name: 'Technology', color: '#FFC0CB', icon: '💻' },
    { id: 3, name: 'Books', color: '#C3F0CA', icon: '📚' },
    { id: 4, name: 'Fitness', color: '#B3E0F2', icon: '💪' },
    { id: 5, name: 'Travel', color: '#FFE4B5', icon: '✈️' },
    { id: 6, name: 'Food', color: '#FFD4A3', icon: '🍽️' },
    { id: 7, name: 'Fashion', color: '#E8D4F8', icon: '👔' }
  ];

  useEffect(() => {
    fetchCommunities();
  }, [searchQuery, selectedCategory]);

  const fetchCommunities = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        limit: '10',
        page: '1'
      });
      
      if (searchQuery) {
        params.append('search', searchQuery);
      }

      const response = await fetch(`/api/communities?${params}`);
      
      if (response.ok) {
        const data = await response.json();
        setCommunities(data.communities || []);
        
        // Get trending communities (sorted by member count)
        const trending = data.communities
          .sort((a, b) => b.memberCount - a.memberCount)
          .slice(0, 5);
        setTrendingGroups(trending);
      } else {
        // Use fallback data if API fails
        console.warn('API failed, using fallback data');
        setCommunities(fallbackCommunities);
        setTrendingGroups(fallbackTrending);
      }
    } catch (error) {
      console.error('Error fetching communities:', error);
      // Use fallback data
      setCommunities(fallbackCommunities);
      setTrendingGroups(fallbackTrending);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handleCommunityClick = (communityId) => {
    router.push(`/community-profile?id=${communityId}`);
  };

  const formatMemberCount = (count) => {
    if (count >= 1000000) {
      return Math.floor(count / 100000) / 10 + 'M';
    } else if (count >= 1000) {
      return Math.floor(count / 100) / 10 + 'K';
    }
    return count.toString();
  };

  const showToast = (message, type = 'info') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  const handleJoinCommunity = async (community, e) => {
    e.stopPropagation();
    
    // Check if user is logged in
    if (!isLoggedIn) {
      router.push('/login?redirect=' + encodeURIComponent(window.location.pathname));
      return;
    }
    
    // Check if already a member
    if (community.isMember) {
      showToast('You are already a member of this community', 'info');
      return;
    }
    
    // Different flows based on community type
    if (community.isPrivate) {
      handlePrivateCommunityJoin(community);
    } else {
      handlePublicCommunityJoin(community);
    }
  };

  const handlePublicCommunityJoin = async (community) => {
    setJoiningId(community._id);
    
    try {
      const response = await fetch(`/api/communities/${community._id}/join`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json'
        }
      });
      
      if (response.ok) {
        // Update UI immediately
        setCommunities(prev => prev.map(c => 
          c._id === community._id 
            ? { ...c, isMember: true, memberCount: c.memberCount + 1 }
            : c
        ));
        
        setTrendingGroups(prev => prev.map(c => 
          c._id === community._id 
            ? { ...c, isMember: true, memberCount: c.memberCount + 1 }
            : c
        ));
        
        // Show success message
        showToast(`Welcome to ${community.name}! 🎉`, 'success');
        
        // Show welcome modal
        setShowWelcomeModal(community);
      } else {
        const errorData = await response.json();
        showToast(errorData.message || 'Failed to join community', 'error');
      }
    } catch (error) {
      console.error('Join community error:', error);
      showToast('Failed to join community. Please try again.', 'error');
    } finally {
      setJoiningId(null);
    }
  };

  const handlePrivateCommunityJoin = (community) => {
    setShowJoinModal({
      community,
      type: 'private'
    });
  };

  const handleRequestJoin = async (community, message) => {
    try {
      const response = await fetch(`/api/communities/${community._id}/request-join`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message })
      });
      
      if (response.ok) {
        // Update UI to show request sent
        setCommunities(prev => prev.map(c => 
          c._id === community._id 
            ? { ...c, requestSent: true }
            : c
        ));
        
        showToast('Join request sent! The admins will review your request.', 'success');
        setShowJoinModal(null);
      } else {
        const errorData = await response.json();
        showToast(errorData.message || 'Failed to send request', 'error');
      }
    } catch (error) {
      console.error('Request join error:', error);
      showToast('Failed to send request. Please try again.', 'error');
    }
  };

  return (
    <>
      <Head>
        <title>Explore - ConnectHub</title>
      </Head>

      <Navbar isLoggedIn={true} />

      <main className={mainStyles.mainContainer}>
        <div className={mainStyles.contentWrapper}>
          {/* Enhanced Search Section */}
          <div className={styles.searchSection}>
            <div className={styles.searchBar}>
              <span className={styles.searchIcon}>🔍</span>
              <input 
                type="text" 
                placeholder="Search communities, groups, or topics..." 
                value={searchQuery}
                onChange={handleSearch}
              />
            </div>
            
            {/* Category Filter */}
            <div className={styles.categoryFilter}>
              {topics.map((topic) => (
                <button
                  key={topic.id}
                  className={`${styles.categoryBtn} ${selectedCategory === topic.name.toLowerCase() ? styles.active : ''}`}
                  onClick={() => handleCategoryChange(topic.name.toLowerCase())}
                  style={{ backgroundColor: selectedCategory === topic.name.toLowerCase() ? topic.color : '#f5f5f5' }}
                >
                  {topic.icon} {topic.name}
                </button>
              ))}
            </div>
          </div>

          {/* Popular Communities Section */}
          <section className={styles.exploreSection}>
            <div className={styles.sectionHeader}>
              <h2>Popular Communities</h2>
              <button className={styles.viewAllBtn}>View All</button>
            </div>
            
            {loading ? (
              <div className={styles.loadingGrid}>
                {[...Array(6)].map((_, i) => (
                  <div key={i} className={styles.loadingCard}>
                    <div className={styles.loadingSkeleton}></div>
                  </div>
                ))}
              </div>
            ) : (
              <div className={styles.communityGrid}>
                {communities.slice(0, 6).map((community) => (
                  <div 
                    key={community._id} 
                    className={styles.communityCard}
                    onClick={() => handleCommunityClick(community._id)}
                  >
                    <img 
                      src={community.banner || community.avatar || 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&h=200&fit=crop'} 
                      alt={community.name}
                      onError={(e) => {
                        e.target.src = 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&h=200&fit=crop';
                      }}
                    />
                    <div className={styles.communityInfo}>
                      <h4>{community.name}</h4>
                      <p className={styles.description}>{community.description || 'Join this amazing community and connect with like-minded people!'}</p>
                      <div className={styles.stats}>
                        <span>👥 {formatMemberCount(community.memberCount || 0)} members</span>
                        {community.tags && community.tags.length > 0 && (
                          <div className={styles.tags}>
                            {community.tags.slice(0, 2).map(tag => (
                              <span key={tag} className={styles.tag}>{tag}</span>
                            ))}
                          </div>
                        )}
                      </div>
                      <button 
                        className={styles.joinBtn} 
                        onClick={(e) => handleJoinCommunity(community, e)}
                        disabled={joiningId === community._id || community.isMember || community.requestSent}
                      >
                        {joiningId === community._id ? (
                          <>⏳ Joining...</>
                        ) : community.isMember ? (
                          <>✅ Joined</>
                        ) : community.requestSent ? (
                          <>📤 Request Sent</>
                        ) : community.isPrivate ? (
                          <>🔒 Request Join</>
                        ) : (
                          <>✨ Join Community</>
                        )}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Trending Groups Section */}
          <section className={styles.exploreSection}>
            <div className={styles.sectionHeader}>
              <h2>Trending Groups</h2>
              <button className={styles.viewAllBtn}>View All</button>
            </div>
            <div className={styles.trendingGrid}>
              {trendingGroups.slice(0, 8).map((group) => (
                <div 
                  key={group._id} 
                  className={styles.trendingCard}
                  onClick={() => handleCommunityClick(group._id)}
                >
                  <img 
                    src={group.banner || group.avatar || 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=300&h=150&fit=crop'} 
                    alt={group.name}
                    onError={(e) => {
                      e.target.src = 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=300&h=150&fit=crop';
                    }}
                  />
                  <div className={styles.trendingInfo}>
                    <h4>{group.name}</h4>
                    <span>🔥 {formatMemberCount(group.memberCount || 0)} members</span>
                    {group.tags && group.tags.length > 0 && (
                      <div className={styles.trendingTags}>
                        {group.tags.slice(0, 3).map(tag => (
                          <span key={tag} className={styles.trendingTag}>#{tag}</span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Trending Topics Section */}
          <section className={styles.exploreSection}>
            <h2>Trending Topics</h2>
            <div className={styles.topicsGrid}>
              {topics.slice(1).map((topic) => (
                <button 
                  key={topic.id} 
                  className={styles.topicCard}
                  style={{ backgroundColor: topic.color }}
                  onClick={() => handleCategoryChange(topic.name.toLowerCase())}
                >
                  <span className={styles.topicIcon}>{topic.icon}</span>
                  <span className={styles.topicName}>{topic.name}</span>
                </button>
              ))}
            </div>
          </section>
        </div>
      </main>

      {/* Toast Notifications */}
      {toast && (
        <div className={`${styles.toast} ${styles[toast.type]}`}>
          <span>{toast.message}</span>
          <button onClick={() => setToast(null)}>×</button>
        </div>
      )}

      {/* Join Request Modal */}
      {showJoinModal && (
        <JoinRequestModal 
          community={showJoinModal.community}
          onClose={() => setShowJoinModal(null)}
          onSubmit={(message) => handleRequestJoin(showJoinModal.community, message)}
        />
      )}

      {/* Welcome Modal */}
      {showWelcomeModal && (
        <WelcomeModal 
          community={showWelcomeModal}
          onClose={() => setShowWelcomeModal(null)}
          onViewCommunity={() => {
            setShowWelcomeModal(null);
            handleCommunityClick(showWelcomeModal._id);
          }}
        />
      )}
    </>
  );
}

// Join Request Modal Component
const JoinRequestModal = ({ community, onClose, onSubmit }) => {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!message.trim()) return;
    setLoading(true);
    await onSubmit(message);
    setLoading(false);
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h3>Request to Join {community.name}</h3>
          <button className={styles.closeBtn} onClick={onClose}>×</button>
        </div>
        <div className={styles.modalBody}>
          <p>This is a private community. Tell the admins why you want to join:</p>
          <textarea 
            className={styles.messageInput}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Why do you want to join this community? What can you contribute?"
            maxLength={500}
            rows={4}
          />
          <div className={styles.charCount}>
            {message.length}/500
          </div>
        </div>
        <div className={styles.modalActions}>
          <button className={styles.cancelBtn} onClick={onClose}>
            Cancel
          </button>
          <button 
            className={styles.submitBtn} 
            onClick={handleSubmit} 
            disabled={!message.trim() || loading}
          >
            {loading ? 'Sending...' : 'Send Request'}
          </button>
        </div>
      </div>
    </div>
  );
};

// Welcome Modal Component
const WelcomeModal = ({ community, onClose, onViewCommunity }) => {
  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.welcomeModal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.welcomeHeader}>
          <h2>🎉 Welcome to {community.name}!</h2>
          <button className={styles.closeBtn} onClick={onClose}>×</button>
        </div>
        <div className={styles.welcomeBody}>
          <img src={community.banner || community.avatar} alt={community.name} />
          <p>You're now part of an amazing community with {community.memberCount} members!</p>
          <div className={styles.welcomeActions}>
            <button className={styles.primaryBtn} onClick={onViewCommunity}>
              🏠 Visit Community
            </button>
            <button className={styles.secondaryBtn} onClick={onClose}>
              ⚡ Continue Exploring
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};