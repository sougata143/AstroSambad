import { StyleSheet, View } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { Theme } from '@/constants/Theme';
import type { BirthDetails } from '@/types/birthDetails';

interface Props {
  birthDetails: BirthDetails;
}

export function YearlyPredictions({ birthDetails }: Props) {
  const currentYear = new Date().getFullYear();
  const predictions = [
    {
      aspect: 'Career',
      prediction: 'Professional growth with new opportunities. Possible promotion or job change.',
      strength: 80,
    },
    {
      aspect: 'Relationships',
      prediction: 'Harmonious period for personal relationships. Good time for marriage or partnerships.',
      strength: 75,
    },
    {
      aspect: 'Health',
      prediction: 'Generally good health, but maintain regular exercise and proper diet.',
      strength: 70,
    },
    {
      aspect: 'Finance',
      prediction: 'Favorable period for investments and financial growth.',
      strength: 85,
    },
  ];

  return (
    <View style={styles.container}>
      <ThemedText style={styles.title}>Yearly Predictions</ThemedText>

      <View style={styles.yearContainer}>
        <ThemedText style={styles.yearTitle}>{currentYear} Overview</ThemedText>
        
        {predictions.map((item, index) => (
          <View key={index} style={styles.predictionItem}>
            <View style={styles.aspectHeader}>
              <ThemedText style={styles.aspectName}>{item.aspect}</ThemedText>
              <View style={styles.strengthBadge}>
                <ThemedText style={styles.strengthText}>{item.strength}%</ThemedText>
              </View>
            </View>
            <ThemedText style={styles.prediction}>{item.prediction}</ThemedText>
            <View style={styles.strengthBar}>
              <View 
                style={[
                  styles.strengthFill,
                  { width: `${item.strength}%` }
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
  yearContainer: {
    gap: Theme.spacing.md,
  },
  yearTitle: {
    fontSize: Theme.typography.body.fontSize,
    fontWeight: '600',
    color: Theme.colors.text.light,
  },
  predictionItem: {
    gap: Theme.spacing.sm,
    padding: Theme.spacing.md,
    backgroundColor: Theme.colors.surface.light,
    borderRadius: Theme.borderRadius.md,
  },
  aspectHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  aspectName: {
    fontSize: Theme.typography.body.fontSize,
    fontWeight: '600',
    color: Theme.colors.primary,
  },
  strengthBadge: {
    backgroundColor: Theme.colors.primary + '20',
    paddingHorizontal: Theme.spacing.sm,
    paddingVertical: Theme.spacing.xxs,
    borderRadius: Theme.borderRadius.full,
  },
  strengthText: {
    fontSize: 12,
    fontWeight: '600',
    color: Theme.colors.primary,
  },
  prediction: {
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