import { StyleSheet, ScrollView } from 'react-native';
import { useTranslation } from 'react-i18next';

import { LanguageSelector } from '@/components/settings/LanguageSelector';
import { ThemeSelector } from '@/components/settings/ThemeSelector';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Theme } from '@/constants/Theme';

export default function SettingsScreen() {
  const { t } = useTranslation();

  return (
    <ThemedView style={styles.container}>
      <ScrollView>
        <ThemedText type="title" style={styles.title}>
          {t('settings.title')}
        </ThemedText>
        <LanguageSelector />
        <ThemeSelector />
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    textAlign: 'center',
    padding: Theme.spacing.md,
  },
}); 