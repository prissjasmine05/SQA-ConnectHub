import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Navbar from '../../components/Navbar';
import Button from '../../components/Button';
import styles from './Events.module.css';
import mainStyles from './MainPage.module.css';   

export default function EventsPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [events, setEvents] = useState([]);
  const [joiningEvent, setJoiningEvent] = useState(null);

  useEffect(() => {
    checkAuth();
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
        await fetchEvents();
      } else {
        router.push('/create-acc');
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      router.push('/create-acc');
    } finally {
      setLoading(false);
    }
  };

  const fetchEvents = async () => {
    try {
      const res = await fetch('/api/events?upcoming=true&limit=20', {
        credentials: 'include'
      });
      
      if (res.ok) {
        const data = await res.json();
        setEvents(data.events);
      }
    } catch (error) {
      console.error('Failed to fetch events:', error);
    }
  };

  const handleJoinEvent = async (eventId) => {
    if (joiningEvent) return;
    
    setJoiningEvent(eventId);
    
    try {
      const res = await fetch(`/api/events/${eventId}/join`, {
        method: 'POST',
        credentials: 'include'
      });
      
      const data = await res.json();
      
      if (res.ok) {
        // Refresh events to get updated join status
        await fetchEvents();
        
        if (data.status === 'waitlisted') {
          alert('You have been added to the waitlist!');
        } else {
          alert('Successfully joined the event!');
        }
      } else {
        alert(data.message || 'Failed to join event');
      }
    } catch (error) {
      console.error('Join event error:', error);
      alert('Failed to join event. Please try again.');
    } finally {
      setJoiningEvent(null);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <>
        <Head>
          <title>Upcoming Events - ConnectHub</title>
        </Head>
        <Navbar isLoggedIn={!!user} />
        <main className={mainStyles.mainContainer}>
          <div className={mainStyles.loadingContainer}>
            <p>Loading events...</p>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Upcoming Events - ConnectHub</title>
      </Head>

      <Navbar isLoggedIn={!!user} />

      <main className={mainStyles.mainContainer}>
        <div className={mainStyles.contentWrapper}>
          <div className={mainStyles.feedHeader}>
            <h1>Upcoming Events</h1>
            <div className={mainStyles.tabs}>   
              <Link href="/main-page">
                <button>For you</button>
              </Link>
              <Link href="/main-page/following">
                <button>Following</button>
              </Link>
              <Link href="/main-page/events">
                <button className={mainStyles.activeTab}>Events</button>
              </Link>
            </div>
            <button 
              onClick={() => window.location.href = '/create-event'}
              className={mainStyles.createPostBtn}
            >
              Create Event
            </button>
          </div>

          <div className={mainStyles.mainContent}>
            <div className={mainStyles.feedColumn}>
              <div className={styles.eventsList}>
                {events.length === 0 ? (
                  <div className={styles.noEvents}>
                    <p>No upcoming events found. Check back later!</p>
                  </div>
                ) : (
                  events.map((event) => (
                    <div key={event._id} className={styles.eventCard}>
                      <div className={styles.eventImage}>
                        <img 
                          src={event.image || 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600'} 
                          alt={event.title} 
                        />
                      </div>
                      <div className={styles.eventInfo}>
                        <div className={styles.eventMeta}>
                          <span className={styles.eventCommunity}>
                            {event.community?.name || event.organizer?.fullName || 'Community Event'}
                          </span>
                          <span className={styles.eventDate}>
                            {formatDate(event.dateTime.start)}
                          </span>
                        </div>
                        <Link href={`/events/${event._id}`}>
                          <h3 className={styles.eventTitle}>{event.title}</h3>
                        </Link>
                        <p>{event.description}</p>
                        
                        <div className={styles.eventDetails}>
                          <div className={styles.eventLocation}>
                            📍 {event.location.type === 'online' ? 'Online Event' : event.location.city || 'Physical Event'}
                          </div>
                          <div className={styles.eventCapacity}>
                            👥 {event.participantCount || 0} joined
                            {event.capacity && ` / ${event.capacity} max`}
                            {event.waitlistCount > 0 && ` (+${event.waitlistCount} waitlisted)`}
                          </div>
                          {event.price > 0 && (
                            <div className={styles.eventPrice}>
                              💰 {event.currency} {event.price?.toLocaleString()}
                            </div>
                          )}
                        </div>
                        
                        <Button 
                          variant="primary" 
                          size="small" 
                          className={styles.joinBtn}
                          onClick={() => handleJoinEvent(event._id)}
                          disabled={joiningEvent === event._id || event.isUserJoined}
                        >
                          {joiningEvent === event._id ? 'Joining...' : 
                           event.isUserJoined ? 
                             (event.userStatus === 'waitlisted' ? 'Waitlisted' : 'Joined') : 
                             'Join Event'}
                        </Button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className={mainStyles.sidebar}>
              <div className={mainStyles.suggestedUsers}>
                <h3>Event Categories</h3>
                <div className={styles.eventCategories}>
                  <div className={styles.categoryItem}>
                    <span className={styles.categoryEmoji}>🧘</span>
                    <span className={styles.categoryName}>Wellness</span>
                  </div>
                  <div className={styles.categoryItem}>
                    <span className={styles.categoryEmoji}>🍳</span>
                    <span className={styles.categoryName}>Culinary</span>
                  </div>
                  <div className={styles.categoryItem}>
                    <span className={styles.categoryEmoji}>🎨</span>
                    <span className={styles.categoryName}>Creative</span>
                  </div>
                  <div className={styles.categoryItem}>
                    <span className={styles.categoryEmoji}>📸</span>
                    <span className={styles.categoryName}>Photography</span>
                  </div>
                  <div className={styles.categoryItem}>
                    <span className={styles.categoryEmoji}>🎬</span>
                    <span className={styles.categoryName}>Entertainment</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}