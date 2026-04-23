import { motion, AnimatePresence } from 'framer-motion';
import { useVoterStore } from '../../store/useVoterStore';
import { useTranslation } from '../../LanguageContext';
import { ShieldCheck, Flame, Radio, Globe, User, ExternalLink } from 'lucide-react';
import { cn } from '../../lib/utils';
import { useState } from 'react';

export const Header = () => {
  const { setView, resetStore, view, language, setLanguage } = useVoterStore();
  const { t } = useTranslation();
  const [showCredits, setShowCredits] = useState(false);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-[1000] px-10 py-6"
    >
      <div className="max-w-[1600px] mx-auto flex items-center justify-between bg-white/40 backdrop-blur-3xl border border-white/40 rounded-[2.5rem] px-10 py-5 shadow-2xl">
        {/* Logo - Click to Reload/Home */}
        <button 
          onClick={() => resetStore()}
          className="flex items-center gap-3 group transition-transform active:scale-95"
        >
          <div className="w-12 h-12 bg-civic-navy rounded-2xl flex items-center justify-center shadow-xl group-hover:rotate-12 transition-transform">
            <Flame className="text-civic-saffron w-7 h-7" />
          </div>
          <div className="text-left">
            <h1 className="text-2xl font-display font-bold text-civic-navy leading-none tracking-tight">
              VoterFlow <span className="text-civic-saffron">AI</span>
            </h1>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mt-1 block group-hover:text-civic-navy transition-colors">Sovereign Edition</span>
          </div>
        </button>

        {/* Live Status Badge */}
        <div className="hidden md:flex items-center gap-8">
            <div className="flex items-center gap-4 px-6 py-3 bg-white/50 rounded-2xl border border-white shadow-sm">
                <div className="relative">
                    <div className="w-3 h-3 bg-civic-green rounded-full animate-ping absolute" />
                    <div className="w-3 h-3 bg-civic-green rounded-full relative" />
                </div>
                <span className="text-[10px] font-bold text-civic-navy uppercase tracking-widest">Live: SIR 2026 Cycle</span>
            </div>

            <div className="h-10 w-px bg-gray-200" />

            <div className="flex items-center gap-3">
                <ShieldCheck className="text-civic-navy w-5 h-5" />
                <div className="text-left">
                    <div className="text-[10px] font-bold text-gray-400 uppercase tracking-tight">Compliance Status</div>
                    <div className="text-[11px] font-bold text-civic-navy uppercase">ECI Verified Architecture</div>
                </div>
            </div>
        </div>

        {/* Quick Actions & Translation */}
        <div className="flex items-center gap-4 sm:gap-6">
            <div className="flex bg-white/50 backdrop-blur-md p-1.5 rounded-2xl border border-white">
                {['en', 'hi', 'kn'].map((l) => (
                    <button
                        key={l}
                        onClick={() => setLanguage(l as any)}
                        className={cn(
                            "px-3 sm:px-4 py-2 text-[10px] font-bold rounded-xl transition-all uppercase tracking-widest",
                            language === l ? "bg-civic-navy text-white shadow-lg shadow-civic-navy/20" : "text-gray-400 hover:text-civic-navy"
                        )}
                    >
                        {l}
                    </button>
                ))}
            </div>

            {view === 'dashboard' && (
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setView('selection')}
                    className="px-6 py-3 bg-civic-navy text-white text-[10px] font-bold uppercase tracking-widest rounded-xl shadow-lg shadow-civic-navy/20"
                >
                    Change Persona
                </motion.button>
            )}

            {/* Creator Credits Toggle */}
            <div className="relative">
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setShowCredits(!showCredits)}
                    className={cn(
                        "w-12 h-12 rounded-2xl flex items-center justify-center transition-all",
                        showCredits ? "bg-civic-saffron text-civic-navy" : "bg-gray-100 text-gray-400 hover:bg-white"
                    )}
                >
                    <User className="w-6 h-6" />
                </motion.button>

                <AnimatePresence>
                    {showCredits && (
                        <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                            className="absolute right-0 mt-4 w-64 bg-white rounded-[2rem] shadow-2xl border border-gray-100 p-8 z-[1010]"
                        >
                            <div className="flex flex-col items-center text-center">
                                <div className="w-16 h-16 bg-civic-navy rounded-full flex items-center justify-center mb-4 shadow-xl">
                                    <span className="text-xl font-display font-bold text-white">S</span>
                                </div>
                                <h4 className="text-sm font-bold text-civic-navy mb-1 uppercase tracking-widest">Sarvesh Arunkumar</h4>
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter mb-6">Sovereign Lead Engineer</p>
                                
                                <div className="grid grid-cols-2 gap-3 w-full">
                                    <a 
                                        href="https://github.com/itzsrv156" 
                                        target="_blank" 
                                        className="flex flex-col items-center gap-2 p-4 bg-gray-50 rounded-2xl hover:bg-civic-navy hover:text-white transition-all group"
                                    >
                                        <Globe className="w-5 h-5" />
                                        <span className="text-[8px] font-black uppercase tracking-widest">GitHub</span>
                                    </a>
                                    <a 
                                        href="https://www.linkedin.com/in/sarvesh-arunkumar/" 
                                        target="_blank" 
                                        className="flex flex-col items-center gap-2 p-4 bg-gray-50 rounded-2xl hover:bg-[#0077b5] hover:text-white transition-all group"
                                    >
                                        <User className="w-5 h-5" />
                                        <span className="text-[8px] font-black uppercase tracking-widest">LinkedIn</span>
                                    </a>
                                </div>
                                
                                <div className="mt-6 pt-6 border-t border-gray-100 w-full flex items-center justify-center gap-2 text-[8px] font-black text-gray-300 uppercase tracking-widest">
                                    <ExternalLink className="w-3 h-3" /> Project Source Secure
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
      </div>
    </motion.header>
  );
};
