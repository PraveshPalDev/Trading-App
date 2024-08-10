//import library
import React from 'react';
import {StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image';
import {moderateScale} from '../styles/responsiveSize';
import colors from '../styles/colors';

const FastImageComp = ({url = '', imageStyle = {}}) => {
  return (
    <FastImage
      style={{...styles.imageStyle, ...imageStyle}}
      source={{
        uri: url,
        priority: FastImage.priority.normal,
      }}
      resizeMode={FastImage.resizeMode.cover}
    />
  );
};

const styles = StyleSheet.create({
  imageStyle: {
    width: moderateScale(60),
    height: moderateScale(60),
    borderRadius: moderateScale(30),
    borderWidth: 3,
    borderColor: colors.purple,
  },
});

export default FastImageComp;
