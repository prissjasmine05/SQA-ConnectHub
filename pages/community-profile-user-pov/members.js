'use client';

import { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import styles from './members.module.css';

export default function Members() {
  const [searchTerm, setSearchTerm] = useState('');
  
  const members = [
    { id: 1, name: 'Ethan Carter', status: 'active', avatar: 'linear-gradient(135deg, #fde68a 0%, #fbbf24 100%)' },
    { id: 2, name: 'Sophia Bennett', status: 'inactive', avatar: 'linear-gradient(135deg, #fecaca 0%, #f87171 100%)' },
    { id: 3, name: 'Liam Harper', status: 'active', avatar: 'linear-gradient(135deg, #d1fae5 0%, #6ee7b7 100%)' },
    { id: 4, name: 'Olivia Foster', status: 'inactive', avatar: 'linear-gradient(135deg, #e9d5ff 0%, #c084fc 100%)' },
    { id: 5, name: 'Noah Parker', status: 'active', avatar: 'linear-gradient(135deg, #bfdbfe 0%, #60a5fa 100%)' },
    { id: 6, name: 'Ava Mitchell', status: 'inactive', avatar: 'linear-gradient(135deg, #fed7aa 0%, #fb923c 100%)' },
    { id: 7, name: 'Isabella Coleman', status: 'inactive', avatar: 'linear-gradient(135deg, #fecdd3 0%, #fb7185 100%)' },
    { id: 8, name: 'Aiden Brooks', status: 'active', avatar: 'linear-gradient(135deg, #fef08a 0%, #facc15 100%)' },
    { id: 9, name: 'Jackson Reed', status: 'active', avatar: 'linear-gradient(135deg, #a5f3fc 0%, #22d3ee 100%)' },
    { id: 10, name: 'Mia Hughes', status: 'inactive', avatar: 'linear-gradient(135deg, #ddd6fe 0%, #a78bfa 100%)' }
  ];

  const filteredMembers = members.filter(member =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Navbar />
      <div className={styles.container}>
        {/* Community Header */}
        <div className={styles.communityHeader}>
          <h1 className={styles.communityTitle}>Tech Enthusiasts Community</h1>
          <p className={styles.communityDescription}>
            A vibrant community for tech lovers to discuss the latest trends, gadgets, and innovations. Join us to share your insights and connect with fellow enthusiasts.
          </p>
        </div>

        {/* Tabs */}
        <div className={styles.tabs}>
          <Link href="/community-profile-user-pov" className={styles.tab}>
            Posts
          </Link>
          <Link href="/community-profile-user-pov/members" className={`${styles.tab} ${styles.active}`}>
            Members
          </Link>
          <Link href="/community-profile-user-pov/events" className={styles.tab}>
            Events
          </Link>
          <Link href="/community-profile-user-pov/about" className={styles.tab}>
            About
          </Link>
        </div>

        {/* Search Bar */}
        <div className={styles.searchContainer}>
          <input
            type="text"
            className={styles.searchInput}
            placeholder="Search members"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Members List */}
        <div className={styles.membersList}>
          {filteredMembers.map((member) => (
            <div key={member.id} className={styles.memberCard}>
              <div 
                className={styles.memberAvatar} 
                style={{ background: member.avatar }}
              ></div>
              <div className={styles.memberInfo}>
                <div className={styles.memberName}>{member.name}</div>
                <div className={`${styles.memberStatus} ${member.status === 'active' ? styles.active : ''}`}>
                  {member.status === 'active' ? 'Active' : 'Inactive'}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}