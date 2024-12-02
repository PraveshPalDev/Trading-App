// DrawerStack.js
import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {TouchableOpacity, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; 
import TabRoutes from './TabRoutes';
import strings from '../constants/lang';
import {
  Calendar,
  CompanyProfile,
  ContactUs,
  News,
  OnlineTrading,
} from '../screen';
import colors from '../styles/colors';
import { moderateScale, textScale } from '../styles/responsiveSize';

const Drawer = createDrawerNavigator();

function CustomDrawerToggle({navigation}) {
  return (
    <TouchableOpacity
      style={{marginLeft: 10}}
      onPress={() => navigation.toggleDrawer()}>
      <Icon name="menu" size={24} color="black" />
    </TouchableOpacity>
  );
}

export default function DrawerStack() {
  return (
    <Drawer.Navigator
      screenOptions={({navigation}) => ({
        headerLeft: () => <CustomDrawerToggle navigation={navigation} />,
        drawerActiveTintColor: colors.blue, 
        drawerInactiveTintColor: 'gray', 
        drawerActiveBackgroundColor: colors.theme, 
        drawerLabelStyle: {fontSize: textScale(16), fontWeight: 'bold'},
        drawerStyle: {
          backgroundColor: colors.theme, 
          width: moderateScale(250), 
        },
        headerStyle: {
          backgroundColor: colors.theme, 
        },
        headerTintColor: colors.black, 
        headerTitleStyle: {
          fontWeight: 'bold', 
        
        },
      })}>
      <Drawer.Screen
        name={strings.Home}
        component={TabRoutes}
        options={{
          drawerIcon: ({focused, size}) => (
            <Icon
              name="home"
              size={size}
              color={focused ? colors.blue : colors.grayOpacity80}
            />
          ),
        }}
      />
      <Drawer.Screen
        name={strings.News}
        component={News}
        options={{
          drawerIcon: ({focused, size}) => (
            <Icon
              name="article"
              size={size}
              color={focused ? colors.blue : colors.grayOpacity80}
            />
          ),
        }}
      />
      <Drawer.Screen
        name={strings.OnlineTrading}
        component={OnlineTrading}
        options={{
          drawerIcon: ({focused, size}) => (
            <Icon
              name="trending-up"
              size={size}
              color={focused ? colors.blue : colors.grayOpacity80}
            />
          ),
        }}
      />
      <Drawer.Screen
        name={strings.TradeLinkPro}
        component={CompanyProfile}
        options={{
          drawerIcon: ({focused, size}) => (
            <Icon
              name="business"
              size={size}
              color={focused ? colors.blue : colors.grayOpacity80}
            />
          ),
        }}
      />
      <Drawer.Screen
        name={strings.Calendar}
        component={Calendar}
        options={{
          drawerIcon: ({focused, size}) => (
            <Icon
              name="calendar-today"
              size={size}
              color={focused ? colors.blue : colors.grayOpacity80}
            />
          ),
        }}
      />
      <Drawer.Screen
        name={strings.ContactUs}
        component={ContactUs}
        options={{
          drawerIcon: ({focused, size}) => (
            <Icon
              name="contacts"
              size={size}
              color={focused ? colors.blue : colors.grayOpacity80}
            />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}
