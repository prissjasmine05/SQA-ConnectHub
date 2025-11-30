import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../../contexts/AuthContext';
import Navbar from '@/components/Navbar';
import MediaDisplay from '@/components/MediaDisplay';
import FollowModal from '@/components/FollowModal';
import CommentModal from '@/components/CommentModal';
import InlineComments from '@/components/InlineComments';
import styles from './user-profile.module.css';

export default function ProfilePage() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [posts, setPosts] = useState([]);
  const [postsLoading, setPostsLoading] = useState(true);
  const [isFollowModalOpen, setIsFollowModalOpen] = useState(false);
  const [followModalType, setFollowModalType] = useState('following');
  const [commentModal, setCommentModal] = useState({ isOpen: false, postId: null }); // 'following' or 'followers'

  // Fetch posts after user data is available
  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push('/create-acc');
        return;
      }
      fetchPosts();
    }
  }, [user, loading, router]);

  // Handle refresh from query params
  useEffect(() => {
    if (router.query.refresh === 'true') {
      fetchPosts();
      // Remove refresh param from URL
      router.replace('/user-profile', undefined, { shallow: true });
    }
  }, [router.query.refresh]);



  const fetchPosts = async () => {
    if (!user?._id) {
      setPostsLoading(false);
      return;
    }

    try {
      console.log('Fetching user posts for:', user._id);
      const res = await fetch(`/api/posts?author=${user._id}&limit=10`, {
        credentials: 'include'
      });

      if (res.ok) {
        const data = await res.json();
        console.log('User posts fetched:', data);
        setPosts(data.posts || []);
      } else {
        console.error('Failed to fetch posts:', res.status, res.statusText);
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setPostsLoading(false);
    }
  };

  const openFollowModal = (type) => {
    setFollowModalType(type);
    setIsFollowModalOpen(true);
  };

  const closeFollowModal = () => {
    setIsFollowModalOpen(false);
  };

  const openCommentModal = (postId) => {
    setCommentModal({ isOpen: true, postId });
  };

  const closeCommentModal = () => {
    setCommentModal({ isOpen: false, postId: null });
  };

  const handleCommentAdded = () => {
    // Refresh posts to update comment count
    fetchPosts();
  };

  const handleLike = async (postId) => {
    try {
      const res = await fetch(`/api/posts/${postId}/like`, {
        method: 'POST',
        credentials: 'include'
      });

      if (res.ok) {
        const data = await res.json();
        setPosts(prevPosts => 
          prevPosts.map(post => 
            post._id === postId 
              ? { 
                  ...post, 
                  likes: data.liked 
                    ? [...post.likes, user._id]
                    : post.likes.filter(id => id !== user._id)
                }
              : post
          )
        );
      }
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };

  const handleUnfollowFromModal = (userId) => {
    // Update user following count
    setUser(prev => ({
      ...prev,
      following: prev.following.filter(id => id !== userId)
    }));
  };

  const formatTimeAgo = (dateString) => {
    const now = new Date();
    const postDate = new Date(dateString);
    const diffInSeconds = Math.floor((now - postDate) / 1000);

    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`;
    
    return postDate.toLocaleDateString();
  };

  const handleLogout = async () => {
    if (!confirm('Are you sure you want to logout?')) return;

    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include'
      });
      router.push('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  // Show loading state
  if (loading) {
    return (
      <div className={styles.mainContainer}>
        <Navbar isLoggedIn={false} variant="default" />
        <div className={styles.loadingContainer}>
          <p>Loading profile...</p>
        </div>
      </div>
    );
  }

  // Don't render if no user
  if (!user) {
    return null;
  }

  return (
    <div className={styles.mainContainer}>
      <Navbar isLoggedIn={true} variant="default" />

      <div className={styles.contentWrapper}>
        {/* Profile Card */}
        <div className={styles.profileCard}>
          <div className={styles.profileHeader}>
            <div className={styles.profileInfo}>
              <div className={styles.profileImageWrapper}>
                <img
                  src={user.avatar || '/api/placeholder/120/120'}
                  alt={user.fullName || user.fullname}
                  className={styles.profileImage}
                />
              </div>
              <h1 className={styles.profileName}>{user.fullName || user.fullname || 'User'}</h1>
              <p className={styles.profileBio}>
                {user.bio ||
                  'Tech enthusiast, avid reader, and aspiring chef. Always up for a good debate or a new adventure.'}
              </p>
              <p className={styles.profileJoined}>
                Joined in {user.createdAt ? new Date(user.createdAt).getFullYear() : new Date().getFullYear()}
              </p>

              <div className={styles.profileActions}>
                <button className={styles.iconBtn}>
                  <span className={styles.trophyIcon}>🏆</span>
                </button>
                <button
                  onClick={() => router.push('/chat')}
                  className={styles.iconBtn}
                  title="Messages"
                >
                  💬
                </button>
                <button
                  onClick={() => router.push('/user-profile/editprofile')}
                  className={styles.actionBtn}
                >
                  Edit Profile
                </button>
                <button
                  onClick={() => router.push('/user-profile/mypoints')}
                  className={styles.actionBtn}
                >
                  My Points
                </button>
                <button
                  onClick={() => router.push('/user-profile/settings')}
                  className={styles.iconBtn}
                >
                  ⚙️
                </button>
                <button
                  onClick={handleLogout}
                  className={styles.actionBtn}
                  style={{ backgroundColor: '#ef4444', color: 'white' }}
                >
                  Logout
                </button>
              </div>
            </div>
          </div>

          <div className={styles.interestsSection}>
            <h2 className={styles.interestsTitle}>Interests</h2>
            <div className={styles.interestsList}>
              {user.interests && user.interests.length > 0 ? (
                user.interests.map((interest, index) => {
                  // Create a class name based on the interest
                  const interestClass = `interest${interest.replace(/\s+/g, '')}`;
                  return (
                    <span
                      key={index}
                      className={`${styles.interestBadge} ${styles[interestClass] || ''}`}
                    >
                      {interest}
                    </span>
                  );
                })
              ) : (
                <>
                  <span className={`${styles.interestBadge} ${styles.interestCooking}`}>
                    Cooking
                  </span>
                  <span className={`${styles.interestBadge} ${styles.interestBadminton}`}>
                    Badminton
                  </span>
                  <span className={`${styles.interestBadge} ${styles.interestTravel}`}>
                    Travel
                  </span>
                </>
              )}
            </div>
          </div>

          {/* Stats Section */}
          <div className={styles.statsSection}>
            <div className={styles.stats}>
              <button 
                className={styles.statItem}
                onClick={() => openFollowModal('following')}
              >
                <span className={styles.statNumber}>{user.following?.length || 0}</span>
                <span className={styles.statLabel}>Following</span>
              </button>
              <button 
                className={styles.statItem}
                onClick={() => openFollowModal('followers')}
              >
                <span className={styles.statNumber}>{user.followers?.length || 0}</span>
                <span className={styles.statLabel}>Followers</span>
              </button>
            </div>
          </div>
        </div>

        {/* Posts Feed */}
        <div className={styles.postsFeed}>
          {postsLoading ? (
            <div className={styles.loadingPosts}>
              <p>Loading posts...</p>
            </div>
          ) : posts.length === 0 ? (
            <div className={styles.noPosts}>
              <h3>No posts yet</h3>
              <p>Be the first to share something amazing!</p>
              <button 
                onClick={() => router.push('/user-profile/createpost')}
                className={styles.createFirstPost}
              >
                Create Your First Post
              </button>
            </div>
          ) : (
            posts.map((post) => (
              <article key={post._id} className={styles.postCard}>
                <div className={styles.postHeader}>
                  <div className={styles.postAvatar}>
                    {post.author?.avatar ? (
                      <img 
                        src={post.author.avatar} 
                        alt={post.author.fullName}
                        className={styles.avatarImage}
                      />
                    ) : (
                      <div className={styles.avatarPlaceholder}>
                        {(post.author?.fullName || post.author?.fullname)?.charAt(0) || 'U'}
                      </div>
                    )}
                  </div>
                  <div className={styles.postMeta}>
                    <div className={styles.postAuthor}>
                      <span className={styles.authorName}>
                        {post.author?.fullName || post.author?.fullname || 'Unknown User'}
                      </span>
                      {post.community && (
                        <span className={styles.communityGroup}>
                          in {post.community.name}
                        </span>
                      )}
                    </div>
                    <span className={styles.postTime}>
                      {formatTimeAgo(post.createdAt)}
                    </span>
                  </div>
                </div>

                <div className={styles.postContent}>
                  <p className={styles.postDescription}>
                    {post.content}
                  </p>
                </div>

                {/* Media Display */}
                {post.media && post.media.length > 0 && (
                  <MediaDisplay media={post.media} />
                )}

                <div className={styles.postActions}>
                  <button 
                    className={`${styles.actionButton} ${
                      post.likes.includes(user?._id) ? styles.liked : ''
                    }`}
                    onClick={() => handleLike(post._id)}
                  >
                    <span>❤️</span>
                    <span>{post.likes.length}</span>
                  </button>
                  <button 
                    className={styles.actionButton}
                    onClick={() => openCommentModal(post._id)}
                  >
                    <span>💬</span>
                    <span>{post.comments.length}</span>
                  </button>
                  <button className={styles.actionButton}>
                    <span>🔗</span>
                  </button>
                </div>

                {/* Inline Comments */}
                <InlineComments 
                  post={post}
                  currentUser={user}
                  onCommentAdded={handleCommentAdded}
                  onViewAllComments={openCommentModal}
                  maxVisible={2}
                />
              </article>
            ))
          )}
        </div>
      </div>

      {/* Floating Action Button */}
      <button
        onClick={() => router.push('/user-profile/createpost')}
        className={styles.fab}
      >
        +
      </button>

      {/* Follow Modal */}
      <FollowModal 
        isOpen={isFollowModalOpen}
        onClose={closeFollowModal}
        type={followModalType}
        userId={user?._id}
        currentUserId={user?._id}
        onUnfollow={handleUnfollowFromModal}
      />

      {/* Comment Modal */}
      <CommentModal 
        isOpen={commentModal.isOpen}
        onClose={closeCommentModal}
        postId={commentModal.postId}
        currentUser={user}
        onCommentAdded={handleCommentAdded}
      />
    </div>
  );
}