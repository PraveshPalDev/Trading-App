import React from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import {moderateScale, textScale} from '../styles/responsiveSize';
import colors from '../styles/colors';
import fontFamily from '../styles/fontFamily';
import {useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function TextInputComp({
  placeholderText = 'update the placeHolderText....',
  placeholderTextColor = '#000',
  style,
  leftIcon,
  rightIcon,
  secureText = false,
  rightIconColor,
  toggleSecureEntry,
  keyboardType = 'default',
  value,
  setValue,
  ...props
}) {
  const selectedTheme = useSelector(state => state?.appSettings.selectedTheme);
  return (
    <View
      style={{
        ...styles.container,
        ...style,
        backgroundColor: selectedTheme === 'dark' ? colors.black : colors.white,
      }}>
      {leftIcon && (
        <Icon
          name={leftIcon}
          size={moderateScale(27)}
          style={styles.leftImage}
        />
      )}
      <TextInput
        value={value}
        onChangeText={setValue}
        placeholder={placeholderText}
        placeholderTextColor={
          selectedTheme === 'dark'
            ? colors.whiteOpacity50
            : colors.blackOpacity80
        }
        secureTextEntry={secureText}
        {...props}
        style={{
          ...styles.input,
          color: selectedTheme === 'dark' ? colors.white : colors.black,
        }}
        autoCapitalize="none"
        keyboardType={keyboardType}
      />
      {rightIcon && (
        <TouchableOpacity
          onPress={toggleSecureEntry}
          activeOpacity={0.7}
          style={styles.rightIconStyle}>
          <Icon
            name={rightIcon}
            size={moderateScale(27)}
            color={
              selectedTheme === 'dark'
                ? colors.white
                : rightIconColor || colors.black
            }
          />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: moderateScale(8),
    height: moderateScale(55),
    borderRadius: moderateScale(18),
    borderWidth: 1,
    borderColor: colors.purple,
  },
  leftImage: {
    marginLeft: moderateScale(10),
    borderRadius: moderateScale(3.5),
  },
  input: {
    flex: 1,
    paddingHorizontal: moderateScale(15),
    height: moderateScale(55),
    fontSize: textScale(15),
    fontFamily: fontFamily.mornRegular,
  },
  rightIconStyle: {
    marginRight: moderateScale(10),
  },
});
