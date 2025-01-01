import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialIcons';
import TabRoutes from './TabRoutes';
import strings from '../constants/lang';
import {
  CompanyProfile,
  ContactUs,
  News,
  OnlineTrading,
  Logout,
  CalendarPage,
  BigCalendar,
} from '../screen';
import colors from '../styles/colors';
import {moderateScale, textScale} from '../styles/responsiveSize';

const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props} contentContainerStyle={{flex: 1}}>
      <View style={{flex: 1}}>
        <DrawerItemList {...props} />
      </View>

      <View style={styles.versionContainer}>
        <Text style={styles.versionText}>
          <Text style={styles.versionLabel}>App Version: </Text>
          <Text style={styles.versionValue}>1.0.0</Text>
        </Text>
      </View>
    </DrawerContentScrollView>
  );
}

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
      drawerContent={props => <CustomDrawerContent {...props} />}
      screenOptions={({navigation}) => ({
        headerLeft: () => <CustomDrawerToggle navigation={navigation} />,
        drawerActiveTintColor: colors.blue,
        drawerInactiveTintColor: 'gray',
        drawerActiveBackgroundColor: colors.whiteOpacity60,
        drawerLabelStyle: {fontSize: textScale(14), fontWeight: 'bold'},
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
              size={moderateScale(28)}
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
              size={moderateScale(28)}
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
              size={moderateScale(28)}
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
              size={moderateScale(28)}
              color={focused ? colors.blue : colors.grayOpacity80}
            />
          ),
        }}
      />
      {/* <Drawer.Screen
        name={strings.Calendar}
        component={CalendarPage}
        options={{
          drawerIcon: ({focused, size}) => (
            <Icon
              name="calendar-today"
              size={moderateScale(28)}
              color={focused ? colors.blue : colors.grayOpacity80}
            />
          ),
        }}
      /> */}

      <Drawer.Screen
        name={strings.Calendar}
        component={BigCalendar}
        options={{
          drawerIcon: ({focused, size}) => (
            <Icon
              name="calendar-today"
              size={moderateScale(28)}
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
              size={moderateScale(28)}
              color={focused ? colors.blue : colors.grayOpacity80}
            />
          ),
        }}
      />

      <Drawer.Screen
        name={strings.Logout}
        component={Logout}
        options={{
          drawerIcon: ({focused, size}) => (
            <Icon
              name="logout"
              size={moderateScale(28)}
              color={focused ? colors.blue : colors.grayOpacity80}
            />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  versionContainer: {
    padding: moderateScale(12),
    borderTopWidth: 1,
    borderTopColor: colors.grayOpacity50,
    alignItems: 'center',
  },
  versionText: {
    fontSize: textScale(16),
    color: colors.black,
  },
  versionLabel: {
    fontWeight: 'bold',
    color: 'black',
    color: colors.black,
  },
  versionValue: {
    fontWeight: 'normal',
    color: colors.gray,
    fontSize: textScale(16),
  },
});
