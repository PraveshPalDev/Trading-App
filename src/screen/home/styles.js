import {StyleSheet} from 'react-native';
import {moderateScale, textScale, width} from '../../styles/responsiveSize';
import colors from '../../styles/colors';

const styles = StyleSheet.create({
  itemSeparator: {
    marginBottom: moderateScale(10),
  },
  listContainer: {
    flexGrow: 1,
    marginBottom: moderateScale(20),
  },

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
    fontSize: textScale(16),
    color: colors.black,
    fontWeight: '300',
    lineHeight: moderateScale(26),
  },
  stylesTextName: {
    fontSize: textScale(18),
    fontWeight: '600',
    color: colors.blueOpacity90,
  },
  heading: {
    marginBottom: moderateScale(12),
  },
  seeAllStyles: {
    textDecorationColor: colors.blue,
    color: colors.blue,
    textDecorationLine: 'underline',
    fontSize: textScale(16),
  },
  stockStyles: {
    marginHorizontal: moderateScale(12),
    justifyContent: 'space-between',
    flexDirection: 'row',
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  symbol: {
    color: colors.white,
    fontSize: textScale(15),
    fontWeight: 'bold',
    marginBottom: moderateScale(5),
    lineHeight: moderateScale(30),
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    lineHeight: moderateScale(30),
  },
  price: {
    color: colors.white,
    fontSize: textScale(13),
    marginRight: moderateScale(4),
  },
  change: {
    color: colors.green,
    fontSize: textScale(13),
  },

  eventContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: moderateScale(10),
    backgroundColor: colors.grayOpacity10,
    borderRadius: moderateScale(10),
  },

  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'center',
  },

  imageContainer: {
    width: moderateScale(80),
    height: moderateScale(80),
    borderRadius: moderateScale(40),
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: moderateScale(1.5),
    borderColor: colors.blue,
    alignSelf: 'center',
    marginLeft: moderateScale(8),
  },
});

export default styles;
