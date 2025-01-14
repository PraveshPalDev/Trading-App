import {Dimensions, StyleSheet} from 'react-native';
import {
  moderateScale,
  textScale,
  width,
} from '../../../../styles/responsiveSize';
import colors from '../../../../styles/colors';

const styles = StyleSheet.create({
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
  // time zone styles
  listContainer: {
    paddingHorizontal: moderateScale(12),
    paddingVertical: moderateScale(12),
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: moderateScale(12),
    elevation: moderateScale(3),
    shadowColor: colors.black,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: moderateScale(4),
    padding: moderateScale(10),
    alignItems: 'center',
    marginHorizontal: moderateScale(4),
    minWidth: Dimensions.get('window').width / 4.5,
  },
  cityText: {
    fontSize: textScale(14),
    color: colors.gray,
    fontWeight: '500',
  },
  timeText: {
    fontSize: textScale(18),
    color: colors.black,
    fontWeight: 'bold',
    marginTop: moderateScale(5),
  },
  // card list styles here
  header: {
    fontSize: textScale(16),
    fontWeight: 'bold',
    marginBottom: moderateScale(12),
    color: colors.black,
  },
  dropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: moderateScale(10),
    paddingHorizontal: moderateScale(12),
    borderRadius: moderateScale(8),
    borderColor: colors.white,
    borderWidth: 1,
    marginBottom: moderateScale(16),
  },
  dropdownText: {
    color: colors.black,
    fontWeight: '600',
  },
  list: {
    paddingBottom: moderateScale(16),
  },
  title: {
    fontSize: textScale(16),
    fontWeight: '500',
    color: colors.gray,
    marginBottom: moderateScale(4),
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  source: {
    fontSize: textScale(14),
    color: colors.gray,
  },
  time: {
    fontSize: textScale(14),
    color: colors.gray,
  },

  // here calendar styles
  flashListContainer: {
    marginBottom: moderateScale(12),
    borderBottomLeftRadius: moderateScale(10),
    borderBottomRightRadius: moderateScale(10),
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
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
    padding: moderateScale(8),
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
    color: colors.black,
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
  dateLabelStyles: {
    color: colors.black,
    fontSize: textScale(16),
    fontVariant: '500',
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
});

export default styles;
