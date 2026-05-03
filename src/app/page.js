"use client";
import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowRight, Code, Cpu, Globe, Rocket } from 'lucide-react';
import Link from 'next/link';
import BorderGlow from '@/components/BorderGlow';
import VariableProximity from '@/components/VariableProximity';
import BounceCards from '@/components/BounceCards';
import SpotlightCard from '@/components/SpotlightCard';
import CircularGallery from '@/components/CircularGallery';

const projectItems = [
  { image: '/projects/b.png', text: 'Knowledge Book' },
  { image: '/projects/c.png', text: 'CopBot AI' },
  { image: '/projects/deep.png', text: 'Deep Scan' },
  { image: '/projects/hear.png', text: 'Hear It' },
  {image: '/projects/p.png', text: 'Plantiva'},
  { image: '/projects/voice.png', text: 'Voice AI' },
];

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
                <Link href="/contact" className="glow-btn" style={{ 
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  border: 'none',
                  boxShadow: 'none',
                  textDecoration: 'none'
                }}>
                  Start Your Project <ArrowRight size={18} />
                </Link>
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

      {/* Visual Team Section */}
      <section style={{ padding: '4rem 0', overflow: 'hidden' }}>
        <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '0.8rem', fontWeight: '800' }}>The <span className="text-gradient">Boyz</span></h2>
            <p style={{ opacity: 0.6, fontSize: '1.2rem' }}>The Pillars of <span className="text-gradient" style={{ fontWeight: '700' }}>Ruixen</span></p>
          </div>
          <BounceCards
            images={[
              "/team/ajay.jpeg",
              "/team/revin.jpeg",
              "/team/aravind.jpeg",
              "/team/manekandan.jpeg"
            ]}
            containerWidth={900}
            containerHeight={450}
            animationDelay={1}
            animationStagger={0.08}
            easeType="elastic.out(1, 0.5)"
            transformStyles={[
              "rotate(-10deg) translate(-250px)",
              "rotate(-5deg) translate(-100px)",
              "rotate(5deg) translate(100px)",
              "rotate(10deg) translate(250px)"
            ]}
            enableHover
            objectPositions={[
              "center top",
              "center 10%",
              "center",
              "center"
            ]}
          />
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
              spotlightColor="rgba(0, 208, 255, 0.2)"
            />
            <FeatureCard 
              icon={<Cpu size={32} color="var(--secondary)" />} 
              title="Powerful Backend" 
              description="Scalable serverless architectures and robust API integrations."
              spotlightColor="rgba(8, 0, 255, 0.2)"
            />
            <FeatureCard 
              icon={<Globe size={32} color="var(--accent)" />} 
              title="Global Scale" 
              description="Optimized for performance and SEO to reach users everywhere."
              spotlightColor="rgba(255, 0, 170, 0.2)"
            />
          </div>
        </div>
      </section>

      {/* Project Gallery Section */}
      <section style={{ height: '650px', position: 'relative', padding: '4rem 0', marginBottom: '4rem' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', fontWeight: '800' }}>Featured <span className="text-gradient">Projects</span></h2>
            <p style={{ opacity: 0.6 }}>A glimpse into our digital craftsmanship.</p>
          </div>
        </div>
        <div style={{ height: '550px', position: 'relative' }}>
          <CircularGallery items={projectItems} bend={3} textColor="#ffffff" borderRadius={0.05} scrollEase={0.02}/>
        </div>
        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <div style={{ display: 'inline-block' }}>
            <BorderGlow
              borderRadius={12}
              glowRadius={20}
              glowIntensity={1.2}
              backgroundColor="transparent"
              colors={['#00d0ff', '#0800ff', '#ff00aa']}
            >
              <Link href="/projects" className="glow-btn interactive" style={{ 
                padding: '12px 30px', 
                fontSize: '1rem', 
                border: 'none', 
                boxShadow: 'none', 
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                View All Projects <ArrowRight size={18} />
              </Link>
            </BorderGlow>
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

const FeatureCard = ({ icon, title, description, spotlightColor }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    // Tilt logic
    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);

    // Spotlight logic
    e.currentTarget.style.setProperty('--mouse-x', `${mouseX}px`);
    e.currentTarget.style.setProperty('--mouse-y', `${mouseY}px`);
    e.currentTarget.style.setProperty('--spotlight-color', spotlightColor || 'rgba(0, 229, 255, 0.2)');
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div style={{ perspective: 1000 }}>
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        whileHover={{ scale: 1.02 }}
        className="card-spotlight interactive"
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
          padding: '2.5rem',
          borderRadius: '20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          transition: 'border 0.3s ease, box-shadow 0.3s ease',
          boxShadow: '0 10px 30px -10px rgba(0,0,0,0.5)',
          backgroundColor: 'rgba(17, 17, 17, 0.8)',
          backdropFilter: 'blur(12px)',
          border: '1px solid var(--surface-border)'
        }}
      >
        <div style={{ marginBottom: '0.5rem', transform: 'translateZ(30px)' }}>{icon}</div>
        <h3 style={{ fontSize: '1.5rem', transform: 'translateZ(20px)' }}>{title}</h3>
        <p style={{ opacity: 0.6, lineHeight: 1.6, transform: 'translateZ(10px)' }}>{description}</p>
      </motion.div>
    </div>
  );
};
