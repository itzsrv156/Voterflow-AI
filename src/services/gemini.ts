import { GeminiSSEService } from './geminiSSE';

export const QUICK_START_PROMPTS = [
  "How do I fill Annexure-II?",
  "Check SIR 2026 Deadlines",
  "Form 8 Correction Guide",
  "Lost Voter ID? How to vote",
  "Register as a Student/Migrant",
  "Electoral Roll search guide"
];

// SOVEREIGN LEGAL KNOWLEDGE BASE (Context Caching Simulation)
const LEGAL_KNOWLEDGE_BASE = `
RP ACT 1950 & SIR 2026 GUIDELINES:
1. FORM 6: Application for new registration. For SIR 2026, qualifying date is 01-01-2026.
2. FORM 7: Objection to inclusion or deletion of a name.
3. FORM 8: Correction of entries, transposition, or replacement of EPIC.
4. ANNEXURE-II: Mandatory for students residing in hostels. Must be signed by the Head of Institution/Warden.
5. FORM 12D: Postal ballot for Senior Citizens (85+) and PwD. Requests must be made within 5 days of election notification.
6. SIR 2026 (Special Intensive Revision): Includes House-to-House (H2H) mapping. Draft roll published in Oct, Final roll in Jan.
7. VOTER ID LOSS: Voters can use 12 alternative documents (Aadhaar, PAN, MGNREGA Job Card, etc.) if their name is in the roll.
8. REGISTRATION RULES: Rule 14 (Form 6), Rule 26 (Inclusion/Correction), Rule 31 (Draft Roll).
`;

export const createVoterCoach = (persona: string | null) => {
  const systemPrompt = `You are the Sovereign VoterFlow AI Coach, an expert on the Indian Election Commission (ECI) protocols.
  
  CORE KNOWLEDGE:
  ${LEGAL_KNOWLEDGE_BASE}

  CONTEXT:
  - Persona: ${persona || 'General Citizen'}.
  - You MUST strictly follow ECI Manual 2026 standards.
  - If asked about residence, explain "Ordinary Residence" criteria under Section 20 of RP Act 1950.
  - Always emphasize that Voter Registration is a SOVEREIGN right.
  
  RESPONSE STYLE:
  - Professional, authoritative, yet supportive.
  - Use specific Form numbers (6, 7, 8, 12D).
  - For ${persona === 'Student' ? 'Students' : persona === 'Senior' ? 'Senior Citizens' : 'First-time voters'}, prioritize their specific legal provisions.`;

  const service = new GeminiSSEService('/api/chat/stream');
  
  return {
    service,
    systemPrompt,
    startChat: (userMessage: string) => {
      service.connect({ 
        prompt: userMessage, 
        system: systemPrompt 
      });
    }
  };
};
