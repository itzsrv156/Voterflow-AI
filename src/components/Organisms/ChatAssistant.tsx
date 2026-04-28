import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useVoterStore } from '../../store/useVoterStore';
import { streamGeminiResponse } from '../../services/geminiCore';
import { 
    X, Send, Sparkles, Search, 
    BookOpen, MessageCircle 
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { Waveform } from '../Atoms/Waveform';
import { NeuralLogicGraph } from '../Atoms/NeuralLogicGraph';

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
                FirstTime: "Namaste! Welcome, First-Time Voter. I'm your VoterFlow AI Guide. Your journey to democratic participation starts here. I recommend launching the 'Registration Suite' to check your eligibility.",
                Student: "Hello! As a student, you have specific rights under SIR 2026. I can guide you through the Annexure-II residency declaration and Form 6 filing. Shall we begin?",
                Senior: "Namaste. For our senior citizens, we offer priority assistance. I can help you understand the Form 12D process for home-voting in PC 25."
            };
            
            setTimeout(() => {
                addChatMessage({ role: 'ai', text: greetings[persona] || "Welcome to your Sovereign Dashboard. How can I assist your civic journey today?" });
                setHasGreeted(true);
            }, 0);
        }
    }, [persona, hasGreeted, setHasGreeted, isChatOpen, addChatMessage]);

    const handleSend = (input?: string, isDeep = false) => {
        const text = input || userInput;
        if (!text.trim() || isStreaming) return;

        addChatMessage({ role: 'user', text });
        setUserInput('');
        setIsStreaming(true);
        if (isDeep) setIsDeepSearching(true);

        const sources = isDeep ? ['ECI Knowledge Graph', 'Legal Gazette 2026', 'VoterFlow Archives'] : undefined;
        addChatMessage({ role: 'ai', text: 'Synthesizing Sovereign Response...', sources });

        const history = messages.map(m => `${m.role === 'user' ? 'User' : 'Assistant'}: ${m.text}`).join('\n');
        const systemPrompt = `You are the VoterFlow Intelligence Core (Gemini 1.5). 
        Assist Indian citizens in the 2026 SIR cycle. Persona: ${persona || 'Citizen'}. 
        Style: Professional, concise, authoritative. \n\nHistory: ${history}`;

        streamGeminiResponse(text, systemPrompt, (fullText) => {
            setIsDeepSearching(false);
            updateLastChatMessage(fullText, sources);
        }).then(() => {
            setIsStreaming(false);
            addReadiness(2);
        });
    };

    return (
        <AnimatePresence>
            {isChatOpen && (
                <div className="fixed bottom-24 right-12 z-[5000]">
                    <motion.div
                        initial={{ y: 50, opacity: 0, scale: 0.95 }}
                        animate={{ y: 0, opacity: 1, scale: 1 }}
                        exit={{ y: 50, opacity: 0, scale: 0.95 }}
                        transition={{ type: "spring", damping: 30, stiffness: 300 }}
                        className="w-[450px] h-[650px] glass rounded-[3rem] flex flex-col relative overflow-hidden shadow-[0_32px_128px_rgba(0,0,0,0.15)] border border-white/40"
                    >
                        {/* Header */}
                        <div className="p-6 border-b border-white/20 flex justify-between items-center bg-white/20 backdrop-blur-md sticky top-0 z-20">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-white/40 rounded-2xl flex items-center justify-center border border-white/40 shadow-inner">
                                    <Sparkles className="w-6 h-6 text-civic-navy animate-logo-glow" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-display font-bold text-civic-navy">VoterFlow AI Assistant</h3>
                                    <div className="flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 bg-civic-green rounded-full animate-pulse shadow-[0_0_8px_rgba(18,136,7,0.6)]" />
                                        <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest leading-none">Federated Search Active</span>
                                    </div>
                                </div>
                            </div>
                            <button onClick={() => setIsChatOpen(false)} className="p-3 bg-gray-50 rounded-full hover:bg-red-50 transition-all text-gray-400">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Chat Area */}
                        <div className="flex-1 p-6 overflow-y-auto space-y-6 bg-gray-50/10 custom-scrollbar">
                            {messages.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-center p-8">
                                    <div className="w-20 h-20 bg-gray-50 rounded-[2.5rem] flex items-center justify-center mb-6 shadow-inner">
                                        <MessageCircle className="w-10 h-10 text-gray-200" />
                                    </div>
                                    <h4 className="text-xl font-display font-bold text-civic-navy">Sovereign Assistant</h4>
                                    <p className="text-sm text-gray-400 mt-2 max-w-xs leading-relaxed">
                                        Authorized intelligence for the 2026 Special Intensive Revision. How may I assist your civic duty?
                                    </p>
                                </div>
                            ) : (
                                messages.map((m, idx) => (
                                    <motion.div 
                                        key={idx} 
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className={cn(
                                            "p-6 rounded-[2rem] max-w-[90%] shadow-sm text-sm font-medium leading-relaxed relative group",
                                            m.role === 'user' 
                                            ? "bg-civic-navy text-white ml-auto rounded-tr-none shadow-xl shadow-civic-navy/10" 
                                            : "bg-white text-gray-600 border border-gray-100 rounded-tl-none"
                                        )}
                                    >
                                        {m.text}
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
                                        <span className="text-[10px] font-black text-civic-navy uppercase tracking-widest">Analyzing Sovereign Repositories...</span>
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
                            <div className="flex gap-2 p-2 bg-gray-50 rounded-[1.5rem] border border-gray-100 focus-within:bg-white focus-within:ring-2 focus-within:ring-civic-navy transition-all">
                                <input 
                                    value={userInput}
                                    onChange={e => setUserInput(e.target.value)}
                                    onKeyPress={e => e.key === 'Enter' && handleSend()}
                                    placeholder="Ask anything..."
                                    className="flex-1 px-4 bg-transparent text-sm font-medium focus:outline-none"
                                />
                                <button 
                                    onClick={() => handleSend(undefined, true)}
                                    className="p-3 text-gray-300 hover:text-civic-navy transition-colors"
                                    title="Deep Sovereign Search"
                                >
                                    <Search className="w-5 h-5" />
                                </button>
                                <button 
                                    onClick={() => handleSend()} 
                                    disabled={isStreaming || !userInput.trim()} 
                                    className="p-3 bg-civic-navy text-white rounded-xl shadow-lg hover:scale-105 active:scale-95 disabled:opacity-50 transition-all"
                                >
                                    <Send className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};
