import {StyleSheet} from 'react-native';
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
} from '../../styles/responsiveSize';
import colors from '../../styles/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: moderateScale(20),
    justifyContent: 'center',
    marginVertical: moderateScale(25),
  },
  welcomeText: {
    fontSize: textScale(28),
    fontWeight: 'bold',
    color: colors.black,
    marginBottom: moderateScale(10),
  },
  signInText: {
    fontSize: textScale(16),
    color: colors.gray,
    marginBottom: moderateScale(20),
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    fontSize: textScale(16),
    color: colors.black,
  },
  forgotPasswordText: {
    alignSelf: 'flex-end',
    color: colors.blueOpacity70,
    marginBottom: moderateScale(30),
    fontSize: textScale(15),
  },
  signInButton: {
    backgroundColor: colors.blueOpacity70,
    paddingVertical: moderateScaleVertical(15),
    borderRadius: moderateScale(8),
    alignItems: 'center',
    marginBottom: moderateScale(20),
    justifyContent: 'center',
  },
  signInButtonText: {
    color: colors.white,
    fontSize: textScale(18),
    fontWeight: '700',
    textAlign: 'center',
  },
  orText: {
    textAlign: 'center',
    fontSize: textScale(14),
    color: colors.gray,
    marginBottom: moderateScale(20),
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.grayOpacity20,
    paddingVertical: moderateScaleVertical(8),
    paddingHorizontal: moderateScale(15),
    borderRadius: moderateScaleVertical(8),
    marginBottom: moderateScale(15),
  },

  socialButtonText: {
    paddingLeft: moderateScale(10),
    fontSize: textScale(16),
    color: colors.black,
    textAlign: 'center',
  },

  signUpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: moderateScale(20),
  },
  createAccountText: {
    fontSize: textScale(15),
    color: colors.gray,
  },
  signUpText: {
    fontSize: textScale(15),
    color: colors.blueOpacity70,
    fontWeight: '600',
    marginBottom: moderateScale(20),
  },
  socialButtonImage: {
    width: moderateScale(33),
    height: moderateScale(33),
  },
});

export default styles;
