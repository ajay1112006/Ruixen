"use client";
import React from 'react';
import { motion } from 'framer-motion';
import BorderGlow from '@/components/BorderGlow';

export default function About() {
  return (
    <div style={{ paddingTop: '120px', minHeight: '100vh' }}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 style={{ fontSize: '4rem', marginBottom: '2rem' }}>
            We are <span className="text-gradient">Innovation</span>.
          </h1>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
            <div>
              <p style={{ fontSize: '1.2rem', opacity: 0.9, lineHeight: 1.8, marginBottom: '2rem' }}>
                Founded in 2024, Ruixen was born out of a desire to bridge the gap between high-end design and technical excellence. 
                We believe that every digital touchpoint is an opportunity to inspire and engage.
              </p>
              <p style={{ fontSize: '1.2rem', opacity: 0.9, lineHeight: 1.8 }}>
                Our team of designers, engineers, and strategists work at the intersection of creativity and logic, 
                delivering bespoke solutions that empower brands to lead in the digital era.
              </p>
            </div>
            <BorderGlow
              borderRadius={24}
              glowRadius={40}
              glowIntensity={1.2}
              backgroundColor="rgba(255,255,255,0.02)"
              colors={['#00d0ff', '#0800ff', '#ff00aa']}
            >
              <div style={{ padding: '3rem', position: 'relative' }}>
                <div className="blob" style={{ width: '200px', height: '200px', top: '-20px', right: '-20px' }}></div>
                <h3 style={{ fontSize: '2rem', marginBottom: '1.5rem' }}>Our Philosophy</h3>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  <li style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                    <span style={{ color: 'var(--primary)', fontWeight: 'bold' }}>01</span>
                    <span>Design with purpose and precision.</span>
                  </li>
                  <li style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                    <span style={{ color: 'var(--primary)', fontWeight: 'bold' }}>02</span>
                    <span>Performance is not a feature, it's a foundation.</span>
                  </li>
                  <li style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                    <span style={{ color: 'var(--primary)', fontWeight: 'bold' }}>03</span>
                    <span>Constant evolution through experimentation.</span>
                  </li>
                </ul>
              </div>
            </BorderGlow>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
