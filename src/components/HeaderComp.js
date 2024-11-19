import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import TextComp from './TextComp';
import {moderateScale, textScale, width} from '../styles/responsiveSize';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon2 from 'react-native-vector-icons/MaterialIcons';
import colors from '../styles/colors';
import {useNavigation} from '@react-navigation/native';

export default function HeaderComp({
  title = 'defaultText',
  bellIcon = 'bell',
  settingIcon = 'settings',
  bellHandler = () => {},
  settingHandler = () => {},
  notificationIcon = false,
  backBtn = false,
  style = {},
  titleStyle = {},
}) {
  const navigation = useNavigation();
  return (
    <View
      style={{
        ...styles.container,
        ...style,
      }}>
      <View style={styles.leftContainer}>
        {backBtn && (
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => navigation.goBack()}>
            <Icon2 name={'arrow-back-ios-new'} size={moderateScale(25)} />
          </TouchableOpacity>
        )}

        <TextComp
          text={title}
          style={{
            ...styles.headingStyles,
            ...titleStyle,
            paddingLeft: backBtn ? moderateScale(8) : 0,
          }}
        />
      </View>

      <View style={styles.rightContainer}>
        <TouchableOpacity
          style={styles.iconLeftStyles}
          activeOpacity={0.5}
          onPress={bellHandler}>
          <Icon name={bellIcon} size={moderateScale(25)} color={colors.blue} />
          {notificationIcon && <View style={styles.notificationStyles} />}
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.iconStyles}
          activeOpacity={0.5}
          onPress={settingHandler}>
          {settingIcon === 'heart' ? (
            <Icon
              name={settingIcon}
              size={moderateScale(25)}
              color={colors.white}
            />
          ) : (
            <Icon2
              name={settingIcon}
              size={moderateScale(25)}
              color={colors.white}
            />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: moderateScale(10),
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: moderateScale(8),
  },
  headingStyles: {
    fontSize: textScale(18),
    fontWeight: '700',
    textAlign: 'center',
    justifyContent: 'center',
    color: colors.blackOpacity90,
  },
  leftContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  rightContainer: {
    width: width / 3.5,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  iconLeftStyles: {
    width: moderateScale(40),
    height: moderateScale(40),
    borderWidth: moderateScale(1),
    borderColor: colors.gray,
    borderRadius: moderateScale(20),
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: moderateScale(10),
  },
  iconStyles: {
    width: moderateScale(40),
    height: moderateScale(40),
    backgroundColor: colors.blue,
    borderRadius: moderateScale(20),
    alignItems: 'center',
    justifyContent: 'center',
  },
  notificationStyles: {
    width: moderateScale(10),
    height: moderateScale(10),
    borderRadius: moderateScale(10),
    backgroundColor: colors.blue,
    position: 'absolute',
    right: 0,
    top: 0,
  },
});
