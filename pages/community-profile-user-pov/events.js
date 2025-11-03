'use client';

import { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import styles from './events.module.css';

export default function Events() {
  const [events, setEvents] = useState([
    {
      id: 1,
      title: 'Tech Talk: AI in Everyday Life',
      description: 'Join us for an insightful discussion on how artificial intelligence is shaping our daily routines and future innovations.',
      rsvp: false,
      image: "data:image/svg+xml,%3Csvg width='240' height='160' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='240' height='160' fill='%231a1a1a'/%3E%3Ccircle cx='120' cy='80' r='50' fill='%23333' opacity='0.3'/%3E%3Ccircle cx='120' cy='80' r='35' fill='%23444' opacity='0.4'/%3E%3Ccircle cx='120' cy='80' r='20' fill='%23666' opacity='0.5'/%3E%3Ctext x='120' y='90' font-family='Arial' font-size='24' fill='%23fff' text-anchor='middle' font-weight='bold'%3EAI%3C/text%3E%3Cpath d='M80,60 L90,50 L100,60 L110,50 L120,60 L130,50 L140,60 L150,50 L160,60' stroke='%2322c55e' stroke-width='2' fill='none' opacity='0.6'/%3E%3Cpath d='M80,100 L90,110 L100,100 L110,110 L120,100 L130,110 L140,100 L150,110 L160,100' stroke='%233b82f6' stroke-width='2' fill='none' opacity='0.6'/%3E%3C/svg%3E"
    },
    {
      id: 2,
      title: 'Book Club: "The Silent Observer"',
      description: 'Dive into a thrilling mystery novel with fellow book enthusiasts. Share your thoughts and theories in a lively discussion.',
      rsvp: false,
      image: "data:image/svg+xml,%3Csvg width='240' height='160' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='240' height='160' fill='%23fef3c7'/%3E%3Ctext x='120' y='70' font-family='Georgia' font-size='42' fill='%23854d0e' text-anchor='middle'%3EBOOK%3C/text%3E%3Ctext x='120' y='110' font-family='Georgia' font-size='42' fill='%23854d0e' text-anchor='middle'%3ECLUB%3C/text%3E%3Ctext x='120' y='140' font-family='Arial' font-size='10' fill='%23a16207' text-anchor='middle'%3EMYSTERY SAFE FOR WORK%3C/text%3E%3C/svg%3E"
    },
    {
      id: 3,
      title: 'Photography Walk in Central Park',
      description: 'Capture the beauty of Central Park with a guided photography walk. All skill levels are welcome.',
      rsvp: false,
      image: "data:image/svg+xml,%3Csvg width='240' height='160' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3ClinearGradient id='grad1' x1='0%25' y1='0%25' x2='0%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%2316a34a;stop-opacity:1' /%3E%3Cstop offset='100%25' style='stop-color:%23166534;stop-opacity:1' /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='240' height='160' fill='url(%23grad1)'/%3E%3Cpath d='M120,140 L100,120 L80,140 Z' fill='%23064e3b' opacity='0.5'/%3E%3Cpath d='M180,140 L160,110 L140,140 Z' fill='%23064e3b' opacity='0.5'/%3E%3Cellipse cx='60' cy='40' rx='20' ry='15' fill='%23fef08a' opacity='0.7'/%3E%3Cpath d='M120,100 Q100,80 120,60 Q140,80 120,100 Z' fill='%2322c55e'/%3E%3Cellipse cx='120' cy='130' rx='80' ry='10' fill='%23064e3b' opacity='0.3'/%3E%3C/svg%3E"
    },
    {
      id: 4,
      title: 'Coding Workshop for Beginners',
      description: 'Learn the basics of coding in a hands-on workshop designed for beginners. No prior experience required.',
      rsvp: false,
      image: "data:image/svg+xml,%3Csvg width='240' height='160' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='240' height='160' fill='%231a1a1a'/%3E%3Crect x='20' y='20' width='200' height='120' rx='5' fill='%23166534'/%3E%3Crect x='30' y='30' width='180' height='100' fill='%23052e16'/%3E%3Ctext x='40' y='50' font-family='monospace' font-size='10' fill='%2322c55e'%3E%3E const greeting =%3C/text%3E%3Ctext x='40' y='65' font-family='monospace' font-size='10' fill='%23fbbf24'%3E  'Hello World';%3C/text%3E%3Ctext x='40' y='80' font-family='monospace' font-size='10' fill='%2322c55e'%3Econsole.log%3C/text%3E%3Ctext x='40' y='95' font-family='monospace' font-size='10' fill='%23fbbf24'%3E  (greeting);%3C/text%3E%3Crect x='35' y='105' width='8' height='12' fill='%2322c55e'/%3E%3C/svg%3E"
    }
  ]);

  const handleRSVP = (eventId) => {
    setEvents(events.map(event =>
      event.id === eventId ? { ...event, rsvp: !event.rsvp } : event
    ));
  };

  return (
    <>
      <Navbar />
      <div className={styles.container}>
        {/* Community Header */}
        <div className={styles.communityHeader}>
          <h1 className={styles.communityTitle}>Community Events</h1>
          <p className={styles.communityDescription}>
            A vibrant community for tech lovers to discuss the latest trends, gadgets, and innovations. Join us to share your insights and connect with fellow enthusiasts.
          </p>
        </div>

        {/* Tabs */}
        <div className={styles.tabs}>
          <Link href="/community-profile-user-pov" className={styles.tab}>
            Posts
          </Link>
          <Link href="/community-profile-user-pov/members" className={styles.tab}>
            Members
          </Link>
          <Link href="/community-profile-user-pov/events" className={`${styles.tab} ${styles.active}`}>
            Events
          </Link>
          <Link href="/community-profile-user-pov/about" className={styles.tab}>
            About
          </Link>
        </div>

        {/* Events List */}
        <div className={styles.eventsList}>
          {events.map((event) => (
            <div key={event.id} className={styles.eventCard}>
              <div className={styles.eventContent}>
                <h2 className={styles.eventTitle}>{event.title}</h2>
                <p className={styles.eventDescription}>{event.description}</p>
                <button 
                  className={`${styles.rsvpButton} ${event.rsvp ? styles.going : ''}`}
                  onClick={() => handleRSVP(event.id)}
                >
                  <span className={styles.iconCalendar}>{event.rsvp ? '✓' : '📅'}</span>
                  {event.rsvp ? 'Going' : 'RSVP'}
                </button>
              </div>
              <img src={event.image} alt={event.title} className={styles.eventImage} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}