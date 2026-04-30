# VoterFlow AI: Sovereign Voter Assistant 🗳️✨

[![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)](https://vite.dev/)
[![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)](https://react.dev/)
[![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Gemini](https://img.shields.io/badge/google_gemini-4285F4?style=for-the-badge&logo=google&logoColor=white)](https://deepmind.google/technologies/gemini/)

**VoterFlow AI** is a high-fidelity, proactive digital assistant designed for the **PromptWars 2026** competition. It transforms complex legislative protocols into a guided, interactive, and "Sovereign" user experience by leveraging cutting-edge Generative AI and Google Services.

## 🚀 Chosen Vertical: Civic Tech & Electoral Awareness
VoterFlow AI addresses the **Information Asymmetry** in democratic processes. It simplifies the **Special Intensive Revision (SIR) 2026** and **Form 6/8** workflows for diverse demographics, ensuring no citizen is left behind due to technical or bureaucratic complexity.

## 🛠️ Advanced Google Services Integration

### 1. Gemini 2.5 Flash (Generative Language API)
- **Context-Aware Prompting**: Uses persona-based system instructions for tailored guidance.
- **Streaming Architecture**: Implements `sendMessageStream` for real-time, low-latency UI updates.
- **Search Grounding**: Utilizes `googleSearch` tools to anchor AI responses in verified ECI data and current 2026 legislative revisions.

### 2. Google Maps Platform
- **Satellite Data**: High-resolution orientation for the **Polling Booth Locator**.
- **Geospatial UI**: Interactive mapping with custom markers for sector mapping and BLO synchronization.

### 3. Google Ecosystem Synergy
- **Google Calendar API**: One-click **Sync Timelines** to automate deadline tracking for voters.
- **Google Wallet**: Simulated **Sovereign ID** portability, demonstrating the future of digital civic identities.

## 🧠 Technical Architecture

- **State Engine**: Managed via **Zustand** with persistent middleware for session-stable, O(1) state lookups.
- **UI Architecture**: Follows **Atomic Design Principles** (Atoms, Molecules, Organisms) for maximum component reusability and clean separation of concerns.
- **Deterministic Logic**: Integrated **Vitest** suite ensures the state transitions and readiness calculations are mathematically sound.

## 🛡️ Evaluation Focus Areas

### 1. Code Quality & Maintainability
- **TypeScript Strict Mode**: Zero `any` types in core logic; fully documented with **TSDoc/JSDoc**.
- **Modular Services**: Decoupled AI and State layers for high testability and maintainability.

### 2. Security & Responsible AI
- **Safety Filters**: Implements `safetySettings` (Harassment, Hate Speech, Dangerous Content) to ensure ethical AI interactions.
- **Sanitized State**: No sensitive keys hardcoded; strictly environment-variable driven.

### 3. Performance Engineering (60FPS)
- **GPU Acceleration**: Utilizes `will-change: transform, opacity` and hardware-accelerated animations via **Framer Motion**.
- **Layout Containment**: Uses `contain: layout style` to isolate layout thrashing in complex dashboard grids.
- **Shadow Optimization**: Replaced expensive Gaussian blurs with pseudo-element opacity transitions to eliminate repaints.

### 4. Inclusive & Accessible Design (WCAG 2.1)
- **Keyboard Navigation**: Implemented **Skip to Main Content** links and logical tab-indexing.
- **Screen Reader Support**: Integrated `aria-live` regions for streaming chat and semantic HTML5 structures.
- **Touch-Optimized**: 48px+ touch targets and thumb-optimized **FAB Hub** for mobile usability.

## 📦 How the Solution Works

1. **Intelligent Onboarding**: User selects a persona (e.g., Student/Senior).
2. **Dynamic Dashboard Initialization**: The app hydrates a context-aware UI tailored to the persona's specific legal requirements (e.g., Annexure-II for students).
3. **Grounded AI Consultation**: The Gemini Assistant provides real-time, cited answers using Google Search.
4. **Actionable Training**: Users complete the **EVM Simulator** and sync deadlines to their **Google Calendar**.
5. **Civic Readiness**: The `readinessScore` reaches 100%, signifying a fully prepared, empowered voter.

---
**Built for Google PromptWars 2026 // Sovereign Edition v2.5**
