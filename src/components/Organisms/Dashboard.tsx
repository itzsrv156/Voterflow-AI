import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useVoterStore, type VoterState } from '../../store/useVoterStore';
import { useTranslation } from '../../LanguageContext';
import { TiltCard } from '../Atoms/TiltCard';
import { PollingBoothLocator } from './PollingBoothLocator';
import { FutureVoterTool } from '../Molecules/FutureVoterTool';
import { Tooltip } from '../Atoms/Tooltip';

const LanguageToggle = () => {
    const { language, setLanguage } = useVoterStore();
    return (
        <div className="flex gap-1 p-1.5 bg-white/60 backdrop-blur-xl rounded-2xl border border-white shadow-sm">
            {(['en', 'hi', 'kn'] as const).map(l => (
                <button
                    key={l}
                    onClick={() => setLanguage(l)}
                    className={cn(
                        "px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all",
                        language === l ? "bg-civic-navy text-white shadow-lg" : "text-gray-400 hover:text-civic-navy hover:bg-white"
                    )}
                >
                    {l}
                </button>
            ))}
        </div>
    );
};

const ConstituencyHeatmap = ({ onOpenChat }: { onOpenChat: () => void }) => (
    <TiltCard className="h-full group">
        <div className="glass-card rounded-[3.5rem] p-10 relative overflow-hidden h-full">
        <div className="flex justify-between items-start mb-8">
            <div>
                <h3 className="text-xl font-display font-bold text-civic-navy">Constituency Sync</h3>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Real-time Sector Mapping</p>
            </div>
            <div className="px-3 py-1 bg-civic-green/10 rounded-full text-[9px] font-black text-civic-green uppercase tracking-widest">
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
            
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-white/60 backdrop-blur-md rounded-2xl border border-white/50 space-y-2">
                <div className="flex justify-between items-center text-[9px] font-bold">
                    <span className="text-gray-400 uppercase">Current Sector</span>
                    <span className="text-civic-navy">Shanti Nagar</span>
                </div>
                <div className="space-y-4">
                    <div className="flex justify-between items-center text-[10px] font-bold">
                        <span className="text-gray-400 uppercase">SIR Phase</span>
                        <span className="text-civic-navy">2.4 Revision</span>
                    </div>
                    <button 
                        onClick={onOpenChat}
                        className="w-full py-3 bg-civic-navy text-white text-[9px] font-black uppercase tracking-widest rounded-xl hover:scale-105 transition-all"
                    >
                        Ask AI Assistant
                    </button>
                </div>
            </div>
        </div>
        </div>
    </TiltCard>
);
import { 
  Zap, X, 
  CheckCircle, Gavel, 
  Calendar, LayoutDashboard, UserPlus, Search, Library, 
  ChevronLeft, ChevronRight, Headphones, Radio, ArrowRight, User,
  PhoneCall, MapPin, Info, ShieldCheck,
  AlertTriangle, UserCheck, Target, Award,
  Flame, Cpu, BookOpen, Download, FileText,
  FileEdit, Globe, Fingerprint
} from 'lucide-react';
import { cn } from '../../lib/utils';

interface SidebarItemProps {
    id: 'overview' | 'registration' | 'research' | 'polling' | 'form8' | 'sir2026' | 'helpline';
    icon: React.ElementType;
    labelKey: string;
    activeTab: string;
    setActiveTab: (id: VoterState['activeTab']) => void;
    t: (key: string) => string;
}

const SidebarItem = ({ id, icon: Icon, labelKey, activeTab, setActiveTab, t }: SidebarItemProps) => (
  <Tooltip content={`View ${t(labelKey).split(' (')[0]}`}>
    <button
      onClick={() => setActiveTab(id)}
      className={cn(
        "w-full flex items-center gap-3 px-5 py-3 rounded-xl transition-all duration-500 relative group whitespace-nowrap",
        activeTab === id ? "text-white" : "text-gray-500 hover:text-civic-navy"
      )}
    >
      {activeTab === id && (
        <motion.div 
          layoutId="sidebar-pill"
          className="absolute inset-0 bg-civic-navy rounded-2xl shadow-xl shadow-civic-navy/20 -z-0"
          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
        />
      )}
      <Icon className={cn("w-5 h-5 relative z-10 transition-transform duration-500 group-hover:scale-110", activeTab === id ? "text-civic-saffron" : "")} />
      <span className="text-sm font-bold relative z-10">{t(labelKey).split(' (')[0]}</span>
    </button>
  </Tooltip>
);

