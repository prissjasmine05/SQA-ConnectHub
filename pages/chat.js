import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import Navbar from '../components/Navbar';
import styles from './chat.module.css';

export default function Chat() {
  const router = useRouter();
  const { user: targetUserId } = router.query;
  const messagesEndRef = useRef(null);
  
  const [currentUser, setCurrentUser] = useState(null);
  const [targetUser, setTargetUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);

  useEffect(() => {
    fetchCurrentUser();
    fetchConversations();
    
    if (targetUserId) {
      fetchTargetUser(targetUserId);
      fetchMessages(targetUserId);
    }
  }, [targetUserId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const fetchCurrentUser = async () => {
    try {
      // Try to get token from localStorage first, then fallback to cookie-based endpoint
      let token = localStorage.getItem('token');
      let response;
      
      if (token) {
        response = await fetch('/api/auth/verify', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
      } else {
        // Fallback to cookie-based authentication
        response = await fetch('/api/auth/me', {
          credentials: 'include'
        });
      }
      
      if (response.ok) {
        const data = await response.json();
        setCurrentUser(data.user);
      } else {
        router.push('/');
      }
    } catch (error) {
      console.error('Error fetching current user:', error);
      router.push('/');
    }
  };

  const fetchTargetUser = async (userId) => {
    try {
      let headers = {};
      const token = localStorage.getItem('token');
      
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
      
      const response = await fetch(`/api/user/${userId}`, {
        headers,
        credentials: 'include'
      });
      
      if (response.ok) {
        const data = await response.json();
        setTargetUser(data.user);
      }
    } catch (error) {
      console.error('Error fetching target user:', error);
    }
  };

  const fetchConversations = async () => {
    try {
      let headers = {};
      const token = localStorage.getItem('token');
      
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
      
      const response = await fetch('/api/messages/conversations', {
        headers,
        credentials: 'include'
      });
      
      if (response.ok) {
        const data = await response.json();
        setConversations(data.conversations);
      }
    } catch (error) {
      console.error('Error fetching conversations:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchMessages = async (userId) => {
    try {
      let headers = {};
      const token = localStorage.getItem('token');
      
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
      
      const response = await fetch(`/api/messages/${userId}`, {
        headers,
        credentials: 'include'
      });
      
      if (response.ok) {
        const data = await response.json();
        setMessages(data.messages);
        setSelectedConversation(userId);
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !targetUserId || sending) return;

    setSending(true);
    
    try {
      let headers = {
        'Content-Type': 'application/json'
      };
      const token = localStorage.getItem('token');
      
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
      
      const response = await fetch('/api/messages/send', {
        method: 'POST',
        headers,
        credentials: 'include',
        body: JSON.stringify({
          recipientId: targetUserId,
          content: newMessage.trim()
        })
      });

      if (response.ok) {
        const data = await response.json();
        setMessages(prev => [...prev, data.message]);
        setNewMessage('');
        
        // Update conversations list
        fetchConversations();
      }
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setSending(false);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const selectConversation = (userId) => {
    router.push(`/chat?user=${userId}`);
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now - date;
    
    if (diff < 24 * 60 * 60 * 1000) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else {
      return date.toLocaleDateString();
    }
  };

  if (loading) {
    return (
      <div className={styles.mainContainer}>
        <Navbar isLoggedIn={true} variant="default" />
        <div className={styles.loadingContainer}>
          <p>Loading chat...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.mainContainer}>
      <Navbar isLoggedIn={!!currentUser} variant="default" />
      
      <div className={styles.chatContainer}>
        {/* Conversations Sidebar */}
        <div className={styles.sidebar}>
          <div className={styles.sidebarHeader}>
            <h2>Messages</h2>
            <button 
              className={styles.backBtn}
              onClick={() => router.push('/main-page')}
            >
              ← Back
            </button>
          </div>
          
          <div className={styles.conversationsList}>
            {conversations.length === 0 ? (
              <div className={styles.noConversations}>
                <p>No conversations yet</p>
                <small>Start a conversation by visiting someone's profile!</small>
              </div>
            ) : (
              conversations.map((conversation) => (
                <div
                  key={conversation._id}
                  className={`${styles.conversationItem} ${
                    selectedConversation === conversation._id ? styles.active : ''
                  }`}
                  onClick={() => selectConversation(conversation._id)}
                >
                  <div className={styles.conversationAvatar}>
                    {conversation.avatar ? (
                      <img src={conversation.avatar} alt={conversation.name} />
                    ) : (
                      <div className={styles.avatarPlaceholder}>
                        {conversation.name?.charAt(0) || 'U'}
                      </div>
                    )}
                  </div>
                  <div className={styles.conversationInfo}>
                    <div className={styles.conversationName}>
                      {conversation.name}
                    </div>
                    <div className={styles.lastMessage}>
                      {conversation.lastMessage || 'Start a conversation'}
                    </div>
                  </div>
                  <div className={styles.conversationTime}>
                    {conversation.lastMessageTime && formatTime(conversation.lastMessageTime)}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Chat Area */}
        <div className={styles.chatArea}>
          {targetUser ? (
            <>
              {/* Chat Header */}
              <div className={styles.chatHeader}>
                <div className={styles.chatUser}>
                  <div className={styles.chatAvatar}>
                    {targetUser.avatar ? (
                      <img src={targetUser.avatar} alt={targetUser.fullName} />
                    ) : (
                      <div className={styles.avatarPlaceholder}>
                        {targetUser.fullName?.charAt(0) || 'U'}
                      </div>
                    )}
                  </div>
                  <div className={styles.chatUserInfo}>
                    <h3>{targetUser.fullName || targetUser.fullname}</h3>
                    <p>@{targetUser.username}</p>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className={styles.messagesContainer}>
                {messages.length === 0 ? (
                  <div className={styles.noMessages}>
                    <p>No messages yet</p>
                    <small>Start the conversation!</small>
                  </div>
                ) : (
                  messages.map((message) => (
                    <div
                      key={message._id}
                      className={`${styles.message} ${
                        message.sender === currentUser?._id ? styles.sent : styles.received
                      }`}
                    >
                      <div className={styles.messageContent}>
                        {message.content}
                      </div>
                      <div className={styles.messageTime}>
                        {formatTime(message.createdAt)}
                      </div>
                    </div>
                  ))
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Message Input */}
              <form onSubmit={sendMessage} className={styles.messageForm}>
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type your message..."
                  className={styles.messageInput}
                  disabled={sending}
                />
                <button
                  type="submit"
                  disabled={!newMessage.trim() || sending}
                  className={styles.sendButton}
                >
                  {sending ? '⏳' : '📤'}
                </button>
              </form>
            </>
          ) : (
            <div className={styles.selectChat}>
              <div className={styles.selectChatContent}>
                <h3>Welcome to Messages</h3>
                <p>Select a conversation from the sidebar to start chatting</p>
                <p>Or visit someone's profile to start a new conversation!</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
