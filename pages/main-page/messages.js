import { useState } from 'react';
import Head from 'next/head';
import Navbar from '../../components/Navbar';
import styles from './Messages.module.css';

export default function Messages() {
  const [selectedChat, setSelectedChat] = useState(1);

  const chats = [
    { id: 1, name: 'Sophia Clark', lastMessage: 'Hey! How are you doing?', time: '2m', avatar: 'https://i.pravatar.cc/150?img=1', online: true },
    { id: 2, name: 'Group Chat: Book Club', lastMessage: 'You: Can\'t wait for our next meeting!', time: '2h', avatar: 'https://i.pravatar.cc/150?img=10', isGroup: true },
    { id: 3, name: 'Ethan Bennett', lastMessage: 'Sounds good! See you then.', time: '1d', avatar: 'https://i.pravatar.cc/150?img=3' },
    { id: 4, name: 'Olivia Carter', lastMessage: 'Photo', time: '3d', avatar: 'https://i.pravatar.cc/150?img=5', online: true },
    { id: 5, name: 'Hiking Enthusiasts', lastMessage: 'Let\'s plan the next one!', time: '1w', avatar: 'https://i.pravatar.cc/150?img=8', isGroup: true },
    { id: 6, name: 'Liam Davis', lastMessage: 'Check this out.', time: '2w', avatar: 'https://i.pravatar.cc/150?img=12' }
  ];

  const messages = [
    { id: 1, sender: 'other', text: 'Hey! How are you doing?', time: 'Sophia Clark, 10:30 AM' },
    { id: 2, sender: 'me', text: 'I\'m good, thanks! Just finished reading a great book. How about you?', time: 'You, 10:31 AM' },
    { id: 3, sender: 'other', text: 'That\'s awesome! I\'m planning a hike this weekend. Interested?', time: 'Sophia Clark, 10:32 AM' }
  ];

  return (
    <>
      <Head>
        <title>Messages - ConnectHub</title>
      </Head>

      <Navbar isLoggedIn={true} />

      <main className={styles.messagesContainer}>
        <aside className={styles.chatSidebar}>
          <div className={styles.sidebarHeader}>
            <h2>Chats</h2>
          </div>

          <div className={styles.searchBox}>
            <input type="text" placeholder="Search chats" />
          </div>

          <div className={styles.chatList}>
            {chats.map((chat) => (
              <div
                key={chat.id}
                className={`${styles.chatItem} ${selectedChat === chat.id ? styles.active : ''}`}
                onClick={() => setSelectedChat(chat.id)}
              >
                <div className={styles.chatAvatar}>
                  <img src={chat.avatar} alt={chat.name} />
                  {chat.online && <span className={styles.onlineIndicator}></span>}
                </div>
                <div className={styles.chatInfo}>
                  <div className={styles.chatTop}>
                    <h4>{chat.name}</h4>
                    <span className={styles.chatTime}>{chat.time}</span>
                  </div>
                  <p>{chat.lastMessage}</p>
                </div>
              </div>
            ))}
          </div>
        </aside>

        <section className={styles.chatMain}>
          <div className={styles.chatHeader}>
            <div className={styles.chatHeaderInfo}>
              <img src="https://i.pravatar.cc/150?img=1" alt="Sophia Clark" />
              <div>
                <h3>Sophia Clark</h3>
                <span className={styles.onlineStatus}>Active now</span>
              </div>
            </div>
            <div className={styles.chatHeaderActions}>
              <button>📞</button>
              <button>📹</button>
              <button>⋮</button>
            </div>
          </div>

          <div className={styles.chatMessages}>
            {messages.map((message) => (
              <div
                key={message.id}
                className={`${styles.message} ${message.sender === 'me' ? styles.messageMe : styles.messageOther}`}
              >
                {message.sender === 'other' && (
                  <img src="https://i.pravatar.cc/150?img=1" alt="Sophia" className={styles.messageAvatar} />
                )}
                <div className={styles.messageContent}>
                  <div className={styles.messageBubble}>
                    <p>{message.text}</p>
                  </div>
                  <span className={styles.messageTime}>{message.time}</span>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.chatInput}>
            <button className={styles.attachBtn}>📎</button>
            <button className={styles.emojiBtn}>😊</button>
            <input type="text" placeholder="Type a message..." />
            <button className={styles.sendBtn}>➤</button>
          </div>
        </section>
      </main>
    </>
  );
}