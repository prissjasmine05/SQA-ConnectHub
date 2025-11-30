import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../../contexts/AuthContext';
import styles from './changeaccount.module.css';

export default function ChangeAccount() {
  const router = useRouter();
  const { user, loading, checkAuth } = useAuth();
  const [pageLoading, setPageLoading] = useState(true);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [savedAccounts, setSavedAccounts] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [addAccountForm, setAddAccountForm] = useState({
    email: '',
    password: ''
  });
  const [isVerifying, setIsVerifying] = useState(false);
  const [verifyError, setVerifyError] = useState('');



  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push('/create-acc');
        return;
      }
      
      // Load saved accounts from localStorage
      loadSavedAccounts(user._id);
      setPageLoading(false);
    }
  }, [user, loading, router]);

  const handleLogout = async () => {
    if (!confirm('Are you sure you want to logout from this account?')) {
      return;
    }

    setIsLoggingOut(true);
    try {
      // Call logout API
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include'
      });

      if (response.ok) {
        // Redirect to login page
        router.push('/create-acc');
      } else {
        alert('Logout failed. Please try again.');
      }
    } catch (error) {
      console.error('Logout error:', error);
      alert('Logout failed. Please try again.');
    } finally {
      setIsLoggingOut(false);
    }
  };

  const loadSavedAccounts = (currentUserId) => {
    try {
      const saved = localStorage.getItem('ch_saved_accounts');
      if (saved) {
        const accounts = JSON.parse(saved);
        // Filter out current user
        const otherAccounts = accounts.filter(acc => acc.id !== currentUserId);
        setSavedAccounts(otherAccounts);
      }
    } catch (error) {
      console.error('Error loading saved accounts:', error);
    }
  };

  const saveCurrentAccount = async () => {
    if (!user) return;
    
    try {
      // Get current token from session
      const tokenResponse = await fetch('/api/auth/current-token', {
        method: 'GET',
        credentials: 'include'
      });

      let currentToken = null;
      if (tokenResponse.ok) {
        const tokenData = await tokenResponse.json();
        currentToken = tokenData.token;
      }
      
      const saved = localStorage.getItem('ch_saved_accounts');
      let accounts = saved ? JSON.parse(saved) : [];
      
      const currentAccount = {
        id: user._id,
        fullName: user.fullName,
        username: user.username,
        email: user.email,
        profilePicture: user.profilePicture,
        accountType: user.accountType,
        token: currentToken, // Include token for current account
        savedAt: new Date().toISOString()
      };
      
      // Remove if already exists
      accounts = accounts.filter(acc => 
        acc.id !== currentAccount.id && 
        acc.email !== currentAccount.email
      );
      
      // Add to beginning
      accounts.unshift(currentAccount);
      
      // Keep max 5 accounts
      accounts = accounts.slice(0, 5);
      
      localStorage.setItem('ch_saved_accounts', JSON.stringify(accounts));
    } catch (error) {
      console.error('Error saving account:', error);
    }
  };

  const saveAccountWithToken = (accountData) => {
    try {
      const saved = localStorage.getItem('ch_saved_accounts');
      let accounts = saved ? JSON.parse(saved) : [];
      
      const newAccount = {
        id: accountData._id,
        fullName: accountData.fullName,
        username: accountData.username,
        email: accountData.email,
        profilePicture: accountData.profilePicture,
        accountType: accountData.accountType,
        token: accountData.token, // Store token for switching
        savedAt: new Date().toISOString()
      };
      
      // Remove if already exists
      accounts = accounts.filter(acc => 
        acc.id !== newAccount.id && 
        acc.email !== newAccount.email
      );
      
      // Add to beginning
      accounts.unshift(newAccount);
      
      // Keep max 5 accounts
      accounts = accounts.slice(0, 5);
      
      localStorage.setItem('ch_saved_accounts', JSON.stringify(accounts));
      
      // Reload saved accounts display
      loadSavedAccounts(user._id);
    } catch (error) {
      console.error('Error saving account with token:', error);
    }
  };

  const handleAddAccount = () => {
    setShowAddForm(true);
    setAddAccountForm({ email: '', password: '' });
    setVerifyError('');
  };

  const handleVerifyAccount = async (e) => {
    e.preventDefault();
    setIsVerifying(true);
    setVerifyError('');

    try {
      const response = await fetch('/api/auth/verify-account', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(addAccountForm)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Verification failed');
      }

      // Check if account is already added
      const saved = localStorage.getItem('ch_saved_accounts');
      const accounts = saved ? JSON.parse(saved) : [];
      const existingAccount = accounts.find(acc => 
        acc.email === data.user.email || acc.id === data.user._id
      );

      if (existingAccount) {
        // Update existing account with new token
        existingAccount.token = data.user.token;
        existingAccount.savedAt = new Date().toISOString();
        localStorage.setItem('ch_saved_accounts', JSON.stringify(accounts));
        loadSavedAccounts(user._id);
        alert('Account updated successfully!');
      } else {
        // Save new account with token
        saveAccountWithToken(data.user);
        alert('Account added successfully!');
      }

      // Close form
      setShowAddForm(false);
      setAddAccountForm({ email: '', password: '' });
    } catch (error) {
      console.error('Verify account error:', error);
      setVerifyError(error.message || 'Failed to verify account');
    } finally {
      setIsVerifying(false);
    }
  };

  const handleSwitchAccount = async (account) => {
    if (!account.token) {
      alert('No token found for this account. Please remove and add the account again.');
      return;
    }

    if (confirm(`Switch to ${account.fullName} (${account.email})?`)) {
      setPageLoading(true);
      
      try {
        // Save current account first
        await saveCurrentAccount();
        
        // Switch to the selected account using its token
        const response = await fetch('/api/auth/switch-account', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ token: account.token })
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'Failed to switch account');
        }

        alert(`Successfully switched to ${data.user.fullName}!`);
        
        // Force full page reload to ensure all caches are cleared
        window.location.href = '/main-page';
      } catch (error) {
        console.error('Switch error:', error);
        alert(error.message || 'Failed to switch account. Please try again.');
      } finally {
        setPageLoading(false);
      }
    }
  };

  const handleRemoveAccount = (accountId) => {
    if (confirm('Remove this account from saved accounts?')) {
      try {
        const saved = localStorage.getItem('ch_saved_accounts');
        if (saved) {
          let accounts = JSON.parse(saved);
          accounts = accounts.filter(acc => acc.id !== accountId);
          localStorage.setItem('ch_saved_accounts', JSON.stringify(accounts));
          setSavedAccounts(accounts.filter(acc => acc.id !== user._id));
        }
      } catch (error) {
        console.error('Error removing account:', error);
      }
    }
  };



  if (loading || pageLoading) {
    return (
      <div className={styles.mainContainer}>
        <div className={styles.modalCard}>
          <div className={styles.loadingState}>
            <p>Loading account information...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.mainContainer}>
      <div className={styles.modalCard}>
        {/* Close Button */}
        <button 
          onClick={() => router.push('/user-profile/settings')}
          className={styles.closeButton}
        >
          ×
        </button>

        {/* Header */}
        <div className={styles.modalHeader}>
          <div className={styles.logoIcon}></div>
          <span className={styles.logoText}>ConnectHub</span>
        </div>

        <div className={styles.modalContent}>
          <h1 className={styles.modalTitle}>Account</h1>

          {/* Current Account Info */}
          <div className={styles.currentAccountSection}>
            <div className={styles.currentAccountCard}>
              <div className={styles.userInfo}>
                <div className={styles.userAvatar}>
                  {user?.profilePicture ? (
                    <img src={user.profilePicture} alt="Profile" />
                  ) : (
                    <span>{user?.fullName?.charAt(0)?.toUpperCase() || 'U'}</span>
                  )}
                </div>
                <div className={styles.userDetails}>
                  <h3>{user?.fullName}</h3>
                  <p>@{user?.username}</p>
                  <p className={styles.userEmail}>{user?.email}</p>
                  <span className={styles.currentAccountType}>
                    {user?.accountType === 'business' ? '🏢 Business' : 
                     user?.accountType === 'community' ? '👥 Community' : '👤 Personal'} Account
                  </span>
                </div>
              </div>
              <div className={styles.checkmark}>✓</div>
            </div>
          </div>

          {/* Saved Accounts Section */}
          {savedAccounts.length > 0 && (
            <div className={styles.savedAccountsSection}>
              <h2 className={styles.sectionTitle}>Switch Account</h2>
              <div className={styles.accountsList}>
                {savedAccounts.map(account => (
                  <div key={account.id} className={styles.accountItem}>
                    <div className={styles.userInfo}>
                      <div className={styles.userAvatar}>
                        {account.profilePicture ? (
                          <img src={account.profilePicture} alt="Profile" />
                        ) : (
                          <span>{account.fullName?.charAt(0)?.toUpperCase() || 'U'}</span>
                        )}
                      </div>
                      <div className={styles.userDetails}>
                        <h3>{account.fullName}</h3>
                        <p>@{account.username}</p>
                        <p className={styles.userEmail}>{account.email}</p>
                        <span className={styles.accountType}>
                          {account.accountType === 'business' ? '🏢' : 
                           account.accountType === 'community' ? '👥' : '👤'} {account.accountType}
                        </span>
                      </div>
                    </div>
                    <div className={styles.accountActions}>
                      <button 
                        className={styles.switchButton}
                        onClick={() => handleSwitchAccount(account)}
                      >
                        Switch
                      </button>
                      <button 
                        className={styles.removeButton}
                        onClick={() => handleRemoveAccount(account.id)}
                        title="Remove account"
                      >
                        ×
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Add Account Form */}
          {showAddForm && (
            <div className={styles.addAccountForm}>
              <h2 className={styles.formTitle}>Add Another Account</h2>
              <p className={styles.formDescription}>Enter credentials to verify and add account</p>
              
              {verifyError && (
                <div className={styles.errorMessage}>{verifyError}</div>
              )}
              
              <form onSubmit={handleVerifyAccount} className={styles.form}>
                <div className={styles.formGroup}>
                  <label>Email</label>
                  <input
                    type="email"
                    value={addAccountForm.email}
                    onChange={(e) => setAddAccountForm({
                      ...addAccountForm,
                      email: e.target.value
                    })}
                    placeholder="Enter email address"
                    required
                  />
                </div>
                
                <div className={styles.formGroup}>
                  <label>Password</label>
                  <input
                    type="password"
                    value={addAccountForm.password}
                    onChange={(e) => setAddAccountForm({
                      ...addAccountForm,
                      password: e.target.value
                    })}
                    placeholder="Enter password"
                    required
                  />
                </div>
                
                <div className={styles.formActions}>
                  <button 
                    type="button" 
                    className={styles.cancelButton}
                    onClick={() => setShowAddForm(false)}
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    className={styles.verifyButton}
                    disabled={isVerifying}
                  >
                    {isVerifying ? 'Verifying...' : 'Add Account'}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Actions Section */}
          <div className={styles.actionsSection}>
            <button 
              className={styles.addAccountButton}
              onClick={handleAddAccount}
              disabled={showAddForm}
            >
              <span className={styles.actionIcon}>➕</span>
              <div className={styles.actionInfo}>
                <div className={styles.actionTitle}>Add Another Account</div>
                <div className={styles.actionDescription}>Verify and add a different account</div>
              </div>
            </button>

            <button 
              className={styles.logoutButton}
              onClick={handleLogout}
              disabled={isLoggingOut}
            >
              <span className={styles.actionIcon}>🚪</span>
              <div className={styles.actionInfo}>
                <div className={styles.actionTitle}>
                  {isLoggingOut ? 'Logging out...' : 'Log out'}
                </div>
                <div className={styles.actionDescription}>Sign out from this account</div>
              </div>
            </button>
          </div>

          {/* Information Section */}
          <div className={styles.infoSection}>
            <h3>Account Management</h3>
            <ul className={styles.infoList}>
              <li>Add another account to quickly switch between accounts</li>
              <li>Your data and settings are saved separately for each account</li>
              <li>You can logout anytime to return to the login screen</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
