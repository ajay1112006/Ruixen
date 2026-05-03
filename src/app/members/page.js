"use client";
import React from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import BorderGlow from '@/components/BorderGlow';
import styles from './members.module.css';

const allMembers = [
  {
    name: "Ajay Subramoni. A",
    role: "Founder",
    education: "B.Tech Artificial Intelligence and Data Science",
    skills: ["Full Stack Developer", "UI & UX Designer"],
    image: "/team/ajay.jpeg",
    color: "primary",
    objectPosition: "center top",
  },
  {
    name: "Sahaya Revin. P",
    role: "Co-Founder",
    education: "",
    skills: ["AI/ML Developer", "Data Scientist"],
    image: "/team/revin.jpeg",
    color: "primary",
    objectPosition: "center 10%",
  },
  {
    name: "Aravind. P",
    role: "Business Manager",
    education: "B.Tech Artificial Intelligence and Data Science",
    skills: ["UI & UX Designer", "Full Stack Developer", "Video Editor"],
    image: "/team/aravind.jpeg",
    color: "secondary",
  },
  {
    name: "Manekandan. M",
    role: "Assistant Manager",
    education: "",
    skills: ["Full Stack Developer", "AI/ML Developer"],
    image: "/team/manekandan.jpeg",
    color: "accent",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

const MemberCard = ({ member, index }) => {
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
    <div style={{ perspective: 1200 }}>
      <motion.div
        variants={itemVariants}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        whileHover={{ scale: 1.02 }}
        className="interactive"
        style={{
          position: 'relative',
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
      >
        <BorderGlow
          borderRadius={20}
          glowRadius={50}
          glowIntensity={1.2}
          backgroundColor="rgba(255,255,255,0.02)"
          colors={['#00d0ff', '#0800ff', '#ff00aa']}
        >
          <div className={styles.founderCard} style={{ transformStyle: 'preserve-3d' }}>
            <div className={styles.founderImageWrapper} style={{ transform: 'translateZ(15px)' }}>
              <Image
                src={member.image}
                alt={member.name}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className={styles.founderImage}
                style={{ objectPosition: member.objectPosition || 'center 20%' }}
                priority={index === 0}
              />
              <div className={styles.founderImageOverlay} />
              <div className={styles.founderImageGlow} />
            </div>

            <div className={styles.founderInfo} style={{ transform: 'translateZ(35px)' }}>
              <div className={styles.founderBadge}>
                <span className={styles.founderBadgeDot} />
                {member.role}
              </div>
              <h2 className={styles.founderName}>{member.name}</h2>
              <p className={styles.founderRole}>{member.role}</p>
              {member.education && (
                <p className={styles.founderEducation}>{member.education}</p>
              )}
              <hr className={styles.founderDivider} />
              <div className={styles.founderSkills}>
                {member.skills.map((skill, i) => (
                  <motion.span
                    key={i}
                    className={styles.skillBadge}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6 + i * 0.1, duration: 0.4 }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </div>
          </div>
        </BorderGlow>
      </motion.div>
    </div>
  );
};

export default function Members() {
  return (
    <div className={styles.membersPage}>
      <div className="container">

        {/* Hero */}
        <motion.div
          className={styles.heroSection}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className={styles.heroTitle}>
            Meet the <span className="text-gradient">Team</span>
          </h1>
          <p className={styles.heroSubtitle}>
            The passionate minds building the future of the digital web — one pixel at a time.
          </p>
        </motion.div>

        {/* Team Section */}
        <div className={styles.teamSection} style={{ maxWidth: '1000px', margin: '0 auto 4rem' }}>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}
          >
            {allMembers.map((member, index) => (
              <MemberCard key={index} member={member} index={index} />
            ))}
          </motion.div>
        </div>

        {/* CTA */}
        <motion.div
          className={styles.ctaSection}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="glass" style={{ padding: '4rem', borderRadius: '24px' }}>
            <h2 className={styles.ctaTitle}>
              Want to <span className="text-gradient">join us</span>?
            </h2>
            <p className={styles.ctaSubtitle}>
              We're always looking for talented people to push the boundaries of the web.
            </p>
            <BorderGlow
              borderRadius={16}
              glowRadius={30}
              glowIntensity={1.5}
              backgroundColor="transparent"
              colors={['#00d0ff', '#0800ff', '#ff00aa']}
            >
              <Link
                href="/contact"
                className="glow-btn interactive"
                style={{
                  padding: '15px 40px',
                  fontSize: '1.1rem',
                  border: 'none',
                  boxShadow: 'none',
                  textDecoration: 'none',
                }}
              >
                Let&apos;s Connect
              </Link>
            </BorderGlow>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
