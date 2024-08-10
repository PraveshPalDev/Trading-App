import React from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import {moderateScale, textScale} from '../styles/responsiveSize';
import colors from '../styles/colors';
import fontFamily from '../styles/fontFamily';
import {useSelector} from 'react-redux';

export default function MultiLineTextInputComp({
  placeholderText = 'Add your short bio!',
  style,
  value,
  onChangeText,
  numberOfLines = 4,
}) {
  const selectedTheme = useSelector(state => state?.appSettings.selectedTheme);

  return (
    <View
      style={[
        styles.container,
        style,
        {
          borderColor: selectedTheme === 'dark' ? colors.white : colors.gray,
          backgroundColor:
            selectedTheme === 'dark' ? colors.black : colors.white,
        },
      ]}>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholderText}
        placeholderTextColor={
          selectedTheme === 'dark' ? colors.whiteOpacity50 : colors.gray
        }
        multiline={true}
        numberOfLines={numberOfLines}
        style={{
          ...styles.input,
          color: selectedTheme == 'dark' ? colors.white : colors.black,
        }}
        autoCapitalize="none"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: moderateScale(10),
    marginVertical: moderateScale(10),
  },
  input: {
    fontSize: textScale(14),
    fontFamily: fontFamily.mornRegular,
    minHeight: moderateScale(103),
    maxHeight: moderateScale(200),
    textAlignVertical: 'top',
    padding: moderateScale(10),
  },
});
