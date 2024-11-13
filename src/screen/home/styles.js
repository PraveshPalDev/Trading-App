import {StyleSheet} from 'react-native';
import {moderateScale, textScale, width} from '../../styles/responsiveSize';
import colors from '../../styles/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: moderateScale(12),
  },
  userInformationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: moderateScale(12),
  },
  userInfoNameContainer: {
    padding: moderateScale(18),
  },
  stylesText: {
    fontSize: textScale(15),
    color: colors.grayOpacity50,
  },
  stylesTextName: {
    fontSize: textScale(18),
    fontWeight: '600',
    color: colors.black,
  },
  heading: {
    marginBottom: moderateScale(12),
  },
  seeAllStyles: {
    marginBottom: moderateScale(12),
    textDecorationColor: colors.blue,
    color: colors.blue,
    textDecorationLine: 'underline',
    fontSize: textScale(16),
  },
  stockStyles: {
    marginHorizontal: moderateScale(12),
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginVertical: moderateScale(10),
  },

  // flatList styles here
  card: {
    width: width / 2.1,
    backgroundColor: colors.black,
    borderRadius: moderateScale(30),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: moderateScale(5),
    padding: moderateScale(12),
    height: moderateScale(70),
  },
  iconContainer: {
    width: moderateScale(40),
    height: moderateScale(40),
    borderRadius: moderateScale(20),
    borderWidth: moderateScale(1),
    borderColor: colors.white,
    marginRight: moderateScale(12),
  },
  iconText: {
    fontSize: textScale(16),
    color: colors.black,
    fontWeight: 'bold',
  },
  textContainer: {
    flex: 1,
  },
  symbol: {
    color: colors.white,
    fontSize: textScale(15),
    fontWeight: 'bold',
    marginBottom: 4,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  price: {
    color: colors.white,
    fontSize: textScale(13),
    marginRight: 4,
  },
  change: {
    color: '#4CAF50',
    fontSize: textScale(13),
  },

  eventContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: moderateScale(10),
    backgroundColor: colors.grayOpacity10,
    borderRadius: moderateScale(10),
  },
});

export default styles;
