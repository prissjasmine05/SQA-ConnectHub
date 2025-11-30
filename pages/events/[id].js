import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Button from '../../components/Button';

export default function EventDetailPage() {
  const router = useRouter();
  const { id } = router.query;
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [joiningEvent, setJoiningEvent] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (id) {
      fetchEventDetail();
    }
  }, [id]);

  const fetchEventDetail = async () => {
    try {
      // Check auth first
      const authRes = await fetch('/api/auth/me', { credentials: 'include' });
      if (authRes.ok) {
        const authData = await authRes.json();
        setUser(authData.user);
      }

      // Fetch event detail
      const res = await fetch(`/api/events/${id}`, {
        credentials: 'include'
      });

      if (res.ok) {
        const data = await res.json();
        setEvent(data.event);
      } else {
        router.push('/main-page/events');
      }
    } catch (error) {
      console.error('Failed to fetch event:', error);
      router.push('/main-page/events');
    } finally {
      setLoading(false);
    }
  };

  const handleJoinLeaveEvent = async () => {
    if (!user || joiningEvent) return;

    setJoiningEvent(true);

    try {
      const method = event.isUserJoined ? 'DELETE' : 'POST';
      const res = await fetch(`/api/events/${id}/join`, {
        method,
        credentials: 'include'
      });

      const data = await res.json();

      if (res.ok) {
        // Refresh event data
        await fetchEventDetail();
        
        if (method === 'DELETE') {
          alert('Successfully left the event');
        } else if (data.status === 'waitlisted') {
          alert('You have been added to the waitlist!');
        } else {
          alert('Successfully joined the event!');
        }
      } else {
        alert(data.message || 'Action failed');
      }
    } catch (error) {
      console.error('Join/Leave event error:', error);
      alert('Action failed. Please try again.');
    } finally {
      setJoiningEvent(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return {
      date: date.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }),
      time: date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit'
      })
    };
  };

  if (loading) {
    return (
      <>
        <Head>
          <title>Loading Event - ConnectHub</title>
        </Head>
        <Navbar isLoggedIn={!!user} />
        <div style={styles.container}>
          <div style={styles.loading}>Loading event details...</div>
        </div>
      </>
    );
  }

  if (!event) {
    return (
      <>
        <Head>
          <title>Event Not Found - ConnectHub</title>
        </Head>
        <Navbar isLoggedIn={!!user} />
        <div style={styles.container}>
          <div style={styles.notFound}>Event not found</div>
        </div>
      </>
    );
  }

  const startDateTime = formatDate(event.dateTime.start);
  const endDateTime = formatDate(event.dateTime.end);
  const isEventPast = new Date(event.dateTime.start) < new Date();

  return (
    <>
      <Head>
        <title>{event.title} - ConnectHub</title>
      </Head>

      <Navbar isLoggedIn={!!user} />

      <div style={styles.container}>
        <div style={styles.content}>
          {/* Header */}
          <div style={styles.header}>
            <Link href="/main-page/events" style={styles.backLink}>
              ← Back to Events
            </Link>
          </div>

          {/* Event Banner */}
          {event.image && (
            <div style={styles.bannerContainer}>
              <img src={event.image} alt={event.title} style={styles.banner} />
            </div>
          )}

          {/* Event Info */}
          <div style={styles.eventInfo}>
            <div style={styles.eventMeta}>
              <span style={styles.community}>
                {event.community?.name || event.organizer?.fullName || 'Community Event'}
              </span>
              <div style={styles.eventTags}>
                {event.tags.map((tag, index) => (
                  <span key={index} style={styles.tag}>{tag}</span>
                ))}
              </div>
            </div>

            <h1 style={styles.title}>{event.title}</h1>
            <p style={styles.description}>{event.description}</p>

            {/* Event Details Grid */}
            <div style={styles.detailsGrid}>
              <div style={styles.detailItem}>
                <strong>📅 Date & Time</strong>
                <div>{startDateTime.date}</div>
                <div>{startDateTime.time} - {endDateTime.time}</div>
              </div>

              <div style={styles.detailItem}>
                <strong>📍 Location</strong>
                <div>
                  {event.location.type === 'online' ? (
                    <>
                      <div>Online Event</div>
                      {event.location.meetingLink && (
                        <a href={event.location.meetingLink} target="_blank" rel="noopener noreferrer" style={styles.meetingLink}>
                          Join Meeting
                        </a>
                      )}
                    </>
                  ) : (
                    <>
                      <div>{event.location.address}</div>
                      <div>{event.location.city}</div>
                    </>
                  )}
                </div>
              </div>

              <div style={styles.detailItem}>
                <strong>👥 Participants</strong>
                <div>{event.participantCount} joined</div>
                {event.capacity && <div>Max: {event.capacity}</div>}
                {event.waitlistCount > 0 && <div>{event.waitlistCount} waitlisted</div>}
              </div>

              {event.price > 0 && (
                <div style={styles.detailItem}>
                  <strong>💰 Price</strong>
                  <div>{event.currency} {event.price?.toLocaleString()}</div>
                </div>
              )}

              <div style={styles.detailItem}>
                <strong>👤 Organizer</strong>
                <div>{event.organizer?.fullName}</div>
                <div>@{event.organizer?.username}</div>
              </div>
            </div>

            {/* Action Buttons */}
            {user && !isEventPast && (
              <div style={styles.actions}>
                <Button
                  variant={event.isUserJoined ? "secondary" : "primary"}
                  size="large"
                  onClick={handleJoinLeaveEvent}
                  disabled={joiningEvent}
                  style={styles.joinButton}
                >
                  {joiningEvent ? 'Processing...' : 
                   event.isUserJoined ? 
                     (event.userStatus === 'waitlisted' ? 'Leave Waitlist' : 'Leave Event') : 
                     'Join Event'}
                </Button>

                {event.isUserJoined && event.userStatus === 'waitlisted' && (
                  <div style={styles.waitlistNote}>
                    You are on the waitlist. You'll be notified if a spot becomes available.
                  </div>
                )}
              </div>
            )}

            {isEventPast && (
              <div style={styles.pastEventNote}>
                This event has already ended.
              </div>
            )}

            {!user && (
              <div style={styles.loginPrompt}>
                <Link href="/create-acc">
                  <Button variant="primary" size="large">
                    Login to Join Event
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

const styles = {
  container: {
    minHeight: 'calc(100vh - 60px)',
    backgroundColor: '#F0F0FF',
    padding: '20px',
  },
  content: {
    maxWidth: '800px',
    margin: '0 auto',
    backgroundColor: 'white',
    borderRadius: '12px',
    overflow: 'hidden',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
  },
  loading: {
    textAlign: 'center',
    padding: '60px',
    fontSize: '18px',
    color: '#6B7280',
  },
  notFound: {
    textAlign: 'center',
    padding: '60px',
    fontSize: '18px',
    color: '#6B7280',
  },
  header: {
    padding: '20px 24px',
    borderBottom: '1px solid #E5E7EB',
  },
  backLink: {
    color: '#7C5CDB',
    textDecoration: 'none',
    fontSize: '14px',
    fontWeight: 500,
  },
  bannerContainer: {
    width: '100%',
    height: '300px',
    overflow: 'hidden',
  },
  banner: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  eventInfo: {
    padding: '32px 24px',
  },
  eventMeta: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '16px',
  },
  community: {
    fontSize: '14px',
    color: '#7C5CDB',
    fontWeight: 600,
    backgroundColor: '#F3F0FF',
    padding: '4px 12px',
    borderRadius: '20px',
  },
  eventTags: {
    display: 'flex',
    gap: '8px',
  },
  tag: {
    fontSize: '12px',
    color: '#6B7280',
    backgroundColor: '#F3F4F6',
    padding: '4px 8px',
    borderRadius: '12px',
  },
  title: {
    fontSize: '32px',
    fontWeight: 700,
    color: '#1F2937',
    marginBottom: '16px',
    lineHeight: 1.2,
  },
  description: {
    fontSize: '16px',
    color: '#4B5563',
    lineHeight: 1.6,
    marginBottom: '32px',
  },
  detailsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '24px',
    marginBottom: '32px',
  },
  detailItem: {
    padding: '16px',
    backgroundColor: '#F9FAFB',
    borderRadius: '8px',
    fontSize: '14px',
    lineHeight: 1.5,
  },
  meetingLink: {
    color: '#7C5CDB',
    textDecoration: 'none',
    fontWeight: 500,
  },
  actions: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '16px',
  },
  joinButton: {
    minWidth: '200px',
  },
  waitlistNote: {
    fontSize: '14px',
    color: '#D97706',
    backgroundColor: '#FEF3C7',
    padding: '8px 16px',
    borderRadius: '6px',
    textAlign: 'center',
  },
  pastEventNote: {
    fontSize: '16px',
    color: '#6B7280',
    backgroundColor: '#F3F4F6',
    padding: '16px',
    borderRadius: '8px',
    textAlign: 'center',
  },
  loginPrompt: {
    textAlign: 'center',
  },
};
