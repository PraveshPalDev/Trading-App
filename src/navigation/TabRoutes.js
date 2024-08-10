import React from 'react';
import {Text, Platform, StyleSheet, Image, View} from 'react-native';
import {
  createBottomTabNavigator,
  BottomTabBar,
} from '@react-navigation/bottom-tabs';
import colors from '../styles/colors';
import {
  height,
  moderateScale,
  moderateScaleVertical,
  textScale,
  width,
} from '../styles/responsiveSize';
import * as Screens from '../screen';
import navigationStrings from './navigationStrings';
import {useSelector} from 'react-redux';
import strings from '../constants/lang';
import imagePath from '../constants/imagePath';
import fontFamily from '../styles/fontFamily';

const BottomTab = createBottomTabNavigator();

const MainNavigator = ({navigation}) => {
  const selectedTheme = useSelector(state => state?.appSettings.selectedTheme);

  const TabBarOptions = {
    tabBarShowLabel: false,
    headerShown: false,
    tabBarActiveTintColor: colors.theme,
    tabBarInactiveTintColor: colors.gray,
    tabBarStyle: {
      backgroundColor: colors.black,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: width / 1.25,
      borderRadius: width / 0.5,
      borderTopWidth: 0,
      height: moderateScale(70),
      alignSelf: 'flex-end',
      marginTop: moderateScale(10),
    },
  };

  const TabBarItem = ({focused, iconSource, label}) => (
    <View style={styles.tabContainer}>
      <Image
        source={iconSource}
        style={{
          tintColor: focused ? colors.theme : colors.whiteOpacity50,
        }}
      />
      <Text
        style={{
          ...styles.tabLabel,
          color: focused ? colors.theme : colors.gray,
        }}>
        {label}
      </Text>
    </View>
  );

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: selectedTheme === 'dark' ? colors.black : colors.white,
      }}>
      <BottomTab.Navigator
        tabBar={tabsProps => (
          <View style={styles.mainStyles}>
            <BottomTabBar {...tabsProps} />
          </View>
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
                iconSource={imagePath.icHome}
                label={strings.Home}
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
  mainStyles: {
    display: 'flex',
    gap: moderateScale(8),
    marginHorizontal: moderateScaleVertical(5),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Platform.OS === 'ios' ? moderateScale(15) : moderateScale(10),
    borderTopWidth: 1,
    borderColor: colors.whiteOpacity70,
  },
  tabContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: Platform.OS === 'ios' ? moderateScale(25) : null,
  },
  tabLabel: {
    fontSize: textScale(14),
    textAlign: 'center',
  },
  containerLeftScreen: {
    width: moderateScale(60),
    height: moderateScale(60),
    borderRadius: moderateScale(30),
    marginTop: moderateScale(10),
  },
  handleLeftScreen: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  // radio button styles
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioButtonContainer: {
    height: moderateScale(24),
    width: moderateScale(24),
    borderRadius: moderateScale(12),
    borderWidth: moderateScale(2),
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioButtonInner: {
    height: moderateScale(12),
    width: moderateScale(12),
    borderRadius: moderateScale(6),
  },
  // modal styles
  modalContainer: {
    backgroundColor: '#fff',
    minHeight: height / 2.6,
    borderTopLeftRadius: moderateScale(20),
    borderTopRightRadius: moderateScale(20),
  },
  modalShareContainer: {
    backgroundColor: '#fff',
    height: height / 1.2,
    borderTopLeftRadius: moderateScale(20),
    borderTopRightRadius: moderateScale(20),
  },
  headerStyles: {
    width: moderateScale(80),
    height: moderateScale(6),
    borderRadius: moderateScale(40),
    marginVertical: moderateScale(10),
    backgroundColor: colors.purple,
    alignSelf: 'center',
  },
  modalMainStyles: {
    paddingHorizontal: moderateScale(30),
    paddingVertical: moderateScaleVertical(20),
  },
  heading: {
    fontSize: textScale(16),
    fontFamily: fontFamily.mornBold,
    paddingVertical: moderateScaleVertical(10),
  },
  itemContainerStyles: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: moderateScaleVertical(6),
    padding: moderateScale(2),
  },
  modalLeftStyles: {
    paddingLeft: moderateScale(10),
    fontFamily: fontFamily.mornRegular,
    fontSize: textScale(16),
    color: colors.blackOpacity90,
  },
  image: {
    width: moderateScale(20),
    height: moderateScale(20),
  },
  cancelButton: {
    width: width / 1.2,
    height: moderateScale(60),
    backgroundColor: colors.black,
    marginHorizontal: moderateScale(30),
    borderRadius: moderateScale(30),
    justifyContent: 'space-evenly',
    alignSelf: 'center',
    paddingHorizontal: moderateScale(110),
    marginBottom: moderateScale(25),
  },
});
