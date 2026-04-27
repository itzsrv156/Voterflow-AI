import { motion, AnimatePresence } from 'framer-motion';
import { useVoterStore } from '../../store/useVoterStore';
import { ShieldCheck, Vote, Globe, User, ExternalLink, Bell, Search } from 'lucide-react';
import { cn } from '../../lib/utils';
import { useState } from 'react';

export const Header = () => {
  const { setView, resetStore, view, language, setLanguage } = useVoterStore();
  const [showCredits, setShowCredits] = useState(false);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-[1000] px-10 py-6"
    >
      <div className="max-w-[1600px] mx-auto flex items-center justify-between glass rounded-[2.5rem] px-10 py-5 shadow-2xl">
        {/* Logo - Click to Reload/Home */}
        <button 
          onClick={() => resetStore()}
          className="flex items-center gap-4 group transition-all active:scale-95"
        >
          <div className="relative">
            {/* Dynamic Container with Gradient and Shadow Glow */}
            <div className="w-14 h-14 bg-gradient-to-tr from-civic-navy via-blue-700 to-civic-navy rounded-2xl flex items-center justify-center shadow-xl group-hover:shadow-blue-500/20 group-hover:rotate-[15deg] group-hover:scale-110 transition-all duration-500 relative overflow-hidden border border-white/20">
              {/* Shine Sweep Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] transition-transform" />
              
              <Vote className="text-white w-8 h-8 drop-shadow-[0_0_8px_rgba(255,255,255,0.4)] group-hover:scale-110 transition-transform duration-500 animate-pulse" />
              
              {/* Subtle Orange Accent dot/mark */}
              <div className="absolute top-4 right-4 w-1.5 h-1.5 bg-civic-saffron rounded-full shadow-[0_0_8px_rgba(255,153,51,0.8)] group-hover:scale-125 transition-all" />
            </div>
            
            {/* Energy Aura on Hover */}
            <div className="absolute inset-0 border-2 border-blue-400/20 rounded-2xl scale-125 opacity-0 group-hover:opacity-100 group-hover:scale-150 transition-all duration-700 pointer-events-none" />
          </div>

          <div className="text-left">
            <h1 className="text-2xl font-display font-black text-civic-navy leading-none tracking-tight flex items-center gap-2 group-hover:tracking-tighter transition-all">
              VoterFlow 
              <span className="bg-civic-saffron/10 text-civic-saffron px-2 py-0.5 rounded-lg text-xs italic border border-civic-saffron/20 group-hover:bg-civic-saffron group-hover:text-white transition-all">AI</span>
            </h1>
            <div className="flex items-center gap-2 mt-1">
                <div className="h-px w-3 bg-civic-navy/20 group-hover:w-6 transition-all" />
                <span className="text-[9px] font-bold text-gray-400 uppercase tracking-[0.2em] group-hover:text-civic-navy transition-colors">Sovereign Edition</span>
            </div>
          </div>
        </button>

        {/* Live Status Badge */}
        <div className="hidden md:flex items-center gap-8">
            <div className="flex items-center gap-4 px-6 py-3 bg-white/50 rounded-2xl border border-white shadow-sm">
                <div className="relative">
                    <div className="w-3 h-3 bg-civic-green rounded-full animate-ping absolute" />
                    <div className="w-3 h-3 bg-civic-green rounded-full relative" />
                </div>
                <span className="text-[10px] font-bold text-civic-navy uppercase tracking-widest">SIR 2026 Cycle</span>
            </div>

            <div className="h-10 w-px bg-gray-200" />

            <div className="flex items-center gap-3">
                <ShieldCheck className="text-civic-navy w-5 h-5" />
                <div className="text-left">
                    <div className="text-[10px] font-bold text-gray-400 uppercase tracking-tight">Compliance Status</div>
                    <div className="text-[11px] font-black text-civic-navy uppercase tracking-[0.05em]">Sovereign Civic Protocol</div>
                </div>
            </div>
        </div>

        {/* Intelligence Stats Bar - NEW PREMIUM FEATURE */}
        <div className="hidden lg:flex items-center gap-10">
            <div className="text-center">
                <div className="text-[8px] font-black text-gray-400 uppercase tracking-widest mb-1">Sector Turnout</div>
                <div className="text-xs font-bold text-civic-navy">94.2% Goal</div>
            </div>
            <div className="h-6 w-px bg-gray-100" />
            <div className="text-center">
                <div className="text-[8px] font-black text-gray-400 uppercase tracking-widest mb-1">Registration Health</div>
                <div className="text-xs font-bold text-civic-green">Optimal</div>
            </div>
        </div>

        {/* Quick Actions & Translation */}
        <div className="flex items-center gap-4 sm:gap-6">
            <div className="hidden sm:flex bg-white/50 backdrop-blur-md p-1.5 rounded-2xl border border-white">
                {(['en', 'hi', 'kn'] as const).map((l) => (
                    <button
                        key={l}
                        onClick={() => setLanguage(l)}
                        className={cn(
                            "px-3 sm:px-4 py-2 text-[10px] font-bold rounded-xl transition-all uppercase tracking-widest",
                            language === l ? "bg-civic-navy text-white shadow-lg shadow-civic-navy/20" : "text-gray-400 hover:text-civic-navy"
                        )}
                    >
                        {l}
                    </button>
                ))}
            </div>

            {/* Notification Bell with Dropdown */}
            <div className="relative group">
                <button className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center hover:bg-civic-navy hover:text-white transition-all relative">
                    <Bell className="w-5 h-5" />
                    <span className="absolute top-3 right-3 w-2 h-2 bg-civic-saffron rounded-full border-2 border-white animate-pulse" />
                </button>
                
                {/* Floating Notification Panel */}
                <div className="absolute top-full right-0 mt-4 w-72 glass-card rounded-[2.5rem] p-8 opacity-0 translate-y-4 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 transition-all z-50">
                    <div className="flex items-center justify-between mb-6">
                        <h4 className="text-[10px] font-black text-civic-navy uppercase tracking-widest">Sovereign Alerts</h4>
                        <span className="px-2 py-0.5 bg-civic-saffron/10 text-civic-saffron text-[8px] font-bold rounded-full">2 NEW</span>
                    </div>
                    <div className="space-y-6">
                        <div className="flex gap-4">
                            <div className="w-8 h-8 bg-civic-navy/5 rounded-xl flex items-center justify-center shrink-0">
                                <Search className="w-4 h-4 text-civic-navy" />
                            </div>
                            <div>
                                <p className="text-[10px] text-gray-700 font-bold leading-tight mb-1">SIR 2026 Audit Ready</p>
                                <p className="text-[9px] text-gray-400 font-medium leading-relaxed">Your sector data mapping is 100% verified by ECI.</p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="w-8 h-8 bg-civic-green/5 rounded-xl flex items-center justify-center shrink-0">
                                <ShieldCheck className="w-4 h-4 text-civic-green" />
                            </div>
                            <div>
                                <p className="text-[10px] text-gray-700 font-bold leading-tight mb-1">Identity Synchronized</p>
                                <p className="text-[9px] text-gray-400 font-medium leading-relaxed">Aadhaar-EPIC linking successful for PC 25.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {view === 'dashboard' && (
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setView('selection')}
                    className="hidden sm:block px-6 py-3 bg-civic-navy text-white text-[10px] font-bold uppercase tracking-widest rounded-xl shadow-lg shadow-civic-navy/20"
                >
                    Switch Identity
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
                            className="absolute right-0 mt-4 w-64 glass-card rounded-[2rem] p-8 z-[1010]"
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
