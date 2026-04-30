import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { CheckCircle, ShieldCheck, Fingerprint, MousePointer2, Info, ArrowRight, RotateCcw } from 'lucide-react';
import { cn } from '../../lib/utils';

interface Candidate {
  id: number;
  name: string;
  symbol: string;
  party: string;
}

const candidates: Candidate[] = [
  { id: 1, name: 'Constitutional Harmony Party', symbol: '⚖️', party: 'CHP' },
  { id: 2, name: 'Sovereign Digital Front', symbol: '🌐', party: 'SDF' },
  { id: 3, name: 'Civic Growth Alliance', symbol: '🌱', party: 'CGA' },
  { id: 4, name: 'VoterFlow Progressive', symbol: '🌊', party: 'VFP' },
];

export const EvmSimulator = () => {
  const [step, setStep] = useState<'intro' | 'identify' | 'ink' | 'vote' | 'vvpat' | 'complete'>('intro');
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  const [isVoted, setIsVoted] = useState(false);

  const nextStep = () => {
    if (step === 'intro') setStep('identify');
    else if (step === 'identify') setStep('ink');
    else if (step === 'ink') setStep('vote');
  };

  const castVote = (candidate: Candidate) => {
    if (isVoted) return;
    setSelectedCandidate(candidate);
    setIsVoted(true);
    // Simulate the iconic "BEEP" sound and wait for VVPAT
    setTimeout(() => {
      setStep('vvpat');
    }, 1500);
  };

  return (
    <div className="bg-white/40 backdrop-blur-xl rounded-[3.5rem] p-8 lg:p-12 border border-white/50 shadow-sm relative overflow-hidden min-h-[600px] flex flex-col">
      {/* Background Tech Patterns */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
      </div>

      <div className="flex justify-between items-center mb-12 relative z-10">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-civic-navy rounded-2xl flex items-center justify-center shadow-2xl">
            <ShieldCheck className="text-civic-saffron w-8 h-8" />
          </div>
          <div>
            <h3 className="text-2xl font-display font-bold text-civic-navy">Sovereign EVM Simulator</h3>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">ECI Protocol v4.2 // Secure Digital Mock</p>
          </div>
        </div>
        <div className="flex gap-2">
            {[1, 2, 3, 4].map((s) => (
                <div 
                    key={s} 
                    className={cn(
                        "w-8 h-1.5 rounded-full transition-all duration-500",
                        (step === 'intro' && s === 1) || 
                        (step === 'identify' && s === 1) || 
                        (step === 'ink' && s === 2) || 
                        (step === 'vote' && s === 3) || 
                        (step === 'vvpat' && s === 4) ||
                        (step === 'complete') ? "bg-civic-navy" : "bg-gray-100"
                    )}
                />
            ))}
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center relative z-10">
        <AnimatePresence mode="wait">
          {step === 'intro' && (
            <motion.div 
              key="intro"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="text-center max-w-md"
            >
              <div className="w-24 h-24 bg-civic-navy/5 rounded-[2.5rem] flex items-center justify-center mx-auto mb-8">
                <Info className="w-10 h-10 text-civic-navy" />
              </div>
              <h4 className="text-3xl font-bold text-civic-navy mb-4">Step-by-Step Voting</h4>
              <p className="text-sm text-gray-500 mb-10 leading-relaxed font-medium">
                New to the booth? Practice the official voting process in this safe, interactive environment before you head to the polls.
              </p>
              <button 
                onClick={nextStep}
                className="w-full py-5 bg-civic-navy text-white font-black rounded-2xl text-xs uppercase tracking-widest shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3"
              >
                Start Simulation <ArrowRight className="w-5 h-5" />
              </button>
            </motion.div>
          )}

          {step === 'identify' && (
            <motion.div 
              key="identify"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center max-w-lg"
            >
              <div className="relative inline-block mb-8">
                <div className="w-32 h-32 bg-civic-navy/5 rounded-full flex items-center justify-center">
                    <Fingerprint className="w-16 h-16 text-civic-navy animate-pulse" />
                </div>
                <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-civic-green rounded-full flex items-center justify-center border-4 border-white shadow-lg">
                    <CheckCircle className="w-5 h-5 text-white" />
                </div>
              </div>
              <h4 className="text-2xl font-bold text-civic-navy mb-2">Step 1: Identify Yourself</h4>
              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-8">Poll Officer Verification</p>
              <div className="bg-white/50 border border-white p-6 rounded-3xl text-left mb-10">
                <p className="text-xs text-gray-500 leading-relaxed">
                  Present your <span className="font-bold text-civic-navy">VoterFlow Sovereign ID</span> or EPIC Card. The officer will verify your name in the electoral roll and confirm your identity.
                </p>
              </div>
              <button 
                onClick={nextStep}
                className="w-full py-5 bg-civic-navy text-white font-black rounded-2xl text-xs uppercase tracking-widest shadow-2xl hover:scale-105 transition-all"
              >
                Identity Confirmed
              </button>
            </motion.div>
          )}

          {step === 'ink' && (
            <motion.div 
              key="ink"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-center max-w-lg"
            >
              <div className="w-48 h-48 bg-civic-navy/5 rounded-[3rem] flex items-center justify-center mx-auto mb-8 relative">
                 <div className="w-2 h-16 bg-civic-navy/20 rounded-full animate-bounce" />
                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-civic-navy rounded-full blur-sm animate-pulse" />
              </div>
              <h4 className="text-2xl font-bold text-civic-navy mb-2">Step 2: Marking the Finger</h4>
              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-8">Indelible Ink Protocol</p>
              <div className="bg-white/50 border border-white p-6 rounded-3xl text-left mb-10">
                <p className="text-xs text-gray-500 leading-relaxed">
                  A mark of indelible ink will be applied to your <span className="font-bold text-civic-navy">left index finger</span>. This signifies your participation and prevents double voting.
                </p>
              </div>
              <button 
                onClick={nextStep}
                className="w-full py-5 bg-civic-navy text-white font-black rounded-2xl text-xs uppercase tracking-widest shadow-2xl hover:scale-105 transition-all"
              >
                Finger Marked
              </button>
            </motion.div>
          )}

          {step === 'vote' && (
            <motion.div 
              key="vote"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full max-w-3xl"
            >
              <div className="flex items-center justify-between mb-8">
                 <div>
                    <h4 className="text-xl font-bold text-civic-navy">Step 3: Casting Your Vote</h4>
                    <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mt-1">EVM Control Unit Active</p>
                 </div>
                 <div className="flex items-center gap-3 px-4 py-2 bg-civic-green/10 rounded-full">
                    <div className="w-2 h-2 bg-civic-green rounded-full animate-pulse" />
                    <span className="text-[9px] font-black text-civic-green uppercase tracking-widest">Ready to Vote</span>
                 </div>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {candidates.map((c) => (
                  <button
                    key={c.id}
                    disabled={isVoted}
                    onClick={() => castVote(c)}
                    className={cn(
                        "p-6 rounded-3xl border flex items-center justify-between transition-all group relative overflow-hidden",
                        selectedCandidate?.id === c.id ? "bg-civic-navy text-white border-civic-navy scale-[1.02] shadow-2xl" : 
                        isVoted ? "bg-gray-50 border-gray-100 opacity-50" : "bg-white border-gray-100 hover:border-civic-navy/30"
                    )}
                  >
                    <div className="flex items-center gap-6">
                        <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                            {c.symbol}
                        </div>
                        <div className="text-left">
                            <div className="text-sm font-bold">{c.name}</div>
                            <div className="text-[10px] font-bold text-gray-400 uppercase group-hover:text-white/60">{c.party}</div>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className={cn(
                            "w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all",
                            selectedCandidate?.id === c.id ? "bg-red-500 border-red-400 shadow-[0_0_15px_rgba(239,68,68,0.5)]" : "border-gray-100"
                        )}>
                            <div className={cn("w-3 h-3 rounded-full", selectedCandidate?.id === c.id ? "bg-white" : "bg-gray-100")} />
                        </div>
                        <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
                            <MousePointer2 className="w-5 h-5 text-gray-400" />
                        </div>
                    </div>
                    {selectedCandidate?.id === c.id && (
                        <motion.div 
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="absolute right-20 top-1/2 -translate-y-1/2 text-[10px] font-black uppercase tracking-widest text-red-400"
                        >
                            Voted
                        </motion.div>
                    )}
                  </button>
                ))}
              </div>
              
              <p className="text-[9px] text-center text-gray-400 mt-8 font-medium italic">
                Wait for the "BEEP" sound after pressing your choice. Your vote is secret and secure.
              </p>
            </motion.div>
          )}

          {step === 'vvpat' && (
            <motion.div 
              key="vvpat"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center max-w-lg"
            >
              <div className="bg-gray-100 rounded-[3.5rem] p-12 border-8 border-civic-navy/10 relative overflow-hidden mb-8">
                 <div className="absolute top-0 left-0 w-full h-1 bg-civic-navy/5" />
                 <motion.div 
                    initial={{ y: -100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="w-48 h-64 bg-white mx-auto shadow-2xl rounded-lg p-6 border border-gray-100 flex flex-col items-center justify-center gap-4"
                 >
                    <div className="text-4xl">{selectedCandidate?.symbol}</div>
                    <div className="text-center">
                        <div className="text-[10px] font-black text-gray-400 uppercase mb-1">Serial No: {selectedCandidate?.id}</div>
                        <div className="text-xs font-bold text-civic-navy">{selectedCandidate?.name}</div>
                    </div>
                    <div className="mt-4 pt-4 border-t border-gray-100 w-full text-[8px] font-black text-gray-300 uppercase tracking-widest">
                        VVPAT VERIFICATION 2026
                    </div>
                 </motion.div>
              </div>
              <h4 className="text-2xl font-bold text-civic-navy mb-2">Step 4: VVPAT Verification</h4>
              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-8">Verification of Cast Vote</p>
              <p className="text-sm text-gray-500 mb-10 leading-relaxed font-medium">
                The VVPAT (Voter Verifiable Paper Audit Trail) displays the symbol and name of the candidate you voted for. It stays visible for <span className="font-bold text-civic-navy">7 seconds</span> before dropping into the sealed box.
              </p>
              <button 
                onClick={() => setStep('complete')}
                className="w-full py-5 bg-civic-navy text-white font-black rounded-2xl text-xs uppercase tracking-widest shadow-2xl hover:scale-105 transition-all"
              >
                Verification Complete
              </button>
            </motion.div>
          )}

          {step === 'complete' && (
            <motion.div 
              key="complete"
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center max-w-md"
            >
              <div className="w-24 h-24 bg-civic-green/10 rounded-full flex items-center justify-center mx-auto mb-8">
                <CheckCircle className="w-12 h-12 text-civic-green" />
              </div>
              <h4 className="text-3xl font-bold text-civic-navy mb-4">You're Ready to Vote!</h4>
              <p className="text-sm text-gray-500 mb-10 leading-relaxed font-medium">
                You've successfully completed the voting simulation. Remember these steps on Election Day in May 2026.
              </p>
              <div className="grid grid-cols-2 gap-4">
                  <button 
                    onClick={() => {
                        setStep('intro');
                        setIsVoted(false);
                        setSelectedCandidate(null);
                    }}
                    className="py-4 bg-gray-100 text-civic-navy font-bold rounded-2xl text-xs flex items-center justify-center gap-2"
                  >
                    <RotateCcw className="w-4 h-4" /> Practice Again
                  </button>
                  <button 
                    onClick={() => window.location.reload()}
                    className="py-4 bg-civic-navy text-white font-bold rounded-2xl text-xs flex items-center justify-center gap-2"
                  >
                    Go to Dashboard
                  </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Instructional Tooltip Footer */}
      <div className="mt-8 pt-8 border-t border-gray-100 flex items-center gap-3">
        <Info className="w-5 h-5 text-gray-300" />
        <p className="text-[10px] text-gray-400 font-medium">
           {step === 'intro' && 'Click Start to begin your training session.'}
           {step === 'identify' && 'Presentation of ID is the first legal step in the booth.'}
           {step === 'ink' && 'Ink marking is a century-old tradition to ensure democratic integrity.'}
           {step === 'vote' && 'Select your candidate by pressing the button next to their symbol.'}
           {step === 'vvpat' && 'Your vote is recorded only after VVPAT verification.'}
           {step === 'complete' && 'Simulated session concluded. System standing by.'}
        </p>
      </div>
    </div>
  );
};
