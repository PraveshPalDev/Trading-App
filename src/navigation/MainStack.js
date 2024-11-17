import React from 'react';
import TabRoutes from './TabRoutes';
import navigationStrings from './navigationStrings';
import {Analysis, StockDetails, Tracker} from '../screen';
import AllStacks from '../screen/news/allStocks/AllStacks';

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

      <Stack.Screen
        name={navigationStrings.AllStocks}
        component={AllStacks}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name={navigationStrings.Analysis}
        component={Analysis}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name={navigationStrings.Tracker}
        component={Tracker}
        options={{headerShown: false}}
      />
    </>
  );
}
