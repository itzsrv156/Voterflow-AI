import { motion } from 'framer-motion';
import { 
  X, Clock, ShieldCheck, AlertCircle, BookOpen, Download,
  ExternalLink, FileEdit, Calendar, UserCheck, Database, Globe, Gavel, Info
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { useEffect, useState } from 'react';

const FORMS_LIBRARY = [
  { id: '6', name: 'Form 6', desc: 'New Registration / Inclusion of Name', link: 'https://voters.eci.gov.in/download-forms?formName=FORM6' },
  { id: '7', name: 'Form 7', desc: 'Objection to Inclusion / Deletion of Name', link: 'https://voters.eci.gov.in/download-forms?formName=FORM7' },
  { id: '8', name: 'Form 8', desc: 'Correction of Entries / Shifted / Duplicate EPIC', link: 'https://voters.eci.gov.in/download-forms?formName=FORM8' },
  { id: '12D', name: 'Form 12D', desc: 'Postal Ballot for Senior Citizens (85+) & PwD', link: 'https://voters.eci.gov.in/download-forms?formName=FORM12D' },
  { id: 'A2', name: 'Annexure-II', desc: 'Student Residence Declaration for Hostel Residents', link: '#' },
];

const ELECTION_TIMELINE = [
  { stage: 'Draft Roll Publication', date: 'Oct 2025', status: 'Completed', icon: FileEdit },
  { stage: 'Special Intensive Revision (SIR)', date: 'Nov - Jan 2026', status: 'On-Going', icon: UserCheck },
  { stage: 'Final Roll Publication', date: 'Feb 5, 2026', status: 'Upcoming', icon: Calendar },
  { stage: 'General Elections 2026', date: 'April - May 2026', status: 'Sovereign Event', icon: Globe },
];

const TICKER_MESSAGES = [
  "URGENT: SIR 2026 (Special Intensive Revision) House-to-House mapping ends in 12 days. Link your Aadhaar now.",
  "NOTICE: New registrations for Future Voters (17+) now open for qualifying date 01-01-2026.",
  "ALERT: Postal Ballot requests for Phase 1 must be submitted via Form 12D by next Friday.",
];

export const ResearchVault = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  const [timeLeft, setTimeLeft] = useState({ days: 45, hours: 12, mins: 30, secs: 15 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => ({
          ...prev,
          secs: prev.secs > 0 ? prev.secs - 1 : 59
      }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[3800] bg-civic-navy/60 backdrop-blur-3xl overflow-y-auto"
    >
      {/* Legal Ticker */}
      <div className="fixed top-0 left-0 right-0 h-10 bg-civic-saffron flex items-center overflow-hidden z-[3810] shadow-lg text-civic-navy">
          <motion.div 
            animate={{ x: ["100%", "-100%"] }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            className="whitespace-nowrap flex gap-20 items-center px-10"
          >
              {TICKER_MESSAGES.map((msg, i) => (
                  <span key={i} className="text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-4">
                      <AlertCircle className="w-4 h-4" /> {msg}
                  </span>
              ))}
          </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-24 min-h-screen">
        <header className="flex justify-between items-start mb-20">
          <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
            <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-md border border-white/20">
                    <Gavel className="w-6 h-6 text-white" />
                </div>
                <span className="text-xs font-black text-civic-saffron uppercase tracking-[0.4em]">Sovereign Intelligence Archive</span>
            </div>
            <h2 className="text-7xl font-display font-bold text-white mb-6 tracking-tight">Research Vault</h2>
            <p className="text-xl text-white/50 max-w-2xl leading-relaxed font-medium">
                Integrated dataset for the 2026 Electoral Cycle. Access verified ECI forms, real-time revision timelines, and legislative guides.
            </p>
          </motion.div>
          
          <button 
            onClick={onClose} 
            className="p-6 bg-white/10 hover:bg-red-500/20 border border-white/10 rounded-full text-white transition-all backdrop-blur-xl group"
          >
            <X className="w-8 h-8 group-hover:rotate-90 transition-transform" />
          </button>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* SIR 2026 Hub & Timeline - 5 Columns */}
          <div className="lg:col-span-5 space-y-12">
            <section className="bg-white/10 backdrop-blur-2xl rounded-[3.5rem] p-12 border border-white/10 shadow-2xl">
                <div className="flex items-center justify-between mb-10">
                    <div className="flex items-center gap-3">
                        <Clock className="w-7 h-7 text-civic-saffron" />
                        <h3 className="text-2xl font-bold text-white">SIR 2026 Hub</h3>
                    </div>
                    <span className="px-4 py-2 bg-civic-saffron/20 rounded-full text-[9px] font-black text-civic-saffron uppercase tracking-widest">Active Cycle</span>
                </div>
                
                <div className="space-y-10">
                    <div className="grid grid-cols-4 gap-4">
                        {[
                            { label: 'Days', val: timeLeft.days },
                            { label: 'Hrs', val: timeLeft.hours },
                            { label: 'Min', val: timeLeft.mins },
                            { label: 'Sec', val: timeLeft.secs },
                        ].map(t => (
                            <div key={t.label} className="text-center bg-white/5 p-4 rounded-2xl border border-white/5">
                                <div className="text-3xl font-display font-bold text-white">{t.val.toString().padStart(2, '0')}</div>
                                <div className="text-[9px] font-black text-white/30 uppercase tracking-widest mt-1">{t.label}</div>
                            </div>
                        ))}
                    </div>
                    
                    <div className="space-y-6">
                        <h4 className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em]">Interactive Timeline</h4>
                        <div className="space-y-4">
                            {ELECTION_TIMELINE.map((item, i) => (
                                <div key={i} className={cn(
                                    "flex items-center gap-4 p-4 rounded-2xl border transition-all",
                                    item.status === 'On-Going' ? "bg-civic-saffron/10 border-civic-saffron/30 shadow-lg shadow-civic-saffron/5" : "bg-white/5 border-white/5 opacity-60"
                                )}>
                                    <div className={cn(
                                        "w-10 h-10 rounded-xl flex items-center justify-center shrink-0",
                                        item.status === 'On-Going' ? "bg-civic-saffron text-civic-navy" : "bg-white/10 text-white"
                                    )}>
                                        <item.icon className="w-5 h-5" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm font-bold text-white">{item.stage}</span>
                                            <span className={cn("text-[9px] font-black uppercase tracking-tighter", item.status === 'On-Going' ? "text-civic-saffron" : "text-white/30")}>{item.status}</span>
                                        </div>
                                        <span className="text-[10px] text-white/40 font-bold">{item.date}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <section className="bg-gradient-to-br from-civic-saffron to-orange-500 rounded-[3.5rem] p-12 text-civic-navy relative overflow-hidden group shadow-2xl">
                <ShieldCheck className="absolute -bottom-10 -right-10 w-64 h-64 text-civic-navy/5 group-hover:scale-110 transition-transform duration-1000" />
                <h3 className="text-3xl font-display font-bold mb-6">Sovereign Rights</h3>
                <ul className="space-y-5 relative z-10">
                    {[
                        'Right to secret paper-trail (VVPAT)',
                        'Right to NOTA (None of the above)',
                        'Home-voting for 85+ (Form 12D)',
                        'Proxy voting for Service Electors'
                    ].map(r => (
                        <li key={r} className="flex items-center gap-4 text-sm font-black uppercase tracking-tight opacity-90">
                            <UserCheck className="w-5 h-5 text-civic-navy/40" /> {r}
                        </li>
                    ))}
                </ul>
            </section>
          </div>

          {/* Forms Library - 7 Columns */}
          <div className="lg:col-span-7 bg-white/10 backdrop-blur-2xl rounded-[3.5rem] p-16 border border-white/10 shadow-2xl">
            <div className="flex items-center justify-between mb-16">
                <div className="flex items-center gap-4">
                    <BookOpen className="w-8 h-8 text-civic-saffron" />
                    <h3 className="text-3xl font-display font-bold text-white tracking-tight">Sovereign Forms Library</h3>
                </div>
                <div className="flex gap-3">
                    <div className="flex items-center gap-2 px-4 py-2 bg-civic-green/20 rounded-full">
                        <div className="w-2 h-2 bg-civic-green rounded-full animate-pulse" />
                        <span className="text-[9px] font-black text-civic-green uppercase tracking-widest">Live ECI Links</span>
                    </div>
                </div>
            </div>

            <div className="space-y-5">
                {FORMS_LIBRARY.map(form => (
                    <div key={form.id} className="group p-8 bg-white/5 border border-white/5 rounded-[2.5rem] hover:bg-white/10 hover:border-white/20 transition-all flex items-center justify-between shadow-sm">
                        <div className="flex items-center gap-8">
                            <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center group-hover:bg-white group-hover:text-civic-navy text-white transition-all shadow-xl">
                                <FileEdit className="w-7 h-7" />
                            </div>
                            <div>
                                <div className="flex items-center gap-3 mb-1">
                                    <h4 className="text-xl font-bold text-white">{form.name}</h4>
                                    <span className="px-2 py-0.5 bg-white/10 rounded text-[9px] font-black text-white/40 uppercase tracking-tighter">Official</span>
                                </div>
                                <p className="text-xs text-white/30 font-medium leading-relaxed max-w-sm">{form.desc}</p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <a 
                              href={form.link} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="p-5 bg-white/5 hover:bg-civic-saffron hover:text-civic-navy rounded-2xl text-white transition-all shadow-lg active:scale-95" 
                              title="Download Official Template"
                            >
                                <Download className="w-6 h-6" />
                            </a>
                            {form.id !== 'A2' && (
                                <a 
                                  href="https://voters.eci.gov.in/" 
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="px-8 py-5 bg-white text-civic-navy font-black rounded-2xl text-[10px] uppercase tracking-widest flex items-center gap-3 hover:scale-105 active:scale-95 transition-all shadow-2xl"
                                >
                                    Digital Portal <ExternalLink className="w-4 h-4" />
                                </a>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-16 p-10 bg-white/5 rounded-[3rem] border border-white/5 flex items-center gap-8 relative overflow-hidden">
                <div className="absolute -top-10 -left-10 opacity-5">
                    <Database className="w-48 h-48 text-white" />
                </div>
                <div className="w-16 h-16 bg-civic-saffron/10 rounded-2xl flex items-center justify-center shrink-0">
                    <Info className="w-8 h-8 text-civic-saffron" />
                </div>
                <div className="relative z-10">
                    <h4 className="text-sm font-bold text-white mb-2 uppercase tracking-widest">Engineering Note</h4>
                    <p className="text-xs text-white/40 leading-relaxed font-medium">
                        This vault utilizes ECI open-data architecture (Simulated) to provide real-time updates for SIR 2026 (Special Intensive Revision). All links lead to the actual Voter Service Portal for sovereign compliance.
                    </p>
                </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
