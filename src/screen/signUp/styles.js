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
  welcomeStyles: {
    fontSize: textScale(32),
    fontFamily: fontFamily.mornBold,
    color: colors.purple,
  },
  loginYourStyles: {
    paddingTop: moderateScale(5),
    fontSize: textScale(22),
    fontFamily: fontFamily.mornMedium,
  },
  button: {
    width: moderateScale(130),
    height: moderateScale(48),
    paddingHorizontal: moderateScale(20),
  },
  forgetStyles: {
    fontSize: textScale(16),
    fontFamily: fontFamily.mornRegular,
    color: colors.black,
    marginVertical: moderateScale(10),
  },
  imageStyles: {
    width: width / 1.1,
    height: height / 4.7,
    marginBottom: moderateScale(5),
    justifyContent: 'center',
    alignSelf: 'center',
  },
  textStyles: {
    fontFamily: fontFamily.mornRegular,
    paddingLeft: moderateScale(8),
  },
  inputStyles: {
    width: width / 2.3,
  },
  createAccountContainer: {
    marginVertical: moderateScale(8),
  },
  createAccountDesStyles: {
    fontSize: textScale(14),
    fontFamily: fontFamily.objectivityRegular,
    textAlign: 'center',
    lineHeight: moderateScale(20),
  },
  alreadyTextStyles: {
    marginVertical: moderateScale(15),
    fontFamily: fontFamily.mornRegular,
    textAlign: 'center',
  },
  alreadyContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginVertical: moderateScaleVertical(25),
  },
  privacyStyles: {
    fontSize: textScale(15),
    fontFamily: fontFamily.objectivityRegular,
    textAlign: 'center',
    color: colors.purple,
    textDecorationLine: 'underline',
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default styles;
