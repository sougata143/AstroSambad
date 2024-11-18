import { useState } from 'react';
import { StyleSheet, TextInput, View, Pressable, Platform, ScrollView } from 'react-native';
import * as Location from 'expo-location';
import { useTranslation } from 'react-i18next';

import { ThemedText } from '@/components/ThemedText';
import { Theme } from '@/constants/Theme';
import type { BirthDetails } from '@/types/birthDetails';

interface Props {
  onLocationSelect: (location: BirthDetails['birthPlace']) => void;
}

interface LocationResult {
  name: string;
  latitude: number;
  longitude: number;
  city?: string;
  country?: string;
}

export function LocationSearch({ onLocationSelect }: Props) {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<LocationResult[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<string>('');

  const searchLocation = async (query: string) => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.warn('Location permission denied');
        return;
      }

      // Get geocoding results
      const results = await Location.geocodeAsync(query);
      
      // Get detailed address for each result
      const detailedResults = await Promise.all(
        results.map(async (result) => {
          const addresses = await Location.reverseGeocodeAsync({
            latitude: result.latitude,
            longitude: result.longitude,
          });
          const address = addresses[0];
          return {
            name: `${address.city || address.region || ''}, ${address.country || ''}`,
            latitude: result.latitude,
            longitude: result.longitude,
            city: address.city || address.region,
            country: address.country,
          };
        })
      );

      // Filter out duplicates and empty results
      const uniqueResults = detailedResults.filter(
        (result, index, self) =>
          result.name.trim() !== ',' &&
          index === self.findIndex((r) => r.name === result.name)
      );

      setSearchResults(uniqueResults);
    } catch (error) {
      console.error('Error searching location:', error);
      setSearchResults([]);
    }
  };

  const handleLocationSelect = async (location: LocationResult) => {
    try {
      setSelectedLocation(location.name);
      setSearchQuery(location.name);
      setSearchResults([]); // Clear results after selection

      onLocationSelect({
        latitude: location.latitude,
        longitude: location.longitude,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        locationName: location.name,
      });
    } catch (error) {
      console.error('Error selecting location:', error);
    }
  };

  return (
    <View style={styles.container}>
      <ThemedText style={styles.label}>Place of Birth</ThemedText>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          value={searchQuery}
          onChangeText={(text) => {
            setSearchQuery(text);
            if (text.length > 2) {
              searchLocation(text);
            } else {
              setSearchResults([]);
            }
          }}
          placeholder="Search location..."
          placeholderTextColor={Theme.colors.text.light + '80'}
        />
        {searchResults.length > 0 && (
          <ScrollView 
            style={styles.resultsContainer}
            keyboardShouldPersistTaps="handled"
            nestedScrollEnabled
          >
            {searchResults.map((result, index) => (
              <Pressable
                key={`${result.name}-${index}`}
                style={({ pressed }) => [
                  styles.resultItem,
                  pressed && styles.resultItemPressed,
                ]}
                onPress={() => handleLocationSelect(result)}
              >
                <ThemedText style={styles.resultText}>
                  {result.name}
                </ThemedText>
              </Pressable>
            ))}
          </ScrollView>
        )}
      </View>
      {selectedLocation ? (
        <ThemedText style={styles.selectedLocation}>
          Selected: {selectedLocation}
        </ThemedText>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: Theme.spacing.sm,
  },
  label: {
    fontSize: Theme.typography.body.fontSize,
    lineHeight: Theme.typography.body.lineHeight,
    fontWeight: '600',
    color: Theme.colors.text.light,
  },
  searchContainer: {
    position: 'relative',
    zIndex: 1,
  },
  input: {
    borderWidth: 1,
    borderColor: Theme.colors.border.light,
    borderRadius: Theme.borderRadius.md,
    padding: Theme.spacing.md,
    fontSize: Theme.typography.body.fontSize,
    lineHeight: Theme.typography.body.lineHeight,
    backgroundColor: Theme.colors.surface.light,
    color: Theme.colors.text.light,
  },
  resultsContainer: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    backgroundColor: Theme.colors.background.light,
    borderRadius: Theme.borderRadius.md,
    marginTop: Theme.spacing.xs,
    maxHeight: 200,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  resultItem: {
    padding: Theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Theme.colors.border.light,
  },
  resultItemPressed: {
    backgroundColor: Theme.colors.surface.light,
  },
  resultText: {
    fontSize: Theme.typography.body.fontSize,
    lineHeight: Theme.typography.body.lineHeight,
    color: Theme.colors.text.light,
  },
  selectedLocation: {
    fontSize: Theme.typography.caption.fontSize,
    color: Theme.colors.primary,
    marginTop: Theme.spacing.xs,
  },
}); 