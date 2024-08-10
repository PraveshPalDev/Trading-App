import React from 'react';
import * as Screen from '../screen';
import navigationStrings from './navigationStrings';

export default function AuthStack(Stack) {
  return (
    <>
      <Stack.Screen
        name={navigationStrings.LOGIN}
        component={Screen.Login}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={navigationStrings.SignUp}
        component={Screen.SignUp}
        options={{headerShown: false}}
      />
    </>
  );
}
