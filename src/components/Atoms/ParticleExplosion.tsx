import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../lib/utils';

interface ParticleExplosionProps {
  isVisible: boolean;
  onComplete?: () => void;
  color?: string;
  count?: number;
}

export const ParticleExplosion: React.FC<ParticleExplosionProps> = ({ 
  isVisible, 
  onComplete,
  count = 40
}) => {
  const [particles, setParticles] = useState<{ id: number; x: number; y: number; scale: number; rotation: number; delay: number; duration: number }[]>([]);

  useEffect(() => {
    if (isVisible) {
      const newParticles = Array.from({ length: count }).map((_, i) => ({
        id: i,
        // Random angle and distance for a burst effect
        x: (Math.random() - 0.5) * 500,
        y: (Math.random() - 0.5) * 500,
        scale: Math.random() * 1.5 + 0.5,
        rotation: Math.random() * 360,
        delay: Math.random() * 0.2,
        duration: 1.5 + Math.random() * 1
      }));
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setParticles(newParticles);
      
      const timer = setTimeout(() => {
        if (onComplete) onComplete();
      }, 2500); // Wait for the longest animation
      
      return () => clearTimeout(timer);
    } else {
      setParticles([]);
    }
  }, [isVisible, count, onComplete]);

  return (
    <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-50">
      <AnimatePresence>
        {isVisible && particles.map((p) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 1, scale: 0, x: 0, y: 0, rotate: 0 }}
            animate={{ 
              opacity: [1, 1, 0], 
              scale: [0, p.scale, p.scale * 0.5], 
              x: p.x, 
              y: p.y, 
              rotate: p.rotation 
            }}
            transition={{ 
              duration: p.duration, 
              ease: "easeOut",
              delay: p.delay
            }}
            className={cn(
                "absolute w-3 h-3 rounded-full shadow-[0_0_20px_rgba(255,255,255,0.9)]",
                p.id % 3 === 0 ? "bg-civic-saffron" : 
                p.id % 3 === 1 ? "bg-civic-navy" : "bg-civic-green"
            )}
            style={{ filter: 'brightness(1.5) saturate(1.2)' }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};
