import { create } from 'zustand';

interface AppState {
  isStreaming: boolean;
  setIsStreaming: (isStreaming: boolean) => void;
  messages: string[];
  addMessage: (message: string) => void;
  clearMessages: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  isStreaming: false,
  setIsStreaming: (isStreaming) => set({ isStreaming }),
  messages: [],
  addMessage: (message) => set((state) => ({ messages: [...state.messages, message] })),
  clearMessages: () => set({ messages: [] }),
}));
