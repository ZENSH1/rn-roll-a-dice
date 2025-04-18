import { StyleSheet } from 'react-native';

export const theme = {
    light: {
        colors: {
            primary: 'green', // Light theme color for buttons and accents
            background: 'white',
            surface: '#f7f7f7',
            text: 'darkgreen', // Text color for light mode
            button: 'green',
            onSurfaceVariant: 'darkgreen',
            white: 'white',
        },
        styles: StyleSheet.create({
            container: {
                flex: 1,
                backgroundColor: 'white',
                padding: 20,
            },
            text: {
                color: 'darkgreen',
                fontSize: 16,
            },
            button: {
                backgroundColor: 'green',
                padding: 10,
                borderRadius: 5,
                alignItems: 'center',
            },
            buttonText: {
                color: 'white',
                fontSize: 16,
            },
            input: {
                borderColor: 'green',
                borderWidth: 1,
                padding: 10,
                marginBottom: 20,
                borderRadius: 5,
            },
        }),
    },
    dark: {
        colors: {
            primary: 'darkgreen', // Dark theme button color
            background: '#121212', // Dark background color
            surface: '#333',
            text: 'lightgreen', // Text color for dark mode
            button: 'green',
            onSurfaceVariant: 'lightgreen',
            white: 'white',
        },
        styles: StyleSheet.create({
            container: {
                flex: 1,
                backgroundColor: '#121212',
                padding: 20,
            },
            text: {
                color: 'lightgreen',
                fontSize: 16,
            },
            button: {
                backgroundColor: 'green',
                padding: 10,
                borderRadius: 5,
                alignItems: 'center',
            },
            buttonText: {
                color: 'white',
                fontSize: 16,
            },
            input: {
                borderColor: 'lightgreen',
                borderWidth: 1,
                padding: 10,
                marginBottom: 20,
                borderRadius: 5,
            },
        }),
    },
};
