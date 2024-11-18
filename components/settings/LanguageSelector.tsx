import { StyleSheet, Pressable } from 'react-native';
import { useTranslation } from 'react-i18next';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Theme } from '@/constants/Theme';
import { Card } from '@/components/common/Card';
import { useLanguage } from '@/contexts/LanguageContext';

export function LanguageSelector() {
  const { t } = useTranslation();
  const { currentLanguage, changeLanguage } = useLanguage();

  const languages = [
    { code: 'en', label: 'English', nativeLabel: 'English' },
    { code: 'hi', label: 'Hindi', nativeLabel: 'हिंदी' },
    { code: 'bn', label: 'Bengali', nativeLabel: 'বাংলা' },
  ];

  const handleLanguageChange = async (langCode: string) => {
    try {
      await changeLanguage(langCode);
    } catch (error) {
      console.error('Error changing language:', error);
    }
  };

  return (
    <Card style={styles.container}>
      <ThemedText style={styles.title}>{t('settings.language')}</ThemedText>
      <ThemedView style={styles.languageList}>
        {languages.map((lang) => (
          <Pressable
            key={lang.code}
            style={[
              styles.languageOption,
              currentLanguage === lang.code && styles.selectedOption,
            ]}
            onPress={() => handleLanguageChange(lang.code)}>
            <ThemedText
              style={[
                styles.languageLabel,
                currentLanguage === lang.code && styles.selectedLabel,
              ]}>
              {lang.label}
            </ThemedText>
            <ThemedText
              style={[
                styles.nativeLabel,
                currentLanguage === lang.code && styles.selectedLabel,
              ]}>
              {lang.nativeLabel}
            </ThemedText>
          </Pressable>
        ))}
      </ThemedView>
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: Theme.spacing.md,
  },
  title: {
    fontSize: Theme.typography.subtitle.fontSize,
    fontWeight: '600',
    marginBottom: Theme.spacing.md,
    color: Theme.colors.text.light,
  },
  languageList: {
    gap: Theme.spacing.sm,
  },
  languageOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: Theme.spacing.md,
    borderRadius: Theme.borderRadius.md,
    backgroundColor: Theme.colors.surface.light,
    borderWidth: 1,
    borderColor: Theme.colors.border.light,
  },
  selectedOption: {
    backgroundColor: Theme.colors.primary,
    borderColor: Theme.colors.primary,
  },
  languageLabel: {
    fontSize: Theme.typography.body.fontSize,
    color: Theme.colors.text.light,
  },
  nativeLabel: {
    fontSize: Theme.typography.body.fontSize,
    color: Theme.colors.text.muted.light,
  },
  selectedLabel: {
    color: Theme.colors.background.light,
  },
}); 