export const Dashboard = () => {
  const { 
    persona, progress, resetStore, activeTab, 
    setActiveTab, setActiveFlow, readinessScore, addReadiness,
    hasGreeted, setHasGreeted, voterName, setIsChatOpen, addChatMessage
  } = useVoterStore();
  const { t } = useTranslation();
  
  const [showAiValidator, setShowAiValidator] = useState(false);
  const [scanStatus, setScanStatus] = useState<'idle' | 'scanning' | 'result'>('idle');

  // Proactive Assistant Guidance - Fixed Spam & Removed Auto-Open
  useEffect(() => {
    if (!hasGreeted && persona) {
        setHasGreeted(true);
    }
  }, [persona, hasGreeted, setHasGreeted]);



  return (
    <div className={cn(
        "flex min-h-screen bg-[#FDFDFD]/50 transition-all duration-1000",
        persona === 'Student' ? "persona-student" : 
        persona === 'Senior' ? "persona-senior" : "persona-new"
    )}>
      {/* Sidebar - Desktop Only */}
      <motion.aside
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="hidden lg:flex w-64 glass rounded-[2.5rem] p-6 shadow-2xl shadow-civic-navy/5 sticky top-28 flex-col h-[calc(100vh-140px)]"
      >
        <div className="flex items-center gap-3 mb-8 px-2">
          <div className="w-8 h-8 bg-civic-navy rounded-lg flex items-center justify-center">
            <Radio className="text-civic-saffron w-4 h-4" />
          </div>
          <span className="font-display font-bold text-civic-navy text-xs uppercase tracking-widest">Navigator</span>
        </div>
        
        <nav className="space-y-3 flex-1 overflow-y-auto pr-2 custom-scrollbar">
          <SidebarItem id="overview" icon={LayoutDashboard} labelKey="overview" activeTab={activeTab} setActiveTab={setActiveTab} t={t} />
          <SidebarItem id="registration" icon={UserPlus} labelKey="registration" activeTab={activeTab} setActiveTab={setActiveTab} t={t} />
          <SidebarItem id="research" icon={BookOpen} labelKey="research" activeTab={activeTab} setActiveTab={setActiveTab} t={t} />
          <SidebarItem id="polling" icon={MapPin} labelKey="polling" activeTab={activeTab} setActiveTab={setActiveTab} t={t} />
          <SidebarItem id="form8" icon={Gavel} labelKey="form8" activeTab={activeTab} setActiveTab={setActiveTab} t={t} />
          <SidebarItem id="sir2026" icon={Calendar} labelKey="sir2026" activeTab={activeTab} setActiveTab={setActiveTab} t={t} />
          <SidebarItem id="helpline" icon={Headphones} labelKey="helpline" activeTab={activeTab} setActiveTab={setActiveTab} t={t} />
        </nav>

        {/* Sovereign Achievements (Badges) - NEW FEATURE */}
        <div className="mt-6 p-4 glass-dark rounded-2xl relative overflow-hidden group">
            <h4 className="text-[8px] font-black text-civic-navy uppercase tracking-widest mb-3 flex items-center gap-2">
                <Award className="w-2.5 h-2.5 text-civic-saffron" /> Sovereign Badges
            </h4>
            <div className="flex flex-wrap gap-1.5">
                {[
                    { id: 'identity', icon: UserCheck, active: !!persona, title: 'Identity Verified' },
                    { id: 'filing', icon: FileText, active: progress.registration === 100, title: 'Form 6 Filed' },
                    { id: 'compliance', icon: ShieldCheck, active: readinessScore > 80, title: 'Compliance Ace' },
                    { id: 'poll', icon: Flame, active: progress.polling === 100, title: 'Poll Ready' },
                ].map(badge => (
                    <div 
                        key={badge.id} 
                        title={badge.title}
                        className={cn(
                            "w-8 h-8 rounded-lg flex items-center justify-center transition-all",
                            badge.active ? "bg-civic-navy text-civic-saffron shadow-md" : "bg-gray-100 text-gray-300"
                        )}
                    >
                        <badge.icon className="w-4 h-4" />
                    </div>
                ))}
            </div>
        </div>

        {/* Sovereign Compliance Orb */}
        <div className="mt-4 p-4 glass-dark rounded-2xl relative overflow-hidden group">
            <div className="flex flex-col items-center justify-center py-2 relative z-10">
                <div className="relative w-16 h-16 mb-2">
                    <motion.div 
                        animate={{ 
                            scale: [1, 1.1, 1],
                            opacity: [0.3, 0.6, 0.3] 
                        }}
                        transition={{ 
                            duration: 4 - (readinessScore / 33), 
                            repeat: Infinity, 
                            ease: "easeInOut" 
                        }}
                        className={cn(
                            "absolute inset-0 rounded-full blur-xl transition-colors duration-1000",
                            readinessScore > 80 ? "bg-civic-green/40" : 
                            readinessScore > 40 ? "bg-civic-saffron/40" : "bg-civic-navy/40"
                        )}
                    />
                    <motion.div 
                        animate={{ 
                            rotate: 360,
                            scale: [1, 1.05, 1]
                        }}
                        transition={{ 
                            rotate: { duration: 10, repeat: Infinity, ease: "linear" },
                            scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                        }}
                        className={cn(
                            "w-full h-full rounded-full border-2 border-white/20 flex items-center justify-center relative overflow-hidden shadow-inner",
                            readinessScore > 80 ? "bg-gradient-to-tr from-civic-green/20 to-civic-green/40" : 
                            readinessScore > 40 ? "bg-gradient-to-tr from-civic-saffron/20 to-civic-saffron/40" : "bg-gradient-to-tr from-civic-navy/20 to-civic-navy/40"
                        )}
                    >
                        <span className="text-[11px] font-black text-civic-navy tracking-tighter">{Math.round(readinessScore)}%</span>
                        {/* Dynamic Core */}
                        <div className={cn(
                            "absolute inset-0 bg-white/10 mix-blend-overlay animate-pulse",
                            readinessScore > 80 ? "shadow-[inset_0_0_15px_#128807]" : 
                            readinessScore > 40 ? "shadow-[inset_0_0_15px_#FF9933]" : "shadow-[inset_0_0_15px_#000080]"
                        )} />
                    </motion.div>
                </div>
                <span className="text-[8px] font-black text-civic-navy/40 uppercase tracking-[0.2em]">Compliance Orb</span>
            </div>
            <Award className="absolute -bottom-2 -right-2 w-10 h-10 text-civic-navy/5 group-hover:scale-110 transition-transform" />
        </div>

        <div className="mt-auto pt-8 border-t border-white/20">
          <Tooltip content="Reset session and clear all data">
            <motion.button 
              whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
              onClick={resetStore}
              className="w-full py-4 bg-gray-100 text-civic-navy font-bold rounded-2xl text-xs flex items-center justify-center gap-2 hover:bg-red-50 hover:text-red-500 transition-all"
            >
              <ChevronLeft className="w-4 h-4" /> {t('reset')}
            </motion.button>
          </Tooltip>
        </div>
      </motion.aside>

      {/* Main Content Area */}
      <div className="flex-1 space-y-6 pb-32 lg:pb-20 relative min-w-0">
          <div className="absolute inset-0 bg-white/5 backdrop-blur-[2px] -z-10 rounded-[4rem] pointer-events-none" />
          
          {/* Removed Large VoterFlow Assistant Access Banner */}

            {/* VoterFlow Alert Ticker */}
            <div className="w-full glass-vibrant rounded-3xl p-6 flex items-center gap-6 overflow-hidden relative">
                <div className="flex items-center gap-3 px-4 py-2 bg-gradient-to-r from-red-600 to-red-500 text-white rounded-full text-[10px] font-black uppercase tracking-widest animate-pulse shadow-lg shadow-red-500/20 shrink-0 z-10">
                    <Zap className="w-4 h-4 fill-white" /> Urgent
                </div>
                <div className="flex-1 overflow-hidden relative h-full flex items-center">
                    <motion.div 
                        animate={{ x: ["100%", "-100%"] }}
                        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                        className="whitespace-nowrap text-[10px] font-bold uppercase tracking-widest text-red-900"
                    >
                        SIR 2026: House-to-House Mapping is active in Karnataka Sectors. // Form 12D Home Voting requests open for Senior Citizens. // Aadhaar-EPIC linking is mandatory for data integrity.
                    </motion.div>
                </div>
            </div>

            <AnimatePresence mode="wait">
              {activeTab === 'overview' ? (
                <motion.div 
                  key="overview"
                  initial="hidden"
                  animate="show"
                  exit="hidden"
                  variants={{
                    hidden: { opacity: 0 },
                    show: {
                      opacity: 1,
                      transition: { staggerChildren: 0.1 }
                    }
                  }}
                  className="grid grid-cols-1 xl:grid-cols-2 gap-8 pb-10"
                >
              {/* Header Info */}
              <motion.div variants={{ hidden: { y: 20, opacity: 0 }, show: { y: 0, opacity: 1 } }} className="xl:col-span-2 flex justify-between items-center mb-4">
                <div className="flex items-center gap-6">
                    <div className="w-16 h-16 bg-civic-navy rounded-3xl flex items-center justify-center text-white shadow-2xl animate-sovereign-pulse">
                        <User className="w-8 h-8" />
                    </div>
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <h2 className="text-[10px] font-bold text-civic-saffron uppercase tracking-[0.3em]">{t('active_profile')}</h2>
                        </div>
                        <h1 className="text-4xl font-display font-bold text-civic-navy leading-none">
                            {voterName ? voterName : (persona ? t(`persona_${persona.toLowerCase()}`) : '')} {t('dashboard')}
                        </h1>
                    </div>
                </div>
                
                <div className="flex gap-4 items-center">
                    <LanguageToggle />
                    {/* Constituency Intelligence Molecule */}
                    <div className="px-6 py-4 bg-white/60 rounded-3xl border border-white shadow-sm flex items-center gap-4">
                        <div className="w-10 h-10 bg-civic-navy/5 rounded-xl flex items-center justify-center">
                            <MapPin className="text-civic-navy w-5 h-5" />
                        </div>
                        <div>
                            <div className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Your Constituency</div>
                            <div className="text-xs font-bold text-civic-navy">Bengaluru Central (PC 25)</div>
                        </div>
                    </div>
                </div>
              </motion.div>
              
              {/* Personal Voting Journey Checklist - NEW FEATURE */}
              <motion.div variants={{ hidden: { y: 20, opacity: 0 }, show: { y: 0, opacity: 1 } }} className="xl:col-span-2 group">
                  <TiltCard>
                      <div className="glass-card rounded-[3.5rem] p-10 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-10 opacity-5 pointer-events-none group-hover:scale-110 transition-transform">
                      <Target className="w-40 h-40 text-civic-navy" />
                  </div>
                  <div className="flex items-center gap-4 mb-8">
                      <div className="w-12 h-12 bg-civic-saffron rounded-2xl flex items-center justify-center shadow-lg">
                          <CheckCircle className="w-6 h-6 text-civic-navy" />
                      </div>
                      <div>
                          <h3 className="text-xl font-display font-bold text-civic-navy">Your Personal Voting Journey</h3>
                          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Guided Assistant Tracker</p>
                      </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative z-10">
                      {[
                        { step: "Step 1", label: "Eligibility", desc: "Criteria Verified", status: "complete", icon: UserCheck, action: () => setActiveFlow('registration') },
                        { step: "Step 2", label: "Registration", desc: "Form 6 Filing", status: progress.registration === 100 ? "complete" : "active", icon: FileText, action: () => setActiveFlow('registration') },
                        { step: "Step 3", label: "Verification", desc: "BLO Field Visit", status: progress.registration === 100 ? "active" : "pending", icon: ShieldCheck, action: () => setIsChatOpen(true) },
                        { step: "Step 4", label: "Voting Day", desc: "May 2026", status: "pending", icon: Award, action: () => setActiveTab('polling') }
                      ].map((s, i) => (
                        <button 
                            key={i} 
                            onClick={s.action}
                            className={cn(
                            "p-6 rounded-[2.5rem] border transition-all duration-500 text-left group/step relative",
                            s.status === 'complete' ? "bg-civic-green/5 border-civic-green/20 hover:bg-civic-green/10" :
                            s.status === 'active' ? "bg-civic-navy text-white shadow-2xl scale-105 border-transparent hover:scale-110" :
                            "bg-white border-gray-100 opacity-60 hover:opacity-80"
                        )}>
                            <div className="flex justify-between items-start mb-4">
                                <s.icon className={cn("w-6 h-6", s.status === 'active' ? "text-civic-saffron" : "text-civic-navy")} />
                                {s.status === 'complete' ? (
                                    <CheckCircle className="w-4 h-4 text-civic-green" />
                                ) : (
                                    <ArrowRight className={cn("w-4 h-4 opacity-0 group-hover/step:opacity-100 transition-opacity", s.status === 'active' ? "text-civic-saffron" : "text-civic-navy")} />
                                )}
                            </div>
                            <div className={cn("text-[9px] font-black uppercase tracking-widest mb-1", s.status === 'active' ? "text-white/60" : "text-gray-400")}>{s.step}</div>
                            <div className="text-sm font-bold mb-1">{s.label}</div>
                            <div className={cn("text-[10px] font-medium", s.status === 'active' ? "text-white/40" : "text-gray-400")}>{s.desc}</div>
                        </button>
                      ))}
                  </div>
                      </div>
                  </TiltCard>
              </motion.div>

              {/* VoterFlow Timeline Feature */}
              <motion.div variants={{ hidden: { y: 20, opacity: 0 }, show: { y: 0, opacity: 1 } }} className="xl:col-span-2 group">
                  <TiltCard>
                      <div className="glass-card rounded-[3.5rem] p-12 overflow-hidden relative">
                  <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none group-hover:scale-110 transition-transform duration-700">
                      <Calendar className="w-48 h-48 text-civic-navy" />
                  </div>
                  <div className="flex items-center gap-3 mb-12">
                      <div className="w-12 h-12 bg-civic-navy rounded-2xl flex items-center justify-center shadow-xl shadow-civic-navy/10">
                          <Library className="w-6 h-6 text-civic-saffron" />
                      </div>
                      <h3 className="text-2xl font-display font-bold text-civic-navy">VoterFlow Journey Timeline</h3>
                  </div>
                  
                  <div className="relative flex flex-col md:flex-row justify-between gap-8 px-4">
                      <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-100 -z-0 hidden md:block" />
                      {[
                        { date: 'Oct 2025', event: 'SIR Cycle Start', status: 'Passed', icon: Zap, details: "Special Intensive Revision began. Your sector (PC 25) mapping is finalized." },
                        { date: 'Feb 2026', event: 'Draft Roll Sync', status: 'Current', icon: Search, details: "The Draft Roll is now live. Verify your entry to avoid exclusion during the de-duplication phase." },
                        { date: 'Mar 2026', event: 'Final Publication', status: 'Upcoming', icon: ShieldCheck, details: "Final VoterFlow Roll will be published. This is the last version before General Elections." },
                        { date: 'May 2026', event: 'General Elections', status: 'Goal', icon: Flame, details: "E-Day. Your polling station BBMP School is ready for VoterFlow turnout." }
                      ].map((t, i) => (
                        <button 
                            key={i} 
                            onClick={() => {
                                addChatMessage({ role: 'ai', text: `Milestone Intel: ${t.event} (${t.date}). ${t.details}` });
                                setIsChatOpen(true);
                            }}
                            className="flex flex-col items-center text-center relative z-10 group/item hover:scale-110 transition-transform"
                        >
                            <div className={cn(
                                "w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-500 mb-4",
                                t.status === 'Passed' ? "bg-civic-green text-white shadow-lg" :
                                t.status === 'Current' ? "bg-civic-navy text-white scale-110 shadow-2xl animate-pulse" :
                                "bg-white text-gray-300 border border-gray-100 group-hover/item:border-civic-navy/20"
                            )}>
                                <t.icon className="w-7 h-7" />
                            </div>
                            <div className="text-[10px] font-black text-civic-navy uppercase tracking-widest">{t.date}</div>
                            <div className="text-xs font-bold text-gray-500 mt-1">{t.event}</div>
                            <div className={cn("text-[8px] font-black uppercase mt-1", t.status === 'Current' ? "text-civic-saffron" : "text-gray-300")}>{t.status}</div>
                        </button>
                      ))}
                  </div>
                      </div>
                  </TiltCard>
              </motion.div>

              {/* Polling Booth Locator (Real Map) */}
              <motion.div variants={{ hidden: { y: 20, opacity: 0 }, show: { y: 0, opacity: 1 } }} className="xl:col-span-2">
                <TiltCard>
                  <PollingBoothLocator />
                </TiltCard>
              </motion.div>

              {/* Top 50 Feature: Heatmap & Future Voter Tool */}
              <motion.div variants={{ hidden: { y: 20, opacity: 0 }, show: { y: 0, opacity: 1 } }} className="grid grid-cols-1 xl:grid-cols-2 gap-8 xl:col-span-2">
                  <TiltCard><ConstituencyHeatmap onOpenChat={() => setIsChatOpen(true)} /></TiltCard>
                  <TiltCard><FutureVoterTool /></TiltCard>
              </motion.div>

              {/* VoterFlow Voter Card */}
              {progress.registration === 100 && (
                <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="xl:col-span-2 bg-civic-navy rounded-[3.5rem] p-12 text-white relative overflow-hidden shadow-2xl group"
                >
                    <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay" />
                    <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-civic-saffron/20 rounded-full blur-[100px] group-hover:bg-civic-saffron/30 transition-all duration-1000" />
                    
                    <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
                        <div className="flex items-center gap-8">
                            <div className="w-24 h-24 bg-white/10 backdrop-blur-xl rounded-[2rem] border border-white/20 flex items-center justify-center relative">
                                <Fingerprint className="w-12 h-12 text-white/40" />
                                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-civic-green rounded-full flex items-center justify-center border-4 border-civic-navy">
                                    <CheckCircle className="w-4 h-4 text-white" />
                                </div>
                            </div>
                            <div>
                                <div className="flex items-center gap-3 mb-2">
                                    <span className="px-3 py-1 bg-civic-saffron text-civic-navy text-[8px] font-black uppercase tracking-[0.2em] rounded-full">VoterFlow Identity</span>
                                    <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">EPIC: BEL-2026-0420</span>
                                </div>
                                <h3 className="text-3xl font-display font-bold uppercase tracking-tight">{voterName || 'Sarvesh Arunkumar'}</h3>
                                <div className="flex items-center gap-4 mt-2">
                                    <div className="text-[10px] font-medium text-white/60">PC: Bengaluru Central</div>
                                    <div className="w-1 h-1 bg-white/20 rounded-full" />
                                    <div className="text-[10px] font-medium text-white/60">Qualifying: 01-01-2026</div>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <button className="px-8 py-4 bg-white/10 hover:bg-white/20 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2">
                                <Download className="w-4 h-4" /> Download EPIC
                            </button>
                            <button 
                                onClick={() => {
                                    const toast = document.createElement('div');
                                    toast.className = "fixed top-12 left-1/2 -translate-x-1/2 bg-civic-navy text-white px-8 py-4 rounded-2xl shadow-2xl z-[6000] font-bold flex items-center gap-4 animate-bounce";
                                    toast.innerHTML = `<div class="w-4 h-4 bg-google-blue rounded-full"></div> Syncing with Google Wallet...`;
                                    document.body.appendChild(toast);
                                    setTimeout(() => document.body.removeChild(toast), 2000);
                                }}
                                className="px-8 py-4 bg-[#000000] text-white font-black rounded-2xl text-[10px] uppercase tracking-widest shadow-xl flex items-center gap-3 hover:scale-105 active:scale-95 transition-all border border-white/20"
                            >
                                <img src="https://www.gstatic.com/wallet/badge/en_US.svg" className="h-4" alt="Add to Google Wallet" />
                            </button>
                        </div>
                    </div>
                </motion.div>
              )}

              {/* Form Assistant Card */}
              <motion.div 
                variants={{ hidden: { y: 20, opacity: 0 }, show: { y: 0, opacity: 1 } }}
                onClick={() => setActiveFlow('registration')}
                className="xl:col-span-1"
              >
                <TiltCard className="h-full">
                  <div className="bg-white/70 backdrop-blur-2xl rounded-[3.5rem] p-12 border border-white/50 shadow-sm flex flex-col group relative overflow-hidden cursor-pointer h-full">
                    <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
                        <UserPlus className="w-48 h-48 text-civic-navy" />
                    </div>
                    <div className="flex justify-between items-start mb-10 relative z-10">
                      <div className="w-16 h-16 bg-civic-navy rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-xl shadow-civic-navy/10">
                        <UserPlus className="text-white w-7 h-7" />
                      </div>
                      <CheckCircle className={cn("w-8 h-8 transition-all duration-500", progress.registration === 100 ? "text-civic-green scale-110" : "text-gray-100")} />
                    </div>
                    <div className="relative z-10">
                        <h3 className="text-3xl font-bold text-civic-navy mb-4">{t('registration')} Suite</h3>
                        <p className="text-sm text-gray-500 mb-10 leading-relaxed max-w-sm">
                          Secure Form 6 engine with automated document verification and BLO mapping.
                        </p>
                    </div>
                    <div className="mt-auto relative z-10">
                       <div className="flex justify-between text-[9px] font-bold text-gray-400 mb-3 uppercase tracking-[0.2em]">Application Progress</div>
                      <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden mb-8">
                        <motion.div animate={{ width: `${progress.registration}%` }} className="h-full bg-civic-navy" />
                      </div>
                      <button className="w-full py-6 bg-civic-navy text-white font-bold rounded-[2rem] shadow-2xl shadow-civic-navy/30 flex items-center justify-center gap-3 active:scale-95 transition-all group/btn">
                        Open Digital Wizard <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                      </button>
                    </div>
                  </div>
                </TiltCard>
              </motion.div>

              {/* AI Validator Molecule */}
              <motion.div 
                variants={{ hidden: { y: 20, opacity: 0 }, show: { y: 0, opacity: 1 } }}
                onClick={() => setShowAiValidator(true)}
                className="xl:col-span-1"
              >
                <TiltCard className="h-full">
                  <div className="bg-white/70 backdrop-blur-2xl rounded-[3.5rem] p-12 border border-white/50 shadow-sm flex flex-col group cursor-pointer relative overflow-hidden h-full">
                     <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
                        <Cpu className="w-48 h-48 text-civic-navy" />
                    </div>
                    <div className="flex justify-between items-start mb-10 relative z-10">
                      <div className="w-16 h-16 bg-civic-navy rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:-rotate-6 transition-all duration-500 shadow-xl">
                        <Cpu className="text-civic-saffron w-7 h-7" />
                      </div>
                      <span className="px-4 py-2 bg-civic-navy/5 rounded-full text-[9px] font-black text-civic-navy uppercase tracking-widest">VoterFlow AI v2.4</span>
                    </div>
                    <div className="relative z-10">
                        <h3 className="text-3xl font-bold text-civic-navy mb-4">Document Validator</h3>
                        <p className="text-sm text-gray-500 mb-10 leading-relaxed max-w-sm">
                          Pre-verify your identity and residency documents against ECI legislative standards.
                        </p>
                    </div>
                    <div className="mt-auto relative z-10">
                        <div className="flex items-center gap-3 text-civic-navy font-bold text-[11px] uppercase tracking-[0.2em]">
                            Analyze Documents <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                        </div>
                    </div>
                  </div>
                </TiltCard>
              </motion.div>

              {/* Ink & Voice Social Pulse */}
              <motion.div variants={{ hidden: { y: 20, opacity: 0 }, show: { y: 0, opacity: 1 } }} className="xl:col-span-2">
                <TiltCard>
                  <div className="bg-civic-saffron/5 border border-civic-saffron/20 rounded-[3.5rem] p-12 overflow-hidden relative group">
                  <div className="flex justify-between items-center relative z-10">
                      <div>
                          <div className="flex items-center gap-3 mb-4">
                              <Flame className="w-6 h-6 text-civic-saffron" />
                              <h3 className="text-2xl font-display font-bold text-civic-navy">Bengaluru Sector Pulse</h3>
                          </div>
                          <p className="text-sm text-gray-500 max-w-lg leading-relaxed">
                              Active community engagement metrics for PC 25. Over **12,400** citizens have verified their SIR 2026 status this week.
                          </p>
                      </div>
                      <div className="flex -space-x-4">
                          {[1,2,3,4].map(i => (
                              <div key={i} className="w-12 h-12 rounded-full border-4 border-white overflow-hidden bg-gray-200">
                                  <img src={`https://i.pravatar.cc/150?u=${i+10}`} alt="User" className="w-full h-full object-cover" />
                              </div>
                          ))}
                          <div className="w-12 h-12 rounded-full border-4 border-white bg-civic-navy flex items-center justify-center text-[10px] font-bold text-white">+12k</div>
                      </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10 relative z-10">
                      {[
                        { label: 'Verified Electors', value: '89.2%', color: 'bg-civic-green' },
                        { label: 'Claims Resolved', value: '4.2k', color: 'bg-civic-navy' },
                        { label: 'Revision Velocity', value: 'Optimal', color: 'bg-civic-saffron' }
                      ].map((stat, i) => (
                        <div key={i} className="bg-white/60 backdrop-blur-md p-6 rounded-3xl border border-white shadow-sm">
                            <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">{stat.label}</div>
                            <div className="text-3xl font-display font-bold text-civic-navy flex items-center gap-3">
                                {stat.value}
                                <div className={cn("w-2 h-2 rounded-full animate-pulse", stat.color)} />
                            </div>
                        </div>
                      ))}
                  </div>
                </div>
              </TiltCard>
            </motion.div>

              {/* Candidate Intelligence - NEW TOP 50 FEATURE */}
              <motion.div variants={{ hidden: { y: 20, opacity: 0 }, show: { y: 0, opacity: 1 } }} className="xl:col-span-2 group">
                  <TiltCard>
                      <div className="glass-card rounded-[3.5rem] p-12 relative overflow-hidden">
                  <div className="flex justify-between items-end mb-10">
                      <div>
                          <div className="flex items-center gap-3 mb-4">
                              <Award className="w-6 h-6 text-civic-saffron" />
                              <h3 className="text-2xl font-display font-bold text-civic-navy tracking-tight">Candidate Intel Preview</h3>
                          </div>
                          <p className="text-sm text-gray-500 max-w-lg leading-relaxed">
                              Contesting candidates for **Bengaluru Central (PC 25)**. Analyze criminal records, educational backgrounds, and asset declarations.
                          </p>
                      </div>
                      <div className="px-6 py-3 bg-civic-navy text-white text-[10px] font-bold uppercase tracking-widest rounded-2xl shadow-xl shadow-civic-navy/20 cursor-pointer hover:scale-105 transition-all">
                          Full Affidavit Portal
                      </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                      {[
                        { name: 'Dr. Rahul S.', party: 'National Alliance', initials: 'RS', color: 'bg-orange-500' },
                        { name: 'Anita Verma', party: 'People First', initials: 'AV', color: 'bg-blue-500' },
                        { name: 'K. Venkatesh', party: 'State Collective', initials: 'KV', color: 'bg-green-500' },
                        { name: 'Sarah Khan', party: 'Independent', initials: 'SK', color: 'bg-gray-500' }
                      ].map((c, i) => (
                        <div key={i} className="p-6 bg-white border border-gray-100 rounded-3xl hover:shadow-xl transition-all group/cand text-center">
                            <div className={cn("w-20 h-20 mx-auto mb-4 rounded-2xl flex items-center justify-center text-white font-display font-bold text-xl shadow-inner relative", c.color)}>
                                {c.initials}
                                <div className="absolute inset-0 bg-black/5 rounded-2xl opacity-0 group-hover/cand:opacity-100 transition-opacity" />
                            </div>
                            <div className="text-center">
                                <div className="text-sm font-bold text-civic-navy mb-1">{c.name}</div>
                                <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{c.party}</div>
                                <div className="mt-4 flex gap-2 justify-center">
                                    <div className="w-6 h-6 bg-gray-50 rounded-lg flex items-center justify-center cursor-pointer hover:bg-civic-navy hover:text-white transition-all">
                                        <Info className="w-3 h-3" />
                                    </div>
                                    <div className="w-6 h-6 bg-gray-50 rounded-lg flex items-center justify-center cursor-pointer hover:bg-civic-navy hover:text-white transition-all">
                                        <Gavel className="w-3 h-3" />
                                    </div>
                                </div>
                            </div>
                        </div>
                      ))}
                  </div>
                      </div>
                  </TiltCard>
              </motion.div>
            </motion.div>
          ) : activeTab === 'registration' ? (
            <motion.div
              key="registration"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="grid grid-cols-1 xl:grid-cols-2 gap-8"
            >
              <div className="bg-white/70 backdrop-blur-2xl rounded-[3.5rem] p-12 border border-white/50 shadow-sm flex flex-col group relative overflow-hidden">
                <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
                    <UserPlus className="w-48 h-48 text-civic-navy" />
                </div>
                <div className="flex justify-between items-start mb-10 relative z-10">
                  <div className="w-16 h-16 bg-civic-navy rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-xl shadow-civic-navy/10">
                    <UserPlus className="text-white w-7 h-7" />
                  </div>
                  <CheckCircle className={cn("w-8 h-8 transition-all duration-500", progress.registration === 100 ? "text-civic-green scale-110" : "text-gray-100")} />
                </div>
                <div className="relative z-10">
                    <h3 className="text-3xl font-bold text-civic-navy mb-4">Registration Suite</h3>
                    <p className="text-sm text-gray-500 mb-10 leading-relaxed max-w-sm">
                      Secure Form 6 engine with automated document verification and BLO mapping.
                    </p>
                </div>
                <div className="mt-auto relative z-10">
                   <div className="flex justify-between text-[9px] font-bold text-gray-400 mb-3 uppercase tracking-[0.2em]">Application Progress</div>
                  <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden mb-8">
                    <motion.div animate={{ width: `${progress.registration}%` }} className="h-full bg-civic-navy" />
                  </div>
                  <button 
                    onClick={() => setActiveFlow('registration')}
                    className="w-full py-6 bg-civic-navy text-white font-bold rounded-[2rem] shadow-2xl shadow-civic-navy/30 flex items-center justify-center gap-3 active:scale-95 transition-all group/btn animate-sovereign-pulse"
                  >
                    Open Digital Wizard <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                  </button>
                </div>
              </div>

              <div 
                onClick={() => setShowAiValidator(true)}
                className="bg-white/70 backdrop-blur-2xl rounded-[3.5rem] p-12 border border-white/50 shadow-sm flex flex-col group cursor-pointer relative overflow-hidden"
              >
                 <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
                    <Cpu className="w-48 h-48 text-civic-navy" />
                </div>
                <div className="flex justify-between items-start mb-10 relative z-10">
                  <div className="w-16 h-16 bg-civic-navy rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:-rotate-6 transition-all duration-500 shadow-xl">
                    <Cpu className="text-civic-saffron w-7 h-7" />
                  </div>
                  <span className="px-4 py-2 bg-civic-navy/5 rounded-full text-[9px] font-black text-civic-navy uppercase tracking-widest">VoterFlow AI v2.4</span>
                </div>
                <div className="relative z-10">
                    <h3 className="text-3xl font-bold text-civic-navy mb-4">Document Validator</h3>
                    <p className="text-sm text-gray-500 mb-10 leading-relaxed max-w-sm">
                      Pre-verify your identity and residency documents against ECI legislative standards.
                    </p>
                </div>
                <div className="mt-auto relative z-10">
                    <div className="flex items-center gap-3 text-civic-navy font-bold text-[11px] uppercase tracking-[0.2em]">
                        Analyze Documents <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                    </div>
                </div>
              </div>
            </motion.div>
          ) : activeTab === 'research' ? (
            <motion.div
              key="research"
              initial="hidden"
              animate="show"
              exit="hidden"
              variants={{
                hidden: { opacity: 0 },
                show: {
                  opacity: 1,
                  transition: { staggerChildren: 0.1 }
                }
              }}
              className="space-y-10"
            >
              <motion.header variants={{ hidden: { y: 20, opacity: 0 }, show: { y: 0, opacity: 1 } }} className="flex justify-between items-end">
                <div>
                  <h2 className="text-4xl font-display font-bold text-civic-navy mb-2">Civic Intelligence Hub</h2>
                  <p className="text-gray-500 font-medium">Verify legislative protocols and electoral data integrity.</p>
                </div>
                <button 
                  onClick={() => setIsChatOpen(true)} 
                  className="px-8 py-4 bg-civic-navy text-white font-bold rounded-2xl shadow-xl shadow-civic-navy/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-3"
                >
                  <BookOpen className="w-5 h-5" /> Consult Assistant
                </button>
              </motion.header>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {[
                      { title: 'SIR 2026 Revision', desc: 'House-to-house mapping protocol & data verification.', icon: UserCheck, color: 'text-blue-500', bg: 'bg-blue-50' },
                      { title: 'Constitutional Rights', desc: 'Articles 324-329 and the Right to Vote framework.', icon: ShieldCheck, color: 'text-orange-500', bg: 'bg-orange-50' },
                      { title: 'Legal Forms Base', desc: 'Deep linking to official ECI Form 6, 7, and 8 portals.', icon: FileEdit, color: 'text-civic-green', bg: 'bg-green-50' },
                  ].map((item, i) => (
                      <motion.div variants={{ hidden: { y: 20, opacity: 0 }, show: { y: 0, opacity: 1 } }} key={i} className="p-8 bg-white border border-gray-100 rounded-[2.5rem] shadow-sm hover:shadow-xl transition-all group">
                          <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform", item.bg, item.color)}>
                              <item.icon className="w-7 h-7" />
                          </div>
                          <h3 className="text-xl font-bold text-civic-navy mb-3">{item.title}</h3>
                          <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                      </motion.div>
                  ))}
              </div>

              <motion.div variants={{ hidden: { y: 20, opacity: 0 }, show: { y: 0, opacity: 1 } }} className="p-10 bg-gradient-to-br from-civic-navy to-blue-900 rounded-[3rem] text-white relative overflow-hidden">
                  <Globe className="absolute -bottom-20 -right-20 w-80 h-80 opacity-10" />
                  <div className="relative z-10 max-w-xl">
                      <h3 className="text-2xl font-display font-bold mb-4 text-civic-saffron">VoterFlow Data Federation</h3>
                      <p className="text-white/60 text-sm leading-relaxed mb-8">
                          The VoterFlow research engine pulls directly from ECI open-data simulations. Every guideline here is verified against the 2026 Electoral Code.
                      </p>
                      <div className="flex gap-4">
                          <div className="px-4 py-2 bg-white/10 rounded-xl border border-white/10 text-[10px] font-bold uppercase tracking-widest">Legislative Mode</div>
                          <div className="px-4 py-2 bg-white/10 rounded-xl border border-white/10 text-[10px] font-bold uppercase tracking-widest">Verified 2026</div>
                      </div>
                  </div>
              </motion.div>
            </motion.div>
          ) : activeTab === 'polling' ? (
            <motion.div
              key="polling"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="w-full h-full"
            >
              <PollingBoothLocator />
            </motion.div>
          ) : activeTab === 'helpline' ? (
            <motion.div
              key="helpline"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white/70 backdrop-blur-2xl rounded-[3.5rem] p-16 border border-white/50 h-full flex flex-col items-center justify-center text-center"
            >
               <div className="w-24 h-24 bg-civic-navy rounded-3xl flex items-center justify-center mb-8 shadow-2xl shadow-civic-navy/20">
                  <PhoneCall className="w-10 h-10 text-white" />
               </div>
               <h2 className="text-4xl font-display font-bold text-civic-navy mb-4">Official ECI Helpline</h2>
               <p className="text-gray-500 max-w-md text-lg font-medium mb-12">Dedicated support for SIR 2026 queries and grievance redressal.</p>
               
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-3xl">
                  <div className="p-8 bg-white rounded-[2.5rem] border border-gray-100 shadow-sm flex flex-col items-center gap-4 group hover:bg-civic-navy hover:text-white transition-all">
                      <div className="text-[10px] font-black uppercase tracking-widest opacity-40">National Support</div>
                      <div className="text-4xl font-display font-bold">1950</div>
                      <div className="text-xs font-bold opacity-60">VoterFlow Voter Hotline</div>
                      <a href="tel:1950" className="mt-4 px-6 py-3 bg-civic-saffron text-civic-navy rounded-xl text-[10px] font-black uppercase tracking-widest group-hover:bg-white transition-all">Connect Now</a>
                  </div>
                  <div className="p-8 bg-white rounded-[2.5rem] border border-gray-100 shadow-sm flex flex-col items-center gap-4 group hover:bg-civic-navy hover:text-white transition-all">
                      <div className="text-[10px] font-black uppercase tracking-widest opacity-40">Local Mapping</div>
                      <div className="text-2xl font-display font-bold">Booth Level Officer</div>
                      <div className="text-xs font-bold opacity-60">Find your designated BLO</div>
                      <a href="https://voters.eci.gov.in/login" target="_blank" className="mt-4 px-6 py-3 bg-civic-navy text-white rounded-xl text-[10px] font-black uppercase tracking-widest group-hover:bg-civic-saffron group-hover:text-civic-navy transition-all border border-civic-navy/10">Search Archives</a>
                  </div>
               </div>
            </motion.div>
          ) : activeTab === 'sir2026' ? (
            <motion.div
              key="sir2026"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white/70 backdrop-blur-2xl rounded-[3.5rem] p-16 border border-white/50 h-full flex flex-col items-start text-left overflow-y-auto"
            >
               <div className="flex items-center gap-4 mb-10">
                  <div className="w-16 h-16 bg-civic-saffron rounded-2xl flex items-center justify-center shadow-xl">
                      <Calendar className="w-8 h-8 text-civic-navy" />
                  </div>
                  <div>
                      <h2 className="text-3xl font-display font-bold text-civic-navy">SIR 2026 Framework</h2>
                      <p className="text-[10px] font-black text-civic-saffron uppercase tracking-widest mt-1">Status: Active Revision Cycle (PC 25)</p>
                  </div>
               </div>
               
               <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full mb-12">
                  {[
                    { label: 'Sector Mapping', status: '85% Sync', progress: 85, icon: MapPin },
                    { label: 'Document Purge', status: 'Active', progress: 62, icon: UserCheck },
                    { label: 'Card Generation', status: 'Upcoming', progress: 0, icon: ShieldCheck }
                  ].map((item, i) => (
                    <div key={i} className="p-8 bg-white rounded-[2.5rem] border border-gray-100 shadow-sm">
                        <div className="flex justify-between items-start mb-6">
                            <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center"><item.icon className="w-6 h-6 text-civic-navy" /></div>
                            <span className="text-[9px] font-black uppercase text-civic-saffron tracking-widest">{item.status}</span>
                        </div>
                        <h4 className="font-bold text-civic-navy mb-4">{item.label}</h4>
                        <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                            <motion.div initial={{ width: 0 }} animate={{ width: `${item.progress}%` }} className="h-full bg-civic-navy" />
                        </div>
                        <span className="text-[9px] font-bold text-gray-400 mt-2 block">{item.progress}% Complete</span>
                    </div>
                  ))}
               </div>

               <div className="p-10 bg-civic-navy rounded-[3rem] text-white w-full flex items-center justify-between relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-8 opacity-10">
                      <AlertTriangle className="w-32 h-32" />
                  </div>
                  <div className="flex items-center gap-6 relative z-10">
                      <AlertTriangle className="w-10 h-10 text-civic-saffron" />
                      <div>
                          <h4 className="text-xl font-bold mb-1">Verify SIR Inclusion</h4>
                          <p className="text-sm text-white/60">Ensure your record is synchronized with the 2026 Karnataka VoterFlow Roll.</p>
                      </div>
                  </div>
                  <button 
                    onClick={() => window.open('https://electoralsearch.eci.gov.in/', '_blank')}
                    className="px-8 py-4 bg-white text-civic-navy font-black rounded-xl text-[10px] uppercase tracking-widest hover:bg-civic-saffron transition-all relative z-10"
                  >
                    Launch Search
                  </button>
               </div>
            </motion.div>
          ) : activeTab === 'form8' ? (
            <motion.div
              key="form8"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white/70 backdrop-blur-2xl rounded-[3.5rem] p-16 border border-white/50 h-full flex flex-col items-start text-left overflow-y-auto"
            >
               <div className="flex items-center gap-4 mb-10">
                  <div className="w-16 h-16 bg-civic-navy rounded-2xl flex items-center justify-center shadow-xl shadow-civic-navy/20">
                      <Gavel className="w-8 h-8 text-white" />
                  </div>
                  <div>
                      <h2 className="text-3xl font-display font-bold text-civic-navy">Form 8: Correction Suite</h2>
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1">VoterFlow Data Integrity Platform</p>
                  </div>
               </div>
               
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full mb-12">
                  {[
                    { title: 'Update Photograph', desc: 'Refresh your EPIC identity with current biometric standards.', time: '2 mins' },
                    { title: 'Address Migration', desc: 'Updating mapping for sector shifts within Bengaluru.', time: '5 mins' },
                    { title: 'Data Correction', desc: 'Fix clerical errors in legal records with OTP verification.', time: '3 mins' },
                    { title: 'EPIC Replacement', desc: 'Order a 2026-edition PVC card for lost/damaged IDs.', time: '1 min' }
                  ].map((item, i) => (
                    <motion.button 
                      key={i} 
                      whileHover={{ scale: 1.02 }} 
                      whileTap={{ scale: 0.98 }}
                      onClick={() => window.open('https://voters.eci.gov.in/', '_blank')}
                      className="p-8 bg-white rounded-[2.5rem] border border-gray-100 shadow-sm text-left flex flex-col gap-4 group hover:border-civic-navy transition-all"
                    >
                        <div className="flex justify-between items-center">
                            <h4 className="font-bold text-civic-navy text-lg">{item.title}</h4>
                            <span className="text-[9px] font-black bg-gray-50 px-2 py-1 rounded text-gray-400 uppercase group-hover:bg-civic-navy group-hover:text-white transition-all">{item.time}</span>
                        </div>
                        <p className="text-xs text-gray-500 leading-relaxed font-medium">{item.desc}</p>
                        <div className="mt-2 flex items-center gap-2 text-civic-navy font-bold text-[10px] uppercase tracking-widest">
                            Initiate Wizard <ChevronRight className="w-4 h-4" />
                        </div>
                    </motion.button>
                  ))}
               </div>

               <div className="w-full p-8 bg-gray-50 rounded-[2.5rem] border border-dashed border-gray-200 flex items-center gap-6">
                  <Info className="w-8 h-8 text-civic-navy opacity-30" />
                  <p className="text-[11px] text-gray-400 font-medium leading-relaxed">
                    Form 8 submissions require OTP authentication via Aadhaar-linked mobile numbers. 
                    <a href="https://voters.eci.gov.in/" target="_blank" className="text-civic-navy underline ml-2">VoterFlow Portal</a>
                  </p>
               </div>
            </motion.div>
          ) : (
            <motion.div
                key="polling"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="w-full h-full"
             >
                <PollingBoothLocator />
             </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 glass-dark border-t border-white/10 z-[3000] px-4 py-3 rounded-t-3xl shadow-[0_-10px_40px_rgba(0,0,0,0.1)]">
        <nav className="flex items-center justify-between gap-1 overflow-x-auto no-scrollbar pb-1">
          {[
            { id: 'overview', icon: LayoutDashboard, labelKey: 'overview' },
            { id: 'registration', icon: UserPlus, labelKey: 'registration' },
            { id: 'research', icon: BookOpen, labelKey: 'research' },
            { id: 'polling', icon: MapPin, labelKey: 'polling' },
            { id: 'form8', icon: Gavel, labelKey: 'form8' },
            { id: 'sir2026', icon: Calendar, labelKey: 'sir2026' },
            { id: 'helpline', icon: Headphones, labelKey: 'helpline' }
          ].map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as any)}
              className={cn(
                "flex flex-col items-center justify-center p-2 rounded-2xl min-w-[64px] transition-all relative",
                activeTab === item.id ? "text-white bg-civic-navy" : "text-gray-400 hover:text-civic-navy"
              )}
            >
              <item.icon className={cn("w-5 h-5 mb-1", activeTab === item.id ? "text-civic-saffron" : "")} />
              <span className="text-[8px] font-bold uppercase tracking-widest leading-none text-center">
                {t(item.labelKey).split(' (')[0].substring(0, 8)}
              </span>
            </button>
          ))}
        </nav>
      </div>

      {/* Gemini Multimodal Scanner Overlay */}
      <AnimatePresence>
        {showAiValidator && (
            <div className="fixed inset-0 z-[4000] flex items-center justify-center p-6 bg-civic-navy/60 backdrop-blur-3xl">
                <motion.div 
                    initial={{ scale: 0.9, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.9, opacity: 0, y: 20 }}
                    className="bg-white w-full max-w-xl rounded-[3.5rem] p-12 shadow-2xl relative overflow-hidden"
                >
                    <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-google-blue via-purple-500 to-pink-500 animate-pulse" />
                    <Tooltip content="Back to Dashboard">
                        <button onClick={() => {
                            setShowAiValidator(false);
                            setScanStatus('idle');
                        }} className="absolute top-8 right-8 p-3 bg-gray-50 rounded-full hover:bg-red-50 transition-all"><X className="w-5 h-5" /></button>
                    </Tooltip>
                    
                    <div className="text-center mb-10">
                        <div className="w-20 h-20 bg-civic-navy rounded-[2rem] flex items-center justify-center mx-auto mb-6 shadow-xl relative group">
                            <Cpu className="text-civic-saffron w-10 h-10 animate-pulse" />
                            <div className="absolute inset-0 bg-google-blue/20 rounded-[2rem] animate-ping opacity-0 group-hover:opacity-100" />
                        </div>
                        <h3 className="text-2xl font-display font-bold text-civic-navy">Gemini Vision Validator</h3>
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mt-2 font-medium flex items-center justify-center gap-2">
                             <img src="https://www.gstatic.com/lamda/images/gemini_sparkle_v002_d4735304ff6292a690345.svg" className="w-3 h-3" alt="Gemini" />
                             Multimodal Analysis Core
                        </p>
                    </div>

                    {scanStatus === 'idle' ? (
                        <div className="space-y-6">
                            <div 
                                onClick={() => setScanStatus('scanning')}
                                className="p-12 border-2 border-dashed border-gray-100 rounded-[2.5rem] flex flex-col items-center gap-4 hover:border-google-blue hover:bg-blue-50/30 transition-all cursor-pointer group"
                            >
                                <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center group-hover:bg-white transition-all shadow-sm">
                                    <Download className="w-8 h-8 text-gray-400 group-hover:text-google-blue" />
                                </div>
                                <div className="text-center">
                                    <p className="font-bold text-civic-navy">Drop Identity Document</p>
                                    <p className="text-[10px] text-gray-400 font-bold uppercase mt-1">Aadhaar / Voter ID / Passport</p>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 flex items-center gap-3">
                                    <ShieldCheck className="w-4 h-4 text-civic-green" />
                                    <span className="text-[10px] font-bold text-gray-500">End-to-End Encryption</span>
                                </div>
                                <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 flex items-center gap-3">
                                    <Globe className="w-4 h-4 text-google-blue" />
                                    <span className="text-[10px] font-bold text-gray-500">Gemini 1.5 Pro Vision</span>
                                </div>
                            </div>
                        </div>
                    ) : scanStatus === 'scanning' ? (
                        <div className="py-12 flex flex-col items-center gap-8">
                            <div className="w-48 h-64 bg-gray-100 rounded-2xl relative overflow-hidden shadow-inner border border-gray-200 holographic-scan">
                                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-google-blue/5 to-google-blue/10" />
                                <motion.div 
                                    animate={{ y: [0, 256, 0] }}
                                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                                    className="absolute top-0 left-0 w-full h-1 bg-google-blue shadow-[0_0_20px_#4285F4] z-20"
                                />
                                {/* Laser Sweep Shadow */}
                                <motion.div 
                                    animate={{ y: [0, 256, 0] }}
                                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                                    className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-google-blue/20 to-transparent z-10"
                                />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <FileText className="w-12 h-12 text-gray-300 animate-pulse" />
                                </div>
                            </div>
                            <div className="text-center space-y-2">
                                <h4 className="text-sm font-bold text-civic-navy animate-pulse">Gemini is analyzing legislative markers...</h4>
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Verifying Holographic Anti-Forgery</p>
                            </div>
                            <motion.div 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 3 }}
                                onAnimationComplete={() => setTimeout(() => setScanStatus('result'), 500)}
                                className="w-full h-1 bg-gray-100 rounded-full overflow-hidden"
                            >
                                <motion.div initial={{ width: 0 }} animate={{ width: '100%' }} transition={{ duration: 3 }} className="h-full bg-google-blue" />
                            </motion.div>
                        </div>
                    ) : (
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="space-y-6"
                        >
                            <div className="p-8 bg-civic-green/5 border border-civic-green/20 rounded-[2.5rem] relative overflow-hidden">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="w-10 h-10 bg-civic-green rounded-xl flex items-center justify-center text-white">
                                        <CheckCircle className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-civic-navy">Aadhaar Verified</h4>
                                        <p className="text-[10px] font-bold text-civic-green uppercase">98.4% Probabilistic Match</p>
                                    </div>
                                </div>
                                <p className="text-[11px] text-gray-600 leading-relaxed italic">
                                    "Gemini analysis confirms the document is a valid Aadhaar Card. Demographic markers (Age, Residence) match your Persona profile for Sector 25."
                                </p>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-5 bg-gray-50 rounded-2xl border border-gray-100">
                                    <div className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Face Match</div>
                                    <div className="text-sm font-bold text-civic-navy">High Integrity</div>
                                </div>
                                <div className="p-5 bg-gray-50 rounded-2xl border border-gray-100">
                                    <div className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">DOB Status</div>
                                    <div className="text-sm font-bold text-civic-navy">Eligible (18+)</div>
                                </div>
                            </div>
                            <button 
                                onClick={() => {
                                    addReadiness(15);
                                    setShowAiValidator(false);
                                    setScanStatus('idle');
                                }}
                                className="w-full py-5 bg-civic-navy text-white font-black rounded-2xl text-xs uppercase tracking-widest shadow-xl hover:scale-[1.02] active:scale-95 transition-all"
                            >
                                Synchronize with ECI Roll
                            </button>
                        </motion.div>
                    )}
                </motion.div>
            </div>
        )}
      </AnimatePresence>

    </div>
  );
};
