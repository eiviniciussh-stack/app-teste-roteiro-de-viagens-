import { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import type { TripDraft } from '@/domain/trip/types';
import { AppButton } from '@/presentation/components/AppButton';
import { AppTextInput } from '@/presentation/components/AppTextInput';
import { BackButton } from '@/presentation/components/BackButton';
import { DateField, todayIsoDate } from '@/presentation/components/DateField';
import { translate } from '@/services/i18n';
import { colors, spacing, typography } from '@/theme/tokens';

type TripBasicsScreenProps = Readonly<{
  draft: TripDraft;
  onBack: () => void;
  onChange: (changes: Partial<TripDraft>) => void;
  onContinue: () => void;
}>;

export function TripBasicsScreen({ draft, onBack, onChange, onContinue }: TripBasicsScreenProps) {
  const [submitted, setSubmitted] = useState(false);
  const today = todayIsoDate();
  const destinationMissing = !draft.destination.trim();
  const departureMissing = !draft.departureDate;
  const returnMissing = !draft.returnDate;
  const invalidRange = Boolean(
    draft.departureDate && draft.returnDate && draft.returnDate < draft.departureDate,
  );
  const isValid = !destinationMissing && !departureMissing && !returnMissing && !invalidRange;

  const continueFlow = () => {
    setSubmitted(true);
    if (isValid) onContinue();
  };

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
          <BackButton onPress={onBack} />
          <View style={styles.heading}>
            <Text style={styles.title}>{translate('tripTitle')}</Text>
            <Text style={styles.description}>{translate('tripDescription')}</Text>
          </View>
          <View style={styles.form}>
            <AppTextInput
              autoCapitalize="words"
              autoComplete="off"
              error={submitted && destinationMissing ? translate('destinationRequired') : undefined}
              label={translate('destinationLabel')}
              onChangeText={(destination) => onChange({ destination })}
              placeholder={translate('destinationPlaceholder')}
              returnKeyType="done"
              value={draft.destination}
            />
            <DateField
              error={submitted && departureMissing ? translate('departureRequired') : undefined}
              label={translate('departureDateLabel')}
              minimumDate={today}
              onChange={(departureDate) => {
                onChange({
                  departureDate,
                  ...(draft.returnDate && draft.returnDate < departureDate
                    ? { returnDate: '' }
                    : {}),
                });
              }}
              value={draft.departureDate}
            />
            <DateField
              error={
                submitted && returnMissing
                  ? translate('returnRequired')
                  : submitted && invalidRange
                    ? translate('returnBeforeDeparture')
                    : undefined
              }
              label={translate('returnDateLabel')}
              minimumDate={draft.departureDate || today}
              onChange={(returnDate) => onChange({ returnDate })}
              value={draft.returnDate}
            />
          </View>
          <AppButton
            accessibilityHint={!isValid ? translate('completeRequiredFields') : undefined}
            label={translate('continueButton')}
            onPress={continueFlow}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { backgroundColor: colors.background, flex: 1 },
  keyboardArea: { flex: 1 },
  content: { flexGrow: 1, padding: spacing.lg },
  heading: { gap: spacing.sm, marginBottom: spacing.xl, marginTop: spacing.lg },
  title: { color: colors.text, ...typography.title },
  description: { color: colors.textMuted, ...typography.body },
  form: { gap: spacing.lg, marginBottom: spacing.xl },
});
