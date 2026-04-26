import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useVoterStore, type VoterState } from '../../store/useVoterStore';
import { useTranslation } from '../../LanguageContext';
import { PollingSimulator } from './PollingSimulator';
import { PollingBoothLocator } from './PollingBoothLocator';
import { FutureVoterTool } from '../Molecules/FutureVoterTool';

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

const ConstituencyHeatmap = () => (
    <div className="bg-white/40 backdrop-blur-xl rounded-[3.5rem] p-10 border border-white/50 shadow-sm relative overflow-hidden h-full">
        <div className="flex justify-between items-start mb-8">
            <div>
                <h3 className="text-xl font-display font-bold text-civic-navy">Constituency Sync</h3>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Real-time Sector Mapping</p>
            </div>
            <div className="px-3 py-1 bg-civic-green/10 rounded-full text-[9px] font-black text-civic-green uppercase tracking-widest">
                Live Data
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
                <div className="flex justify-between items-center text-[9px] font-bold">
                    <span className="text-gray-400 uppercase">Sync Status</span>
                    <span className="text-civic-green">89.2% Optimized</span>
                </div>
            </div>
        </div>
    </div>
);
import { 
  Zap, MessageCircle, X, 
  Send, CheckCircle, Gavel, 
  Calendar, LayoutDashboard, UserPlus, Search, Library, 
  ChevronLeft, ChevronRight, Headphones, Radio, ArrowRight, User,
  PhoneCall, ShieldCheck, MapPin, Info,
  AlertTriangle, UserCheck, Target, Award,
  Flame, Cpu, BookOpen, Download, FileText, Sparkles, Loader2,
  FileEdit, Globe
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
      className={cn(
        "w-full flex items-center gap-4 px-6 py-4 rounded-2xl transition-all duration-300",
        activeTab === id ? "bg-civic-navy text-white shadow-xl shadow-civic-navy/20" : "text-gray-500 hover:bg-white/60"
      )}
    >
      <Icon className="w-5 h-5" />
      <span className="text-sm font-bold">{t(labelKey).split(' (')[0]}</span>
    </button>
);

