import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';
import { TiltCard } from '../Atoms/TiltCard';
import { useVoterStore } from '../../store/useVoterStore';

/**
 * Real-time Constituency Sync Heatmap.
 * Visualizes SIR 2026 sector mapping progress.
 */
export const ConstituencyHeatmap = ({ onOpenChat }: { onOpenChat: () => void }) => (
    <TiltCard className="h-full group">
        <div className="glass-card rounded-[3.5rem] p-10 relative overflow-hidden h-full">
        <div className="flex justify-between items-start mb-8">
            <div>
                <h3 className="text-xl font-display font-bold text-civic-navy dark:text-white">Constituency Sync</h3>
                <p className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mt-1">Real-time Sector Mapping</p>
            </div>
            <div className="px-3 py-1 bg-civic-green/10 dark:bg-civic-green/20 rounded-full text-[9px] font-black text-civic-green dark:text-civic-green uppercase tracking-widest">
                Real-time Data
            </div>
        </div>
        
        <div className="relative aspect-square max-w-[280px] mx-auto">
            {/* Simple SVG Heatmap Map */}
            <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-2xl">
                {/* Sector 1: Shanti Nagar */}
                <path d="M40,60 L120,40 L160,80 L140,140 L60,160 Z" className="fill-civic-saffron/20 stroke-civic-saffron stroke-2 hover:fill-civic-saffron/40 transition-colors cursor-pointer" />
                {/* Sector 2: Shivaji Nagar */}
                <path d="M120,40 L180,30 L190,90 L160,80 Z" className="fill-civic-navy/10 stroke-civic-navy stroke-1 hover:fill-civic-navy/30 transition-colors cursor-pointer" />
                {/* Sector 3: CV Raman Nagar */}
                <path d="M160,80 L190,90 L180,160 L140,140 Z" className="fill-civic-saffron/40 stroke-civic-saffron stroke-2 hover:fill-civic-saffron/60 transition-colors cursor-pointer" />
                
                <circle cx="100" cy="100" r="4" className="fill-civic-navy animate-ping" />
                <circle cx="100" cy="100" r="3" className="fill-civic-navy" />
            </svg>
            
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-white/60 dark:bg-black/60 backdrop-blur-md rounded-2xl border border-white/50 dark:border-white/10 space-y-2">
                <div className="flex justify-between items-center text-[9px] font-bold">
                    <span className="text-gray-400 dark:text-gray-500 uppercase">Current Sector</span>
                    <span className="text-civic-navy dark:text-white">Shanti Nagar</span>
                </div>
                <div className="space-y-4">
                    <div className="flex justify-between items-center text-[10px] font-bold">
                        <span className="text-gray-400 dark:text-gray-500 uppercase">SIR Phase</span>
                        <span className="text-civic-navy dark:text-white">2.4 Revision</span>
                    </div>
                    <button 
                        onClick={onOpenChat}
                        className="w-full py-3 bg-civic-navy dark:bg-white/10 dark:hover:bg-white/20 text-white dark:text-slate-200 text-[9px] font-black uppercase tracking-widest rounded-xl hover:scale-105 transition-all border dark:border-white/10"
                    >
                        Ask AI Assistant
                    </button>
                </div>
            </div>
        </div>
        </div>
    </TiltCard>
);
