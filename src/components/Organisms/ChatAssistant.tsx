import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useVoterStore } from '../../store/useVoterStore';
import { createVoterCoach } from '../../services/gemini';
import { MessageCircle, X, Send, Sparkles, ChevronRight } from 'lucide-react';
import { cn } from '../../lib/utils';

const CHIPS = [
  { label: 'Form 6: New Registration', icon: '🗳️' },
  { label: 'Form 8: Correction Suite', icon: '📝' },
  { label: 'Annexure-II: Student Guide', icon: '🏠' },
  { label: 'SIR 2026: Deadline Check', icon: '📅' },
  { label: 'Download Document Checklist', icon: '📄' },
  { label: 'Find My Polling Booth', icon: '📍' },
];

export const ChatAssistant = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const { persona } = useVoterStore();
  const [messages, setMessages] = useState<{ role: 'user' | 'ai'; text: string }[]>([]);
  const [userInput, setUserInput] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = (text?: string) => {
    const message = text || userInput;
    if (!message.trim() || isStreaming) return;

    setMessages(prev => [...prev, { role: 'user', text: message }]);
    setUserInput('');
    setIsStreaming(true);
    setMessages(prev => [...prev, { role: 'ai', text: '' }]);

    const coach = createVoterCoach(persona);
    let fullText = "";
    
    // Mocking the streaming for the refactor
    setTimeout(() => {
      const mockResponse = `I'm analyzing your request regarding "${message}". For the SIR 2026 cycle, please ensure your details are updated by Jan 31. ${
        persona === 'Student' ? 'Don\'t forget Annexure-II!' : ''
      }`;
      
      let i = 0;
      const interval = setInterval(() => {
        fullText += mockResponse[i];
        setMessages(prev => {
          const last = prev[prev.length - 1];
          return [...prev.slice(0, -1), { role: 'ai', text: fullText }];
        });
        i++;
        if (i >= mockResponse.length) {
          clearInterval(interval);
          setIsStreaming(false);
        }
      }, 20);
    }, 400);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="fixed inset-y-0 right-0 w-full max-w-md bg-white shadow-2xl z-[120] flex flex-col border-l border-gray-100"
        >
          <div className="bg-civic-navy p-8 flex justify-between items-center text-white">
            <div className="flex items-center gap-3">
              <Sparkles className="w-6 h-6 text-civic-saffron" />
              <div>
                <h3 className="font-bold text-lg">AI Voter Coach</h3>
                <p className="text-[10px] text-civic-saffron font-bold uppercase tracking-widest">Active Session</p>
              </div>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-8 space-y-6 bg-gray-50/30">
            <div className="bg-white p-4 rounded-2xl rounded-tl-none text-sm text-gray-600 shadow-sm border border-gray-100">
              Hello! I'm specialized in SIR 2026. How can I assist you with your {persona} profile today?
            </div>
            {messages.map((m, i) => (
              <div key={i} className={cn("p-4 rounded-2xl text-sm leading-relaxed", m.role === 'user' ? "bg-civic-navy text-white self-end ml-auto rounded-tr-none shadow-lg shadow-civic-navy/20" : "bg-white text-gray-600 rounded-tl-none shadow-sm border border-gray-100")}>
                {m.text}
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>

          <div className="p-6 bg-white border-t border-gray-100 space-y-4">
            <div className="flex flex-wrap gap-2">
              {CHIPS.map(chip => (
                <button
                  key={chip.label}
                  onClick={() => handleSend(chip.label)}
                  className="px-3 py-1.5 bg-gray-100 hover:bg-civic-navy hover:text-white text-[10px] font-bold text-civic-navy rounded-full transition-all flex items-center gap-1.5"
                >
                  <span>{chip.icon}</span>
                  {chip.label}
                </button>
              ))}
            </div>
            
            <div className="flex gap-2">
              <input 
                value={userInput}
                onChange={e => setUserInput(e.target.value)}
                onKeyPress={e => e.key === 'Enter' && handleSend()}
                placeholder="Type your query..."
                className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-civic-navy"
              />
              <button onClick={() => handleSend()} disabled={isStreaming} className="p-3 bg-civic-navy text-white rounded-xl shadow-lg shadow-civic-navy/20 active:scale-95 transition-transform">
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
