import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Card } from '@/components/common/Card';
import { DetailModal } from '@/components/common/DetailModal';
import { ThemedText } from '@/components/ThemedText';
import { Theme } from '@/constants/Theme';

interface DetailSection {
  title: string;
  data: any;
  type: 'bar' | 'pie';
}

export function LagnaAnalysis({ horoscopeData }) {
  const [selectedSection, setSelectedSection] = useState<DetailSection | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const sections: DetailSection[] = [
    {
      title: 'House Strengths',
      data: [
        { x: 'House 1', y: 75 },
        { x: 'House 2', y: 60 },
        { x: 'House 3', y: 45 },
        { x: 'House 4', y: 80 },
        { x: 'House 5', y: 65 },
        { x: 'House 6', y: 55 },
        { x: 'House 7', y: 70 },
        { x: 'House 8', y: 50 },
        { x: 'House 9', y: 85 },
        { x: 'House 10', y: 90 },
        { x: 'House 11', y: 75 },
        { x: 'House 12', y: 40 },
      ],
      type: 'bar',
    },
    {
      title: 'Planetary Positions',
      data: [
        { x: 'Sun', y: 30 },
        { x: 'Moon', y: 45 },
        { x: 'Mars', y: 25 },
        { x: 'Mercury', y: 35 },
        { x: 'Jupiter', y: 40 },
        { x: 'Venus', y: 50 },
        { x: 'Saturn', y: 20 },
        { x: 'Rahu', y: 15 },
        { x: 'Ketu', y: 15 },
      ],
      type: 'pie',
    },
  ];

  const renderVisualization = (section: DetailSection) => {
    if (section.type === 'bar') {
      return (
        <View style={styles.barChart}>
          {section.data.map((item: any, index: number) => (
            <View key={index} style={styles.barItem}>
              <View style={styles.barLabel}>
                <ThemedText style={styles.barText}>{item.x}</ThemedText>
                <ThemedText style={styles.barValue}>{item.y}%</ThemedText>
              </View>
              <View style={styles.barContainer}>
                <View 
                  style={[
                    styles.barFill,
                    { 
                      width: `${item.y}%`,
                      backgroundColor: item.y > 70 ? Theme.colors.success :
                                     item.y > 40 ? Theme.colors.warning :
                                     Theme.colors.error
                    }
                  ]} 
                />
              </View>
            </View>
          ))}
        </View>
      );
    }

    if (section.type === 'pie') {
      return (
        <View style={styles.pieChart}>
          {section.data.map((item: any, index: number) => (
            <View key={index} style={styles.pieItem}>
              <View style={styles.pieLabel}>
                <ThemedText style={styles.pieText}>{item.x}</ThemedText>
                <ThemedText style={styles.pieValue}>{item.y}%</ThemedText>
              </View>
              <View style={styles.pieContainer}>
                <View 
                  style={[
                    styles.pieFill,
                    { width: `${item.y}%` }
                  ]} 
                />
              </View>
            </View>
          ))}
        </View>
      );
    }

    return null;
  };

  return (
    <View style={styles.container}>
      {sections.map((section, index) => (
        <Card
          key={index}
          style={styles.section}
          onPress={() => {
            setSelectedSection(section);
            setModalVisible(true);
          }}
        >
          <ThemedText style={styles.sectionTitle}>{section.title}</ThemedText>
          <ThemedText style={styles.sectionPreview}>
            Tap to view detailed analysis
          </ThemedText>
        </Card>
      ))}

      <DetailModal
        isVisible={modalVisible}
        onClose={() => {
          setModalVisible(false);
          setSelectedSection(null);
        }}
        title={selectedSection?.title || ''}
      >
        {selectedSection && (
          <View style={styles.modalContent}>
            {renderVisualization(selectedSection)}
            <View style={styles.detailsContainer}>
              <ThemedText style={styles.detailsTitle}>Analysis</ThemedText>
              <ThemedText style={styles.detailsText}>
                {selectedSection.type === 'bar' 
                  ? 'This chart shows the relative strengths of each house in your birth chart. Higher values indicate stronger influence and better results from that house.'
                  : 'This chart shows the distribution of planetary influences in your birth chart. Larger segments indicate stronger planetary influence.'}
              </ThemedText>
            </View>
          </View>
        )}
      </DetailModal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: Theme.spacing.md,
  },
  section: {
    marginBottom: Theme.spacing.sm,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: Theme.spacing.xs,
  },
  sectionPreview: {
    fontSize: 14,
    color: Theme.colors.text.muted.light,
  },
  modalContent: {
    flex: 1,
    gap: Theme.spacing.lg,
  },
  detailsContainer: {
    gap: Theme.spacing.md,
    padding: Theme.spacing.md,
  },
  detailsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Theme.colors.text.light,
  },
  detailsText: {
    fontSize: 14,
    color: Theme.colors.text.muted.light,
    lineHeight: 20,
  },
  barChart: {
    gap: Theme.spacing.sm,
    padding: Theme.spacing.md,
  },
  barItem: {
    gap: Theme.spacing.xs,
  },
  barLabel: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  barText: {
    fontSize: 14,
    color: Theme.colors.text.light,
  },
  barValue: {
    fontSize: 14,
    fontWeight: '600',
    color: Theme.colors.primary,
  },
  barContainer: {
    height: 8,
    backgroundColor: Theme.colors.border.light,
    borderRadius: Theme.borderRadius.full,
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    borderRadius: Theme.borderRadius.full,
  },
  pieChart: {
    gap: Theme.spacing.sm,
    padding: Theme.spacing.md,
  },
  pieItem: {
    gap: Theme.spacing.xs,
  },
  pieLabel: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  pieText: {
    fontSize: 14,
    color: Theme.colors.text.light,
  },
  pieValue: {
    fontSize: 14,
    fontWeight: '600',
    color: Theme.colors.primary,
  },
  pieContainer: {
    height: 8,
    backgroundColor: Theme.colors.border.light,
    borderRadius: Theme.borderRadius.full,
    overflow: 'hidden',
  },
  pieFill: {
    height: '100%',
    backgroundColor: Theme.colors.primary,
    borderRadius: Theme.borderRadius.full,
  },
}); 