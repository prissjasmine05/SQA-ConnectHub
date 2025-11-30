// components/Navbar.js
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Button from './Button';
import styles from './Navbar.module.css';

export default function Navbar({ isLoggedIn = false, variant = 'default' }) {
  const router = useRouter();

  // ====== Landing (minimal) ======
  if (variant === 'landing') {
    return (
      <nav className={styles.navbar}>
        <div className={styles.container}>
          {/* Logo kiri */}
          <Link href="/" className={styles.logo} aria-label="ConnectHub">
            <Image 
              src="/images/LogoConnectHub.png" 
              alt="ConnectHub Logo" 
              width={150}
              height={40}
              priority
            />
          </Link>

          {/* Tombol kanan: Register / Login */}
          <div className={styles.authButtons}>
            <Link href="/create-acc">
              <Button size="medium">Register / Login</Button>
            </Link>
          </div>
        </div>
      </nav>
    );
  }

  // ====== Default (tetap ada bila dipakai di halaman lain) ======
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
        
        {isLoggedIn ? (
          <>
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

            {/* User Menu */}
            <div className={styles.userMenu}>
              <Link href="/settings" className={styles.settingsLink}>
                <span>⚙️</span>
              </Link>
              <Link href="/user-profile">
                <div className={styles.avatar}>
                  <img src="https://i.pravatar.cc/150?img=5" alt="User" />
                </div>
              </Link>
            </div>
          </>
        ) : (
          <>
            {/* (opsi lama non-landing) */}
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

            <div className={styles.authButtons}>
              <Link href="/create-acc">
                <Button size="medium">Register / Login</Button>
              </Link>
            </div>
          </>
        )}
      </div>
    </nav>
  );
}
