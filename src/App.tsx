import { Header } from './components/Organisms/Header';
import { Hero } from './components/Organisms/Hero';
import { Dashboard } from './components/Organisms/Dashboard';
import { DigitalFormEngine } from './components/Organisms/DigitalFormEngine';
import { ResearchVault } from './components/Organisms/ResearchVault';
import { ChatAssistant } from './components/Organisms/ChatAssistant';
import { useVoterStore } from './store/useVoterStore';
import { motion, AnimatePresence } from 'framer-motion';
import { ErrorBoundary } from './components/Atoms/ErrorBoundary';
import { X } from 'lucide-react';
import { cn } from './lib/utils';

function App() {
  const { view, activeFlow, setActiveFlow, readinessScore, isChatOpen, setIsChatOpen } = useVoterStore();

  // Dynamic colors based on readinessScore
  const getPulseColor = (base: 'blue' | 'saffron' | 'green') => {
    if (readinessScore > 80) return 'bg-civic-green';
    if (readinessScore > 40) return 'bg-civic-saffron';
    return base === 'blue' ? 'bg-google-blue' : (base === 'saffron' ? 'bg-civic-saffron' : 'bg-civic-green');
  };

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-[#FDFDFD] selection:bg-civic-navy/10 relative">
        {/* Floating Background Blobs for Glass Depth - Reactive Civic Pulse */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
          <motion.div 
            animate={{ 
              x: [0, 80, 0], 
              y: [0, 40, 0],
              scale: [1, 1.1 + (readinessScore / 250), 1],
              opacity: [0.08, 0.12 + (readinessScore / 600), 0.08]
            }}
            transition={{ duration: 25 - (readinessScore / 10), repeat: Infinity, ease: "linear" }}
            className={cn("absolute -top-[10%] -left-[10%] w-[40%] h-[40%] rounded-full blur-[80px] transition-colors duration-1000", getPulseColor('blue') + '/10')} 
            style={{ willChange: 'transform' }}
          />
          <motion.div 
            animate={{ 
              x: [0, -60, 0], 
              y: [0, 80, 0],
              scale: [1, 1.05 + (readinessScore / 300), 1],
              opacity: [0.08, 0.15 + (readinessScore / 500), 0.08]
            }}
            transition={{ duration: 30 - (readinessScore / 8), repeat: Infinity, ease: "linear" }}
            className={cn("absolute top-[20%] -right-[10%] w-[35%] h-[35%] rounded-full blur-[70px] transition-colors duration-1000", getPulseColor('saffron') + '/10')} 
            style={{ willChange: 'transform' }}
          />
          <motion.div 
            animate={{ 
              x: [0, 40, 0], 
              y: [0, -80, 0],
              scale: [1, 1.2 + (readinessScore / 200), 1],
              opacity: [0.08, 0.2 + (readinessScore / 400), 0.08]
            }}
            transition={{ duration: 22 - (readinessScore / 12), repeat: Infinity, ease: "linear" }}
            className={cn("absolute -bottom-[10%] left-[20%] w-[45%] h-[45%] rounded-full blur-[90px] transition-colors duration-1000", getPulseColor('green') + '/10')} 
            style={{ willChange: 'transform' }}
          />
        </div>

        <Header />
        
        <main className="relative min-h-screen z-10">
          <AnimatePresence mode="wait">
            {view === 'selection' ? (
              <motion.div
                key="selection"
                initial={{ opacity: 0, scale: 1, filter: 'blur(0px)' }}
                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                exit={{ 
                  opacity: 0, 
                  scale: 5, 
                  filter: 'blur(40px)',
                  transition: { duration: 1.2, ease: [0.7, 0, 0.3, 1] } 
                }}
                transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
                className="h-full relative z-10"
              >
                <Hero />
              </motion.div>
            ) : (
              <motion.div
                key="dashboard"
                initial={{ opacity: 0, scale: 0.8, filter: 'blur(20px)' }}
                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="pt-24 px-4 pb-20 max-w-[1600px] mx-auto h-full relative z-10"
              >
                <Dashboard />
              </motion.div>
            )}
          </AnimatePresence>
        </main>

        {/* Global Floating Ask Gemini Button - Google AI Mode Style */}
        {view === 'dashboard' && (
            <div className="fixed bottom-12 right-12 z-[5000]">
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsChatOpen(!isChatOpen)}
                    className="relative p-[1.5px] rounded-full overflow-hidden group shadow-[0_0_30px_rgba(66,133,244,0.2)] hover:shadow-[0_0_40px_rgba(66,133,244,0.3)] transition-all"
                >
                    {/* The Rainbow Stroke Layer (Backing) */}
                    <motion.div 
                        animate={{ rotate: 360 }}
                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-[-100%] bg-[conic-gradient(from_0deg,#4285F4,#EA4335,#FBBC05,#34A853,#4285F4)]"
                    />
                    
                    {/* The Vibrant Stroke Glow (Sharp Orbit Glow) */}
                    <motion.div 
                        animate={{ rotate: 360 }}
                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-[-100%] bg-[conic-gradient(from_0deg,#4285F4,#EA4335,#FBBC05,#34A853,#4285F4)] blur-[8px] opacity-80"
                    />
                    
                    {/* The Button Content (Glass Shield - This blocks the internal color) */}
                    <div className="relative px-8 py-4 bg-[#0a0a0a] backdrop-blur-2xl rounded-full flex items-center gap-3 text-white border border-white/10 m-[1px]">
                        {isChatOpen ? (
                            <X className="w-5 h-5" />
                        ) : (
                            <>
                                <img src="https://www.gstatic.com/lamda/images/gemini_sparkle_v002_d4735304ff6292a690345.svg" className="w-5 h-5 animate-pulse" alt="Gemini" />
                                <span className="font-display font-medium text-sm tracking-tight">Ask Gemini</span>
                                <div className="flex gap-0.5">
                                    {[1, 2, 3].map(i => (
                                        <motion.div 
                                            key={i}
                                            animate={{ opacity: [0.4, 1, 0.4] }}
                                            transition={{ repeat: Infinity, duration: 1.5, delay: i * 0.2 }}
                                            className="w-1 h-1 bg-white rounded-full"
                                        />
                                    ))}
                                </div>
                            </>
                        )}
                    </div>

                    {/* The Rotating Drop Glow (Wide) */}
                    <motion.div 
                        animate={{ rotate: 360 }}
                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-[-150%] bg-[conic-gradient(from_0deg,#4285F4,#EA4335,#FBBC05,#34A853,#4285F4)] blur-3xl opacity-20 transition-opacity -z-20"
                    />
                </motion.button>
            </div>
        )}

        {/* Global Sovereign Overlays */}
        <AnimatePresence>
          {activeFlow === 'registration' && (
            <DigitalFormEngine key="form-engine" onClose={() => setActiveFlow(null)} />
          )}
          {activeFlow === 'research' && (
            <ResearchVault key="research-vault" isOpen={true} onClose={() => setActiveFlow(null)} />
          )}
        </AnimatePresence>

        <ChatAssistant />

        {/* Dynamic Background Noise/Texture */}
        <div className="fixed inset-0 pointer-events-none opacity-[0.05] z-[9999] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay" />

        {/* Sovereign Disclaimer Footer */}
        <footer className="fixed bottom-6 left-6 z-[3500] pointer-events-auto group">
            <div className="flex items-center gap-3 bg-white/40 backdrop-blur-md px-4 py-2 rounded-full border border-white/40 shadow-sm transition-all hover:bg-white/60">
                <div className="w-5 h-5 bg-civic-navy rounded-full flex items-center justify-center">
                    <span className="text-[10px] font-black text-white italic">i</span>
                </div>
                <p className="text-[8px] font-bold text-gray-500 tracking-[0.1em] opacity-0 group-hover:opacity-100 transition-opacity max-w-0 group-hover:max-w-[400px] whitespace-nowrap overflow-hidden">
                    Demo only. No personal data is stored.
                </p>
                <div className="w-1 h-1 bg-civic-navy/20 rounded-full group-hover:hidden" />
            </div>
        </footer>
      </div>
    </ErrorBoundary>
  );
}

export default App;
