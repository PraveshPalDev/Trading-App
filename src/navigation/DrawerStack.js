import React from 'react';
import {SignUp} from '../screen';
import navigationStrings from './navigationStrings';
import TabRoutes from './TabRoutes';

export default function DrawerStack(Drawer) {
  return (
    <Drawer.Navigator>
      <Drawer.Screen
        name={navigationStrings.TAB_ROUTES}
        component={TabRoutes}
      />
      <Drawer.Screen name={navigationStrings.SignUp} component={SignUp} />
    </Drawer.Navigator>
  );
}
