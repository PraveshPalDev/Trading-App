import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import WrapperContainer from '../../components/WrapperContainer';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function Login() {
  return (
    <WrapperContainer>
      <Text>Login</Text>
      <Icon name="rocket" size={30} color="#900" />
    </WrapperContainer>
  );
}

const styles = StyleSheet.create({});
