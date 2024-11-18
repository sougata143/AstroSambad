import { createContext, useContext, useEffect, useState } from 'react';
import { getLocales } from 'expo-localization';
import AsyncStorage from '@react-native-async-storage/async-storage';
import i18n from '@/i18n/setup';

const LANGUAGE_KEY = '@app_language';

type LanguageContextType = {
  currentLanguage: string;
  changeLanguage: (lang: string) => Promise<void>;
};

const LanguageContext = createContext<LanguageContextType>({
  currentLanguage: 'en',
  changeLanguage: async () => {},
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [currentLanguage, setCurrentLanguage] = useState(getLocales()[0].languageCode);

  useEffect(() => {
    // Load saved language on app start
    loadSavedLanguage();
  }, []);

  const loadSavedLanguage = async () => {
    try {
      const savedLanguage = await AsyncStorage.getItem(LANGUAGE_KEY);
      if (savedLanguage) {
        await changeLanguage(savedLanguage);
      }
    } catch (error) {
      console.error('Error loading saved language:', error);
    }
  };

  const changeLanguage = async (lang: string) => {
    try {
      await i18n.changeLanguage(lang);
      setCurrentLanguage(lang);
      await AsyncStorage.setItem(LANGUAGE_KEY, lang);
    } catch (error) {
      console.error('Error changing language:', error);
    }
  };

  return (
    <LanguageContext.Provider value={{ currentLanguage, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext); 