// pages/premium/chat-themes.js
import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import Button from '../../components/Button';

export default function ChatThemes() {
  const [selectedTheme, setSelectedTheme] = useState('Ocean Breeze');

  const themes = [
    { 
      id: 1, 
      name: 'Ocean Breeze', 
      image: 'https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=400&h=400&fit=crop',
      gradient: 'linear-gradient(180deg, rgba(44, 95, 111, 0.7) 0%, rgba(26, 61, 74, 0.9) 100%)',
      free: true 
    },
    { 
      id: 2, 
      name: 'Midnight Sky', 
      image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=400&h=400&fit=crop',
      gradient: 'linear-gradient(180deg, rgba(26, 31, 53, 0.7) 0%, rgba(15, 20, 25, 0.9) 100%)',
      free: true 
    },
    { 
      id: 3, 
      name: 'Forest Whisper', 
      image: 'https://images.unsplash.com/photo-1511497584788-876760111969?w=400&h=400&fit=crop',
      gradient: 'linear-gradient(180deg, rgba(31, 58, 44, 0.7) 0%, rgba(15, 31, 22, 0.9) 100%)',
      free: true 
    },
    { 
      id: 4, 
      name: 'Neon City', 
      image: 'https://images.unsplash.com/photo-1514539079130-25950c84af65?w=400&h=400&fit=crop',
      gradient: 'linear-gradient(180deg, rgba(26, 26, 46, 0.7) 0%, rgba(15, 15, 26, 0.9) 100%)',
      free: true 
    },
    { 
      id: 5, 
      name: 'Desert Mirage', 
      image: 'https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=400&h=400&fit=crop',
      gradient: 'linear-gradient(180deg, rgba(74, 63, 53, 0.7) 0%, rgba(42, 31, 21, 0.9) 100%)',
      free: true 
    },
    { 
      id: 6, 
      name: 'Aurora Borealis', 
      image: 'https://images.unsplash.com/photo-1579033461380-adb47c3eb938?w=400&h=400&fit=crop',
      gradient: 'linear-gradient(180deg, rgba(107, 114, 128, 0.7) 0%, rgba(75, 85, 99, 0.9) 100%)',
      free: true 
    },
    { 
      id: 7, 
      name: 'Cherry Blossom', 
      image: 'https://images.unsplash.com/photo-1522383225653-ed111181a951?w=400&h=400&fit=crop',
      gradient: 'linear-gradient(180deg, rgba(254, 202, 202, 0.5) 0%, rgba(252, 165, 165, 0.7) 100%)',
      free: true 
    },
    { 
      id: 8, 
      name: 'Butterfly', 
      image: 'https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?w=400&h=400&fit=crop',
      gradient: 'linear-gradient(180deg, rgba(59, 47, 79, 0.7) 0%, rgba(42, 31, 63, 0.9) 100%)',
      free: true 
    },
    { 
      id: 9, 
      name: 'Colorful', 
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop',
      gradient: 'linear-gradient(180deg, rgba(253, 230, 138, 0.5) 0%, rgba(252, 211, 77, 0.7) 100%)',
      free: true 
    },
  ];

  const selectedThemeData = themes.find(t => t.name === selectedTheme);

  return (
    <>
      <style jsx>{`
        .pageWrapper {
          min-height: 100vh;
          background: #F0F0FF;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 60px 40px;
        }

        .header {
          text-align: center;
          margin-bottom: 60px;
        }

        .title {
          font-size: 42px;
          font-weight: 700;
          color: #1F2937;
          margin-bottom: 12px;
        }

        .subtitle {
          font-size: 15px;
          color: #6B7280;
          line-height: 1.6;
        }

        .mainContent {
          display: grid;
          grid-template-columns: 1fr 1.3fr;
          gap: 60px;
          align-items: start;
        }

        /* Premium Themes Section */
        .themesSection {
          
        }

        .sectionTitle {
          font-size: 20px;
          font-weight: 700;
          color: #1F2937;
          margin-bottom: 24px;
        }

        .themesGrid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
        }

        .themeCard {
          position: relative;
          border-radius: 12px;
          overflow: hidden;
          cursor: pointer;
          aspect-ratio: 1;
          transition: all 0.2s;
          border: 3px solid transparent;
        }

        .themeCard:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
        }

        .themeCard.active {
          border-color: #8B5CF6;
        }

        .themeImage {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .themeName {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          background: linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent);
          color: white;
          padding: 12px;
          font-size: 13px;
          font-weight: 600;
        }

        /* Theme Preview Section */
        .previewSection {
          position: sticky;
          top: 100px;
        }

        .previewTitle {
          font-size: 20px;
          font-weight: 700;
          color: #1F2937;
          margin-bottom: 24px;
        }

        .previewCard {
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          position: relative;
        }

        .chatPreview {
          height: 450px;
          background-size: cover;
          background-position: center;
          padding: 24px;
          display: flex;
          flex-direction: column;
          gap: 16px;
          position: relative;
        }

        .chatBackground {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          z-index: 0;
        }

        .chatOverlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 1;
        }

        .chatMessages {
          position: relative;
          z-index: 2;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .message {
          max-width: 75%;
          padding: 12px 16px;
          border-radius: 16px;
          font-size: 14px;
          line-height: 1.5;
          display: flex;
          align-items: flex-end;
          gap: 8px;
        }

        .messageLeft {
          align-self: flex-start;
          background: white;
          color: #1F2937;
          border-bottom-left-radius: 4px;
        }

        .messageRight {
          align-self: flex-end;
          background: #8B5CF6;
          color: white;
          border-bottom-right-radius: 4px;
          flex-direction: row-reverse;
        }

        .avatar {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: #D1D5DB;
          flex-shrink: 0;
        }

        .avatarImage {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          object-fit: cover;
        }

        .themeInfo {
          position: absolute;
          bottom: 24px;
          left: 24px;
          right: 24px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          z-index: 3;
        }

        .themeInfoText h3 {
          font-size: 20px;
          font-weight: 700;
          color: white;
          margin-bottom: 4px;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
        }

        .themeInfoText p {
          font-size: 14px;
          color: white;
          font-weight: 600;
          margin: 0;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
        }

        /* Responsive */
        @media (max-width: 968px) {
          .mainContent {
            grid-template-columns: 1fr;
            gap: 40px;
          }

          .previewSection {
            position: relative;
            top: 0;
          }

          .themesGrid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 640px) {
          .container {
            padding: 40px 20px;
          }

          .title {
            font-size: 32px;
          }

          .themesGrid {
            grid-template-columns: repeat(2, 1fr);
            gap: 12px;
          }
        }
      `}</style>

      <div className="pageWrapper">
        <Navbar />

        <div className="container">
          {/* Header */}
          <div className="header">
            <h1 className="title">Chat Themes</h1>
            <p className="subtitle">
              Personalize your chat experience with unique themes. Click a theme to preview.
            </p>
          </div>

          {/* Main Content */}
          <div className="mainContent">
            {/* Premium Themes */}
            <div className="themesSection">
              <h2 className="sectionTitle">Premium Themes</h2>
              <div className="themesGrid">
                {themes.map((theme) => (
                  <div
                    key={theme.id}
                    className={`themeCard ${selectedTheme === theme.name ? 'active' : ''}`}
                    onClick={() => setSelectedTheme(theme.name)}
                  >
                    <img 
                      className="themeImage"
                      src={theme.image}
                      alt={theme.name}
                    />
                    <div className="themeName">{theme.name}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Theme Preview */}
            <div className="previewSection">
              <h2 className="previewTitle">Theme Preview</h2>
              <div className="previewCard">
                <div className="chatPreview">
                  {/* Background Image */}
                  <img 
                    className="chatBackground"
                    src={selectedThemeData?.image}
                    alt={selectedThemeData?.name}
                  />
                  
                  {/* Gradient Overlay */}
                  <div 
                    className="chatOverlay"
                    style={{ background: selectedThemeData?.gradient }}
                  />

                  {/* Chat Messages */}
                  <div className="chatMessages">
                    <div className="message messageLeft">
                      <div className="avatar"></div>
                      <div>Hey, have you seen the new themes in the app? They look amazing!</div>
                    </div>
                    <div className="message messageRight">
                      <div className="avatar">
                        <img className="avatarImage" src="https://i.pravatar.cc/150?img=5" alt="User" />
                      </div>
                      <div>Oh yeah! I'm checking them out now. The "{selectedTheme}" one is so calming.</div>
                    </div>
                    <div className="message messageLeft">
                      <div className="avatar"></div>
                      <div>Right?! It makes me feel like I'm at the beach. What do you think?</div>
                    </div>
                  </div>

                  {/* Theme Info - Floating */}
                  <div className="themeInfo">
                    <div className="themeInfoText">
                      <h3>{selectedTheme}</h3>
                      <p>{selectedThemeData?.free ? 'Free' : 'Premium'}</p>
                    </div>
                    <Button variant="primary" size="medium">
                      Buy
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}