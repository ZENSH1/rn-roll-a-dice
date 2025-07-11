import { useTheme } from '@react-navigation/native';
import React from 'react';
import { TouchableOpacity, Text, useColorScheme } from 'react-native';
import { Colors } from '@/constants/colors';
import { AnimatedWrapper } from 'react-native-micro-interactions';

type ThemedButtonProps = {
  onPress: () => void;
  title: string;
  disabled?: boolean;
  
};

export const ThemedButton: React.FC<ThemedButtonProps> = ({ onPress, title, disabled }) => {
  const colorScheme = useColorScheme(); // Get the current color scheme (light or dark)
  const colors = Colors[colorScheme || 'light']; // Get the colors based on the current color scheme

return (
 // <AnimatedWrapper animationType='buzz' animationTrigger='press'>

<TouchableOpacity
        onPress={onPress}
        disabled={disabled}
        style={{
            backgroundColor: disabled ? "darkgray" : colors.primary,
            paddingVertical: 12,
            paddingHorizontal: 20,
            borderRadius: 25,
            marginHorizontal: 10,
            alignItems: 'center',
            justifyContent: 'center',
            width:"auto",
            height: 50,
        }}>
        <Text style={{ color: 'white', fontSize: 16 }}>{title}</Text>
    </TouchableOpacity>
 // </AnimatedWrapper>
);
};
