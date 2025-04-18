import { useTheme } from '@react-navigation/native';
import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { theme } from './themes'; // Adjust the import path as necessary
type ThemedButtonProps = {
  onPress: () => void;
  title: string;
};

export const ThemedButton: React.FC<ThemedButtonProps> = ({ onPress, title }) => {
  const { colors } = useTheme();

return (
    <TouchableOpacity
        onPress={onPress}
        style={{
            backgroundColor: colors.primary,
            padding: 10,
            borderRadius: 5,
            margin: 10,
            alignItems: 'center',
        }}>
        <Text style={{ color: 'white', fontSize: 16 }}>{title}</Text>
    </TouchableOpacity>
);
};
