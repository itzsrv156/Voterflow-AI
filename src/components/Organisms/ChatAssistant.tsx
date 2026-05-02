import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useVoterStore } from '../../store/useVoterStore';
import { streamGeminiResponse } from '../../services/geminiCore';
import { 
    X, Send, Search, 
    BookOpen, 
    UserPlus, MapPin, ShieldCheck, Calendar
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { Waveform } from '../Atoms/Waveform';
import { NeuralLogicGraph } from '../Atoms/NeuralLogicGraph';
import ReactMarkdown from 'react-markdown';
import DOMPurify from 'dompurify';

const CHIPS = [
  { label: 'Form 6: New Registration', icon: '🗳️' },
  { label: 'SIR 2026: Phase 2 Dates', icon: '📅' },
  { label: 'Aadhaar-EPIC Link Guide', icon: '🔗' },
  { label: 'Home Voting (Form 12D)', icon: '🏠' },
];

export const ChatAssistant: React.FC = () => {
    const { 
        isChatOpen, setIsChatOpen, persona, 
        addReadiness, hasGreeted, setHasGreeted,
        chatMessages: messages, addChatMessage, updateLastChatMessage
    } = useVoterStore();
    
    const [userInput, setUserInput] = useState('');
    const [isStreaming, setIsStreaming] = useState(false);
    const [isDeepSearching, setIsDeepSearching] = useState(false);
    const chatEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isDeepSearching]);

    // Initial Greeting Logic
    useEffect(() => {
        if (!hasGreeted && persona && isChatOpen) {
            const greetings: Record<string, string> = {
                FirstTime: "Namaste! I'm Gemini, your VoterFlow Intelligence core. Welcome, First-Time Voter! I can help you navigate the entire SIR 2026 cycle with real-time data from the ECI.",
                Student: "Hello! Gemini here. As a student, you have specific rights under SIR 2026. I can guide you through the Annexure-II residency declaration and Form 6 filing. Ready to start?",
                Senior: "Namaste. I am Gemini, your dedicated assistant. For our senior citizens, I offer priority guidance on the Form 12D process for home-voting in PC 25."
            };
            
            setTimeout(() => {
                addChatMessage({ role: 'ai', text: greetings[persona] || "Welcome to your Sovereign Dashboard. How can I assist your civic journey today?" });
                setHasGreeted(true);
            }, 0);
        }
    }, [persona, hasGreeted, setHasGreeted, isChatOpen, addChatMessage]);

    const handleSend = React.useCallback((input?: string, isDeep = false) => {
        const text = input || userInput;
        if (!text.trim() || isStreaming) return;

        addChatMessage({ role: 'user', text });
        setUserInput('');
        setIsStreaming(true);
        if (isDeep) setIsDeepSearching(true);

        const sources = isDeep ? ['ECI Knowledge Graph', 'Legal Gazette 2026', 'VoterFlow Archives'] : undefined;
        addChatMessage({ role: 'ai', text: 'Gemini is thinking...', sources });

        const formattedHistory = messages.map(m => ({
            role: m.role === 'user' ? 'user' as const : 'model' as const,
            parts: [{ text: m.text }]
        }));

        const systemPrompt = `You are "Gemini", the integrated AI Intelligence for VoterFlow (SIR 2026).
        Current Voter Persona: ${persona || 'General Citizen'}.
        Task: Provide accurate, professional, and contextual guidance on the Indian Electoral process.
        
        CRITICAL CONTEXT: 
        - SIR 2026 is the current cycle.
        - Form 6 is for new registrations.
        - Form 8 is for corrections.
        - Annexure-II is specifically for Students living away from home.`;

        streamGeminiResponse(text, systemPrompt, formattedHistory, (fullText) => {
            setIsDeepSearching(false);
            updateLastChatMessage(fullText, sources);
        }).finally(() => {
            setIsStreaming(false);
            setIsDeepSearching(false);
            addReadiness(2);
        });
    }, [userInput, isStreaming, messages, persona, addChatMessage, updateLastChatMessage, addReadiness]);

    return (
        <AnimatePresence>
            {isChatOpen && (
                <div className="fixed inset-0 lg:inset-auto lg:bottom-24 lg:right-12 z-[5000] flex items-end lg:block">
                    {/* Mobile Backdrop */}
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsChatOpen(false)}
                        className="lg:hidden fixed inset-0 bg-civic-navy/20 backdrop-blur-sm"
                    />
                    
                    <motion.div
                        initial={{ y: "100%", opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: "100%", opacity: 0 }}
                        transition={{ type: "spring", damping: 30, stiffness: 300 }}
                        className="w-full lg:w-[450px] h-[90vh] lg:h-[650px] glass rounded-t-[3.5rem] lg:rounded-[3rem] flex flex-col relative overflow-hidden shadow-[0_-20px_80px_rgba(0,0,0,0.5)] lg:shadow-[0_32px_128px_rgba(0,0,0,0.4)] border border-white/20 dark:border-white/5"
                    >
                        {/* Header */}
                        <div className="p-6 border-b border-white/10 dark:border-white/5 flex justify-between items-center bg-white/40 dark:bg-slate-950/80 backdrop-blur-3xl sticky top-0 z-20">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-white dark:bg-white/[0.03] rounded-2xl flex items-center justify-center border border-white/40 dark:border-white/10 shadow-sm relative overflow-hidden group">
                                    <div className="absolute inset-0 bg-gradient-to-tr from-[#4285F4]/10 via-[#EA4335]/10 to-[#FBBC05]/10" />
                                    <img src="https://www.gstatic.com/lamda/images/gemini_sparkle_v002_d4735304ff6292a690345.svg" className="w-6 h-6 animate-gemini-pulse z-10" alt="Gemini" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-display font-bold text-civic-navy flex items-center gap-2">
                                        VoterFlow <span className="gemini-gradient-text">Gemini</span>
                                    </h3>
                                    <div className="flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 bg-civic-green rounded-full animate-pulse shadow-[0_0_8px_rgba(18,136,7,0.6)]" />
                                        <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest leading-none">Gemini Sovereign Core + Logic Active</span>
                                    </div>
                                </div>
                            </div>
                            <button onClick={() => setIsChatOpen(false)} className="p-3 bg-gray-50 rounded-full hover:bg-red-50 transition-all text-gray-400">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Chat Area */}
                        <div 
                            id="chat-messages"
                            role="log"
                            aria-live="polite"
                            aria-label="Chat messages"
                            className="flex-1 p-6 overflow-y-auto space-y-6 bg-gray-50/10 custom-scrollbar"
                        >
                            {messages.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-center p-8">
                                    <div className="w-20 h-20 bg-white rounded-[2.5rem] flex items-center justify-center mb-6 shadow-xl border border-gray-100 relative overflow-hidden group">
                                        <div className="absolute inset-0 bg-gradient-to-tr from-[#4285F4]/5 via-[#EA4335]/5 to-[#FBBC05]/5" />
                                        <img src="https://www.gstatic.com/lamda/images/gemini_sparkle_v002_d4735304ff6292a690345.svg" className="w-10 h-10 animate-gemini-pulse" alt="Gemini" />
                                    </div>
                                    <h4 className="text-xl font-display font-bold text-civic-navy">Gemini Intelligence</h4>
                                    <p className="text-sm text-gray-400 mt-2 max-w-xs leading-relaxed font-medium">
                                        Google's most capable AI, grounded in real-time search. How may I assist your civic duty?
                                    </p>
                                    <div className="grid grid-cols-1 gap-2 mt-10 w-full">
                                        {[
                                            { q: "What is my 2026 registration status?", icon: UserPlus },
                                            { q: "Find my polling booth near Bengaluru Central", icon: MapPin },
                                            { q: "How does the EVM VVPAT system work?", icon: ShieldCheck },
                                            { q: "Show me the 2026 election timeline", icon: Calendar }
                                        ].map((item, i) => (
                                            <button 
                                                key={i}
                                                onClick={() => {
                                                    setUserInput(item.q);
                                                    handleSend(item.q);
                                                }}
                                                className="p-4 bg-white/60 dark:bg-white/[0.05] hover:bg-white dark:hover:bg-white/[0.1] border border-white/80 dark:border-white/10 rounded-2xl text-[10px] font-black text-civic-navy dark:text-white uppercase tracking-widest text-left flex items-center gap-3 transition-all hover:scale-[1.02] active:scale-95 shadow-sm"
                                            >
                                                <item.icon className="w-4 h-4 text-civic-navy/40" />
                                                {item.q}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            ) : (
                                messages.map((m, idx) => (
                                    <motion.div 
                                        key={idx} 
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className={cn(
                                            "p-6 rounded-[2rem] max-w-[90%] shadow-sm text-[15px] font-medium leading-relaxed relative group",
                                            m.role === 'user' 
                                            ? "bg-civic-navy text-white ml-auto rounded-tr-none shadow-xl shadow-civic-navy/10" 
                                            : "bg-white text-gray-800 border border-gray-100 rounded-tl-none gemini-rainbow-border"
                                        )}
                                    >
                                        {m.role === 'ai' ? (
                                            <div className="markdown-content prose prose-sm max-w-none">
                                                <ReactMarkdown>{DOMPurify.sanitize(m.text)}</ReactMarkdown>
                                            </div>
                                        ) : (
                                            m.text
                                        )}
                                        {m.sources && (
                                            <div className="mt-4 pt-4 border-t border-gray-100 flex flex-wrap gap-2">
                                                {m.sources.map(s => (
                                                    <div key={s} className="flex items-center gap-2 px-2 py-1 bg-gray-50 rounded-lg border border-gray-100">
                                                        <BookOpen className="w-3 h-3 text-civic-navy" />
                                                        <span className="text-[8px] font-bold text-civic-navy">{s}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </motion.div>
                                ))
                            )}
                            
                            {isDeepSearching && (
                                <motion.div 
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="flex flex-col gap-4 p-6 bg-white rounded-[2.5rem] border border-gray-100 shadow-sm"
                                >
                                    <div className="flex items-center gap-4">
                                        <Waveform />
                                        <span className="text-[10px] font-black text-civic-navy uppercase tracking-widest">Gemini is searching repositories...</span>
                                    </div>
                                    <NeuralLogicGraph isActive={true} className="h-28" />
                                </motion.div>
                            )}
                            <div ref={chatEndRef} />
                        </div>

                        {/* Input Area */}
                        <div className="p-6 bg-white border-t border-gray-100 space-y-4">
                            <div className="flex flex-wrap gap-2 mb-2">
                                {CHIPS.map(chip => (
                                    <button
                                        key={chip.label}
                                        onClick={() => handleSend(chip.label)}
                                        disabled={isStreaming}
                                        className="px-3 py-1.5 bg-gray-50 hover:bg-civic-navy hover:text-white rounded-xl text-[9px] font-black uppercase tracking-widest text-gray-400 border border-gray-100 transition-all"
                                    >
                                        {chip.label}
                                    </button>
                                ))}
                            </div>
                            <form 
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    handleSend();
                                }}
                                className="flex gap-2 p-2 bg-gray-50 rounded-[1.5rem] border border-gray-100 focus-within:bg-white focus-within:ring-2 focus-within:ring-civic-navy transition-all"
                            >
                                <input 
                                    value={userInput}
                                    onChange={e => setUserInput(e.target.value)}
                                    placeholder="Ask anything..."
                                    className="flex-1 px-4 bg-transparent text-sm font-medium focus:outline-none"
                                />
                                <button 
                                    type="button"
                                    onClick={() => handleSend(undefined, true)}
                                    className="p-3 text-gray-300 hover:text-civic-navy transition-colors"
                                    title="Deep Sovereign Search"
                                >
                                    <Search className="w-5 h-5" />
                                </button>
                                <button 
                                    type="submit"
                                    disabled={isStreaming || !userInput.trim()} 
                                    className="p-3 bg-civic-navy text-white rounded-xl shadow-lg hover:scale-105 active:scale-95 disabled:opacity-50 transition-all"
                                >
                                    <Send className="w-5 h-5" />
                                </button>
                            </form>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};
