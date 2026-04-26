import { type ReactNode } from 'react';
import { useVoterStore } from './store/useVoterStore';
import { translations } from './translations';
import { LanguageContext } from './LanguageContext';

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const language = useVoterStore((state) => state.language);
  const setLanguage = useVoterStore((state) => state.setLanguage);

  const t = (key: string): string => {
    const translation = translations[key];
    if (!translation) {
      return key;
    }
    return translation[language] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
