import { StyleSheet, View } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { Theme } from '@/constants/Theme';
import type { BirthDetails } from '@/types/birthDetails';
import { HoroscopeCalculator } from '@/services/horoscopeCalculator';
import { DashaChart } from './DashaChart';

interface Props {
  birthDetails: BirthDetails;
}

export function DashaPredictions({ birthDetails }: Props) {
  const horoscopeData = HoroscopeCalculator.calculateHoroscope(birthDetails);
  const { mahadasha, antardasha } = horoscopeData.dashas;

  return (
    <View style={styles.container}>
      <ThemedText style={styles.title}>Vimshottari Dasha Analysis</ThemedText>
      <DashaChart 
        mahadasha={mahadasha}
        antardasha={antardasha}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: Theme.spacing.lg,
  },
  title: {
    fontSize: Theme.typography.subtitle.fontSize,
    fontWeight: '600',
    color: Theme.colors.text.light,
  },
}); 