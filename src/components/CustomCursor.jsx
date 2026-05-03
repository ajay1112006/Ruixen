"use client";
import React, { useEffect, useRef, useState } from 'react';

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const numTailDots = 15;
  const tailRefs = useRef(new Array(numTailDots).fill(null));
  
  const [isHovering, setIsHovering] = useState(false);
  const isHoveringRef = useRef(false);

  useEffect(() => {
    let mouseX = typeof window !== 'undefined' ? window.innerWidth / 2 : 0;
    let mouseY = typeof window !== 'undefined' ? window.innerHeight / 2 : 0;
    
    // Create an array to track position of each tail segment
    const tailPos = Array.from({ length: numTailDots }, () => ({ x: mouseX, y: mouseY }));
    let animationFrameId;

    const moveMouse = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      
      // Update core instantly
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${mouseX - 6}px, ${mouseY - 6}px, 0) scale(${isHoveringRef.current ? 2 : 1})`;
        cursorRef.current.style.opacity = '1';
      }
    };

    // Fluid liquid tail using chained spring physics
    const renderTrail = () => {
      // First dot closely follows mouse
      tailPos[0].x += (mouseX - tailPos[0].x) * 0.5;
      tailPos[0].y += (mouseY - tailPos[0].y) * 0.5;

      // Each subsequent dot follows the one before it
      for (let i = 1; i < numTailDots; i++) {
        tailPos[i].x += (tailPos[i - 1].x - tailPos[i].x) * 0.45;
        tailPos[i].y += (tailPos[i - 1].y - tailPos[i].y) * 0.45;
      }
      
      tailRefs.current.forEach((ref, index) => {
        if (ref) {
          // Tail gets smaller towards the end, and shrinks to 0 on hover
          const scale = (1 - (index / numTailDots)) * (isHoveringRef.current ? 0 : 1);
          ref.style.transform = `translate3d(${tailPos[index].x - 8}px, ${tailPos[index].y - 8}px, 0) scale(${scale})`;
          
          // Show tail only when not hovering
          ref.style.opacity = isHoveringRef.current ? '0' : '1';
        }
      });
      
      animationFrameId = requestAnimationFrame(renderTrail);
    };

    renderTrail();

    const handleHover = () => {
      setIsHovering(true);
      isHoveringRef.current = true;
      if (cursorRef.current) {
         cursorRef.current.style.transform = `translate3d(${mouseX - 6}px, ${mouseY - 6}px, 0) scale(2)`;
      }
    };
    
    const handleUnhover = () => {
      setIsHovering(false);
      isHoveringRef.current = false;
      if (cursorRef.current) {
         cursorRef.current.style.transform = `translate3d(${mouseX - 6}px, ${mouseY - 6}px, 0) scale(1)`;
      }
    };

    window.addEventListener('mousemove', moveMouse);

    const setupInteractivity = () => {
      const interactiveElements = document.querySelectorAll('a, button, input, textarea, .interactive');
      interactiveElements.forEach((el) => {
        el.removeEventListener('mouseenter', handleHover);
        el.removeEventListener('mouseleave', handleUnhover);
        
        el.addEventListener('mouseenter', handleHover);
        el.addEventListener('mouseleave', handleUnhover);
      });
    };

    setupInteractivity();
    
    const observer = new MutationObserver(() => setupInteractivity());
    observer.observe(document.body, { childList: true, subtree: true });

    document.body.style.cursor = 'none';

    return () => {
      window.removeEventListener('mousemove', moveMouse);
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
      document.body.style.cursor = 'auto';
    };
  }, []);

  return (
    <>
      {/* Gradient Tail Segments */}
      {Array.from({ length: numTailDots }).map((_, i) => {
        const ratio = i / (numTailDots - 1);
        return (
          <div
            key={i}
            ref={(el) => (tailRefs.current[i] = el)}
            className="cursor-tail-dot"
            style={{
              // Fluid gradient transition from Cyan to Pink across the tail
              background: `color-mix(in srgb, var(--primary, #00d0ff) ${Math.round((1 - ratio) * 100)}%, var(--accent, #ff00aa))`
            }}
          />
        );
      })}

      {/* Core Dot */}
      <div ref={cursorRef} className="simple-3d-cursor">
        <div className="sphere-highlight" />
      </div>

      <style jsx>{`
        :global(a), :global(button), :global(input), :global(textarea) {
          cursor: none !important;
        }

        .simple-3d-cursor {
          position: fixed;
          left: 0;
          top: 0;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          pointer-events: none;
          z-index: 999999;
          
          opacity: 0;
          
          transition: transform 0.15s cubic-bezier(0.175, 0.885, 0.32, 1.275), opacity 0.3s ease;
          will-change: transform;
          
          background: radial-gradient(circle at 35% 35%, #ffffff 0%, var(--primary, #00d0ff) 50%, var(--secondary, #0800ff) 100%);
          box-shadow: 
            0 10px 20px rgba(0,0,0,0.6),
            inset 0 -5px 15px rgba(0,0,0,0.5),
            inset 0 5px 15px rgba(255,255,255,0.9),
            0 0 20px var(--primary, #00d0ff);
        }

        .sphere-highlight {
          position: absolute;
          top: 15%;
          left: 15%;
          width: 30%;
          height: 30%;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0) 70%);
        }

        .cursor-tail-dot {
          position: fixed;
          left: 0;
          top: 0;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          pointer-events: none;
          z-index: 999998; /* Just below the main dot */
          
          opacity: 0;
          
          /* Heavy blur to fuse dots together into a continuous liquid tail */
          filter: blur(4px);
          
          /* Only opacity is transitioned by CSS, position/scale is high-speed JS lerp */
          transition: opacity 0.3s ease;
          will-change: transform, opacity;
        }
      `}</style>
    </>
  );
};

export default CustomCursor;
