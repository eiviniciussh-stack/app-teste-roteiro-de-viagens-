import { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { AppButton } from '@/presentation/components/AppButton';
import { AppTextInput } from '@/presentation/components/AppTextInput';
import { translate } from '@/services/i18n';
import { colors, spacing, typography } from '@/theme/tokens';

type TripBasicsScreenProps = Readonly<{
  onBack: () => void;
}>;

export function TripBasicsScreen({ onBack }: TripBasicsScreenProps) {
  const [destination, setDestination] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [returnDate, setReturnDate] = useState('');

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.keyboardArea}
      >
        <ScrollView
          contentContainerStyle={styles.content}
          keyboardDismissMode="interactive"
          keyboardShouldPersistTaps="handled"
        >
          <Pressable
            accessibilityLabel={translate('tripBack')}
            accessibilityRole="button"
            hitSlop={8}
            onPress={onBack}
            style={({ pressed }) => [styles.backButton, pressed && styles.backButtonPressed]}
          >
            <Text style={styles.backIcon}>‹</Text>
            <Text style={styles.backLabel}>{translate('tripBack')}</Text>
          </Pressable>

          <View style={styles.heading}>
            <Text style={styles.title}>{translate('tripTitle')}</Text>
            <Text style={styles.description}>{translate('tripDescription')}</Text>
          </View>

          <View style={styles.form}>
            <AppTextInput
              autoCapitalize="words"
              autoComplete="off"
              onChangeText={setDestination}
              placeholder={translate('destinationPlaceholder')}
              returnKeyType="next"
              value={destination}
              label={translate('destinationLabel')}
            />
            <AppTextInput
              inputMode="numeric"
              onChangeText={setDepartureDate}
              placeholder={translate('datePlaceholder')}
              returnKeyType="next"
              value={departureDate}
              label={translate('departureDateLabel')}
            />
            <AppTextInput
              inputMode="numeric"
              onChangeText={setReturnDate}
              placeholder={translate('datePlaceholder')}
              returnKeyType="done"
              value={returnDate}
              label={translate('returnDateLabel')}
            />
          </View>

          <AppButton label={translate('continueButton')} onPress={() => undefined} />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { backgroundColor: colors.background, flex: 1 },
  keyboardArea: { flex: 1 },
  content: {
    flexGrow: 1,
    padding: spacing.lg,
  },
  backButton: {
    alignItems: 'center',
    alignSelf: 'flex-start',
    flexDirection: 'row',
    minHeight: 44,
    paddingRight: spacing.md,
  },
  backButtonPressed: { opacity: 0.6 },
  backIcon: { color: colors.primary, fontSize: 34, lineHeight: 38, marginRight: spacing.xs },
  backLabel: { color: colors.primary, ...typography.button },
  heading: { gap: spacing.sm, marginBottom: spacing.xl, marginTop: spacing.lg },
  title: { color: colors.text, ...typography.title },
  description: { color: colors.textMuted, ...typography.body },
  form: { gap: spacing.lg, marginBottom: spacing.xl },
});
