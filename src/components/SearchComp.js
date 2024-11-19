import React from 'react';
import {StyleSheet, TextInput, View, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../styles/colors';
import {moderateScale, textScale} from '../styles/responsiveSize';

export default function SearchComp({
  leftIconName = 'magnify',
  placeholderText = 'Search...',
  value,
  searchHandler,
  containerStyle = {},
  inputStyle = {},
}) {
  return (
    <View style={[styles.container, containerStyle]}>
      <TouchableOpacity style={styles.iconContainer}>
        <Icon name={leftIconName} size={28} color={colors.gray} />
      </TouchableOpacity>
      <TextInput
        value={value}
        onChangeText={searchHandler}
        placeholder={placeholderText}
        style={[styles.input, inputStyle]}
        placeholderTextColor={colors.gray}
        autoCapitalize="none"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: moderateScale(12),
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: moderateScale(30),
    paddingHorizontal: moderateScale(10),
    height: moderateScale(55),
    marginVertical: moderateScale(10),
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    borderWidth: moderateScale(1),
    borderColor: colors.gray,
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: moderateScale(10),
  },
  input: {
    flex: 1,
    fontSize: textScale(15),
    color: colors.black,
    paddingVertical: 0,
  },
});
