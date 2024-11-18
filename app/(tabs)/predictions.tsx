import { StyleSheet, ScrollView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';

import { DashaPredictions } from '@/components/predictions/DashaPredictions';
import { TransitPredictions } from '@/components/predictions/TransitPredictions';
import { YearlyPredictions } from '@/components/predictions/YearlyPredictions';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Card } from '@/components/common/Card';
import { Theme } from '@/constants/Theme';
import type { BirthDetails } from '@/types/birthDetails';

export default function PredictionsScreen() {
  const params = useLocalSearchParams<{ birthDetails?: string }>();
  const [birthDetails, setBirthDetails] = useState<BirthDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadBirthDetails = async () => {
      try {
        setIsLoading(true);
        let details = null;

        // First try to get from params
        if (params.birthDetails) {
          details = JSON.parse(params.birthDetails);
        } else {
          // If not in params, try to get from AsyncStorage
          const storedDetails = await AsyncStorage.getItem('birthDetails');
          if (storedDetails) {
            details = JSON.parse(storedDetails);
          }
        }

        setBirthDetails(details);
      } catch (error) {
        console.error('Error loading birth details:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadBirthDetails();
  }, [params.birthDetails]);

  if (isLoading) {
    return (
      <ThemedView style={styles.container}>
        <ThemedText>Loading...</ThemedText>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <ThemedText type="title" style={styles.title}>
          Future Predictions
        </ThemedText>
        {birthDetails ? (
          <>
            <Card style={styles.card}>
              <DashaPredictions birthDetails={birthDetails} />
            </Card>
            <Card style={styles.card}>
              <TransitPredictions birthDetails={birthDetails} />
            </Card>
            <Card style={styles.card}>
              <YearlyPredictions birthDetails={birthDetails} />
            </Card>
          </>
        ) : (
          <Card style={styles.card}>
            <ThemedText style={styles.noDataText}>
              Please enter birth details first
            </ThemedText>
          </Card>
        )}
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
  card: {
    margin: Theme.spacing.md,
  },
  noDataText: {
    textAlign: 'center',
    color: Theme.colors.text.muted.light,
    padding: Theme.spacing.lg,
  },
}); 