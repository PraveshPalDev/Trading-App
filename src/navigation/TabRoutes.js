import React from 'react';
import {Text, StyleSheet, View} from 'react-native';
import {
  createBottomTabNavigator,
  BottomTabBar,
} from '@react-navigation/bottom-tabs';
import colors from '../styles/colors';
import {textScale} from '../styles/responsiveSize';
import * as Screens from '../screen';
import navigationStrings from './navigationStrings';
import {useSelector} from 'react-redux';
import strings from '../constants/lang';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/Entypo';

const BottomTab = createBottomTabNavigator();

const MainNavigator = () => {
  const selectedTheme = useSelector(state => state?.appSettings.selectedTheme);

  const TabBarOptions = {
    tabBarShowLabel: false,
    headerShown: false,
    // tabBarActiveTintColor: colors.theme,
    // tabBarInactiveTintColor: colors.gray,
    // tabBarStyle: {
    //   backgroundColor: colors.black,
    //   display: 'flex',
    //   alignItems: 'center',
    //   justifyContent: 'space-between',
    //   width: width / 1.25,
    //   borderRadius: width / 0.5,
    //   borderTopWidth: 0,
    //   height: moderateScale(70),
    //   alignSelf: 'flex-end',
    //   marginTop: moderateScale(10),
    // },
  };

  const TabBarItem = ({focused, iconSource, label, IconType}) => {
    let IconComponent;
    switch (IconType) {
      case 'Ionicons':
        IconComponent = Icon;
        break;
      case 'Entypo':
        IconComponent = Icon2;
        break;

      default:
        IconComponent = Icon;
    }

    return (
      <View style={styles.tabContainer}>
        <IconComponent
          name={iconSource}
          color={focused ? colors.blue : colors.blackOpacity70}
          size={textScale(25)}
        />
        <Text
          style={{
            ...styles.tabLabel,
            color: focused ? colors.blue : colors.blackOpacity70,
          }}>
          {label}
        </Text>
      </View>
    );
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: selectedTheme === 'dark' ? colors.black : colors.white,
      }}>
      <BottomTab.Navigator
        tabBar={tabsProps => (
          <>
            <BottomTabBar {...tabsProps} />
          </>
        )}
        initialRouteName={navigationStrings.Home}
        screenOptions={TabBarOptions}>
        {/* Home */}
        <BottomTab.Screen
          name={navigationStrings.Home}
          component={Screens.Home}
          options={{
            tabBarIcon: ({focused}) => (
              <TabBarItem
                focused={focused}
                iconSource={'home'}
                label={strings.Home}
                IconType={'Ionicons'}
              />
            ),
          }}
        />
        {/* stock */}
        <BottomTab.Screen
          name={navigationStrings.Stock}
          component={Screens.Stock}
          options={{
            tabBarIcon: ({focused}) => (
              <TabBarItem
                focused={focused}
                iconSource={'swap-vertical'}
                label={strings.Stock}
                IconType={'Ionicons'}
              />
            ),
          }}
        />
        {/* stock */}
        <BottomTab.Screen
          name={navigationStrings.News}
          component={Screens.News}
          options={{
            tabBarIcon: ({focused}) => (
              <TabBarItem
                focused={focused}
                iconSource={'book'}
                label={strings.News}
                IconType={'Ionicons'}
              />
            ),
          }}
        />
        {/* stock */}
        <BottomTab.Screen
          name={navigationStrings.More}
          component={Screens.More}
          options={{
            tabBarIcon: ({focused}) => (
              <TabBarItem
                focused={focused}
                iconSource={'dots-three-horizontal'}
                label={strings.More}
                IconType={'Entypo'}
              />
            ),
          }}
        />
      </BottomTab.Navigator>
    </View>
  );
};

export default MainNavigator;

const styles = StyleSheet.create({
  tabContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabLabel: {
    fontSize: textScale(12),
    textAlign: 'center',
  },
});
