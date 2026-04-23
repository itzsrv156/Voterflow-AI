import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useVoterStore } from '../../store/useVoterStore';
import { useTranslation } from '../../LanguageContext';
import { PollingSimulator } from './PollingSimulator';
import { PollingBoothLocator } from './PollingBoothLocator';
import { createVoterCoach } from '../../services/gemini';
import { 
  Zap, MessageCircle, X, 
  Send, CheckCircle, Gavel, 
  Calendar, LayoutDashboard, UserPlus, Search, Library, 
  ChevronLeft, ChevronRight, Headphones, Radio, ArrowRight, User,
  PhoneCall, ShieldCheck, MapPin, ExternalLink, Info,
  AlertTriangle, BookOpen, UserCheck, Target, Award,
  Flame, Fingerprint, Cpu, Globe
} from 'lucide-react';
import { cn } from '../../lib/utils';

export const Dashboard = () => {
  const { 
    persona, progress, resetStore, language, activeTab, 
    setActiveTab, setLanguage, setActiveFlow, readinessScore, addReadiness 
  } = useVoterStore();
  const { t } = useTranslation();
  
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<{ role: 'user' | 'ai'; text: string }[]>([]);
  const [userInput, setUserInput] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const [showAiValidator, setShowAiValidator] = useState(false);
  const [isDeepSearching, setIsDeepSearching] = useState(false);

  const chatEndRef = useRef<HTMLDivElement>(null);
  const coach = useRef<any>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  const handleChat = (input?: string) => {
    const text = input || userInput;
    if (!text.trim() || isStreaming) return;

    setChatMessages(prev => [...prev, { role: 'user', text }]);
    setUserInput('');
    setIsStreaming(true);
    setChatMessages(prev => [...prev, { role: 'ai', text: '' }]);

    if (!coach.current) coach.current = createVoterCoach(persona);
    
    let fullText = "";
    const pType = persona || 'FirstTime';
    const mockResponse = `As your Sovereign Voter Coach: For SIR 2026, the Special Intensive Revision requires mandatory address verification. ${pType === 'Student' ? 'Day Scholars must provide their permanent native address.' : pType === 'Senior' ? 'You can request Home Voting via Form 12D.' : 'Ensure your Form 6 is submitted before Jan 1st.'} Your Voter Readiness is currently at ${Math.round(readinessScore)}%. Complete the polling simulation to reach 100%!`;
    
    let i = 0;
    const interval = setInterval(() => {
        if (i >= mockResponse.length) {
            clearInterval(interval);
            setIsStreaming(false);
            addReadiness(2);
            return;
        }
        fullText += mockResponse[i];
        setChatMessages(prev => {
            const last = prev[prev.length - 1];
            return [...prev.slice(0, -1), { role: 'ai', text: fullText }];
        });
        i++;
    }, 12);
  };

  const performDeepSearch = () => {
      setIsDeepSearching(true);
      setTimeout(() => {
          setIsDeepSearching(false);
          handleChat("Gemini Deep Search: Found updated ECI circular regarding SIR 2026 Phase 2 mapping.");
      }, 3000);
  };

  const addToGoogleCalendar = () => {
      const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=SIR+2026+Electoral+Revision+Deadline&details=Mandatory+House-to-House+mapping+verification+for+VoterFlow+AI+compliance.&dates=20260105T100000Z/20260105T180000Z`;
      window.open(url, '_blank');
      addReadiness(5);
  };

  const SidebarItem = ({ id, icon: Icon, labelKey }: { id: any, icon: any, labelKey: string }) => (
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
        
        <nav className="space-y-3 flex-1">
          <SidebarItem id="overview" icon={LayoutDashboard} labelKey="overview" />
          <SidebarItem id="form8" icon={Gavel} labelKey="form8" />
          <SidebarItem id="sir2026" icon={Calendar} labelKey="sir2026" />
          <SidebarItem id="helpline" icon={Headphones} labelKey="helpline" />
        </nav>

        {/* Readiness Score Molecule */}
        <div className="mt-8 p-6 bg-white/60 rounded-3xl border border-white relative overflow-hidden group">
            <div className="flex justify-between items-center mb-4 relative z-10">
                <Target className="w-5 h-5 text-civic-navy" />
                <span className="text-[10px] font-black text-civic-navy uppercase tracking-widest">{Math.round(readinessScore)}% Ready</span>
            </div>
            <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden relative z-10">
                <motion.div animate={{ width: `${readinessScore}%` }} className="h-full bg-civic-navy" />
            </div>
            <p className="text-[8px] text-gray-400 font-bold uppercase mt-3 tracking-tighter relative z-10">Voter Readiness Score</p>
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
                SIR 2026: House-to-House Mapping is active in your sector. // Form 12D Home Voting requests open for Phase 1. // Aadhaar-EPIC linking is mandatory for data integrity.
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
                
                <div className="flex gap-4">
                    {/* Constituency Intelligence Molecule */}
                    <div className="px-6 py-4 bg-white/60 rounded-3xl border border-white shadow-sm flex items-center gap-4">
                        <div className="w-10 h-10 bg-civic-navy/5 rounded-xl flex items-center justify-center">
                            <MapPin className="text-civic-navy w-5 h-5" />
                        </div>
                        <div>
                            <div className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Your Constituency</div>
                            <div className="text-xs font-bold text-civic-navy">Bangalore Central (PC 25)</div>
                        </div>
                    </div>

                    <button 
                        onClick={addToGoogleCalendar}
                        className="px-6 py-4 bg-white/60 rounded-3xl border border-white shadow-sm flex items-center gap-4 hover:bg-civic-navy hover:text-white transition-all group"
                    >
                        <Calendar className="w-5 h-5 text-civic-navy group-hover:text-white" />
                        <div className="text-left">
                            <div className="text-[9px] font-black opacity-40 uppercase tracking-widest">Sync Deadlines</div>
                            <div className="text-xs font-bold">Google Calendar</div>
                        </div>
                    </button>
                </div>
              </div>

              {/* Voter Process Guide */}
              <div className="xl:col-span-2 bg-white/40 backdrop-blur-xl rounded-[3.5rem] p-12 border border-white/50 shadow-sm">
                  <div className="flex items-center gap-3 mb-10">
                      <Fingerprint className="w-7 h-7 text-civic-navy" />
                      <h3 className="text-2xl font-display font-bold text-civic-navy">Sovereign Voting Protocol 1-2-3-4</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
                      <div className="absolute top-1/2 left-0 w-full h-px bg-gray-200 -z-0 hidden md:block" />
                      {[
                        { step: 1, label: 'Enrolment', status: progress.registration === 100 ? 'Complete' : 'Active' },
                        { step: 2, label: 'Verification', status: progress.registration === 100 ? 'Active' : 'Pending' },
                        { step: 3, label: 'Polling Day', status: progress.polling === 100 ? 'Complete' : 'Ready' },
                        { step: 4, label: 'Ink & Voice', status: progress.polling === 100 ? 'Sovereign' : 'Goal' }
                      ].map(s => (
                        <div key={s.step} className="flex flex-col items-center text-center relative z-10">
                            <div className={cn(
                                "w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-lg mb-4 transition-all duration-700",
                                s.status === 'Complete' || s.status === 'Sovereign' ? "bg-civic-green text-white rotate-[360deg]" : 
                                s.status === 'Active' ? "bg-civic-navy text-white scale-110 shadow-xl shadow-civic-navy/20" : "bg-white text-gray-300 border border-gray-100"
                            )}>
                                {s.status === 'Complete' ? <CheckCircle className="w-6 h-6" /> : s.step}
                            </div>
                            <span className="text-xs font-bold text-civic-navy">{s.label}</span>
                            <span className={cn("text-[8px] font-black uppercase mt-1 tracking-widest", s.status === 'Active' ? "text-civic-saffron" : "text-gray-300")}>{s.status}</span>
                        </div>
                      ))}
                  </div>
              </div>

              {/* Polling Booth Locator (Google Maps Integration) */}
              <div className="xl:col-span-2">
                <PollingBoothLocator />
              </div>

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
                      Access the sovereign Digital Form engine with persona-specific branching logic.
                    </p>
                </div>
                <div className="mt-auto relative z-10">
                   <div className="flex justify-between text-[9px] font-bold text-gray-400 mb-3 uppercase tracking-[0.2em]">Sovereign Progress</div>
                  <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden mb-8">
                    <motion.div animate={{ width: `${progress.registration}%` }} className="h-full bg-civic-navy" />
                  </div>
                  <button className="w-full py-6 bg-civic-navy text-white font-bold rounded-[2rem] shadow-2xl shadow-civic-navy/30 flex items-center justify-center gap-3 active:scale-95 transition-all group/btn">
                    Launch Digital Wizard <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
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
                  <span className="px-4 py-2 bg-civic-navy/5 rounded-full text-[9px] font-black text-civic-navy uppercase tracking-widest">Gemini Engine v2</span>
                </div>
                <div className="relative z-10">
                    <h3 className="text-3xl font-bold text-civic-navy mb-4">AI Verification</h3>
                    <p className="text-sm text-gray-500 mb-10 leading-relaxed max-w-sm">
                      Leverage Google Gemini Intelligence to pre-verify your documents against ECI standards.
                    </p>
                </div>
                <div className="mt-auto relative z-10">
                    <div className="flex items-center gap-3 text-civic-navy font-bold text-[11px] uppercase tracking-[0.2em]">
                        Check Sovereign Score <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                    </div>
                </div>
              </motion.div>
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
               <p className="text-gray-500 max-w-md text-lg font-medium mb-12">Connect with electoral officers for real-time verification and support.</p>
               
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-3xl">
                  <div className="p-8 bg-white rounded-[2.5rem] border border-gray-100 shadow-sm flex flex-col items-center gap-4 group hover:bg-civic-navy hover:text-white transition-all">
                      <div className="text-[10px] font-black uppercase tracking-widest opacity-40">Toll Free</div>
                      <div className="text-4xl font-display font-bold">1950</div>
                      <div className="text-xs font-bold opacity-60">National Voter Support</div>
                      <a href="tel:1950" className="mt-4 px-6 py-3 bg-civic-saffron text-civic-navy rounded-xl text-[10px] font-black uppercase tracking-widest group-hover:bg-white transition-all">Call Now</a>
                  </div>
                  <div className="p-8 bg-white rounded-[2.5rem] border border-gray-100 shadow-sm flex flex-col items-center gap-4 group hover:bg-civic-navy hover:text-white transition-all">
                      <div className="text-[10px] font-black uppercase tracking-widest opacity-40">BLO Support</div>
                      <div className="text-2xl font-display font-bold">Search Local BLO</div>
                      <div className="text-xs font-bold opacity-60">Booth Level Officer mapping</div>
                      <a href="https://voters.eci.gov.in/login" target="_blank" className="mt-4 px-6 py-3 bg-civic-navy text-white rounded-xl text-[10px] font-black uppercase tracking-widest group-hover:bg-civic-saffron group-hover:text-civic-navy transition-all border border-civic-navy/10">Find My BLO</a>
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
                      <h2 className="text-3xl font-display font-bold text-civic-navy">SIR 2026 (Special Intensive Revision)</h2>
                      <p className="text-[10px] font-black text-civic-saffron uppercase tracking-widest mt-1">On-Going Cycle: Oct 2025 - Feb 2026</p>
                  </div>
               </div>
               
               <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full mb-12">
                  {[
                    { label: 'House-to-House Mapping', status: 'Active', progress: 85, icon: MapPin },
                    { label: 'Biometric Verification', status: 'On-Going', progress: 42, icon: UserCheck },
                    { label: 'EPIC Generation', status: 'Upcoming', progress: 0, icon: ShieldCheck }
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
                        <span className="text-[9px] font-bold text-gray-400 mt-2 block">{item.progress}% Synchronized</span>
                    </div>
                  ))}
               </div>

               <div className="p-10 bg-civic-navy rounded-[3rem] text-white w-full flex items-center justify-between">
                  <div className="flex items-center gap-6">
                      <AlertTriangle className="w-10 h-10 text-civic-saffron" />
                      <div>
                          <h4 className="text-xl font-bold mb-1">Verify Your Entry Today</h4>
                          <p className="text-sm text-white/60">Ghost entries are being purged. Ensure your name is in the SIR 2026 draft roll.</p>
                      </div>
                  </div>
                  <button className="px-8 py-4 bg-white text-civic-navy font-black rounded-xl text-[10px] uppercase tracking-widest hover:bg-civic-saffron transition-all">Check Draft Roll</button>
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
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1">Sovereign Data Integrity Tool</p>
                  </div>
               </div>
               
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full mb-12">
                  {[
                    { title: 'Update Photograph', desc: 'Replace your current EPIC photo with a high-resolution 2026 standard image.', time: '2 mins' },
                    { title: 'Address Correction', desc: 'Shifted your residence? Update your constituency mapping instantly.', time: '5 mins' },
                    { title: 'Name/DOB Correction', desc: 'Fix clerical errors in your legal voter record with Aadhaar linking.', time: '3 mins' },
                    { title: 'EPIC Replacement', desc: 'Request a fresh PVC Voter ID card if yours is lost or damaged.', time: '1 min' }
                  ].map((item, i) => (
                    <motion.button 
                      key={i} 
                      whileHover={{ scale: 1.02 }} 
                      whileTap={{ scale: 0.98 }}
                      className="p-8 bg-white rounded-[2.5rem] border border-gray-100 shadow-sm text-left flex flex-col gap-4 group hover:border-civic-navy transition-all"
                    >
                        <div className="flex justify-between items-center">
                            <h4 className="font-bold text-civic-navy text-lg">{item.title}</h4>
                            <span className="text-[9px] font-black bg-gray-50 px-2 py-1 rounded text-gray-400 uppercase group-hover:bg-civic-navy group-hover:text-white transition-all">{item.time}</span>
                        </div>
                        <p className="text-xs text-gray-500 leading-relaxed font-medium">{item.desc}</p>
                        <div className="mt-2 flex items-center gap-2 text-civic-navy font-bold text-[10px] uppercase tracking-widest">
                            Start Correction <ChevronRight className="w-4 h-4" />
                        </div>
                    </motion.button>
                  ))}
               </div>

               <div className="w-full p-8 bg-gray-50 rounded-[2.5rem] border border-dashed border-gray-200 flex items-center gap-6">
                  <Info className="w-8 h-8 text-civic-navy opacity-30" />
                  <p className="text-[11px] text-gray-400 font-medium leading-relaxed">
                    Note: Form 8 corrections require digital authentication. Ensure your Aadhaar-linked mobile number is active to receive the verification OTP. 
                    <a href="https://voters.eci.gov.in/" target="_blank" className="text-civic-navy underline ml-2">Official Portal</a>
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
                        <div className="w-20 h-20 bg-civic-navy rounded-[2rem] flex items-center justify-center mx-auto mb-6 shadow-xl shadow-civic-navy/20">
                            <Cpu className="text-civic-saffron w-10 h-10 animate-pulse" />
                        </div>
                        <h3 className="text-2xl font-display font-bold text-civic-navy">Gemini AI Validator</h3>
                        <p className="text-sm text-gray-500 mt-2 font-medium">ECI Standard Compliance Check v2.1</p>
                    </div>

                    <div className="space-y-4 mb-10">
                        {[
                            { label: 'Aadhaar Optical Recognition', status: 'Passed', score: 98 },
                            { label: 'Biometric Face Match', status: 'Passed', score: 94 },
                            { label: 'Annexure-II Semantic Check', status: 'Pending', score: 0 }
                        ].map(item => (
                            <div key={item.label} className="p-5 bg-gray-50 rounded-2xl border border-gray-100 flex justify-between items-center">
                                <div>
                                    <div className="text-xs font-bold text-civic-navy">{item.label}</div>
                                    <div className="text-[10px] text-gray-400 font-bold uppercase mt-1 tracking-tighter">Gemini Logic Analyzer</div>
                                </div>
                                <div className="text-right">
                                    <div className={cn("text-[10px] font-black uppercase", item.status === 'Passed' ? "text-civic-green" : "text-civic-saffron")}>{item.status}</div>
                                    <div className="text-xs font-bold text-civic-navy">{item.score}%</div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <button 
                        onClick={() => setShowAiValidator(false)}
                        className="w-full py-5 bg-civic-navy text-white font-black rounded-2xl text-xs uppercase tracking-widest shadow-xl shadow-civic-navy/20 hover:scale-[1.02] active:scale-95 transition-all"
                    >
                        Sync Results to Profile
                    </button>
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
              className="w-[380px] h-[600px] bg-white rounded-[3rem] shadow-[0_50px_150px_rgba(0,0,0,0.25)] border border-gray-100 flex flex-col overflow-hidden mb-4"
            >
              <div className="bg-civic-navy p-8 flex justify-between items-center text-white relative">
                <div className="absolute top-0 left-0 w-full h-1 bg-civic-saffron opacity-50" />
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center backdrop-blur-md">
                    <Zap className="w-5 h-5 text-civic-saffron" />
                  </div>
                  <div>
                    <span className="font-bold text-base block leading-none">{t('ai_coach')}</span>
                    <span className="text-[8px] font-black text-civic-saffron uppercase tracking-widest mt-1 block">Sovereign Guide</span>
                  </div>
                </div>
                <button onClick={() => setIsChatOpen(false)} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                  <X className="w-5 h-5 text-white/40" />
                </button>
              </div>

              <div className="flex-1 p-8 overflow-y-auto space-y-6 bg-gray-50/30 custom-scrollbar">
                <div className="bg-white p-5 rounded-[1.5rem] rounded-tl-none text-[13px] text-gray-600 shadow-sm border border-gray-100 leading-relaxed font-medium">
                  Namaste! I'm your **VoterFlow AI Coach**. How can I help you explore the 2026 Electoral cycle?
                </div>
                {chatMessages.map((m, i) => (
                  <div 
                    key={i} 
                    className={cn(
                        "p-5 rounded-[1.5rem] text-[13px] leading-relaxed font-medium shadow-sm", 
                        m.role === 'user' 
                        ? "bg-civic-navy text-white self-end ml-auto rounded-tr-none shadow-xl shadow-civic-navy/10" 
                        : "bg-white text-gray-600 rounded-tl-none border border-gray-100"
                    )}
                  >
                    {m.text}
                  </div>
                ))}
                {isDeepSearching && (
                    <div className="flex items-center gap-3 p-5 bg-white rounded-[1.5rem] rounded-tl-none shadow-sm border border-gray-100">
                        <Globe className="w-4 h-4 text-civic-navy animate-spin" />
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Gemini Deep Search active...</span>
                    </div>
                )}
                <div ref={chatEndRef} />
              </div>

              <div className="p-6 bg-white border-t border-gray-100 space-y-4">
                <div className="flex flex-wrap gap-1.5">
                  {[
                      'Form 6 Guide', 
                      'SIR 2026', 
                      'Call 1950'
                  ].map(p => (
                    <button 
                      key={p} 
                      onClick={() => handleChat(p)}
                      className="px-3 py-1.5 bg-gray-50 hover:bg-civic-navy hover:text-white text-[9px] font-black text-civic-navy rounded-lg transition-all uppercase tracking-widest border border-gray-100"
                    >
                      {p}
                    </button>
                  ))}
                  <button 
                    onClick={performDeepSearch}
                    className="px-3 py-1.5 bg-civic-saffron text-civic-navy text-[9px] font-black rounded-lg transition-all uppercase tracking-widest flex items-center gap-2"
                  >
                    <Search className="w-3 h-3" /> Deep Search
                  </button>
                </div>
                <div className="flex gap-2">
                  <input 
                    value={userInput}
                    onChange={e => setUserInput(e.target.value)}
                    onKeyPress={e => e.key === 'Enter' && handleChat()}
                    placeholder={t('ask_query')}
                    className="flex-1 px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-civic-navy transition-all"
                  />
                  <button 
                    onClick={() => handleChat()} 
                    disabled={isStreaming} 
                    className="p-3.5 bg-civic-navy text-white rounded-xl shadow-xl shadow-civic-navy/20 hover:scale-105 active:scale-95 transition-all"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          whileHover={{ scale: 1.1, rotate: 5 }}
          whileTap={{ scale: 0.9, rotate: -5 }}
          onClick={() => setIsChatOpen(!isChatOpen)}
          className={cn(
            "w-20 h-20 rounded-[2rem] shadow-[0_30px_60px_rgba(0,0,0,0.25)] flex items-center justify-center transition-all duration-500",
            isChatOpen ? "bg-white text-civic-navy border-4 border-civic-navy" : "bg-civic-navy text-white"
          )}
        >
          {isChatOpen ? <X className="w-8 h-8" /> : <MessageCircle className="w-8 h-8" />}
        </motion.button>
      </div>

      {/* Privacy Disclaimer - Ultra small font in the corner */}
      <div className="fixed bottom-4 left-8 pointer-events-none opacity-40">
        <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest">
          Sovereign Node: 2026.ECI.v4 // No personal data is stored. Professional Hackathon Demo.
        </p>
      </div>
    </div>
  );
};
