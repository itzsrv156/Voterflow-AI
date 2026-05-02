import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useVoterStore } from '../../store/useVoterStore';
import { CheckCircle, ChevronRight, Info, Upload, FileText, X, Loader2, Calendar } from 'lucide-react';
import { cn } from '../../lib/utils';

interface StepProps {
  onNext: () => void;
  onBack?: () => void;
}

const EligibilityStep = ({ onNext }: StepProps) => {
  const [dob, setDob] = useState('');
  const [isFutureVoter, setIsFutureVoter] = useState(false);

  const handleDobChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDate = new Date(e.target.value);
    const qualifyingDate = new Date('2026-01-01');
    setDob(e.target.value);
    
    // Check if age is < 18 on 01-01-2026
    const age = qualifyingDate.getFullYear() - selectedDate.getFullYear();
    const m = qualifyingDate.getMonth() - selectedDate.getMonth();
    const isUnder18 = (age < 18) || (age === 18 && m < 0) || (age === 18 && m === 0 && qualifyingDate.getDate() < selectedDate.getDate());
    
    setIsFutureVoter(isUnder18);
  };

  return (
    <motion.div
      initial={{ x: 50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -50, opacity: 0 }}
      className="space-y-6"
    >
      <div className="bg-civic-navy/5 dark:bg-white/5 p-6 rounded-2xl border border-civic-navy/10 dark:border-white/10">
        <h3 className="text-xl font-bold text-civic-navy dark:text-white/90 mb-4 flex items-center gap-2">
          <Calendar className="w-6 h-6 text-civic-saffron" />
          Step 1: Date of Birth
        </h3>
        <div className="space-y-4">
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-gray-400 uppercase">Select Birth Date</label>
            <input 
              type="date" 
              value={dob}
              onChange={handleDobChange}
              className="w-full p-4 bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-civic-navy outline-none font-bold text-civic-navy dark:text-white"
            />
          </div>

          <AnimatePresence>
            {isFutureVoter && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                className="p-4 bg-blue-50 border border-blue-100 rounded-xl flex items-start gap-3"
              >
                <Info className="w-5 h-5 text-blue-600 shrink-0" />
                <p className="text-xs text-blue-800 leading-relaxed">
                  <strong>You are a Future Voter.</strong> You can pre-register now, but your voter card will be issued after you turn 18.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      <button
        onClick={onNext}
        disabled={!dob}
        className={cn(
          "w-full py-4 font-bold rounded-2xl flex items-center justify-center gap-2 transition-all overflow-hidden relative",
          dob ? "bg-civic-navy text-white hover:bg-civic-navy/90 dark:shadow-[0_0_20px_rgba(66,133,244,0.3)]" : "bg-white/[0.05] dark:bg-white/[0.05] text-slate-500 dark:text-slate-500"
        )}
      >
        Continue <ChevronRight className="w-5 h-5" />
      </button>
    </motion.div>
  );
};

const Form6Assistant = ({ onNext }: StepProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [annexureChecked, setAnnexureChecked] = useState(false);
  const { persona } = useVoterStore();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setIsScanning(true);
      // Simulate AI Document Scan for 2 seconds
      setTimeout(() => {
        setFile(selectedFile);
        setIsScanning(false);
      }, 2000);
    }
  };

  const canContinue = persona === 'Student' ? (file && annexureChecked) : file;

  return (
    <motion.div
      initial={{ x: 50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -50, opacity: 0 }}
      className="space-y-6"
    >
      <div className="bg-civic-saffron/5 p-6 rounded-2xl border border-civic-saffron/10">
        <h3 className="text-xl font-bold text-civic-navy dark:text-white mb-4 flex items-center gap-2">
          <FileText className="w-6 h-6 text-civic-saffron" />
          Step 2: Document Scan
        </h3>
        
        <div className="space-y-4">
          <input 
            type="file" 
            ref={fileInputRef} 
            className="hidden" 
            onChange={handleFileChange}
            accept=".pdf,.jpg,.jpeg,.png"
          />
          
          <button 
            onClick={() => fileInputRef.current?.click()}
            disabled={isScanning}
            className={cn(
              "w-full p-8 rounded-2xl border-2 border-dashed transition-all flex flex-col items-center justify-center gap-3 relative overflow-hidden",
              file ? "bg-civic-green/10 border-civic-green" : "bg-white border-gray-200 hover:border-civic-navy"
            )}
          >
            {isScanning ? (
              <>
                <Loader2 className="w-10 h-10 text-civic-navy dark:text-civic-saffron animate-spin" />
                <p className="text-sm font-bold text-civic-navy dark:text-white italic">Gemini Sovereign Core Analyzing...</p>
                <div className="mt-2 flex gap-1">
                    {[1,2,3].map(i => <div key={i} className="w-1 h-1 bg-civic-saffron rounded-full animate-bounce" style={{ animationDelay: `${i*0.2}s` }} />)}
                </div>
                <motion.div 
                  initial={{ x: '-100%' }}
                  animate={{ x: '100%' }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                  className="absolute top-0 left-0 w-full h-1 bg-civic-saffron/40"
                />
              </>
            ) : file ? (
              <div className="flex flex-col items-center">
                <CheckCircle className="w-12 h-12 text-civic-green mb-4" />
                <p className="text-[10px] font-black text-civic-navy dark:text-white uppercase tracking-widest bg-civic-green/10 dark:bg-civic-green/20 px-3 py-1 rounded-full mb-4">Gemini OCR Verified</p>
                <div className="text-left w-full bg-white/60 dark:bg-black/40 p-4 rounded-xl border border-civic-green/20 space-y-2">
                    <div className="flex justify-between items-center">
                        <span className="text-[8px] font-black text-gray-400 uppercase">Extracted Name</span>
                        <span className="text-[10px] font-bold text-civic-navy dark:text-white uppercase tracking-tight">SARVESH ARUNKUMAR</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-[8px] font-black text-gray-400 uppercase">Sovereign Validation</span>
                        <span className="text-[10px] font-bold text-civic-green">YES / COMPLIANT</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-[8px] font-black text-gray-400 uppercase">Qualifying Date</span>
                        <span className="text-[10px] font-bold text-civic-navy dark:text-slate-300">01-01-2026</span>
                    </div>
                </div>
              </div>
            ) : (
              <>
                <Upload className="w-10 h-10 text-gray-300" />
                <div className="text-center">
                  <p className="text-sm font-bold text-gray-500">Upload ID for Gemini Scan</p>
                  <p className="text-[10px] text-gray-400 uppercase tracking-widest mt-1">Vertex AI Multimodal Logic</p>
                </div>
              </>
            )}
          </button>

          {persona === 'Student' && (
            <div className="p-4 bg-white rounded-xl border border-civic-saffron/20">
              <label className="flex items-center gap-3 cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={annexureChecked}
                  onChange={(e) => setAnnexureChecked(e.target.checked)}
                  className="w-5 h-5 accent-civic-saffron rounded"
                />
                <span className="text-xs font-bold text-civic-navy dark:text-white uppercase">I have Annexure-II signed by Warden</span>
              </label>
            </div>
          )}
        </div>
      </div>
      
      <button
        onClick={onNext}
        disabled={!canContinue || isScanning}
        className={cn(
          "w-full py-4 font-bold rounded-2xl flex items-center justify-center gap-2 transition-all shadow-xl shadow-civic-navy/10 overflow-hidden relative",
          canContinue ? "bg-civic-navy text-white" : "bg-gray-100 dark:bg-white/[0.05] text-gray-400 dark:text-slate-500"
        )}
      >
        Next Step <ChevronRight className="w-5 h-5" />
      </button>
    </motion.div>
  );
};

