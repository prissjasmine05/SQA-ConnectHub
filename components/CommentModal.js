import { useState, useEffect } from 'react';
import styles from './CommentModal.module.css';

export default function CommentModal({ 
  isOpen, 
  onClose, 
  postId, 
  currentUser, 
  onCommentAdded 
}) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(false);
  const [fetchingComments, setFetchingComments] = useState(false);

  useEffect(() => {
    if (isOpen && postId) {
      fetchComments();
    }
  }, [isOpen, postId]);

  const fetchComments = async () => {
    setFetchingComments(true);
    try {
      const res = await fetch(`/api/posts/${postId}`, {
        credentials: 'include'
      });

      if (res.ok) {
        const data = await res.json();
        setComments(data.post.comments || []);
      }
    } catch (error) {
      console.error('Error fetching comments:', error);
    } finally {
      setFetchingComments(false);
    }
  };

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim() || !currentUser) return;

    setLoading(true);
    try {
      const res = await fetch(`/api/posts/${postId}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({
          content: newComment.trim()
        })
      });

      if (res.ok) {
        const data = await res.json();
        setComments(prev => [...prev, data.comment]);
        setNewComment('');
        
        // Notify parent component
        if (onCommentAdded) {
          onCommentAdded();
        }
      } else {
        const errorData = await res.json();
        console.error('Failed to add comment:', errorData.message);
      }
    } catch (error) {
      console.error('Error adding comment:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatTimeAgo = (dateString) => {
    const now = new Date();
    const commentDate = new Date(dateString);
    const diffInSeconds = Math.floor((now - commentDate) / 1000);

    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`;
    
    return commentDate.toLocaleDateString();
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h3 className={styles.modalTitle}>Comments</h3>
          <button 
            className={styles.closeButton}
            onClick={onClose}
          >
            ✕
          </button>
        </div>

        <div className={styles.modalBody}>
          {/* Comments List */}
          <div className={styles.commentsList}>
            {fetchingComments ? (
              <div className={styles.loadingComments}>
                <p>Loading comments...</p>
              </div>
            ) : comments.length === 0 ? (
              <div className={styles.noComments}>
                <p>No comments yet. Be the first to comment!</p>
              </div>
            ) : (
              comments.map((comment) => (
                <div key={comment._id} className={styles.commentItem}>
                  <div className={styles.commentAvatar}>
                    {comment.author?.avatar ? (
                      <img 
                        src={comment.author.avatar} 
                        alt={comment.author.fullName || comment.author.fullname}
                        className={styles.avatarImage}
                      />
                    ) : (
                      <div className={styles.avatarPlaceholder}>
                        {(comment.author?.fullName || comment.author?.fullname)?.charAt(0) || 'U'}
                      </div>
                    )}
                  </div>
                  <div className={styles.commentContent}>
                    <div className={styles.commentHeader}>
                      <span className={styles.commentAuthor}>
                        {comment.author?.fullName || comment.author?.fullname || 'Unknown User'}
                      </span>
                      <span className={styles.commentTime}>
                        {formatTimeAgo(comment.createdAt)}
                      </span>
                    </div>
                    <p className={styles.commentText}>
                      {comment.content}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Add Comment Form */}
          {currentUser && (
            <form onSubmit={handleSubmitComment} className={styles.addCommentForm}>
              <div className={styles.commentInputWrapper}>
                <div className={styles.userAvatar}>
                  {currentUser.avatar ? (
                    <img 
                      src={currentUser.avatar} 
                      alt={currentUser.fullName || currentUser.fullname}
                      className={styles.avatarImage}
                    />
                  ) : (
                    <div className={styles.avatarPlaceholder}>
                      {(currentUser.fullName || currentUser.fullname)?.charAt(0) || 'U'}
                    </div>
                  )}
                </div>
                <div className={styles.inputContainer}>
                  <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Write a comment..."
                    className={styles.commentInput}
                    rows={3}
                    disabled={loading}
                  />
                  <button
                    type="submit"
                    disabled={!newComment.trim() || loading}
                    className={styles.submitButton}
                  >
                    {loading ? 'Posting...' : 'Post'}
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
