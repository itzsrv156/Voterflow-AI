import { motion, AnimatePresence } from 'framer-motion';
import { useVoterStore } from '../../../store/useVoterStore';
import { ShieldCheck, User, Bell, Search, Menu, X } from 'lucide-react';
import { cn } from '../../../lib/utils';
import { useState, useEffect } from 'react';
import { ThemeToggle } from '../../Atoms/ThemeToggle';

export const MobileHeader = () => {
    const { setView, view, language, setLanguage } = useVoterStore();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [showNotifications, setShowNotifications] = useState(false);

    // Auto-close on view change
    useEffect(() => {
        setIsMenuOpen(false);
        setShowNotifications(false);
    }, [view]);

    return (
        <header className="fixed top-0 inset-x-0 z-[6000] p-4 pointer-events-none">
            <div className="max-w-md mx-auto flex items-center justify-between glass rounded-[2rem] px-5 py-3 shadow-2xl pointer-events-auto relative border border-white/20 dark:border-white/10">
                {/* Logo Section */}
                <div 
                    onClick={() => setView('selection')}
                    className="flex items-center gap-3 cursor-pointer group"
                >
                    <div className="w-10 h-10 bg-civic-navy dark:bg-white/10 rounded-xl flex items-center justify-center shadow-lg group-active:scale-95 transition-all">
                        <ShieldCheck className="w-5 h-5 text-civic-saffron" />
                    </div>
                    <div>
                        <h1 className="text-sm font-display font-black text-civic-navy dark:text-white tracking-tighter leading-none">VOTERFLOW</h1>
                        <p className="text-[7px] font-bold text-civic-saffron uppercase tracking-[0.2em] mt-0.5">Digital Protocol</p>
                    </div>
                </div>

                {/* Mobile Actions */}
                <div className="flex items-center gap-2">
                    <button 
                        onClick={() => setShowNotifications(!showNotifications)}
                        className={cn(
                            "w-10 h-10 rounded-xl flex items-center justify-center transition-all relative",
                            showNotifications ? "bg-civic-navy text-white" : "bg-gray-50 dark:bg-white/5 text-gray-400"
                        )}
                    >
                        <Bell className="w-5 h-5" />
                        <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-civic-saffron rounded-full border-2 border-white dark:border-[#0f0f0f] animate-pulse" />
                    </button>

                    <button 
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="w-10 h-10 bg-civic-navy text-white rounded-xl flex items-center justify-center shadow-lg active:scale-90 transition-all"
                    >
                        {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                    </button>
                </div>

                {/* Full Screen Menu */}
                <AnimatePresence>
                    {isMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="fixed inset-x-4 top-24 glass-card rounded-[2.5rem] p-8 z-[7000] border border-white/40 dark:border-white/10 shadow-[0_30px_100px_rgba(0,0,0,0.5)]"
                        >
                            <div className="space-y-8">
                                {/* Profile Summary */}
                                <div className="flex items-center gap-4 p-4 bg-civic-navy/5 dark:bg-white/[0.03] rounded-2xl border border-white/20 dark:border-white/10">
                                    <div className="w-12 h-12 bg-civic-navy rounded-full flex items-center justify-center shadow-lg">
                                        <User className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <h4 className="text-xs font-bold text-civic-navy dark:text-white uppercase tracking-widest">Arjun Singh</h4>
                                        <p className="text-[8px] font-black text-slate-400 uppercase tracking-tighter mt-0.5">Lead Developer</p>
                                    </div>
                                </div>

                                {/* Display & Language */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-3">
                                        <span className="text-[8px] font-black text-gray-400 uppercase tracking-widest block">Display Mode</span>
                                        <ThemeToggle />
                                    </div>
                                    <div className="space-y-3">
                                        <span className="text-[8px] font-black text-gray-400 uppercase tracking-widest block">Language</span>
                                        <div className="flex bg-white/40 dark:bg-white/[0.03] p-1 rounded-xl border border-white/20 dark:border-white/10">
                                            {['en', 'hi', 'kn'].map(l => (
                                                <button
                                                    key={l}
                                                    onClick={() => setLanguage(l as any)}
                                                    className={cn(
                                                        "flex-1 py-1.5 rounded-lg text-[9px] font-black uppercase transition-all",
                                                        language === l ? "bg-civic-navy text-white shadow-lg" : "text-gray-400"
                                                    )}
                                                >
                                                    {l}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Primary Actions */}
                                <div className="space-y-3">
                                    <button 
                                        onClick={() => setView('selection')}
                                        className="w-full py-4 bg-civic-navy text-white text-[10px] font-bold uppercase tracking-[0.2em] rounded-2xl shadow-xl active:scale-95 transition-all"
                                    >
                                        Switch Identity
                                    </button>
                                    <button 
                                        onClick={() => {}} 
                                        className="w-full py-4 bg-gray-50 dark:bg-white/5 text-civic-navy dark:text-white text-[10px] font-bold uppercase tracking-[0.2em] rounded-2xl border border-white/20 dark:border-white/10 active:scale-95 transition-all"
                                    >
                                        Access Archive
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Notifications Panel (Mobile Bottom-Style) */}
                <AnimatePresence>
                    {showNotifications && (
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.9, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 10 }}
                            className="fixed inset-x-4 top-24 glass-card rounded-[2.5rem] p-8 z-[7000] border-t-4 border-t-civic-navy dark:border-t-civic-saffron shadow-2xl"
                        >
                            <div className="flex items-center justify-between mb-6">
                                <h4 className="text-[10px] font-black text-civic-navy dark:text-white uppercase tracking-widest">System Alerts</h4>
                                <span className="px-2 py-0.5 bg-civic-saffron/10 text-civic-saffron text-[8px] font-bold rounded-full">2 NEW</span>
                            </div>
                            <div className="space-y-6">
                                <div className="flex gap-4">
                                    <div className="w-8 h-8 bg-civic-navy/5 rounded-xl flex items-center justify-center shrink-0">
                                        <Search className="w-4 h-4 text-civic-navy" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] text-gray-700 dark:text-white font-bold leading-tight mb-1">SIR 2026 Audit Ready</p>
                                        <p className="text-[9px] text-gray-400 dark:text-slate-400 font-medium leading-relaxed">Sector data mapping verified by ECI.</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </header>
    );
};
