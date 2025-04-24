import { useTheme } from '@react-navigation/native';
import React from 'react';
import { TextInput,useColorScheme } from 'react-native';
import { Colors } from '@/constants/colors'; // Adjust the import path as necessary


type ThemedInputProps = {
  value: string;
  onChangeText: (text: string) => void;
  label: string;
  style?: object; // Optional style prop for additional styling
};

export const ThemedInput: React.FC<ThemedInputProps> = ({ value, onChangeText, label, style }) => {
    const colorScheme = useColorScheme(); // Get the current color scheme (light or dark)
    const colors = Colors[colorScheme || 'light']; // Get the colors based on the current color scheme

  return (
    <TextInput
      value={value}
      onChangeText={onChangeText}
      placeholder={label}
      placeholderTextColor={colors.text}
      style={[{ margin: 10,
        borderColor: colors.onSurfaceVariant,
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        color: colors.text,
        backgroundColor: colors.background,
        fontSize: 16,
        height: 40,
        width: '80%',
        alignSelf: 'center',
       }, style] } // Merge with additional styles if provided
    />
  );
};
