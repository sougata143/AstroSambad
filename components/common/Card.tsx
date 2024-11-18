import { Pressable, StyleSheet, ViewStyle } from 'react-native';
import { Theme } from '@/constants/Theme';

interface Props {
  children: React.ReactNode;
  style?: ViewStyle;
  onPress?: () => void;
}

export function Card({ children, style, onPress }: Props) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.card,
        style,
        onPress && pressed && styles.pressed,
      ]}
      onPress={onPress}
      disabled={!onPress}
    >
      {children}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Theme.colors.surface.light,
    borderRadius: Theme.borderRadius.lg,
    padding: Theme.spacing.lg,
    ...Theme.shadows.medium,
  },
  pressed: {
    opacity: 0.8,
    transform: [{ scale: 0.98 }],
  },
}); 