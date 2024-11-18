import { StyleSheet, View, ScrollView } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { Theme } from '@/constants/Theme';
import { PLANET_CHARACTERISTICS, DASHA_EFFECTS } from '@/services/calculations/planetaryCharacteristics';

interface DashaPeriod {
  planet: string;
  startDate: Date;
  endDate: Date;
}

interface Props {
  mahadasha: DashaPeriod;
  antardasha: DashaPeriod;
}

export function DashaVisualization({ mahadasha, antardasha }: Props) {
  const calculateProgress = (period: DashaPeriod) => {
    const total = period.endDate.getTime() - period.startDate.getTime();
    const elapsed = Date.now() - period.startDate.getTime();
    return Math.max(0, Math.min(100, (elapsed / total) * 100));
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const getCharacteristics = (planet: string) => {
    return PLANET_CHARACTERISTICS[planet.toLowerCase()] || {
      nature: 'Unknown',
      signifies: 'Unknown',
      positiveTraits: 'Unknown',
      negativeTraits: 'Unknown',
    };
  };

  const getDashaEffect = (maha: string, antar: string) => {
    const effects = DASHA_EFFECTS[maha.toLowerCase()];
    return effects ? effects[antar.toLowerCase()] : 'Period effects are being calculated...';
  };

  return (
    <ScrollView style={styles.container}>
      {/* Mahadasha Section */}
      <View style={styles.periodSection}>
        <View style={styles.periodHeader}>
          <ThemedText style={styles.periodTitle}>
            {mahadasha.planet} Mahadasha
          </ThemedText>
          <View style={styles.dateRange}>
            <ThemedText style={styles.dateText}>
              {formatDate(mahadasha.startDate)} - {formatDate(mahadasha.endDate)}
            </ThemedText>
          </View>
        </View>

        <View style={styles.progressBar}>
          <View 
            style={[
              styles.progressFill,
              { width: `${calculateProgress(mahadasha)}%` }
            ]} 
          />
        </View>

        <View style={styles.characteristicsContainer}>
          {Object.entries(getCharacteristics(mahadasha.planet)).map(([key, value]) => (
            <View key={key} style={styles.characteristicItem}>
              <ThemedText style={styles.characteristicLabel}>
                {key.charAt(0).toUpperCase() + key.slice(1)}:
              </ThemedText>
              <ThemedText style={styles.characteristicValue}>
                {value}
              </ThemedText>
            </View>
          ))}
        </View>
      </View>

      {/* Antardasha Section */}
      <View style={styles.periodSection}>
        <View style={styles.periodHeader}>
          <ThemedText style={styles.periodTitle}>
            {antardasha.planet} Antardasha
          </ThemedText>
          <View style={styles.dateRange}>
            <ThemedText style={styles.dateText}>
              {formatDate(antardasha.startDate)} - {formatDate(antardasha.endDate)}
            </ThemedText>
          </View>
        </View>

        <View style={styles.progressBar}>
          <View 
            style={[
              styles.progressFill,
              { width: `${calculateProgress(antardasha)}%` }
            ]} 
          />
        </View>

        <View style={styles.characteristicsContainer}>
          {Object.entries(getCharacteristics(antardasha.planet)).map(([key, value]) => (
            <View key={key} style={styles.characteristicItem}>
              <ThemedText style={styles.characteristicLabel}>
                {key.charAt(0).toUpperCase() + key.slice(1)}:
              </ThemedText>
              <ThemedText style={styles.characteristicValue}>
                {value}
              </ThemedText>
            </View>
          ))}
        </View>
      </View>

      {/* Combined Period Analysis */}
      <View style={styles.analysisSection}>
        <ThemedText style={styles.analysisTitle}>
          Combined Period Effects
        </ThemedText>
        <ThemedText style={styles.effectText}>
          {getDashaEffect(mahadasha.planet, antardasha.planet)}
        </ThemedText>
        
        <View style={styles.recommendationsContainer}>
          <ThemedText style={styles.recommendationsTitle}>
            Recommendations
          </ThemedText>
          <View style={styles.recommendationsList}>
            <ThemedText style={styles.recommendation}>
              • Favorable colors: {getCharacteristics(mahadasha.planet).colors?.join(', ')}
            </ThemedText>
            <ThemedText style={styles.recommendation}>
              • Beneficial gemstones: {getCharacteristics(mahadasha.planet).gemstones?.join(', ')}
            </ThemedText>
            <ThemedText style={styles.recommendation}>
              • Favorable direction: {getCharacteristics(mahadasha.planet).direction}
            </ThemedText>
            <ThemedText style={styles.recommendation}>
              • Auspicious day: {getCharacteristics(mahadasha.planet).dayOfWeek}
            </ThemedText>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  periodSection: {
    backgroundColor: Theme.colors.surface.light,
    borderRadius: Theme.borderRadius.md,
    padding: Theme.spacing.lg,
    marginBottom: Theme.spacing.md,
  },
  periodHeader: {
    marginBottom: Theme.spacing.md,
  },
  periodTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: Theme.colors.text.light,
  },
  dateRange: {
    marginTop: Theme.spacing.xs,
  },
  dateText: {
    fontSize: 14,
    color: Theme.colors.text.muted.light,
  },
  progressBar: {
    height: 8,
    backgroundColor: Theme.colors.border.light,
    borderRadius: Theme.borderRadius.full,
    overflow: 'hidden',
    marginBottom: Theme.spacing.md,
  },
  progressFill: {
    height: '100%',
    backgroundColor: Theme.colors.primary,
    borderRadius: Theme.borderRadius.full,
  },
  characteristicsContainer: {
    gap: Theme.spacing.sm,
  },
  characteristicItem: {
    gap: Theme.spacing.xs,
  },
  characteristicLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: Theme.colors.text.light,
  },
  characteristicValue: {
    fontSize: 14,
    color: Theme.colors.text.muted.light,
    lineHeight: 20,
  },
  analysisSection: {
    backgroundColor: Theme.colors.surface.light,
    borderRadius: Theme.borderRadius.md,
    padding: Theme.spacing.lg,
  },
  analysisTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Theme.colors.text.light,
    marginBottom: Theme.spacing.md,
  },
  effectText: {
    fontSize: 14,
    color: Theme.colors.text.light,
    lineHeight: 24,
    marginBottom: Theme.spacing.lg,
  },
  recommendationsContainer: {
    gap: Theme.spacing.md,
  },
  recommendationsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Theme.colors.text.light,
  },
  recommendationsList: {
    gap: Theme.spacing.sm,
  },
  recommendation: {
    fontSize: 14,
    color: Theme.colors.text.muted.light,
    lineHeight: 20,
  },
}); 