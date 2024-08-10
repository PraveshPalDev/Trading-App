import {SafeAreaView, StatusBar, StyleSheet, View} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';
import colors from '../styles/colors';
import {moderateScale} from '../styles/responsiveSize';

export default function WrapperContainer({style = {}, children}) {
  const selectedTheme = useSelector(state => state?.appSettings.selectedTheme);

  return (
    <View
      style={{
        ...styles.container,
        ...style,
        backgroundColor: selectedTheme === 'dark' ? colors.black : colors.theme,
      }}>
      <StatusBar
        barStyle={selectedTheme === 'dark' ? 'light-content' : 'dark-content'}
        backgroundColor={selectedTheme === 'dark' ? colors.black : colors.theme}
      />
      <SafeAreaView style={styles.safeArea}>{children}</SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.theme,
  },
  safeArea: {
    flex: 1,
    marginTop: moderateScale(2),
  },
});
