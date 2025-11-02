'use client';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import styles from './user-profile.module.css';

export default function ProfilePage() {
  const router = useRouter();

  return (
    <div className={styles.mainContainer}>
      {/* Navbar Component */}
      <Navbar isLoggedIn={true} variant="default" />

      {/* Content */}
      <div className={styles.contentWrapper}>
        {/* Profile Card */}
        <div className={styles.profileCard}>
          <div className={styles.profileHeader}>
            <div className={styles.profileInfo}>
              <div className={styles.profileImageWrapper}>
                <img 
                  src="/api/placeholder/120/120" 
                  alt="Sophia Bennett" 
                  className={styles.profileImage}
                />
              </div>
              <h1 className={styles.profileName}>Sophia Bennett</h1>
              <p className={styles.profileBio}>
                Tech enthusiast, avid reader, and aspiring chef. Always up for a good debate or a new adventure.
              </p>
              <p className={styles.profileJoined}>Joined in 2021</p>
              
              <div className={styles.profileActions}>
                <button className={styles.iconBtn}>
                  <span className={styles.trophyIcon}>🏆</span>
                </button>
                <button 
                  onClick={() => router.push('/user-profile/editprofile')}
                  className={styles.actionBtn}
                >
                  Edit Profile
                </button>
                <button 
                  onClick={() => router.push('/user-profile/mypoints')}
                  className={styles.actionBtn}
                >
                  My Points
                </button>
                <button 
                  onClick={() => router.push('/user-profile/settings')}
                  className={styles.iconBtn}
                >
                  ⚙️
                </button>
              </div>
            </div>
          </div>

          <div className={styles.interestsSection}>
            <h2 className={styles.interestsTitle}>Interests</h2>
            <div className={styles.interestsList}>
              <span className={`${styles.interestBadge} ${styles.interestCooking}`}>Cooking</span>
              <span className={`${styles.interestBadge} ${styles.interestBadminton}`}>Badminton</span>
              <span className={`${styles.interestBadge} ${styles.interestTravel}`}>Travel</span>
              <span className={`${styles.interestBadge} ${styles.interestPadel}`}>Padel</span>
              <span className={`${styles.interestBadge} ${styles.interestHiking}`}>Hiking</span>
              <span className={`${styles.interestBadge} ${styles.interestPhotography}`}>Photography</span>
            </div>
          </div>
        </div>

        {/* Posts Feed */}
        <div className={styles.postsFeed}>
          {/* Post 1 - Fitness */}
          <article className={styles.postCard}>
            <div className={styles.postHeader}>
              <div className={`${styles.postAvatar} ${styles.avatarFitness}`}>F</div>
              <div className={styles.postMeta}>
                <div className={styles.postCommunity}>
                  <span className={styles.communityName}>Fitness</span>
                  <span className={styles.communityGroup}>in GymNation</span>
                </div>
              </div>
            </div>
            <h3 className={styles.postTitle}>Finding Strength Through Fitness</h3>
            <p className={styles.postDescription}>
              Working out isn't just about building muscles — it's about discipline, energy, and confidence. From weightlifting to simple home workouts, discover routines that can fit into any lifestyle.
            </p>
            <div className={styles.postImageWrapper}>
              <img 
                src="/api/placeholder/800/400" 
                alt="Fitness" 
                className={styles.postImage}
              />
            </div>
            <div className={styles.postActions}>
              <button className={styles.actionButton}>
                <span>❤️</span>
                <span>1.2k</span>
              </button>
              <button className={styles.actionButton}>
                <span>💬</span>
                <span>345</span>
              </button>
              <button className={styles.actionButton}>
                <span>🔗</span>
                <span>189</span>
              </button>
              <span className={styles.postTime}>2 hours ago</span>
            </div>
          </article>

          {/* Post 2 - Art & Creativity */}
          <article className={styles.postCard}>
            <div className={styles.postHeader}>
              <div className={`${styles.postAvatar} ${styles.avatarArt}`}>A</div>
              <div className={styles.postMeta}>
                <div className={styles.postCommunity}>
                  <span className={styles.communityName}>Art & Creativity</span>
                  <span className={styles.communityGroup}>in Global Art</span>
                </div>
              </div>
            </div>
            <h3 className={styles.postTitle}>Unlocking Your Creative Side</h3>
            <p className={styles.postDescription}>
              Art is not only about painting or drawing — it's a way to express feelings and ideas. From digital designs to simple doodles, explore creativity that inspires and connects.
            </p>
            <div className={styles.postImageWrapper}>
              <img 
                src="/api/placeholder/800/400" 
                alt="Art" 
                className={styles.postImage}
              />
            </div>
            <div className={styles.postActions}>
              <button className={styles.actionButton}>
                <span>❤️</span>
                <span>874</span>
              </button>
              <button className={styles.actionButton}>
                <span>💬</span>
                <span>123</span>
              </button>
              <button className={styles.actionButton}>
                <span>🔗</span>
                <span>98</span>
              </button>
              <span className={styles.postTime}>5 hours ago</span>
            </div>
          </article>

          {/* Post 3 - Zen Finders */}
          <article className={styles.postCard}>
            <div className={styles.postHeader}>
              <div className={`${styles.postAvatar} ${styles.avatarZen}`}>Z</div>
              <div className={styles.postMeta}>
                <div className={styles.postCommunity}>
                  <span className={styles.communityName}>Zen Finders</span>
                  <span className={styles.communityGroup}>in Mindfulness</span>
                </div>
              </div>
            </div>
            <h3 className={styles.postTitle}>Mindfulness and Meditation for Daily Life</h3>
            <p className={styles.postDescription}>
              Find your inner peace with guided meditation techniques and mindfulness practices. Discuss the benefits of meditation, share your favorite apps, and support each other on your wellness journey.
            </p>
            <div className={styles.postImageWrapper}>
              <img 
                src="/api/placeholder/800/400" 
                alt="Meditation" 
                className={styles.postImage}
              />
            </div>
            <div className={styles.postActions}>
              <button className={styles.actionButton}>
                <span>❤️</span>
                <span>2.5k</span>
              </button>
              <button className={styles.actionButton}>
                <span>💬</span>
                <span>567</span>
              </button>
              <button className={styles.actionButton}>
                <span>🔗</span>
                <span>321</span>
              </button>
              <span className={styles.postTime}>Yesterday</span>
            </div>
          </article>
        </div>
      </div>

      {/* Floating Action Button */}
      <button 
        onClick={() => router.push('/user-profile/createpost')}
        className={styles.fab}
      >
        +
      </button>
    </div>
  );
}