import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useVoterStore, type VoterState } from '../../store/useVoterStore';
import { useTranslation } from '../../LanguageContext';
import { TiltCard } from '../Atoms/TiltCard';
import { PollingBoothLocator } from './PollingBoothLocator';
import { FutureVoterTool } from '../Molecules/FutureVoterTool';
import { EvmSimulator } from './EvmSimulator';

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
  Zap, 
  CheckCircle, Gavel, 
  Calendar, LayoutDashboard, UserPlus, Search, Library, 
  Headphones, ArrowRight, Radio, Award, ChevronLeft, User, Target,
  PhoneCall, MapPin, ShieldCheck,
  UserCheck,
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
    <button
      onClick={() => setActiveTab(id)}
      aria-label={`${t(labelKey)} tab`}
      aria-current={activeTab === id ? 'page' : undefined}
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
      <Icon className={cn("w-5 h-5 relative z-10 transition-transform duration-500 group-hover:scale-110", activeTab === id ? "text-civic-saffron" : "")} aria-hidden="true" />
      <span className="text-sm font-bold relative z-10">{t(labelKey).split(' (')[0]}</span>
    </button>
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
  const [activeMilestone, setActiveMilestone] = useState<number | null>(1); // Default to Current

  const syncToCalendar = () => {
      const toast = document.createElement('div');
      toast.className = "fixed top-12 left-1/2 -translate-x-1/2 bg-civic-navy text-white px-8 py-4 rounded-3xl shadow-2xl z-[6000] font-bold flex items-center gap-4 animate-bounce border border-white/20 backdrop-blur-xl";
      toast.innerHTML = `<div class="w-4 h-4 bg-google-blue rounded-full"></div> Syncing timelines to Google Calendar...`;
      document.body.appendChild(toast);
      setTimeout(() => {
          toast.innerHTML = `<div class="w-4 h-4 bg-civic-green rounded-full"></div> 4 Milestones added to Calendar!`;
          setTimeout(() => document.body.removeChild(toast), 2000);
      }, 2000);
  };

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
        className="hidden lg:flex w-64 glass rounded-[2.5rem] p-6 shadow-2xl shadow-civic-navy/5 sticky top-44 flex-col h-[calc(100vh-220px)]"
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
            <motion.button 
              whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
              onClick={resetStore}
              className="w-full py-4 bg-gray-100 text-civic-navy font-bold rounded-2xl text-xs flex items-center justify-center gap-2 hover:bg-red-50 hover:text-red-500 transition-all"
            >
              <ChevronLeft className="w-4 h-4" /> {t('reset')}
            </motion.button>
        </div>
      </motion.aside>

      {/* Main Content Area */}
      <div className="flex-1 space-y-6 pb-32 lg:pb-20 relative min-w-0">
          <div className="absolute inset-0 bg-white/5 backdrop-blur-[2px] -z-10 rounded-[4rem] pointer-events-none" />
          
          {/* Removed Large VoterFlow Assistant Access Banner */}



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
              
              {/* VoterFlow Alert Ticker - Relocated for more breathing room */}
              <motion.div 
                variants={{ hidden: { y: 20, opacity: 0 }, show: { y: 0, opacity: 1 } }}
                className="xl:col-span-2 mt-8 mb-12"
              >
                  <div className="w-full bg-white/40 backdrop-blur-2xl rounded-[2.5rem] p-8 flex items-center gap-8 overflow-hidden relative border border-white/60 shadow-sm group">
                      <div className="flex items-center gap-3 px-5 py-2.5 bg-gradient-to-r from-red-600 via-red-500 to-rose-600 text-white rounded-full text-[9px] font-black uppercase tracking-[0.2em] animate-pulse shadow-xl shadow-red-500/20 shrink-0 z-10">
                          <Zap className="w-3.5 h-3.5 fill-white" /> Urgent Alerts
                      </div>
                      <div className="flex-1 overflow-hidden relative h-full flex items-center">
                          <motion.div 
                              animate={{ x: ["100%", "-100%"] }}
                              transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
                              className="whitespace-nowrap text-[10px] font-bold uppercase tracking-[0.15em] text-red-900/80"
                          >
                              SIR 2026: House-to-House Mapping is active in Karnataka Sectors. &nbsp;&nbsp; • &nbsp;&nbsp; Form 12D Home Voting requests open for Senior Citizens. &nbsp;&nbsp; • &nbsp;&nbsp; Aadhaar-EPIC linking is mandatory for data integrity. &nbsp;&nbsp; • &nbsp;&nbsp; Verification Phase 2.4 active.
                          </motion.div>
                      </div>
                      
                      {/* Decorative elements to make it 'free' and premium */}
                      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white/40 to-transparent z-20 pointer-events-none" />
                      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white/40 to-transparent z-20 pointer-events-none" />
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
                  
                  {/* Floating Data Orbs */}
                  <div className="absolute inset-0 pointer-events-none">
                      {[1, 2, 3].map(i => (
                          <motion.div
                            key={i}
                            animate={{ 
                                y: [0, -40, 0],
                                x: [0, 20, 0],
                                opacity: [0.1, 0.3, 0.1]
                            }}
                            transition={{ 
                                duration: 5 + i * 2, 
                                repeat: Infinity, 
                                ease: "easeInOut" 
                            }}
                            className="absolute w-8 h-8 bg-civic-navy/10 rounded-full blur-xl"
                            style={{ 
                                left: `${20 + i * 20}%`,
                                top: `${30 + i * 15}%`
                            }}
                          />
                      ))}
                  </div>

                      <div className="flex items-center gap-3 mb-12 justify-between w-full">
                          <div className="flex items-center gap-3">
                              <div className="w-12 h-12 bg-civic-navy rounded-2xl flex items-center justify-center shadow-xl shadow-civic-navy/10">
                                  <Library className="w-6 h-6 text-civic-saffron" />
                              </div>
                              <h3 className="text-2xl font-display font-bold text-civic-navy">{t('journey_timeline')}</h3>
                          </div>
                          <button 
                            onClick={syncToCalendar}
                            className="px-6 py-3 bg-[#000000] text-white text-[10px] font-black uppercase tracking-widest rounded-xl shadow-xl flex items-center gap-2 hover:scale-105 active:scale-95 transition-all border border-white/10"
                          >
                            <Calendar className="w-4 h-4 text-google-blue" /> {t('sync_calendar')}
                          </button>
                      </div>
                      
                      <div className="relative flex flex-col md:flex-row justify-between gap-8 px-4 mb-12">
                          <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-100 -z-0 hidden md:block" />
                          {[
                            { date: 'Oct 2025', event: t('sir_cycle'), status: 'Passed', icon: Zap, details: t('sir_desc') },
                            { date: 'Feb 2026', event: t('draft_roll'), status: 'Current', icon: Search, details: t('draft_desc') },
                            { date: 'Mar 2026', event: t('final_pub'), status: 'Upcoming', icon: ShieldCheck, details: t('final_desc') },
                            { date: 'May 2026', event: t('elections'), status: 'Goal', icon: Flame, details: t('elections_desc') }
                          ].map((milestone, i) => (
                            <button 
                                key={i} 
                                onClick={() => {
                                    setActiveMilestone(i);
                                    addChatMessage({ role: 'ai', text: `Milestone Intel: ${milestone.event} (${milestone.date}). ${milestone.details}` });
                                }}
                                className="flex flex-col items-center text-center relative z-10 group/item transition-transform"
                            >
                                <div className={cn(
                                    "w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-500 mb-4",
                                    activeMilestone === i ? "scale-110 shadow-2xl ring-4 ring-civic-navy/10" : "scale-100",
                                    milestone.status === 'Passed' ? "bg-civic-green text-white shadow-lg" :
                                    milestone.status === 'Current' ? "bg-civic-navy text-white animate-pulse" :
                                    "bg-white text-gray-300 border border-gray-100 group-hover/item:border-civic-navy/20"
                                )}>
                                    <milestone.icon className="w-7 h-7" />
                                </div>
                                <div className="text-[10px] font-black text-civic-navy uppercase tracking-widest">{milestone.date}</div>
                                <div className="text-xs font-bold text-gray-500 mt-1">{milestone.event}</div>
                                <div className={cn("text-[8px] font-black uppercase mt-1", milestone.status === 'Current' ? "text-civic-saffron" : "text-gray-300")}>{milestone.status}</div>
                            </button>
                          ))}
                      </div>

                      <AnimatePresence mode="wait">
                          {activeMilestone !== null && (
                              <motion.div
                                key={activeMilestone}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="bg-white/50 border border-white p-8 rounded-[2.5rem] relative overflow-hidden"
                              >
                                 <div className="absolute top-0 right-0 p-8 opacity-5">
                                    {(() => {
                                        const Icon = [Zap, Search, ShieldCheck, Flame][activeMilestone];
                                        return Icon ? <Icon className="w-32 h-32 text-civic-navy" /> : null;
                                    })()}
                                 </div>
                                 <div className="flex items-center gap-4 mb-4">
                                    <div className="px-3 py-1 bg-civic-navy text-white text-[8px] font-black uppercase tracking-widest rounded-full">{t('milestone_details')}</div>
                                    <div className="text-xs font-bold text-gray-400">{t('protocol_42')}</div>
                                 </div>
                                 <h4 className="text-xl font-bold text-civic-navy mb-2">
                                    {[t('sir_cycle'), t('draft_roll'), t('final_pub'), t('elections')][activeMilestone]}
                                 </h4>
                                 <p className="text-sm text-gray-500 leading-relaxed max-w-2xl font-medium">
                                    {[t('sir_desc'), t('draft_desc'), t('final_desc'), t('elections_desc')][activeMilestone]}
                                 </p>
                              </motion.div>
                          )}
                      </AnimatePresence>
                      </div>
                  </TiltCard>
              </motion.div>

              {/* Polling Booth Locator */}
              <motion.div variants={{ hidden: { y: 20, opacity: 0 }, show: { y: 0, opacity: 1 } }} className="xl:col-span-2">
                <TiltCard>
                  <PollingBoothLocator />
                </TiltCard>
              </motion.div>

              {/* Heatmap & Future Voter Tool */}
              <motion.div variants={{ hidden: { y: 20, opacity: 0 }, show: { y: 0, opacity: 1 } }} className="grid grid-cols-1 xl:grid-cols-2 gap-8 xl:col-span-2">
                  <TiltCard><ConstituencyHeatmap onOpenChat={() => setIsChatOpen(true)} /></TiltCard>
                  <TiltCard><FutureVoterTool /></TiltCard>
              </motion.div>

              {/* VoterFlow Voter Card */}
              {progress.registration === 100 && (
                <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="xl:col-span-2 bg-civic-navy rounded-[3.5rem] p-12 text-white relative overflow-hidden shadow-[0_30px_100px_rgba(0,0,128,0.3)] group glass-holographic"
                >
                    <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay" />
                    <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-civic-saffron/20 rounded-full blur-[100px] group-hover:bg-civic-saffron/30 transition-all duration-1000" />
                    
                    <motion.div 
                        animate={{ y: ["-100%", "200%"] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent z-20"
                    />
                    
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
                                    <span className="px-3 py-1 bg-civic-saffron text-civic-navy text-[8px] font-black uppercase tracking-[0.2em] rounded-full">{t('vf_identity')}</span>
                                    <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">{t('epic_id')}</span>
                                </div>
                                <h3 className="text-3xl font-display font-bold uppercase tracking-tight">{voterName || t('sarvesh_a')}</h3>
                                <div className="flex items-center gap-4 mt-2">
                                    <div className="text-[10px] font-medium text-white/60">{t('pc_bengaluru')}</div>
                                    <div className="w-1 h-1 bg-white/20 rounded-full" />
                                    <div className="text-[10px] font-medium text-white/60">{t('qualifying_date')}</div>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <button className="px-8 py-4 bg-white/10 hover:bg-white/20 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2">
                                <Download className="w-4 h-4" /> {t('download_epic')}
                            </button>
                            <button 
                                onClick={() => {}}
                                className="px-8 py-4 bg-[#000000] text-white font-black rounded-2xl text-[10px] uppercase tracking-widest shadow-xl flex items-center gap-3 hover:scale-105 active:scale-95 transition-all border border-white/20"
                            >
                                <img src="https://www.gstatic.com/wallet/badge/en_US.svg" className="h-4" alt="Add to Google Wallet" loading="lazy" decoding="async" />
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
                        <h3 className="text-3xl font-bold text-civic-navy mb-4">{t('registration_suite')}</h3>
                        <p className="text-sm text-gray-500 mb-10 leading-relaxed max-w-sm">
                          {t('registration_desc')}
                        </p>
                    </div>
                    <div className="mt-auto relative z-10">
                       <div className="flex justify-between text-[9px] font-bold text-gray-400 mb-3 uppercase tracking-[0.2em]">{t('progress')}</div>
                      <div className="h-2.5 w-full bg-gray-100/50 rounded-full overflow-hidden mb-8 p-0.5 border border-white/20">
                        <motion.div 
                            animate={{ width: `${progress.registration}%` }} 
                            className="h-full rounded-full animate-liquid" 
                        />
                      </div>
                      <button className="w-full py-6 bg-civic-navy text-white font-bold rounded-[2rem] shadow-2xl shadow-civic-navy/30 flex items-center justify-center gap-3 active:scale-95 transition-all group/btn">
                        {t('open_wizard')} <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
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
                      <span className="px-4 py-2 bg-civic-navy/5 rounded-full text-[9px] font-black text-civic-navy uppercase tracking-widest">VoterFlow AI</span>
                    </div>
                    <div className="relative z-10">
                        <h3 className="text-3xl font-bold text-civic-navy mb-4">{t('doc_validator')}</h3>
                        <p className="text-sm text-gray-500 mb-10 leading-relaxed max-w-sm">
                          {t('validator_desc')}
                        </p>
                    </div>
                    <div className="mt-auto relative z-10">
                        <div className="flex items-center gap-3 text-civic-navy font-bold text-[11px] uppercase tracking-[0.2em]">
                            {t('analyze_docs')} <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                        </div>
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
                    <h3 className="text-3xl font-bold text-civic-navy mb-4">{t('registration_suite')}</h3>
                    <p className="text-sm text-gray-500 mb-10 leading-relaxed max-w-sm">
                      {t('registration_desc')}
                    </p>
                </div>
                <div className="mt-auto relative z-10">
                   <div className="flex justify-between text-[9px] font-bold text-gray-400 mb-3 uppercase tracking-[0.2em]">{t('progress')}</div>
                  <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden mb-8">
                    <motion.div animate={{ width: `${progress.registration}%` }} className="h-full bg-civic-navy" />
                  </div>
                  <button 
                    onClick={() => setActiveFlow('registration')}
                    className="w-full py-6 bg-civic-navy text-white font-bold rounded-[2rem] shadow-2xl shadow-civic-navy/30 flex items-center justify-center gap-3 active:scale-95 transition-all group/btn animate-sovereign-pulse"
                  >
                    {t('open_wizard')} <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
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
                  <span className="px-4 py-2 bg-civic-navy/5 rounded-full text-[9px] font-black text-civic-navy uppercase tracking-widest">VoterFlow AI</span>
                </div>
                <div className="relative z-10">
                    <h3 className="text-3xl font-bold text-civic-navy mb-4">{t('doc_validator')}</h3>
                    <p className="text-sm text-gray-500 mb-10 leading-relaxed max-w-sm">
                      {t('validator_desc')}
                    </p>
                </div>
                <div className="mt-auto relative z-10">
                    <div className="flex items-center gap-3 text-civic-navy font-bold text-[11px] uppercase tracking-[0.2em]">
                        {t('analyze_docs')} <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
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
                  <h2 className="text-4xl font-display font-bold text-civic-navy mb-2">{t('intelligence_hub')}</h2>
                  <p className="text-gray-500 font-medium">{t('intelligence_desc')}</p>
                </div>
                <button 
                  onClick={() => setIsChatOpen(true)} 
                  className="px-8 py-4 bg-civic-navy text-white font-bold rounded-2xl shadow-xl shadow-civic-navy/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-3"
                >
                  <BookOpen className="w-5 h-5" /> {t('consult_assistant')}
                </button>
              </motion.header>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {[
                      { title: t('sir_revision'), desc: t('sir_revision_desc'), icon: UserCheck, color: 'text-blue-500', bg: 'bg-blue-50' },
                      { title: t('constitutional_rights'), desc: t('rights_desc'), icon: ShieldCheck, color: 'text-orange-500', bg: 'bg-orange-50' },
                      { title: t('legal_forms'), desc: t('forms_desc'), icon: FileEdit, color: 'text-civic-green', bg: 'bg-green-50' },
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
            </motion.div>
          ) : activeTab === 'polling' ? (
            <motion.div
              key="polling"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="w-full h-full"
            >
              <EvmSimulator />
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
               <h2 className="text-4xl font-display font-bold text-civic-navy mb-4">{t('eci_helpline')}</h2>
               <p className="text-gray-500 max-w-md text-lg font-medium mb-12">{t('support_desc')}</p>
               
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-3xl">
                  <div className="p-8 bg-white rounded-[2.5rem] border border-gray-100 shadow-sm flex flex-col items-center gap-4 group hover:bg-civic-navy hover:text-white transition-all">
                      <div className="text-[10px] font-black uppercase tracking-widest opacity-40">{t('national_support')}</div>
                      <div className="text-4xl font-display font-bold">1950</div>
                      <div className="text-xs font-bold opacity-60">{t('voter_hotline')}</div>
                      <a href="tel:1950" className="mt-4 px-6 py-3 bg-civic-saffron text-civic-navy rounded-xl text-[10px] font-black uppercase tracking-widest group-hover:bg-white transition-all">{t('connect')}</a>
                  </div>
                  <div className="p-8 bg-white rounded-[2.5rem] border border-gray-100 shadow-sm flex flex-col items-center gap-4 group hover:bg-civic-navy hover:text-white transition-all">
                      <div className="text-[10px] font-black uppercase tracking-widest opacity-40">{t('local_mapping')}</div>
                      <div className="text-2xl font-display font-bold">{t('blo_officer')}</div>
                      <div className="text-xs font-bold opacity-60">{t('find_blo')}</div>
                      <a href="https://voters.eci.gov.in/login" target="_blank" className="mt-4 px-6 py-3 bg-civic-navy text-white rounded-xl text-[10px] font-black uppercase tracking-widest group-hover:bg-civic-saffron group-hover:text-civic-navy transition-all border border-civic-navy/10">{t('search_archives')}</a>
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
                      <h2 className="text-3xl font-display font-bold text-civic-navy">{t('sir2026_framework')}</h2>
                      <p className="text-[10px] font-black text-civic-saffron uppercase tracking-widest mt-1">{t('sir_status')}</p>
                  </div>
               </div>
               
               <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full mb-12">
                  {[
                    { label: t('sector_mapping'), status: t('percent_sync'), progress: 85, icon: MapPin },
                    { label: t('document_purge'), status: t('active'), progress: 62, icon: UserCheck },
                    { label: t('card_gen'), status: t('upcoming'), progress: 0, icon: ShieldCheck }
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
                        <span className="text-[9px] font-bold text-gray-400 mt-2 block">{item.progress}% {t('complete')}</span>
                    </div>
                  ))}
               </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
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
                    <div className="text-center mb-10">
                        <div className="w-20 h-20 bg-civic-navy rounded-[2rem] flex items-center justify-center mx-auto mb-6 shadow-xl relative group">
                            <Cpu className="text-civic-saffron w-10 h-10 animate-pulse" />
                        </div>
                        <h3 className="text-2xl font-display font-bold text-civic-navy">{t('gemini_validator')}</h3>
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mt-2 font-medium flex items-center justify-center gap-2">
                             <img src="https://www.gstatic.com/lamda/images/gemini_sparkle_v002_d4735304ff6292a690345.svg" className="w-3 h-3" alt="Gemini" loading="lazy" decoding="async" />
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
