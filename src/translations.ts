export type Language = 'en' | 'hi' | 'kn';

interface TranslationMap {
  [key: string]: Record<Language, string>;
}

export const translations: TranslationMap = {
  // Hero
  select_persona: { en: 'Select Your Voter Persona', hi: 'अपनी मतदाता श्रेणी चुनें', kn: 'ನಿಮ್ಮ ಮತದಾರರ ವರ್ಗವನ್ನು ಆಯ್ಕೆಮಾಡಿ' },
  persona_desc: { en: 'Empowering every voice in the democracy. Choose a profile to begin.', hi: 'लोकतंत्र में हर आवाज को सशक्त बनाना। शुरू करने के लिए एक प्रोफाइल चुनें।', kn: 'ಪ್ರಜಾಪ್ರಭುತ್ವದಲ್ಲಿ ಪ್ರತಿಯೊಂದು ಧ್ವನೆಯನ್ನು ಸಬಲೀಕರಣಗೊಳಿಸುವುದು. ಪ್ರಾರಂಭಿಸಲು ಪ್ರೊಫೈಲ್ ಆಯ್ಕೆಮಾಡಿ.' },
  persona_firsttime: { en: 'First-Time Voter', hi: 'पहली बार मतदाता', kn: 'ಮೊದಲ ಬಾರಿ ಮತದಾರ' },
  persona_student: { en: 'Student / Migrant', hi: 'छात्र / प्रवासी', kn: 'ವಿದ್ಯಾರ್ಥಿ / ವಲಸೆಗಾರ' },
  persona_senior: { en: 'Senior Citizen', hi: 'वरಿಷ್ಠ नागरिक', kn: 'ಹಿರಿಯ ನಾಗರಿಕ' },
  persona_firsttime_desc: { en: 'Just turned 18? Begin your voting journey with step-by-step registration guidance.', hi: 'अभी 18 साल के हुए? चरण-दर-चरण पंजीकरण मार्गदर्शन के साथ अपनी मतदान यात्रा शुरू करें।', kn: 'ಈಗಷ್ಟೇ 18 ವರ್ಷ ತುಂಬಿದೆಯೇ? ಹಂತ-ಹಂತದ ನೋಂದಣಿ ಮಾರ್ಗದರ್ಶನದೊಂದಿಗೆ ನಿಮ್ಮ ಮತದಾನದ ಪ್ರಯಾಣವನ್ನು ಪ್ರಾರಂಭಿಸಿ.' },
  persona_student_desc: { en: 'Studying away from home? Learn about Form 6 and hostel residence rules.', hi: 'घर से दूर पढ़ रहे हैं? फॉर्म 6 और छात्रावास निवास नियमों के बारे में जानें।', kn: 'ಮನೆಯಿಂದ ದೂರ ಓದುತ್ತಿದ್ದೀರಾ? ನಮೂನೆ 6 ಮತ್ತು ಹಾಸ್ಟೆಲ್ ನಿವಾಸದ ನಿಯಮಗಳ ಬಗ್ಗೆ ತಿಳಿಯಿರಿ.' },
  persona_senior_desc: { en: '80+ or a priority voter? Explore home voting options and assisted services.', hi: '80+ या प्राथमिकता वाले मतदाता? होम वोटिंग विकल्पों और सहायता प्राप्त सेवाओं का पता लगाएं।', kn: '80+ ಅಥವಾ ಆದ್ಯತೆಯ ಮತದಾರರೇ? ಮನೆ ಮತದಾನದ ಆಯ್ಕೆಗಳು ಮತ್ತು ನೆರವಿನ ಸೇವೆಗಳನ್ನು ಅನ್ವೇಷಿಸಿ.' },

  // Dashboard
  active_profile: { en: 'Active Profile', hi: 'सक्रिय प्रोफ़ाइल', kn: 'ಸಕ್ರಿಯ ಪ್ರೊಫೈಲ್' },
  dashboard: { en: 'Dashboard', hi: 'डैशबोर्ड', kn: 'ಡ್ಯಾಶ್‌ಬೋರ್ಡ್' },
  reset: { en: 'Reset Profile', hi: 'प्रोफ़ाइल रीसेट करें', kn: 'ಪ್ರೊಫೈಲ್ ರಿಸೆಟ್ ಮಾಡಿ' },
  exit: { en: 'Exit Session', hi: 'सत्र समाप्त करें', kn: 'ಅಧಿವೇಶನ ಮುಕ್ತಾಯ' },

  // Sidebar
  control_center: { en: 'Control Center', hi: 'नियंत्रण केंद्र', kn: 'ನಿಯಂತ್ರಣ ಕೇಂದ್ರ' },
  form8: { en: 'Form 8 Corrections', hi: 'फॉर्म 8 सुधार', kn: 'ನಮೂನೆ 8 ತಿದ್ದುಪಡಿಗಳು' },
  sir2026: { en: 'SIR 2026 (Special Intensive Revision)', hi: 'SIR 2026 (विशेष गहन पुनरीक्षण)', kn: 'SIR 2026 (ವಿಶೇಷ ತೀವ್ರ ಪರಿಷ್ಕರಣೆ)' },
  helpline: { en: 'Voter Helpline', hi: 'मतदाता हेल्पलाइन', kn: 'ಮತದಾರರ ಸಹಾಯವಾಣಿ' },

  // Tabs
  overview: { en: 'Overview', hi: 'अवलोकन', kn: 'ಅವಲೋಕನ' },
  registration: { en: 'Registration', hi: 'पंजीकरण', kn: 'ನೋಂದಣಿ' },
  research: { en: 'Research Vault', hi: 'अनुसंधान वॉल्ट', kn: 'अनुसंधान वॉल्ट' },
  polling: { en: 'EVM Simulator', hi: 'EVM सिम्युलेटर', kn: 'EVM ಸಿಮ್ಯುಲೇಟರ್' },

  // Chat
  ai_coach: { en: 'AI Voter Coach', hi: 'AI मतदाता कोच', kn: 'AI ಮತದಾರರ ತರಬೇತುದಾರ' },
  ask_query: { en: 'Ask your query...', hi: 'अपना प्रश्न पूछें...', kn: 'ನಿಮ್ಮ ಪ್ರಶ್ನೆಯನ್ನು ಕೇಳಿ...' },
  
  // Legal Hub
  legal_revision: { en: 'Special Intensive Revision', hi: 'विशेष गहन पुनरीक्षण', kn: 'ವಿಶೇಷ ತೀವ್ರ ಪರಿಷ್ಕರಣೆ' },
  legal_ordinary_residence: { en: 'Ordinary Residence Protocol', hi: 'सामान्य निवास प्रोटोकॉल', kn: 'ಸಾಮಾನ್ಯ ನಿವಾಸ ಪ್ರೋಟೋಕಾಲ್' },
  legal_form6: { en: 'Form 6: New Registration', hi: 'फॉर्म 6: नया पंजीकरण', kn: 'ನಮೂನೆ 6: ಹೊಸ ನೋಂದಣಿ' },
  legal_form8: { en: 'Form 8: Data Integrity', hi: 'फॉर्म 8: डेटा अखंडता', kn: 'ನಮೂನೆ 8: ಡೇಟಾ ಸಮಗ್ರತೆ' },
  legal_polling_booth: { en: 'Constituency Mapping', hi: 'निर्वाचन क्षेत्र मैपिंग', kn: 'ಕ್ಷೇತ್ರ ಮ್ಯಾಪಿಂಗ್' },
  legal_gemini_vision: { en: 'Gemini Multimodal OCR', hi: 'Gemini मल्टीमॉडल OCR', kn: 'Gemini ಮಲ್ಟಿಮೋಡಲ್ OCR' },
};
