import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MainStack from './MainStack';
import AuthStack from './AuthStack';
import {useSelector} from 'react-redux';

const Stack = createNativeStackNavigator();

export default function Routes() {
  const userData = useSelector(state => state.auth.userData);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!!userData?.token ? MainStack(Stack) : AuthStack(Stack)}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
