// pages/create-event/registered-participants.js
import React, { useState } from 'react';
import Navbar from '../../components/Navbar';

export default function RegisteredParticipants() {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('name');

  const participants = [
    {
      id: 1,
      name: 'Sophia Clark',
      phoneNumber: '+1 (555) 123-4567',
      emailAddress: 'sophia.clark@email.com'
    },
    {
      id: 2,
      name: 'Ethan Bennett',
      phoneNumber: '+1 (555) 987-6543',
      emailAddress: 'ethan.bennett@email.com'
    },
    {
      id: 3,
      name: 'Olivia Hayes',
      phoneNumber: '+1 (555) 246-8013',
      emailAddress: 'olivia.hayes@email.com'
    },
    {
      id: 4,
      name: 'Liam Foster',
      phoneNumber: '+1 (555) 369-1470',
      emailAddress: 'liam.foster@email.com'
    },
    {
      id: 5,
      name: 'Ava Mitchell',
      phoneNumber: '+1 (555) 789-0123',
      emailAddress: 'ava.mitchell@email.com'
    }
  ];

  return (
    <div style={styles.page}>
      <Navbar />
      
      <main style={styles.main}>
        {/* Page Title */}
        <h1 style={styles.pageTitle}>Registered Participants</h1>

        {/* Content Container - membungkus search, sort, dan table */}
        <div style={styles.contentContainer}>
          {/* Search Bar */}
          <div style={styles.searchWrapper}>
            <div style={styles.searchContainer}>
              <svg 
                style={styles.searchIcon}
                width="20" 
                height="20" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="#9ca3af" 
                strokeWidth="2"
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.35-4.35"></path>
              </svg>
              
              <input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={styles.searchInput}
              />
            </div>
          </div>

          {/* Sort Options */}
          <div style={styles.sortContainer}>
            <button style={styles.sortButton}>
              Name
              <span style={styles.sortIcon}>▼</span>
            </button>
            <button style={styles.sortButton}>
              Registration Date
              <span style={styles.sortIcon}>▼</span>
            </button>
          </div>

          {/* Participants Table */}
          <div style={styles.tableContainer}>
            <table style={styles.table}>
              <thead>
                <tr style={styles.tableHeaderRow}>
                  <th style={styles.tableHeader}>Name</th>
                  <th style={styles.tableHeader}>Phone Number</th>
                  <th style={styles.tableHeader}>Email Address</th>
                </tr>
              </thead>
              <tbody>
                {participants.map((participant, index) => (
                  <tr 
                    key={participant.id} 
                    style={{
                      ...styles.tableRow,
                      backgroundColor: index % 2 === 0 ? 'white' : '#fafafa'
                    }}
                  >
                    <td style={styles.tableCell}>{participant.name}</td>
                    <td style={styles.tableCell}>{participant.phoneNumber}</td>
                    <td style={styles.tableCell}>{participant.emailAddress}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Back Button */}
        <button 
          style={styles.backButton}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#6b4bc4';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#7c5cdb';
          }}
          onClick={() => window.history.back()}
        >
          Back
        </button>
      </main>
    </div>
  );
}

const styles = {
  page: {
    backgroundColor: '#F0F0FF',
    minHeight: '100vh',
  },
  main: {
    paddingTop: '60px',
    maxWidth: '900px',
    margin: '0 auto',
    padding: '80px 32px 32px',
  },
  pageTitle: {
    fontSize: '36px',
    fontWeight: '700',
    color: '#1d1d1f',
    marginBottom: '32px',
    letterSpacing: '-0.02em',
  },
  // Container baru untuk membungkus semua content
  contentContainer: {
    width: '100%',
    boxSizing: 'border-box',
  },
  searchWrapper: {
    marginBottom: '24px',
  },
  searchContainer: {
    position: 'relative',
    width: '100%',
    boxSizing: 'border-box',
  },
  searchIcon: {
    position: 'absolute',
    left: '16px',
    top: '50%',
    transform: 'translateY(-50%)',
    zIndex: 1,
  },
  searchInput: {
    width: '100%',
    padding: '12px 12px 12px 48px',
    fontSize: '15px',
    border: '1px solid #d1d5db',
    borderRadius: '8px',
    backgroundColor: '#f3f4f6',
    outline: 'none',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    boxSizing: 'border-box',
  },
  sortContainer: {
    display: 'flex',
    gap: '16px',
    marginBottom: '24px',
  },
  sortButton: {
    backgroundColor: '#f3f4f6',
    border: 'none',
    fontSize: '15px',
    fontWeight: '500',
    color: '#1d1d1f',
    cursor: 'pointer',
    padding: '8px 16px',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    borderRadius: '20px',
    transition: 'background-color 0.2s',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  },
  sortIcon: {
    fontSize: '10px',
    color: '#6b7280',
  },
  tableContainer: {
    backgroundColor: 'white',
    borderRadius: '12px',
    overflow: 'hidden',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    marginBottom: '32px',
    width: '100%',
    boxSizing: 'border-box',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  tableHeaderRow: {
    backgroundColor: 'white',
    borderBottom: '2px solid #e5e7eb',
  },
  tableHeader: {
    padding: '16px 20px',
    textAlign: 'left',
    fontSize: '14px',
    fontWeight: '600',
    color: '#1d1d1f',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  },
  tableRow: {
    borderBottom: '1px solid #f3f4f6',
  },
  tableCell: {
    padding: '16px 20px',
    fontSize: '14px',
    color: '#1d1d1f',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  },
  backButton: {
    width: '100%',
    maxWidth: '540px',
    margin: '0 auto',
    display: 'block',
    backgroundColor: '#7c5cdb',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    padding: '14px 24px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  },
};