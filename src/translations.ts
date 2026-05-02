export type Language = 'en' | 'hi' | 'kn';

interface TranslationMap {
  [key: string]: Record<Language, string>;
}

export const translations: TranslationMap = {
  // Hero
  select_persona_prefix: { en: 'Select Your', hi: 'अपनी', kn: 'ನಿಮ್ಮ' },
  select_persona_highlight: { en: 'Voter Persona', hi: 'मतदाता श्रेणी', kn: 'ಮತದಾರರ ವರ್ಗ' },
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

  // New Dashboard Keys
  journey_timeline: { en: 'VoterFlow Journey Timeline', hi: 'मतदाता यात्रा समयरेखा', kn: 'ಮತದಾರರ ಪ್ರಯಾಣದ ಸಮಯರೇಖೆ' },
  sync_calendar: { en: 'Sync to Google Calendar', hi: 'गूगल कैलेंडर में सिंक करें', kn: 'ಗೂಗಲ್ ಕ್ಯಾಲೆಂಡರ್‌ಗೆ ಸಿಂಕ್ ಮಾಡಿ' },
  sir_cycle: { en: 'SIR Cycle Start', hi: 'SIR चक्र प्रारंभ', kn: 'SIR ಚಕ್ರ ಪ್ರಾರಂಭ' },
  sir_desc: { en: 'Special Intensive Revision began. Your sector mapping is finalized.', hi: 'विशेष गहन पुनरीक्षण शुरू हुआ। आपका सेक्टर मैपिंग फाइनल हो गया है।', kn: 'ವಿಶೇಷ ತೀವ್ರ ಪರಿಷ್ಕರಣೆ ಪ್ರಾರಂಭವಾಯಿತು. ನಿಮ್ಮ ಸೆಕ್ಟರ್ ಮ್ಯಾಪಿಂಗ್ ಅಂತಿಮಗೊಂಡಿದೆ.' },
  draft_roll: { en: 'Draft Roll Sync', hi: 'ड्राफ्ट रोल सिंक', kn: 'ಕರಡು ಪಟ್ಟಿ ಸಿಂಕ್' },
  draft_desc: { en: 'The Draft Roll is now live. Verify your entry now.', hi: 'ड्राफ्ट रोल अब लाइव है। अभी अपनी प्रविष्टि सत्यापित करें।', kn: 'ಕರಡು ಪಟ್ಟಿ ಈಗ ನೇರಪ್ರಸಾರದಲ್ಲಿದೆ. ನಿಮ್ಮ ನಮೂದನ್ನು ಈಗಲೇ ಪರಿಶೀಲಿಸಿ.' },
  final_pub: { en: 'Final Publication', hi: 'अंतिम प्रकाशन', kn: 'ಅಂತಿಮ ಪ್ರಕಟಣೆ' },
  final_desc: { en: 'Final VoterFlow Roll will be published soon.', hi: 'अंतिम मतदाता सूची जल्द ही प्रकाशित की जाएगी।', kn: 'ಅಂತಿಮ ಮತದಾರರ ಪಟ್ಟಿಯನ್ನು ಶೀಘ್ರದಲ್ಲೇ ಪ್ರಕಟಿಸಲಾಗುವುದು.' },
  elections: { en: 'General Elections', hi: 'आम चुनाव', kn: 'ಸಾರ್ವತ್ರಿಕ ಚುನಾವಣೆಗಳು' },
  elections_desc: { en: 'E-Day. Your polling station is ready for turnout.', hi: 'मतदान का दिन। आपका मतदान केंद्र तैयार है।', kn: 'ಮತದಾನದ ದಿನ. ನಿಮ್ಮ ಮತದಾನ ಕೇಂದ್ರ ಸಿದ್ಧವಾಗಿದೆ.' },
  vf_identity: { en: 'VoterFlow Identity', hi: 'मतदाता पहचान', kn: 'ಮತದಾರರ ಗುರುತು' },
  epic_id: { en: 'EPIC: BEL-2026-0420', hi: 'EPIC: BEL-2026-0420', kn: 'EPIC: BEL-2026-0420' },
  sarvesh_a: { en: 'Sarvesh Arunkumar', hi: 'सर्वेश अरुणकुमार', kn: 'ಸರ್ವೇಶ್ ಅರುಣ್ ಕುಮಾರ್' },
  pc_bengaluru: { en: 'PC: Bengaluru Central', hi: 'क्षेत्र: बेंगलुरु सेंट्रल', kn: 'ಕ್ಷೇತ್ರ: ಬೆಂಗಳೂರು ಸೆಂಟ್ರಲ್' },
  qualifying_date: { en: 'Qualifying: 01-01-2026', hi: 'योग्यता तिथि: 01-01-2026', kn: 'ಅರ್ಹತಾ ದಿನಾಂಕ: 01-01-2026' },
  download_epic: { en: 'Download EPIC', hi: 'EPIC डाउनलोड करें', kn: 'EPIC ಡೌನ್‌ಲೋಡ್ ಮಾಡಿ' },
  registration_suite: { en: 'Registration Suite', hi: 'पंजीकरण सुइट', kn: 'ನೋಂದಣಿ ಸೂಟ್' },
  registration_desc: { en: 'Secure Form 6 engine with automated document verification.', hi: 'स्वचालित दस्तावेज़ सत्यापन के साथ सुरक्षित फॉर्म 6 इंजन।', kn: 'ಸ್ವಯಂಚಾಲಿತ ದಾಖಲೆ ಪರಿಶೀಲನೆಯೊಂದಿಗೆ ಸುರಕ್ಷಿತ ನಮೂನೆ 6 ಎಂಜಿನ್.' },
  progress: { en: 'Application Progress', hi: 'आवेदन की प्रगति', kn: 'ಅರ್ಜಿಯ ಪ್ರಗತಿ' },
  open_wizard: { en: 'Open Digital Wizard', hi: 'डिजिटल विजार्ड खोलें', kn: 'ಡಿಜಿಟಲ್ ವಿಝಾರ್ಡ್ ತೆರೆಯಿರಿ' },
  doc_validator: { en: 'Document Validator', hi: 'दस्तावेज़ सत्यापनकर्ता', kn: 'ದಾಖಲೆ ಪರಿಶೀಲಕ' },
  validator_desc: { en: 'Pre-verify your identity documents against ECI standards.', hi: 'ECI मानकों के खिलाफ अपने पहचान दस्तावेजों को पूर्व-सत्यापित करें।', kn: 'ECI ಮಾನದಂಡಗಳ ವಿರುದ್ಧ ನಿಮ್ಮ ಗುರುತಿನ ದಾಖಲೆಗಳನ್ನು ಪೂರ್ವ-ಪರಿಶೀಲಿಸಿ.' },
  analyze_docs: { en: 'Analyze Documents', hi: 'दस्तावेजों का विश्लेषण करें', kn: 'ದಾಖಲೆಗಳನ್ನು ವಿಶ್ಲೇಷಿಸಿ' },
  complete: { en: 'Complete', hi: 'पूर्ण', kn: 'ಪೂರ್ಣಗೊಂಡಿದೆ' },
  gemini_validator: { en: 'Gemini Sovereign Validator', hi: 'Gemini Sovereign सत्यापनकर्ता', kn: 'Gemini Sovereign ಪರಿಶೀಲಕ' },
  
  // Dashboard & Components Missing Keys
  sir2026_framework: { en: 'SIR 2026 Framework', hi: 'SIR 2026 ढांचा', kn: 'SIR 2026 ಚೌಕಟ್ಟು' },
  sir_status: { en: 'System Operational Status', hi: 'सिस्टम परिचालन स्थिति', kn: 'ಸಿಸ್ಟಮ್ ಕಾರ್ಯಾಚರಣೆಯ ಸ್ಥಿತಿ' },
  sector_mapping: { en: 'Sector Mapping', hi: 'सेक्टर मैपिंग', kn: 'ಸೆಕ್ಟರ್ ಮ್ಯಾಪಿಂಗ್' },
  percent_sync: { en: '85% Synchronized', hi: '85% सिंक्रनाइज़', kn: '85% ಸಿಂಕ್ರೊನೈಸ್ ಮಾಡಲಾಗಿದೆ' },
  document_purge: { en: 'Document Verification', hi: 'दस्तावेज़ सत्यापन', kn: 'ದಾಖಲೆ ಪರಿಶೀಲನೆ' },
  active: { en: 'Active', hi: 'सक्रिय', kn: 'ಸಕ್ರಿಯ' },
  card_gen: { en: 'Voter Card Generation', hi: 'मतदाता कार्ड जनरेशन', kn: 'ಮತದಾರರ ಕಾರ್ಡ್ ಜನರೇಟರ್' },
  upcoming: { en: 'Upcoming', hi: 'आगामी', kn: 'ಮುಂಬರುವ' },
  milestone_details: { en: 'Milestone Progress Details', hi: 'मील के पत्थर की प्रगति का विवरण', kn: 'ಮೈಲಿಗಲ್ಲು ಪ್ರಗತಿಯ ವಿವರಗಳು' },
  protocol_42: { en: 'ECI Protocol v4.2 Active', hi: 'ECI प्रोटोकॉल v4.2 सक्रिय', kn: 'ECI ಪ್ರೋಟೋಕಾಲ್ v4.2 ಸಕ್ರಿಯ' },
  intelligence_hub: { en: 'Sovereign Intelligence Hub', hi: 'Sovereign इंटेलिजेंस हब', kn: 'Sovereign ಇಂಟೆಲಿಜೆನ್ಸ್ ಹಬ್' },
  intelligence_desc: { en: 'Access real-time legislative data and ECI protocols.', hi: 'वास्तविक समय के विधायी डेटा और ECI प्रोटोकॉल तक पहुंचें।', kn: 'ನೈಜ-ಸಮಯದ ಶಾಸಕಾಂಗ ಡೇಟಾ ಮತ್ತು ECI ಪ್ರೋಟೋಕಾಲ್‌ಗಳನ್ನು ಪ್ರವೇಶಿಸಿ.' },
  consult_assistant: { en: 'Consult Gemini Assistant', hi: 'Gemini सहायक से परामर्श करें', kn: 'Gemini ಸಹಾಯಕನೊಂದಿಗೆ ಸಮಾಲೋಚಿಸಿ' },
  sir_revision: { en: 'SIR Revision Cycle', hi: 'SIR पुनरीक्षण चक्र', kn: 'SIR ಪರಿಷ್ಕರಣೆ ಚಕ್ರ' },
  sir_revision_desc: { en: 'Track intensive roll revisions.', hi: 'गहन रोल संशोधनों को ट्रैक करें।', kn: 'ತೀವ್ರವಾದ ರೋಲ್ ಪರಿಷ್ಕರಣೆಗಳನ್ನು ಟ್ರ್ಯಾಕ್ ಮಾಡಿ.' },
  constitutional_rights: { en: 'Constitutional Rights', hi: 'संवैधानिक अधिकार', kn: 'ಸಾಂವಿಧಾನಿಕ ಹಕ್ಕುಗಳು' },
  rights_desc: { en: 'Your legal voting protections.', hi: 'आपकी कानूनी मतदान सुरक्षा।', kn: 'ನಿಮ್ಮ ಕಾನೂನು ಮತದಾನ ರಕ್ಷಣೆಗಳು.' },
  legal_forms: { en: 'Sovereign Legal Forms', hi: 'Sovereign कानूनी फॉर्म', kn: 'Sovereign ಕಾನೂನು ರೂಪಗಳು' },
  forms_desc: { en: 'Interactive ECI form filing.', hi: 'इंटरएक्टिव ECI फॉर्म फाइलिंग।', kn: 'ಸಂವಾದಾತ್ಮಕ ECI ಫಾರ್ಮ್ ಸಲ್ಲಿಕೆ.' },
  eci_helpline: { en: 'ECI National Helpline', hi: 'ECI राष्ट्रीय हेल्पलाइन', kn: 'ECI ರಾಷ್ಟ್ರೀಯ ಸಹಾಯವಾಣಿ' },
  support_desc: { en: '24/7 dedicated support for SIR 2026.', hi: 'SIR 2026 के लिए 24/7 समर्पित सहायता।', kn: 'SIR 2026 ಗಾಗಿ 24/7 ಮೀಸಲಾದ ಬೆಂಬಲ.' },
  national_support: { en: 'National Support', hi: 'राष्ट्रीय सहायता', kn: 'ರಾಷ್ಟ್ರೀಯ ಬೆಂಬಲ' },
  voter_hotline: { en: 'Voter Hotline', hi: 'मतदाता हॉटलाइन', kn: 'ಮತದಾರರ ಹಾಟ್‌ಲೈನ್' },
  connect: { en: 'Connect', hi: 'जुड़ें', kn: 'ಸಂಪರ್ಕಿಸಿ' },
  local_mapping: { en: 'Local Constituency Mapping', hi: 'स्थानीय निर्वाचन क्षेत्र मैपिंग', kn: 'ಸ್ಥಳೀಯ ಕ್ಷೇತ್ರ ಮ್ಯಾಪಿಂಗ್' },
  blo_officer: { en: 'Your Assigned BLO Officer', hi: 'आपका आवंटित BLO अधिकारी', kn: 'ನಿಮ್ಮ ನಿಯೋಜಿತ BLO ಅಧಿಕಾರಿ' },
  find_blo: { en: 'Find BLO', hi: 'BLO खोजें', kn: 'BLO ಹುಡುಕಿ' },
  search_archives: { en: 'Search Archives', hi: 'पुरालेख खोजें', kn: 'ಆರ್ಕೈವ್‌ಗಳನ್ನು ಹುಡುಕಿ' },
};
