// pages/index.js
import Head from 'next/head';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Button from '../components/Button';
import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <>
      <Head>
        <title>ConnectHub - Connect, Share, Grow</title>
        <meta name="description" content="Platform untuk menghubungkan komunitas dan event terbaik" />
      </Head>

      {/* gunakan variant="landing" agar navbar hanya logo + tombol auth */}
      <Navbar isLoggedIn={false} variant="landing" />

      <main className={styles.main}>
        {/* Hero Section */}
        <section className={styles.hero}>
          <div className={styles.heroContent}>
            <h1>Welcome to ConnectHub</h1>
            <p>Platform terbaik untuk menghubungkan komunitas, berbagi pengalaman, dan berkembang bersama</p>
            <div className={styles.heroButtons}>
              <Link href="/create-acc">
                <Button variant="primary" size="large">Get Started</Button>
              </Link>
              {/* Explore Events dihapus sesuai permintaan */}
            </div>
          </div>
          <div className={styles.heroImage}>
            <img 
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800" 
              alt="Community" 
            />
          </div>
        </section>

        {/* Features Section */}
        <section className={styles.features}>
          <h2>Why Choose ConnectHub?</h2>
          <div className={styles.featureGrid}>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>🌐</div>
              <h3>Global Community</h3>
              <p>Terhubung dengan ribuan komunitas di seluruh dunia</p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>📅</div>
              <h3>Easy Event Management</h3>
              <p>Buat dan kelola event dengan mudah dan efisien</p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>🎯</div>
              <h3>Targeted Networking</h3>
              <p>Temukan orang dengan minat dan passion yang sama</p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className={styles.cta}>
          <h2>Ready to Get Started?</h2>
          <p>Join thousands of communities today</p>
          <Link href="/create-acc">
            <Button variant="primary" size="large">Create Your Account</Button>
          </Link>
        </section>
      </main>

      <Footer />
    </>
  );
}
