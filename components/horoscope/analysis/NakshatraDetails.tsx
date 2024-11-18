import { View, StyleSheet } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { Theme } from '@/constants/Theme';
import { HoroscopeCalculator } from '@/services/horoscopeCalculator';

interface Props {
  horoscopeData: {
    planets: {
      moon?: {
        nakshatra: number;
        nakshatraPada: number;
      };
    };
  };
}

export function NakshatraDetails({ horoscopeData }: Props) {
  const moonData = horoscopeData.planets.moon;
  const nakshatraName = moonData ? 
    HoroscopeCalculator.getNakshatraName(moonData.nakshatra) : 
    'Unknown';
  const pada = moonData?.nakshatraPada ?? 1;

  const getNakshatraDeity = (nakshatra: string): string => {
    const deities: Record<string, string> = {
      'Ashwini': 'Ashwini Kumaras',
      'Bharani': 'Yama',
      'Krittika': 'Agni',
      // Add more mappings as needed
    };
    return deities[nakshatra] || 'Unknown';
  };

  const getNakshatraElement = (nakshatra: string): string => {
    const elements: Record<string, string> = {
      'Ashwini': 'Air',
      'Bharani': 'Fire',
      'Krittika': 'Fire',
      // Add more mappings as needed
    };
    return elements[nakshatra] || 'Unknown';
  };

  const getNakshatraSymbol = (nakshatra: string): string => {
    const symbols: Record<string, string> = {
      'Ashwini': 'Horse Head',
      'Bharani': 'Yoni',
      'Krittika': 'Razor',
      // Add more mappings as needed
    };
    return symbols[nakshatra] || 'Unknown';
  };

  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <ThemedText style={styles.sectionTitle}>Birth Nakshatra</ThemedText>
        <ThemedText style={styles.nakshatraName}>
          {nakshatraName} (Pada {pada})
        </ThemedText>
        <ThemedText style={styles.description}>
          {`Your birth nakshatra ${nakshatraName} indicates your innate characteristics and life path.`}
        </ThemedText>
      </View>
      
      <View style={styles.qualities}>
        <View style={styles.qualityItem}>
          <ThemedText style={styles.qualityLabel}>Deity</ThemedText>
          <ThemedText style={styles.qualityValue}>
            {getNakshatraDeity(nakshatraName)}
          </ThemedText>
        </View>
        <View style={styles.qualityItem}>
          <ThemedText style={styles.qualityLabel}>Element</ThemedText>
          <ThemedText style={styles.qualityValue}>
            {getNakshatraElement(nakshatraName)}
          </ThemedText>
        </View>
        <View style={styles.qualityItem}>
          <ThemedText style={styles.qualityLabel}>Symbol</ThemedText>
          <ThemedText style={styles.qualityValue}>
            {getNakshatraSymbol(nakshatraName)}
          </ThemedText>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: Theme.spacing.lg,
  },
  section: {
    gap: Theme.spacing.sm,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Theme.colors.text.light,
  },
  nakshatraName: {
    fontSize: 20,
    fontWeight: '700',
    color: Theme.colors.primary,
  },
  description: {
    fontSize: 14,
    color: Theme.colors.text.muted.light,
    lineHeight: 20,
  },
  qualities: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: Theme.spacing.md,
  },
  qualityItem: {
    flex: 1,
    alignItems: 'center',
    gap: Theme.spacing.xs,
  },
  qualityLabel: {
    fontSize: 12,
    color: Theme.colors.text.muted.light,
  },
  qualityValue: {
    fontSize: 14,
    fontWeight: '600',
    color: Theme.colors.text.light,
  },
}); 