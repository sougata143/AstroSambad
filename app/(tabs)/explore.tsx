import { StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

import { HoroscopeChart } from '@/components/horoscope/HoroscopeChart';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import type { BirthDetails } from '@/types/birthDetails';

export default function ExploreScreen() {
  const params = useLocalSearchParams<{ birthDetails?: string }>();
  const birthDetails: BirthDetails | null = params.birthDetails 
    ? JSON.parse(params.birthDetails) 
    : null;

  return (
    <ThemedView style={styles.container}>
      {birthDetails ? (
        <HoroscopeChart birthDetails={birthDetails} />
      ) : (
        <ThemedText>Please enter birth details first</ThemedText>
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});
