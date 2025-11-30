import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Navbar from '../../components/Navbar';
import Button from '../../components/Button';
import styles from './Notifications.module.css';

export default function Notifications() {
  const router = useRouter();
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [unreadCount, setUnreadCount] = useState(0);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchNotifications();
    // Auto cleanup on first load
    if (filter === 'all') {
      cleanupNotifications();
    }
  }, [filter]);

  const fetchNotifications = async () => {
    try {
      const query = new URLSearchParams();
      if (filter !== 'all') {
        if (filter === 'unread') {
          query.append('unreadOnly', 'true');
        } else {
          query.append('type', filter);
        }
      }

      let headers = {};
      const token = localStorage.getItem('token');
      
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const response = await fetch(`/api/notifications?${query}`, {
        headers,
        credentials: 'include'
      });

      if (response.ok) {
        const data = await response.json();
        setNotifications(data.notifications);
        setUnreadCount(data.unreadCount);
      } else if (response.status === 401) {
        router.push('/');
      }
    } catch (error) {
      console.error('Error fetching notifications:', error);
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (notificationIds, markAll = false) => {
    try {
      let headers = {
        'Content-Type': 'application/json'
      };
      const token = localStorage.getItem('token');
      
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
      
      const response = await fetch('/api/notifications', {
        method: 'PUT',
        headers,
        credentials: 'include',
        body: JSON.stringify({
          notificationIds: markAll ? undefined : notificationIds,
          markAllAsRead: markAll
        })
      });

      if (response.ok) {
        fetchNotifications();
      }
    } catch (error) {
      console.error('Error marking notifications as read:', error);
    }
  };

  const deleteNotifications = async (notificationIds) => {
    try {
      let headers = {
        'Content-Type': 'application/json'
      };
      const token = localStorage.getItem('token');
      
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
      
      const response = await fetch('/api/notifications', {
        method: 'DELETE',
        headers,
        credentials: 'include',
        body: JSON.stringify({ notificationIds })
      });

      if (response.ok) {
        fetchNotifications();
      }
    } catch (error) {
      console.error('Error deleting notifications:', error);
    }
  };

  const cleanupNotifications = async () => {
    try {
      let headers = {};
      const token = localStorage.getItem('token');
      
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
      
      await fetch('/api/notifications/cleanup', {
        method: 'POST',
        headers,
        credentials: 'include'
      });
    } catch (error) {
      console.error('Error cleaning up notifications:', error);
    }
  };

  const handleNotificationClick = (notification) => {
    // Mark as read
    if (!notification.isRead) {
      markAsRead([notification._id]);
    }

    // Navigate to the appropriate page
    if (notification.data?.actionUrl) {
      router.push(notification.data.actionUrl);
    } else {
      // Default navigation based on type
      switch (notification.type) {
        case 'message':
          router.push(`/chat?user=${notification.sender._id}`);
          break;
        case 'event_reminder':
        case 'event_invitation':
        case 'event_update':
          if (notification.data?.eventId) {
            router.push(`/events/${notification.data.eventId}`);
          }
          break;
        case 'follow':
          router.push(`/user-profile-other/${notification.sender._id}`);
          break;
        default:
          // No specific navigation
          break;
      }
    }
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'message': return '💬';
      case 'follow': return '👤';
      case 'like': return '❤️';
      case 'comment': return '💭';
      case 'event_reminder': return '⏰';
      case 'event_invitation': return '📅';
      case 'event_update': return '📝';
      case 'community_invitation': return '👥';
      case 'post_mention': return '📢';
      default: return '🔔';
    }
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now - date;
    
    if (diff < 60000) return 'Just now';
    if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
    if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`;
    if (diff < 604800000) return `${Math.floor(diff / 86400000)}d ago`;
    return date.toLocaleDateString();
  };

  if (loading) {
    return (
      <>
        <Head>
          <title>Notifications - ConnectHub</title>
        </Head>
        <Navbar isLoggedIn={true} />
        <main className={styles.notificationsContainer}>
          <div className={styles.loadingContainer}>
            <p>Loading notifications...</p>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Notifications - ConnectHub</title>
      </Head>

      <Navbar isLoggedIn={true} />

      <main className={styles.notificationsContainer}>
        <div className={styles.contentWrapper}>
          <div className={styles.header}>
            <h1>Notifications {unreadCount > 0 && <span className={styles.unreadBadge}>{unreadCount}</span>}</h1>
            
            <div className={styles.headerActions}>
              {unreadCount > 0 && (
                <Button 
                  variant="secondary" 
                  size="small"
                  onClick={() => markAsRead([], true)}
                >
                  Mark All as Read
                </Button>
              )}
            </div>
          </div>

          <div className={styles.filters}>
            <button 
              className={`${styles.filterBtn} ${filter === 'all' ? styles.active : ''}`}
              onClick={() => setFilter('all')}
            >
              All
            </button>
            <button 
              className={`${styles.filterBtn} ${filter === 'unread' ? styles.active : ''}`}
              onClick={() => setFilter('unread')}
            >
              Unread
            </button>
            <button 
              className={`${styles.filterBtn} ${filter === 'message' ? styles.active : ''}`}
              onClick={() => setFilter('message')}
            >
              Messages
            </button>
            <button 
              className={`${styles.filterBtn} ${filter === 'event_reminder' ? styles.active : ''}`}
              onClick={() => setFilter('event_reminder')}
            >
              Events
            </button>
          </div>

          <div className={styles.notificationsList}>
            {notifications.length === 0 ? (
              <div className={styles.emptyState}>
                <h3>No notifications</h3>
                <p>You're all caught up!</p>
              </div>
            ) : (
              notifications.map((notification) => (
                <div 
                  key={notification._id} 
                  className={`${styles.notificationCard} ${!notification.isRead ? styles.unread : ''}`}
                  onClick={() => handleNotificationClick(notification)}
                >
                  <div className={styles.notificationIcon}>
                    {getNotificationIcon(notification.type)}
                  </div>
                  
                  <div className={styles.notificationContent}>
                    <div className={styles.notificationHeader}>
                      <h3>{notification.title}</h3>
                      <span className={styles.notificationTime}>
                        {formatTime(notification.createdAt)}
                      </span>
                    </div>
                    
                    <p className={styles.notificationMessage}>{notification.message}</p>
                    
                    {notification.sender && (
                      <div className={styles.notificationSender}>
                        <img 
                          src={notification.sender.avatar || '/api/placeholder/32/32'} 
                          alt={notification.sender.fullName || notification.sender.fullname}
                          className={styles.senderAvatar}
                        />
                        <span>From {notification.sender.fullName || notification.sender.fullname}</span>
                      </div>
                    )}
                  </div>

                  <div className={styles.notificationActions}>
                    {!notification.isRead && (
                      <button
                        className={styles.markReadBtn}
                        onClick={(e) => {
                          e.stopPropagation();
                          markAsRead([notification._id]);
                        }}
                      >
                        ✓
                      </button>
                    )}
                    <button
                      className={styles.deleteBtn}
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteNotifications([notification._id]);
                      }}
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </main>
    </>
  );
}