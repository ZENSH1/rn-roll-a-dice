import { Stack } from "expo-router";
import { useColorScheme } from "react-native";
import { Colors } from "@/constants/colors";
export default function RootLayout() {
  
  const colorScheme = useColorScheme();
  const themes = Colors[colorScheme ?? "light"]; //obviously gotta be safe here
  return <Stack
  screenOptions={
    {
      headerStyle: {
        backgroundColor: themes.navBackground,
        
      },
      headerTintColor: themes.text,
      headerTitleStyle: {
        fontWeight: "bold",
        color: themes.text,
        
      },
      contentStyle: {
        backgroundColor: themes.background,
      },
      

    }
  }>
    <Stack.Screen name="index" options={{ title: 'Select Name', headerTitleAlign: 'center',  }} />
    <Stack.Screen name="diceRollScreen" options={{ title: 'Dice Roll' }} />
    <Stack.Screen name="historyScreen" options={{ title: 'History' }} />
    </Stack>;
}
