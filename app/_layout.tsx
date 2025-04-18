import { Stack } from "expo-router";

export default function RootLayout() {
  return <Stack>
    <Stack.Screen name="index" options={{ title: 'Home' }} />
    <Stack.Screen name="diceRollScreen" options={{ title: 'Dice Roll' }} />
    <Stack.Screen name="historyScreen" options={{ title: 'History' }} />
    </Stack>;
}
