import {Image, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import WrapperContainer from '../../components/WrapperContainer';
import TextInputComp from '../../components/TextInputComp';
import imagePath from '../../constants/imagePath';
import TextComp from '../../components/TextComp';
import ButtonComp from '../../components/ButtonCom';
import styles from './styles';
import strings from '../../constants/lang';
import {textScale} from '../../styles/responsiveSize';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import colors from '../../styles/colors';
import fontFamily from '../../styles/fontFamily';
import navigationStrings from '../../navigation/navigationStrings';
import {userSignup} from '../../redux/actions/auth';
import {showError, showSuccess} from '../../utils/helperFunctions';
import {useSelector} from 'react-redux';

export default function SignUp({navigation}) {
  const [secureText, setSecureText] = useState(true);
  const [userName, setUserName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [createEmail, setCreateEmail] = useState('');
  const [createPassword, setCreatePassword] = useState('');
  const [loading, setLoading] = useState(false);
  const selectedTheme = useSelector(state => state?.appSettings.selectedTheme);

  const toggleSecureEntry = () => {
    setSecureText(!secureText);
  };

  const signUpHandler = async () => {
    if (
      !userName ||
      !firstName ||
      !lastName ||
      !createPassword ||
      !createEmail
    ) {
      showError(strings.SIGNUP_PAGE_ALL_VALIDATION);
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(createEmail)) {
      showError(strings.VALID_EMAIL_MESSAGE);
      return;
    }

    const strongPasswordPattern =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;
    if (!strongPasswordPattern.test(createPassword)) {
      showError(strings.STRONG_PASSWORD_MESSAGE);
      return;
    }

    setLoading(true);

    const payload = {
      userName: userName,
      firstName: firstName,
      lastName: lastName,
      password: createPassword,
      email: createEmail,
    };

    try {
      const res = await userSignup(payload);
      console.log('signup api res', res);
      if (res.success) {
        setLoading(false);
        showSuccess(res?.message);
        navigation.navigate(navigationStrings.LOGIN);
      }
    } catch (error) {
      setLoading(false);
      console.log('error in signup api', error);
      showError(`${error.message}`);
    }
  };

  return (
    <WrapperContainer>
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        style={styles.container}>
        <View style={{flex: 0.8}}>
          <View style={styles.headContainer}>
            <Image source={imagePath.icSmallLogo} />
            <TextComp text={strings.MOMENTO} style={styles.textStyles} />
          </View>

          <Image
            source={
              selectedTheme === 'dark'
                ? imagePath.icGifSignUpDark
                : imagePath.icGifSignUpLight
            }
            style={styles.imageStyles}
            resizeMode="contain"
          />

          <View style={styles.createAccountContainer} />
          <TextComp
            text={strings.WELCOME_TO_MOMENTO}
            style={{...styles.welcomeStyles, fontSize: textScale(30)}}
          />
          <TextComp
            text={strings.ITS_QUICK_EASY}
            style={styles.loginYourStyles}
          />

          <View style={styles.socialContainer}>
            <View style={styles.inputStyles}>
              <TextInputComp
                value={firstName}
                setValue={setFirstName}
                leftIcon={imagePath.icCircle}
                placeholderText={strings.FIRST_NAME}
              />
            </View>
            <View style={styles.inputStyles}>
              <TextInputComp
                value={lastName}
                setValue={setLastName}
                leftIcon={imagePath.icCircle}
                placeholderText={strings.Last_Name}
              />
            </View>
          </View>

          <TextInputComp
            value={userName}
            setValue={setUserName}
            leftIcon={imagePath.icUser}
            placeholderText={strings.USERNAME}
            secureText={false}
          />
          <TextInputComp
            value={createEmail}
            setValue={setCreateEmail}
            leftIcon={imagePath.icEmail}
            placeholderText={strings.Email}
            keyboardType={'email-address'}
          />

          <TextInputComp
            value={createPassword}
            setValue={setCreatePassword}
            leftIcon={imagePath.icPassword}
            placeholderText={strings.Password}
            secureText={secureText}
            rightIcon={secureText ? imagePath.icEyeOff : imagePath.icEye}
            toggleSecureEntry={toggleSecureEntry}
          />

          <ButtonComp
            title={strings.CREATE}
            style={styles.button}
            onPress={signUpHandler}
            loading={loading}
          />

          <TouchableOpacity
            style={styles.alreadyContainer}
            activeOpacity={0.7}
            onPress={() => navigation.navigate(navigationStrings.LOGIN)}>
            <TextComp
              text={strings.ALREADY_HAVE_AN_ACCOUNT}
              style={styles.forgetStyles}
            />
            <TextComp
              text={strings.LOGIN}
              style={{
                ...styles.forgetStyles,
                color: colors.purple,
                fontFamily: fontFamily.mornBold,
              }}
            />
          </TouchableOpacity>
        </View>

        <View style={{flex: 0.2}}>
          <TouchableOpacity
            style={styles.privacyContainer}
            activeOpacity={0.7}
            onPress={() => alert('click')}>
            <TextComp style={styles.createAccountDesStyles}>
              {strings.BY_SIGNING_UP}
              <Text style={styles.privacyStyles}>
                {strings.TERMS_PRIVACY_POLICY}
              </Text>
              <Text style={styles.createAccountDesStyles}>{strings.AND}</Text>
              <Text style={styles.privacyStyles}>{strings.Cookies_POLICY}</Text>
            </TextComp>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    </WrapperContainer>
  );
}
