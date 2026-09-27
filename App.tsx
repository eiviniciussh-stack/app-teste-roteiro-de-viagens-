import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';

import { HomeScreen } from '@/presentation/screens/HomeScreen';
import { TripBasicsScreen } from '@/presentation/screens/TripBasicsScreen';
import { TravelPartyScreen } from '@/presentation/screens/TravelPartyScreen';
import type { TripDraft } from '@/domain/trip/types';

type Screen = 'home' | 'tripBasics' | 'travelParty';
const initialDraft: TripDraft = {
  destination: '',
  departureDate: '',
  returnDate: '',
  party: null,
  travelerCount: 1,
  travelingWithChildren: null,
  childAges: [],
};

export default function App() {
  const [screen, setScreen] = useState<Screen>('home');
  const [draft, setDraft] = useState<TripDraft>(initialDraft);
  const updateDraft = (changes: Partial<TripDraft>) =>
    setDraft((current) => ({ ...current, ...changes }));

  return (
    <>
      <StatusBar style="auto" />
      {screen === 'home' ? (
        <HomeScreen onStartPlanning={() => setScreen('tripBasics')} />
      ) : screen === 'tripBasics' ? (
        <TripBasicsScreen
          draft={draft}
          onBack={() => setScreen('home')}
          onChange={updateDraft}
          onContinue={() => setScreen('travelParty')}
        />
      ) : (
        <TravelPartyScreen
          draft={draft}
          onBack={() => setScreen('tripBasics')}
          onChange={updateDraft}
        />
      )}
    </>
  );
}
