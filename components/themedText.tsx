import React from 'react';
import { Text } from 'react-native';
import { useTheme } from '@react-navigation/native';

type ThemedTextProps = {
  children: React.ReactNode;
};

export const ThemedText: React.FC<ThemedTextProps> = ({ children }) => {
  const { colors } = useTheme();

  return (
    <Text style={{ color: colors.text, fontSize: 16, margin: 10 }}>
      {children}
    </Text>
  );
};
