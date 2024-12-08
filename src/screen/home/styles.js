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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  imageContainer: {
    width: moderateScale(75),
    height: moderateScale(75),
    borderRadius: moderateScale(40),
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: moderateScale(1.5),
    borderColor: colors.blue,
    marginLeft: moderateScale(8),
    alignSelf: 'center',
  },

  // modal styles here
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: width / 1.05,
    backgroundColor: colors.white,
    borderRadius: moderateScale(15),
    padding: moderateScale(15),
  },
  cardBorderContainer: {
    justifyContent: 'center',
    alignSelf: 'center',
    width: width / 1.12,
    padding: moderateScale(10),
    borderWidth: 1,
    borderColor: colors.grayOpacity80,
    borderRadius: moderateScale(10),
  },
  title: {
    fontSize: textScale(18),
    fontWeight: 'bold',
    marginBottom: moderateScale(10),
  },

  optionButton: {
    backgroundColor: colors.white,
    padding: moderateScale(8),
    borderRadius: moderateScale(5),
    marginVertical: moderateScale(5),
    borderWidth: 1,
    borderColor: colors.blue,
  },
  buttonText: {
    textAlign: 'center',
    color: colors.blue,
    fontSize: textScale(16),
    fontWeight: '500',
  },
  sectionTitle: {
    fontSize: textScale(16),
    fontWeight: 'bold',
    marginBottom: moderateScale(10),
    textAlign: 'center',
  },
  dateInputsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: moderateScale(20),
  },
  dateInputWrapper: {
    flex: 1,
    marginHorizontal: moderateScale(5),
  },
  dateInput: {
    borderWidth: moderateScale(1),
    borderColor: colors.gray,
    borderRadius: moderateScale(5),
    padding: moderateScale(10),
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  applyButton: {
    backgroundColor: colors.blue,
    padding: moderateScale(10),
    borderRadius: moderateScale(5),
    alignItems: 'center',
    marginBottom: moderateScale(10),
  },
  disabledButton: {
    padding: moderateScale(12),
    backgroundColor: colors.blue,
  },
  applyButtonText: {
    color: colors.white,
    fontWeight: 'bold',
  },
  closeButton: {
    padding: moderateScale(10),
    borderWidth: 1,
    borderColor: colors.blue,
    alignItems: 'center',
    borderRadius: moderateScale(5),
  },
  closeButtonText: {
    color: colors.blue,
    fontWeight: 'bold',
  },

  //table styles here
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: colors.grayOpacity10,
    height: moderateScale(50),
    borderTopLeftRadius: moderateScale(10),
    borderTopRightRadius: moderateScale(10),
    borderWidth: 1,
    borderColor: colors.grayOpacity20,
    paddingHorizontal: moderateScale(10),
  },
  headerText: {
    flex: 1,
    fontWeight: 'bold',
    textAlign: 'center',
    color: colors.black,
    fontSize: textScale(14),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.grayOpacity20,
  },
  lastRow: {
    borderBottomLeftRadius: moderateScale(10),
    borderBottomRightRadius: moderateScale(10),
  },
  cell: {
    flex: 1,
    textAlign: 'center',
    fontSize: textScale(12),
    color: colors.black,
  },
  colorIndicator: {
    width: moderateScale(20),
    height: moderateScale(20),
    borderRadius: moderateScale(10),
    alignSelf: 'center',
  },
  flashListContainer: {
    marginBottom: moderateScale(12),
    borderBottomLeftRadius: moderateScale(10),
    borderBottomRightRadius: moderateScale(10),
  },
});

export default styles;
