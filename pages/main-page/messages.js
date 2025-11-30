import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Navbar from '../../components/Navbar';
import styles from './Messages.module.css';

export default function Messages() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the new chat system
    router.push('/chat');
  }, [router]);

  return (
    <>
      <Head>
        <title>Messages - ConnectHub</title>
      </Head>

      <Navbar isLoggedIn={true} />

      <main className={styles.messagesContainer}>
        <div className={styles.loadingContainer}>
          <p>Redirecting to Messages...</p>
        </div>
      </main>
    </>
  );
}