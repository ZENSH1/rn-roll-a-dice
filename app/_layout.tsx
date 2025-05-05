import { Stack } from "expo-router";
import { useColorScheme } from "react-native";
import { Colors } from "@/constants/colors";
import { UserProvider } from "@/context/UserContext";


export default function RootLayout() {
  
  const colorScheme = useColorScheme();
  const themes = Colors[colorScheme ?? "light"]; //obviously gotta be safe here
  return(<UserProvider>
  <Stack
  screenOptions={{
    headerStyle: {
      backgroundColor: themes.navBackground,
    },
    headerTintColor: themes.text,
    contentStyle: {
      backgroundColor: themes.background,
    },
  }} >
    
    <Stack.Screen 
      name="index" 
      options={{ 
        title: 'Select User',
      }} 
    />
    <Stack.Screen 
      name="diceRollScreen" 
      options={{ 
        title: 'Roll Dice',
      }} 
    />
    <Stack.Screen 
      name="historyScreen" 
      options={{ 
        title: 'History',
      }} 
    />
  </Stack>
</UserProvider>)
}
