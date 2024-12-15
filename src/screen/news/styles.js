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
  activeDotStyles: {
    width: moderateScale(50),
    backgroundColor: colors.blue,
    borderRadius: moderateScale(20),
  },

  // tabs styles
  tabsContainer: {
    marginTop: moderateScale(30),
    paddingHorizontal: moderateScale(12),
    paddingVertical: moderateScaleVertical(12),
  },
  tab: {
    paddingHorizontal: moderateScale(20),
    paddingVertical: moderateScaleVertical(10),
    marginRight: moderateScale(8),
    borderRadius: moderateScale(20),
    backgroundColor: colors.grayOpacity20,
  },
  activeTab: {
    backgroundColor: colors.blueOpacity50,
  },
  tabText: {
    fontSize: textScale(14),
    color: colors.black,
    fontWeight: 'bold',
  },
  activeTabText: {
    fontSize: textScale(14),
    color: colors.white,
    fontWeight: 'bold',
  },

  stockStyles: {
    width: width / 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingLeft: moderateScale(25),
    alignItems: 'center',
  },
  seeAllStyles: {
    marginBottom: moderateScale(12),
    textDecorationColor: colors.blue,
    color: colors.blue,
    textDecorationLine: 'underline',
    fontSize: textScale(16),
  },
  heading: {
    marginBottom: moderateScale(12),
    marginVertical: moderateScale(12),
  },

  // card styles
  card: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    borderRadius: moderateScale(20),
    padding: moderateScale(10),
    marginBottom: moderateScale(10),
    marginHorizontal: moderateScale(10),
  },
  image: {
    width: moderateScale(120),
    height: moderateScale(200),
    borderRadius: moderateScale(12),
    justifyContent: 'center',
    alignSelf: 'center',
  },
  contentContainer: {
    flex: 1,
    marginLeft: moderateScale(12),
    justifyContent: 'space-between',
  },
  categoryContainer: {
    width: width / 1.7,
    backgroundColor: colors.white,
    paddingHorizontal: moderateScale(12),
    paddingVertical: moderateScale(4),
    borderRadius: moderateScale(16),
    alignSelf: 'flex-start',
  },
  categoryText: {
    fontSize: textScale(14),
    color: colors.black,
  },
  title: {
    fontSize: textScale(14),
    color: colors.black,
    marginVertical: moderateScaleVertical(8),
    lineHeight: moderateScale(20),
  },
  sourceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sourceInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sourceLogo: {
    width: moderateScale(20),
    height: moderateScale(20),
    borderRadius: moderateScale(10),
  },
  sourceName: {
    fontSize: textScale(14),
    color: colors.gray,
    marginLeft: moderateScale(6),
  },
  timeText: {
    fontSize: textScale(12),
    color: colors.gray,
  },
});

export default styles;
