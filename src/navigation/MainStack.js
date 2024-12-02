import React from 'react';
import navigationStrings from './navigationStrings';
import {
  Analysis,
  CompanyProfile,
  Research,
  ShareList,
  StockDetails,
  Tracker,
  TradeLinkAnalysis,
} from '../screen';
import AllStacks from '../screen/news/allStocks/AllStacks';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import DrawerStack from './DrawerStack';
const Stack = createNativeStackNavigator();

export default function MainStack() {
  return (
    <>
      <Stack.Screen
        name={navigationStrings.Home}
        component={DrawerStack}
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

      <Stack.Screen
        name={navigationStrings.CompanyProfile}
        component={CompanyProfile}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name={navigationStrings.ShareList}
        component={ShareList}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name={navigationStrings.Research}
        component={Research}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name={navigationStrings.TradeLinkAnalysis}
        component={TradeLinkAnalysis}
        options={{headerShown: false}}
      />
    </>
  );
}
