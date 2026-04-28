import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

export const Waveform = () => {
  return (
    <div className="flex items-end justify-center gap-1 h-10 w-24 px-2">
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          animate={{ 
            height: ["20%", "80%", "40%", "100%", "20%"],
            opacity: [0.4, 1, 0.7, 1, 0.4]
          }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            delay: i * 0.08,
            ease: "easeInOut"
          }}
          className={cn(
            "w-1 rounded-full shadow-[0_0_15px_currentColor]",
            i % 4 === 0 ? "bg-[#4285F4]" : // Google Blue
            i % 4 === 1 ? "bg-[#EA4335]" : // Google Red
            i % 4 === 2 ? "bg-[#FBBC05]" : // Google Yellow
            "bg-[#34A853]"                // Google Green
          )}
          style={{
            filter: 'blur(0.5px) saturate(1.8) brightness(1.2)'
          }}
        />
      ))}
    </div>
  );
};
