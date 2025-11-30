import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Navbar from '../../components/Navbar';
import MediaDisplay from '../../components/MediaDisplay';
import CommentModal from '../../components/CommentModal';
import InlineComments from '../../components/InlineComments';
import styles from './MainPage.module.css';

export default function MainPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('for-you');
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [suggestedUsers, setSuggestedUsers] = useState([]);
  const [commentModal, setCommentModal] = useState({ isOpen: false, postId: null });

  useEffect(() => {
    checkAuth();
    fetchPosts();
    fetchSuggestedUsers();
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

  const fetchPosts = async (pageNum = 1) => {
    try {
      const res = await fetch(`/api/posts?page=${pageNum}&limit=10`, {
        credentials: 'include'
      });

      if (res.ok) {
        const data = await res.json();
        if (pageNum === 1) {
          setPosts(data.posts || []);
        } else {
          setPosts(prev => [...prev, ...(data.posts || [])]);
        }
        setHasMore(data.pagination?.hasNext || false);
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  const fetchSuggestedUsers = async () => {
    try {
      const res = await fetch('/api/user/suggested', { credentials: 'include' });
      if (res.ok) {
        const data = await res.json();
        setSuggestedUsers(data.users || []);
      }
    } catch (error) {
      console.error('Error fetching suggested users:', error);
    }
  };

  const loadMorePosts = async () => {
    if (loadingMore || !hasMore) return;
    
    setLoadingMore(true);
    const nextPage = page + 1;
    setPage(nextPage);
    await fetchPosts(nextPage);
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

  const handleFollow = async (userId) => {
    try {
      const res = await fetch(`/api/user/${userId}/follow`, {
        method: 'POST',
        credentials: 'include'
      });

      if (res.ok) {
        const data = await res.json();
        setSuggestedUsers(prevUsers => 
          prevUsers.map(suggestedUser => 
            suggestedUser._id === userId 
              ? { ...suggestedUser, isFollowing: data.isFollowing }
              : suggestedUser
          )
        );
        
        // Update user following count
        setUser(prev => ({
          ...prev,
          following: data.isFollowing 
            ? [...prev.following, userId]
            : prev.following.filter(id => id !== userId)
        }));
      }
    } catch (error) {
      console.error('Error following user:', error);
    }
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

  if (loading) {
    return (
      <>
        <Head>
          <title>For You Page - ConnectHub</title>
        </Head>
        <Navbar isLoggedIn={!!user} />
        <main className={styles.mainContainer}>
          <div className={styles.loadingContainer}>
            <p>Loading feed...</p>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>For You Page - ConnectHub</title>
      </Head>

      <Navbar isLoggedIn={!!user} />

      <main className={styles.mainContainer}>
        <div className={styles.contentWrapper}>
          <div className={styles.feedHeader}>
            <h1>For You Page</h1>
            <div className={styles.tabs}>
              <Link href="/main-page">
                <button className={activeTab === 'for-you' ? styles.activeTab : ''}>
                  For you
                </button>
              </Link>
              <Link href="/main-page/following">
                <button className={activeTab === 'following' ? styles.activeTab : ''}>
                  Following
                </button>
              </Link>
              <Link href="/main-page/events">
                <button className={activeTab === 'events' ? styles.activeTab : ''}>
                  Events
                </button>
              </Link>
            </div>
            <button 
              onClick={() => router.push('/user-profile/createpost')}
              className={styles.createPostBtn}
            >
              Create Post
            </button>
          </div>

          <div className={styles.mainContent}>
            <div className={styles.feedColumn}>
              <div className={styles.feedPosts}>
                {posts.length === 0 ? (
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
                  <>
                    {posts.map((post, index) => (
                      <article key={post._id} className={index === 0 ? styles.postCardLarge : styles.postCard}>
                        <div className={styles.postHeader}>
                          <div className={styles.postAuthor}>
                            <div className={styles.authorAvatar}>
                              {post.author?.avatar ? (
                                <img src={post.author.avatar} alt={post.author.fullName} />
                              ) : (
                                <div className={styles.avatarPlaceholder}>
                                  {(post.author?.fullName || post.author?.fullname)?.charAt(0) || 'U'}
                                </div>
                              )}
                            </div>
                            <div className={styles.authorInfo}>
                              <h3 
                                className={styles.authorName}
                                onClick={() => router.push(`/user-profile-other/${post.author?._id}`)}
                              >
                                {post.author?.fullName || post.author?.fullname || 'Unknown User'}
                              </h3>
                              {post.community && (
                                <span className={styles.communityName}>in {post.community.name}</span>
                              )}
                            </div>
                          </div>
                          <span className={styles.timeAgo}>{formatTimeAgo(post.createdAt)}</span>
                        </div>

                        <div className={styles.postContent}>
                          <p>{post.content}</p>
                        </div>

                        {/* Media Display */}
                        {post.media && post.media.length > 0 && (
                          <div className={styles.postMedia}>
                            <MediaDisplay media={post.media} />
                          </div>
                        )}

                        <div className={styles.postActions}>
                          <button 
                            className={`${styles.actionBtn} ${
                              post.likes.includes(user?._id) ? styles.liked : ''
                            }`}
                            onClick={() => handleLike(post._id)}
                          >
                            <span>❤️</span> {post.likes.length}
                          </button>
                          <button 
                            className={styles.actionBtn}
                            onClick={() => openCommentModal(post._id)}
                          >
                            <span>💬</span> {post.comments.length}
                          </button>
                          <button className={styles.actionBtn}>
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
                    ))}

                    {/* Load More Button */}
                    {hasMore && (
                      <div className={styles.loadMoreContainer}>
                        <button 
                          onClick={loadMorePosts}
                          disabled={loadingMore}
                          className={styles.loadMoreBtn}
                        >
                          {loadingMore ? 'Loading...' : 'Load More Posts'}
                        </button>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>

            {/* Sidebar with suggested users */}
            <div className={styles.sidebar}>
              <div className={styles.suggestedUsers}>
                <h3>Suggested for you</h3>
                {suggestedUsers.map((suggestedUser) => (
                  <div key={suggestedUser._id} className={styles.userSuggestion}>
                    <div className={styles.userInfo}>
                      <div className={styles.userAvatar}>
                        {suggestedUser.avatar ? (
                          <img src={suggestedUser.avatar} alt={suggestedUser.fullName} />
                        ) : (
                          <div className={styles.avatarPlaceholder}>
                            {suggestedUser.fullName?.charAt(0) || 'U'}
                          </div>
                        )}
                      </div>
                      <div className={styles.userDetails}>
                        <h4 
                          className={styles.clickableUserName}
                          onClick={() => router.push(`/user-profile-other/${suggestedUser._id}`)}
                        >
                          {suggestedUser.fullName}
                        </h4>
                        <p>{suggestedUser.bio || 'No bio available'}</p>
                        <span>{suggestedUser.followers?.length || 0} followers</span>
                      </div>
                    </div>
                    <button 
                      className={`${styles.followBtn} ${
                        suggestedUser.isFollowing ? styles.following : ''
                      }`}
                      onClick={() => handleFollow(suggestedUser._id)}
                    >
                      {suggestedUser.isFollowing ? 'Following' : 'Follow'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Comment Modal */}
      <CommentModal 
        isOpen={commentModal.isOpen}
        onClose={closeCommentModal}
        postId={commentModal.postId}
        currentUser={user}
        onCommentAdded={handleCommentAdded}
      />
    </>
  );
}