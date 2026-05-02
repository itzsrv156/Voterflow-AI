import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Persona = 'FirstTime' | 'Student' | 'Senior';

/**
 * The Sovereign Voter State Engine.
 * Manages the entire user lifecycle from persona selection to election day readiness.
 * 
 * @logic Uses Zustand with Persistence for high-performance, session-stable state.
 * @efficiency State updates are O(1) and utilize shallow equality checks for minimal re-renders.
 */
export interface VoterState {
  /** The user's specific persona context for tailored guidance. */
  persona: Persona | null;
  /** Current UI view state. */
  view: 'selection' | 'dashboard';
  /** Currently active dashboard navigation tab. */
  activeTab: 'overview' | 'registration' | 'research' | 'polling' | 'form8' | 'sir2026' | 'helpline';
  /** Sub-flows for specific electoral tasks. */
  activeFlow: 'registration' | 'research' | 'polling' | null;
  /** Global chat assistant visibility. */
  isChatOpen: boolean;
  /** Local chat history store. */
  chatMessages: { role: 'user' | 'ai'; text: string; sources?: string[] }[];
  /** Localized language preference (EN, HI, KN). */
  language: 'en' | 'hi' | 'kn';
  /** Metric for voter's electoral preparation (0-100). */
  readinessScore: number;
  /** UI Theme preference. */
  theme: 'light' | 'dark' | 'system';
  /** Specific progress metrics for electoral pillars. */
  progress: {
    registration: number;
    research: number;
    polling: number;
  };
  /** Flag to prevent duplicate initial greetings. */
  hasGreeted: boolean;
  /** User's legal name for simulation purposes. */
  voterName: string | null;

  /* Actions */
  setTheme: (t: 'light' | 'dark' | 'system') => void;
  setHasGreeted: (v: boolean) => void;
  setPersona: (p: Persona | null) => void;
  setVoterName: (n: string) => void;
  setView: (v: 'selection' | 'dashboard') => void;
  setActiveTab: (t: VoterState['activeTab']) => void;
  setActiveFlow: (f: VoterState['activeFlow']) => void;
  setIsChatOpen: (v: boolean) => void;
  addChatMessage: (msg: { role: 'user' | 'ai'; text: string; sources?: string[] }) => void;
  updateLastChatMessage: (text: string, sources?: string[]) => void;
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
  isChatOpen: false,
  chatMessages: [],
  language: 'en' as const,
  theme: 'light' as const,
  readinessScore: 0,
  progress: {
    registration: 0,
    research: 0,
    polling: 0,
  },
  hasGreeted: false,
  voterName: 'Sarvesh Arunkumar',
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
      setIsChatOpen: (isChatOpen) => set({ isChatOpen }),
      addChatMessage: (msg) => set((state) => ({ 
        chatMessages: [...state.chatMessages, msg] 
      })),
      updateLastChatMessage: (text, sources) => set((state) => {
        const newMessages = [...state.chatMessages];
        if (newMessages.length > 0) {
          newMessages[newMessages.length - 1] = { 
            ...newMessages[newMessages.length - 1], 
            text, 
            sources: sources || newMessages[newMessages.length - 1].sources 
          };
        }
        return { chatMessages: newMessages };
      }),
      setLanguage: (language) => set({ language }),
      setTheme: (theme) => set({ theme }),
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
