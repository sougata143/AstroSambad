import { useEffect } from 'react';
import { Platform } from 'react-native';
import * as Location from 'expo-location';
import { router } from 'expo-router';

export default function InitialScreen() {
  useEffect(() => {
    async function initialize() {
      if (Platform.OS !== 'web') {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          console.warn('Location permission not granted');
        }
      }
      
      // Navigate to the main app
      router.replace('/(tabs)');
    }

    initialize();
  }, []);

  return null;
} 