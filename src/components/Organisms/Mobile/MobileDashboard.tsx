import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Zap, CheckCircle, LayoutDashboard, UserPlus, 
  ArrowRight, Radio, ShieldCheck, Cpu
} from 'lucide-react';

import { useVoterStore } from '../../../store/useVoterStore';
import { cn } from '../../../lib/utils';

// Shared Components (These will still be responsive or we can make mobile versions if needed)
import { PollingBoothLocator } from '../PollingBoothLocator';
import { ConstituencyHeatmap } from '../../Molecules/ConstituencyHeatmap';
import { FutureVoterTool } from '../../Molecules/FutureVoterTool';
import { DigitalFormEngine } from '../DigitalFormEngine';
import { ResearchVault } from '../ResearchVault';
import { ChatAssistant } from '../ChatAssistant';

export const MobileDashboard = () => {
    const { progress } = useVoterStore();
    const [activeTab, setActiveTab] = useState<'overview' | 'registration' | 'security'>('overview');
    const [activeFlow, setActiveFlow] = useState<'registration' | 'audit' | 'vault' | null>(null);
    const [isChatOpen, setIsChatOpen] = useState(false);

    return (
        <div className="min-h-screen pt-28 pb-32 px-4 bg-transparent">
            {/* Mobile Tab Navigation */}
            <div className="flex gap-2 mb-8 overflow-x-auto no-scrollbar pb-2">
                {[
                    { id: 'overview', icon: LayoutDashboard, label: 'Overview' },
                    { id: 'registration', icon: UserPlus, label: 'Forms' },
                    { id: 'security', icon: ShieldCheck, label: 'Vault' }
                ].map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id as any)}
                        className={cn(
                            "flex items-center gap-2 px-6 py-3 rounded-2xl text-[10px] font-bold uppercase tracking-widest whitespace-nowrap transition-all",
                            activeTab === tab.id 
                                ? "bg-civic-navy text-white shadow-xl shadow-civic-navy/20" 
                                : "bg-white/50 dark:bg-white/[0.03] text-gray-400 border border-white/20 dark:border-white/10"
                        )}
                    >
                        <tab.icon className="w-4 h-4" />
                        {tab.label}
                    </button>
                ))}
            </div>

            <AnimatePresence mode="wait">
                {activeTab === 'overview' && (
                    <motion.div
                        key="overview"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="space-y-6"
                    >
                        {/* Status Card */}
                        <div className="glass-card rounded-[2.5rem] p-8 relative overflow-hidden">
                             <div className="absolute top-0 right-0 p-6 opacity-10">
                                <Zap className="w-24 h-24 text-civic-navy dark:text-white" />
                            </div>
                            <div className="flex items-center gap-4 mb-6 relative z-10">
                                <div className="w-12 h-12 bg-civic-navy rounded-xl flex items-center justify-center">
                                    <Radio className="text-civic-saffron w-6 h-6 animate-pulse" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold text-civic-navy dark:text-white">Active Status</h2>
                                    <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Protocol v4.2 // ECI System Live</p>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4 relative z-10">
                                <div className="p-4 bg-civic-navy/5 dark:bg-white/[0.03] rounded-2xl border border-white/20">
                                    <div className="text-[7px] font-black text-gray-400 uppercase mb-1">Registration</div>
                                    <div className="text-lg font-display font-black text-civic-navy dark:text-white">{progress.registration}%</div>
                                </div>
                                <div className="p-4 bg-civic-navy/5 dark:bg-white/[0.03] rounded-2xl border border-white/20">
                                    <div className="text-[7px] font-black text-gray-400 uppercase mb-1">Verification</div>
                                    <div className="text-lg font-display font-black text-civic-navy dark:text-white">Active</div>
                                </div>
                            </div>
                        </div>

                        {/* Interactive Tools Stack */}
                        <div className="space-y-6">
                            <PollingBoothLocator />
                            <ConstituencyHeatmap onOpenChat={() => setIsChatOpen(true)} />
                            <FutureVoterTool />
                        </div>
                    </motion.div>
                )}

                {activeTab === 'registration' && (
                    <motion.div
                        key="registration"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-6"
                    >
                        <div className="glass-card rounded-[2.5rem] p-8 flex flex-col group relative overflow-hidden">
                            <div className="flex justify-between items-start mb-8 relative z-10">
                                <div className="w-14 h-14 bg-civic-navy rounded-2xl flex items-center justify-center shadow-xl">
                                    <UserPlus className="text-white w-6 h-6" />
                                </div>
                                <CheckCircle className={cn("w-6 h-6", progress.registration === 100 ? "text-civic-green" : "text-gray-100 dark:text-white/10")} />
                            </div>
                            <h3 className="text-2xl font-bold text-civic-navy dark:text-white mb-2">Registration Suite</h3>
                            <p className="text-[10px] text-gray-500 dark:text-slate-400 mb-8 leading-relaxed">
                                Complete your voter registration using AI-powered document verification.
                            </p>
                            <button 
                                onClick={() => setActiveFlow('registration')}
                                className="w-full py-5 bg-civic-navy text-white text-[10px] font-bold uppercase tracking-widest rounded-2xl shadow-xl shadow-civic-navy/20 active:scale-95 transition-all flex items-center justify-center gap-3"
                            >
                                Start Registration <ArrowRight className="w-4 h-4" />
                            </button>
                        </div>
                    </motion.div>
                )}

                {activeTab === 'security' && (
                    <motion.div
                        key="security"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="space-y-6"
                    >
                        <div 
                            onClick={() => setActiveFlow('vault')}
                            className="glass-card rounded-[2.5rem] p-8 flex flex-col relative overflow-hidden"
                        >
                            <div className="w-14 h-14 bg-civic-saffron rounded-2xl flex items-center justify-center mb-6 shadow-xl shadow-civic-saffron/20">
                                <ShieldCheck className="text-civic-navy w-6 h-6" />
                            </div>
                            <h3 className="text-2xl font-bold text-civic-navy dark:text-white mb-2">Digital Vault</h3>
                            <p className="text-[10px] text-gray-500 dark:text-slate-400 mb-8 leading-relaxed">
                                Access your encrypted identity documents and ECI synchronization logs.
                            </p>
                            <div className="mt-auto flex items-center gap-2 text-[8px] font-black text-civic-navy dark:text-civic-saffron uppercase tracking-widest">
                                <ShieldCheck className="w-3 h-3" /> Secure Access Required
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Floating Intelligence FAB */}
            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsChatOpen(true)}
                className="fixed bottom-8 right-6 w-16 h-16 bg-civic-navy text-white rounded-full shadow-[0_15px_40px_rgba(0,0,128,0.4)] flex items-center justify-center z-[110] border border-white/20 overflow-hidden"
            >
                <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent"
                />
                <Cpu className="w-6 h-6 relative z-10" />
            </motion.button>

            {/* Overlays */}
            <AnimatePresence>
                {activeFlow === 'registration' && (
                    <DigitalFormEngine onClose={() => setActiveFlow(null)} />
                )}
                {activeFlow === 'vault' && (
                    <ResearchVault isOpen={true} onClose={() => setActiveFlow(null)} />
                )}
            </AnimatePresence>

            {isChatOpen && (
                <ChatAssistant />
            )}
        </div>
    );
};
