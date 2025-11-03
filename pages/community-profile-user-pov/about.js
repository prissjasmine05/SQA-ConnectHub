'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import styles from './about.module.css';

export default function About() {
  const router = useRouter();

  const memberAvatars = [
    'linear-gradient(135deg, #fde68a 0%, #fbbf24 100%)',
    'linear-gradient(135deg, #fecaca 0%, #f87171 100%)',
    'linear-gradient(135deg, #d1fae5 0%, #6ee7b7 100%)',
    'linear-gradient(135deg, #e9d5ff 0%, #c084fc 100%)',
    'linear-gradient(135deg, #bfdbfe 0%, #60a5fa 100%)'
  ];

  const handleAvatarClick = () => {
    router.push('/members');
  };

  return (
    <>
      <Navbar />
      <div className={styles.container}>
        {/* Community Header */}
        <div className={styles.communityHeader}>
          <h1 className={styles.communityTitle}>Tech Enthusiasts Community</h1>
          <p className={styles.communityDescription}>
            A vibrant community for tech lovers to discuss the latest trends, gadgets, and innovations. Join us to share your insights and connect with fellow enthusiasts.
          </p>
        </div>

        {/* Tabs */}
        <div className={styles.tabs}>
          <Link href="/community-profile-user-pov" className={styles.tab}>
            Posts
          </Link>
          <Link href="/community-profile-user-pov/members" className={styles.tab}>
            Members
          </Link>
          <Link href="/community-profile-user-pov/events" className={styles.tab}>
            Events
          </Link>
          <Link href="/community-profile-user-pov/about" className={`${styles.tab} ${styles.active}`}>
            About
          </Link>
        </div>

        {/* Community Rules Section */}
        <div className={styles.aboutSection}>
          <h2>Community Rules</h2>
          <ul className={styles.rulesList}>
            <li>Be respectful and considerate of others' opinions.</li>
            <li>Keep discussions relevant to technology and related topics.</li>
            <li>No spamming or self-promotion without prior approval from admins.</li>
          </ul>
        </div>

        {/* Members Section */}
        <div className={styles.aboutSection}>
          <h2 className={styles.membersCount}>Members (1,234)</h2>
          <div className={styles.membersPreview}>
            {memberAvatars.map((gradient, index) => (
              <div
                key={index}
                className="memberAvatar"
                style={{ 
                  background: gradient,
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  cursor: 'pointer',
                  transition: 'transform 0.3s ease'
                }}
                onClick={handleAvatarClick}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.15)';
                  e.currentTarget.style.zIndex = '10';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.zIndex = '1';
                }}
              ></div>
            ))}
          </div>
        </div>

        {/* Community Overview Section */}
        <div className={styles.aboutSection}>
          <h2>Community Overview</h2>
          <ul className={styles.overviewList}>
            <li>Region: Jakarta & Surrounding Areas</li>
            <li>Age Range: 18 – 30 years old</li>
            <li>Who Can Join: Students, young professionals, and tech enthusiasts</li>
          </ul>
        </div>
      </div>
    </>
  );
}