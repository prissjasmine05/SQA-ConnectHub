import Head from 'next/head';
import Navbar from '../../components/Navbar';
import styles from './Explore.module.css';
import mainStyles from './MainPage.module.css';

export default function ExplorePage() {
  const communities = [
    { id: 1, name: 'Tech Enthusiasts', members: '130K', image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400' },
    { id: 2, name: 'Book Lovers', members: '85K', image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400' },
    { id: 3, name: 'Fitness Fanatics', members: '150K', image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400' },
    { id: 4, name: 'Travel Explorers', members: '95K', image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400' },
    { id: 5, name: 'Foodies', members: '110K', image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400' }
  ];

  const trendingGroups = [
    { id: 1, name: 'AI & Machine Learning', members: '50K', image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400' },
    { id: 2, name: 'Sustainable Living', members: '40K', image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=400' },
    { id: 3, name: 'Indie Game Development', members: '35K', image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400' },
    { id: 4, name: 'Urban Photography', members: '45K', image: 'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=400' },
    { id: 5, name: 'Minimalist Fashion', members: '55K', image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=400' }
  ];

  const topics = [
    { id: 1, name: 'Technology', color: '#FFC0CB', icon: '💻' },
    { id: 2, name: 'Books', color: '#C3F0CA', icon: '📚' },
    { id: 3, name: 'Fitness', color: '#B3E0F2', icon: '💪' },
    { id: 4, name: 'Travel', color: '#FFE4B5', icon: '✈️' },
    { id: 5, name: 'Food', color: '#FFD4A3', icon: '🍽️' },
    { id: 6, name: 'Fashion', color: '#E8D4F8', icon: '👔' }
  ];

  return (
    <>
      <Head>
        <title>Explore - ConnectHub</title>
      </Head>

      <Navbar isLoggedIn={true} />

      <main className={mainStyles.mainContainer}>
        <div className={mainStyles.contentWrapper}>
          <div className={styles.searchBar}>
            <span className={styles.searchIcon}>🔍</span>
            <input type="text" placeholder="Search interests" />
          </div>

          <section className={styles.exploreSection}>
            <h2>Communities</h2>
            <div className={styles.communityGrid}>
              {communities.map((community) => (
                <div key={community.id} className={styles.communityCard}>
                  <img src={community.image} alt={community.name} />
                  <div className={styles.communityInfo}>
                    <h4>{community.name}</h4>
                    <span>{community.members} members</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className={styles.exploreSection}>
            <h2>Trending Groups</h2>
            <div className={styles.trendingGrid}>
              {trendingGroups.map((group) => (
                <div key={group.id} className={styles.trendingCard}>
                  <img src={group.image} alt={group.name} />
                  <div className={styles.trendingInfo}>
                    <h4>{group.name}</h4>
                    <span>{group.members} members</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className={styles.exploreSection}>
            <h2>Trending Topics</h2>
            <div className={styles.topicsGrid}>
              {topics.map((topic) => (
                <button 
                  key={topic.id} 
                  className={styles.topicCard}
                  style={{ backgroundColor: topic.color }}
                >
                  <span className={styles.topicIcon}>{topic.icon}</span>
                  <span className={styles.topicName}>{topic.name}</span>
                </button>
              ))}
            </div>
          </section>
        </div>
      </main>
    </>
  );
}