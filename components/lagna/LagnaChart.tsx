import { StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ThemedText } from '@/components/ThemedText';
import { Theme } from '@/constants/Theme';
import type { BirthDetails } from '@/types/birthDetails';
import { HoroscopeCalculator } from '@/services/horoscopeCalculator';
import { useTranslation } from 'react-i18next';

interface Props {
  birthDetails: BirthDetails;
}

export function LagnaChart({ birthDetails }: Props) {
  const { t } = useTranslation();
  const horoscopeData = HoroscopeCalculator.calculateHoroscope(birthDetails);

  // Traditional Sanskrit names for planets with English translations
  const planetNames = {
    sun: { en: 'Sun', sa: 'सूर्य (Surya)' },
    moon: { en: 'Moon', sa: 'चन्द्र (Chandra)' },
    mars: { en: 'Mars', sa: 'मंगल (Mangal)' },
    mercury: { en: 'Mercury', sa: 'बुध (Budha)' },
    jupiter: { en: 'Jupiter', sa: 'बृहस्पति (Brihaspati)' },
    venus: { en: 'Venus', sa: 'शुक्र (Shukra)' },
    saturn: { en: 'Saturn', sa: 'शनि (Shani)' },
    rahu: { en: 'Rahu', sa: 'राहु' },
    ketu: { en: 'Ketu', sa: 'केतु' },
  } as const;

  // Traditional Sanskrit names for zodiac signs with English translations
  const signNames = {
    aries: { en: 'Aries', sa: 'मेष (Mesha)' },
    taurus: { en: 'Taurus', sa: 'वृषभ (Vrishabha)' },
    gemini: { en: 'Gemini', sa: 'मिथुन (Mithuna)' },
    cancer: { en: 'Cancer', sa: 'कर्क (Karka)' },
    leo: { en: 'Leo', sa: 'सिंह (Simha)' },
    virgo: { en: 'Virgo', sa: 'कन्या (Kanya)' },
    libra: { en: 'Libra', sa: 'तुला (Tula)' },
    scorpio: { en: 'Scorpio', sa: 'वृश्चिक (Vrishchika)' },
    sagittarius: { en: 'Sagittarius', sa: 'धनु (Dhanu)' },
    capricorn: { en: 'Capricorn', sa: 'मकर (Makara)' },
    aquarius: { en: 'Aquarius', sa: 'कुम्भ (Kumbha)' },
    pisces: { en: 'Pisces', sa: 'मीन (Meena)' },
  } as const;

  const getSignName = (signName: string) => {
    const key = signName as keyof typeof signNames;
    return signNames[key] || { en: signName, sa: signName };
  };

  const getPlanetName = (planetName: string) => {
    const key = planetName as keyof typeof planetNames;
    return planetNames[key] || { en: planetName, sa: planetName };
  };

  const renderHouseContent = (house: any) => (
    <>
      <ThemedText style={styles.houseNumber}>
        {house.number} • {getSignName(house.signName).sa}
      </ThemedText>
      <ThemedText style={styles.signName}>
        {getSignName(house.signName).en}
      </ThemedText>
      <ThemedText style={styles.signLord}>
        {getPlanetName(house.signLord).sa}
      </ThemedText>
      {house.planets.map((planet: string, pIndex: number) => (
        <ThemedText key={pIndex} style={styles.planetName}>
          {getPlanetName(planet).sa}
          {horoscopeData.planets[planet]?.retrograde ? ' वक्री' : ''}
        </ThemedText>
      ))}
    </>
  );

  return (
    <View style={styles.container}>
      <ThemedText style={styles.title}>
        लग्न कुण्डली • Lagna Chart
      </ThemedText>
      
      <View style={styles.chartContainer}>
        {/* Center Box - Rashi Chakra */}
        <View style={styles.centerBox}>
          <LinearGradient
            colors={[Theme.colors.primary + '20', 'transparent']}
            style={styles.gradient}
          />
          <ThemedText style={styles.ascendantText}>
            लग्न • Lagna
          </ThemedText>
          <ThemedText style={styles.ascendantSign}>
            {getSignName(horoscopeData.ascendant.signName).sa}
          </ThemedText>
          <ThemedText style={styles.ascendantDegree}>
            {horoscopeData.ascendant.degree}° {horoscopeData.ascendant.signName}
          </ThemedText>
          <ThemedText style={styles.ascendantLord}>
            स्वामी • Lord: {getPlanetName(horoscopeData.ascendant.signLord).sa}
          </ThemedText>
        </View>

        {/* Outer Houses - Bhava Chakra */}
        {horoscopeData.houses.map((house, index) => (
          <View
            key={index}
            style={[
              styles.houseBox,
              styles[`house${index + 1}` as keyof typeof styles],
              index === 0 && styles.firstHouse,
            ]}>
            {renderHouseContent(house)}
          </View>
        ))}

        {/* Diagonal Lines */}
        <View style={styles.diagonalLine1} />
        <View style={styles.diagonalLine2} />
      </View>

      {/* Legend */}
      <View style={styles.legend}>
        <ThemedText style={styles.legendTitle}>
          संकेत • Legend
        </ThemedText>
        <View style={styles.legendGrid}>
          {Object.entries(planetNames).map(([key, value]) => (
            <View key={key} style={styles.legendItem}>
              <ThemedText style={styles.legendText}>
                {value.sa} • {value.en}
              </ThemedText>
            </View>
          ))}
        </View>
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
    textAlign: 'center',
  },
  chartContainer: {
    aspectRatio: 1,
    position: 'relative',
    borderWidth: 2,
    borderColor: Theme.colors.border.light,
    borderRadius: Theme.borderRadius.md,
    backgroundColor: Theme.colors.surface.light,
  },
  centerBox: {
    position: 'absolute',
    top: '33%',
    left: '33%',
    width: '34%',
    height: '34%',
    borderWidth: 1,
    borderColor: Theme.colors.border.light,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    backgroundColor: Theme.colors.surface.light,
  },
  gradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  houseBox: {
    position: 'absolute',
    width: '33%',
    height: '33%',
    borderWidth: 1,
    borderColor: Theme.colors.border.light,
    padding: Theme.spacing.xs,
    backgroundColor: Theme.colors.surface.light,
  },
  firstHouse: {
    borderWidth: 2,
    borderColor: Theme.colors.primary,
  },
  houseContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  house1: { top: '33%', left: 0 },
  house2: { top: 0, left: 0 },
  house3: { top: 0, left: '33%' },
  house4: { top: 0, right: 0 },
  house5: { top: '33%', right: 0 },
  house6: { bottom: 0, right: 0 },
  house7: { bottom: 0, right: '33%' },
  house8: { bottom: 0, left: 0 },
  house9: { bottom: '33%', left: 0 },
  house10: { top: '33%', left: '33%' },
  house11: { top: '33%', right: '33%' },
  house12: { bottom: '33%', right: '33%' },
  diagonalLine1: {
    position: 'absolute',
    width: '141.4%', // √2 * 100%
    height: 1,
    backgroundColor: Theme.colors.border.light,
    top: '50%',
    left: '-20.7%',
    transform: [{ rotate: '45deg' }],
  },
  diagonalLine2: {
    position: 'absolute',
    width: '141.4%', // √2 * 100%
    height: 1,
    backgroundColor: Theme.colors.border.light,
    top: '50%',
    left: '-20.7%',
    transform: [{ rotate: '-45deg' }],
  },
  houseNumber: {
    fontSize: 10,
    color: Theme.colors.text.muted.light,
    textAlign: 'center',
  },
  signName: {
    fontSize: 12,
    fontWeight: '600',
    color: Theme.colors.text.light,
    textAlign: 'center',
  },
  planetName: {
    fontSize: 10,
    color: Theme.colors.secondary,
    textAlign: 'center',
  },
  signLord: {
    fontSize: 10,
    color: Theme.colors.tertiary,
    fontStyle: 'italic',
    textAlign: 'center',
  },
  ascendantText: {
    fontSize: 12,
    fontWeight: '600',
    color: Theme.colors.primary,
    textAlign: 'center',
  },
  ascendantSign: {
    fontSize: 14,
    fontWeight: '700',
    color: Theme.colors.primary,
    textAlign: 'center',
  },
  ascendantDegree: {
    fontSize: 12,
    color: Theme.colors.secondary,
    textAlign: 'center',
  },
  ascendantLord: {
    fontSize: 10,
    color: Theme.colors.tertiary,
    textAlign: 'center',
  },
  legend: {
    padding: Theme.spacing.md,
    backgroundColor: Theme.colors.surface.light,
    borderRadius: Theme.borderRadius.md,
    marginTop: Theme.spacing.md,
  },
  legendTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: Theme.colors.text.light,
    marginBottom: Theme.spacing.sm,
    textAlign: 'center',
  },
  legendGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Theme.spacing.sm,
    justifyContent: 'center',
  },
  legendItem: {
    backgroundColor: Theme.colors.surface.light,
    padding: Theme.spacing.xs,
    borderRadius: Theme.borderRadius.sm,
    borderWidth: 1,
    borderColor: Theme.colors.border.light,
  },
  legendText: {
    fontSize: 12,
    color: Theme.colors.text.light,
  },
}); 