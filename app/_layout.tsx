import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useCallback } from 'react';
import { I18nextProvider } from 'react-i18next';
import { View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import i18n from '@/i18n/setup';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Theme } from '@/constants/Theme';
import { LanguageProvider } from '@/contexts/LanguageContext';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [fontsLoaded, fontError] = useFonts({
    'ionicons': require('@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/Ionicons.ttf'),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <I18nextProvider i18n={i18n}>
      <LanguageProvider>
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
            <Stack>
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            </Stack>
          </View>
        </ThemeProvider>
      </LanguageProvider>
    </I18nextProvider>
  );
}
