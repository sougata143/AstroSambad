import { StyleSheet, View, ScrollView } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { Theme } from '@/constants/Theme';

interface DashaPeriod {
  planet: string;
  startDate: Date;
  endDate: Date;
}

interface Props {
  mahadasha: DashaPeriod;
  antardasha: DashaPeriod;
  pratyantar?: DashaPeriod;
}

const PLANET_COLORS = {
  sun: '#FFA500',    // Orange
  moon: '#FFFFFF',   // White
  mars: '#FF0000',   // Red
  mercury: '#00FF00',// Green
  jupiter: '#FFFF00',// Yellow
  venus: '#FFC0CB',  // Pink
  saturn: '#0000FF', // Blue
  rahu: '#800080',   // Purple
  ketu: '#A52A2A',  // Brown
};

const PLANET_SYMBOLS = {
  sun: '☉',
  moon: '☽',
  mars: '♂',
  mercury: '☿',
  jupiter: '♃',
  venus: '♀',
  saturn: '♄',
  rahu: '☊',
  ketu: '☋',
};

const PLANET_CHARACTERISTICS = {
  sun: {
    nature: 'Natural malefic',
    signifies: 'Soul, father, authority, government',
    positiveTraits: 'Leadership, confidence, vitality',
    negativeTraits: 'Ego, dominating nature, pride',
  },
  moon: {
    nature: 'Natural benefic',
    signifies: 'Mind, mother, emotions, public',
    positiveTraits: 'Nurturing, intuitive, adaptable',
    negativeTraits: 'Moodiness, dependency, instability',
  },
  mars: {
    nature: 'Natural malefic',
    signifies: 'Energy, courage, siblings, property',
    positiveTraits: 'Courage, determination, strength',
    negativeTraits: 'Aggression, impulsiveness, anger',
  },
  // Add characteristics for other planets
};

export function DashaChart({ mahadasha, antardasha, pratyantar }: Props) {
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

  const getPlanetCharacteristics = (planet: string) => {
    return PLANET_CHARACTERISTICS[planet.toLowerCase()] || {
      nature: 'Unknown',
      signifies: 'Unknown',
      positiveTraits: 'Unknown',
      negativeTraits: 'Unknown',
    };
  };

  return (
    <ScrollView style={styles.container}>
      {/* Mahadasha Section */}
      <View style={styles.dashaSection}>
        <View style={styles.dashaTitleContainer}>
          <ThemedText style={styles.dashaTitle}>
            {PLANET_SYMBOLS[mahadasha.planet.toLowerCase()]} Mahadasha
          </ThemedText>
          <View style={[
            styles.planetIndicator,
            { backgroundColor: PLANET_COLORS[mahadasha.planet.toLowerCase()] }
          ]} />
        </View>

        <View style={styles.periodDetails}>
          <View style={styles.dateRange}>
            <ThemedText style={styles.dateText}>
              {formatDate(mahadasha.startDate)} - {formatDate(mahadasha.endDate)}
            </ThemedText>
          </View>
          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <View 
                style={[
                  styles.progressFill,
                  { 
                    width: `${calculateProgress(mahadasha)}%`,
                    backgroundColor: PLANET_COLORS[mahadasha.planet.toLowerCase()]
                  }
                ]} 
              />
            </View>
            <ThemedText style={styles.progressText}>
              {Math.round(calculateProgress(mahadasha))}%
            </ThemedText>
          </View>
        </View>

        <View style={styles.characteristicsContainer}>
          {Object.entries(getPlanetCharacteristics(mahadasha.planet)).map(([key, value]) => (
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
      <View style={styles.dashaSection}>
        <View style={styles.dashaTitleContainer}>
          <ThemedText style={styles.dashaTitle}>
            {PLANET_SYMBOLS[antardasha.planet.toLowerCase()]} Antardasha
          </ThemedText>
          <View style={[
            styles.planetIndicator,
            { backgroundColor: PLANET_COLORS[antardasha.planet.toLowerCase()] }
          ]} />
        </View>

        <View style={styles.periodDetails}>
          <View style={styles.dateRange}>
            <ThemedText style={styles.dateText}>
              {formatDate(antardasha.startDate)} - {formatDate(antardasha.endDate)}
            </ThemedText>
          </View>
          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <View 
                style={[
                  styles.progressFill,
                  { 
                    width: `${calculateProgress(antardasha)}%`,
                    backgroundColor: PLANET_COLORS[antardasha.planet.toLowerCase()]
                  }
                ]} 
              />
            </View>
            <ThemedText style={styles.progressText}>
              {Math.round(calculateProgress(antardasha))}%
            </ThemedText>
          </View>
        </View>

        <View style={styles.characteristicsContainer}>
          {Object.entries(getPlanetCharacteristics(antardasha.planet)).map(([key, value]) => (
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
          Combined Period Analysis
        </ThemedText>
        <ThemedText style={styles.analysisText}>
          During {mahadasha.planet}-{antardasha.planet} period:
        </ThemedText>
        <View style={styles.predictionsList}>
          <ThemedText style={styles.prediction}>
            • Career opportunities and professional growth are highlighted
          </ThemedText>
          <ThemedText style={styles.prediction}>
            • Focus on spiritual development and higher learning
          </ThemedText>
          <ThemedText style={styles.prediction}>
            • Favorable time for financial investments
          </ThemedText>
          <ThemedText style={styles.prediction}>
            • Pay attention to health and maintain balance
          </ThemedText>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  dashaSection: {
    backgroundColor: Theme.colors.surface.light,
    borderRadius: Theme.borderRadius.md,
    padding: Theme.spacing.lg,
    marginBottom: Theme.spacing.md,
  },
  dashaTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Theme.spacing.md,
  },
  dashaTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: Theme.colors.text.light,
    marginRight: Theme.spacing.sm,
  },
  planetIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  periodDetails: {
    gap: Theme.spacing.sm,
  },
  dateRange: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dateText: {
    fontSize: 14,
    color: Theme.colors.text.muted.light,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Theme.spacing.sm,
  },
  progressBar: {
    flex: 1,
    height: 8,
    backgroundColor: Theme.colors.border.light,
    borderRadius: Theme.borderRadius.full,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: Theme.borderRadius.full,
  },
  progressText: {
    fontSize: 12,
    fontWeight: '600',
    color: Theme.colors.text.muted.light,
    width: 40,
  },
  characteristicsContainer: {
    marginTop: Theme.spacing.md,
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
  analysisText: {
    fontSize: 14,
    color: Theme.colors.text.muted.light,
    marginBottom: Theme.spacing.sm,
  },
  predictionsList: {
    gap: Theme.spacing.sm,
  },
  prediction: {
    fontSize: 14,
    color: Theme.colors.text.light,
    lineHeight: 20,
  },
}); 