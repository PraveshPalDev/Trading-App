import {ActivityIndicator, StyleSheet, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import {logoutUserData} from '../../../redux/actions/auth';
import {
  clearData,
  showError,
  showSuccess,
} from '../../../utils/helperFunctions';
import colors from '../../../styles/colors';
import WrapperContainer from '../../../components/WrapperContainer';
import {textScale} from '../../../styles/responsiveSize';
import strings from '../../../constants/lang';

export default function Logout() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    logoutHandler();
  }, []);

  const logoutHandler = async () => {
    try {
      setLoading(true);
      await logoutUserData();
      showSuccess(strings.LogoutSuccess);
      clearData('userData');
      setLoading(false);
    } catch (error) {
      showError(error);
      setLoading(false);
    }
  };

  return (
    <WrapperContainer style={styles.container}>
      {loading ? (
        <ActivityIndicator
          size={'large'}
          color={colors.blue}
          style={{flex: 1}}
        />
      ) : (
        <Text style={styles.text}>Logout Successful</Text>
      )}
    </WrapperContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: textScale(18),
    fontWeight: 'bold',
    color: colors.black,
  },
});
