// pages/change-to-community.js
import React from 'react';
import Navbar from '../../components/Navbar';
import Button from '../../components/Button';

export default function ChangeToCommunity() {
  return (
    <>
      <style jsx>{`
        .pageWrapper {
          min-height: 100vh;
          background: #E8E8F5;
        }

        .container {
          max-width: 800px;
          margin: 0 auto;
          padding: 120px 20px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .title {
          font-size: 40px;
          font-weight: 700;
          color: #1F2937;
          margin-bottom: 60px;
          text-align: center;
        }

        .card {
          background: white;
          border-radius: 16px;
          padding: 48px 60px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
          width: 100%;
          max-width: 600px;
        }

        .question {
          font-size: 18px;
          font-weight: 600;
          color: #1F2937;
          text-align: center;
          margin-bottom: 32px;
        }

        .buttonGroup {
          display: flex;
          gap: 16px;
          justify-content: center;
        }

        /* Responsive */
        @media (max-width: 640px) {
          .container {
            padding: 80px 20px;
          }

          .title {
            font-size: 32px;
            margin-bottom: 40px;
          }

          .card {
            padding: 36px 24px;
          }

          .buttonGroup {
            flex-direction: column;
            width: 100%;
          }

          .buttonGroup > * {
            width: 100%;
          }
        }
      `}</style>

      <div className="pageWrapper">
        <Navbar />

        <div className="container">
          <h1 className="title">Change to Community Account</h1>

          <div className="card">
            <p className="question">Do you already have a community account?</p>

            <div className="buttonGroup">
              <Button variant="secondary" size="medium">
                Yes, I already have one
              </Button>

              <Button variant="primary" size="medium">
                No, I don't have one
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}