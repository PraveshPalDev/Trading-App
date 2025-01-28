import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AuthStack from './AuthStack';
import {useSelector} from 'react-redux';
import MainStack from './MainStack';
const Stack = createNativeStackNavigator();

export default function Routes() {
  const userData = useSelector(state => state.auth.userData);

  return (
    <NavigationContainer>
      {!!userData?.token || userData?.isSkipped ? (
        <Stack.Navigator>{MainStack(Stack)}</Stack.Navigator>
      ) : (
        <Stack.Navigator initialRouteName="Login">
          {AuthStack(Stack)}
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}
