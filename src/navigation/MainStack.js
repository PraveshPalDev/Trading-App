import React from 'react';
import TabRoutes from './TabRoutes';
import navigationStrings from './navigationStrings';
import {StockDetails} from '../screen';

export default function MainStack(Stack) {
  return (
    <>
      <Stack.Screen
        name={navigationStrings.TAB_ROUTES}
        component={TabRoutes}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name={navigationStrings.StockDetails}
        component={StockDetails}
        options={{headerShown: false}}
      />
    </>
  );
}
