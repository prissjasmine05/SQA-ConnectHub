import Head from 'next/head';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Button from '../../components/Button';
import styles from './Events.module.css';

export default function EventsPage() {
  const events = [
    {
      id: 1,
      community: 'Wellness Circle',
      title: 'Pilates for Strength and Balance',
      description: 'Join our pilates session designed to improve flexibility, build core strength, and bring calm to your daily routine. Perfect for all skill levels.',
      image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600'
    },
    {
      id: 2,
      community: 'Culinary Explorers',
      title: 'Cooking Workshop: Flavors of the World',
      description: 'Discover new techniques and recipes from around the globe. Learn to cook delicious meals and share the experience with fellow food lovers.',
      image: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=600'
    },
    {
      id: 3,
      community: 'Creative Minds',
      title: 'Art & Expression Workshop',
      description: 'Unleash your creativity through painting, sketching, and mixed media. Explore different art forms, express your ideas, and connect with other creators.',
      image: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=600'
    },
    {
      id: 4,
      community: 'Photography Group',
      title: 'Urban Photography Walk',
      description: 'Capture the essence of the city with our urban photography walk. Explore hidden gems and practice your photography skills.',
      image: 'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=600'
    },
    {
      id: 5,
      community: 'Film Buffs',
      title: 'Movie Night: Classic Cinema',
      description: 'Enjoy a screening of timeless classics with fellow enthusiasts. Share thoughts, favorite scenes, and dive into the magic of cinema.',
      image: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=600'
    }
  ];

  return (
    <>
      <Head>
        <title>Upcoming Events - ConnectHub</title>
      </Head>

      <Navbar isLoggedIn={true} />

      <main className={styles.mainContainer}>
        <div className={styles.contentWrapper}>
          <div className={styles.eventsHeader}>
            <h1>Upcoming Events</h1>
            <div className={styles.tabs}>
              <Link href="/main-page">
                <button>For you</button>
              </Link>
              <Link href="/main-page/following">
                <button>Following</button>
              </Link>
              <Link href="/main-page/events">
                <button className={styles.activeTab}>Events</button>
              </Link>
            </div>
          </div>

          <div className={styles.eventsList}>
            {events.map((event) => (
              <div key={event.id} className={styles.eventCard}>
                <div className={styles.eventInfo}>
                  <span className={styles.eventCommunity}>{event.community}</span>
                  <h3>{event.title}</h3>
                  <p>{event.description}</p>
                  <Button variant="primary" size="small">Join Event</Button>
                </div>
                <div className={styles.eventImage}>
                  <img src={event.image} alt={event.title} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}