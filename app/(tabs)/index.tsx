import { useState } from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import { useTranslation } from 'react-i18next';

import { BirthDetailsForm } from '@/components/forms/BirthDetailsForm';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import type { BirthDetails } from '@/types/birthDetails';
import { Theme } from '@/constants/Theme';

export default function BirthDetailsScreen() {
  const { t } = useTranslation();
  const [birthDetails, setBirthDetails] = useState<BirthDetails | null>(null);

  const handleSubmit = (details: BirthDetails) => {
    setBirthDetails(details);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ThemedView style={styles.container}>
        <ThemedText type="title" style={styles.title}>
          {t('birthDetails.title')}
        </ThemedText>
        <BirthDetailsForm onSubmit={handleSubmit} />
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: Theme.colors.background.dark,
  },
  title: {
    textAlign: 'center',
    padding: Theme.spacing.md,
  },
});
