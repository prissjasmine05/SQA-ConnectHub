import Link from 'next/link';
import Image from 'next/image';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.footerContent}>
          {/* Logo & Description */}
          <div className={styles.footerBrand}>
            <Image 
              src="/images/LogoConnectHub.png" 
              alt="ConnectHub Logo" 
              width={150} 
              height={40}
            />
            <p>Platform untuk menghubungkan komunitas dan event terbaik</p>
          </div>

          

          {/* Support */}
          <div className={styles.footerLinks}>
            <h4>Support</h4>
            <ul>
              <li><Link href="#">Help Center</Link></li>
              <li><Link href="#">Privacy Policy</Link></li>
              <li><Link href="#">Terms of Service</Link></li>
              <li><Link href="#">Contact Us</Link></li>
            </ul>
          </div>

          {/* Social Media */}
          <div className={styles.footerSocial}>
            <h4>Follow Us</h4>
            <div className={styles.socialIcons}>
              <a href="#" aria-label="Facebook">FB</a>
              <a href="#" aria-label="Twitter">TW</a>
              <a href="#" aria-label="Instagram">IG</a>
              <a href="#" aria-label="LinkedIn">IN</a>
            </div>
          </div>
        </div>

        <div className={styles.footerBottom}>
          <p>&copy; {new Date().getFullYear()} ConnectHub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}