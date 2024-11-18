import { View, StyleSheet } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { Theme } from '@/constants/Theme';

export function PlanetaryStrengths({ horoscopeData }) {
  return (
    <View style={styles.container}>
      {Object.entries(horoscopeData.planets).map(([planet, data]) => (
        <View key={planet} style={styles.planetStrength}>
          <View style={styles.planetInfo}>
            <ThemedText style={styles.planetName}>
              {planet.charAt(0).toUpperCase() + planet.slice(1)}
            </ThemedText>
            <ThemedText style={styles.planetPosition}>
              {data.signName} • House {data.house}
            </ThemedText>
          </View>
          
          <View style={styles.strengthBar}>
            <View 
              style={[
                styles.strengthFill,
                { width: `${calculateStrength(data)}%` }
              ]} 
            />
          </View>
          
          <View style={styles.aspectsContainer}>
            {data.aspects?.map((aspect, index) => (
              <ThemedText key={index} style={styles.aspect}>
                {aspect}
              </ThemedText>
            ))}
          </View>
        </View>
      ))}
    </View>
  );
}

function calculateStrength(planetData) {
  // Implement planetary strength calculation
  // Consider factors like:
  // - Dignity (exaltation, debilitation, own sign)
  // - House placement
  // - Aspects
  // - Retrograde status
  return Math.random() * 100; // Placeholder
}

const styles = StyleSheet.create({
  container: {
    gap: Theme.spacing.md,
  },
  planetStrength: {
    gap: Theme.spacing.sm,
  },
  planetInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  planetName: {
    fontSize: 16,
    fontWeight: '600',
    color: Theme.colors.text.light,
  },
  planetPosition: {
    fontSize: 14,
    color: Theme.colors.text.muted.light,
  },
  strengthBar: {
    height: 4,
    backgroundColor: Theme.colors.border.light,
    borderRadius: Theme.borderRadius.full,
    overflow: 'hidden',
  },
  strengthFill: {
    height: '100%',
    backgroundColor: Theme.colors.primary,
    borderRadius: Theme.borderRadius.full,
  },
  aspectsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Theme.spacing.xs,
  },
  aspect: {
    fontSize: 12,
    color: Theme.colors.text.muted.light,
    backgroundColor: Theme.colors.surface.light,
    paddingHorizontal: Theme.spacing.sm,
    paddingVertical: Theme.spacing.xxs,
    borderRadius: Theme.borderRadius.full,
  },
}); 