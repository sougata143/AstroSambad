import { StyleSheet, View } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { Theme } from '@/constants/Theme';
import type { BirthDetails } from '@/types/birthDetails';
import { HoroscopeCalculator } from '@/services/horoscopeCalculator';

interface Props {
  birthDetails: BirthDetails;
}

export function TransitPredictions({ birthDetails }: Props) {
  const currentTransits = [
    {
      planet: 'Jupiter',
      position: 'Taurus - 5th House',
      effect: 'Favorable period for education and children related matters',
      strength: 85,
    },
    {
      planet: 'Saturn',
      position: 'Aquarius - 2nd House',
      effect: 'Focus on financial stability and family matters',
      strength: 75,
    },
    {
      planet: 'Rahu',
      position: 'Pisces - 3rd House',
      effect: 'New opportunities in communication and short travels',
      strength: 65,
    },
  ];

  return (
    <View style={styles.container}>
      <ThemedText style={styles.title}>Transit Analysis</ThemedText>

      <View style={styles.transitContainer}>
        {currentTransits.map((transit, index) => (
          <View key={index} style={styles.transitItem}>
            <View style={styles.transitHeader}>
              <ThemedText style={styles.planetName}>{transit.planet}</ThemedText>
              <ThemedText style={styles.position}>{transit.position}</ThemedText>
            </View>
            <ThemedText style={styles.effect}>{transit.effect}</ThemedText>
            <View style={styles.strengthBar}>
              <View 
                style={[
                  styles.strengthFill,
                  { width: `${transit.strength}%` }
                ]} 
              />
            </View>
          </View>
        ))}
      </View>
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
  transitContainer: {
    gap: Theme.spacing.md,
  },
  transitItem: {
    gap: Theme.spacing.sm,
    padding: Theme.spacing.md,
    backgroundColor: Theme.colors.surface.light,
    borderRadius: Theme.borderRadius.md,
  },
  transitHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  planetName: {
    fontSize: Theme.typography.body.fontSize,
    fontWeight: '600',
    color: Theme.colors.primary,
  },
  position: {
    fontSize: Theme.typography.body.fontSize,
    color: Theme.colors.text.muted.light,
  },
  effect: {
    fontSize: Theme.typography.body.fontSize,
    color: Theme.colors.text.light,
    lineHeight: 24,
  },
  strengthBar: {
    height: 4,
    backgroundColor: Theme.colors.border.light,
    borderRadius: Theme.borderRadius.full,
    overflow: 'hidden',
    marginTop: Theme.spacing.xs,
  },
  strengthFill: {
    height: '100%',
    backgroundColor: Theme.colors.primary,
    borderRadius: Theme.borderRadius.full,
  },
}); 