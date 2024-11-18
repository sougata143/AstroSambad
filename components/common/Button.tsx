import { StyleSheet, Pressable, Text, PressableProps } from 'react-native';
import { Theme } from '@/constants/Theme';

interface Props extends PressableProps {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
  label: string;
}

export function Button({ 
  variant = 'primary',
  size = 'medium',
  label,
  style,
  disabled,
  ...props 
}: Props) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        styles[variant],
        styles[size],
        pressed && styles.pressed,
        disabled && styles.disabled,
        style,
      ]}
      disabled={disabled}
      {...props}
    >
      <Text style={[
        styles.label,
        styles[`${variant}Label`],
        styles[`${size}Label`],
        disabled && styles.disabledLabel,
      ]}>
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: Theme.borderRadius.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primary: {
    backgroundColor: Theme.colors.primary,
  },
  secondary: {
    backgroundColor: Theme.colors.secondary,
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: Theme.colors.primary,
  },
  small: {
    paddingVertical: Theme.spacing.xs,
    paddingHorizontal: Theme.spacing.md,
  },
  medium: {
    paddingVertical: Theme.spacing.sm,
    paddingHorizontal: Theme.spacing.lg,
  },
  large: {
    paddingVertical: Theme.spacing.md,
    paddingHorizontal: Theme.spacing.xl,
  },
  pressed: {
    opacity: 0.8,
  },
  disabled: {
    opacity: 0.5,
  },
  label: {
    ...Theme.typography.button,
  },
  primaryLabel: {
    color: Theme.colors.background.light,
  },
  secondaryLabel: {
    color: Theme.colors.background.light,
  },
  outlineLabel: {
    color: Theme.colors.primary,
  },
  smallLabel: {
    fontSize: 14,
  },
  mediumLabel: {
    fontSize: 16,
  },
  largeLabel: {
    fontSize: 18,
  },
  disabledLabel: {
    color: Theme.colors.text.muted.light,
  },
}); 