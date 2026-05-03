"use client";
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, Calendar, User, RefreshCw, Lock, ArrowRight, LogOut, Phone } from 'lucide-react';
import BorderGlow from '@/components/BorderGlow';

export default function AdminPage() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authData, setAuthData] = useState({ username: '', password: '' });
  const [authError, setAuthError] = useState('');
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  useEffect(() => {
    // Check if previously authenticated in this session
    const authStatus = sessionStorage.getItem('adminAuth');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
      fetchMessages();
    } else {
      setLoading(false);
    }
  }, []);

  const fetchMessages = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/messages');
      const data = await res.json();
      if (res.ok) {
        setMessages(data.messages || []);
      }
    } catch (error) {
      console.error('Failed to fetch messages:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsAuthenticating(true);
    setAuthError('');
    
    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(authData),
      });
      
      const data = await res.json();
      
      if (res.ok && data.success) {
        setIsAuthenticated(true);
        sessionStorage.setItem('adminAuth', 'true');
        fetchMessages();
      } else {
        setAuthError(data.error || 'Invalid credentials');
      }
    } catch (error) {
      setAuthError('An error occurred during login');
    } finally {
      setIsAuthenticating(false);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('adminAuth');
    setAuthData({ username: '', password: '' });
  };

  const handleToggleFinish = async (id, currentStatus) => {
    try {
      const res = await fetch('/api/messages', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, finished: !currentStatus })
      });
      if (res.ok) {
        setMessages(messages.map(msg => 
          msg.id === id ? { ...msg, finished: !currentStatus, finishedAt: !currentStatus ? new Date().toISOString() : null } : msg
        ));
      }
    } catch (error) {
      console.error('Failed to update message status:', error);
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (!isAuthenticated) {
    return (
      <div style={{ paddingTop: '120px', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', paddingBottom: '4rem' }}>
        <div className="container" style={{ maxWidth: '400px', width: '100%' }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass"
            style={{ padding: '3rem 2rem', borderRadius: '24px', textAlign: 'center' }}
          >
            <Lock size={48} style={{ margin: '0 auto 1.5rem', color: 'var(--primary)' }} />
            <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Admin Access</h1>
            <p style={{ opacity: 0.6, marginBottom: '2rem' }}>Please sign in to continue</p>
            
            <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', textAlign: 'left' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', opacity: 0.8 }}>Username</label>
                <input 
                  type="text" 
                  value={authData.username}
                  onChange={(e) => setAuthData({...authData, username: e.target.value})}
                  className="custom-input"
                  required
                />
              </div>
              
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', opacity: 0.8 }}>Password</label>
                <input 
                  type="password" 
                  value={authData.password}
                  onChange={(e) => setAuthData({...authData, password: e.target.value})}
                  className="custom-input"
                  required
                />
              </div>
              
              {authError && (
                <p style={{ color: '#ff3366', fontSize: '0.85rem', margin: '0' }}>{authError}</p>
              )}
              
              <BorderGlow
                borderRadius={12}
                glowRadius={15}
                glowIntensity={1}
                backgroundColor="transparent"
                colors={['#00d0ff', '#0800ff', '#ff00aa']}
              >
                <div style={{ marginTop: '0.5rem' }}>
                  <button 
                    type="submit" 
                    disabled={isAuthenticating}
                    className="glow-btn" 
                    style={{ 
                      width: '100%',
                      padding: '1rem', 
                      border: 'none', 
                      boxShadow: 'none',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      gap: '0.5rem',
                      cursor: isAuthenticating ? 'not-allowed' : 'pointer',
                      opacity: isAuthenticating ? 0.7 : 1
                    }}
                  >
                    {isAuthenticating ? 'Authenticating...' : 'Secure Login'} <ArrowRight size={18} />
                  </button>
                </div>
              </BorderGlow>
            </form>
          </motion.div>
        </div>
        <style jsx>{`
          .custom-input {
            width: 100%;
            background: rgba(255, 255, 255, 0.03);
            border: 1px solid var(--surface-border);
            padding: 1rem;
            border-radius: 12px;
            color: white;
            font-size: 1rem;
            transition: all 0.3s ease;
            outline: none;
          }
          .custom-input:focus {
            border-color: var(--primary);
            background: rgba(255, 255, 255, 0.06);
            box-shadow: 0 0 15px rgba(0, 242, 255, 0.1);
          }
        `}</style>
      </div>
    );
  }

  return (
    <div style={{ paddingTop: '120px', minHeight: '100vh', paddingBottom: '4rem' }}>
      <div className="container">
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <h1 style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>Admin <span className="text-gradient">Dashboard</span></h1>
              <p style={{ opacity: 0.6 }}>Manage your incoming project inquiries and messages.</p>
            </div>
            
            <div style={{ display: 'flex', gap: '1rem' }}>
              <button 
                onClick={fetchMessages}
                disabled={loading}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  color: 'white',
                  padding: '0.8rem 1.5rem',
                  borderRadius: '8px',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  transition: 'all 0.3s ease',
                }}
                onMouseOver={(e) => {
                  if (!loading) e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                }}
                onMouseOut={(e) => {
                  if (!loading) e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                }}
              >
                <RefreshCw size={18} className={loading ? 'spin' : ''} />
                {loading ? 'Refreshing...' : 'Refresh'}
              </button>

              <button 
                onClick={handleLogout}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  background: 'rgba(255, 50, 100, 0.1)',
                  border: '1px solid rgba(255, 50, 100, 0.2)',
                  color: '#ff6b8b',
                  padding: '0.8rem 1.5rem',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 50, 100, 0.2)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 50, 100, 0.1)';
                }}
              >
                <LogOut size={18} />
                Logout
              </button>
            </div>
          </div>

          {loading && messages.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '4rem', opacity: 0.5 }}>
              Loading messages...
            </div>
          ) : messages.length === 0 ? (
            <div className="glass" style={{ padding: '4rem', textAlign: 'center', borderRadius: '24px' }}>
              <Mail size={48} style={{ margin: '0 auto 1.5rem', opacity: 0.3 }} />
              <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>No messages yet</h3>
              <p style={{ opacity: 0.6 }}>When clients contact you, their messages will appear here.</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {messages.map((msg, idx) => (
                <motion.div
                  key={msg.id || idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <BorderGlow
                    borderRadius={16}
                    glowRadius={15}
                    glowIntensity={0.5}
                    backgroundColor="transparent"
                    colors={['#00d0ff', '#0800ff', '#ff00aa']}
                  >
                    <div className="glass" style={{ padding: '2rem', borderRadius: '16px', border: 'none', opacity: msg.finished ? 0.6 : 1, transition: 'opacity 0.3s ease' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                          <div style={{ 
                            width: '48px', 
                            height: '48px', 
                            borderRadius: '50%', 
                            background: 'var(--primary)', 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'center',
                            fontWeight: 'bold',
                            fontSize: '1.2rem',
                            color: '#000'
                          }}>
                            {msg.name.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <h3 style={{ fontSize: '1.2rem', fontWeight: '600' }}>{msg.name}</h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                              <a href={`mailto:${msg.email}`} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--primary)', textDecoration: 'none', fontSize: '0.9rem', opacity: 0.9 }}>
                                <Mail size={14} /> {msg.email}
                              </a>
                              {msg.phone && msg.phone !== 'Not provided' && (
                                <a href={`tel:${msg.phone}`} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--secondary)', textDecoration: 'none', fontSize: '0.9rem', opacity: 0.9 }}>
                                  <Phone size={14} /> {msg.phone}
                                </a>
                              )}
                            </div>
                          </div>
                        </div>
                        
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.5rem' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', opacity: 0.5, fontSize: '0.85rem' }}>
                            <Calendar size={14} />
                            {formatDate(msg.createdAt)}
                          </div>
                          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.85rem', opacity: msg.finished ? 1 : 0.6, color: msg.finished ? 'var(--primary)' : 'white' }}>
                            <input 
                              type="checkbox" 
                              checked={!!msg.finished} 
                              onChange={() => handleToggleFinish(msg.id, msg.finished)}
                              style={{ cursor: 'pointer', width: '16px', height: '16px', accentColor: 'var(--primary)' }}
                            />
                            {msg.finished ? 'Finished (Auto-deletes in 24h)' : 'Mark as Finished'}
                          </label>
                        </div>
                      </div>
                      
                      <div style={{ 
                        background: 'rgba(0,0,0,0.2)', 
                        padding: '1.5rem', 
                        borderRadius: '12px',
                        borderLeft: '4px solid var(--primary)'
                      }}>
                        <p style={{ whiteSpace: 'pre-wrap', lineHeight: 1.6, opacity: 0.9 }}>
                          {msg.message}
                        </p>
                      </div>
                    </div>
                  </BorderGlow>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
      <style jsx>{`
        .spin {
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
