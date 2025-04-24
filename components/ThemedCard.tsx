import React from 'react';
import { StyleSheet, View, Text,useColorScheme, ViewStyle } from 'react-native';
import { Colors } from '@/constants/colors';

interface ThemedCardProps {
    style?: ViewStyle;
    [key: string]: any; // Allow additional props
}


export const ThemedCard: React.FC<ThemedCardProps> = ({ style, ...props }) => {
    const colorScheme = useColorScheme(); // Get the current color scheme (light or dark)
    const colors = Colors[colorScheme || 'light']; // Get the colors based on the current color scheme
    return (
        <View style={[{...styles.card,shadowColor:colors.shadowColor, backgroundColor: colors.cardColor}, style]} {...props}/>
        
    );
};

const styles = StyleSheet.create({
    card: {
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
      },
});
