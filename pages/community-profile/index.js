// pages/community-profile/index.js
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Navbar from '../../components/Navbar';
import Button from '../../components/Button';

export default function Community() {
  const router = useRouter();
  const { id } = router.query;
  const [hoveredTab, setHoveredTab] = useState(null);
  const [activeTab, setActiveTab] = useState('posts');
  const [community, setCommunity] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isJoined, setIsJoined] = useState(false);
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [showComments, setShowComments] = useState({});
  const [newComment, setNewComment] = useState({});
  const [loadingComment, setLoadingComment] = useState({});

  // Utility function to sanitize and validate data
  const sanitizeData = (data) => {
    if (!data || typeof data !== 'object') return null;
    
    // Filter out any data that might contain unwanted URLs or content
    const sanitized = { ...data };
    
    // Clean string properties to prevent accidental rendering of URLs
    Object.keys(sanitized).forEach(key => {
      if (typeof sanitized[key] === 'string') {
        // Remove any standalone URLs that shouldn't be displayed as text
        if (sanitized[key].match(/^https?:\/\/[^\s]+$/) && sanitized[key].includes('pravatar')) {
          sanitized[key] = '';
        }
      }
    });
    
    return sanitized;
  };

  useEffect(() => {
    if (id) {
      fetchCommunityData();
      fetchCommunityPosts();
    }
  }, [id]);

  const fetchCommunityData = async () => {
    try {
      const response = await fetch(`/api/communities/${id}`);
      if (response.ok) {
        const data = await response.json();
        setCommunity(data);
        // Check if user is a member (you'll need to implement this check)
        setIsJoined(true); // For now, assume user is joined
      }
    } catch (error) {
      console.error('Error fetching community:', error);
      // Use fallback data
      setCommunity({
        _id: id,
        name: 'Tech Enthusiasts Community',
        description: 'A vibrant community for tech lovers to discuss the latest trends, gadgets, and innovations. Join us to share your insights and connect with fellow enthusiasts.',
        memberCount: 12000,
        isPrivate: false,
        avatar: '🌟',
        banner: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800'
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchCommunityPosts = async () => {
    try {
      const response = await fetch(`/api/communities/${id}/posts`);
      if (response.ok) {
        const data = await response.json();
        // Sanitize and format posts data
        const formattedPosts = (data.posts || [])
          .filter(post => post && typeof post === 'object' && post._id)
          .map(post => ({
            _id: post._id,
            title: (typeof post.title === 'string') ? post.title.trim() : '',
            content: (typeof post.content === 'string') ? post.content.trim() : '',
            image: (typeof post.image === 'string' && 
                   post.image.trim() && 
                   post.image.startsWith('http') && 
                   !post.image.includes('pravatar')) ? post.image : null,
            author: {
              name: post.author?.fullName || post.author?.name || 'Unknown',
              avatar: (post.author?.avatar && 
                      typeof post.author.avatar === 'string' && 
                      !post.author.avatar.startsWith('http')) 
                        ? post.author.avatar 
                        : '👤'
            },
            likesCount: Number(post.likesCount || post.likes?.length || 0),
            commentsCount: Number(post.commentsCount || post.comments?.length || 0),
            sharesCount: Number(post.sharesCount || 0),
            createdAt: post.createdAt || new Date(),
            comments: (post.comments && Array.isArray(post.comments)) 
              ? post.comments
                  .filter(comment => comment && typeof comment === 'object' && comment._id)
                  .map(comment => ({
                    _id: comment._id,
                    content: (comment.content && 
                             typeof comment.content === 'string' && 
                             !comment.content.match(/^https?:\/\/[^\s]+$/) &&
                             !comment.content.includes('pravatar')) 
                               ? comment.content.trim() 
                               : '',
                    author: {
                      name: comment.author?.fullName || comment.author?.name || 'Anonymous',
                      avatar: (comment.author?.avatar && 
                              typeof comment.author.avatar === 'string' && 
                              !comment.author.avatar.startsWith('http')) 
                                ? comment.author.avatar 
                                : '👤'
                    },
                    createdAt: comment.createdAt || new Date()
                  }))
                  .filter(comment => comment.content.trim()) // Only keep valid comments
              : []
          }));
        setPosts(formattedPosts);
      } else {
        // Use fallback posts with consistent structure
        setPosts([
          {
            _id: '1',
            title: 'Exploring the Latest in Sustainable Living',
            content: 'Discover innovative ways to reduce your carbon footprint and live a more eco-friendly lifestyle. From renewable energy solutions to zero-waste tips, join the conversation and share your ideas.',
            author: { name: 'Eco Warriors', avatar: '🌿' },
            image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=400&h=300&fit=crop',
            likesCount: 1200,
            commentsCount: 345,
            sharesCount: 189,
            createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000) // 2 hours ago
          },
          {
            _id: '2',
            title: 'The Art of Urban Gardening',
            content: 'Transform your city space into a green oasis. Learn about vertical gardening, container planting, and the best crops for urban environments. Share your gardening successes and challenges.',
            author: { name: 'Green Thumbs', avatar: '🌱' },
            image: 'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=400&h=300&fit=crop',
            likesCount: 876,
            commentsCount: 123,
            sharesCount: 98,
            createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000) // 5 hours ago
          }
        ]);
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
      // Set empty posts array to prevent any data leakage
      setPosts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePost = () => {
    if (!isJoined) {
      alert('You need to join this community to create posts');
      return;
    }
    setShowCreatePost(true);
  };

  const formatTimeAgo = (date) => {
    const now = new Date();
    const diffInHours = Math.floor((now - new Date(date)) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays} days ago`;
  };

  const handleLikePost = async (postId) => {
    if (!isJoined) {
      alert('You need to join this community to interact with posts');
      return;
    }

    try {
      const response = await fetch(`/api/posts/${postId}/like`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });

      if (response.ok) {
        const data = await response.json();
        
        // Update the post in local state
        setPosts(prev => prev.map(post => 
          post._id === postId 
            ? { 
                ...post, 
                likesCount: data.liked 
                  ? (parseInt(post.likesCount) || 0) + 1 
                  : Math.max(0, (parseInt(post.likesCount) || 0) - 1),
                isLiked: data.liked 
              }
            : post
        ));
      } else {
        alert('Failed to like post. Please try again.');
      }
    } catch (error) {
      console.error('Like post error:', error);
      alert('Failed to like post. Please try again.');
    }
  };

  const toggleComments = async (postId) => {
    if (!showComments[postId]) {
      // Fetch comments when opening
      try {
        const response = await fetch(`/api/posts/${postId}/comments`);
        if (response.ok) {
          const data = await response.json();
          // Sanitize comments data
          const sanitizedComments = (data.comments || [])
            .filter(comment => comment && typeof comment === 'object' && comment._id)
            .map(comment => ({
              _id: comment._id,
              content: (comment.content && 
                       typeof comment.content === 'string' && 
                       !comment.content.match(/^https?:\/\/[^\s]+$/) &&
                       !comment.content.includes('pravatar')) 
                         ? comment.content.trim() 
                         : '',
              author: {
                name: comment.author?.fullName || comment.author?.name || 'Anonymous',
                avatar: (comment.author?.avatar && 
                        typeof comment.author.avatar === 'string' && 
                        !comment.author.avatar.startsWith('http')) 
                          ? comment.author.avatar 
                          : '👤'
              },
              createdAt: comment.createdAt || new Date()
            }))
            .filter(comment => comment.content.trim()); // Only keep comments with valid content
          
          setPosts(prev => prev.map(post => 
            post._id === postId 
              ? { ...post, comments: sanitizedComments }
              : post
          ));
        }
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    }
    
    setShowComments(prev => ({
      ...prev,
      [postId]: !prev[postId]
    }));
  };

  const handleAddComment = async (postId) => {
    if (!isJoined) {
      alert('You need to join this community to comment');
      return;
    }

    const commentText = newComment[postId]?.trim();
    if (!commentText) return;

    setLoadingComment(prev => ({ ...prev, [postId]: true }));

    try {
      const response = await fetch(`/api/posts/${postId}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: commentText })
      });

      if (response.ok) {
        const data = await response.json();
        
        // Sanitize new comment data
        const sanitizedComment = {
          _id: data.comment._id,
          content: (data.comment.content && 
                   typeof data.comment.content === 'string' && 
                   !data.comment.content.match(/^https?:\/\/[^\s]+$/) &&
                   !data.comment.content.includes('pravatar')) 
                     ? data.comment.content.trim() 
                     : '',
          author: {
            name: data.comment.author?.fullName || data.comment.author?.name || 'You',
            avatar: (data.comment.author?.avatar && 
                    typeof data.comment.author.avatar === 'string' && 
                    !data.comment.author.avatar.startsWith('http')) 
                      ? data.comment.author.avatar 
                      : '👤'
          },
          createdAt: data.comment.createdAt || new Date()
        };
        
        // Only add comment if content is valid
        if (sanitizedComment.content.trim()) {
          setPosts(prev => prev.map(post => 
            post._id === postId 
              ? { 
                  ...post, 
                  comments: [...(post.comments || []), sanitizedComment],
                  commentsCount: (post.commentsCount || 0) + 1
                }
              : post
          ));
        }

        // Clear comment input
        setNewComment(prev => ({ ...prev, [postId]: '' }));
      } else {
        alert('Failed to add comment. Please try again.');
      }
    } catch (error) {
      console.error('Add comment error:', error);
      alert('Failed to add comment. Please try again.');
    } finally {
      setLoadingComment(prev => ({ ...prev, [postId]: false }));
    }
  };

  if (loading) {
    return (
      <div style={styles.page}>
        <Navbar />
        <div style={styles.loading}>Loading community...</div>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <Navbar />
      
      <main style={styles.main}>
        {/* Hero Section */}
        <section style={styles.hero}>
          <div style={styles.communityIcon}>
            <div style={styles.iconCircle}>
              <span style={styles.iconEmoji}>🌟</span>
            </div>
          </div>

          <h1 style={styles.title}>{community?.name || 'Community'}</h1>
          
          <p style={styles.description}>
            {community?.description || 'Welcome to this amazing community!'}
          </p>

          <div style={styles.members}>
            {community?.memberCount?.toLocaleString() || '0'} members · {community?.isPrivate ? 'Private' : 'Public'} group
          </div>

          <div style={styles.actions}>
            {isJoined ? (
              <>
                <Button 
                  variant="primary" 
                  size="medium"
                  onClick={handleCreatePost}
                >
                  ✏️ Create Post
                </Button>
                <button 
                  style={styles.settingsButton}
                  onClick={() => router.push('/settings')}
                  title="Settings"
                >
                  <span>⚙️</span>
                </button>
              </>
            ) : (
              <Button variant="primary" size="medium">
                Join Community
              </Button>
            )}
          </div>

          {/* Tabs */}
          <div style={styles.tabsWrapper}>
            <div style={styles.tabs}>
              <button 
                style={{
                  ...styles.tab, 
                  ...(activeTab === 'posts' && styles.tabActive),
                  ...(hoveredTab === 'posts' && styles.tabHover)
                }}
                onClick={() => setActiveTab('posts')}
                onMouseEnter={() => setHoveredTab('posts')}
                onMouseLeave={() => setHoveredTab(null)}
              >
                Posts
              </button>
              <button 
                style={{
                  ...styles.tab,
                  ...(activeTab === 'members' && styles.tabActive),
                  ...(hoveredTab === 'members' && styles.tabHover)
                }}
                onClick={() => setActiveTab('members')}
                onMouseEnter={() => setHoveredTab('members')}
                onMouseLeave={() => setHoveredTab(null)}
              >
                Members
              </button>
              <button 
                style={{
                  ...styles.tab,
                  ...(activeTab === 'events' && styles.tabActive),
                  ...(hoveredTab === 'events' && styles.tabHover)
                }}
                onClick={() => setActiveTab('events')}
                onMouseEnter={() => setHoveredTab('events')}
                onMouseLeave={() => setHoveredTab(null)}
              >
                Events
              </button>
              <button 
                style={{
                  ...styles.tab,
                  ...(activeTab === 'about' && styles.tabActive),
                  ...(hoveredTab === 'about' && styles.tabHover)
                }}
                onClick={() => setActiveTab('about')}
                onMouseEnter={() => setHoveredTab('about')}
                onMouseLeave={() => setHoveredTab(null)}
              >
                About
              </button>
            </div>
          </div>
        </section>

        {/* Dynamic Content based on active tab */}
        {activeTab === 'posts' && (
          <section style={styles.posts}>
            {loading ? (
              <div style={styles.emptyState}>
                <div style={styles.emptyIcon}>⏳</div>
                <h3>Loading posts...</h3>
              </div>
            ) : posts.length === 0 ? (
              <div style={styles.emptyState}>
                <div style={styles.emptyIcon}>📝</div>
                <h3>No posts yet</h3>
                <p>Be the first to share something with this community!</p>
                {isJoined && (
                  <Button variant="primary" size="medium" onClick={handleCreatePost}>
                    Create First Post
                  </Button>
                )}
              </div>
            ) : (
              posts.filter(post => post && typeof post === 'object' && post._id).map((post) => (
                <article key={post._id} style={styles.post}>
                  <div style={styles.postHeader}>
                    <div style={styles.authorInfo}>
                      <div style={styles.avatar}>
                        {(post.author?.avatar && typeof post.author.avatar === 'string' && !post.author.avatar.startsWith('http')) 
                          ? post.author.avatar 
                          : '👤'}
                      </div>
                      <div>
                        <div style={styles.authorName}>
                          {(post.author?.name || post.author?.fullName || 'Unknown')}
                        </div>
                        <div style={styles.category}>in {community?.name || 'Community'}</div>
                      </div>
                    </div>
                  </div>

                  <div style={styles.postContent}>
                    <div style={styles.postText}>
                      <h2 style={styles.postTitle}>
                        {(post.title && typeof post.title === 'string') ? post.title : 'Untitled Post'}
                      </h2>
                      <p style={styles.postBody}>
                        {(post.content && typeof post.content === 'string') ? post.content : 'No content available'}
                      </p>
                    </div>
                    {post.image && 
                     typeof post.image === 'string' && 
                     post.image.trim() && 
                     post.image.startsWith('http') && 
                     !post.image.includes('pravatar') && (
                      <div style={styles.postImage}>
                        <img 
                          src={post.image} 
                          alt={post.title || 'Post image'}
                          style={styles.image}
                          onError={(e) => {
                            e.target.style.display = 'none';
                          }}
                        />
                      </div>
                    )}
                  </div>

                  <div style={styles.postFooter}>
                    <div style={styles.stats}>
                      <button 
                        style={styles.statButton}
                        onClick={() => handleLikePost(post._id)}
                      >
                        <span style={styles.stat}>❤️ {post.likesCount || 0}</span>
                      </button>
                      <button 
                        style={styles.statButton}
                        onClick={() => toggleComments(post._id)}
                      >
                        <span style={styles.stat}>💬 {post.commentsCount || 0}</span>
                      </button>
                      <button style={styles.statButton}>
                        <span style={styles.stat}>🔗 {post.sharesCount || 0}</span>
                      </button>
                    </div>
                    <span style={styles.time}>{formatTimeAgo(post.createdAt)}</span>
                  </div>

                  {/* Comments Section */}
                  {showComments[post._id] && (
                    <div style={styles.commentsSection}>
                      {/* Comment Input */}
                      {isJoined && (
                        <div style={styles.commentInput}>
                          <div style={styles.commentInputWrapper}>
                            <textarea
                              placeholder="Write a comment..."
                              value={newComment[post._id] || ''}
                              onChange={(e) => setNewComment(prev => ({
                                ...prev,
                                [post._id]: e.target.value
                              }))}
                              style={styles.commentTextarea}
                              rows={2}
                              maxLength={500}
                            />
                            <button
                              onClick={() => handleAddComment(post._id)}
                              disabled={!newComment[post._id]?.trim() || loadingComment[post._id]}
                              style={styles.commentSubmitBtn}
                            >
                              {loadingComment[post._id] ? '⏳' : '📤'}
                            </button>
                          </div>
                        </div>
                      )}

                      {/* Comments List */}
                      <div style={styles.commentsList}>
                        {post.comments && post.comments.length > 0 ? (
                          post.comments
                            .filter(comment => comment && typeof comment === 'object' && comment.content)
                            .map((comment, index) => (
                            <div key={comment._id || index} style={styles.comment}>
                              <div style={styles.commentAvatar}>
                                {(comment.author?.avatar && 
                                  typeof comment.author.avatar === 'string' && 
                                  !comment.author.avatar.startsWith('http')) 
                                    ? comment.author.avatar 
                                    : '👤'}
                              </div>
                              <div style={styles.commentContent}>
                                <div style={styles.commentHeader}>
                                  <span style={styles.commentAuthor}>
                                    {comment.author?.fullName || comment.author?.name || 'Anonymous'}
                                  </span>
                                  <span style={styles.commentTime}>
                                    {formatTimeAgo(comment.createdAt)}
                                  </span>
                                </div>
                                <p style={styles.commentText}>
                                  {(comment.content && 
                                    typeof comment.content === 'string' && 
                                    !comment.content.match(/^https?:\/\/[^\s]+$/)) 
                                      ? comment.content 
                                      : 'Comment content unavailable'}
                                </p>
                              </div>
                            </div>
                          ))
                        ) : (
                          <div style={styles.noComments}>
                            <span>💬 No comments yet. Be the first to comment!</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </article>
              ))
            )}
          </section>
        )}

        {activeTab === 'members' && (
          <section style={styles.members}>
            <div style={styles.emptyState}>
              <div style={styles.emptyIcon}>👥</div>
              <h3>Community Members</h3>
              <p>View all {community?.memberCount || 0} members of this community</p>
            </div>
          </section>
        )}

        {activeTab === 'events' && (
          <section style={styles.events}>
            <div style={styles.emptyState}>
              <div style={styles.emptyIcon}>📅</div>
              <h3>Community Events</h3>
              <p>No upcoming events. Create one to bring the community together!</p>
              {isJoined && (
                <Button variant="primary" size="medium" onClick={() => router.push('/create-event')}>
                  Create Event
                </Button>
              )}
            </div>
          </section>
        )}

        {activeTab === 'about' && (
          <section style={styles.about}>
            <div style={styles.aboutContent}>
              <h3>About this community</h3>
              <p>{community?.description}</p>
              <div style={styles.aboutStats}>
                <div style={styles.aboutStat}>
                  <strong>{community?.memberCount || 0}</strong>
                  <span>Members</span>
                </div>
                <div style={styles.aboutStat}>
                  <strong>{community?.isPrivate ? 'Private' : 'Public'}</strong>
                  <span>Visibility</span>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Floating Action Button - Only show for posts tab and if joined */}
        {activeTab === 'posts' && isJoined && (
          <button 
            style={styles.fab}
            onClick={handleCreatePost}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.1)';
              e.currentTarget.style.boxShadow = '0 8px 20px rgba(124, 92, 219, 0.5)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(124, 92, 219, 0.4)';
            }}
          >
            <span style={styles.fabIcon}>+</span>
          </button>
        )}

        {/* Create Post Modal */}
        {showCreatePost && (
          <CreatePostModal 
            community={community}
            onClose={() => setShowCreatePost(false)}
            onPostCreated={(newPost) => {
              // Ensure newPost has the correct structure
              const formattedPost = {
                _id: newPost._id || Date.now().toString(),
                title: newPost.title || '',
                content: newPost.content || '',
                image: newPost.image || null,
                author: {
                  name: newPost.author?.fullName || newPost.author?.name || 'You',
                  avatar: newPost.author?.avatar || '👤'
                },
                likesCount: newPost.likesCount || 0,
                commentsCount: newPost.commentsCount || 0,
                sharesCount: newPost.sharesCount || 0,
                createdAt: newPost.createdAt || new Date()
              };
              setPosts(prev => [formattedPost, ...prev]);
              setShowCreatePost(false);
            }}
          />
        )}
      </main>
    </div>
  );
}

// Create Post Modal Component
const CreatePostModal = ({ community, onClose, onPostCreated }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;
    
    setLoading(true);
    try {
      const response = await fetch(`/api/communities/${community._id}/posts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: title.trim(), content: content.trim(), image })
      });
      
      if (response.ok) {
        const data = await response.json();
        const newPost = data.post || data; // Handle different response formats
        onPostCreated(newPost);
      } else {
        alert('Failed to create post. Please try again.');
      }
    } catch (error) {
      console.error('Create post error:', error);
      alert('Failed to create post. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.modalOverlay} onClick={onClose}>
      <div style={styles.createPostModal} onClick={(e) => e.stopPropagation()}>
        <div style={styles.modalHeader}>
          <h3>Create Post in {community.name}</h3>
          <button style={styles.closeBtn} onClick={onClose}>×</button>
        </div>
        <form onSubmit={handleSubmit} style={styles.createPostForm}>
          <input
            type="text"
            placeholder="Post title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={styles.titleInput}
            maxLength={200}
          />
          <textarea
            placeholder="What's on your mind?"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            style={styles.contentInput}
            rows={6}
            maxLength={2000}
          />
          <input
            type="url"
            placeholder="Image URL (optional)"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            style={styles.imageInput}
          />
          <div style={styles.postActions}>
            <button type="button" onClick={onClose} style={styles.cancelBtn}>
              Cancel
            </button>
            <button 
              type="submit" 
              disabled={!title.trim() || !content.trim() || loading}
              style={styles.postBtn}
            >
              {loading ? 'Posting...' : 'Create Post'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const styles = {
  page: {
    backgroundColor: '#F0F0FF',
    minHeight: '100vh',
  },
  main: {
    paddingTop: '64px',
    maxWidth: '680px',
    margin: '0 auto',
    padding: '64px 16px 32px',
  },
  hero: {
    textAlign: 'center',
    marginBottom: '32px',
  },
  communityIcon: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '24px',
  },
  iconCircle: {
    width: '100px',
    height: '100px',
    borderRadius: '50%',
    backgroundColor: '#fef3c7',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '48px',
  },
  iconEmoji: {
    fontSize: '48px',
  },
  title: {
    fontSize: '32px',
    fontWeight: '700',
    color: '#111827',
    marginBottom: '16px',
    letterSpacing: '-0.02em',
  },
  description: {
    fontSize: '15px',
    color: '#6b7280',
    lineHeight: '1.6',
    maxWidth: '600px',
    margin: '0 auto 16px',
  },
  members: {
    fontSize: '14px',
    color: '#6b7280',
    marginBottom: '24px',
    fontWeight: '500',
  },
  actions: {
    display: 'flex',
    gap: '12px',
    justifyContent: 'center',
    marginBottom: '32px',
  },
  settingsButton: {
    backgroundColor: 'white',
    border: '1px solid #e5e7eb',
    borderRadius: '8px',
    padding: '12px 16px',
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
  },
  tabsWrapper: {
    width: '100%',
    maxWidth: '680px',
    margin: '0 auto',
    borderBottom: '1px solid #e5e7eb',
  },
  tabs: {
    display: 'flex',
    gap: '32px',
    justifyContent: 'flex-start',
    paddingLeft: '0',
  },
  tab: {
    backgroundColor: 'transparent',
    border: 'none',
    borderBottom: '2px solid transparent',
    padding: '12px 4px',
    fontSize: '15px',
    fontWeight: '500',
    color: '#6b7280',
    cursor: 'pointer',
    position: 'relative',
    transition: 'all 0.2s ease',
  },
  tabActive: {
    color: '#7c5cdb',
    borderBottom: '2px solid #7c5cdb',
  },
  tabHover: {
    color: '#7c5cdb',
  },
  posts: {
    marginTop: '32px',
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
  },
  post: {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '24px',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
  },
  postHeader: {
    marginBottom: '16px',
  },
  authorInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  avatar: {
    width: '48px',
    height: '48px',
    borderRadius: '50%',
    backgroundColor: '#d4f4dd',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '24px',
  },
  authorName: {
    fontSize: '15px',
    fontWeight: '600',
    color: '#111827',
  },
  category: {
    fontSize: '13px',
    color: '#6b7280',
  },
  postContent: {
    display: 'flex',
    gap: '20px',
    marginBottom: '16px',
  },
  postText: {
    flex: 1,
  },
  postTitle: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#111827',
    marginBottom: '8px',
    lineHeight: '1.4',
  },
  postBody: {
    fontSize: '14px',
    color: '#6b7280',
    lineHeight: '1.6',
  },
  postImage: {
    width: '180px',
    height: '140px',
    borderRadius: '8px',
    overflow: 'hidden',
    flexShrink: 0,
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  postFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: '16px',
    borderTop: '1px solid #f3f4f6',
  },
  stats: {
    display: 'flex',
    gap: '16px',
  },
  stat: {
    fontSize: '14px',
    color: '#6b7280',
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
  },
  time: {
    fontSize: '13px',
    color: '#9ca3af',
  },
  
  // Comment Styles
  commentsSection: {
    marginTop: '15px',
    paddingTop: '15px',
    borderTop: '1px solid #eee',
  },
  commentInput: {
    marginBottom: '15px',
  },
  commentInputWrapper: {
    display: 'flex',
    gap: '10px',
    alignItems: 'flex-end',
  },
  commentTextarea: {
    flex: 1,
    padding: '8px 12px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    fontSize: '14px',
    fontFamily: 'inherit',
    resize: 'vertical',
    minHeight: '36px',
  },
  commentSubmitBtn: {
    padding: '8px 12px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '16px',
    transition: 'background-color 0.2s',
  },
  commentsList: {
    maxHeight: '300px',
    overflowY: 'auto',
  },
  comment: {
    display: 'flex',
    gap: '10px',
    marginBottom: '12px',
    padding: '8px',
    backgroundColor: '#f8f9fa',
    borderRadius: '8px',
  },
  commentAvatar: {
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    backgroundColor: '#e9ecef',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '16px',
    flexShrink: 0,
  },
  commentContent: {
    flex: 1,
  },
  commentHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginBottom: '4px',
  },
  commentAuthor: {
    fontWeight: '600',
    fontSize: '13px',
    color: '#333',
  },
  commentTime: {
    fontSize: '11px',
    color: '#999',
  },
  commentText: {
    margin: 0,
    fontSize: '14px',
    color: '#333',
    lineHeight: '1.4',
  },
  noComments: {
    textAlign: 'center',
    padding: '20px',
    color: '#666',
    fontSize: '14px',
    fontStyle: 'italic',
  },
  fab: {
    position: 'fixed',
    bottom: '32px',
    right: '32px',
    width: '64px',
    height: '64px',
    borderRadius: '50%',
    backgroundColor: '#6366f1',
    color: 'white',
    border: 'none',
    fontSize: '32px',
    cursor: 'pointer',
    boxShadow: '0 4px 12px rgba(99, 102, 241, 0.4)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'transform 0.2s, box-shadow 0.2s',
  },
  fabIcon: {
    lineHeight: '1',
  },
  
  // Loading state
  loading: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '50vh',
    fontSize: '18px',
    color: '#6b7280',
  },
  
  // Empty states
  emptyState: {
    textAlign: 'center',
    padding: '60px 20px',
    color: '#6b7280',
  },
  emptyIcon: {
    fontSize: '48px',
    marginBottom: '16px',
  },
  
  // About section
  aboutContent: {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '24px',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
  },
  aboutStats: {
    display: 'flex',
    gap: '32px',
    marginTop: '24px',
  },
  aboutStat: {
    textAlign: 'center',
  },
  
  // Interactive stats
  statButton: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '4px 8px',
    borderRadius: '6px',
    transition: 'background-color 0.2s',
  },
  
  // Create Post Modal
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.6)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  },
  createPostModal: {
    backgroundColor: 'white',
    borderRadius: '16px',
    width: '90%',
    maxWidth: '600px',
    maxHeight: '80vh',
    overflow: 'hidden',
  },
  modalHeader: {
    padding: '20px 24px 16px',
    borderBottom: '1px solid #E5E7EB',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  closeBtn: {
    background: 'none',
    border: 'none',
    fontSize: '24px',
    color: '#6B7280',
    cursor: 'pointer',
    padding: '4px',
    borderRadius: '6px',
  },
  createPostForm: {
    padding: '20px 24px',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  titleInput: {
    border: '2px solid #E5E7EB',
    borderRadius: '12px',
    padding: '12px 16px',
    fontSize: '16px',
    fontWeight: '600',
    outline: 'none',
    transition: 'border-color 0.2s',
  },
  contentInput: {
    border: '2px solid #E5E7EB',
    borderRadius: '12px',
    padding: '12px 16px',
    fontSize: '15px',
    resize: 'vertical',
    outline: 'none',
    fontFamily: 'inherit',
    transition: 'border-color 0.2s',
  },
  imageInput: {
    border: '2px solid #E5E7EB',
    borderRadius: '12px',
    padding: '12px 16px',
    fontSize: '15px',
    outline: 'none',
    transition: 'border-color 0.2s',
  },
  postActions: {
    display: 'flex',
    gap: '12px',
    justifyContent: 'flex-end',
  },
  cancelBtn: {
    background: '#F3F4F6',
    color: '#6B7280',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '8px',
    fontWeight: '500',
    cursor: 'pointer',
  },
  postBtn: {
    background: '#6366F1',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '8px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
  },
};