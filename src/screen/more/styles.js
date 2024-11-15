import {StyleSheet} from 'react-native';
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
  width,
} from '../../styles/responsiveSize';
import colors from '../../styles/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: moderateScale(10),
  },
  stockStyles: {
    marginVertical: moderateScale(10),
    marginHorizontal: moderateScale(10),
    backgroundColor: colors.gray,
    padding: moderateScaleVertical(10),
    borderRadius: moderateScale(20),
  },
  companyName: {
    color: colors.white,
    fontSize: textScale(16),
    fontWeight: 'bold',
    lineHeight: moderateScale(30),
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: moderateScale(10),
    alignItems: 'center',
  },
  btnContainer: {
    backgroundColor: colors.white,
    width: moderateScale(80),
    height: moderateScale(35),
    justifyContent: 'center',
    borderRadius: moderateScale(60),
  },
  buttonText: {
    fontSize: textScale(13),
    color: colors.black,
    textAlign: 'center',
  },
  price: {
    fontSize: moderateScale(18),
    fontWeight: 'bold',
    color: colors.white,
    textAlign: 'center',
  },
  sector: {
    fontSize: moderateScale(14),
    fontWeight: 'bold',
    color: colors.white,
    textAlign: 'center',
  },

  // bottom all styles here
  bottomContainer: {
    marginHorizontal: moderateScale(12),
  },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  tab: {
    width: moderateScale(50),
    height: moderateScale(40),
    borderRadius: moderateScale(10),
    justifyContent: 'center',
    gap: moderateScale(10),
    backgroundColor: colors.white,
    alignItems: 'center',
  },
  activeTab: {
    alignItems: 'center',
    backgroundColor: colors.blueOpacity50,
  },
  tabText: {
    fontSize: textScale(16),
    textAlign: 'center',
  },
  activeTabText: {
    fontSize: textScale(16),
    color: colors.white,
  },
  sectionTitle: {
    fontSize: textScale(18),
    fontWeight: '500',
    marginTop: moderateScaleVertical(10),
    marginBottom: moderateScaleVertical(10),
  },
  sectionTitleText: {
    fontSize: textScale(15),
    fontWeight: '500',
    marginHorizontal: moderateScaleVertical(5),
    lineHeight: moderateScale(20),
    color: colors.gray,
  },
  cardContainer: {
    flex: 1,
    marginVertical: moderateScale(10),
    alignSelf: 'center',
  },
  priceContainer: {
    width: width / 3.5,
    height: moderateScale(65),
    justifyContent: 'space-evenly',
    backgroundColor: colors.blackOpacity90,
    borderRadius: moderateScale(8),
  },
  dayText: {
    textAlign: 'center',
    fontSize: textScale(16),
    color: colors.white,
    fontWeight: '500',
  },
  plusPrice: {
    textAlign: 'center',
    fontSize: textScale(16),
    color: colors.lightGreen2,
    fontWeight: '500',
  },
  meterContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: moderateScale(20),
    marginBottom: moderateScale(40),
  },
});

export default styles;
