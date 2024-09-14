import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AuthStack from './AuthStack';
import {useSelector} from 'react-redux';
import DrawerStack from './DrawerStack';
import {createDrawerNavigator} from '@react-navigation/drawer';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

export default function Routes() {
  const userData = useSelector(state => state.auth.userData);

  return (
    <NavigationContainer>
      {true ? (
        DrawerStack(Drawer)
      ) : (
        <Stack.Navigator>{AuthStack(Stack)}</Stack.Navigator>
      )}
    </NavigationContainer>
  );
}
