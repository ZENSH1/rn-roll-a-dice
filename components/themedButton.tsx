import { useTheme } from '@react-navigation/native';
import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { theme } from './themes'; // Adjust the import path as necessary
type ThemedButtonProps = {
  onPress: () => void;
  title: string;
};

export const ThemedButton: React.FC<ThemedButtonProps> = ({ onPress, title }) => {
  const { colors } = theme.light;

return (
    <TouchableOpacity
        onPress={onPress}
        style={{
            backgroundColor: colors.primary,
            paddingVertical: 12,
            paddingHorizontal: 20,
            borderRadius: 25,
            margin: 10,
            alignItems: 'center',
            justifyContent: 'center',
            width:"auto",
            height: 50,
        }}>
        <Text style={{ color: 'white', fontSize: 16 }}>{title}</Text>
    </TouchableOpacity>
);
};
