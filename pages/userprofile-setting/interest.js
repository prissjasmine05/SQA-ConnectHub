import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import styles from './interest.module.css';

export default function ManageInterest() {
  const router = useRouter();
  
  const [userInterests, setUserInterests] = useState([]);
  const [availableInterests, setAvailableInterests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Predefined interests with icons
  const allInterests = [
    { name: 'Technology', icon: '💻' },
    { name: 'Programming', icon: '⌨️' },
    { name: 'Web Development', icon: '�' },
    { name: 'Mobile Development', icon: '📱' },
    { name: 'Data Science', icon: '📊' },
    { name: 'Artificial Intelligence', icon: '🤖' },
    { name: 'Gaming', icon: '🎮' },
    { name: 'Sports', icon: '⚽' },
    { name: 'Fitness', icon: '💪' },
    { name: 'Health', icon: '🏥' },
    { name: 'Cooking', icon: '🍳' },
    { name: 'Travel', icon: '✈️' },
    { name: 'Photography', icon: '📷' },
    { name: 'Music', icon: '🎵' },
    { name: 'Movies', icon: '🎬' },
    { name: 'Books', icon: '📚' },
    { name: 'Art', icon: '🎨' },
    { name: 'Design', icon: '🎯' },
    { name: 'Fashion', icon: '👗' },
    { name: 'Business', icon: '💼' },
    { name: 'Finance', icon: '💰' },
    { name: 'Marketing', icon: '📈' },
    { name: 'Education', icon: '🎓' },
    { name: 'Science', icon: '🔬' },
    { name: 'Nature', icon: '🌱' },
    { name: 'Environment', icon: '🌍' },
    { name: 'Yoga', icon: '🧘' },
    { name: 'Dancing', icon: '💃' },
    { name: 'Writing', icon: '✍️' },
    { name: 'Shopping', icon: '�️' },
    { name: 'Padel', icon: '🎾' }
  ];

  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch('/api/auth/me', {
          credentials: 'include'
        });

        if (!res.ok) {
          router.push('/create-acc');
          return;
        }

        const data = await res.json();
        
        // Set current user interests
        const currentInterests = data.user.interests || [];
        setUserInterests(currentInterests);
        
        // Set available interests (not yet selected)
        const remaining = allInterests.filter(interest => 
          !currentInterests.includes(interest.name)
        );
        setAvailableInterests(remaining);
        
        setLoading(false);
      } catch (error) {
        console.error('Auth check failed:', error);
        router.push('/create-acc');
      }
    };

    checkAuth();
  }, [router]);

  const handleRemoveInterest = (interestName) => {
    const newInterests = userInterests.filter(i => i !== interestName);
    setUserInterests(newInterests);
    
    // Add back to available interests
    const interestObj = allInterests.find(i => i.name === interestName);
    if (interestObj) {
      setAvailableInterests(prev => [...prev, interestObj].sort((a, b) => a.name.localeCompare(b.name)));
    }
  };

  const handleAddInterest = (interestName) => {
    if (!userInterests.includes(interestName)) {
      const newInterests = [...userInterests, interestName];
      setUserInterests(newInterests);
      setAvailableInterests(prev => prev.filter(i => i.name !== interestName));
    }
  };

  const handleSaveInterests = async () => {
    setSaving(true);
    try {
      const response = await fetch('/api/user/update-profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({ interests: userInterests })
      });

      if (response.ok) {
        alert('Interests updated successfully!');
      } else {
        const error = await response.json();
        alert(error.message || 'Failed to update interests');
      }
    } catch (error) {
      console.error('Error updating interests:', error);
      alert('Failed to update interests');
    } finally {
      setSaving(false);
    }
  };

  const getCurrentInterestsWithIcons = () => {
    return userInterests.map(interestName => {
      const interestObj = allInterests.find(i => i.name === interestName);
      return {
        name: interestName,
        icon: interestObj?.icon || '⭐'
      };
    });
  };

  const filteredCurrentInterests = getCurrentInterestsWithIcons().filter(interest =>
    interest.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredAvailableInterests = availableInterests.filter(interest =>
    interest.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={styles.mainContainer}>
      <div className={styles.modalCard}>
        {/* Close Button */}
        <button 
          onClick={() => router.push('/user-profile/settings')}
          className={styles.closeButton}
        >
          ×
        </button>

        {/* Header */}
        <div className={styles.modalHeader}>
          <div className={styles.logoIcon}></div>
          <span className={styles.logoText}>ConnectHub</span>
        </div>

        <div className={styles.modalContent}>
          <h1 className={styles.modalTitle}>Manage Your Interest</h1>

          {/* Search Bar */}
          <div className={styles.searchContainer}>
            <svg className={styles.searchIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              className={styles.searchInput}
              placeholder="Search interests"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Joined Communities Section */}
          {/* Current Interests Section */}
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Your Current Interests ({userInterests.length})</h2>

            <div className={styles.interestsList}>
              {loading ? (
                <div className={styles.loadingState}>
                  <p>Loading interests...</p>
                </div>
              ) : filteredCurrentInterests.length > 0 ? (
                filteredCurrentInterests.map(interest => (
                  <div key={interest.name} className={styles.interestItem}>
                    <div className={styles.iconWrapper}>
                      <span className={styles.interestIcon}>{interest.icon}</span>
                    </div>
                    <span className={styles.interestName}>{interest.name}</span>
                    <button 
                      className={styles.removeButton}
                      onClick={() => handleRemoveInterest(interest.name)}
                    >
                      Remove
                    </button>
                  </div>
                ))
              ) : (
                <div className={styles.noInterests}>
                  <p>No current interests found matching your search.</p>
                </div>
              )}
            </div>
          </div>

          {/* Available Interests Section */}
          {!loading && (
            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>Add More Interests ({availableInterests.length} available)</h2>

              <div className={styles.interestsList}>
                {filteredAvailableInterests.length > 0 ? (
                  filteredAvailableInterests.map(interest => (
                    <div key={interest.name} className={styles.interestItem}>
                      <div className={styles.iconWrapper}>
                        <span className={styles.interestIcon}>{interest.icon}</span>
                      </div>
                      <span className={styles.interestName}>{interest.name}</span>
                      <button 
                        className={styles.addButton}
                        onClick={() => handleAddInterest(interest.name)}
                      >
                        Add
                      </button>
                    </div>
                  ))
                ) : (
                  <div className={styles.noInterests}>
                    <p>No available interests found matching your search.</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Save Button */}
          {!loading && (
            <div className={styles.saveSection}>
              <button 
                className={styles.saveButton}
                onClick={handleSaveInterests}
                disabled={saving}
              >
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}