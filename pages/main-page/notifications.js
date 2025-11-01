import Head from 'next/head';
import Navbar from '../../components/Navbar';
import Button from '../../components/Button';
import styles from './Notifications.module.css';

export default function Notifications() {
  const notifications = [
    {
      id: 1,
      type: 'event',
      title: 'Tech Conference 2024',
      description: 'Date & Time: July 15, 2024, 2:00 PM',
      community: 'Community: Tech Innovators',
      action: 'rsvp'
    },
    {
      id: 2,
      type: 'event',
      title: 'Book Club Meeting: \'The Silent Observer\'',
      description: 'Date & Time: July 20, 2024, 6:00 PM',
      community: 'Community: Bookworms Unite',
      action: 'rsvp'
    },
    {
      id: 3,
      type: 'post',
      title: 'New Post from Travel Enthusiasts',
      description: 'Post: Top 5 Hidden Gems in Europe',
      community: 'Community: Travel Enthusiasts',
      action: 'view'
    },
    {
      id: 4,
      type: 'post',
      title: 'New Recipe from Foodie Adventures',
      description: 'Post: Recipe for Summer Berry Tart',
      community: 'Community: Foodie Adventures',
      action: 'view'
    }
  ];

  return (
    <>
      <Head>
        <title>Notifications - ConnectHub</title>
      </Head>

      <Navbar isLoggedIn={true} />

      <main className={styles.notificationsContainer}>
        <div className={styles.contentWrapper}>
          <div className={styles.header}>
            <h1>Notifications</h1>
          </div>

          <div className={styles.notificationsList}>
            {notifications.map((notification) => (
              <div key={notification.id} className={styles.notificationCard}>
                <div className={styles.notificationContent}>
                  <h3>{notification.title}</h3>
                  <p className={styles.description}>{notification.description}</p>
                  <p className={styles.community}>{notification.community}</p>

                  <div className={styles.notificationActions}>
                    {notification.action === 'rsvp' ? (
                      <>
                        <Button variant="secondary" size="small">RSVP Now</Button>
                        <Button variant="primary" size="small">View Event Details</Button>
                      </>
                    ) : (
                      <>
                        <Button variant="secondary" size="small">Mark as Read</Button>
                        <Button variant="primary" size="small">View Post</Button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}