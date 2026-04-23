import { Header } from './components/Organisms/Header';
import { Hero } from './components/Organisms/Hero';
import { Dashboard } from './components/Organisms/Dashboard';
import { DigitalFormEngine } from './components/Organisms/DigitalFormEngine';
import { ResearchVault } from './components/Organisms/ResearchVault';
import { useVoterStore } from './store/useVoterStore';
import { motion, AnimatePresence } from 'framer-motion';
import { ErrorBoundary } from './components/Atoms/ErrorBoundary';

function App() {
  const { view, activeFlow, setActiveFlow } = useVoterStore();

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-[#FDFDFD] selection:bg-civic-navy/10 relative overflow-hidden">
        <Header />
        
        <main className="relative h-screen">
          <AnimatePresence mode="wait">
            {view === 'selection' ? (
              <motion.div
                key="selection"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
                transition={{ duration: 0.6 }}
                className="h-full"
              >
                <Hero />
              </motion.div>
            ) : (
              <motion.div
                key="dashboard"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6 }}
                className="pt-32 px-4 pb-20 max-w-[1600px] mx-auto h-full"
              >
                <Dashboard />
              </motion.div>
            )}
          </AnimatePresence>
        </main>

        {/* Global Sovereign Overlays */}
        <AnimatePresence>
          {activeFlow === 'registration' && (
            <DigitalFormEngine key="form-engine" onClose={() => setActiveFlow(null)} />
          )}
          {activeFlow === 'research' && (
            <ResearchVault key="research-vault" isOpen={true} onClose={() => setActiveFlow(null)} />
          )}
        </AnimatePresence>

        {/* Dynamic Background Noise/Texture */}
        <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-[9999] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay" />
      </div>
    </ErrorBoundary>
  );
}

export default App;
