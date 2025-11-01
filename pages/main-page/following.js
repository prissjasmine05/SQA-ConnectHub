import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import styles from './MainPage.module.css';

export default function FollowingPage() {
  const posts = [
    {
      id: 1,
      community: 'Fitness',
      handle: '@GymNation',
      category: 'in GymNation',
      title: 'Finding Strength Through Fitness',
      content: 'Working out isn\'t just about building muscles — it\'s about discipline, energy, and confidence. From weightlifting to simple home workouts, discover routines that can fit into any lifestyle.',
      image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800',
      likes: '1.2k',
      comments: '345',
      shares: '189',
      timeAgo: '2 hours ago'
    },
    {
      id: 2,
      community: 'Art & Creativity',
      handle: '@GlobalArt',
      category: 'in Global Art',
      title: 'Unlocking Your Creative Side',
      content: 'Art is not only about painting or drawing — it\'s a way to express feelings and ideas. From digital design to simple doodles, explore creativity that inspires and connects.',
      image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800',
      likes: '876',
      comments: '123',
      shares: '98',
      timeAgo: '5 hours ago'
    },
    {
      id: 3,
      community: 'Zen Finders',
      handle: '@Mindfulness',
      category: 'in Mindfulness',
      title: 'Mindfulness and Meditation for Daily Life',
      content: 'Find your inner peace with guided meditation techniques and mindfulness practices. Discuss the benefits of meditation, share your favorite apps, and support each other on your wellness journey.',
      image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800',
      likes: '2.5k',
      comments: '567',
      shares: '321',
      timeAgo: 'Yesterday'
    }
  ];

  return (
    <>
      <Head>
        <title>Following Page - ConnectHub</title>
      </Head>

      <Navbar isLoggedIn={true} />

      <main className={styles.mainContainer}>
        <div className={styles.contentWrapper}>
          <div className={styles.feedHeader}>
            <h1>Following Page</h1>
            <div className={styles.tabs}>
              <Link href="/main-page">
                <button>For you</button>
              </Link>
              <Link href="/main-page/following">
                <button className={styles.activeTab}>Following</button>
              </Link>
              <Link href="/main-page/events">
                <button>Events</button>
              </Link>
            </div>
          </div>

          <div className={styles.feedPosts}>
            {posts.map((post) => (
              <article key={post.id} className={styles.postCardHorizontal}>
                <div className={styles.postHeader}>
                  <div className={styles.postAuthor}>
                    <div className={styles.authorAvatar}>
                      <img src={`https://i.pravatar.cc/150?img=${post.id}`} alt={post.community} />
                    </div>
                    <div className={styles.authorInfo}>
                      <h3>{post.community}</h3>
                      <span>{post.category}</span>
                    </div>
                  </div>
                  {post.timeAgo && <span className={styles.timeAgo}>{post.timeAgo}</span>}
                </div>

                <div className={styles.horizontalContent}>
                  <div className={styles.horizontalText}>
                    <h2 className={styles.postTitle}>{post.title}</h2>
                    <p className={styles.postContent}>{post.content}</p>
                  </div>
                  <div className={styles.horizontalImage}>
                    <img src={post.image} alt={post.title} />
                  </div>
                </div>

                <div className={styles.postActions}>
                  <button className={styles.actionBtn}>
                    <span>❤️</span> {post.likes}
                  </button>
                  <button className={styles.actionBtn}>
                    <span>💬</span> {post.comments}
                  </button>
                  <button className={styles.actionBtn}>
                    <span>🔗</span> {post.shares}
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}