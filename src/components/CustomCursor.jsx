"use client";
import React, { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const springConfig = { damping: 25, stiffness: 150 };
  const cursorX = useSpring(0, springConfig);
  const cursorY = useSpring(0, springConfig);

  useEffect(() => {
    const moveMouse = (e) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
    };

    const handleHover = () => setIsHovering(true);
    const handleUnhover = () => setIsHovering(false);

    window.addEventListener('mousemove', moveMouse);

    const interactiveElements = document.querySelectorAll('a, button, .interactive');
    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', handleHover);
      el.addEventListener('mouseleave', handleUnhover);
    });

    return () => {
      window.removeEventListener('mousemove', moveMouse);
      interactiveElements.forEach((el) => {
        el.removeEventListener('mouseenter', handleHover);
        el.removeEventListener('mouseleave', handleUnhover);
      });
    };
  }, [cursorX, cursorY]);

  return (
    <>
      <motion.div
        className="cursor-ring"
        style={{
          translateX: cursorX,
          translateY: cursorY,
          scale: isHovering ? 2.5 : 1,
        }}
      />
      <style jsx>{`
        .cursor-ring {
          position: fixed;
          left: 0;
          top: 0;
          width: 32px;
          height: 32px;
          border: 1px solid var(--primary);
          border-radius: 50%;
          pointer-events: none;
          z-index: 9999;
          transition: scale 0.3s ease;
          mix-blend-mode: difference;
        }
        @media (max-width: 768px) {
          .cursor-ring {
            display: none;
          }
        }
      `}</style>
    </>
  );
};

export default CustomCursor;
