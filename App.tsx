import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';

import { HomeScreen } from '@/presentation/screens/HomeScreen';
import { TripBasicsScreen } from '@/presentation/screens/TripBasicsScreen';

type Screen = 'home' | 'tripBasics';

export default function App() {
  const [screen, setScreen] = useState<Screen>('home');

  return (
    <>
      <StatusBar style="auto" />
      {screen === 'home' ? (
        <HomeScreen onStartPlanning={() => setScreen('tripBasics')} />
      ) : (
        <TripBasicsScreen onBack={() => setScreen('home')} />
      )}
    </>
  );
}
