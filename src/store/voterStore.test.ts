import { describe, it, expect, beforeEach } from 'vitest';
import { useVoterStore } from './useVoterStore';

describe('VoterStore', () => {
  beforeEach(() => {
    useVoterStore.setState({
        persona: null,
        view: 'selection',
        activeTab: 'overview',
        chatMessages: [],
        readinessScore: 0,
        progress: { registration: 0, research: 0, polling: 0 },
        voterName: null
    });
  });

  it('should initialize with default state', () => {
    const state = useVoterStore.getState();
    expect(state.persona).toBe(null);
    expect(state.view).toBe('selection');
    expect(state.readinessScore).toBe(0);
  });

  it('should set persona and transition to dashboard', () => {
    useVoterStore.getState().setPersona('Student');
    const state = useVoterStore.getState();
    expect(state.persona).toBe('Student');
    expect(state.view).toBe('dashboard');
  });

  it('should manage chat history', () => {
    useVoterStore.getState().addChatMessage({ role: 'user', text: 'Hello' });
    expect(useVoterStore.getState().chatMessages).toHaveLength(1);
    expect(useVoterStore.getState().chatMessages[0].text).toBe('Hello');

    useVoterStore.getState().updateLastChatMessage('Hello World');
    expect(useVoterStore.getState().chatMessages[0].text).toBe('Hello World');
  });

  it('should track readiness and progress', () => {
    useVoterStore.getState().addReadiness(20);
    expect(useVoterStore.getState().readinessScore).toBe(20);

    useVoterStore.getState().updateProgress('registration', 100);
    expect(useVoterStore.getState().progress.registration).toBe(100);
  });

  it('should cap readiness score at 100', () => {
    useVoterStore.getState().addReadiness(150);
    expect(useVoterStore.getState().readinessScore).toBe(100);
  });
});
