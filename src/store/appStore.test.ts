import { describe, it, expect } from 'vitest';
import { useAppStore } from './appStore';

describe('AppStore', () => {
  it('should have initial state', () => {
    const state = useAppStore.getState();
    expect(state.isStreaming).toBe(false);
    expect(state.messages).toEqual([]);
  });

  it('should set streaming state', () => {
    useAppStore.getState().setIsStreaming(true);
    expect(useAppStore.getState().isStreaming).toBe(true);
  });

  it('should add message', () => {
    useAppStore.getState().addMessage('test message');
    expect(useAppStore.getState().messages).toContain('test message');
  });

  it('should clear messages', () => {
    useAppStore.getState().addMessage('test message');
    useAppStore.getState().clearMessages();
    expect(useAppStore.getState().messages).toEqual([]);
  });
});
