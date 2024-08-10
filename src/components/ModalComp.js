//import
import React from 'react';
import {StyleSheet} from 'react-native';
import Modal from 'react-native-modal';

// create a component
const ModalComp = ({
  children,
  isVisible = false,
  onBackdropPress = () => {},
  style = {},
  ...props
}) => {
  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onBackdropPress}
      style={{...styles.style, ...style}}
      {...props}>
      {children}
    </Modal>
  );
};

const styles = StyleSheet.create({
  style: {
    margin: 0,
    justifyContent: 'flex-end',
  },
});

export default ModalComp;
