import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import type { TravelParty, TripDraft } from '@/domain/trip/types';
import { AppButton } from '@/presentation/components/AppButton';
import { AppTextInput } from '@/presentation/components/AppTextInput';
import { BackButton } from '@/presentation/components/BackButton';
import { ChoiceChip } from '@/presentation/components/ChoiceChip';
import { translate } from '@/services/i18n';
import { colors, radii, spacing, typography } from '@/theme/tokens';

type TravelPartyScreenProps = Readonly<{
  draft: TripDraft;
  onBack: () => void;
  onChange: (changes: Partial<TripDraft>) => void;
}>;

const parties: readonly TravelParty[] = ['solo', 'couple', 'family', 'friends'];

export function TravelPartyScreen({ draft, onBack, onChange }: TravelPartyScreenProps) {
  const setTravelerCount = (travelerCount: number) =>
    onChange({ travelerCount: Math.max(1, Math.min(99, travelerCount)) });
  const setChildren = (travelingWithChildren: boolean) =>
    onChange({
      travelingWithChildren,
      childAges: travelingWithChildren ? (draft.childAges.length ? draft.childAges : [null]) : [],
    });
  const changeChildCount = (count: number) => {
    const safeCount = Math.max(1, Math.min(draft.travelerCount, count));
    onChange({
      childAges: Array.from({ length: safeCount }, (_, index) => draft.childAges[index] ?? null),
    });
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
            <Text style={styles.title}>{translate('partyTitle')}</Text>
            <Text style={styles.description}>{translate('partyDescription')}</Text>
          </View>
          <View style={styles.form}>
            <View style={styles.question} accessibilityRole="radiogroup">
              <Text style={styles.questionLabel}>{translate('whoTravels')}</Text>
              <View style={styles.choices}>
                {parties.map((party) => (
                  <ChoiceChip
                    key={party}
                    label={translate(`party_${party}`)}
                    selected={draft.party === party}
                    onPress={() => onChange({ party })}
                  />
                ))}
              </View>
            </View>
            <View style={styles.question}>
              <Text style={styles.questionLabel}>{translate('travelerCount')}</Text>
              <View style={styles.stepper}>
                <AppButton
                  accessibilityLabel={translate('decreaseTravelers')}
                  disabled={draft.travelerCount <= 1}
                  label="−"
                  onPress={() => setTravelerCount(draft.travelerCount - 1)}
                  style={styles.stepperButton}
                />
                <Text accessibilityLiveRegion="polite" style={styles.count}>
                  {draft.travelerCount}
                </Text>
                <AppButton
                  accessibilityLabel={translate('increaseTravelers')}
                  disabled={draft.travelerCount >= 99}
                  label="+"
                  onPress={() => setTravelerCount(draft.travelerCount + 1)}
                  style={styles.stepperButton}
                />
              </View>
            </View>
            {draft.party === 'family' ? (
              <View style={styles.question} accessibilityRole="radiogroup">
                <Text style={styles.questionLabel}>{translate('anyChildren')}</Text>
                <View style={styles.choices}>
                  <ChoiceChip
                    label={translate('no')}
                    selected={draft.travelingWithChildren === false}
                    onPress={() => setChildren(false)}
                  />
                  <ChoiceChip
                    label={translate('yes')}
                    selected={draft.travelingWithChildren === true}
                    onPress={() => setChildren(true)}
                  />
                </View>
              </View>
            ) : null}
            {draft.party === 'family' && draft.travelingWithChildren ? (
              <View style={styles.question}>
                <Text style={styles.questionLabel}>{translate('childrenCount')}</Text>
                <View style={styles.stepper}>
                  <AppButton
                    disabled={draft.childAges.length <= 1}
                    label="−"
                    onPress={() => changeChildCount(draft.childAges.length - 1)}
                    style={styles.stepperButton}
                  />
                  <Text style={styles.count}>{draft.childAges.length}</Text>
                  <AppButton
                    disabled={draft.childAges.length >= draft.travelerCount}
                    label="+"
                    onPress={() => changeChildCount(draft.childAges.length + 1)}
                    style={styles.stepperButton}
                  />
                </View>
                {draft.childAges.map((age, index) => (
                  <AppTextInput
                    inputMode="numeric"
                    key={index}
                    label={`${translate('childAge')} ${index + 1}`}
                    maxLength={2}
                    onChangeText={(text) => {
                      const ages = [...draft.childAges];
                      const digits = text.replace(/\D/g, '');
                      ages[index] = digits ? Math.min(17, Number(digits)) : null;
                      onChange({ childAges: ages });
                    }}
                    value={age === null ? '' : String(age)}
                  />
                ))}
              </View>
            ) : null}
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
  content: { flexGrow: 1, padding: spacing.lg, paddingBottom: spacing.xxl },
  heading: { gap: spacing.sm, marginBottom: spacing.xl, marginTop: spacing.lg },
  title: { color: colors.text, ...typography.title },
  description: { color: colors.textMuted, ...typography.body },
  form: { gap: spacing.xl, marginBottom: spacing.xl },
  question: { gap: spacing.md },
  questionLabel: { color: colors.text, ...typography.heading },
  choices: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  stepper: {
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radii.pill,
    borderWidth: 1,
    flexDirection: 'row',
  },
  stepperButton: { borderRadius: radii.pill, minHeight: 48, minWidth: 52, paddingHorizontal: 0 },
  count: { color: colors.text, fontSize: 18, fontWeight: '600', minWidth: 52, textAlign: 'center' },
});
