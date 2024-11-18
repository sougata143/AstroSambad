import { View, StyleSheet } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { Theme } from '@/constants/Theme';

interface Props {
  horoscopeData: any; // Update with proper type
}

export function AuspiciousPeriods({ horoscopeData }: Props) {
  // Calculate auspicious periods based on planetary positions
  const periods = calculateAuspiciousPeriods(horoscopeData);

  return (
    <View style={styles.container}>
      {periods.map((period, index) => (
        <View key={index} style={styles.periodCard}>
          <View style={styles.periodHeader}>
            <ThemedText style={styles.periodType}>{period.type}</ThemedText>
            <View style={[
              styles.strengthIndicator,
              { backgroundColor: getStrengthColor(period.strength) }
            ]} />
          </View>

          <ThemedText style={styles.periodTiming}>
            {period.timing}
          </ThemedText>

          <ThemedText style={styles.periodDescription}>
            {period.description}
          </ThemedText>

          <View style={styles.activitiesContainer}>
            <ThemedText style={styles.activitiesLabel}>
              Favorable Activities:
            </ThemedText>
            <View style={styles.activitiesList}>
              {period.activities.map((activity, idx) => (
                <View key={idx} style={styles.activityTag}>
                  <ThemedText style={styles.activityText}>
                    {activity}
                  </ThemedText>
                </View>
              ))}
            </View>
          </View>
        </View>
      ))}
    </View>
  );
}

function calculateAuspiciousPeriods(horoscopeData: any) {
  // This is a placeholder implementation
  // TODO: Implement actual calculations based on Vedic astrology
  return [
    {
      type: 'Morning Muhurta',
      timing: '6:00 AM - 7:30 AM',
      strength: 0.8,
      description: 'Brahma Muhurta, ideal for spiritual practices',
      activities: ['Meditation', 'Study', 'Yoga']
    },
    {
      type: 'Abhijit Muhurta',
      timing: '11:30 AM - 12:15 PM',
      strength: 0.9,
      description: 'Most auspicious time of the day',
      activities: ['New Beginnings', 'Important Work', 'Meetings']
    },
    {
      type: 'Evening Muhurta',
      timing: '4:30 PM - 6:00 PM',
      strength: 0.7,
      description: 'Good for creative and artistic pursuits',
      activities: ['Art', 'Music', 'Learning']
    }
  ];
}

function getStrengthColor(strength: number): string {
  if (strength >= 0.8) return Theme.colors.success;
  if (strength >= 0.6) return Theme.colors.warning;
  return Theme.colors.error;
}

const styles = StyleSheet.create({
  container: {
    gap: Theme.spacing.md,
  },
  periodCard: {
    backgroundColor: Theme.colors.surface.light,
    borderRadius: Theme.borderRadius.md,
    padding: Theme.spacing.md,
    gap: Theme.spacing.sm,
  },
  periodHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  periodType: {
    fontSize: 16,
    fontWeight: '600',
    color: Theme.colors.text.light,
  },
  strengthIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  periodTiming: {
    fontSize: 14,
    color: Theme.colors.primary,
    fontWeight: '500',
  },
  periodDescription: {
    fontSize: 14,
    color: Theme.colors.text.muted.light,
    marginTop: Theme.spacing.xs,
  },
  activitiesContainer: {
    marginTop: Theme.spacing.sm,
  },
  activitiesLabel: {
    fontSize: 12,
    color: Theme.colors.text.muted.light,
    marginBottom: Theme.spacing.xs,
  },
  activitiesList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Theme.spacing.xs,
  },
  activityTag: {
    backgroundColor: Theme.colors.primary + '20',
    paddingHorizontal: Theme.spacing.sm,
    paddingVertical: Theme.spacing.xxs,
    borderRadius: Theme.borderRadius.full,
  },
  activityText: {
    fontSize: 12,
    color: Theme.colors.primary,
    fontWeight: '500',
  },
}); 