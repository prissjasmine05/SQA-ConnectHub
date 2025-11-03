'use client';

import { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import styles from './profile.module.css';

export default function Profile() {
  const [joined, setJoined] = useState(false);
  const [posts, setPosts] = useState([
    {
      id: 1,
      author: 'Eco Warriors',
      category: 'Sustainable Living',
      title: 'Exploring the Latest in Sustainable Living',
      description: 'Discover innovative ways to reduce your carbon footprint and live a more eco-friendly lifestyle. From renewable energy solutions to zero-waste tips, join the conversation and share your ideas.',
      likes: 1200,
      comments: 345,
      shares: 189,
      timestamp: '7 hours ago',
      liked: false,
      image: "data:image/svg+xml,%3Csvg width='180' height='140' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='180' height='140' fill='%2322c55e'/%3E%3Cpath d='M60,80 Q60,40 90,40 Q120,40 120,80 Q120,100 90,120 Q60,100 60,80 Z' fill='%2316a34a'/%3E%3Cellipse cx='90' cy='30' rx='15' ry='20' fill='%2316a34a'/%3E%3C/svg%3E"
    },
    {
      id: 2,
      author: 'Green Thumbs',
      category: 'Urban Gardening',
      title: 'The Art of Urban Gardening',
      description: 'Transform your city space into a green oasis. Learn about vertical gardening, container planting, and the best crops for urban environments. Share your gardening successes and challenges.',
      likes: 876,
      comments: 123,
      shares: 98,
      timestamp: '5 hours ago',
      liked: false,
      image: "data:image/svg+xml,%3Csvg width='180' height='140' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='180' height='140' fill='%23166534'/%3E%3Crect x='20' y='100' width='25' height='40' rx='3' fill='%23422006'/%3E%3Crect x='55' y='100' width='25' height='40' rx='3' fill='%23422006'/%3E%3Crect x='90' y='100' width='25' height='40' rx='3' fill='%23422006'/%3E%3Crect x='125' y='100' width='25' height='40' rx='3' fill='%23422006'/%3E%3Cellipse cx='32.5' cy='95' rx='15' ry='8' fill='%2322c55e'/%3E%3Cellipse cx='67.5' cy='95' rx='15' ry='8' fill='%2322c55e'/%3E%3Cellipse cx='102.5' cy='95' rx='15' ry='8' fill='%2322c55e'/%3E%3Cellipse cx='137.5' cy='95' rx='15' ry='8' fill='%2322c55e'/%3E%3C/svg%3E"
    },
    {
      id: 3,
      author: 'Zen Finders',
      category: 'Mindfulness',
      title: 'Mindfulness and Meditation for Daily Life',
      description: 'Find your inner peace with guided meditation techniques and mindfulness practices. Discuss the benefits of meditation, share your favorite apps, and support each other on your wellness journey.',
      likes: 2500,
      comments: 567,
      shares: 321,
      timestamp: 'Yesterday',
      liked: false,
      image: "data:image/svg+xml,%3Csvg width='180' height='140' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='180' height='140' fill='%23fef3c7'/%3E%3Cellipse cx='90' cy='80' rx='25' ry='30' fill='%23f5e6d3'/%3E%3Ccircle cx='90' cy='65' r='12' fill='%23e8d4b8'/%3E%3Cpath d='M75,85 L65,100 L75,95 Z' fill='%23f5e6d3'/%3E%3Cpath d='M105,85 L115,100 L105,95 Z' fill='%23f5e6d3'/%3E%3Cpath d='M75,110 L70,125 L75,120 Z' fill='%23f5e6d3'/%3E%3Cpath d='M105,110 L110,125 L105,120 Z' fill='%23f5e6d3'/%3E%3C/svg%3E"
    }
  ]);

  const handleJoinClick = () => {
    setJoined(!joined);
  };

  const handleLike = (postId) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, liked: !post.liked, likes: post.liked ? post.likes - 1 : post.likes + 1 }
        : post
    ));
  };

  return (
    <>
      <Navbar isLoggedIn={true} />
      <div className={styles.container}>
        {/* Community Header */}
        <div className={styles.communityHeader}>
          <div className={styles.communityAvatar}>
            <div className={styles.avatarIcon}></div>
          </div>
          <h1 className={styles.communityTitle}>Tech Enthusiasts Community</h1>
          <p className={styles.communityDescription}>
            A vibrant community for tech lovers to discuss the latest trends, gadgets, and innovations. Join us to share your insights and connect with fellow enthusiasts.
          </p>
          <p className={styles.communityStats}>12K members · Public group</p>
          <button 
            className={`${styles.joinButton} ${joined ? styles.joined : ''}`}
            onClick={handleJoinClick}
          >
            {joined ? 'Joined ✓' : 'Join'}
          </button>
        </div>

        {/* Tabs */}
        <div className={styles.tabs}>
          <Link href="/community-profile-user-pov" className={`${styles.tab} ${styles.active}`}>
            Posts
          </Link>
          <Link href="/community-profile-user-pov/members" className={styles.tab}>
            Members
          </Link>
          <Link href="/community-profile-user-pov/events" className={styles.tab}>
            Events
          </Link>
          <Link href="/community-profile-user-pov/about" className={styles.tab}>
            About
          </Link>
        </div>

        {/* Posts Feed */}
        <div className={styles.postsFeed}>
          {posts.map((post) => (
            <div key={post.id} className={styles.postCard}>
              <div className={styles.postHeader}>
                <div className={styles.postAvatar}></div>
                <div className={styles.postInfo}>
                  <h3>{post.author}</h3>
                  <p>in {post.category}</p>
                </div>
              </div>
              <div className={styles.postContent}>
                <div className={styles.postText}>
                  <h2>{post.title}</h2>
                  <p>{post.description}</p>
                </div>
                <img src={post.image} alt={post.title} className={styles.postImage} />
              </div>
              <div className={styles.postActions}>
                <button 
                  className={`${styles.actionButton} ${post.liked ? styles.liked : ''}`}
                  onClick={() => handleLike(post.id)}
                >
                  <span className={styles.iconHeart}>{post.liked ? '♥' : '♡'}</span>
                  <span>{post.likes}</span>
                </button>
                <button className={styles.actionButton}>
                  <span className={styles.iconComment}>💬</span>
                  <span>{post.comments}</span>
                </button>
                <button className={styles.actionButton}>
                  <span className={styles.iconShare}>↗</span>
                  <span>{post.shares}</span>
                </button>
                <span className={styles.postTimestamp}>{post.timestamp}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}