const FinalStep = ({ onNext }: StepProps) => (
  <motion.div
    initial={{ x: 50, opacity: 0 }}
    animate={{ x: 0, opacity: 1 }}
    exit={{ x: -50, opacity: 0 }}
    className="space-y-6"
  >
    <div className="bg-civic-green/5 p-8 rounded-2xl border border-civic-green/10 text-center">
      <CheckCircle className="w-16 h-16 text-civic-green mx-auto mb-6" />
      <h3 className="text-2xl font-bold text-civic-navy dark:text-white mb-2">Form 6 Ready to Submit</h3>
      <p className="text-sm text-gray-500 mb-6 leading-relaxed">
        Your documents have been scanned and verified.
      </p>
      
      <div className="bg-white/60 dark:bg-black/40 p-6 rounded-2xl border border-civic-green/20 text-left space-y-4 mb-6 transition-all duration-700">
          <h4 className="text-[10px] font-black text-civic-navy dark:text-white uppercase tracking-widest flex items-center gap-2">
              <Info className="w-4 h-4 text-civic-saffron" /> What Happens Next?
          </h4>
          <ul className="space-y-3">
              {[
                  "Your application enters the Verification Phase.",
                  "A Booth Level Officer (BLO) may visit for a field check.",
                  "You can track status in your Sovereign Dashboard.",
                  "Prepare for Voting Day in May 2026!"
              ].map((text, i) => (
                  <li key={i} className="flex items-start gap-2 text-[10px] font-medium text-gray-500">
                      <div className="w-1 h-1 bg-civic-navy rounded-full mt-1.5" />
                      {text}
                  </li>
              ))}
          </ul>
      </div>
    </div>
    <button
      onClick={onNext}
      className="w-full py-4 bg-civic-green text-white font-bold rounded-2xl dark:shadow-[0_0_20px_rgba(18,136,7,0.3)] flex items-center justify-center gap-2"
    >
      Submit Form 6 <ChevronRight className="w-5 h-5" />
    </button>
  </motion.div>
);

export const RegistrationFlow = ({ onClose }: { onClose: () => void }) => {
  const [step, setStep] = useState(1);
  const { updateProgress } = useVoterStore();

  const handleNext = () => {
    updateProgress('registration', (step / 3) * 100);
    if (step === 3) onClose();
    else setStep(step + 1);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-civic-navy/40 backdrop-blur-md">
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        className="bg-white dark:bg-[#0A0A0A] w-full max-w-lg rounded-[2.5rem] shadow-2xl overflow-hidden relative border dark:border-white/10"
      >
        <button onClick={onClose} className="absolute top-6 right-6 p-2 bg-gray-100 dark:bg-white/10 rounded-full hover:bg-red-50 dark:hover:bg-red-500/20 hover:text-red-500 dark:text-slate-400 transition-colors z-10 overflow-hidden relative">
          <X className="w-5 h-5" />
        </button>
        <div className="p-10">
          <div className="flex gap-2 mb-8">
            {[1, 2, 3].map((s) => (
              <div key={s} className={cn("h-1.5 flex-1 rounded-full transition-all duration-500", s <= step ? "bg-civic-navy dark:bg-civic-saffron" : "bg-gray-100 dark:bg-white/10")} />
            ))}
          </div>
          <AnimatePresence mode="wait">
            {step === 1 && <EligibilityStep key="step1" onNext={handleNext} />}
            {step === 2 && <Form6Assistant key="step2" onNext={handleNext} />}
            {step === 3 && <FinalStep key="step3" onNext={handleNext} />}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};
