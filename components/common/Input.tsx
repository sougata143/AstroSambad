import { StyleSheet, TextInput, TextInputProps, View } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { Theme } from '@/constants/Theme';

interface Props extends TextInputProps {
  label?: string;
  error?: string;
}

export function Input({ label, error, style, ...props }: Props) {
  return (
    <View style={styles.container}>
      {label && (
        <ThemedText style={styles.label}>{label}</ThemedText>
      )}
      <TextInput
        style={[
          styles.input,
          error && styles.inputError,
          style,
        ]}
        placeholderTextColor={Theme.colors.text.muted.light}
        {...props}
      />
      {error && (
        <ThemedText style={styles.error}>{error}</ThemedText>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: Theme.spacing.xs,
  },
  label: {
    fontSize: Theme.typography.body.fontSize,
    fontWeight: '500',
    color: Theme.colors.text.light,
  },
  input: {
    backgroundColor: Theme.colors.surface.light,
    borderWidth: 1,
    borderColor: Theme.colors.border.light,
    borderRadius: Theme.borderRadius.md,
    padding: Theme.spacing.md,
    fontSize: Theme.typography.body.fontSize,
    color: Theme.colors.text.light,
  },
  inputError: {
    borderColor: Theme.colors.error,
  },
  error: {
    fontSize: Theme.typography.caption.fontSize,
    color: Theme.colors.error,
  },
}); 