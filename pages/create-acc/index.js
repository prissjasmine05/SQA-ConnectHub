import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Button from '../../components/Button';
import styles from './CreateAccount.module.css';

export default function CreateAccount() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState('login'); // 'login', 'signup', 'interests'
  
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });

  const [signupData, setSignupData] = useState({
    fullname: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [selectedInterests, setSelectedInterests] = useState([]);

  const interests = [
    { id: 1, name: 'Padel', image: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=400' },
    { id: 2, name: 'Badminton', image: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=400' },
    { id: 3, name: 'Travel', image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400' },
    { id: 4, name: 'Shopping', image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400' },
    { id: 5, name: 'Fitness', image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400' },
    { id: 6, name: 'Pilates & Yoga', image: 'https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?w=400' },
    { id: 7, name: 'Cooking', image: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=400' },
    { id: 8, name: 'Photography', image: 'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=400' },
    { id: 9, name: 'Gaming', image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400' },
    { id: 10, name: 'Movies', image: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400' }
  ];

  const toggleInterest = (id) => {
    if (selectedInterests.includes(id)) {
      setSelectedInterests(selectedInterests.filter(i => i !== id));
    } else {
      setSelectedInterests([...selectedInterests, id]);
    }
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setCurrentStep('interests');
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    setCurrentStep('interests');
  };

  const handleGetStarted = () => {
    router.push('/main-page');
  };

  return (
    <>
      <Head>
        <title>Create Account - ConnectHub</title>
      </Head>

      <div className={styles.container}>
        {/* Left Form Section */}
        <div className={styles.leftSection}>
          <div className={styles.formWrapper}>
            {/* Logo */}
            <div className={styles.logo}>
              <span className={styles.logoIcon}>■</span>
              <span className={styles.logoText}>ConnectHub</span>
            </div>

            {currentStep === 'login' && (
              <div className={styles.formContent}>
                <h1>Welcome Back</h1>
                <p className={styles.subtitle}>
                  Don't have an account? <Link href="#" onClick={() => setCurrentStep('signup')}>Sign up</Link>
                </p>

                <form onSubmit={handleLoginSubmit} className={styles.form}>
                  <div className={styles.formGroup}>
                    <label>Email address</label>
                    <input
                      type="email"
                      placeholder="Enter your email"
                      value={loginData.email}
                      onChange={(e) => setLoginData({...loginData, email: e.target.value})}
                      required
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label>Password</label>
                    <input
                      type="password"
                      placeholder="••••••••"
                      value={loginData.password}
                      onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                      required
                    />
                  </div>

                  <Button type="submit" variant="primary" size="large" fullWidth>
                    Log In
                  </Button>
                </form>

                <div className={styles.orDivider}>
                  <span>or</span>
                </div>

                <div className={styles.socialLogin}>
                  <button className={styles.socialBtn}>
                    <span className={styles.googleIcon}>G</span>
                    Continue with Google
                  </button>
                </div>
              </div>
            )}

            {currentStep === 'signup' && (
              <div className={styles.formContent}>
                <h1>Create your account</h1>
                <p className={styles.subtitle}>
                  Already have an account? <Link href="#" onClick={() => setCurrentStep('login')}>Sign in</Link>
                </p>

                <form onSubmit={handleSignupSubmit} className={styles.form}>
                  <div className={styles.formGroup}>
                    <label>Full Name</label>
                    <input
                      type="text"
                      placeholder="Enter your full name"
                      value={signupData.fullname}
                      onChange={(e) => setSignupData({...signupData, fullname: e.target.value})}
                      required
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label>Email address</label>
                    <input
                      type="email"
                      placeholder="Enter your email"
                      value={signupData.email}
                      onChange={(e) => setSignupData({...signupData, email: e.target.value})}
                      required
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label>Password</label>
                    <input
                      type="password"
                      placeholder="••••••••"
                      value={signupData.password}
                      onChange={(e) => setSignupData({...signupData, password: e.target.value})}
                      required
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label>Confirm Password</label>
                    <input
                      type="password"
                      placeholder="••••••••"
                      value={signupData.confirmPassword}
                      onChange={(e) => setSignupData({...signupData, confirmPassword: e.target.value})}
                      required
                    />
                  </div>

                  <Button type="submit" variant="primary" size="large" fullWidth>
                    Sign Up
                  </Button>
                </form>

                <div className={styles.orDivider}>
                  <span>or</span>
                </div>

                <div className={styles.socialLogin}>
                  <button className={styles.socialBtn}>
                    <span className={styles.googleIcon}>G</span>
                    Continue with Google
                  </button>
                </div>
              </div>
            )}

            {currentStep === 'interests' && (
              <div className={styles.interestsContent}>
                <div className={styles.interestsHeader}>
                  <h1>What are you interested in?</h1>
                  <p>Choose your interest to get personalized content</p>
                </div>

                <div className={styles.interestsGrid}>
                  {interests.map((interest) => (
                    <div
                      key={interest.id}
                      className={`${styles.interestCard} ${selectedInterests.includes(interest.id) ? styles.selected : ''}`}
                      onClick={() => toggleInterest(interest.id)}
                    >
                      <img src={interest.image} alt={interest.name} />
                      <div className={styles.interestOverlay}>
                        <span>{interest.name}</span>
                      </div>
                      {selectedInterests.includes(interest.id) && (
                        <div className={styles.checkmark}>✓</div>
                      )}
                    </div>
                  ))}
                </div>

                <div className={styles.interestsFooter}>
                  <Button variant="primary" size="large" onClick={handleGetStarted}>
                    Get Started
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Image Section */}
        <div className={styles.rightSection}>
          <img 
            src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1000" 
            alt="Community" 
          />
        </div>
      </div>
    </>
  );
}