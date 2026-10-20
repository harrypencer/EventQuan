import { Stack } from 'expo-router/stack';

import { quiet } from '@/theme';

// v2 "quiet" direction lives beside v1 so both can be compared on the canvas.
export default function QuietLayout() {
  return (
    <Stack screenOptions={{ headerShown: false, animation: 'none', contentStyle: { backgroundColor: quiet.paper } }}>
      <Stack.Screen name="welcome" options={{ contentStyle: { backgroundColor: quiet.night } }} />
      <Stack.Screen name="ticket" options={{ contentStyle: { backgroundColor: quiet.night } }} />
    </Stack>
  );
}
