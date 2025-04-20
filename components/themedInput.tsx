import { useTheme } from '@react-navigation/native';
import React from 'react';
import { TextInput } from 'react-native';
import { theme } from './themes';


type ThemedInputProps = {
  value: string;
  onChangeText: (text: string) => void;
  label: string;
};

export const ThemedInput: React.FC<ThemedInputProps> = ({ value, onChangeText, label }) => {
  const { colors } = theme.light;

  return (
    <TextInput
      value={value}
      onChangeText={onChangeText}
      placeholder={label}
      placeholderTextColor={colors.text}
      style={{ margin: 10,
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
       }}
    />
  );
};
