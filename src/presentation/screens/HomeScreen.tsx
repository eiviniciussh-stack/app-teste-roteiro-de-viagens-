import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';

import { translate } from '@/services/i18n';
import { AppButton } from '@/presentation/components/AppButton';
import { FeatureCard } from '@/presentation/components/FeatureCard';
import { colors, spacing, typography } from '@/theme/tokens';

export function HomeScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.hero}>
          <Text style={styles.eyebrow}>{translate('eyebrow')}</Text>
          <Text style={styles.title}>{translate('title')}</Text>
          <Text style={styles.subtitle}>{translate('subtitle')}</Text>
        </View>

        <FeatureCard title={translate('cardTitle')} description={translate('cardDescription')} />
        <AppButton label={translate('button')} onPress={() => undefined} />
        <Text style={styles.note}>{translate('note')}</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { backgroundColor: colors.background, flex: 1 },
  content: {
    flexGrow: 1,
    gap: spacing.lg,
    justifyContent: 'center',
    padding: spacing.lg,
  },
  hero: { gap: spacing.md },
  eyebrow: {
    color: colors.primary,
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 1.2,
    textTransform: 'uppercase',
  },
  title: { color: colors.text, ...typography.title },
  subtitle: { color: colors.textMuted, ...typography.body },
  note: { color: colors.textMuted, fontSize: 13, textAlign: 'center' },
});
