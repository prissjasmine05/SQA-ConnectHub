// pages/setting-to-community/create-community.js
import React, { useState } from 'react';
import Button from '../../components/Button';

export default function CreateCommunity() {
  const [formData, setFormData] = useState({
    communityName: '',
    focusTheme: '',
    description: '',
    targetMembers: '',
    location: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <>
      <style jsx>{`
        .pageWrapper {
          min-height: 100vh;
          background: #E8E8F5;
        }

        .container {
          max-width: 600px;
          margin: 0 auto;
          padding: 60px 20px 80px;
        }

        .title {
          font-size: 32px;
          font-weight: 700;
          color: #1F2937;
          margin-bottom: 40px;
          text-align: center;
        }

        .form {
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
          padding: 12px 16px;
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

        .textarea {
          padding: 12px 16px;
          border: 1px solid #D1D5DB;
          border-radius: 8px;
          font-size: 14px;
          color: #1F2937;
          background: white;
          resize: vertical;
          min-height: 100px;
          font-family: inherit;
          transition: all 0.2s;
        }

        .textarea::placeholder {
          color: #9CA3AF;
        }

        .textarea:focus {
          outline: none;
          border-color: #8B5CF6;
          box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.1);
        }

        .buttonWrapper {
          margin-top: 16px;
        }

        .footer {
          text-align: center;
          margin-top: 20px;
        }

        .footerText {
          font-size: 13px;
          color: #6B7280;
        }

        .footerLink {
          color: #8B5CF6;
          text-decoration: none;
          font-weight: 600;
        }

        .footerLink:hover {
          text-decoration: underline;
        }

        /* Responsive */
        @media (max-width: 640px) {
          .container {
            padding: 40px 20px 60px;
          }

          .title {
            font-size: 28px;
            margin-bottom: 32px;
          }
        }
      `}</style>

      <div className="pageWrapper">

        <div className="container">
          <h1 className="title">Create your community</h1>

          <form className="form" onSubmit={handleSubmit}>
            {/* Community Name */}
            <div className="formGroup">
              <label className="label">Community Name</label>
              <input
                type="text"
                name="communityName"
                className="input"
                placeholder="Enter community name"
                value={formData.communityName}
                onChange={handleChange}
              />
            </div>

            {/* Focus/Main Theme */}
            <div className="formGroup">
              <label className="label">Focus/Main Theme</label>
              <input
                type="text"
                name="focusTheme"
                className="input"
                placeholder="Enter focus/main theme"
                value={formData.focusTheme}
                onChange={handleChange}
              />
            </div>

            {/* Description */}
            <div className="formGroup">
              <label className="label">Description</label>
              <textarea
                name="description"
                className="textarea"
                placeholder=""
                value={formData.description}
                onChange={handleChange}
              />
            </div>

            {/* Target Members */}
            <div className="formGroup">
              <label className="label">Target Members</label>
              <input
                type="text"
                name="targetMembers"
                className="input"
                placeholder="Describe your target members"
                value={formData.targetMembers}
                onChange={handleChange}
              />
            </div>

            {/* Location */}
            <div className="formGroup">
              <label className="label">Location (optional)</label>
              <input
                type="text"
                name="location"
                className="input"
                placeholder="Enter location"
                value={formData.location}
                onChange={handleChange}
              />
            </div>

            {/* Email */}
            <div className="formGroup">
              <label className="label">Email for Community Contact</label>
              <input
                type="email"
                name="email"
                className="input"
                placeholder="Enter email"
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
                placeholder="Enter password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            {/* Confirm Password */}
            <div className="formGroup">
              <label className="label">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                className="input"
                placeholder="Confirm password"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </div>

            {/* Submit Button */}
            <div className="buttonWrapper">
              <Button variant="primary" size="medium" fullWidth type="submit">
                Save
              </Button>
            </div>

            {/* Footer */}
            <div className="footer">
              <p className="footerText">
                Already have a community?{' '}
                <a href="/setting-to-community/login-community" className="footerLink">
                  Log in
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}