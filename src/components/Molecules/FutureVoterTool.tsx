import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Info, CheckCircle2, AlertCircle } from 'lucide-react';

export const FutureVoterTool = () => {
  const [dob, setDob] = useState('');
  const [result, setResult] = useState<{ qualifyingDate: string, electionYear: string } | null>(null);

  const calculateEligibility = (birthDate: string) => {
    const date = new Date(birthDate);
    if (isNaN(date.getTime())) return;

    // ECI 2026 Rules: 4 Qualifying dates: Jan 1, Apr 1, Jul 1, Oct 1
    const eighteenYearsLater = new Date(date);
    eighteenYearsLater.setFullYear(date.getFullYear() + 18);

    const qualifyingDates = [
        new Date(eighteenYearsLater.getFullYear(), 0, 1),
        new Date(eighteenYearsLater.getFullYear(), 3, 1),
        new Date(eighteenYearsLater.getFullYear(), 6, 1),
        new Date(eighteenYearsLater.getFullYear(), 9, 1),
        new Date(eighteenYearsLater.getFullYear() + 1, 0, 1),
    ];

    const nextQualifying = qualifyingDates.find(qd => qd >= eighteenYearsLater);
    
    if (nextQualifying) {
        setResult({
            qualifyingDate: nextQualifying.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }),
            electionYear: nextQualifying.getFullYear() >= 2026 ? "2026 General Elections" : "Next Assembly Cycle"
        });
    }
  };

  return (
    <div className="bg-white/40 backdrop-blur-xl rounded-[2.5rem] p-8 border border-white/60 shadow-xl">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 bg-civic-navy rounded-2xl flex items-center justify-center shadow-lg">
            <Calendar className="w-6 h-6 text-civic-saffron" />
        </div>
        <div>
            <h3 className="text-xl font-display font-bold text-civic-navy">Future Voter Calculator</h3>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">ECI 2026 Eligibility Logic</p>
        </div>
      </div>

      <div className="space-y-6">
          <div className="flex flex-col gap-2">
              <label className="text-[10px] font-black text-civic-navy uppercase tracking-widest ml-1">Enter Date of Birth</label>
              <input 
                type="date"
                value={dob}
                onChange={(e) => {
                    setDob(e.target.value);
                    calculateEligibility(e.target.value);
                }}
                className="w-full p-5 bg-white border border-gray-100 rounded-2xl font-bold text-civic-navy focus:ring-4 focus:ring-civic-navy/5 outline-none transition-all"
              />
          </div>

          <AnimatePresence mode="wait">
              {result ? (
                <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-4"
                >
                    <div className="p-6 bg-civic-navy text-white rounded-[2rem] shadow-2xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-6 opacity-10">
                            <CheckCircle2 className="w-20 h-20" />
                        </div>
                        <div className="text-[9px] font-black uppercase tracking-[0.2em] opacity-60 mb-2">Qualifying Date</div>
                        <div className="text-2xl font-display font-bold text-civic-saffron mb-4">{result.qualifyingDate}</div>
                        <div className="flex items-center gap-2 text-[10px] font-bold">
                            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                            Eligible for {result.electionYear}
                        </div>
                    </div>
                    
                    <div className="p-4 bg-white/60 rounded-xl border border-gray-100 flex items-start gap-3">
                        <Info className="w-4 h-4 text-civic-navy shrink-0 mt-0.5" />
                        <p className="text-[10px] text-gray-500 leading-relaxed font-medium">
                            You can **Pre-Register** now via Form 6. Your Voter ID will be generated automatically on your qualifying date.
                        </p>
                    </div>
                </motion.div>
              ) : (
                <div className="p-8 bg-gray-50/50 rounded-[2rem] border border-dashed border-gray-200 text-center space-y-3">
                    <AlertCircle className="w-8 h-8 text-gray-200 mx-auto" />
                    <p className="text-[10px] font-bold text-gray-300 uppercase tracking-widest">Awaiting Date Input</p>
                </div>
              )}
          </AnimatePresence>
      </div>
    </div>
  );
};
