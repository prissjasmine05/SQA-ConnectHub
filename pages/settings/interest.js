import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Navbar from '../../components/Navbar';

export default function InterestSettings() {
  const router = useRouter();
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const availableInterests = [
    { id: 'technology', name: 'Technology', icon: '💻', category: 'Tech' },
    { id: 'programming', name: 'Programming', icon: '⌨️', category: 'Tech' },
    { id: 'ai-ml', name: 'AI & Machine Learning', icon: '🤖', category: 'Tech' },
    { id: 'web-development', name: 'Web Development', icon: '🌐', category: 'Tech' },
    { id: 'mobile-dev', name: 'Mobile Development', icon: '📱', category: 'Tech' },
    { id: 'fitness', name: 'Fitness', icon: '💪', category: 'Health' },
    { id: 'nutrition', name: 'Nutrition', icon: '🥗', category: 'Health' },
    { id: 'mental-health', name: 'Mental Health', icon: '🧠', category: 'Health' },
    { id: 'yoga', name: 'Yoga', icon: '🧘', category: 'Health' },
    { id: 'cooking', name: 'Cooking', icon: '👨‍🍳', category: 'Lifestyle' },
    { id: 'travel', name: 'Travel', icon: '✈️', category: 'Lifestyle' },
    { id: 'photography', name: 'Photography', icon: '📸', category: 'Lifestyle' },
    { id: 'music', name: 'Music', icon: '🎵', category: 'Arts' },
    { id: 'art', name: 'Art', icon: '🎨', category: 'Arts' },
    { id: 'writing', name: 'Writing', icon: '✍️', category: 'Arts' },
    { id: 'reading', name: 'Reading', icon: '📚', category: 'Arts' },
    { id: 'gaming', name: 'Gaming', icon: '🎮', category: 'Entertainment' },
    { id: 'movies', name: 'Movies', icon: '🎬', category: 'Entertainment' },
    { id: 'sports', name: 'Sports', icon: '⚽', category: 'Sports' },
    { id: 'business', name: 'Business', icon: '💼', category: 'Professional' },
    { id: 'marketing', name: 'Marketing', icon: '📈', category: 'Professional' },
    { id: 'finance', name: 'Finance', icon: '💰', category: 'Professional' },
  ];

  const categories = [...new Set(availableInterests.map(interest => interest.category))];

  const filteredInterests = availableInterests.filter(interest =>
    interest.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleInterest = (interestId) => {
    setSelectedInterests(prev =>
      prev.includes(interestId)
        ? prev.filter(id => id !== interestId)
        : [...prev, interestId]
    );
  };

  const getInterestsByCategory = (category) => {
    return filteredInterests.filter(interest => interest.category === category);
  };

  const handleSave = () => {
    // Save interests logic here
    console.log('Saving interests:', selectedInterests);
    alert('Interests saved successfully!');
  };

  return (
    <div style={styles.page}>
      <Navbar />
      
      <main style={styles.main}>
        <div style={styles.container}>
          <div style={styles.header}>
            <button 
              style={styles.backButton}
              onClick={() => router.back()}
            >
              ←
            </button>
            <h1 style={styles.title}>Your Interests</h1>
          </div>

          <div style={styles.content}>
            <div style={styles.description}>
              <p>Select topics you're interested in to help us personalize your experience and show you relevant content and communities.</p>
            </div>

            {/* Search */}
            <div style={styles.searchSection}>
              <input
                type="text"
                placeholder="Search interests..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={styles.searchInput}
              />
            </div>

            {/* Selected Count */}
            <div style={styles.selectedCount}>
              <span>{selectedInterests.length} interests selected</span>
            </div>

            {/* Interests by Category */}
            <div style={styles.categoriesContainer}>
              {categories.map(category => {
                const categoryInterests = getInterestsByCategory(category);
                if (categoryInterests.length === 0) return null;

                return (
                  <section key={category} style={styles.category}>
                    <h3 style={styles.categoryTitle}>{category}</h3>
                    <div style={styles.interestsGrid}>
                      {categoryInterests.map(interest => (
                        <button
                          key={interest.id}
                          style={{
                            ...styles.interestButton,
                            ...(selectedInterests.includes(interest.id) && styles.selectedInterest)
                          }}
                          onClick={() => toggleInterest(interest.id)}
                        >
                          <span style={styles.interestIcon}>{interest.icon}</span>
                          <span style={styles.interestName}>{interest.name}</span>
                          {selectedInterests.includes(interest.id) && (
                            <span style={styles.checkmark}>✓</span>
                          )}
                        </button>
                      ))}
                    </div>
                  </section>
                );
              })}
            </div>

            {/* Actions */}
            <div style={styles.actions}>
              <button style={styles.saveButton} onClick={handleSave}>
                Save Interests ({selectedInterests.length})
              </button>
              <button style={styles.clearButton} onClick={() => setSelectedInterests([])}>
                Clear All
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

const styles = {
  page: {
    minHeight: '100vh',
    backgroundColor: '#f8fafc',
    fontFamily: 'system-ui, -apple-system, sans-serif',
  },
  main: {
    paddingTop: '80px',
    paddingBottom: '40px',
  },
  container: {
    maxWidth: '900px',
    margin: '0 auto',
    padding: '0 20px',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '32px',
    gap: '16px',
  },
  backButton: {
    background: 'none',
    border: 'none',
    fontSize: '24px',
    cursor: 'pointer',
    color: '#64748b',
    padding: '8px',
    borderRadius: '8px',
    transition: 'background-color 0.2s',
  },
  title: {
    fontSize: '32px',
    fontWeight: '700',
    color: '#1e293b',
    margin: 0,
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
  },
  description: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '12px',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
  },
  searchSection: {
    display: 'flex',
    gap: '12px',
  },
  searchInput: {
    flex: 1,
    padding: '12px 16px',
    borderRadius: '12px',
    border: '1px solid #d1d5db',
    fontSize: '16px',
    backgroundColor: 'white',
  },
  selectedCount: {
    display: 'flex',
    justifyContent: 'center',
    padding: '12px',
    backgroundColor: '#e0f2fe',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '600',
    color: '#0369a1',
  },
  categoriesContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
  },
  category: {
    backgroundColor: 'white',
    padding: '24px',
    borderRadius: '16px',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
  },
  categoryTitle: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#374151',
    margin: '0 0 16px 0',
  },
  interestsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
    gap: '12px',
  },
  interestButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '12px 16px',
    borderRadius: '12px',
    border: '2px solid #e5e7eb',
    backgroundColor: 'white',
    cursor: 'pointer',
    transition: 'all 0.2s',
    fontSize: '14px',
    fontWeight: '500',
    color: '#374151',
    position: 'relative',
  },
  selectedInterest: {
    borderColor: '#3b82f6',
    backgroundColor: '#eff6ff',
    color: '#1d4ed8',
  },
  interestIcon: {
    fontSize: '18px',
  },
  interestName: {
    flex: 1,
    textAlign: 'left',
  },
  checkmark: {
    fontSize: '16px',
    color: '#10b981',
    fontWeight: 'bold',
  },
  actions: {
    display: 'flex',
    gap: '12px',
    justifyContent: 'center',
    paddingTop: '20px',
  },
  saveButton: {
    backgroundColor: '#3b82f6',
    color: 'white',
    border: 'none',
    padding: '14px 28px',
    borderRadius: '12px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
  },
  clearButton: {
    backgroundColor: '#ef4444',
    color: 'white',
    border: 'none',
    padding: '14px 28px',
    borderRadius: '12px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
  },
};
