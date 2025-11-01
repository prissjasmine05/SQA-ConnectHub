import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import styles from './Navbar.module.css';

export default function Navbar({ isLoggedIn = false }) {
  const router = useRouter();

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        {/* Logo */}
        <Link href="/" className={styles.logo}>
          <Image 
            src="/images/LogoConnectHub.png" 
            alt="ConnectHub Logo" 
            width={150} 
            height={40}
            priority
          />
        </Link>
        
        {/* Navigation - Different for logged in/out */}
        {isLoggedIn ? (
          <>
            {/* Logged In Navigation */}
            <ul className={styles.navLinks}>
              <li>
                <Link href="/main-page" className={router.pathname === '/main-page' ? styles.active : ''}>
                  Home
                </Link>
              </li>
              <li>
                <Link href="/main-page/explore" className={router.pathname === '/main-page/explore' ? styles.active : ''}>
                  Explore
                </Link>
              </li>
              <li>
                <Link href="/main-page/notifications" className={router.pathname === '/main-page/notifications' ? styles.active : ''}>
                  Notifications
                </Link>
              </li>
              <li>
                <Link href="/main-page/messages" className={router.pathname === '/main-page/messages' ? styles.active : ''}>
                  Messages
                </Link>
              </li>
            </ul>

            {/* User Profile */}
            <div className={styles.userProfile}>
              <div className={styles.avatar}>
                <img src="https://i.pravatar.cc/150?img=5" alt="User" />
              </div>
            </div>
          </>
        ) : (
          <>
            {/* Logged Out Navigation */}
            <ul className={styles.navLinks}>
              <li>
                <Link href="/" className={router.pathname === '/' ? styles.active : ''}>
                  Home
                </Link>
              </li>
              <li>
                <Link href="/explore" className={router.pathname === '/explore' ? styles.active : ''}>
                  Explore
                </Link>
              </li>
            </ul>

            {/* Auth Buttons */}
            <div className={styles.authButtons}>
              <Link href="/register" className={styles.btnRegister}>
                Register
              </Link>
              <Link href="/create-acc" className={styles.btnLogin}>
                Login
              </Link>
            </div>
          </>
        )}
      </div>
    </nav>
  );
}