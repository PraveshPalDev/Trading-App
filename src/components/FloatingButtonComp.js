import {StyleSheet, View} from 'react-native';
import React from 'react';
import colors from '../styles/colors';
import {moderateScale} from '../styles/responsiveSize';
import {FloatingAction} from 'react-native-floating-action';

export default function FloatingButtonComp({
  onPressItem,
  IconColor,
  overlayColor,
  containerStyles,
  data,
}) {
  return (
    <View style={{...styles.container, ...containerStyles}}>
      <FloatingAction
        actions={data}
        onPressItem={onPressItem}
        color={IconColor}
        overlayColor={overlayColor}
        iconHeight={moderateScale(25)}
        iconWidth={moderateScale(25)}
        buttonSize={moderateScale(55)}
        actionsPaddingTopBottom={moderateScale(10)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
