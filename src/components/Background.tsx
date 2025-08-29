'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const backgroundImages = [
  '/images/gallery/gtaai_background.jpeg',
  '/images/gallery/image_10.jpeg',
  '/images/gallery/image_20.jpeg',
  '/images/gallery/image_25.jpeg',
  '/images/gallery/image_35.jpeg',
];

const ripples = Array.from({ length: 8 }, (_, i) => ({
  id: i,
  delay: i * 0.06,
  size: 210 + i * 70,
  opacity: 0.24 - i * 0.03,
}));

export default function Background() {
  const [currentBg, setCurrentBg] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBg((prev) => (prev + 1) % backgroundImages.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 -z-10">
      {/* Background Images */}
      <div className="absolute inset-0">
        {backgroundImages.map((image, index) => (
          <motion.div
            key={image}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: index === currentBg ? 1 : 0 
            }}
            transition={{ duration: 1.5 }}
          >
            <img
              src={image}
              alt="GTA AI Background"
              className="w-full h-full object-cover"
            />
          </motion.div>
        ))}
        
        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/60 via-transparent to-purple-900/60" />
        <div className="absolute inset-0 bg-gradient-to-br from-pink-600/20 via-transparent to-cyan-500/20" />
      </div>

      {/* Ripple Animation */}
      <div className="pointer-events-none select-none absolute inset-0 z-5 opacity-30">
        <div className="absolute inset-0">
          {ripples.map((ripple) => (
            <motion.div
              key={ripple.id}
              className="absolute rounded-full border border-white/20 shadow-xl"
              style={{
                width: `${ripple.size}px`,
                height: `${ripple.size}px`,
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
              }}
              animate={{
                scale: [1, 4],
                opacity: [ripple.opacity, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: ripple.delay,
                ease: 'easeOut',
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}