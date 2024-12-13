import {StyleSheet} from 'react-native';
import {moderateScale, textScale, width} from '../../../styles/responsiveSize';
import colors from '../../../styles/colors';

const styles = StyleSheet.create({
  card: {
    width: width / 2.15,
    backgroundColor: colors.white,
    borderRadius: moderateScale(20),
    padding: moderateScale(10),
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: moderateScale(5),
    },
    shadowOpacity: moderateScale(0.25),
    shadowRadius: moderateScale(2.62),
    elevation: moderateScale(4),
    marginVertical: moderateScale(8),
    marginHorizontal: moderateScale(5),
    borderWidth: 1,
    borderColor: colors.gray,
    paddingBottom: moderateScale(20),
  },
  currentValueText: {
    fontSize: textScale(14),
    fontWeight: '500',
    color: colors.gray,
  },
  title: {
    fontSize: textScale(14),
    fontWeight: 'bold',
    marginBottom: moderateScale(8),
    padding: moderateScale(5),
    textAlign: 'center',
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    fontSize: textScale(18),
    fontWeight: 'bold',
  },
  percentChange: {
    fontSize: textScale(16),
    fontWeight: 'bold',
    padding: moderateScale(5),
    borderRadius: moderateScale(8),
  },
  positive: {
    fontSize: textScale(16),
    color: colors.white,
  },
  negative: {
    fontSize: textScale(16),

    color: colors.white,
  },
  percentChangeContainer: {
    padding: moderateScale(2),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: moderateScale(10),
  },
  // modal styles here
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: width / 1.05,
    backgroundColor: '#333',
    borderRadius: moderateScale(18),
    padding: moderateScale(20),
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: width / 1.15,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: textScale(16),
    color: colors.white,
    fontWeight: 'bold',
  },

  // this is all styles to table
  tableContainer: {
    width: width / 1.1,
    backgroundColor: colors.white,
    borderRadius: moderateScale(10),
    marginVertical: moderateScale(10),
  },

  tableBorder: {
    borderWidth: 1,
    borderColor: colors.gray,
    borderRadius: moderateScale(10),
  },
  head: {
    height: moderateScale(40),
    backgroundColor: colors.white,
    borderRadius: moderateScale(10),
  },
  headText: {
    fontSize: textScale(15),
    color: colors.black,
    textAlign: 'center',
  },
  text: {
    margin: moderateScale(6),
    textAlign: 'center',
    fontSize: textScale(14),
    color: colors.gray,
  },

  description: {
    fontSize: textScale(16),
    color: colors.blackOpacity50,
    marginVertical: moderateScale(10),
    textAlign: 'center',
    padding: moderateScale(10),
  },
  tableFooterStyles: {
    flexDirection: 'row',
    width: '30%',
    justifyContent: 'space-between',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingTop: moderateScale(5),
  },
  iconButton: {
    padding: moderateScale(10),
    borderRadius: moderateScale(5),
    marginHorizontal: moderateScale(5),
  },
  icon: {
    fontSize: textScale(18),
  },
  buyButton: {
    backgroundColor: colors.lightGreen,
    paddingVertical: moderateScale(13),
    paddingHorizontal: moderateScale(20),
    borderRadius: moderateScale(8),
  },
  buyButtonText: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: textScale(16),
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noContentText: {
    color: colors.black,
    fontSize: textScale(16),
    textAlign: 'center',
  },
});

export default styles;
