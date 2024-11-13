import {StyleSheet} from 'react-native';
import {
  height,
  moderateScale,
  moderateScaleVertical,
  textScale,
  width,
} from '../../styles/responsiveSize';
import fontFamily from '../../styles/fontFamily';
import colors from '../../styles/colors';

const styles = StyleSheet.create({
  container: {
    marginHorizontal: moderateScale(16),
  },
  headContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textStyles: {
    fontFamily: fontFamily.mornRegular,
    paddingLeft: moderateScale(8),
  },
  tabStyles: {
    alignItems: 'center',
    marginVertical: moderateScaleVertical(20),
  },
  bottomStyles: {
    borderBottomColor: colors.black,
    borderBottomWidth: moderateScale(5),
    paddingBottom: moderateScale(5),
    borderRadius: moderateScale(3),
  },
  createContainer: {
    marginLeft: moderateScale(20),
  },
  createStyles: {
    fontSize: textScale(16),
    fontFamily: fontFamily.mornMedium,
    color: colors.gray,
  },
  loginStyles: {
    fontSize: textScale(16),
    fontFamily: fontFamily.mornBold,
  },
  imageStyles: {
    width: width / 1.1,
    height: height / 4,
    marginBottom: moderateScale(15),
  },
  welcomeStyles: {
    fontSize: textScale(32),
    fontFamily: fontFamily.mornBold,
    color: colors.purple,
  },
  loginYourStyles: {
    paddingTop: moderateScale(15),
    fontSize: textScale(24),
    fontFamily: fontFamily.mornMedium,
  },
  forgetStyles: {
    fontSize: textScale(16),
    fontFamily: fontFamily.mornRegular,
    color: colors.black,
    marginVertical: moderateScale(10),
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: moderateScale(15),
    alignItems: 'center',
  },
  button: {
    width: moderateScale(130),
    height: moderateScale(48),
    paddingHorizontal: moderateScale(15),
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  socialMediaBtn: {
    width: moderateScale(40),
    height: moderateScale(40),
    backgroundColor: colors.purple,
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    borderRadius: moderateScale(20),
    marginHorizontal: moderateScale(5),
  },
  inputStyles: {
    width: width / 2.3,
  },
  createAccountContainer: {
    marginVertical: moderateScale(85),
  },
  privacyContainer: {
    marginVertical: moderateScaleVertical(40),
  },
  createAccountDesStyles: {
    fontSize: textScale(14),
    fontFamily: fontFamily.objectivityRegular,
    textAlign: 'center',
    lineHeight: moderateScale(20),
  },
  privacyStyles: {
    fontSize: textScale(15),
    fontFamily: fontFamily.objectivityRegular,
    textAlign: 'center',
    color: colors.purple,
    textDecorationLine: 'underline',
  },
});

export default styles;
