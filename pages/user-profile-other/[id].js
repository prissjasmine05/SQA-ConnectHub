import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Navbar from '@/components/Navbar';
import MediaDisplay from '@/components/MediaDisplay';
import FollowModal from '@/components/FollowModal';
import CommentModal from '@/components/CommentModal';
import InlineComments from '@/components/InlineComments';
import styles from './user-profile-other.module.css';

export default function OtherUserProfilePage() {
  const router = useRouter();
  const { id } = router.query;
  const [currentUser, setCurrentUser] = useState(null);
  const [profileUser, setProfileUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [postsLoading, setPostsLoading] = useState(true);
  const [isFollowModalOpen, setIsFollowModalOpen] = useState(false);
  const [followModalType, setFollowModalType] = useState('following');
  const [isFollowing, setIsFollowing] = useState(false);
  const [followLoading, setFollowLoading] = useState(false);
  const [commentModal, setCommentModal] = useState({ isOpen: false, postId: null });

  useEffect(() => {
    if (id) {
      fetchCurrentUser();
      fetchProfileUser();
    }
  }, [id]);

  useEffect(() => {
    if (profileUser) {
      fetchPosts();
    }
  }, [profileUser]);

  useEffect(() => {
    // Check if current user is following this profile user
    if (currentUser && profileUser && profileUser.followers) {
      const isFollowing = profileUser.followers.some(follower => 
        (typeof follower === 'string' ? follower : follower._id) === currentUser._id
      );
      setIsFollowing(isFollowing);
    }
  }, [currentUser, profileUser]);

  const fetchCurrentUser = async () => {
    try {
      const res = await fetch('/api/auth/me', {
        credentials: 'include'
      });

      if (!res.ok) {
        router.push('/create-acc');
        return;
      }

      const data = await res.json();
      setCurrentUser(data.user);
    } catch (error) {
      console.error('Error fetching current user:', error);
      router.push('/create-acc');
    }
  };

  const fetchProfileUser = async () => {
    try {
      console.log('Fetching profile user for ID:', id);
      const res = await fetch(`/api/user/${id}`, {
        credentials: 'include'
      });

      if (!res.ok) {
        console.error('Failed to fetch user:', res.status, res.statusText);
        if (res.status === 404) {
          router.push('/404');
          return;
        }
        throw new Error('Failed to fetch user profile');
      }

      const data = await res.json();
      console.log('Profile user data:', data);
      setProfileUser(data.user);
    } catch (error) {
      console.error('Error fetching profile user:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchPosts = async () => {
    try {
      const res = await fetch(`/api/posts?author=${profileUser._id}&limit=10`, {
        credentials: 'include'
      });

      if (res.ok) {
        const data = await res.json();
        setPosts(data.posts || []);
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setPostsLoading(false);
    }
  };

  const handleFollow = async () => {
    if (!currentUser || !profileUser || followLoading) return;

    setFollowLoading(true);
    try {
      const res = await fetch(`/api/user/${profileUser._id}/follow`, {
        method: 'POST',
        credentials: 'include'
      });

      if (res.ok) {
        const data = await res.json();
        setIsFollowing(data.isFollowing);
        
        // Update follower count
        setProfileUser(prev => ({
          ...prev,
          followers: data.isFollowing 
            ? [...(prev.followers || []), currentUser._id]
            : (prev.followers || []).filter(id => id !== currentUser._id)
        }));
      }
    } catch (error) {
      console.error('Error following user:', error);
    } finally {
      setFollowLoading(false);
    }
  };

  const handleLike = async (postId) => {
    if (!currentUser) return;

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
                    ? [...post.likes, currentUser._id]
                    : post.likes.filter(id => id !== currentUser._id)
                }
              : post
          )
        );
      }
    } catch (error) {
      console.error('Error liking post:', error);
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

  // Redirect if trying to view own profile
  if (currentUser && profileUser && currentUser._id === profileUser._id) {
    router.push('/user-profile');
    return null;
  }

  if (loading) {
    return (
      <div className={styles.mainContainer}>
        <Navbar isLoggedIn={true} variant="default" />
        <div className={styles.loadingContainer}>
          <p>Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!profileUser) {
    return (
      <div className={styles.mainContainer}>
        <Navbar isLoggedIn={!!currentUser} variant="default" />
        <div className={styles.errorContainer}>
          <h2>User not found</h2>
          <p>The user you're looking for doesn't exist.</p>
          <button 
            onClick={() => router.push('/main-page')}
            className={styles.backBtn}
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.mainContainer}>
      <Navbar isLoggedIn={!!currentUser} variant="default" />

      <div className={styles.contentWrapper}>
        {/* Profile Card */}
        <div className={styles.profileCard}>
          <div className={styles.profileHeader}>
            <div className={styles.profileInfo}>
              <div className={styles.profileImageWrapper}>
                <img
                  src={profileUser.avatar || '/api/placeholder/120/120'}
                  alt={profileUser.fullName || profileUser.fullname}
                  className={styles.profileImage}
                />
              </div>
              <h1 className={styles.profileName}>
                {profileUser.fullName || profileUser.fullname || 'User'}
              </h1>
              <p className={styles.profileUsername}>@{profileUser.username}</p>
              <p className={styles.profileBio}>
                {profileUser.bio ||
                  'Tech enthusiast, avid reader, and aspiring chef. Always up for a good debate or a new adventure.'}
              </p>
              <p className={styles.profileJoined}>
                Joined in {profileUser.createdAt ? new Date(profileUser.createdAt).getFullYear() : new Date().getFullYear()}
              </p>

              <div className={styles.profileActions}>
                {currentUser && currentUser._id !== profileUser._id && (
                  <>
                    <button
                      onClick={handleFollow}
                      disabled={followLoading}
                      className={`${styles.followBtn} ${isFollowing ? styles.following : ''}`}
                    >
                      {followLoading ? 'Loading...' : isFollowing ? 'Following' : 'Follow'}
                    </button>
                    <button
                      onClick={() => router.push(`/chat?user=${profileUser._id}`)}
                      className={styles.messageBtn}
                      title="Send Message"
                    >
                      💬 Message
                    </button>
                  </>
                )}
                <button
                  onClick={() => router.push('/main-page')}
                  className={styles.actionBtn}
                >
                  Back to Home
                </button>
              </div>
            </div>
          </div>

          <div className={styles.interestsSection}>
            <h2 className={styles.interestsTitle}>Interests</h2>
            <div className={styles.interestsList}>
              {profileUser.interests && profileUser.interests.length > 0 ? (
                profileUser.interests.map((interest, index) => {
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
                <span className={styles.statNumber}>{profileUser.following?.length || 0}</span>
                <span className={styles.statLabel}>Following</span>
              </button>
              <button 
                className={styles.statItem}
                onClick={() => openFollowModal('followers')}
              >
                <span className={styles.statNumber}>{profileUser.followers?.length || 0}</span>
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
              <p>{profileUser.fullName || profileUser.fullname} hasn't shared anything yet.</p>
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
                      post.likes.includes(currentUser?._id) ? styles.liked : ''
                    }`}
                    onClick={() => handleLike(post._id)}
                    disabled={!currentUser}
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
                  currentUser={currentUser}
                  onCommentAdded={handleCommentAdded}
                  onViewAllComments={openCommentModal}
                  maxVisible={2}
                />
              </article>
            ))
          )}
        </div>
      </div>

      {/* Follow Modal */}
      <FollowModal 
        isOpen={isFollowModalOpen}
        onClose={closeFollowModal}
        type={followModalType}
        userId={profileUser?._id}
        currentUserId={currentUser?._id}
        onUnfollow={() => {}}
      />

      {/* Comment Modal */}
      <CommentModal 
        isOpen={commentModal.isOpen}
        onClose={closeCommentModal}
        postId={commentModal.postId}
        currentUser={currentUser}
        onCommentAdded={handleCommentAdded}
      />
    </div>
  );
}
