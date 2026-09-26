import { getLocales } from 'expo-localization';

import { en } from './locales/en';
import { ptBR } from './locales/pt-BR';

const translations = { en, 'pt-BR': ptBR } as const;
type Locale = keyof typeof translations;
type TranslationKey = keyof typeof en;

function deviceLocale(): Locale {
  const languageTag = getLocales()[0]?.languageTag;
  return languageTag?.toLowerCase().startsWith('pt') ? 'pt-BR' : 'en';
}

// A persisted user preference will take precedence here when settings are implemented.
export function translate(key: TranslationKey): string {
  return translations[deviceLocale()][key];
}
