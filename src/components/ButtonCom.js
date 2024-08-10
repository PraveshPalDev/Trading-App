import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  Image,
  ActivityIndicator,
} from 'react-native';
import {useSelector} from 'react-redux';
import colors from '../styles/colors';
import {moderateScale, textScale} from '../styles/responsiveSize';
import fontFamily from '../styles/fontFamily';
import imagePath from '../constants/imagePath';

export default function ButtonComp({
  title,
  onPress,
  style = {},
  styleText = {},
  loading = false,
  ...props
}) {
  const selectedTheme = useSelector(state => state?.appSettings.selectedTheme);

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        ...styles.button,
        ...style,
        backgroundColor: selectedTheme === 'dark' ? colors.white : colors.black,
      }}
      activeOpacity={0.7}
      {...props}>
      {loading ? (
        <ActivityIndicator
          size="large"
          color={selectedTheme === 'dark' ? colors.black : colors.white}
          style={styles.loadingStyles}
        />
      ) : (
        <>
          <Text
            style={{
              ...styles.buttonText,
              ...styleText,
              color: selectedTheme === 'dark' ? colors.black : colors.white,
            }}>
            {title}
          </Text>
          <Image
            source={imagePath.icBtnArrow}
            style={{
              ...styles.icon,
              tintColor: selectedTheme === 'dark' ? colors.black : colors.white,
            }}
          />
        </>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: moderateScale(206),
    height: moderateScale(60),
    paddingHorizontal: moderateScale(30),
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    borderRadius: moderateScale(30),
  },
  buttonText: {
    fontSize: textScale(16),
    fontFamily: fontFamily.mornMedium,
  },
  loadingStyles: {
    flex: 1,
    alignSelf: 'center',
  },
});
