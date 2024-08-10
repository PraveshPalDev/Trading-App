import React from 'react';
import {Text, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import colors from '../styles/colors';
import {textScale} from '../styles/responsiveSize';
import fontFamily from '../styles/fontFamily';

export default function TextComp({text = '', style = {}, children, ...props}) {
  const selectedTheme = useSelector(state => state?.appSettings.selectedTheme);

  return (
    <Text
      style={{
        ...styles.textStyle,
        ...style,
        color: selectedTheme === 'dark' ? colors.white : colors.black,
      }}
      {...props}>
      {text} {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  textStyle: {
    fontSize: textScale(16),
    fontFamily: fontFamily.mornMedium,
  },
});
