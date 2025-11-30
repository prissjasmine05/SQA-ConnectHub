import { useState } from 'react';
import styles from './InlineComments.module.css';

export default function InlineComments({ 
  post, 
  currentUser, 
  onCommentAdded, 
  onViewAllComments,
  maxVisible = 2 
}) {
  const [showAddComment, setShowAddComment] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim() || !currentUser) return;

    setLoading(true);
    try {
      const res = await fetch(`/api/posts/${post._id}/comments`, {
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
        setNewComment('');
        setShowAddComment(false);
        
        // Notify parent component
        if (onCommentAdded) {
          onCommentAdded();
        }
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
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h`;
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d`;
    
    return commentDate.toLocaleDateString();
  };

  const visibleComments = post.comments.slice(-maxVisible);
  const hasMoreComments = post.comments.length > maxVisible;

  return (
    <div className={styles.inlineComments}>
      {/* Show recent comments */}
      {visibleComments.length > 0 && (
        <div className={styles.commentsContainer}>
          {hasMoreComments && (
            <button 
              className={styles.viewAllBtn}
              onClick={() => onViewAllComments && onViewAllComments(post._id)}
            >
              View all {post.comments.length} comments
            </button>
          )}
          
          {visibleComments.map((comment) => (
            <div key={comment._id} className={styles.commentItem}>
              <span className={styles.commentAuthor}>
                {comment.author?.fullName || comment.author?.fullname || 'Unknown'}
              </span>
              <span className={styles.commentText}>{comment.content}</span>
              <span className={styles.commentTime}>
                {formatTimeAgo(comment.createdAt)}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Add comment section */}
      {currentUser && (
        <div className={styles.addCommentSection}>
          {!showAddComment ? (
            <button 
              className={styles.addCommentBtn}
              onClick={() => setShowAddComment(true)}
            >
              Add a comment...
            </button>
          ) : (
            <form onSubmit={handleSubmitComment} className={styles.commentForm}>
              <input
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Add a comment..."
                className={styles.commentInput}
                autoFocus
                disabled={loading}
              />
              <div className={styles.commentActions}>
                <button
                  type="button"
                  onClick={() => {
                    setShowAddComment(false);
                    setNewComment('');
                  }}
                  className={styles.cancelBtn}
                  disabled={loading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!newComment.trim() || loading}
                  className={styles.postBtn}
                >
                  {loading ? 'Posting...' : 'Post'}
                </button>
              </div>
            </form>
          )}
        </div>
      )}
    </div>
  );
}
