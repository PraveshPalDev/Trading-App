import React from 'react';
import TabRoutes from './TabRoutes';
import navigationStrings from './navigationStrings';

export default function MainStack(Stack) {
  return (
    <>
      <Stack.Screen
        name={navigationStrings.TAB_ROUTES}
        component={TabRoutes}
        options={{headerShown: false}}
      />
    </>
  );
}
