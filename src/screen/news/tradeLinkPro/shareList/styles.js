import {StyleSheet} from 'react-native';
import {
  moderateScale,
  textScale,
  width,
} from '../../../../styles/responsiveSize';
import colors from '../../../../styles/colors';

const styles = StyleSheet.create({
  containerFirst: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: moderateScale(16),
    backgroundColor: colors.white,
  },
  floatingButtonContainer: {
    position: 'absolute',
    bottom: moderateScale(30),
    right: moderateScale(0),
  },
  headerStyles: {
    color: colors.black,
    fontSize: textScale(16),
  },

  // header styles here
  mainContainer: {
    backgroundColor: colors.white,
    marginHorizontal: moderateScale(12),
    marginVertical: moderateScale(10),
    borderRadius: moderateScale(15),
  },
  mainSubContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: moderateScale(5),
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: moderateScale(12),
    padding: moderateScale(8),
  },
  leftText: {
    fontSize: textScale(18),
    colors: colors.black,
    fontWeight: 'bold',
  },
  headerRightContainer: {
    flex: 7,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  searchContainer: {
    flex: 1,
    height: moderateScale(45),
  },
  infoContainer: {
    width: moderateScale(40),
    height: moderateScale(40),
    borderRadius: moderateScale(20),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.blueOpacity30,
  },

  // change the bottom both container
  dateMainContainer: {
    marginTop: moderateScale(10),
    marginHorizontal: moderateScale(10),
    marginVertical: moderateScale(16),
    backgroundColor: colors.white,
    borderRadius: moderateScale(12),
    padding: moderateScale(8),
  },
  header: {
    backgroundColor: colors.blue,
    paddingVertical: moderateScale(16),
    alignItems: 'center',
  },
  headerText: {
    color: colors.white,
    fontSize: textScale(18),
    fontWeight: 'bold',
  },
  dataTableContainer: {
    paddingHorizontal: moderateScale(16),
    paddingVertical: moderateScale(12),
    borderRadius: moderateScale(12),
  },
  dataTableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: colors.grayOpacity20,
    paddingVertical: moderateScale(8),
  },
  dataTableCell: {
    flex: 1,
    fontSize: textScale(14),
    color: colors.black,
    fontWeight: 'bold',
  },

  dataTableCell2: {
    flex: 1,
    fontSize: textScale(14),
    color: colors.black,
  },

  chartSectionContainer: {
    flexDirection: 'row',
    paddingVertical: moderateScale(16),
    marginTop: moderateScale(18),
  },
  chartContainer: {
    backgroundColor: colors.white,
    borderRadius: moderateScale(8),
    marginHorizontal: moderateScale(8),
    padding: moderateScale(8),
    width: moderateScale(300),
  },
  chartTitle: {
    fontSize: textScale(16),
    fontWeight: 'bold',
    marginBottom: moderateScale(8),
  },
  chartContent: {
    height: moderateScale(200),
    backgroundColor: colors.white,
    borderRadius: moderateScale(8),
  },
  chartFooter: {
    marginTop: moderateScale(8),
    textAlign: 'right',
    fontSize: textScale(15),
    fontWeight: 'bold',
  },
  activeCard: {
    backgroundColor: colors.grayOpacity20,
    borderWidth: 1,
    borderColor: colors.gray,
  },
  inactiveCard: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.gray,
  },

  footerContainer: {
    width: moderateScale(60),
    height: moderateScale(30),
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: moderateScale(50),
    justifyContent: 'center',
    alignItems: 'center',
  },

  cardUpperContainer: {
    width: moderateScale(60),
    height: moderateScale(60),
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: moderateScale(50),
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: moderateScale(-15),
    bottom: moderateScale(15),
  },

  negativeBackground: {
    backgroundColor: colors.red,
  },
  positiveBackground: {
    backgroundColor: colors.lightGreen2,
  },
  footerText: {
    fontSize: textScale(14),
    fontWeight: 'bold',
  },
  titleContainer: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  aboveCardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: moderateScale(5),
  },

  // here modal styles
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '90%',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  headerText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    flex: 1,
    marginRight: 10,
  },
  modalBody: {
    marginTop: 10,
  },
  bodyText: {
    fontSize: 14,
    color: '#444',
    lineHeight: 20,
  },
  // content styles here
  container: {
    flex: 1,
    backgroundColor: colors.white,
    borderRadius: moderateScale(8),
    padding: moderateScale(16),
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: moderateScale(2),
    },
    shadowOpacity: moderateScale(0.25),
    shadowRadius: moderateScale(3.84),
    elevation: moderateScale(5),
    marginHorizontal: moderateScale(16),
    marginVertical: moderateScale(8),
  },
  lockedCard: {
    height: moderateScale(300),
    backgroundColor: colors.whiteOpacity50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: moderateScale(8),
  },
  unlockedCard: {
    backgroundColor: colors.white,
  },
  lockedContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  lockIcon: {
    marginBottom: moderateScale(8),
  },
  lockedText: {
    color: colors.gray,
    fontSize: textScale(16),
    fontWeight: 'bold',
  },
  CompanyContainer: {
    width: width / 1.1,
    height: moderateScale(250),
    marginHorizontal: moderateScale(16),
    alignSelf: 'center',
    backgroundColor: colors.white,
    borderRadius: moderateScale(8),
  },
  contentContainer: {
    padding: moderateScale(5),
  },
  title: {
    fontSize: textScale(18),
    fontWeight: 'bold',
    marginBottom: moderateScale(10),
    textAlign: 'left',
  },
  description: {
    fontSize: textScale(16),
    lineHeight: moderateScale(24),
    padding: moderateScale(15),
  },
});

export default styles;
