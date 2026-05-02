import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useVoterStore } from '../../store/useVoterStore';
import { Fingerprint, Monitor, FileCheck, ChevronRight, CheckCircle } from 'lucide-react';

const steps = [
  {
    id: 'ink',
    title: 'ID Verification',
    desc: 'The Indelible Ink is applied. Your identity is verified against the roll.',
    icon: Fingerprint,
    color: 'text-blue-600',
    bg: 'bg-blue-50',
  },
  {
    id: 'evm',
    title: 'The EVM Vote',
    desc: 'Press the button for your candidate. Listen for the long Beep.',
    icon: Monitor,
    color: 'text-civic-navy',
    bg: 'bg-civic-navy/5',
  },
  {
    id: 'vvpat',
    title: 'VVPAT Verification',
    desc: 'Verify the slip through the window. It drops into the box after 7 seconds.',
    icon: FileCheck,
    color: 'text-civic-green',
    bg: 'bg-civic-green/5',
  },
];

export const PollingSimulator = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const { updateProgress } = useVoterStore();

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
      updateProgress('polling', ((currentStep + 1) / steps.length) * 100);
    } else {
      setIsComplete(true);
      updateProgress('polling', 100);
    }
  };

  const step = steps[currentStep];
  const Icon = step.icon;

  return (
    <div className="bg-white dark:bg-white/[0.03] rounded-3xl p-8 border border-gray-100 dark:border-white/10 shadow-xl overflow-hidden relative transition-all duration-700">
      <AnimatePresence mode="wait">
        {!isComplete ? (
          <motion.div
            key={currentStep}
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -20, opacity: 0 }}
            className="flex flex-col items-center text-center"
          >
            <div className={`w-20 h-20 ${step.bg} ${step.color} rounded-2xl flex items-center justify-center mb-6`}>
              <Icon className="w-10 h-10" />
            </div>
            <h4 className="text-xl font-bold text-civic-navy dark:text-white mb-2">{step.title}</h4>
            <p className="text-gray-500 text-sm mb-8 leading-relaxed max-w-xs">{step.desc}</p>
            
            <div className="flex gap-2 mb-8">
              {steps.map((_, i) => (
                <div 
                  key={i} 
                  className={`h-1.5 w-8 rounded-full transition-all duration-500 ${
                    i <= currentStep ? 'bg-civic-navy dark:bg-civic-saffron' : 'bg-gray-100 dark:bg-white/10'
                  }`}
                />
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleNext}
              className="w-full py-4 bg-civic-navy text-white font-bold rounded-2xl dark:shadow-[0_0_20px_rgba(66,133,244,0.3)] flex items-center justify-center gap-2"
            >
              {currentStep === steps.length - 1 ? 'Finish Simulation' : 'Next Step'} 
              <ChevronRight className="w-5 h-5" />
            </motion.button>
          </motion.div>
        ) : (
          <motion.div
            key="complete"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="flex flex-col items-center text-center py-10"
          >
            <div className="w-20 h-20 bg-civic-green/10 text-civic-green rounded-full flex items-center justify-center mb-6">
              <CheckCircle className="w-10 h-10" />
            </div>
            <h4 className="text-2xl font-bold text-civic-navy dark:text-white mb-2">Simulated Vote Cast!</h4>
            <p className="text-gray-500 text-sm mb-8">You are now ready for the real Polling Day.</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => { setIsComplete(false); setCurrentStep(0); updateProgress('polling', 0); }}
              className="px-8 py-3 border-2 border-civic-navy dark:border-white/20 text-civic-navy dark:text-white font-bold rounded-xl"
            >
              Reset Simulator
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
