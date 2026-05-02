import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Laptop, ChevronDown } from 'lucide-react';
import { useVoterStore } from '../../store/useVoterStore';
import { useState, useEffect } from 'react';
import { cn } from '../../lib/utils';

/**
 * Sovereign Theme Control Engine.
 * Manages the visual energy of the VoterFlow ecosystem.
 */
export const ThemeToggle = () => {
    const { theme, setTheme } = useVoterStore();
    const [isOpen, setIsOpen] = useState(false);

    // Apply theme to document element
    useEffect(() => {
        const root = window.document.documentElement;
        if (theme === 'system') {
            const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
            root.classList.remove('light', 'dark');
            root.classList.add(systemTheme);
        } else {
            root.classList.remove('light', 'dark');
            root.classList.add(theme);
        }
    }, [theme]);

    const themes = [
        { id: 'light', icon: Sun, label: 'Light' },
        { id: 'dark', icon: Moon, label: 'Dark' },
        { id: 'system', icon: Laptop, label: 'System' },
    ] as const;

    const ActiveIcon = themes.find(t => t.id === theme)?.icon || Sun;

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-3 py-1.5 bg-white/60 dark:bg-black/40 backdrop-blur-xl border border-white/40 dark:border-white/10 rounded-xl shadow-sm hover:shadow-md transition-all group"
            >
                <ActiveIcon className="w-4 h-4 text-civic-navy dark:text-civic-saffron transition-transform group-hover:scale-110" />
                <ChevronDown className={cn("w-3 h-3 text-gray-400 transition-transform duration-300", isOpen ? "rotate-180" : "")} />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <>
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="fixed inset-0 z-40"
                        />
                        <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                            className="absolute right-0 mt-2 w-36 glass rounded-2xl p-2 z-50 shadow-2xl border border-white/20"
                        >
                            <div className="space-y-1">
                                {themes.map((t) => (
                                    <button
                                        key={t.id}
                                        onClick={() => {
                                            setTheme(t.id);
                                            setIsOpen(false);
                                        }}
                                        className={cn(
                                            "w-full flex items-center gap-3 px-3 py-2 rounded-xl text-[10px] font-bold transition-all",
                                            theme === t.id 
                                                ? "bg-civic-navy text-white shadow-lg" 
                                                : "text-gray-500 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/5"
                                        )}
                                    >
                                        <t.icon className="w-3.5 h-3.5" />
                                        {t.label}
                                    </button>
                                ))}
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
};
