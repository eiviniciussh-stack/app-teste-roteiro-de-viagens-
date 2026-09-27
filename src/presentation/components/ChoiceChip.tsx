import { Pressable, StyleSheet, Text } from 'react-native';

import { colors, radii, spacing, typography } from '@/theme/tokens';

type ChoiceChipProps = Readonly<{
  label: string;
  selected: boolean;
  onPress: () => void;
}>;

export function ChoiceChip({ label, selected, onPress }: ChoiceChipProps) {
  return (
    <Pressable
      accessibilityRole="radio"
      accessibilityState={{ checked: selected }}
      onPress={onPress}
      style={({ pressed }) => [styles.chip, selected && styles.selected, pressed && styles.pressed]}
    >
      <Text style={[styles.label, selected && styles.selectedLabel]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  chip: {
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radii.pill,
    borderWidth: 1,
    justifyContent: 'center',
    minHeight: 48,
    paddingHorizontal: spacing.md,
  },
  selected: { backgroundColor: colors.primary, borderColor: colors.primary },
  pressed: { opacity: 0.75 },
  label: { color: colors.text, ...typography.button },
  selectedLabel: { color: colors.onPrimary },
});
