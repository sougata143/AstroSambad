import { StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';

import { HoroscopeChart } from '@/components/horoscope/HoroscopeChart';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Card } from '@/components/common/Card';
import { Theme } from '@/constants/Theme';
import type { BirthDetails } from '@/types/birthDetails';

export default function HoroscopeScreen() {
  const params = useLocalSearchParams<{ birthDetails?: string }>();
  const [birthDetails, setBirthDetails] = useState<BirthDetails | null>(null);

  useEffect(() => {
    const loadBirthDetails = async () => {
      try {
        // First try to get from params
        if (params.birthDetails) {
          setBirthDetails(JSON.parse(params.birthDetails));
          return;
        }

        // If not in params, try to get from AsyncStorage
        const storedDetails = await AsyncStorage.getItem('birthDetails');
        if (storedDetails) {
          setBirthDetails(JSON.parse(storedDetails));
        }
      } catch (error) {
        console.error('Error loading birth details:', error);
      }
    };

    loadBirthDetails();
  }, [params.birthDetails]);

  return (
    <ThemedView style={styles.container}>
      {birthDetails ? (
        <HoroscopeChart birthDetails={birthDetails} />
      ) : (
        <Card style={styles.card}>
          <ThemedText style={styles.noDataText}>
            Please enter birth details first
          </ThemedText>
        </Card>
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    margin: Theme.spacing.md,
  },
  noDataText: {
    textAlign: 'center',
    color: Theme.colors.text.muted.light,
    padding: Theme.spacing.lg,
  },
}); 