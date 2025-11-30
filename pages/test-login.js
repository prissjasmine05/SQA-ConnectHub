import { useState } from 'react';
import { useRouter } from 'next/router';

export default function TestLogin() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogin = async (email) => {
    setLoading(true);
    try {
      const res = await fetch('/api/debug/test-login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ email, password: 'password123' })
      });

      if (res.ok) {
        const data = await res.json();
        alert(`Logged in as ${data.user.fullName}`);
        router.push('/user-profile');
      } else {
        const error = await res.json();
        alert(`Login failed: ${error.message}`);
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Login error');
    } finally {
      setLoading(false);
    }
  };

  const users = [
    { email: 'john@example.com', name: 'John Doe' },
    { email: 'jane@example.com', name: 'Jane Smith' },
    { email: 'mike@example.com', name: 'Mike Johnson' },
    { email: 'sarah@example.com', name: 'Sarah Wilson' },
    { email: 'alex@example.com', name: 'Alex Chen' }
  ];

  return (
    <div style={{ padding: '2rem', maxWidth: '400px', margin: '0 auto' }}>
      <h1>Test Login</h1>
      <p>Choose a user to login as (password: password123):</p>
      
      {users.map((user) => (
        <div key={user.email} style={{ marginBottom: '1rem' }}>
          <button
            onClick={() => handleLogin(user.email)}
            disabled={loading}
            style={{
              width: '100%',
              padding: '0.75rem',
              backgroundColor: '#3B82F6',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.5 : 1
            }}
          >
            {loading ? 'Logging in...' : `Login as ${user.name}`}
          </button>
        </div>
      ))}

      <div style={{ marginTop: '2rem', paddingTop: '1rem', borderTop: '1px solid #ccc' }}>
        <button
          onClick={() => router.push('/main-page')}
          style={{
            width: '100%',
            padding: '0.75rem',
            backgroundColor: '#10B981',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer'
          }}
        >
          Go to Main Page
        </button>
      </div>
    </div>
  );
}
