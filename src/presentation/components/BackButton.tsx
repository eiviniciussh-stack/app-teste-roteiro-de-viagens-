import { Pressable, StyleSheet, Text } from 'react-native';

import { translate } from '@/services/i18n';
import { colors, spacing, typography } from '@/theme/tokens';

type BackButtonProps = Readonly<{ onPress: () => void }>;

export function BackButton({ onPress }: BackButtonProps) {
  return (
    <Pressable
      accessibilityLabel={translate('tripBack')}
      accessibilityRole="button"
      hitSlop={8}
      onPress={onPress}
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}
    >
      <Text style={styles.icon}>‹</Text>
      <Text style={styles.label}>{translate('tripBack')}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    alignSelf: 'flex-start',
    flexDirection: 'row',
    minHeight: 44,
    paddingRight: spacing.md,
  },
  pressed: { opacity: 0.6 },
  icon: { color: colors.primary, fontSize: 34, lineHeight: 38, marginRight: spacing.xs },
  label: { color: colors.primary, ...typography.button },
});
