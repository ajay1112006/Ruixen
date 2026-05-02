"use client";
import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Code, Cpu, Globe, Rocket } from 'lucide-react';
import Link from 'next/link';
import BorderGlow from '@/components/BorderGlow';
import VariableProximity from '@/components/VariableProximity';

const teamMembers = [
  {
    name: "Ajay Subramoni. A",
    role: "Founder",
    skills: ["Full Stack Developer", "UI & UX Designer"],
    color: "var(--primary)",
  },
  {
    name: "Sahaya Revin. P",
    role: "Co-Founder",
    skills: ["AI/ML Developer", "Data Scientist"],
    color: "var(--primary)",
  },
  {
    name: "Aravind. P",
    role: "Business Manager",
    skills: ["UI & UX Designer", "Full Stack Developer", "Video Editor"],
    color: "var(--primary)",
  },
  {
    name: "Manekandan. M",
    role: "Assistant Manager",
    skills: ["Full Stack Developer", "AI/ML Developer"],
    color: "var(--primary)",
  },
];

export default function Home() {
  const containerRef = useRef(null);
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <section 
        ref={containerRef}
        style={{ 
          minHeight: '100vh', 
          display: 'flex', 
          alignItems: 'flex-start', 
          position: 'relative',
          overflow: 'hidden',
          paddingTop: '22vh'
        }}
      >
        <div className="blob" style={{ top: '10%', left: '5%' }}></div>
        <div className="blob-2" style={{ bottom: '10%', right: '5%' }}></div>
        
        <div className="container">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            style={{ maxWidth: '800px' }}
          >
            <motion.h1 
              variants={itemVariants}
              style={{ 
                fontSize: 'clamp(2rem, 5vw, 4rem)', 
                lineHeight: 1.1,
                marginBottom: '1.5rem',
                letterSpacing: '-1px'
              }}
            >
              <span style={{ fontWeight: '800' }}>Building the </span><VariableProximity
                label="Future"
                className="text-gradient"
                fromFontVariationSettings="'wght' 400, 'opsz' 9"
                toFontVariationSettings="'wght' 1000, 'opsz' 144"
                containerRef={containerRef}
                radius={200}
                falloff="gaussian"
              /><span style={{ fontWeight: '800' }}> of the Digital Web.</span>
            </motion.h1>
            
            <motion.p 
              variants={itemVariants}
              style={{ 
                fontSize: '1.25rem', 
                opacity: 0.9, 
                marginBottom: '2.5rem',
                maxWidth: '600px',
                lineHeight: '1.6',
                textShadow: '0 2px 4px rgba(0,0,0,0.5)'
              }}
            >
              Ruixen is an elite web development agency specializing in high-performance, visually stunning digital experiences that push the boundaries of technology.
            </motion.p>
            
            <motion.div variants={itemVariants} style={{ display: 'flex', gap: '1.5rem' }}>
              <BorderGlow
                borderRadius={12}
                glowRadius={20}
                glowIntensity={1.5}
                backgroundColor="transparent"
                colors={['#00d0ff', '#0800ff', '#ff00aa']}
              >
                <button className="glow-btn" style={{ 
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  border: 'none',
                  boxShadow: 'none'
                }}>
                  Start Your Project <ArrowRight size={18} />
                </button>
              </BorderGlow>

            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Team Section */}
      <section style={{ padding: '6rem 0', position: 'relative', zIndex: 10 }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>The <span className="text-gradient">Minds</span> Behind Ruixen</h2>
            <p style={{ opacity: 0.6 }}>A multidisciplinary team dedicated to pushing boundaries.</p>
          </div>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', 
            gap: '2rem' 
          }}>
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                whileHover={{ y: -10 }}
              >
                <BorderGlow
                  borderRadius={16}
                  glowRadius={30}
                  glowIntensity={0.8}
                  backgroundColor="rgba(255,255,255,0.02)"
                  colors={['#00d0ff', '#0800ff', '#ff00aa']}
                >
                  <div className="glass" style={{
                    padding: '2rem',
                    borderRadius: '16px',
                    display: 'flex',
                    flexDirection: 'column',
                    minHeight: '220px',
                    border: 'none',
                    background: 'transparent'
                  }}>
                    <h3 style={{ fontSize: '1.4rem', marginBottom: '0.3rem', fontWeight: '700' }}>{member.name}</h3>
                    <p style={{ color: member.color, fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '1.5rem' }}>{member.role}</p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginTop: 'auto' }}>
                      {member.skills.map((skill, i) => (
                        <span key={i} style={{
                          padding: '0.3rem 0.8rem',
                          borderRadius: '50px',
                          border: '1px solid rgba(255, 255, 255, 0.1)',
                          background: 'rgba(255, 255, 255, 0.03)',
                          fontSize: '0.7rem',
                          color: 'rgba(255, 255, 255, 0.7)',
                          fontWeight: '500'
                        }}>
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </BorderGlow>
              </motion.div>
            ))}
          </div>
          
          <div style={{ textAlign: 'center', marginTop: '3.5rem' }}>
             <Link href="/members" className="text-gradient" style={{ fontWeight: '600', textDecoration: 'none', borderBottom: '1px solid var(--primary)', paddingBottom: '4px', letterSpacing: '1px', textTransform: 'uppercase', fontSize: '0.9rem' }}>
                View Full Profiles →
             </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section style={{ padding: '8rem 0', background: 'rgba(255,255,255,0.02)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Our Expertise</h2>
            <p style={{ opacity: 0.6 }}>Cutting-edge solutions for modern brands.</p>
          </div>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
            gap: '2rem' 
          }}>
            <FeatureCard 
              icon={<Code size={32} color="var(--primary)" />} 
              title="Next-Gen Frontend" 
              description="Ultra-fast, responsive interfaces built with Next.js and Framer Motion."
            />
            <FeatureCard 
              icon={<Cpu size={32} color="var(--secondary)" />} 
              title="Powerful Backend" 
              description="Scalable serverless architectures and robust API integrations."
            />
            <FeatureCard 
              icon={<Globe size={32} color="var(--accent)" />} 
              title="Global Scale" 
              description="Optimized for performance and SEO to reach users everywhere."
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{ padding: '8rem 0', textAlign: 'center' }}>
        <div className="container">
          <div className="glass" style={{ padding: '4rem', borderRadius: '24px' }}>
            <h2 style={{ fontSize: '3rem', marginBottom: '1.5rem' }}>Ready to innovate?</h2>
            <p style={{ opacity: 0.7, marginBottom: '2.5rem', maxWidth: '600px', margin: '0 auto 2.5rem' }}>
              Let's collaborate to build something extraordinary. Our team is ready to bring your vision to life.
            </p>
            <BorderGlow
              borderRadius={16}
              glowRadius={30}
              glowIntensity={1.5}
              backgroundColor="transparent"
              colors={['#00d0ff', '#0800ff', '#ff00aa']}
              className="cta-glow"
            >
              <Link href="/contact" className="glow-btn" style={{ padding: '15px 40px', fontSize: '1.1rem', border: 'none', boxShadow: 'none', textDecoration: 'none' }}>
                Get in Touch
              </Link>
            </BorderGlow>
          </div>
        </div>
      </section>
    </div>
  );
}

const FeatureCard = ({ icon, title, description }) => {
  return (
    <motion.div
      whileHover={{ y: -10 }}
      className="glass"
      style={{
        padding: '2.5rem',
        borderRadius: '20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        transition: 'border 0.3s ease'
      }}
    >
      <div style={{ marginBottom: '0.5rem' }}>{icon}</div>
      <h3 style={{ fontSize: '1.5rem' }}>{title}</h3>
      <p style={{ opacity: 0.6, lineHeight: 1.6 }}>{description}</p>
    </motion.div>
  );
};
