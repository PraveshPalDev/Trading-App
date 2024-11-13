import {StyleSheet} from 'react-native';
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
  width,
} from '../../../styles/responsiveSize';
import colors from '../../../styles/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: moderateScale(12),
  },
  stockStyles: {
    marginVertical: moderateScale(10),
    marginHorizontal: moderateScale(5),
  },
  iconContainer: {
    width: moderateScale(60),
    height: moderateScale(60),
    borderRadius: moderateScale(30),
    marginHorizontal: moderateScale(8),
  },
  leftStockContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginRight: moderateScale(5),
  },
  heading: {
    fontSize: textScale(20),
    fontWeight: 'bold',
  },
  headingCentered: {
    fontSize: textScale(16),
    fontWeight: 'normal',
    textAlign: 'left',
    alignSelf: 'center',
  },

  priceStyles: {
    fontSize: textScale(19),
    fontWeight: 'bold',
  },
  priceRateStyles: {
    color: colors.lightGreen,
    textAlign: 'center',
    fontSize: textScale(17),
  },
  // bottom all styles here
  bottomContainer: {
    marginHorizontal: moderateScale(12),
  },
  priceContainer: {
    marginLeft: 'auto',
    alignItems: 'flex-end',
  },
  currentPrice: {
    fontSize: textScale(20),
    fontWeight: 'bold',
    color: colors.black,
  },
  priceChange: {
    fontSize: textScale(16),
    color: colors.lightGreen,
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
    marginVertical: moderateScaleVertical(12),
  },
  overview: {
    padding: moderateScale(5),
    borderRadius: moderateScale(8),
  },
  overviewRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: moderateScale(8),
    borderBottomColor: colors.grayOpacity90,
    borderBottomWidth: moderateScale(1),
    paddingBottom: moderateScale(8),
  },
  overviewLabel: {
    color: colors.gray,
    fontSize: textScale(16),
  },
  overviewValue: {
    fontWeight: 'bold',
    color: colors.black,
  },
  financialButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  financialButton: {
    paddingVertical: moderateScale(10),
    paddingHorizontal: moderateScale(16),
    borderRadius: moderateScale(30),
    borderWidth: moderateScale(1),
    borderColor: colors.black,
  },
  financialButtonText: {
    fontSize: textScale(16),
    color: colors.black,
    fontWeight: 'bold',
  },
  buyBtnStyles: {
    width: width / 1.1,
    height: moderateScale(50),
    backgroundColor: colors.blueOpacity50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: moderateScale(10),
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{translateX: -width / 2.2}, {translateY: -moderateScale(60)}],
  },
  btnText: {
    fontSize: textScale(18),
    color: colors.white,
    fontWeight: '600',
  },
});

export default styles;
