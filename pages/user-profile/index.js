'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Navbar from '@/components/Navbar';
import styles from './user-profile.module.css';

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const res = await fetch('/api/auth/me', {
        credentials: 'include'
      });

      if (!res.ok) {
        // Not authenticated, redirect to login
        router.push('/create-acc');
        return;
      }

      const data = await res.json();
      setUser(data.user);
    } catch (error) {
      console.error('Error fetching profile:', error);
      router.push('/create-acc');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    if (!confirm('Are you sure you want to logout?')) return;

    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include'
      });
      router.push('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  // Show loading state
  if (loading) {
    return (
      <div className={styles.mainContainer}>
        <Navbar isLoggedIn={false} variant="default" />
        <div className={styles.loadingContainer}>
          <p>Loading profile...</p>
        </div>
      </div>
    );
  }

  // Don't render if no user
  if (!user) {
    return null;
  }

  return (
    <div className={styles.mainContainer}>
      <Navbar isLoggedIn={true} variant="default" />

      <div className={styles.contentWrapper}>
        {/* Profile Card */}
        <div className={styles.profileCard}>
          <div className={styles.profileHeader}>
            <div className={styles.profileInfo}>
              <div className={styles.profileImageWrapper}>
                <img
                  src={user.avatar || '/api/placeholder/120/120'}
                  alt={user.fullname}
                  className={styles.profileImage}
                />
              </div>
              <h1 className={styles.profileName}>{user.fullname || 'User'}</h1>
              <p className={styles.profileBio}>
                {user.bio ||
                  'Tech enthusiast, avid reader, and aspiring chef. Always up for a good debate or a new adventure.'}
              </p>
              <p className={styles.profileJoined}>
                Joined in {user.createdAt ? new Date(user.createdAt).getFullYear() : new Date().getFullYear()}
              </p>

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
                <button
                  onClick={handleLogout}
                  className={styles.actionBtn}
                  style={{ backgroundColor: '#ef4444', color: 'white' }}
                >
                  Logout
                </button>
              </div>
            </div>
          </div>

          <div className={styles.interestsSection}>
            <h2 className={styles.interestsTitle}>Interests</h2>
            <div className={styles.interestsList}>
              {user.interests && user.interests.length > 0 ? (
                user.interests.map((interest, index) => {
                  // Create a class name based on the interest
                  const interestClass = `interest${interest.replace(/\s+/g, '')}`;
                  return (
                    <span
                      key={index}
                      className={`${styles.interestBadge} ${styles[interestClass] || ''}`}
                    >
                      {interest}
                    </span>
                  );
                })
              ) : (
                <>
                  <span className={`${styles.interestBadge} ${styles.interestCooking}`}>
                    Cooking
                  </span>
                  <span className={`${styles.interestBadge} ${styles.interestBadminton}`}>
                    Badminton
                  </span>
                  <span className={`${styles.interestBadge} ${styles.interestTravel}`}>
                    Travel
                  </span>
                </>
              )}
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
              Working out isn't just about building muscles — it's about discipline,
              energy, and confidence. From weightlifting to simple home workouts,
              discover routines that can fit into any lifestyle.
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
              Art is not only about painting or drawing — it's a way to express
              feelings and ideas. From digital designs to simple doodles, explore
              creativity that inspires and connects.
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
            <h3 className={styles.postTitle}>
              Mindfulness and Meditation for Daily Life
            </h3>
            <p className={styles.postDescription}>
              Find your inner peace with guided meditation techniques and mindfulness
              practices. Discuss the benefits of meditation, share your favorite apps,
              and support each other on your wellness journey.
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