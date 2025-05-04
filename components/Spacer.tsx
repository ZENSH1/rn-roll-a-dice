import React from 'react';
import { View, ViewProps, StyleSheet } from 'react-native';

type SpacerProps = ViewProps & {
    size?: number;
    horizontal?: boolean;
};

const Spacer: React.FC<SpacerProps> = ({ size = 16, horizontal = false, style, ...rest }) => {
  return (
    <View
        style={[
            horizontal
                ? { width: size, height: 1 }
                : { height: size, width: 1 },
            style,
        ]}
        {...rest}
    />
  );
};

export default Spacer;