export const Dashboard = () => {
  const { 
    persona, progress, resetStore, activeTab, 
    setActiveTab, setActiveFlow, readinessScore, addReadiness,
    hasGreeted, setHasGreeted
  } = useVoterStore();
  const { t } = useTranslation();
  
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [showChatTooltip, setShowChatTooltip] = useState(false);
  const [chatMessages, setChatMessages] = useState<{ role: 'user' | 'ai'; text: string; sources?: string[] }[]>([]);
  const [userInput, setUserInput] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const [showAiValidator, setShowAiValidator] = useState(false);
  const [isDeepSearching, setIsDeepSearching] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);

  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  // Proactive Assistant Guidance - Fixed Spam & Removed Auto-Open
  useEffect(() => {
    if (!hasGreeted && persona) {
        const greetings: Record<string, string> = {
            FirstTime: "Namaste! Welcome, First-Time Voter. I'm your Sovereign Intel Coach. Your journey to democratic participation starts here. I recommend launching the 'Registration Suite' below to check your eligibility and file Form 6.",
            Student: "Hello! As a student/migrant, you have specific rights under SIR 2026. I can guide you through the Annexure-II residency declaration and Form 6 filing. Shall we begin?",
            Senior: "Namaste. For our senior citizens, we offer priority assistance. I can help you understand the Form 12D process for home-voting or locate a priority-access booth in PC 25."
        };
        
        const timer = setTimeout(() => {
            setChatMessages([{ role: 'ai', text: greetings[persona] || "Welcome to your Sovereign Dashboard. How can I assist your civic journey today?" }]);
            setShowChatTooltip(true); // Show tooltip instead of opening chat
            setHasGreeted(true);
        }, 2000);
        return () => clearTimeout(timer);
    }
  }, [persona, hasGreeted, setHasGreeted]);

  const handleChat = (input?: string, isDeep = false) => {
    const text = input || userInput;
    if (!text.trim() || isStreaming) return;

    setChatMessages(prev => [...prev, { role: 'user', text }]);
    setUserInput('');
    setIsStreaming(true);
    
    if (isDeep) setIsDeepSearching(true);

    const sources = isDeep ? ['ECI Knowledge Graph', 'Legal Gazette 2026', 'Sovereign Intel Archives'] : undefined;
    
    // Add an empty AI message that we will fill
    setChatMessages(prev => [...prev, { role: 'ai', text: 'Thinking...', sources }]);

    const getResponse = (query: string) => {
        const q = query.toLowerCase();
        if (q.includes('form 6')) return "Form 6 is the legal instrument for new voter registration. Under SIR 2026 rules, you'll need: 1. Age Proof (Aadhaar/10th Cert), 2. Address Proof, and 3. A digital photograph. Use the 'Digital Form Engine' on your dashboard for a guided, AI-verified experience.";
        if (q.includes('booth') || q.includes('locate')) return "I've synchronized with your local sector (PC 25). Your assigned polling station is the BBMP Public School, Shanti Nagar. Current average transit time: 12 mins. You can view the real-time sector map in the 'Overview' tab.";
        if (q.includes('deadline') || q.includes('sir 2026')) return "The Special Intensive Revision 2026 (Phase 2) is active until Feb 15, 2026. This is the critical window for claims and objections. Ensure your EPIC is linked with Aadhaar to avoid automatic deletion during the de-duplication purge.";
        if (q.includes('correction') || q.includes('form 8')) return "Form 8 is used for updating your details (photo, address, or name). In the Sovereign Edition, this is protected by multi-factor authentication. Launch the 'Correction Suite' from the sidebar to begin.";
        return `As your Sovereign Intel Coach, I've analyzed your ${persona || 'Citizen'} profile against the PC 25 legislative roll. Your current readiness is ${Math.round(readinessScore)}%. I recommend verifying your residency status to ensure 100% compliance before the March final publication.`;
    };

    const mockResponse = getResponse(text);
    let fullText = "";
    let i = 0;
    
    const delay = isDeep ? 2500 : 500;
    
    setTimeout(() => {
        setIsDeepSearching(false);
        // Optimized Streaming: Update every 3 characters to reduce re-render spam
        const interval = setInterval(() => {
            if (i >= mockResponse.length) {
                clearInterval(interval);
                setIsStreaming(false);
                addReadiness(2);
                return;
            }
            
            // Append next chunk
            const chunk = mockResponse.slice(i, i + 3);
            fullText += chunk;
            i += 3;
            
            setChatMessages(prev => {
                const newMessages = [...prev];
                newMessages[newMessages.length - 1] = { role: 'ai', text: fullText, sources };
                return newMessages;
            });
        }, 20);
    }, delay);
  };



  return (
    <div className="flex gap-8 items-start relative h-[85vh]">
      {/* Sticky Left Sidebar */}
      <motion.aside
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="w-72 bg-white/40 backdrop-blur-xl border border-white/40 rounded-[3rem] p-8 shadow-xl sticky top-32 flex flex-col h-full"
      >
        <div className="flex items-center gap-3 mb-12 px-2">
          <div className="w-10 h-10 bg-civic-navy rounded-xl flex items-center justify-center">
            <Radio className="text-civic-saffron w-5 h-5" />
          </div>
          <span className="font-display font-bold text-civic-navy text-sm uppercase tracking-widest">Navigator</span>
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
        <div className="mt-8 p-6 bg-white/60 rounded-3xl border border-white relative overflow-hidden group">
            <h4 className="text-[9px] font-black text-civic-navy uppercase tracking-widest mb-4 flex items-center gap-2">
                <Award className="w-3 h-3 text-civic-saffron" /> Sovereign Badges
            </h4>
            <div className="flex flex-wrap gap-2">
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
                            "w-10 h-10 rounded-xl flex items-center justify-center transition-all",
                            badge.active ? "bg-civic-navy text-civic-saffron shadow-lg" : "bg-gray-100 text-gray-300"
                        )}
                    >
                        <badge.icon className="w-5 h-5" />
                    </div>
                ))}
            </div>
        </div>

        {/* Readiness Score Molecule */}
        <div className="mt-8 p-6 bg-white/60 rounded-3xl border border-white relative overflow-hidden group">
            <div className="flex justify-between items-center mb-4 relative z-10">
                <Target className="w-5 h-5 text-civic-navy" />
                <span className="text-[10px] font-black text-civic-navy uppercase tracking-widest">{Math.round(readinessScore)}% Ready</span>
            </div>
            <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden relative z-10">
                <motion.div animate={{ width: `${readinessScore}%` }} className="h-full bg-civic-navy" />
            </div>
            <p className="text-[8px] text-gray-400 font-bold uppercase mt-3 tracking-tighter relative z-10">Sovereign Compliance Index</p>
            <Award className="absolute -bottom-4 -right-4 w-16 h-16 text-civic-navy/5 group-hover:scale-110 transition-transform" />
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
      <div className="flex-1 overflow-y-auto pr-4 custom-scrollbar h-full space-y-8">
        
        {/* Sovereign Alert Ticker */}
        <div className="bg-civic-navy text-white px-8 py-3 rounded-2xl flex items-center gap-6 overflow-hidden relative">
            <div className="flex items-center gap-2 shrink-0 bg-civic-saffron text-civic-navy px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest z-10">
                <Zap className="w-3 h-3" /> Live
            </div>
            <motion.div 
                animate={{ x: ["100%", "-100%"] }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                className="whitespace-nowrap text-[10px] font-bold uppercase tracking-widest opacity-80"
            >
                SIR 2026: House-to-House Mapping is active in Karnataka Sectors. // Form 12D Home Voting requests open for Senior Citizens. // Aadhaar-EPIC linking is mandatory for data integrity.
            </motion.div>
        </div>

        <AnimatePresence mode="wait">
          {activeTab === 'overview' ? (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 xl:grid-cols-2 gap-8 pb-10"
            >
              {/* Header Info */}
              <div className="xl:col-span-2 flex justify-between items-center mb-4">
                <div className="flex items-center gap-6">
                    <div className="w-16 h-16 bg-civic-navy rounded-3xl flex items-center justify-center text-white shadow-2xl">
                        <User className="w-8 h-8" />
                    </div>
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <h2 className="text-[10px] font-bold text-civic-saffron uppercase tracking-[0.3em]">{t('active_profile')}</h2>
                        </div>
                        <h1 className="text-4xl font-display font-bold text-civic-navy leading-none">
                            {persona ? t(`persona_${persona.toLowerCase()}`) : ''} {t('dashboard')}
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

                    <button 
                        onClick={() => setShowReportModal(true)}
                        className="px-6 py-4 bg-white/60 rounded-3xl border border-white shadow-sm flex items-center gap-4 hover:bg-civic-navy hover:text-white transition-all group"
                    >
                        <FileText className="w-5 h-5 text-civic-navy group-hover:text-white" />
                        <div className="text-left">
                            <div className="text-[9px] font-black opacity-40 uppercase tracking-widest">Intel Report</div>
                            <div className="text-xs font-bold">SIR 2026 Status</div>
                        </div>
                    </button>
                </div>
              </div>
              
              {/* Personal Voting Journey Checklist - NEW FEATURE */}
              <div className="xl:col-span-2 bg-white/60 backdrop-blur-xl rounded-[3.5rem] p-10 border border-white/50 shadow-sm relative overflow-hidden group">
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

              {/* Sovereign Timeline Feature */}
              <div className="xl:col-span-2 bg-white/40 backdrop-blur-xl rounded-[3.5rem] p-12 border border-white/50 shadow-sm overflow-hidden relative group">
                  <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none group-hover:scale-110 transition-transform duration-700">
                      <Calendar className="w-48 h-48 text-civic-navy" />
                  </div>
                  <div className="flex items-center gap-3 mb-12">
                      <div className="w-12 h-12 bg-civic-navy rounded-2xl flex items-center justify-center shadow-xl shadow-civic-navy/10">
                          <Library className="w-6 h-6 text-civic-saffron" />
                      </div>
                      <h3 className="text-2xl font-display font-bold text-civic-navy">Sovereign Journey Timeline</h3>
                  </div>
                  
                  <div className="relative flex flex-col md:flex-row justify-between gap-8 px-4">
                      <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-100 -z-0 hidden md:block" />
                      {[
                        { date: 'Oct 2025', event: 'SIR Cycle Start', status: 'Passed', icon: Zap, details: "Special Intensive Revision began. Your sector (PC 25) mapping is finalized." },
                        { date: 'Feb 2026', event: 'Draft Roll Sync', status: 'Current', icon: Search, details: "The Draft Roll is now live. Verify your entry to avoid exclusion during the de-duplication phase." },
                        { date: 'Mar 2026', event: 'Final Publication', status: 'Upcoming', icon: ShieldCheck, details: "Final Sovereign Roll will be published. This is the last version before General Elections." },
                        { date: 'May 2026', event: 'General Elections', status: 'Goal', icon: Flame, details: "E-Day. Your polling station BBMP School is ready for Sovereign turnout." }
                      ].map((t, i) => (
                        <button 
                            key={i} 
                            onClick={() => {
                                setChatMessages(prev => [...prev, { role: 'ai', text: `Milestone Intel: ${t.event} (${t.date}). ${t.details}` }]);
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

              {/* Polling Booth Locator (Real Map) */}
              <div className="xl:col-span-2">
                <PollingBoothLocator />
              </div>

              {/* Top 50 Feature: Heatmap & Future Voter Tool */}
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 xl:col-span-2">
                  <ConstituencyHeatmap />
                  <FutureVoterTool />
              </div>

              {/* Sovereign Voter Card */}
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
                            <div className="w-24 h-24 bg-white/10 backdrop-blur-xl rounded-[2rem] border border-white/20 p-2 relative">
                                <img 
                                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200" 
                                    className="w-full h-full object-cover rounded-[1.5rem] grayscale group-hover:grayscale-0 transition-all duration-700" 
                                    alt="Voter"
                                />
                                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-civic-green rounded-full flex items-center justify-center border-4 border-civic-navy">
                                    <CheckCircle className="w-4 h-4 text-white" />
                                </div>
                            </div>
                            <div>
                                <div className="flex items-center gap-3 mb-2">
                                    <span className="px-3 py-1 bg-civic-saffron text-civic-navy text-[8px] font-black uppercase tracking-[0.2em] rounded-full">Sovereign Identity</span>
                                    <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">EPIC: BEL-2026-0420</span>
                                </div>
                                <h3 className="text-3xl font-display font-bold uppercase tracking-tight">Sarvesh Arunkumar</h3>
                                <div className="flex items-center gap-4 mt-2">
                                    <div className="text-[10px] font-medium text-white/60">PC: Bengaluru Central</div>
                                    <div className="w-1 h-1 bg-white/20 rounded-full" />
                                    <div className="text-[10px] font-medium text-white/60">Qualifying: 01-01-2026</div>
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <button className="px-8 py-4 bg-white/10 hover:bg-white/20 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all">Download EPIC</button>
                            <button className="px-8 py-4 bg-civic-saffron text-civic-navy font-black rounded-2xl text-[10px] uppercase tracking-widest shadow-xl shadow-civic-saffron/20 hover:scale-105 active:scale-95 transition-all">Verify Status</button>
                        </div>
                    </div>
                </motion.div>
              )}

              {/* Form Assistant Card */}
              <motion.div 
                whileHover={{ y: -8 }}
                onClick={() => setActiveFlow('registration')}
                className="bg-white/70 backdrop-blur-2xl rounded-[3.5rem] p-12 border border-white/50 shadow-sm flex flex-col group relative overflow-hidden cursor-pointer"
              >
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
              </motion.div>

              {/* AI Validator Molecule */}
              <motion.div 
                whileHover={{ y: -8 }}
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
                  <span className="px-4 py-2 bg-civic-navy/5 rounded-full text-[9px] font-black text-civic-navy uppercase tracking-widest">Sovereign AI v2.4</span>
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
              </motion.div>

              {/* Ink & Voice Social Pulse */}
              <div className="xl:col-span-2 bg-civic-saffron/5 border border-civic-saffron/20 rounded-[3.5rem] p-12 overflow-hidden relative group">
                  <div className="flex justify-between items-center relative z-10">
                      <div>
                          <div className="flex items-center gap-3 mb-4">
                              <Flame className="w-6 h-6 text-civic-saffron" />
                              <h3 className="text-2xl font-display font-bold text-civic-navy">Bengaluru Sector Pulse</h3>
                          </div>
                          <p className="text-sm text-gray-500 max-w-lg leading-relaxed">
                              Live community engagement metrics for PC 25. Over **12,400** citizens have verified their SIR 2026 status this week.
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
                    className="w-full py-6 bg-civic-navy text-white font-bold rounded-[2rem] shadow-2xl shadow-civic-navy/30 flex items-center justify-center gap-3 active:scale-95 transition-all group/btn"
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
                  <span className="px-4 py-2 bg-civic-navy/5 rounded-full text-[9px] font-black text-civic-navy uppercase tracking-widest">Sovereign AI v2.4</span>
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
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-10"
            >
              <header className="flex justify-between items-end">
                <div>
                  <h2 className="text-4xl font-display font-bold text-civic-navy mb-2">Civic Intelligence Hub</h2>
                  <p className="text-gray-500 font-medium">Verify legislative protocols and electoral data integrity.</p>
                </div>
                <button 
                  onClick={() => setShowReportModal(true)} 
                  className="px-8 py-4 bg-civic-navy text-white font-bold rounded-2xl shadow-xl shadow-civic-navy/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-3"
                >
                  <BookOpen className="w-5 h-5" /> Open Research Vault
                </button>
              </header>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {[
                      { title: 'SIR 2026 Revision', desc: 'House-to-house mapping protocol & data verification.', icon: UserCheck, color: 'text-blue-500', bg: 'bg-blue-50' },
                      { title: 'Constitutional Rights', desc: 'Articles 324-329 and the Right to Vote framework.', icon: ShieldCheck, color: 'text-orange-500', bg: 'bg-orange-50' },
                      { title: 'Legal Forms Base', desc: 'Deep linking to official ECI Form 6, 7, and 8 portals.', icon: FileEdit, color: 'text-civic-green', bg: 'bg-green-50' },
                  ].map((item, i) => (
                      <div key={i} className="p-8 bg-white border border-gray-100 rounded-[2.5rem] shadow-sm hover:shadow-xl transition-all group">
                          <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform", item.bg, item.color)}>
                              <item.icon className="w-7 h-7" />
                          </div>
                          <h3 className="text-xl font-bold text-civic-navy mb-3">{item.title}</h3>
                          <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                      </div>
                  ))}
              </div>

              <div className="p-10 bg-gradient-to-br from-civic-navy to-blue-900 rounded-[3rem] text-white relative overflow-hidden">
                  <Globe className="absolute -bottom-20 -right-20 w-80 h-80 opacity-10" />
                  <div className="relative z-10 max-w-xl">
                      <h3 className="text-2xl font-display font-bold mb-4 text-civic-saffron">Sovereign Data Federation</h3>
                      <p className="text-white/60 text-sm leading-relaxed mb-8">
                          The VoterFlow research engine pulls directly from ECI open-data simulations. Every guideline here is verified against the 2026 Electoral Code.
                      </p>
                      <div className="flex gap-4">
                          <div className="px-4 py-2 bg-white/10 rounded-xl border border-white/10 text-[10px] font-bold uppercase tracking-widest">Legislative Mode</div>
                          <div className="px-4 py-2 bg-white/10 rounded-xl border border-white/10 text-[10px] font-bold uppercase tracking-widest">Verified 2026</div>
                      </div>
                  </div>
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
                      <div className="text-xs font-bold opacity-60">Sovereign Voter Hotline</div>
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
                          <p className="text-sm text-white/60">Ensure your record is synchronized with the 2026 Karnataka Sovereign Roll.</p>
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
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1">Sovereign Data Integrity Platform</p>
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
                    <a href="https://voters.eci.gov.in/" target="_blank" className="text-civic-navy underline ml-2">Sovereign Portal</a>
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
                <PollingSimulator />
             </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* AI Validator Overlay */}
      <AnimatePresence>
        {showAiValidator && (
            <div className="fixed inset-0 z-[4000] flex items-center justify-center p-6 bg-civic-navy/60 backdrop-blur-3xl">
                <motion.div 
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    className="bg-white w-full max-w-lg rounded-[3rem] p-12 shadow-2xl relative overflow-hidden"
                >
                    <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-pulse" />
                    <button onClick={() => setShowAiValidator(false)} className="absolute top-8 right-8 p-3 bg-gray-50 rounded-full hover:bg-red-50 transition-all"><X className="w-5 h-5" /></button>
                    
                    <div className="text-center mb-10">
                        <div className="w-20 h-20 bg-civic-navy rounded-[2rem] flex items-center justify-center mx-auto mb-6 shadow-xl">
                            <Cpu className="text-civic-saffron w-10 h-10 animate-pulse" />
                        </div>
                        <h3 className="text-2xl font-display font-bold text-civic-navy">Sovereign AI Validator</h3>
                        <p className="text-sm text-gray-500 mt-2 font-medium">ECI Standard Compliance Analysis v2.4</p>
                    </div>

                    <div className="space-y-4 mb-10">
                        {[
                            { label: 'Aadhaar Optical Analysis', status: 'Compliant', score: 98 },
                            { label: 'Biometric Parity Match', status: 'Compliant', score: 94 },
                            { label: 'Residency Verification', status: 'Pending', score: 0 }
                        ].map(item => (
                            <div key={item.label} className="p-5 bg-gray-50 rounded-2xl border border-gray-100 flex justify-between items-center">
                                <div>
                                    <div className="text-xs font-bold text-civic-navy">{item.label}</div>
                                    <div className="text-[10px] text-gray-400 font-bold uppercase mt-1 tracking-tighter">Gemini Intel Core</div>
                                </div>
                                <div className="text-right">
                                    <div className={cn("text-[10px] font-black uppercase", item.status === 'Compliant' ? "text-civic-green" : "text-civic-saffron")}>{item.status}</div>
                                    <div className="text-xs font-bold text-civic-navy">{item.score}% Match</div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <button 
                        onClick={() => {
                            addReadiness(10);
                            setShowAiValidator(false);
                        }}
                        className="w-full py-5 bg-civic-navy text-white font-black rounded-2xl text-xs uppercase tracking-widest shadow-xl hover:scale-[1.02] active:scale-95 transition-all"
                    >
                        Synchronize Results
                    </button>
                </motion.div>
            </div>
        )}
      </AnimatePresence>

      {/* Sovereign Intel Report Modal */}
      <AnimatePresence>
          {showReportModal && (
              <div className="fixed inset-0 z-[5000] flex items-center justify-center p-6 bg-civic-navy/80 backdrop-blur-3xl">
                  <motion.div 
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    className="bg-white w-full max-w-4xl rounded-[4rem] overflow-hidden shadow-2xl flex flex-col h-[80vh]"
                  >
                      <div className="p-12 bg-civic-navy text-white flex justify-between items-center">
                          <div className="flex items-center gap-6">
                              <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center border border-white/20">
                                  <FileText className="w-8 h-8 text-civic-saffron" />
                              </div>
                              <div>
                                  <h3 className="text-3xl font-display font-bold">Sovereign Intelligence Report</h3>
                                  <p className="text-[10px] font-black text-white/40 uppercase tracking-[0.3em]">PC 25: Bengaluru Central // SIR 2026</p>
                              </div>
                          </div>
                          <button onClick={() => setShowReportModal(false)} className="p-4 bg-white/10 rounded-full hover:bg-white/20 transition-all"><X className="w-6 h-6" /></button>
                      </div>
                      
                      <div className="flex-1 overflow-y-auto p-16 space-y-12 bg-gray-50/50 custom-scrollbar">
                          <section>
                              <h4 className="text-xs font-black text-civic-navy uppercase tracking-widest mb-6 border-b border-gray-200 pb-2">Executive Summary</h4>
                              <p className="text-gray-600 leading-relaxed font-medium">
                                  This report synthesizes real-time electoral mapping data for the Bengaluru Central sector. As of Feb 2026, the constituency demonstrates an **89.2%** synchronization rate with the National Voter Service Portal. Current focus areas include the mitigation of double-entries and the facilitation of student residency declarations (Annexure-II).
                              </p>
                          </section>
                          
                          <div className="grid grid-cols-2 gap-8">
                              <div className="p-8 bg-white rounded-3xl border border-gray-100 shadow-sm">
                                  <div className="flex items-center gap-3 mb-6">
                                      <Target className="w-5 h-5 text-civic-navy" />
                                      <h5 className="font-bold text-civic-navy text-sm uppercase">Sector Readiness</h5>
                                  </div>
                                  <div className="space-y-4">
                                      {['Shanti Nagar', 'Shivaji Nagar', 'CV Raman Nagar'].map(s => (
                                          <div key={s} className="space-y-1">
                                              <div className="flex justify-between text-[10px] font-bold">
                                                  <span>{s}</span>
                                                  <span className="text-civic-green">Optimal</span>
                                              </div>
                                              <div className="h-1 w-full bg-gray-100 rounded-full overflow-hidden">
                                                  <div className="h-full bg-civic-green w-[90%]" />
                                              </div>
                                          </div>
                                      ))}
                                  </div>
                              </div>
                              <div className="p-8 bg-white rounded-3xl border border-gray-100 shadow-sm">
                                  <div className="flex items-center gap-3 mb-6">
                                      <ShieldCheck className="w-5 h-5 text-civic-navy" />
                                      <h5 className="font-bold text-civic-navy text-sm uppercase">Legislative Parity</h5>
                                  </div>
                                  <ul className="space-y-3">
                                      <li className="flex items-center gap-2 text-xs text-gray-500 font-medium">
                                          <div className="w-1.5 h-1.5 bg-civic-navy rounded-full" />
                                          Aadhaar-EPIC parity achieved for 94.2% of PC 25.
                                      </li>
                                      <li className="flex items-center gap-2 text-xs text-gray-500 font-medium">
                                          <div className="w-1.5 h-1.5 bg-civic-navy rounded-full" />
                                          Form 12D requests finalized for Senior Citizens.
                                      </li>
                                      <li className="flex items-center gap-2 text-xs text-gray-500 font-medium">
                                          <div className="w-1.5 h-1.5 bg-civic-navy rounded-full" />
                                          SIR Cycle 2026 Audit: No ghost entries detected in Karnataka.
                                      </li>
                                  </ul>
                              </div>
                          </div>
                      </div>
                      
                      <div className="p-12 border-t border-gray-100 bg-white flex justify-end gap-4">
                          <button className="px-10 py-5 bg-gray-100 text-civic-navy font-black rounded-2xl text-xs uppercase tracking-widest flex items-center gap-3">
                              <Download className="w-5 h-5" /> Export PDF
                          </button>
                          <button onClick={() => setShowReportModal(false)} className="px-10 py-5 bg-civic-navy text-white font-black rounded-2xl text-xs uppercase tracking-widest flex items-center gap-3">
                              Synchronize with Dashboard
                          </button>
                      </div>
                  </motion.div>
              </div>
          )}
      </AnimatePresence>

      {/* Floating Chat Assistant */}
      <div className="fixed bottom-12 right-12 z-[3000] flex flex-col items-end gap-6">
        <AnimatePresence>
          {isChatOpen && (
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.8, transformOrigin: 'bottom right' }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 40, scale: 0.8 }}
              className="w-[400px] h-[650px] bg-white rounded-[3.5rem] shadow-[0_50px_150px_rgba(0,0,0,0.3)] border border-gray-100 flex flex-col overflow-hidden mb-4"
            >
              <div className="bg-civic-navy p-8 flex justify-between items-center text-white relative">
                <div className="absolute top-0 left-0 w-full h-1 bg-civic-saffron opacity-50" />
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-md border border-white/20">
                    <Sparkles className="w-6 h-6 text-civic-saffron" />
                  </div>
                  <div>
                    <span className="font-bold text-lg block leading-none">Sovereign Intel</span>
                    <span className="text-[8px] font-black text-civic-saffron uppercase tracking-[0.2em] mt-1 block">Karnataka ECI Federation</span>
                  </div>
                </div>
                <button onClick={() => setIsChatOpen(false)} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                  <X className="w-6 h-6 text-white/40" />
                </button>
              </div>

              <div className="flex-1 p-8 overflow-y-auto space-y-6 bg-gray-50/30 custom-scrollbar">
                <div className="bg-white p-6 rounded-[2rem] rounded-tl-none text-[13px] text-gray-600 shadow-sm border border-gray-100 leading-relaxed font-medium">
                  Namaste! I'm your **Sovereign Intel Coach**. I've analyzed your sector (PC 25) and am ready to assist with your SIR 2026 navigation.
                </div>
                {chatMessages.map((m, i) => (
                  <div key={i} className="space-y-3">
                    <div 
                      className={cn(
                          "p-6 rounded-[2rem] text-[13px] leading-relaxed font-medium shadow-sm transition-all", 
                          m.role === 'user' 
                          ? "bg-civic-navy text-white self-end ml-auto rounded-tr-none shadow-xl shadow-civic-navy/10" 
                          : "bg-white text-gray-600 rounded-tl-none border border-gray-100"
                      )}
                    >
                      {m.text}
                      
                      {m.sources && (
                          <div className="mt-4 pt-4 border-t border-gray-100 space-y-2">
                              <div className="flex items-center gap-2 text-[8px] font-black text-gray-400 uppercase">
                                  <BookOpen className="w-3 h-3" /> ECI Federation Sources
                              </div>
                              <div className="flex flex-wrap gap-1.5">
                                  {m.sources.map(s => (
                                      <span key={s} className="px-2 py-0.5 bg-gray-50 rounded text-[7px] font-bold text-civic-navy border border-gray-100">{s}</span>
                                  ))}
                              </div>
                          </div>
                      )}
                    </div>
                  </div>
                ))}
                {isDeepSearching && (
                    <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex flex-col gap-3 p-6 bg-white rounded-[2rem] border border-gray-100 shadow-sm"
                    >
                        <div className="flex items-center gap-3">
                            <Loader2 className="w-4 h-4 text-civic-navy animate-spin" />
                            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Querying Sovereign Archives...</span>
                        </div>
                        <div className="h-1 w-full bg-gray-100 rounded-full overflow-hidden">
                            <motion.div initial={{ width: 0 }} animate={{ width: '100%' }} transition={{ duration: 3.5 }} className="h-full bg-civic-saffron" />
                        </div>
                    </motion.div>
                )}
                <div ref={chatEndRef} />
              </div>

              <div className="p-8 bg-white border-t border-gray-100 space-y-6">
                <div className="flex flex-wrap gap-2">
                  {[
                      'Form 6 Guide', 
                      'SIR 2026', 
                      'PC 01 Metrics'
                  ].map(p => (
                    <button 
                      key={p} 
                      onClick={() => handleChat(p)}
                      className="px-3 py-1.5 bg-gray-50 hover:bg-civic-navy hover:text-white text-[9px] font-black text-civic-navy rounded-xl transition-all uppercase tracking-widest border border-gray-100"
                    >
                      {p}
                    </button>
                  ))}
                  <button 
                    onClick={() => handleChat("Deep Search", true)}
                    className="px-3 py-1.5 bg-civic-saffron text-civic-navy text-[9px] font-black rounded-xl transition-all uppercase tracking-widest flex items-center gap-2"
                  >
                    <Search className="w-3 h-3" /> Deep Search
                  </button>
                </div>
                <div className="flex gap-2">
                  <input 
                    value={userInput}
                    onChange={e => setUserInput(e.target.value)}
                    onKeyPress={e => e.key === 'Enter' && handleChat()}
                    placeholder="Ask about your sovereign rights..."
                    className="flex-1 px-6 py-4 bg-gray-50 border border-gray-100 rounded-[1.5rem] text-sm font-medium focus:outline-none focus:ring-2 focus:ring-civic-navy focus:bg-white transition-all"
                  />
                  <button 
                    onClick={() => handleChat()} 
                    disabled={isStreaming} 
                    className="p-4 bg-civic-navy text-white rounded-[1.5rem] shadow-xl shadow-civic-navy/20 hover:scale-105 active:scale-95 transition-all"
                  >
                    <Send className="w-6 h-6" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showChatTooltip && !isChatOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.9 }}
              className="bg-civic-navy text-white px-6 py-3 rounded-2xl shadow-2xl relative mb-2 mr-2"
            >
              <div className="text-[10px] font-bold whitespace-nowrap">Have any issues? I'm here to assist you</div>
              <div className="absolute -bottom-1 right-8 w-2 h-2 bg-civic-navy rotate-45" />
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          whileHover={{ scale: 1.1, rotate: 5 }}
          whileTap={{ scale: 0.9, rotate: -5 }}
          onClick={() => {
            setIsChatOpen(!isChatOpen);
            setShowChatTooltip(false);
          }}
          className={cn(
            "w-20 h-20 rounded-[2.5rem] shadow-[0_30px_60px_rgba(0,0,0,0.35)] flex items-center justify-center transition-all duration-500",
            isChatOpen ? "bg-white text-civic-navy border-4 border-civic-navy" : "bg-civic-navy text-white"
          )}
        >
          {isChatOpen ? <X className="w-8 h-8" /> : <MessageCircle className="w-8 h-8" />}
        </motion.button>
      </div>
    </div>
  );
};
