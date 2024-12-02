// DrawerStack.js
import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import TabRoutes from './TabRoutes';
import strings from '../constants/lang';
const Drawer = createDrawerNavigator();

export default function DrawerStack() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name={strings.Home} component={TabRoutes} />
    </Drawer.Navigator>
  );
}
