import {View, TouchableOpacity, Image} from 'react-native';
import React, {useState} from 'react';
import WrapperContainer from '../../components/WrapperContainer';
import TextComp from '../../components/TextComp';
import TextInputComp from '../../components/TextInputComp';
import colors from '../../styles/colors';
import styles from './styles';
import strings from '../../constants/lang';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import navigationStrings from '../../navigation/navigationStrings';
import ButtonComp from '../../components/ButtonCom';
import imagePath from '../../constants/imagePath';
import {showError, showSuccess} from '../../utils/helperFunctions';
import {userLogin} from '../../redux/actions/auth';

export default function Login({navigation}) {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState('stamch96@gmail.com');
  const [password, setPassword] = useState('Password1');
  const [loading, setLoading] = useState(false);

  const toggleSecureEntryHandler = () => {
    setPasswordVisible(prevState => !prevState);
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
      if (res) {
        showSuccess(strings.LOGIN_SUCCESS);
        setLoading(false);
      }
    } catch (error) {
      console.log('error in login api', error);
      showError(`${error}`);
      setLoading(false);
    }
  };

  const googleSignHandler = () => {};
  const faceBookSignHandler = () => {};

  const SignUpHandler = () => {
    navigation.navigate(navigationStrings.SignUp);
  };

  return (
    <WrapperContainer>
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        style={{flex: 1}}>
        <View style={styles.container}>
          <TextComp text={strings.WelcomeBack} style={styles.welcomeText} />
          <TextComp text={strings.SignInText} style={styles.signInText} />

          <View style={styles.inputContainer}>
            <TextInputComp
              value={email}
              setValue={text => setEmail(text)}
              style={styles.input}
              placeholder={strings.PlaceholderEmail}
              placeholderTextColor={colors.gray}
              rightIcon={'account'}
              rightIconColor={colors.blueOpacity70}
            />
          </View>

          <View style={styles.inputContainer}>
            <TextInputComp
              value={password}
              setValue={text => setPassword(text)}
              style={styles.input}
              placeholder={strings.PlaceholderPassword}
              placeholderTextColor={colors.gray}
              toggleSecureEntry={toggleSecureEntryHandler}
              secureText={!passwordVisible}
              rightIcon={passwordVisible ? 'eye' : 'eye-off'}
              rightIconColor={colors.blueOpacity70}
            />
          </View>

          <TouchableOpacity activeOpacity={0.7}>
            <TextComp
              text={strings.ForgotPassword}
              style={styles.forgotPasswordText}
            />
          </TouchableOpacity>

          <ButtonComp
            onPress={loginHandler}
            title={strings.SignIn}
            style={styles.signInButton}
            styleText={styles.signInButtonText}
            loading={loading}
          />

          <TextComp text={strings.OrText} style={styles.orText} />

          <TouchableOpacity
            style={styles.socialButton}
            activeOpacity={0.7}
            onPress={googleSignHandler}>
            <Image
              source={imagePath.icGoogle}
              style={styles.socialButtonImage}
            />
            <TextComp style={styles.socialButtonText}>
              {strings.GoogleSignIn}
            </TextComp>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.socialButton}
            activeOpacity={0.7}
            onPress={faceBookSignHandler}>
            <Image
              source={imagePath.icFaceBook}
              style={styles.socialButtonImage}
            />
            <TextComp style={styles.socialButtonText}>
              {strings.FacebookSignIn}
            </TextComp>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.signUpContainer}
            activeOpacity={0.7}
            onPress={SignUpHandler}>
            <TextComp style={styles.createAccountText}>
              {strings.CreateAccount}
            </TextComp>
            <TextComp style={styles.signUpText}>{strings.SignUp}</TextComp>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    </WrapperContainer>
  );
}
