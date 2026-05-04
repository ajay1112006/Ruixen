"use client";
import React from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import BorderGlow from '@/components/BorderGlow';
import styles from './projects.module.css';

const projects = [
  {
    title: "Plantiva",
    description: "Plantiva is an AI-based plant disease analysis system specially built to help farmers. Users upload pictures of diseased plants or crops, and the AI analyzes and suggests ways to cure it along with required medications.",
    image: "/projects/p.png",
    tech: ["AI/ML", "Computer Vision", "Agricultural Tech"],
    color: "#4ade80" // Green
  },
  {
    title: "CopBot",
    description: "An AI-powered ChatBot designed to clarify public doubts about Indian Law and Order rights and acts, making legal information accessible to everyone.",
    image: "/projects/c.png",
    tech: ["NLP", "Legal Tech", "AI Chatbot"],
    color: "#3b82f6" // Blue
  },
  {
    title: "Book Emulator",
    description: "An AI-driven tool for students where staff can upload notes and study materials. Students can access and interact with the notes via AI, which summarizes answers and enhances the learning experience.",
    image: "/projects/b.png",
    tech: ["EdTech", "AI Summarization", "Staff Portal"],
    color: "#a855f7" // Purple
  },
  {
    title: "DeepFake Detector",
    description: "A specialized tool used to detect images, videos, or texts that have been morphed or generated using AI, helping combat digital misinformation.",
    image: "/projects/deep.png",
    tech: ["Security", "Deep Learning", "Media Verification"],
    color: "#1e3a8a" // Dark Blue
  },
  {
    title: "Hear Connect",
    description: "An accessibility tool built for the deaf community that converts sign language into text in real-time, bridging the communication gap.",
    image: "/projects/hear.png",
    tech: ["Gesture Recognition", "Accessibility", "Real-time Processing"],
    color: "#60a5fa" // Light Blue
  },
  {
    title: "Voice Assistant",
    description: "An integrated AI agent that performs tasks via simple voice commands. It is designed to enable blind people to use computers effectively and independently.",
    image: "/projects/voice.png",
    tech: ["Voice UI", "Accessibility", "AI Agent"],
    color: "#f97316" // Orange
  },
  {
    title: "DMI College Website",
    description: "The official website of DMI College of Engineering, developed by our team to provide a modern, high-performance digital presence for the institution.",
    image: "/projects/d.png",
    tech: ["Web Development", "Next.js", "Institutional"],
    color: "#fbbf24", // Yellow
    hasBlackBackground: true
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

const itemVariants = {
  hidden: { y: 40, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.8, ease: "easeOut" }
  }
};

const ProjectCard = ({ project, index }) => {
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
    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      variants={itemVariants}
      style={{ perspective: 1200 }}
    >
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        whileHover={{ scale: 1.02 }}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="interactive"
      >
        <BorderGlow
          borderRadius={24}
          glowRadius={50}
          glowIntensity={0.8}
          backgroundColor="transparent"
          colors={[project.color, '#0800ff', '#ff00aa']}
        >
          <div className={styles.projectCard} style={{ transformStyle: 'preserve-3d' }}>
            <div className={styles.projectImageWrapper} style={{ transform: 'translateZ(30px)' }}>
              <Image
                src={project.image}
                alt={project.title}
                fill
                className={styles.projectImage}
                style={project.hasBlackBackground ? { objectFit: 'contain', padding: '3rem' } : {}}
              />
            </div>
            <div className={styles.projectContent} style={{ transform: 'translateZ(50px)' }}>
              <h2 className={styles.projectTitle} style={{ color: project.color }}>{project.title}</h2>
              <p className={styles.projectDescription}>{project.description}</p>
              <div className={styles.projectTech}>
                {project.tech.map((tag, i) => (
                  <span key={i} className={styles.techTag} style={{ color: project.color, borderColor: `${project.color}33` }}>{tag}</span>
                ))}
              </div>
            </div>
          </div>
        </BorderGlow>
      </motion.div>
    </motion.div>
  );
};

export default function Projects() {
  return (
    <div className={styles.projectsPage}>
      <div className="container">
        {/* Hero Section */}
        <motion.div
          className={styles.heroSection}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className={styles.heroTitle}>
            Our <span className="text-gradient">Projects</span>
          </h1>
          <p className={styles.heroSubtitle}>
            Exploring the intersection of artificial intelligence and human-centric design through innovative digital solutions.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          className={styles.projectsGrid}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} />
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          className={styles.ctaSection}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="glass" style={{ padding: '4rem', borderRadius: '24px' }}>
            <h2 className={styles.ctaTitle}>Have a <span className="text-gradient">Project</span> in Mind?</h2>
            <p className={styles.ctaSubtitle}>Let's build something revolutionary together.</p>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <BorderGlow
                borderRadius={16}
                glowRadius={30}
                glowIntensity={1.5}
                backgroundColor="transparent"
                colors={['#00d0ff', '#0800ff', '#ff00aa']}
              >
                <Link href="/contact" className="glow-btn interactive" style={{ padding: '15px 40px', fontSize: '1.1rem', border: 'none', boxShadow: 'none', textDecoration: 'none' }}>
                  Start Your Journey
                </Link>
              </BorderGlow>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
