import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { getLocales } from 'expo-localization';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

import en from './translations/en';
import hi from './translations/hi';
import bn from './translations/bn';

const LANGUAGE_KEY = '@app_language';

const resources = {
  en: { translation: en },
  hi: { translation: hi },
  bn: { translation: bn },
};

// Get default language using expo-localization
const getDefaultLanguage = async () => {
  try {
    // Try to get saved language
    const savedLanguage = await AsyncStorage.getItem(LANGUAGE_KEY);
    if (savedLanguage && resources[savedLanguage as keyof typeof resources]) {
      return savedLanguage;
    }

    // Fall back to device locale
    const locale = getLocales()[0];
    const languageCode = locale.languageCode;
    return resources[languageCode as keyof typeof resources] ? languageCode : 'en';
  } catch (error) {
    console.error('Error getting language:', error);
    return 'en';
  }
};

const i18nInstance = i18n.createInstance();

// Add language change handler with platform check
i18nInstance.on('languageChanged', async (lng) => {
  try {
    if (Platform.OS !== 'web') {
      await AsyncStorage.setItem(LANGUAGE_KEY, lng);
    }
  } catch (error) {
    console.error('Error saving language preference:', error);
  }
});

// Initialize i18n
const initializeI18n = async () => {
  try {
    const defaultLanguage = await getDefaultLanguage();

    await i18nInstance
      .use(initReactI18next)
      .init({
        resources,
        lng: defaultLanguage,
        fallbackLng: 'en',
        interpolation: {
          escapeValue: false,
        },
        react: {
          useSuspense: false,
        },
        compatibilityJSON: 'v3',
      });
  } catch (error) {
    console.error('Error initializing i18n:', error);
    
    // Fallback initialization
    await i18nInstance
      .use(initReactI18next)
      .init({
        resources,
        lng: 'en',
        fallbackLng: 'en',
        interpolation: {
          escapeValue: false,
        },
        react: {
          useSuspense: false,
        },
        compatibilityJSON: 'v3',
      });
  }
};

// Initialize immediately
initializeI18n().catch(console.error);

export default i18nInstance; 