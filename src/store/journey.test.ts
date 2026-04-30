import { describe, it, expect, beforeEach } from 'vitest';
import { useVoterStore } from './useVoterStore';

/**
 * Sovereign Integration Test: User Journey
 * Validates the end-to-end state flow of a voter from persona selection to goal achievement.
 */
describe('Integration: Sovereign Voter Journey', () => {
    beforeEach(() => {
        useVoterStore.setState({
            persona: null,
            view: 'selection',
            activeTab: 'overview',
            chatMessages: [],
            readinessScore: 0,
            progress: { registration: 0, research: 0, polling: 0 },
            voterName: null,
            hasGreeted: false
        });
    });

    it('should complete a full student voter cycle correctly', () => {
        const store = useVoterStore.getState();

        // 1. Initial State Check
        expect(store.view).toBe('selection');
        expect(store.readinessScore).toBe(0);

        // 2. Persona Selection (Student)
        useVoterStore.getState().setPersona('Student');
        expect(useVoterStore.getState().persona).toBe('Student');
        expect(useVoterStore.getState().view).toBe('dashboard');

        // 3. User Identification
        useVoterStore.getState().setVoterName('Rohan Sharma');
        expect(useVoterStore.getState().voterName).toBe('Rohan Sharma');

        // 4. Progress Tracking (Registration Pillar)
        useVoterStore.getState().updateProgress('registration', 100);
        useVoterStore.getState().addReadiness(30);
        
        let currentState = useVoterStore.getState();
        expect(currentState.progress.registration).toBe(100);
        expect(currentState.readinessScore).toBe(30);

        // 5. Research Pillar
        useVoterStore.getState().updateProgress('research', 50);
        useVoterStore.getState().addReadiness(20);
        expect(useVoterStore.getState().readinessScore).toBe(50);

        // 6. Polling Pillar (Simulation Completion)
        useVoterStore.getState().updateProgress('polling', 100);
        useVoterStore.getState().addReadiness(50);
        
        // 7. Goal State Verification
        const finalState = useVoterStore.getState();
        expect(finalState.readinessScore).toBe(100);
        expect(finalState.progress.polling).toBe(100);
        expect(finalState.activeTab).toBe('overview');
    });
});
