"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import BorderGlow from './BorderGlow';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'glass py-4' : 'py-6'
        }`}
      style={{
        padding: scrolled ? '1rem 2rem' : '1.5rem 2rem',
        background: scrolled ? 'rgba(5, 5, 5, 0.8)' : 'transparent',
        backdropFilter: scrolled ? 'blur(10px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--surface-border)' : 'none'
      }}
    >
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link href="/" className="text-gradient" style={{ fontSize: '1.8rem', fontWeight: '900', letterSpacing: '-1.5px', textTransform: 'uppercase' }}>
          RUIXEN
        </Link>

        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
          <BorderGlow
            borderRadius={8}
            glowRadius={15}
            glowIntensity={0.8}
            backgroundColor="transparent"
            colors={['#00d0ff', '#0800ff', '#ff00aa']}
          >
            <Link href="/about" className="glow-btn" style={{ textDecoration: 'none', border: 'none', boxShadow: 'none', display: 'block', padding: '10px 20px' }}>
              About
            </Link>
          </BorderGlow>

          <BorderGlow
            borderRadius={8}
            glowRadius={15}
            glowIntensity={0.8}
            backgroundColor="transparent"
            colors={['#00d0ff', '#0800ff', '#ff00aa']}
          >
            <Link href="/members" className="glow-btn" style={{ textDecoration: 'none', border: 'none', boxShadow: 'none', display: 'block', padding: '10px 20px' }}>
              Members
            </Link>
          </BorderGlow>

          <BorderGlow
            borderRadius={8}
            glowRadius={15}
            glowIntensity={1.2}
            backgroundColor="transparent"
            colors={['#00d0ff', '#0800ff', '#ff00aa']}
          >
            <Link href="/contact" className="glow-btn" style={{ textDecoration: 'none', border: 'none', boxShadow: 'none', display: 'block', padding: '10px 24px' }}>
              Get in Touch
            </Link>
          </BorderGlow>
        </div>
      </div>

      <style jsx>{`
        .nav-link {
          font-weight: 500;
          opacity: 0.9;
          transition: all 0.3s ease;
          text-decoration: none;
          text-shadow: 0 1px 2px rgba(0,0,0,0.3);
        }
        .nav-link:hover {
          opacity: 1;
          color: var(--primary);
        }
      `}</style>
    </motion.nav>
  );
};

export default Navbar;
