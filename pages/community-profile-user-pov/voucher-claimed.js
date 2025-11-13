'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './voucher-claimed.module.css';

export default function VoucherClaimed() {
  const router = useRouter();
  const [codeText, setCodeText] = useState('X456-Y789-Z123');
  const [codeColor, setCodeColor] = useState('#7c3aed');

  const handleCopyCode = () => {
    const code = 'X456-Y789-Z123';
    
    navigator.clipboard.writeText(code).then(() => {
      setCodeText('Copied!');
      setCodeColor('#22c55e');
      
      setTimeout(() => {
        setCodeText('X456-Y789-Z123');
        setCodeColor('#7c3aed');
      }, 1500);
    }).catch((err) => {
      console.error('Failed to copy:', err);
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.voucherHeader}>
        <img 
          className={styles.voucherHeaderImage} 
          src="https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=800&q=80" 
          alt="Decorative ribbon" 
        />
      </div>

      <div className={styles.voucherContent}>
        <h1 className={styles.voucherTitle}>Voucher Claimed Successfully!</h1>
        <p className={styles.voucherMessage}>
          Congratulations! You have successfully claimed the voucher. Here are your voucher details.
        </p>

        <div className={styles.voucherCodeContainer}>
          <div className={styles.voucherCodeSection}>
            <span className={styles.codeLabel}>Voucher Code:</span>
            <span 
              className={styles.codeValue}
              style={{ color: codeColor, cursor: 'pointer' }}
              onClick={handleCopyCode}
              title="Click to copy"
            >
              {codeText}
            </span>
          </div>
          <div className={styles.voucherImageSection}>
            <img 
              src="https://images.unsplash.com/photo-1606787364406-72a0e8b60?w=500&q=80" 
              alt="Gift voucher card" 
              onError={(e) => e.target.src = 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=500&q=80'}
            />
          </div>
        </div>

        <button 
          type="button"
          className={styles.backToHomeBtn} 
          onClick={() => router.push('/main-page')}
        >
          Back to Home
        </button>
      </div>
    </div>
  );
}