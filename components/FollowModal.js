import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import styles from './FollowModal.module.css';

export default function FollowModal({ 
  isOpen, 
  onClose, 
  type, // 'following' or 'followers'
  userId,
  currentUserId, // ID dari user yang sedang login
  onUnfollow 
}) {
  const router = useRouter();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isOpen && userId) {
      fetchUsers();
    }
  }, [isOpen, userId, type]);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      // Jika ini following dari profile user lain, ambil data following mereka
      // Jika ini following dari profile sendiri, ambil data following sendiri
      const endpoint = type === 'following' 
        ? (userId === currentUserId ? '/api/user/following' : `/api/user/${userId}/following`)
        : `/api/user/${userId}/followers`;
        
      const res = await fetch(endpoint, {
        credentials: 'include'
      });

      if (res.ok) {
        const data = await res.json();
        setUsers(data.users || []);
      }
    } catch (error) {
      console.error(`Error fetching ${type}:`, error);
    } finally {
      setLoading(false);
    }
  };

  const handleUnfollow = async (targetUserId) => {
    if (!confirm('Are you sure you want to unfollow this user?')) return;

    try {
      const res = await fetch(`/api/user/${targetUserId}/follow`, {
        method: 'POST',
        credentials: 'include'
      });

      if (res.ok) {
        // Remove user from list
        setUsers(prevUsers => 
          prevUsers.filter(user => user._id !== targetUserId)
        );
        // Call parent callback
        if (onUnfollow) {
          onUnfollow(targetUserId);
        }
      }
    } catch (error) {
      console.error('Error unfollowing user:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h2>{type === 'following' ? 'Following' : 'Followers'}</h2>
          <button className={styles.closeBtn} onClick={onClose}>
            ×
          </button>
        </div>

        <div className={styles.modalBody}>
          {loading ? (
            <div className={styles.loading}>
              <p>Loading...</p>
            </div>
          ) : users.length === 0 ? (
            <div className={styles.emptyState}>
              <p>
                {type === 'following' 
                  ? (userId === currentUserId ? "You're not following anyone yet." : "Not following anyone yet.")
                  : "No followers yet."
                }
              </p>
            </div>
          ) : (
            <div className={styles.usersList}>
              {users.map((user) => (
                <div key={user._id} className={styles.userItem}>
                  <div className={styles.userInfo}>
                    <div className={styles.userAvatar}>
                      {user.avatar ? (
                        <img src={user.avatar} alt={user.fullName} />
                      ) : (
                        <div className={styles.avatarPlaceholder}>
                          {user.fullName?.charAt(0) || 'U'}
                        </div>
                      )}
                    </div>
                    <div className={styles.userDetails}>
                      <h4 
                        className={styles.clickableUserName}
                        onClick={() => {
                          onClose();
                          router.push(`/user-profile-other/${user._id}`);
                        }}
                      >
                        {user.fullName}
                      </h4>
                      <p>{user.bio || 'No bio available'}</p>
                      <span>{user.followers?.length || 0} followers</span>
                    </div>
                  </div>
                  {/* Tampilkan tombol unfollow hanya jika:
                      1. Ini adalah following list
                      2. User yang sedang login sama dengan profile owner
                      3. User yang ditampilkan bukan user sendiri
                  */}
                  {type === 'following' && userId === currentUserId && user._id !== currentUserId && (
                    <button 
                      className={styles.unfollowBtn}
                      onClick={() => handleUnfollow(user._id)}
                    >
                      Unfollow
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
