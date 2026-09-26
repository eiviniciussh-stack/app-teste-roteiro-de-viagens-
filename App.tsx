import { StatusBar } from 'expo-status-bar';

import { HomeScreen } from '@/presentation/screens/HomeScreen';

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <HomeScreen />
    </>
  );
}
