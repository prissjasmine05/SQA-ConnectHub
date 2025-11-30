import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Button from '../../components/Button';
import styles from './CreateAccount.module.css';

export default function CreateAccount() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState('login');
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

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

  // Check for account switching/adding
  useEffect(() => {
    const action = router.query.action;
    
    if (action === 'add-account' || action === 'switch-account') {
      setCurrentStep('login');
      
      // Check for target account info
      const targetAccount = sessionStorage.getItem('ch_target_account');
      if (targetAccount) {
        try {
          const account = JSON.parse(targetAccount);
          setLoginData(prev => ({
            ...prev,
            email: account.email
          }));
          
          // Show message
          if (action === 'switch-account') {
            setTimeout(() => {
              setError(`Switching to ${account.fullName}. Please enter your password.`);
            }, 500);
          }
          
          // Clear target
          sessionStorage.removeItem('ch_target_account');
        } catch (e) {
          console.error('Error parsing target account:', e);
        }
      }
    }
  }, [router.query]);

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

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginData),
        credentials: 'include'
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Login failed');
      }

      // Check if user has interests or completed onboarding
      const meRes = await fetch('/api/auth/me', { credentials: 'include' });
      const { user } = await meRes.json();

      if (user?.onboardingCompleted || (user?.interests && user.interests.length > 0)) {
        router.replace('/main-page');
      } else {
        setCurrentStep('interests');
      }
    } catch (err) {
      console.error(err);
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validation
    if (signupData.password !== signupData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (signupData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullname: signupData.fullname,
          email: signupData.email,
          password: signupData.password
        }),
        credentials: 'include'
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Registration failed');
      }

      // Check if new user needs to set interests
      const meRes = await fetch('/api/auth/me', { credentials: 'include' });
      const { user } = await meRes.json();

      if (user?.interests && user.interests.length > 0) {
        router.replace('/main-page');
      } else {
        setCurrentStep('interests');
      }
    } catch (err) {
      console.error(err);
      setError(err.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const handleGetStarted = async () => {
    if (selectedInterests.length === 0) {
      setError('Please select at least one interest');
      return;
    }

    setError('');
    setLoading(true);

    try {
      // Get selected interest names
      const picked = interests
        .filter(i => selectedInterests.includes(i.id))
        .map(i => i.name);

      const res = await fetch('/api/user/save-interests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ interests: picked })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Failed to save interests');
      }

      router.replace('/main-page');
    } catch (err) {
      console.error(err);
      setError(err.message || 'Failed to save interests');
    } finally {
      setLoading(false);
    }
  };

  const filteredInterests = interests.filter(i =>
    i.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Head>
        <title>Create Account - ConnectHub</title>
      </Head>

      <div
        className={[
          styles.container,
          currentStep === 'interests' ? styles.fullPage : ''
        ].join(' ')}
        data-step={currentStep}
      >
        <div className={styles.leftSection}>
          <div className={styles.formWrapper}>
            <div className={styles.logo}>
              <Link href="/">
                <Image
                  src="/images/LogoConnectHub.png"
                  alt="ConnectHub"
                  width={150}
                  height={40}
                  priority
                />
              </Link>
            </div>

            {currentStep === 'login' && (
              <div className={styles.formContent}>
                <h1>Welcome Back</h1>
                <p className={styles.subtitle}>
                  Don't have an account?{' '}
                  <Link href="#" onClick={() => setCurrentStep('signup')}>
                    Sign up
                  </Link>
                </p>



                {error && <div className={styles.error}>{error}</div>}

                <form onSubmit={handleLoginSubmit} className={styles.form}>
                  <div className={styles.formGroup}>
                    <label>Email address</label>
                    <input
                      type="email"
                      placeholder="Enter your email"
                      value={loginData.email}
                      onChange={(e) =>
                        setLoginData({ ...loginData, email: e.target.value })
                      }
                      required
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label>Password</label>
                    <input
                      type="password"
                      placeholder="••••••••"
                      value={loginData.password}
                      onChange={(e) =>
                        setLoginData({ ...loginData, password: e.target.value })
                      }
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    variant="primary"
                    size="large"
                    fullWidth
                    disabled={loading}
                  >
                    {loading ? 'Logging in...' : 'Log In'}
                  </Button>
                </form>
              </div>
            )}

            {currentStep === 'signup' && (
              <div className={styles.formContent}>
                <h1>Create your account</h1>
                <p className={styles.subtitle}>
                  Already have an account?{' '}
                  <Link href="#" onClick={() => setCurrentStep('login')}>
                    Sign in
                  </Link>
                </p>

                {error && <div className={styles.error}>{error}</div>}

                <form onSubmit={handleSignupSubmit} className={styles.form}>
                  <div className={styles.formGroup}>
                    <label>Full Name</label>
                    <input
                      type="text"
                      placeholder="Enter your full name"
                      value={signupData.fullname}
                      onChange={(e) =>
                        setSignupData({ ...signupData, fullname: e.target.value })
                      }
                      required
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label>Email address</label>
                    <input
                      type="email"
                      placeholder="Enter your email"
                      value={signupData.email}
                      onChange={(e) =>
                        setSignupData({ ...signupData, email: e.target.value })
                      }
                      required
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label>Password</label>
                    <input
                      type="password"
                      placeholder="••••••••"
                      value={signupData.password}
                      onChange={(e) =>
                        setSignupData({ ...signupData, password: e.target.value })
                      }
                      required
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label>Confirm Password</label>
                    <input
                      type="password"
                      placeholder="••••••••"
                      value={signupData.confirmPassword}
                      onChange={(e) =>
                        setSignupData({
                          ...signupData,
                          confirmPassword: e.target.value
                        })
                      }
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    variant="primary"
                    size="large"
                    fullWidth
                    disabled={loading}
                  >
                    {loading ? 'Creating Account...' : 'Sign Up'}
                  </Button>
                </form>
              </div>
            )}

            {currentStep === 'interests' && (
              <div className={styles.interestsContent}>
                <div className={styles.interestsHeader}>
                  <h1>What are you interested in?</h1>
                  <p>Choose your interest to get personalized content</p>

                  <div className={styles.searchBar}>
                    <span className={styles.searchIcon}>⌕</span>
                    <input
                      type="text"
                      placeholder="Search"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>

                {error && <div className={styles.error}>{error}</div>}

                <div className={styles.interestsGrid}>
                  {filteredInterests.map((interest) => (
                    <div
                      key={interest.id}
                      className={`${styles.interestCard} ${
                        selectedInterests.includes(interest.id)
                          ? styles.selected
                          : ''
                      }`}
                      onClick={() => toggleInterest(interest.id)}
                    >
                      <div className={styles.interestThumb}>
                        <img src={interest.image} alt={interest.name} />
                      </div>
                      <div className={styles.interestLabel}>{interest.name}</div>
                      {selectedInterests.includes(interest.id) && (
                        <div className={styles.checkmark}>✓</div>
                      )}
                    </div>
                  ))}
                </div>

                <div className={styles.interestsFooter}>
                  <Button
                    variant="primary"
                    size="large"
                    onClick={handleGetStarted}
                    disabled={loading || selectedInterests.length === 0}
                  >
                    {loading ? 'Saving...' : 'Get Started'}
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className={styles.rightSection}>
          <img
            src="https://www.storable.com/wp-content/uploads/2025/02/Storable_Team.png"
            alt="Community"
          />
        </div>
      </div>
    </>
  );
}