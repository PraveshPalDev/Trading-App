import {StyleSheet, View} from 'react-native';
import React from 'react';
import colors from '../styles/colors';
import {moderateScale, textScale} from '../styles/responsiveSize';

export default function FloatingButtonComp({
  onPressItem,
  IconColor,
  overlayColor,
  containerStyles,
}) {
  const actions = [
    {
      text: 'Add',
      icon: require('./assets/add.png'),

      name: 'add',
      position: 1,
    },
    {
      text: 'Edit',
      icon: require('./assets/edit.png'),

      name: 'edit',
      position: 2,
    },
    {
      text: 'Delete',
      icon: require('./assets/delete.png'),
      name: 'delete',
      position: 3,
    },
  ];

  return (
    <View style={{...styles.container, ...containerStyles}}>
      <FloatingAction
        actions={actions}
        onPressItem={onPressItem}
        color={IconColor}
        overlayColor={overlayColor}
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
  example: {
    fontSize: textScale(18),
    marginBottom: moderateScale(20),
    fontWeight: 'bold',
  },
});
