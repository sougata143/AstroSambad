import { StyleSheet, View } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { Theme } from '@/constants/Theme';

interface Props {
  horoscopeData: any;
}

export function HouseAnalysis({ horoscopeData }) {
  const getHouseSignificance = (houseNumber: number): string[] => {
    const significances: Record<number, string[]> = {
      1: [
        'Physical body and appearance',
        'Personality and character',
        'Self-image and identity',
        'Health and vitality',
        'New beginnings and initiatives',
      ],
      2: [
        'Wealth and material possessions',
        'Family traditions and values',
        'Speech and communication',
        'Early education',
        'Food habits and diet',
      ],
      3: [
        'Siblings and courage',
        'Communication and writing',
        'Short journeys',
        'Mental abilities',
        'Hobbies and interests',
      ],
      4: [
        'Mother and emotional wellbeing',
        'Home and domestic environment',
        'Real estate and property',
        'Vehicles and conveyances',
        'Education and academic pursuits',
      ],
      5: [
        'Children and creativity',
        'Romance and love affairs',
        'Speculation and gambling',
        'Intelligence and wisdom',
        'Artistic talents',
      ],
      6: [
        'Health and diseases',
        'Service and work environment',
        'Enemies and obstacles',
        'Debts and loans',
        'Pets and small animals',
      ],
      7: [
        'Marriage and partnerships',
        'Business relationships',
        'Legal matters',
        'Foreign travel',
        'Public relations',
      ],
      8: [
        'Longevity and death',
        'Hidden knowledge and occult',
        'Inheritance and unearned wealth',
        'Sudden events',
        'Transformation',
      ],
      9: [
        'Higher learning and wisdom',
        'Religion and spirituality',
        'Long distance travel',
        'Father and mentors',
        'Fortune and luck',
      ],
      10: [
        'Career and profession',
        'Status and reputation',
        'Government relations',
        'Authority figures',
        'Public life',
      ],
      11: [
        'Gains and income',
        'Friends and social network',
        'Hopes and aspirations',
        'Elder siblings',
        'Social causes',
      ],
      12: [
        'Losses and expenses',
        'Foreign residence',
        'Spiritual liberation',
        'Secret enemies',
        'Isolation and meditation',
      ],
    };
    return significances[houseNumber] || [];
  };

  const getDetailedSignificance = (houseNumber: number): string[] => {
    const significations: Record<number, string[]> = {
      1: [
        'Physical appearance and constitution',
        'Personality and character',
        'Early childhood and environment',
        'General health and vitality',
        'Self-expression and identity',
        'Head and face',
        'Life direction and personal goals',
        'First impressions and how others see you',
      ],
      2: [
        'Accumulated wealth and possessions',
        'Family traditions and values',
        'Speech and communication style',
        'Early education and learning',
        'Food habits and preferences',
        'Face and throat',
        'Basic education',
        'Family wealth and inheritance',
        'Ability to earn and save',
      ],
      3: [
        'Siblings and courage',
        'Short journeys and communication',
        'Writing and analytical abilities',
        'Neighbors and immediate environment',
        'Manual skills and hobbies',
        'Arms, shoulders, and hands',
        'Mental abilities and intelligence',
        'Early education and skills',
        'Courage and valor',
      ],
      4: [
        'Mother and emotional well-being',
        'Home and domestic environment',
        'Real estate and property',
        'Vehicles and conveyances',
        'Educational qualifications',
        'Heart and chest',
        'Emotional security',
        'Private life and inner happiness',
        'Fixed assets and land',
      ],
      5: [
        'Children and creativity',
        'Romance and love affairs',
        'Speculation and gambling',
        'Intelligence and wisdom',
        'Artistic talents',
        'Stomach and upper abdomen',
        'Education and learning ability',
        'Past life merits',
        'Managerial abilities',
      ],
      6: [
        'Health and diseases',
        'Service and work environment',
        'Enemies and obstacles',
        'Debts and loans',
        'Pets and small animals',
        'Lower abdomen and intestines',
        'Daily routine and habits',
        'Maternal relatives',
        'Competition and rivals',
      ],
      7: [
        'Marriage and partnerships',
        'Business relationships',
        'Legal matters',
        'Foreign travel',
        'Public relations',
        'Lower back and kidneys',
        'Spouse and marital life',
        'Contracts and agreements',
        'All types of relationships',
      ],
      8: [
        'Longevity and death',
        'Hidden knowledge and occult',
        'Inheritance and unearned wealth',
        'Sudden events',
        'Transformation',
        'Reproductive organs',
        'Research and investigation',
        'Insurance and legacy',
        'Spiritual practices',
      ],
      9: [
        'Higher learning and wisdom',
        'Religion and spirituality',
        'Long distance travel',
        'Father and mentors',
        'Fortune and luck',
        'Hips and thighs',
        'Philosophy and ethics',
        'Teaching and publishing',
        'Divine grace and blessings',
      ],
      10: [
        'Career and profession',
        'Status and reputation',
        'Government relations',
        'Authority figures',
        'Public life',
        'Knees and bones',
        'Professional success',
        'Social status and fame',
        'Power and authority',
      ],
      11: [
        'Gains and income',
        'Friends and social network',
        'Hopes and aspirations',
        'Elder siblings',
        'Social causes',
        'Calves and ankles',
        'Fulfillment of desires',
        'Group activities',
        'Long-term goals',
      ],
      12: [
        'Losses and expenses',
        'Foreign residence',
        'Spiritual liberation',
        'Secret enemies',
        'Isolation and meditation',
        'Feet and toes',
        'Final liberation (Moksha)',
        'Hidden enemies',
        'Charitable activities',
        'Subconscious mind',
      ],
    };
    return significations[houseNumber] || [];
  };

  const getHouseStrength = (house: any): number => {
    let strength = 50; // Base strength

    // Add strength for benefic planets
    const benefics = ['jupiter', 'venus', 'mercury', 'moon'];
    const malefics = ['saturn', 'mars', 'rahu', 'ketu'];
    
    house.planets.forEach((planet: string) => {
      if (benefics.includes(planet.toLowerCase())) strength += 10;
      if (malefics.includes(planet.toLowerCase())) strength -= 5;
    });

    // Add strength for aspects
    house.aspects.forEach(() => strength += 5);

    // Add strength if lord is well placed
    const lordPosition = horoscopeData.planets[house.signLord.toLowerCase()]?.house;
    if (lordPosition) {
      if ([1, 4, 7, 10].includes(lordPosition)) strength += 15; // Kendra
      if ([5, 9].includes(lordPosition)) strength += 10; // Trikona
    }

    return Math.min(100, Math.max(0, strength));
  };

  const getHouseNature = (houseNumber: number): string => {
    const natures: Record<number, string> = {
      1: 'Dharma (Life Purpose)',
      2: 'Artha (Wealth)',
      3: 'Kama (Desires)',
      4: 'Moksha (Spirituality)',
      5: 'Dharma (Life Purpose)',
      6: 'Artha (Wealth)',
      7: 'Kama (Desires)',
      8: 'Moksha (Spirituality)',
      9: 'Dharma (Life Purpose)',
      10: 'Artha (Wealth)',
      11: 'Kama (Desires)',
      12: 'Moksha (Spirituality)',
    };
    return natures[houseNumber] || '';
  };

  const getHouseRecommendations = (house: any): string[] => {
    const recommendations: string[] = [];
    const strength = getHouseStrength(house);

    if (strength < 40) {
      recommendations.push('Consider remedial measures for house lord');
      recommendations.push('Pay special attention to matters of this house');
    } else if (strength > 70) {
      recommendations.push('Good period for matters related to this house');
      recommendations.push('Take advantage of favorable planetary positions');
    }

    // Add specific recommendations based on planets
    house.planets.forEach((planet: string) => {
      const isRetrograde = horoscopeData.planets[planet.toLowerCase()]?.retrograde;
      if (isRetrograde) {
        recommendations.push(`${planet} is retrograde - internal growth opportunity`);
      }
    });

    return recommendations;
  };

  return (
    <View style={styles.container}>
      {horoscopeData.houses.map((house: any) => (
        <View key={house.number} style={styles.houseContainer}>
          <View style={styles.houseHeader}>
            <View>
              <ThemedText style={styles.houseTitle}>
                House {house.number} • {house.signName}
              </ThemedText>
              <ThemedText style={styles.houseNature}>
                {getHouseNature(house.number)}
              </ThemedText>
            </View>
            <View style={styles.strengthContainer}>
              <ThemedText style={styles.strengthText}>
                {getHouseStrength(house)}%
              </ThemedText>
              <View style={styles.strengthBar}>
                <View 
                  style={[
                    styles.strengthFill,
                    { 
                      width: `${getHouseStrength(house)}%`,
                      backgroundColor: getHouseStrength(house) > 70 ? Theme.colors.success :
                                     getHouseStrength(house) > 40 ? Theme.colors.warning :
                                     Theme.colors.error
                    }
                  ]} 
                />
              </View>
            </View>
          </View>

          <View style={styles.detailsContainer}>
            {/* Lord Details */}
            <View style={styles.section}>
              <ThemedText style={styles.sectionTitle}>Lord</ThemedText>
              <ThemedText style={styles.sectionText}>
                {house.signLord} in House {horoscopeData.planets[house.signLord.toLowerCase()]?.house}
                {horoscopeData.planets[house.signLord.toLowerCase()]?.retrograde ? ' (Retrograde)' : ''}
              </ThemedText>
            </View>

            {/* Planets */}
            {house.planets.length > 0 && (
              <View style={styles.section}>
                <ThemedText style={styles.sectionTitle}>Planets</ThemedText>
                <View style={styles.planetsList}>
                  {house.planets.map((planet: string, index: number) => (
                    <View key={index} style={styles.planetTag}>
                      <ThemedText style={styles.planetText}>
                        {planet}
                        {horoscopeData.planets[planet.toLowerCase()]?.retrograde ? ' ⟲' : ''}
                      </ThemedText>
                    </View>
                  ))}
                </View>
              </View>
            )}

            {/* Aspects */}
            {house.aspects.length > 0 && (
              <View style={styles.section}>
                <ThemedText style={styles.sectionTitle}>Aspects</ThemedText>
                <View style={styles.aspectsList}>
                  {house.aspects.map((aspect: string, index: number) => (
                    <View key={index} style={styles.aspectTag}>
                      <ThemedText style={styles.aspectText}>{aspect}</ThemedText>
                    </View>
                  ))}
                </View>
              </View>
            )}

            {/* Significations */}
            <View style={styles.section}>
              <ThemedText style={styles.sectionTitle}>Significations</ThemedText>
              {getDetailedSignificance(house.number).map((sig, index) => (
                <ThemedText key={index} style={styles.signification}>
                  • {sig}
                </ThemedText>
              ))}
            </View>

            {/* Recommendations */}
            <View style={styles.section}>
              <ThemedText style={styles.sectionTitle}>Recommendations</ThemedText>
              {getHouseRecommendations(house).map((rec, index) => (
                <ThemedText key={index} style={styles.recommendation}>
                  • {rec}
                </ThemedText>
              ))}
            </View>
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: Theme.spacing.lg,
  },
  houseContainer: {
    backgroundColor: Theme.colors.surface.light,
    borderRadius: Theme.borderRadius.md,
    padding: Theme.spacing.md,
    gap: Theme.spacing.md,
  },
  houseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  houseTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Theme.colors.text.light,
  },
  houseNature: {
    fontSize: 14,
    color: Theme.colors.text.muted.light,
  },
  strengthContainer: {
    alignItems: 'flex-end',
    gap: Theme.spacing.xxs,
  },
  strengthText: {
    fontSize: 14,
    fontWeight: '600',
    color: Theme.colors.text.muted.light,
  },
  strengthBar: {
    width: 60,
    height: 4,
    backgroundColor: Theme.colors.border.light,
    borderRadius: Theme.borderRadius.full,
    overflow: 'hidden',
  },
  strengthFill: {
    height: '100%',
    borderRadius: Theme.borderRadius.full,
  },
  detailsContainer: {
    gap: Theme.spacing.md,
  },
  section: {
    gap: Theme.spacing.sm,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Theme.colors.text.light,
  },
  sectionText: {
    fontSize: 14,
    color: Theme.colors.text.light,
  },
  planetsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Theme.spacing.xs,
  },
  planetTag: {
    backgroundColor: Theme.colors.primary + '20',
    paddingHorizontal: Theme.spacing.sm,
    paddingVertical: Theme.spacing.xxs,
    borderRadius: Theme.borderRadius.full,
  },
  planetText: {
    fontSize: 12,
    color: Theme.colors.primary,
    fontWeight: '500',
  },
  aspectsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Theme.spacing.xs,
  },
  aspectTag: {
    backgroundColor: Theme.colors.secondary + '20',
    paddingHorizontal: Theme.spacing.sm,
    paddingVertical: Theme.spacing.xxs,
    borderRadius: Theme.borderRadius.full,
  },
  aspectText: {
    fontSize: 12,
    color: Theme.colors.secondary,
    fontWeight: '500',
  },
  signification: {
    fontSize: 14,
    color: Theme.colors.text.light,
    lineHeight: 20,
    paddingLeft: Theme.spacing.md,
  },
  recommendation: {
    fontSize: 14,
    color: Theme.colors.text.muted.light,
    lineHeight: 20,
    paddingLeft: Theme.spacing.md,
    fontStyle: 'italic',
  },
}); 