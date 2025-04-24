import { Stack } from "expo-router";
import { useColorScheme } from "react-native";
import { theme } from "@/components/themes";

export default function RootLayout() {
  
  const colorScheme = useColorScheme();
  const themes = theme[colorScheme ?? "light"]; //obviously gotta be safe here
  return <Stack
  screenOptions={
    {
      headerStyle: {
        backgroundColor: themes.colors.background,
      },
      headerTintColor: themes.colors.text,
      headerTitleStyle: {
        fontWeight: "bold",
      },
      contentStyle: {
        backgroundColor: themes.colors.white,
      },
    }
  }>
    <Stack.Screen name="index" options={{ title: 'Home' }} />
    <Stack.Screen name="diceRollScreen" options={{ title: 'Dice Roll' }} />
    <Stack.Screen name="historyScreen" options={{ title: 'History' }} />
    </Stack>;
}
