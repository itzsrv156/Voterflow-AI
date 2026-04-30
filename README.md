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
- **Search Grounding**: Utilizes `googleSearch` tools to anchor AI responses in verified ECI data.

### 2. Google Maps Platform
- **Satellite Orientation**: High-resolution mapping for the **Polling Booth Locator**.
- **Geospatial UI**: Interactive custom markers for BLO synchronization.

### 3. Google Ecosystem Synergy
- **Google Calendar API**: One-click **Sync Timelines** for automated deadline tracking.
- **Google Wallet**: Simulated **Sovereign ID** portability for digital civic identities.

## ⚡ Performance Engineering (60FPS Standard)

VoterFlow AI is engineered for ultra-smooth interactions, following strict GPU-offloading protocols:
- **GPU Acceleration**: Applied `will-change: transform, opacity` to all animated surfaces to utilize hardware composition.
- **Shadow Optimization**: Replaced expensive Gaussian box-shadows with **pseudo-element opacity transitions**. This prevents costly layout repaints during hover/interaction states.
- **Layout Containment**: Implemented `contain: layout style` on complex dashboard organisms to isolate browser layout calculations.
- **Hardware-Only Animations**: Animations are strictly limited to `transform` and `opacity` properties, bypassing the browser's CPU-intensive layout and paint cycles.

## 🛡️ Evaluation Focus Areas

### 1. Code Quality & Security
- **TypeScript Strict Mode**: Zero `any` types; full **TSDoc/JSDoc** documentation for auditability.
- **Defense-in-Depth**: Integrated **DOMPurify** sanitization for all AI-generated content to neutralize XSS risks.
- **Resilience**: Global **ErrorBoundary** implementation for graceful failure recovery.

### 2. Security & Responsible AI
- **Safety Filters**: Configured `safetySettings` (Harassment, Hate Speech) in the Gemini core.
- **Sanitized State**: Strictly environment-variable driven; no hardcoded credentials.

### 3. Inclusive & Accessible Design (WCAG 2.1)
- **Keyboard Navigation**: **Skip to Main Content** links and logical tab-indexing.
- **Screen Reader Support**: `aria-live` regions for streaming chat and semantic HTML5 landmarks.
- **Localization**: Full triple-language support (English, Hindi, Kannada) for all dashboard metrics.

### 4. Testing & Validation
- **Integration Suite**: End-to-end state validation via **Vitest**, covering the entire "Sovereign Voter Journey."

## 📦 How the Solution Works

1. **Intelligent Onboarding**: User selects a persona (Student/Senior/New).
2. **Dynamic Dashboard Hydration**: UI tailors goals and legal requirements to the persona.
3. **Grounded AI Consultation**: Gemini provides cited answers using real-time Google Search.
4. **Actionable Training**: Users complete the **EVM Simulator** and sync deadlines.
5. **Civic Readiness**: The `readinessScore` hits 100%, signifying a fully prepared voter.

---
**Built for Google PromptWars 2026 // Sovereign Edition v3.0 // Final Hardened Build**
