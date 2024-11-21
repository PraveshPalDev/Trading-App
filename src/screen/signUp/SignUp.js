import {View, TouchableOpacity, Button} from 'react-native';
import React, {useState} from 'react';
import WrapperContainer from '../../components/WrapperContainer';
import TextComp from '../../components/TextComp';
import TextInputComp from '../../components/TextInputComp';
import colors from '../../styles/colors';
import styles from './styles';
import strings from '../../constants/lang';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import ButtonComp from '../../components/ButtonCom';
import navigationStrings from '../../navigation/navigationStrings';
import {showError, showSuccess} from '../../utils/helperFunctions';
import {emailRegex} from '../../utils/regex';
import {userSignup} from '../../redux/actions/auth';

export default function Login({navigation}) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    userName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (name, value) => {
    setFormData(prevState => ({...prevState, [name]: value}));
  };

  const toggleSecureEntryHandler = field => {
    if (field === 'password') {
      setPasswordVisible(prevState => !prevState);
    } else if (field === 'confirmPassword') {
      setConfirmPasswordVisible(prevState => !prevState);
    }
  };

  const signUpHandler = async () => {
    const {firstName, lastName, userName, email, password, confirmPassword} =
      formData;

    // Check if any required fields are empty
    if (
      (!firstName,
      !lastName,
      !userName,
      !email || !password || !confirmPassword)
    ) {
      showError(strings.SIGNUP_PAGE_ALL_VALIDATION);
      return;
    }

    if (password !== confirmPassword) {
      showError(strings.VALID_PASSWORD_MATCH);
      return;
    }

    // Check if email is valid
    const isValidEmail = email => emailRegex.test(email);
    if (!isValidEmail(email)) {
      showError(strings.VALID_EMAIL_MESSAGE);
      return;
    }

    try {
      setLoading(true);
      const res = await userSignup(formData);

      if (res) {
        showSuccess(strings.REGISTER_USER_SUCCESS);
        clearForm();
        navigateHandler();
        setLoading(false);
      }
    } catch (error) {
      console.log('error in login api', error);
      showError(`${error.DuplicateEmail}`);
      setLoading(false);
    }
  };

  const clearForm = () => {
    setFormData({
      firstName: '',
      lastName: '',
      userName: '',
      email: '',
      password: '',
      confirmPassword: '',
    });
  };

  const navigateHandler = () => {
    navigation.navigate(navigationStrings.LOGIN);
  };

  return (
    <WrapperContainer>
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        style={{flex: 1}}>
        <View style={styles.container}>
          <TextComp text={strings.WelcomeText} style={styles.welcomeText} />
          <TextComp text={strings.SignUpText} style={styles.signInText} />

          <View style={styles.inputContainer}>
            <TextInputComp
              value={formData.firstName}
              onChangeText={value => handleChange('firstName', value)}
              style={styles.input}
              placeholder={strings.firstName}
              placeholderTextColor={colors.gray}
              rightIcon={'account'}
              rightIconColor={colors.grayOpacity50}
            />
          </View>

          <View style={styles.inputContainer}>
            <TextInputComp
              value={formData.lastName}
              onChangeText={value => handleChange('lastName', value)}
              style={styles.input}
              placeholder={strings.lastName}
              placeholderTextColor={colors.gray}
              rightIcon={'account-check'}
              rightIconColor={colors.grayOpacity50}
            />
          </View>

          <View style={styles.inputContainer}>
            <TextInputComp
              value={formData.userName}
              onChangeText={value => handleChange('userName', value)}
              style={styles.input}
              placeholder={strings.UserName}
              placeholderTextColor={colors.gray}
              rightIcon={'account-circle'}
              rightIconColor={colors.grayOpacity50}
            />
          </View>

          <View style={styles.inputContainer}>
            <TextInputComp
              value={formData.email}
              onChangeText={value => handleChange('email', value)}
              style={styles.input}
              placeholder={strings.email}
              placeholderTextColor={colors.gray}
              rightIcon={'email'}
              rightIconColor={colors.grayOpacity50}
              keyboardType={'email'}
            />
          </View>

          <View style={styles.inputContainer}>
            <TextInputComp
              value={formData.password}
              onChangeText={value => handleChange('password', value)}
              style={styles.input}
              placeholder={strings.password}
              placeholderTextColor={colors.gray}
              toggleSecureEntry={() => toggleSecureEntryHandler('password')}
              secureText={!passwordVisible}
              rightIcon={passwordVisible ? 'eye' : 'eye-off'}
              rightIconColor={colors.grayOpacity50}
            />
          </View>

          <View style={styles.inputContainer}>
            <TextInputComp
              value={formData.confirmPassword}
              onChangeText={value => handleChange('confirmPassword', value)}
              style={styles.input}
              placeholder={strings.confirmPassword}
              placeholderTextColor={colors.gray}
              toggleSecureEntry={() =>
                toggleSecureEntryHandler('confirmPassword')
              }
              secureText={!confirmPasswordVisible}
              rightIcon={confirmPasswordVisible ? 'eye' : 'eye-off'}
              rightIconColor={colors.grayOpacity50}
            />
          </View>

          <ButtonComp
            onPress={signUpHandler}
            title={strings.SignUp}
            style={styles.signInButton}
            styleText={styles.signInButtonText}
            loading={loading}
          />

          <TouchableOpacity
            style={styles.signUpContainer}
            activeOpacity={0.7}
            onPress={navigateHandler}>
            <TextComp style={styles.createAccountText} key={1}>
              {strings.HaveAnAccount}
            </TextComp>
            <TextComp key={2} style={styles.signUpText}>
              {strings.SignIn}
            </TextComp>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    </WrapperContainer>
  );
}
