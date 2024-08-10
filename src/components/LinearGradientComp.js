import React from 'react';
import {StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const LinearGradientComp = ({children, colors, style}) => {
  return (
    <LinearGradient colors={colors} style={[styles.linearGradient, style]}>
      {children}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  linearGradient: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LinearGradientComp;
