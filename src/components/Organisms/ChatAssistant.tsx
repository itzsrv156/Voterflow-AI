import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useVoterStore } from '../../store/useVoterStore';
import { X, Send, Sparkles, Search, Loader2, ShieldCheck, BookOpen, AlertCircle } from 'lucide-react';
import { cn } from '../../lib/utils';

const CHIPS = [
  { label: 'Form 6: New Registration', icon: '🗳️' },
  { label: 'SIR 2026: Phase 2 Dates', icon: '📅' },
  { label: 'Aadhaar-EPIC Link Guide', icon: '🔗' },
  { label: 'Home Voting (Form 12D)', icon: '🏠' },
];

const SEARCH_STAGES = [
  "Initializing Federated Search Engine...",
  "Querying ECI Open Data Archives (2025-2026)...",
  "Analyzing Legislative Amendments (Form 6/8/12D)...",
  "Synthesizing Sovereign Intelligence Report...",
];

export const ChatAssistant = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const { persona, readinessScore } = useVoterStore();
  const [messages, setMessages] = useState<{ role: 'user' | 'ai'; text: string; sources?: string[] }[]>([]);
  const [userInput, setUserInput] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const [searchStage, setSearchStage] = useState<string | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, searchStage]);

  const handleSend = (text?: string, deepSearch = false) => {
    const message = text || userInput;
    if (!message.trim() || isStreaming) return;

    setMessages(prev => [...prev, { role: 'user', text: message }]);
    setUserInput('');
    setIsStreaming(true);
    
    if (deepSearch) {
        let stageIdx = 0;
        setSearchStage(SEARCH_STAGES[0]);
        const stageInterval = setInterval(() => {
            stageIdx++;
            if (stageIdx < SEARCH_STAGES.length) {
                setSearchStage(SEARCH_STAGES[stageIdx]);
            } else {
                clearInterval(stageInterval);
                setSearchStage(null);
                processResponse(message, true);
            }
        }, 1200);
    } else {
        processResponse(message, false);
    }
  };

  const processResponse = (query: string, isDeep: boolean) => {
    const sources = isDeep ? [
        'ECI Circular 2026/04/SIR',
        'Representation of the People Act, 1950 (Amended)',
        'VoterFlow AI Knowledge Graph'
    ] : undefined;

    setMessages(prev => [...prev, { role: 'ai', text: '', sources }]);
    
    const getResponse = (q: string) => {
        const lowerQ = q.toLowerCase();
        if (lowerQ.includes('form 6')) return "Based on ECI protocol 2026/04, Form 6 is the primary instrument for new electors. The qualifying date is 01-01-2026. Required: Aadhaar, Passport Photo, and Address Proof. Verification usually takes 7-10 working days via the BLO dashboard.";
        if (lowerQ.includes('sir')) return `The Special Intensive Revision (SIR) 2026 is currently in Phase 2 (Claims & Objections). Your current profile readiness is ${Math.round(readinessScore)}%. To reach 100%, ensure your Aadhaar is linked to your EPIC number.`;
        if (isDeep) return `Sovereign analysis for "${q}" completed. For a ${persona || 'Citizen'} profile, cross-referencing against the 2026 Electoral Roll reveals active revision in your sector (Bengaluru/PC 25). I recommend initiating the Digital Form Suite to ensure data parity.`;
        return `Analyzing query: "${q}". Current ECI framework for 2026 recommends regular roll verification. How can I assist with your specific registration or correction needs?`;
    };

    const responseText = getResponse(query);
    let currentText = "";
    let i = 0;
    
    const interval = setInterval(() => {
        if (i >= responseText.length) {
            clearInterval(interval);
            setIsStreaming(false);
            return;
        }
        currentText += responseText[i];
        setMessages(prev => {
            return [...prev.slice(0, -1), { role: 'ai', text: currentText, sources }];
        });
        i++;
    }, 12);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ x: '100%', opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: '100%', opacity: 0 }}
          transition={{ type: 'spring', damping: 30, stiffness: 300 }}
          className="fixed inset-y-0 right-0 w-full max-w-md bg-white/95 backdrop-blur-2xl shadow-[0_0_100px_rgba(0,0,0,0.1)] z-[1200] flex flex-col border-l border-gray-100"
        >
          {/* Header */}
          <div className="bg-civic-navy p-8 flex justify-between items-center text-white relative overflow-hidden shrink-0">
            <div className="absolute top-0 right-0 w-32 h-32 bg-civic-saffron/10 rounded-full -mr-16 -mt-16 blur-3xl" />
            <div className="flex items-center gap-4 relative z-10">
              <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-md border border-white/20">
                <Sparkles className="w-6 h-6 text-civic-saffron" />
              </div>
              <div>
                <h3 className="font-display font-bold text-xl leading-tight">Sovereign Coach</h3>
                <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                    <p className="text-[9px] text-white/60 font-black uppercase tracking-[0.2em]">Federated Search Active</p>
                </div>
              </div>
            </div>
            <button onClick={onClose} className="p-3 hover:bg-white/10 rounded-2xl transition-all relative z-10">
              <X className="w-6 h-6 text-white/40" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-8 space-y-8 bg-gray-50/50 custom-scrollbar">
            <div className="flex flex-col gap-2">
                <div className="bg-white p-6 rounded-[2rem] rounded-tl-none text-sm text-gray-600 shadow-sm border border-gray-100 leading-relaxed font-medium">
                  Namaste! I am your **Sovereign Voter Intelligence Assistant**. How can I help you navigate the 2026 Electoral cycle today?
                </div>
                <div className="flex items-center gap-2 ml-4">
                    <ShieldCheck className="w-3 h-3 text-civic-green" />
                    <span className="text-[9px] font-bold text-gray-300 uppercase tracking-widest">ECI Trusted Agent</span>
                </div>
            </div>

            {messages.map((m, i) => (
              <div key={i} className="flex flex-col gap-3">
                <div className={cn(
                    "p-6 rounded-[2.5rem] text-sm leading-relaxed shadow-sm font-medium", 
                    m.role === 'user' 
                    ? "bg-civic-navy text-white self-end ml-12 rounded-tr-none shadow-xl shadow-civic-navy/10" 
                    : "bg-white text-gray-600 self-start mr-12 rounded-tl-none border border-gray-100"
                )}>
                  {m.text}
                  
                  {m.sources && (
                      <div className="mt-4 pt-4 border-t border-gray-100 space-y-2">
                          <div className="flex items-center gap-2 text-[9px] font-black text-gray-400 uppercase tracking-widest">
                              <BookOpen className="w-3 h-3" /> Sources Verified
                          </div>
                          <div className="flex flex-wrap gap-2">
                              {m.sources.map(s => (
                                  <span key={s} className="px-2 py-1 bg-gray-50 rounded text-[8px] font-bold text-civic-navy border border-gray-100">{s}</span>
                              ))}
                          </div>
                      </div>
                  )}
                </div>
                <span className={cn(
                    "text-[9px] font-black uppercase tracking-widest",
                    m.role === 'user' ? "text-right mr-4 text-civic-navy/40" : "ml-4 text-civic-saffron"
                )}>
                    {m.role === 'user' ? 'Citizen Query' : 'Sovereign Intel Response'}
                </span>
              </div>
            ))}
            
            {searchStage && (
                <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col gap-3 p-6 bg-white rounded-[2.5rem] border border-gray-100 shadow-sm"
                >
                    <div className="flex items-center gap-3">
                        <Loader2 className="w-4 h-4 text-civic-navy animate-spin" />
                        <span className="text-[10px] font-black text-civic-navy uppercase tracking-widest">{searchStage}</span>
                    </div>
                    <div className="h-1 w-full bg-gray-100 rounded-full overflow-hidden">
                        <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: '100%' }}
                            transition={{ duration: 4.8, ease: "linear" }}
                            className="h-full bg-civic-saffron" 
                        />
                    </div>
                </motion.div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-8 bg-white border-t border-gray-100 space-y-6 shrink-0">
            <div className="flex flex-wrap gap-2">
              {CHIPS.map(chip => (
                <button
                  key={chip.label}
                  onClick={() => handleSend(chip.label)}
                  disabled={isStreaming || !!searchStage}
                  className="px-4 py-2 bg-gray-50 hover:bg-civic-navy hover:text-white text-[10px] font-black text-civic-navy rounded-xl transition-all flex items-center gap-2 border border-gray-100 hover:border-civic-navy shadow-sm disabled:opacity-50"
                >
                  <span className="text-xs">{chip.icon}</span>
                  {chip.label}
                </button>
              ))}
            </div>
            
            <div className="flex gap-3">
              <div className="flex-1 relative group">
                  <input 
                    value={userInput}
                    onChange={e => setUserInput(e.target.value)}
                    onKeyPress={e => e.key === 'Enter' && handleSend()}
                    placeholder="Ask about Form 6, SIR 2026..."
                    disabled={isStreaming || !!searchStage}
                    className="w-full pl-6 pr-12 py-4 bg-gray-50 border border-gray-100 rounded-[1.5rem] text-sm focus:outline-none focus:ring-2 focus:ring-civic-navy focus:bg-white transition-all font-medium disabled:opacity-50"
                  />
                  <button 
                    onClick={() => handleSend(undefined, true)}
                    disabled={isStreaming || !!searchStage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 hover:text-civic-navy transition-colors p-1 disabled:opacity-50"
                    title="Initiate Deep Sovereign Search"
                  >
                    <Search className="w-5 h-5" />
                  </button>
              </div>
              <button 
                onClick={() => handleSend()} 
                disabled={isStreaming || !!searchStage || !userInput.trim()} 
                className="p-4 bg-civic-navy text-white rounded-[1.5rem] shadow-xl shadow-civic-navy/20 active:scale-95 transition-all hover:shadow-2xl disabled:opacity-50 disabled:scale-100"
              >
                <Send className="w-6 h-6" />
              </button>
            </div>
            
            <div className="flex items-center justify-center gap-2 text-[8px] font-black text-gray-300 uppercase tracking-widest">
                <AlertCircle className="w-3 h-3" /> All responses are based on simulated ECI data 2026
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
