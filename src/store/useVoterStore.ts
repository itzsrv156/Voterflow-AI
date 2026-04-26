import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Persona = 'FirstTime' | 'Student' | 'Senior';

export interface VoterState {
  persona: Persona | null;
  view: 'selection' | 'dashboard';
  activeTab: 'overview' | 'registration' | 'research' | 'polling' | 'form8' | 'sir2026' | 'helpline';
  activeFlow: 'registration' | 'research' | 'polling' | null;
  language: 'en' | 'hi' | 'kn';
  readinessScore: number;
  progress: {
    registration: number;
    research: number;
    polling: number;
  };
  hasGreeted: boolean;
  voterName: string | null;
  setHasGreeted: (v: boolean) => void;
  setPersona: (p: Persona | null) => void;
  setVoterName: (n: string) => void;
  setView: (v: 'selection' | 'dashboard') => void;
  setActiveTab: (t: VoterState['activeTab']) => void;
  setActiveFlow: (f: VoterState['activeFlow']) => void;
  setLanguage: (l: 'en' | 'hi' | 'kn') => void;
  addReadiness: (amount: number) => void;
  updateProgress: (key: keyof VoterState['progress'], val: number) => void;
  resetStore: () => void;
}

const initialState = {
  persona: null,
  view: 'selection' as const,
  activeTab: 'overview' as const,
  activeFlow: null,
  language: 'en' as const,
  readinessScore: 0,
  progress: {
    registration: 0,
    research: 0,
    polling: 0,
  },
  hasGreeted: false,
  voterName: null,
};

export const useVoterStore = create<VoterState>()(
  persist(
    (set) => ({
      ...initialState,
      setPersona: (persona) => set({ persona, view: 'dashboard' }),
      setVoterName: (voterName) => set({ voterName }),
      setView: (view) => set({ view }),
      setActiveTab: (activeTab) => set({ activeTab }),
      setActiveFlow: (activeFlow) => set({ activeFlow }),
      setLanguage: (language) => set({ language }),
      setHasGreeted: (hasGreeted) => set({ hasGreeted }),
      addReadiness: (amount) => set((state) => ({ 
        readinessScore: Math.min(100, state.readinessScore + amount) 
      })),
      updateProgress: (key, val) => set((state) => ({
        progress: { ...state.progress, [key]: val }
      })),
      resetStore: () => {
        localStorage.clear();
        set(initialState);
        window.location.reload();
      },
    }),
    {
      name: 'voter-storage',
    }
  )
);
