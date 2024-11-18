import { StyleSheet, View, Dimensions, ScrollView, Platform } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { Card } from '@/components/common/Card';
import { Theme } from '@/constants/Theme';
import type { BirthDetails } from '@/types/birthDetails';
import { HoroscopeCalculator } from '@/services/horoscopeCalculator';
import { LinearGradient } from 'expo-linear-gradient';
import { useTranslation } from 'react-i18next';

// Add new components for detailed analysis
import { PlanetaryStrengths } from './analysis/PlanetaryStrengths';
import { HouseAnalysis } from './analysis/HouseAnalysis';
import { NakshatraDetails } from './analysis/NakshatraDetails';
import { AuspiciousPeriods } from './analysis/AuspiciousPeriods';

interface Props {
  birthDetails: BirthDetails;
}

export function HoroscopeChart({ birthDetails }: Props) {
  const { t } = useTranslation();
  const horoscopeData = HoroscopeCalculator.calculateHoroscope(birthDetails);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header Section */}
      <View style={styles.header}>
        <ThemedText style={styles.headerTitle}>
          {t('horoscope.title')}
        </ThemedText>
        <ThemedText style={styles.headerSubtitle}>
          {birthDetails.name} • {new Date(birthDetails.dateOfBirth).toLocaleDateString()}
        </ThemedText>
      </View>

      {/* Ascendant Card */}
      <Card style={styles.card}>
        <LinearGradient
          colors={[Theme.colors.primary + '20', 'transparent']}
          style={styles.cardGradient}
        />
        <View style={styles.cardHeader}>
          <View style={styles.cardIconContainer}>
            <ThemedText style={styles.cardIcon}>⬆️</ThemedText>
          </View>
          <ThemedText style={styles.cardTitle}>
            {t('horoscope.ascendant.title')}
          </ThemedText>
        </View>
        <View style={styles.cardContent}>
          <ThemedText style={styles.ascendantSign}>
            {horoscopeData.ascendant.signName}
          </ThemedText>
          <ThemedText style={styles.ascendantDegree}>
            {horoscopeData.ascendant.degree}°
          </ThemedText>
        </View>
      </Card>

      {/* Planetary Positions */}
      <Card style={styles.card}>
        <LinearGradient
          colors={[Theme.colors.secondary + '20', 'transparent']}
          style={styles.cardGradient}
        />
        <View style={styles.cardHeader}>
          <View style={styles.cardIconContainer}>
            <ThemedText style={styles.cardIcon}>🌟</ThemedText>
          </View>
          <ThemedText style={styles.cardTitle}>
            {t('horoscope.planets.title')}
          </ThemedText>
        </View>
        <View style={styles.planetsGrid}>
          {Object.entries(horoscopeData.planets).map(([planet, position]) => (
            <View key={planet} style={styles.planetCard}>
              <ThemedText style={styles.planetName}>{planet}</ThemedText>
              <ThemedText style={styles.planetDetails}>
                {position.sign}° {position.retrograde ? '⟲' : ''}
              </ThemedText>
              <ThemedText style={styles.planetHouse}>House {position.house}</ThemedText>
            </View>
          ))}
        </View>
      </Card>

      {/* Dasha Periods */}
      <Card style={styles.card}>
        <LinearGradient
          colors={[Theme.colors.tertiary + '20', 'transparent']}
          style={styles.cardGradient}
        />
        <View style={styles.cardHeader}>
          <View style={styles.cardIconContainer}>
            <ThemedText style={styles.cardIcon}>⏳</ThemedText>
          </View>
          <ThemedText style={styles.cardTitle}>
            {t('horoscope.dashas.title')}
          </ThemedText>
        </View>
        <View style={styles.dashaContainer}>
          <View style={styles.dashaItem}>
            <ThemedText style={styles.dashaLabel}>
              {t('horoscope.dashas.mahadasha')}
            </ThemedText>
            <ThemedText style={styles.dashaPlanet}>
              {horoscopeData.dashas.mahadasha.planet}
            </ThemedText>
            <ThemedText style={styles.dashaDate}>
              {new Date(horoscopeData.dashas.mahadasha.startDate).getFullYear()} - 
              {new Date(horoscopeData.dashas.mahadasha.endDate).getFullYear()}
            </ThemedText>
          </View>
          <View style={styles.dashaDivider} />
          <View style={styles.dashaItem}>
            <ThemedText style={styles.dashaLabel}>
              {t('horoscope.dashas.antardasha')}
            </ThemedText>
            <ThemedText style={styles.dashaPlanet}>
              {horoscopeData.dashas.antardasha.planet}
            </ThemedText>
            <ThemedText style={styles.dashaDate}>
              {new Date(horoscopeData.dashas.antardasha.startDate).toLocaleDateString()} - 
              {new Date(horoscopeData.dashas.antardasha.endDate).toLocaleDateString()}
            </ThemedText>
          </View>
        </View>
      </Card>

      {/* Yogas */}
      <Card style={[styles.card, styles.lastCard]}>
        <LinearGradient
          colors={[Theme.colors.primary + '20', 'transparent']}
          style={styles.cardGradient}
        />
        <View style={styles.cardHeader}>
          <View style={styles.cardIconContainer}>
            <ThemedText style={styles.cardIcon}>✨</ThemedText>
          </View>
          <ThemedText style={styles.cardTitle}>
            {t('horoscope.yogas.title')}
          </ThemedText>
        </View>
        <View style={styles.yogasContainer}>
          {horoscopeData.yogas.map((yoga, index) => (
            <View key={index} style={styles.yogaItem}>
              <View style={styles.yogaHeader}>
                <ThemedText style={styles.yogaName}>{yoga.name}</ThemedText>
                <View style={styles.strengthBadge}>
                  <ThemedText style={styles.strengthText}>{yoga.strength}%</ThemedText>
                </View>
              </View>
              <ThemedText style={styles.yogaDescription}>{yoga.description}</ThemedText>
              <View style={styles.strengthBarContainer}>
                <View 
                  style={[
                    styles.strengthBarFill, 
                    { width: `${yoga.strength}%` }
                  ]} 
                />
              </View>
            </View>
          ))}
        </View>
      </Card>

      {/* New Analysis Cards */}
      
      {/* Nakshatra Analysis */}
      <Card style={styles.card}>
        <LinearGradient
          colors={[Theme.colors.primary + '20', 'transparent']}
          style={styles.cardGradient}
        />
        <View style={styles.cardHeader}>
          <View style={styles.cardIconContainer}>
            <ThemedText style={styles.cardIcon}>🌠</ThemedText>
          </View>
          <ThemedText style={styles.cardTitle}>
            {t('horoscope.nakshatras.title')}
          </ThemedText>
        </View>
        <NakshatraDetails horoscopeData={horoscopeData} />
      </Card>

      {/* Planetary Strengths */}
      <Card style={styles.card}>
        <LinearGradient
          colors={[Theme.colors.secondary + '20', 'transparent']}
          style={styles.cardGradient}
        />
        <View style={styles.cardHeader}>
          <View style={styles.cardIconContainer}>
            <ThemedText style={styles.cardIcon}>⚡</ThemedText>
          </View>
          <ThemedText style={styles.cardTitle}>
            {t('horoscope.planets.title')}
          </ThemedText>
        </View>
        <PlanetaryStrengths horoscopeData={horoscopeData} />
      </Card>

      {/* House Analysis */}
      <Card style={styles.card}>
        <LinearGradient
          colors={[Theme.colors.tertiary + '20', 'transparent']}
          style={styles.cardGradient}
        />
        <View style={styles.cardHeader}>
          <View style={styles.cardIconContainer}>
            <ThemedText style={styles.cardIcon}>🏠</ThemedText>
          </View>
          <ThemedText style={styles.cardTitle}>
            {t('horoscope.houses.title')}
          </ThemedText>
        </View>
        <HouseAnalysis horoscopeData={horoscopeData} />
      </Card>

      {/* Auspicious Periods */}
      <Card style={[styles.card, styles.lastCard]}>
        <LinearGradient
          colors={[Theme.colors.primary + '20', 'transparent']}
          style={styles.cardGradient}
        />
        <View style={styles.cardHeader}>
          <View style={styles.cardIconContainer}>
            <ThemedText style={styles.cardIcon}>📅</ThemedText>
          </View>
          <ThemedText style={styles.cardTitle}>
            {t('horoscope.auspiciousPeriods.title')}
          </ThemedText>
        </View>
        <AuspiciousPeriods horoscopeData={horoscopeData} />
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.background.light,
  },
  header: {
    padding: Theme.spacing.lg,
    paddingTop: Theme.spacing.xl,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: Theme.colors.text.light,
    marginBottom: Theme.spacing.xs,
  },
  headerSubtitle: {
    fontSize: 16,
    color: Theme.colors.text.muted.light,
  },
  card: {
    margin: Theme.spacing.md,
    marginBottom: 0,
    overflow: 'hidden',
  },
  lastCard: {
    marginBottom: Theme.spacing.md,
  },
  cardGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 150,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Theme.spacing.md,
  },
  cardIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Theme.colors.surface.light,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Theme.spacing.sm,
  },
  cardIcon: {
    fontSize: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Theme.colors.text.light,
  },
  cardContent: {
    alignItems: 'center',
  },
  ascendantSign: {
    fontSize: 24,
    fontWeight: '700',
    color: Theme.colors.primary,
    marginBottom: Theme.spacing.xs,
  },
  ascendantDegree: {
    fontSize: 16,
    color: Theme.colors.text.muted.light,
  },
  planetsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Theme.spacing.sm,
  },
  planetCard: {
    width: '31%',
    backgroundColor: Theme.colors.surface.light,
    padding: Theme.spacing.md,
    borderRadius: Theme.borderRadius.md,
    alignItems: 'center',
  },
  planetName: {
    fontSize: 14,
    fontWeight: '600',
    color: Theme.colors.text.light,
    marginBottom: Theme.spacing.xs,
  },
  planetDetails: {
    fontSize: 16,
    color: Theme.colors.secondary,
    fontWeight: '700',
    marginBottom: Theme.spacing.xs,
  },
  planetHouse: {
    fontSize: 12,
    color: Theme.colors.text.muted.light,
  },
  dashaContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'stretch',
  },
  dashaItem: {
    flex: 1,
    alignItems: 'center',
  },
  dashaDivider: {
    width: 1,
    backgroundColor: Theme.colors.border.light,
    marginHorizontal: Theme.spacing.lg,
  },
  dashaLabel: {
    fontSize: 14,
    color: Theme.colors.text.muted.light,
    marginBottom: Theme.spacing.xs,
  },
  dashaPlanet: {
    fontSize: 18,
    fontWeight: '600',
    color: Theme.colors.tertiary,
    marginBottom: Theme.spacing.xs,
  },
  dashaDate: {
    fontSize: 12,
    color: Theme.colors.text.muted.light,
  },
  yogasContainer: {
    gap: Theme.spacing.lg,
  },
  yogaItem: {
    gap: Theme.spacing.xs,
  },
  yogaHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  yogaName: {
    fontSize: 16,
    fontWeight: '600',
    color: Theme.colors.text.light,
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
  yogaDescription: {
    fontSize: 14,
    color: Theme.colors.text.muted.light,
    lineHeight: 20,
  },
  strengthBarContainer: {
    height: 4,
    backgroundColor: Theme.colors.border.light,
    borderRadius: Theme.borderRadius.full,
    overflow: 'hidden',
    marginTop: Theme.spacing.xs,
  },
  strengthBarFill: {
    height: '100%',
    backgroundColor: Theme.colors.primary,
    borderRadius: Theme.borderRadius.full,
  },
}); 