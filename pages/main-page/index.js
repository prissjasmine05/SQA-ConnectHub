import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import styles from './MainPage.module.css';

export default function MainPage() {
  const [activeTab, setActiveTab] = useState('for-you');

  const posts = [
    {
      id: 1,
      community: 'Eco Warriors',
      handle: '@GreenLivingCo',
      category: 'in Sustainable Living',
      title: 'Exploring the Latest in Sustainable Living',
      content: 'Discover innovative ways to reduce your carbon footprint and live a more eco-friendly lifestyle. From renewable energy to zero-waste tips, join the conversation and share your ideas.',
      image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800',
      likes: '1.3k',
      comments: '342',
      shares: '189',
      timeAgo: '2 hours ago'
    },
    {
      id: 2,
      community: 'Go Padel',
      handle: '@PadelIndonesia',
      category: 'in Padel Indonesia',
      title: 'Discovering the Excitement of Padel',
      content: 'Experience the fun of padel, a unique mix of tennis and squash. With its fast-paced play and smaller court, padel is perfect for all skill levels.',
      image: 'https://images.unsplash.com/photo-1622163642998-1ea32b0bbc67?w=400',
      likes: '876',
      comments: '103',
      shares: '98',
      timeAgo: null
    },
    {
      id: 3,
      community: 'Go Padel',
      handle: '@PadelIndonesia',
      category: 'in Padel Indonesia',
      title: 'Discovering the Excitement of Padel',
      content: 'Experience the fun of padel, a unique mix of tennis and squash. With its fast-paced play and smaller court, padel is perfect for all skill levels.',
      image: 'https://images.unsplash.com/photo-1622163642998-1ea32b0bbc67?w=400',
      likes: '876',
      comments: '103',
      shares: '98',
      timeAgo: null
    }
  ];

  return (
    <>
      <Head>
        <title>For You Page - ConnectHub</title>
      </Head>

      <Navbar isLoggedIn={true} />

      <main className={styles.mainContainer}>
        <div className={styles.contentWrapper}>
          <div className={styles.feedHeader}>
            <h1>For You Page</h1>
            <div className={styles.tabs}>
              <Link href="/main-page">
                <button className={activeTab === 'for-you' ? styles.activeTab : ''}>
                  For you
                </button>
              </Link>
              <Link href="/main-page/following">
                <button className={activeTab === 'following' ? styles.activeTab : ''}>
                  Following
                </button>
              </Link>
              <Link href="/main-page/events">
                <button className={activeTab === 'events' ? styles.activeTab : ''}>
                  Events
                </button>
              </Link>
            </div>
          </div>

          <div className={styles.feedPosts}>
            {/* Large Post Card */}
            <article className={styles.postCardLarge}>
              <div className={styles.postHeader}>
                <div className={styles.postAuthor}>
                  <div className={styles.authorAvatar}>
                    <img src="https://i.pravatar.cc/150?img=1" alt="Eco Warriors" />
                  </div>
                  <div className={styles.authorInfo}>
                    <h3>{posts[0].community}</h3>
                    <span>{posts[0].category}</span>
                  </div>
                </div>
                {posts[0].timeAgo && <span className={styles.timeAgo}>{posts[0].timeAgo}</span>}
              </div>

              <h2 className={styles.postTitle}>{posts[0].title}</h2>
              <p className={styles.postContent}>{posts[0].content}</p>

              <div className={styles.postImage}>
                <img src={posts[0].image} alt={posts[0].title} />
              </div>

              <div className={styles.postActions}>
                <button className={styles.actionBtn}>
                  <span>❤️</span> {posts[0].likes}
                </button>
                <button className={styles.actionBtn}>
                  <span>💬</span> {posts[0].comments}
                </button>
                <button className={styles.actionBtn}>
                  <span>🔗</span> {posts[0].shares}
                </button>
              </div>
            </article>

            {/* Small Post Cards Grid */}
            <div className={styles.postCardsGrid}>
              {posts.slice(1).map((post) => (
                <article key={post.id} className={styles.postCardSmall}>
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
                  </div>

                  <div className={styles.smallPostContent}>
                    <div className={styles.smallPostText}>
                      <h2 className={styles.postTitle}>{post.title}</h2>
                      <p className={styles.postContent}>{post.content}</p>
                    </div>
                    <div className={styles.smallPostImage}>
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

            {/* More posts in 3 columns */}
            <div className={styles.postCardsGridThree}>
              {[4, 5, 6].map((num) => (
                <article key={num} className={styles.postCardSmall}>
                  <div className={styles.postHeader}>
                    <div className={styles.postAuthor}>
                      <div className={styles.authorAvatar}>
                        <img src={`https://i.pravatar.cc/150?img=${num}`} alt="Go Padel" />
                      </div>
                      <div className={styles.authorInfo}>
                        <h3>Go Padel</h3>
                        <span>in Padel Indonesia</span>
                      </div>
                    </div>
                  </div>

                  <h2 className={styles.postTitleSmall}>Discovering the Excitement of Padel</h2>
                  
                  <div className={styles.postImageSmall}>
                    <img src="https://images.unsplash.com/photo-1622163642998-1ea32b0bbc67?w=400" alt="Padel" />
                  </div>

                  <p className={styles.postContentSmall}>Experience the fun of padel, a unique mix of tennis and squash. With its fast-paced play and smaller court, padel is perfect for all skill levels.</p>

                  <div className={styles.postActions}>
                    <button className={styles.actionBtn}>
                      <span>❤️</span> 876
                    </button>
                    <button className={styles.actionBtn}>
                      <span>💬</span> 123
                    </button>
                    <button className={styles.actionBtn}>
                      <span>🔗</span> 98
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}