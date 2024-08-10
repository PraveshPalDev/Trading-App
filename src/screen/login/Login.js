import React, {useEffect, useState} from 'react';
import {View, Image, TouchableOpacity, ActivityIndicator} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import styles from './styles';
import strings from '../../constants/lang';
import imagePath from '../../constants/imagePath';
import WrapperContainer from '../../components/WrapperContainer';
import TextComp from '../../components/TextComp';
import TextInputComp from '../../components/TextInputComp';
import ButtonComp from '../../components/ButtonCom';
import colors from '../../styles/colors';
import fontFamily from '../../styles/fontFamily';
import navigationStrings from '../../navigation/navigationStrings';
import {userLogin} from '../../redux/actions/auth';
import {showError, showSuccess} from '../../utils/helperFunctions';
import {useSelector} from 'react-redux';
import {
  configureGoogleSignIn,
  signInWithGoogle,
  signInWithX,
  singWithFaceBook,
} from '../../utils/socialAuth';

const Login = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [secureText, setSecureText] = useState(true);
  const selectedTheme = useSelector(state => state?.appSettings.selectedTheme);
  const [authLoading, setAuthLoading] = useState({
    google: false,
    facebook: false,
    x: false,
  });

  useEffect(() => {
    configureGoogleSignIn();
  }, []);

  const toggleSecureEntry = () => {
    setSecureText(!secureText);
  };

  const loginHandler = async () => {
    if (!email || !password) {
      showError(strings.LOGIN_PAGE_VALIDATION);
      return;
    }
    setLoading(true);
    try {
      const res = await userLogin({
        email,
        password,
      });
      console.log('login api res', res.data);
      if (res?.success) {
        showSuccess(res?.message);
        setLoading(false);

        if (res?.data?.user?.profileImageUrl !== null) {
          // dispatch(saveUserData(res?.data));
        } else {
          navigation.navigate(navigationStrings.UploadImage, {
            stack: true,
            loginData: res?.data,
          });
        }
      }
    } catch (error) {
      console.log('error in login api', error);
      showError(`${error?.message}`);
      setLoading(false);
    }
  };

  const handleSocialLogin = async type => {
    setAuthLoading(prev => ({...prev, [type]: true}));
    let response;
    try {
      switch (type) {
        case 'google':
          response = await signInWithGoogle();
          break;
        case 'facebook':
          response = await singWithFaceBook();
          break;
        case 'x':
          response = await signInWithX();
          break;
        default:
          response = {userInfo: null, error: 'Unknown type'};
      }

      const {userInfo, error} = response;
      if (error) {
        console.error(`${type} sign-in error:`, error);
      } else {
        console.log(`${type} user info:`, userInfo);
      }
    } finally {
      setAuthLoading(prev => ({...prev, [type]: false}));
    }
  };

  return (
    <WrapperContainer>
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        style={styles.container}>
        <View>
          <View style={styles.headContainer}>
            <Image source={imagePath.icSmallLogo} />
            <TextComp text={strings.MOMENTO} style={styles.textStyles} />
          </View>

          {/* remove the tab styles */}
          <View style={styles.tabStyles}>
            <TextComp text={strings.LOGIN} style={styles.loginStyles} />
          </View>

          <Image
            source={
              selectedTheme === 'dark'
                ? imagePath.icGifLoginDark
                : imagePath.icGifLoginLight
            }
            style={styles.imageStyles}
            resizeMode="contain"
          />
          <TextComp text={strings.WELCOME_BACK} style={styles.welcomeStyles} />
          <TextComp
            text={strings.LOGIN_TO_YOUR_ACCOUNT}
            style={styles.loginYourStyles}
          />

          <TextInputComp
            value={email}
            setValue={setEmail}
            leftIcon={imagePath.icEmail}
            placeholderText={strings.Email}
            keyboardType={'email-address'}
          />
          <TextInputComp
            value={password}
            setValue={setPassword}
            leftIcon={imagePath.icPassword}
            placeholderText={strings.Password}
            secureText={secureText}
            toggleSecureEntry={toggleSecureEntry}
            keyboardType={'default'}
            rightIcon={secureText ? imagePath.icEyeOff : imagePath.icEye}
          />

          <TextComp
            text={strings.FORGOT_PASSWORD}
            style={styles.forgetStyles}
          />

          <View style={styles.loginContainer}>
            <ButtonComp
              title={strings.LOGIN}
              style={styles.button}
              onPress={loginHandler}
              loading={loading}
            />

            <TextComp
              text={strings.OR}
              style={{...styles.forgetStyles, fontFamily: fontFamily.mornBold}}
            />
            <View style={styles.socialContainer}>
              {/* google login button */}
              <TouchableOpacity
                style={styles.socialMediaBtn}
                activeOpacity={0.7}
                onPress={() => handleSocialLogin('google')}
                disabled={authLoading.google}>
                {authLoading.google ? (
                  <ActivityIndicator size="small" color={colors.yellow} />
                ) : (
                  <Image source={imagePath.icGoogle} />
                )}
              </TouchableOpacity>

              {/* facebook login button */}
              <TouchableOpacity
                style={styles.socialMediaBtn}
                activeOpacity={0.7}
                onPress={() => handleSocialLogin('facebook')}
                disabled={authLoading.facebook}>
                {authLoading?.facebook ? (
                  <ActivityIndicator size="small" color={colors.yellow} />
                ) : (
                  <Image source={imagePath.icFb} />
                )}
              </TouchableOpacity>

              {/* X-login button */}
              <TouchableOpacity
                style={styles.socialMediaBtn}
                activeOpacity={0.7}
                onPress={() => handleSocialLogin('x')}
                disabled={authLoading.x}>
                {authLoading.x ? (
                  <ActivityIndicator size="small" color={colors.yellow} />
                ) : (
                  <Image source={imagePath.icX} />
                )}
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity
            style={{flexDirection: 'row'}}
            activeOpacity={0.7}
            onPress={() => navigation.navigate(navigationStrings.SignUp)}>
            <TextComp
              text={strings.DIDNOT_HAVE_ACCOUNT}
              style={styles.forgetStyles}
            />
            <TextComp
              text={strings.SIGN_UP}
              style={{
                ...styles.forgetStyles,
                color: colors.purple,
                fontFamily: fontFamily.mornBold,
              }}
            />
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    </WrapperContainer>
  );
};

export default Login;
