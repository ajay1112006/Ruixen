"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle } from 'lucide-react';
import BorderGlow from '@/components/BorderGlow';

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    // Simulate API call
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', message: '' });
    }, 5000);
  };

  return (
    <div style={{ paddingTop: '120px', minHeight: '100vh' }}>
      <div className="container">
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="glass"
            style={{ padding: '4rem', borderRadius: '32px', position: 'relative' }}
          >
            <div className="blob" style={{ top: '-10%', right: '-10%', width: '300px', height: '300px' }}></div>
            
            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.div
                  key="form"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>Let's <span className="text-gradient">Connect</span></h1>
                  <p style={{ opacity: 0.6, marginBottom: '3rem' }}>Tell us about your project and we'll get back to you within 24 hours.</p>
                  
                  <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    <div className="form-group">
                      <label style={{ display: 'block', marginBottom: '0.8rem', fontWeight: '500', opacity: 0.8 }}>Full Name</label>
                      <input 
                        type="text" 
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        placeholder="John Doe"
                        className="custom-input"
                      />
                    </div>
                    
                    <div className="form-group">
                      <label style={{ display: 'block', marginBottom: '0.8rem', fontWeight: '500', opacity: 0.8 }}>Email Address</label>
                      <input 
                        type="email" 
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        placeholder="john@example.com"
                        className="custom-input"
                      />
                    </div>
                    
                    <div className="form-group">
                      <label style={{ display: 'block', marginBottom: '0.8rem', fontWeight: '500', opacity: 0.8 }}>Message</label>
                      <textarea 
                        required
                        value={formData.message}
                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                        placeholder="Tell us about your vision..."
                        className="custom-input"
                        rows="5"
                      ></textarea>
                    </div>
                    
                    <BorderGlow
                      borderRadius={12}
                      glowRadius={20}
                      glowIntensity={1.5}
                      backgroundColor="transparent"
                      colors={['#00d0ff', '#0800ff', '#ff00aa']}
                    >
                      <button type="submit" className="glow-btn" style={{ 
                        padding: '1.2rem', 
                        fontSize: '1.1rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.8rem',
                        border: 'none',
                        boxShadow: 'none'
                      }}>
                        Send Message <Send size={20} />
                      </button>
                    </BorderGlow>
                  </form>
                </motion.div>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  style={{ textAlign: 'center', padding: '4rem 0' }}
                >
                  <CheckCircle size={80} color="var(--primary)" style={{ marginBottom: '2rem' }} />
                  <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Message Sent!</h2>
                  <p style={{ opacity: 0.7, fontSize: '1.2rem' }}>
                    Thank you for reaching out. We've received your message and will be in touch shortly.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>

      <style jsx>{`
        .custom-input {
          width: 100%;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid var(--surface-border);
          padding: 1.2rem;
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
        textarea.custom-input {
          resize: none;
        }
      `}</style>
    </div>
  );
}
