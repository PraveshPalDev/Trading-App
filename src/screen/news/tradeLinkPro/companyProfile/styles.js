import {StyleSheet} from 'react-native';
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
  width,
} from '../../../../styles/responsiveSize';
import colors from '../../../../styles/colors';

const styles = StyleSheet.create({
  containerMain: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: moderateScale(16),
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
  // lock card styles here
  cardContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: moderateScale(2),
    marginTop: moderateScale(8),
  },
  card: {
    width: width / 1.05,
    height: moderateScale(190),
    borderRadius: moderateScale(15),
    justifyContent: 'center',
    alignItems: 'center',
    elevation: moderateScale(4),
    shadowColor: '#000',
    shadowOpacity: moderateScale(0.2),
    shadowOffset: {width: 0, height: 3},
    shadowRadius: moderateScale(4),
  },
  lockedCard: {
    backgroundColor: colors.white,
  },
  unlockedCard: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.white,
  },
  lockIcon: {
    opacity: moderateScale(0.8),
  },
  unlockedText: {
    fontSize: textScale(16),
    color: colors.gray,
    fontWeight: 'bold',
  },

  // here stockCard styles
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
  header2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: moderateScale(8),
  },
  ticker: {
    color: colors.blue,
    fontSize: moderateScale(16),
    fontWeight: 'bold',
    padding: moderateScale(8),
    borderWidth: 1,
    borderColor: colors.blue,
    borderRadius: moderateScale(20),
  },
  price: {
    color: colors.black,
    fontSize: textScale(24),
    fontWeight: 'bold',
  },
  companyName: {
    color: colors.black,
    fontSize: textScale(18),
    fontWeight: 'bold',
    marginBottom: moderateScale(4),
  },
  sectionLabel: {
    color: colors.gray,
    fontSize: textScale(14),
  },
  sectorLabel: {
    paddingLeft: moderateScale(5),
    color: colors.black,
    fontSize: textScale(14),
  },
  metricsContainer: {
    marginTop: moderateScale(10),
  },
  metricItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: moderateScaleVertical(4),
  },
  metricLabel: {
    color: colors.black,
    fontSize: textScale(14),
  },
  metricValue: {
    color: colors.black,
    fontSize: textScale(14),
    fontWeight: 'bold',
  },
  positive: {
    color: colors.lightGreen2,
  },
  negative: {
    color: colors.red,
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
  // this is companyDescription
  CompanyContainer: {
    width: width / 1.1,
    height: moderateScale(300),
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

  // here all technical styles
  technicalAnalysisContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: moderateScale(20),
    paddingHorizontal: moderateScale(12),
  },
  analysisText: {
    fontSize: textScale(16),
    fontWeight: 'bold',
    color: colors.black,
  },
  meterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: moderateScale(60),
  },
  meterContainer2: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
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
  // tabs styles here
  scene: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
  },
  tabBar: {
    backgroundColor: '#000',
    borderRadius: moderateScale(10),
  },
  indicator: {
    backgroundColor: colors.blue,
    height: 3,
  },
  label: {
    fontSize: textScale(14),
    fontWeight: 'bold',
    color: colors.black,
  },
  tabContentText: {
    fontSize: textScale(14),
    color: colors.black,
  },
  // // pie chart styles here
  stockContainer: {
    width: width / 1,
    height: moderateScale(450),
    paddingHorizontal: moderateScale(12),
  },
  chartContainer: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerTextContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerText: {
    fontSize: textScale(18),
    fontWeight: 'bold',
    color: colors.gray,
  },
  centerValue: {
    fontSize: textScale(24),
    fontWeight: 'bold',
    color: colors.gray,
  },

  // card styles
  newFeedCard: {
    width: width / 7,
    flexDirection: 'row',
    backgroundColor: colors.white,
    borderRadius: moderateScale(20),
    padding: moderateScale(10),
    marginBottom: moderateScale(10),
    marginHorizontal: moderateScale(10),
  },
  image: {
    width: moderateScale(100),
    height: moderateScale(140),
    borderRadius: moderateScale(12),
    justifyContent: 'center',
    alignSelf: 'center',
  },
  contentContainer: {
    flex: 1,
    marginLeft: moderateScale(12),
    // justifyContent: 'space-between',
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
    color: colors.black,
    fontSize: textScale(13),
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
  newFeedTitle: {
    paddingLeft: moderateScale(20),
    paddingTop: moderateScale(10),
    fontSize: moderateScale(18),
    color: colors.black,
    fontWeight: 'bold',
  },
  newFeedSubContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginRight: moderateScale(8),
  },
});

export default styles;
