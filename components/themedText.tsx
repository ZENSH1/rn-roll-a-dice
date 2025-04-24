import React from 'react';
import { Text,useColorScheme } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { Colors } from '@/constants/colors'; // Adjust the import path as necessary
type ThemedTextProps = {
  children: React.ReactNode;
  
  fontsize: number; // Add fontSize prop
};
//Add text size as a prop 
export const ThemedText: React.FC<ThemedTextProps> = ({ children, fontsize }) => {
  const colorScheme = useColorScheme(); // Get the current color scheme (light or dark)
  const colors = Colors[colorScheme || 'light'];
  

  return (
    <Text style={{ color: colors.text, fontSize: fontsize, margin: 5, 

     }}>
      {children}
    </Text>
  );
};
