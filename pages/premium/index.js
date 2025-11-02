// pages/premium.js
import React from 'react';
import Navbar from '../../components/Navbar';
import Button from '../../components/Button';

export default function Premium() {
  return (
    <>
      <style jsx>{`
        .pageWrapper {
          min-height: 100vh;
          background: #F0F0FF;
        }

        .container {
          max-width: 680px;
          margin: 0 auto;
          padding: 80px 20px;
        }

        /* Content */
        .content {
          text-align: center;
        }

        .title {
          font-size: 48px;
          font-weight: 700;
          background: linear-gradient(90deg, #8B5CF6 0%, #A78BFA 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 16px;
        }

        .subtitle {
          font-size: 16px;
          color: #6B7280;
          line-height: 1.6;
          margin-bottom: 60px;
        }

        /* Features */
        .features {
          display: flex;
          flex-direction: column;
          gap: 20px;
          margin-bottom: 48px;
        }

        .featureCard {
          display: flex;
          align-items: center;
          gap: 20px;
          padding: 24px 28px;
          background: white;
          border-radius: 12px;
          text-align: left;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
        }

        .featureIcon {
          width: 56px;
          height: 56px;
          background: #FEF2F2;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          color: #F87171;
        }

        .featureCard:nth-child(2) .featureIcon {
          background: #F3E8FF;
          color: #C084FC;
        }

        .featureContent {
          flex: 1;
        }

        .featureTitle {
          font-size: 17px;
          font-weight: 600;
          color: #1F2937;
          margin-bottom: 4px;
        }

        .featureDesc {
          font-size: 14px;
          color: #6B7280;
          line-height: 1.5;
          margin: 0;
        }

        /* Buttons */
        .buttonGroup {
          display: flex;
          flex-direction: column;
          gap: 16px;
          margin-bottom: 24px;
        }

        /* Footer Text */
        .footerText {
          font-size: 12px;
          color: #9CA3AF;
          line-height: 1.6;
          margin: 0;
        }

        /* Responsive */
        @media (max-width: 768px) {
          .container {
            padding: 60px 20px;
          }

          .title {
            font-size: 36px;
          }

          .featureCard {
            flex-direction: column;
            text-align: center;
          }
        }
      `}</style>

      <div className="pageWrapper">
        {/* Navbar */}
        <Navbar />

        {/* Main Content */}
        <div className="container">
          <div className="content">
            {/* Title */}
            <h1 className="title">ConnectHub Premium</h1>
            
            {/* Subtitle */}
            <p className="subtitle">
              Unlock exclusive features to enhance your ConnectHub<br />
              experience.
            </p>

            {/* Features */}
            <div className="features">
              {/* Feature 1 - Post Events */}
              <div className="featureCard">
                <div className="featureIcon">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                    <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2"/>
                    <line x1="3" y1="9" x2="21" y2="9" stroke="currentColor" strokeWidth="2"/>
                    <line x1="8" y1="2" x2="8" y2="6" stroke="currentColor" strokeWidth="2"/>
                    <line x1="16" y1="2" x2="16" y2="6" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                </div>
                <div className="featureContent">
                  <h3 className="featureTitle">Post Events</h3>
                  <p className="featureDesc">
                    Create and share events with your community.
                  </p>
                </div>
              </div>

              {/* Feature 2 - Access Free Chat Themes */}
              <div className="featureCard">
                <div className="featureIcon">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                    <circle cx="12" cy="12" r="3" fill="currentColor"/>
                    <circle cx="12" cy="5" r="1.5" fill="currentColor"/>
                    <circle cx="12" cy="19" r="1.5" fill="currentColor"/>
                    <circle cx="5" cy="12" r="1.5" fill="currentColor"/>
                    <circle cx="19" cy="12" r="1.5" fill="currentColor"/>
                  </svg>
                </div>
                <div className="featureContent">
                  <h3 className="featureTitle">Access Free Chat Themes</h3>
                  <p className="featureDesc">
                    Personalize your chats with a variety of exclusive themes.
                  </p>
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="buttonGroup">
              <Button 
                variant="primary" 
                size="medium" 
                fullWidth
              >
                Upgrade to Premium – $9.99/mo
              </Button>
              
              <Button 
                variant="secondary" 
                size="medium" 
                fullWidth
              >
                Buy a Theme
              </Button>
            </div>

            {/* Footer Text */}
            <p className="footerText">
              Chat themes can also be purchased individually without a premium<br />
              subscription. By upgrading, you agree to our Terms of Service.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}