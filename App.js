import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import store from './src/redux/store';
import {Provider} from 'react-redux';
import Routes from './src/navigation/Routes';
import FlashMessage from 'react-native-flash-message';
import {textScale} from './src/styles/responsiveSize';
import {LogBox, useColorScheme} from 'react-native';
import {
  initiateLang,
  initiateTheme,
  initUserData,
} from './src/utils/helperFunctions';

export default function App() {
  const {dispatch} = store;
  const theme = useColorScheme();

  useEffect(() => {
    // initiateLang(dispatch);
    //initiateTheme(dispatch, theme);
    LogBox.ignoreAllLogs();
    initUserData(dispatch);
  }, []);

  return (
    <Provider store={store}>
      <Routes />
      <FlashMessage
        position={'top'}
        titleStyle={{
          fontSize: textScale(14),
        }}
      />
    </Provider>
  );
}
