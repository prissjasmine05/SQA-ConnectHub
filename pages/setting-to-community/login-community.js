// pages/setting-to-community/login-community.js
import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import Button from '../../components/Button';

export default function LoginCommunity() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login submitted:', formData);
  };

  return (
    <>
      <style jsx>{`
        .pageWrapper {
          min-height: 100vh;
          background: #E8E8F5;
        }

        .container {
          max-width: 500px;
          margin: 0 auto;
          padding: 100px 20px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .title {
          font-size: 32px;
          font-weight: 700;
          color: #1F2937;
          margin-bottom: 50px;
          text-align: center;
        }

        .form {
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .formGroup {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .label {
          font-size: 14px;
          font-weight: 600;
          color: #1F2937;
        }

        .input {
          padding: 14px 16px;
          border: 1px solid #D1D5DB;
          border-radius: 8px;
          font-size: 14px;
          color: #1F2937;
          background: white;
          transition: all 0.2s;
        }

        .input::placeholder {
          color: #9CA3AF;
        }

        .input:focus {
          outline: none;
          border-color: #8B5CF6;
          box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.1);
        }

        .buttonWrapper {
          margin-top: 8px;
        }

        .footer {
          text-align: center;
          margin-top: 24px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .footerText {
          font-size: 14px;
          color: #6B7280;
        }

        .footerLink {
          color: #6B7280;
          text-decoration: none;
          font-weight: 600;
        }

        .footerLink:hover {
          color: #8B5CF6;
          text-decoration: underline;
        }

        .registerLink {
          color: #8B5CF6;
          text-decoration: none;
          font-weight: 600;
        }

        .registerLink:hover {
          text-decoration: underline;
        }

        /* Responsive */
        @media (max-width: 640px) {
          .container {
            padding: 80px 20px;
          }

          .title {
            font-size: 28px;
            margin-bottom: 40px;
          }
        }
      `}</style>

      <div className="pageWrapper">
        <Navbar />

        <div className="container">
          <h1 className="title">Log in to Community</h1>

          <form className="form" onSubmit={handleSubmit}>
            {/* Email or Username */}
            <div className="formGroup">
              <label className="label">Email or Community Username</label>
              <input
                type="text"
                name="email"
                className="input"
                placeholder="Enter your email or username"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            {/* Password */}
            <div className="formGroup">
              <label className="label">Password</label>
              <input
                type="password"
                name="password"
                className="input"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            {/* Submit Button */}
            <div className="buttonWrapper">
              <Button variant="primary" size="medium" fullWidth type="submit">
                Log In
              </Button>
            </div>

            {/* Footer */}
            <div className="footer">
              <p className="footerText">
                Don't have a community account?{' '}
                <a href="/setting-to-community/create-community" className="registerLink">
                  Register here
                </a>
              </p>
              <a href="/forgot-password" className="footerLink">
                Forgot your password?
              </a>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}