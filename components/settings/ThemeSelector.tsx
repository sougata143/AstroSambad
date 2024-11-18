import { StyleSheet } from 'react-native';
import { useColorScheme } from '@/hooks/useColorScheme';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export function ThemeSelector() {
  const colorScheme = useColorScheme();

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="subtitle">Theme</ThemedText>
      <ThemedText>Current theme: {colorScheme}</ThemedText>
      <ThemedText>System default theme will be used</ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 12,
  },
}); 