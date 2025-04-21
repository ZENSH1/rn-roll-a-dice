import React from 'react';
import { Text } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { theme } from './themes';

type ThemedTextProps = {
  children: React.ReactNode;
  fontsize: number; // Add fontSize prop
};
//Add text size as a prop 
export const ThemedText: React.FC<ThemedTextProps> = ({ children,fontsize }) => {
  const { colors } = theme.light;

  return (
    <Text style={{ color: colors.text, fontSize: fontsize, margin: 5, 
      
     }}>
      {children}
    </Text>
  );
};
