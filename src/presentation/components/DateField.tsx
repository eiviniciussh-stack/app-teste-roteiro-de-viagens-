import { useMemo, useState } from 'react';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';

import { translate } from '@/services/i18n';
import { colors, radii, spacing, typography } from '@/theme/tokens';

type DateFieldProps = Readonly<{
  label: string;
  value: string;
  minimumDate: string;
  error?: string | undefined;
  onChange: (value: string) => void;
}>;

const toIsoDate = (date: Date) =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;

const fromIsoDate = (value: string) => {
  const [year, month, day] = value.split('-').map(Number);
  return new Date(year ?? 0, (month ?? 1) - 1, day ?? 1);
};

export function todayIsoDate() {
  return toIsoDate(new Date());
}

export function DateField({ label, value, minimumDate, error, onChange }: DateFieldProps) {
  const [visible, setVisible] = useState(false);
  const initialMonth = value || minimumDate;
  const [shownMonth, setShownMonth] = useState(() => fromIsoDate(initialMonth));
  const formatter = useMemo(
    () => new Intl.DateTimeFormat(undefined, { day: '2-digit', month: '2-digit', year: 'numeric' }),
    [],
  );
  const monthFormatter = useMemo(
    () => new Intl.DateTimeFormat(undefined, { month: 'long', year: 'numeric' }),
    [],
  );

  const firstDay = new Date(shownMonth.getFullYear(), shownMonth.getMonth(), 1);
  const daysInMonth = new Date(shownMonth.getFullYear(), shownMonth.getMonth() + 1, 0).getDate();
  const cells: (number | null)[] = [
    ...Array.from<null>({ length: firstDay.getDay() }).fill(null),
    ...Array.from({ length: daysInMonth }, (_, index) => index + 1),
  ];

  const changeMonth = (offset: number) =>
    setShownMonth(new Date(shownMonth.getFullYear(), shownMonth.getMonth() + offset, 1));

  return (
    <View style={styles.field}>
      <Text style={styles.label}>{label}</Text>
      <Pressable
        accessibilityLabel={label}
        accessibilityRole="button"
        onPress={() => {
          setShownMonth(fromIsoDate(value || minimumDate));
          setVisible(true);
        }}
        style={({ pressed }) => [
          styles.input,
          error && styles.inputError,
          pressed && styles.pressed,
        ]}
      >
        <Text style={value ? styles.value : styles.placeholder}>
          {value ? formatter.format(fromIsoDate(value)) : translate('dateSelectPlaceholder')}
        </Text>
        <Text accessibilityElementsHidden style={styles.calendarIcon}>
          ▣
        </Text>
      </Pressable>
      {error ? (
        <Text accessibilityRole="alert" style={styles.error}>
          {error}
        </Text>
      ) : null}

      <Modal
        animationType="fade"
        onRequestClose={() => setVisible(false)}
        transparent
        visible={visible}
      >
        <View style={styles.overlay}>
          <View accessibilityViewIsModal style={styles.dialog}>
            <View style={styles.monthHeader}>
              <Pressable
                accessibilityLabel={translate('previousMonth')}
                hitSlop={8}
                onPress={() => changeMonth(-1)}
              >
                <Text style={styles.arrow}>‹</Text>
              </Pressable>
              <Text style={styles.month}>{monthFormatter.format(shownMonth)}</Text>
              <Pressable
                accessibilityLabel={translate('nextMonth')}
                hitSlop={8}
                onPress={() => changeMonth(1)}
              >
                <Text style={styles.arrow}>›</Text>
              </Pressable>
            </View>
            <View style={styles.week}>
              {translate('weekdays')
                .split(',')
                .map((day, index) => (
                  <Text key={`weekday-${index}`} style={styles.weekday}>
                    {day}
                  </Text>
                ))}
            </View>
            <View style={styles.days}>
              {cells.map((day, index) => {
                if (day === null) return <View key={`empty-${index}`} style={styles.day} />;
                const date = new Date(shownMonth.getFullYear(), shownMonth.getMonth(), day);
                const isoDate = toIsoDate(date);
                const disabled = isoDate < minimumDate;
                const selected = isoDate === value;
                return (
                  <Pressable
                    accessibilityRole="button"
                    accessibilityState={{ disabled, selected }}
                    disabled={disabled}
                    key={isoDate}
                    onPress={() => {
                      onChange(isoDate);
                      setVisible(false);
                    }}
                    style={[styles.day, selected && styles.selectedDay]}
                  >
                    <Text
                      style={[
                        styles.dayText,
                        disabled && styles.disabledDay,
                        selected && styles.selectedDayText,
                      ]}
                    >
                      {day}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
            <Pressable
              accessibilityRole="button"
              onPress={() => setVisible(false)}
              style={styles.cancel}
            >
              <Text style={styles.cancelText}>{translate('cancel')}</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  field: { gap: spacing.sm },
  label: { color: colors.text, fontSize: 15, fontWeight: '600' },
  input: {
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radii.sm,
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    minHeight: 52,
    paddingHorizontal: spacing.md,
  },
  inputError: { borderColor: colors.error },
  pressed: { opacity: 0.75 },
  value: { color: colors.text, ...typography.body },
  placeholder: { color: colors.textMuted, ...typography.body },
  calendarIcon: { color: colors.primary, fontSize: 19 },
  error: { color: colors.error, fontSize: 14 },
  overlay: {
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.38)',
    flex: 1,
    justifyContent: 'center',
    padding: spacing.lg,
  },
  dialog: {
    backgroundColor: colors.surface,
    borderRadius: radii.md,
    maxWidth: 380,
    padding: spacing.lg,
    width: '100%',
  },
  monthHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  arrow: { color: colors.primary, fontSize: 36, lineHeight: 40, paddingHorizontal: spacing.sm },
  month: { color: colors.text, textTransform: 'capitalize', ...typography.heading },
  week: { flexDirection: 'row' },
  weekday: { color: colors.textMuted, fontSize: 12, textAlign: 'center', width: '14.285%' },
  days: { flexDirection: 'row', flexWrap: 'wrap', marginTop: spacing.sm },
  day: { alignItems: 'center', aspectRatio: 1, justifyContent: 'center', width: '14.285%' },
  selectedDay: { backgroundColor: colors.primary, borderRadius: radii.pill },
  dayText: { color: colors.text, fontSize: 15 },
  disabledDay: { color: colors.border },
  selectedDayText: { color: colors.onPrimary, fontWeight: '700' },
  cancel: { alignSelf: 'flex-end', minHeight: 44, justifyContent: 'center', marginTop: spacing.sm },
  cancelText: { color: colors.primary, ...typography.button },
});
