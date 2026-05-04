"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import './Preloader.css';
import Aurora from './Aurora';

const images = [
  "Screenshot_2026-05-03_191309-removebg-preview.png",
  "Screenshot_2026-05-03_191316-removebg-preview.png",
  "Screenshot_2026-05-03_191325-removebg-preview.png",
  "Screenshot_2026-05-03_191331-removebg-preview.png",
  "Screenshot_2026-05-03_191338-removebg-preview.png",
  "Screenshot_2026-05-03_191346-removebg-preview.png",
  "Screenshot_2026-05-03_191351-removebg-preview.png",
  "Screenshot_2026-05-03_191358-removebg-preview.png",
  "Screenshot_2026-05-03_191406-removebg-preview.png",
  "Screenshot_2026-05-03_191411-removebg-preview.png",
  "Screenshot_2026-05-03_191418-removebg-preview.png"
];

const Preloader = ({ onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Cycle through images rapidly for the "constantly changing" effect
    const cycleInterval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 150); // Fast change

    // Flicker timing
    const flickerInterval = setInterval(() => {
      const el = document.getElementById('preloader-title');
      if (el) {
        el.style.opacity = Math.random() > 0.1 ? '1' : '0.4';
      }
    }, 50);

    // End after 2 seconds (plus 1s fade = 3s total)
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onComplete, 1000); // Allow fade animation to finish
    }, 2000);

    return () => {
      clearInterval(cycleInterval);
      clearInterval(flickerInterval);
      clearTimeout(timer);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="preloader-container"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
        >
          <Aurora
            colorStops={["#00d0ff", "#0800ff", "#ff00aa"]}
            blend={0.5}
            amplitude={1.0}
            speed={0.5}
          />
          <div className="preloader-content">
            <motion.div
              id="preloader-title"
              key={currentIndex}
              initial={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
              transition={{ duration: 0.1 }}
              className="flicker-image-wrapper"
            >
              <Image
                src={`/preloader/${images[currentIndex]}`}
                alt="Ruixen Loading"
                width={500}
                height={200}
                priority
                className="preloader-image"
              />
            </motion.div>
            
            {/* Subtle progress indicator */}
            <div className="preloader-progress">
              <motion.div 
                className="preloader-bar"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 2, ease: "linear" }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
