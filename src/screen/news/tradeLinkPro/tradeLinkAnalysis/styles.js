import {StyleSheet} from 'react-native';
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
  width,
} from '../../../../styles/responsiveSize';
import colors from '../../../../styles/colors';

const styles = StyleSheet.create({
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
    marginHorizontal: moderateScale(12),
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
  cardSubContainer: {
    flex: 1,
    backgroundColor: colors.white,
    borderRadius: moderateScale(8),
    shadowColor: colors.black,
    paddingHorizontal: moderateScale(12),
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
    fontSize: textScale(16),
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
    marginBottom: moderateScale(8),
  },
  sectorLabel: {
    marginTop: moderateScale(8),
  },
  metricsContainer: {
    marginTop: moderateScale(12),
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

  // here to first card styles
  cardContainer: {
    backgroundColor: colors.white,
    borderRadius: moderateScale(14),
    padding: moderateScale(8),
    elevation: moderateScale(4),
    shadowColor: colors.black,
    shadowOpacity: 0.1,
    shadowRadius: moderateScale(8),
    marginBottom: moderateScale(8),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  button: {
    borderWidth: 1,
    borderColor: colors.blue,
    borderRadius: moderateScale(20),
    paddingVertical: moderateScaleVertical(4),
    paddingHorizontal: moderateScale(10),
  },
  buttonText: {
    fontSize: textScale(16),
    color: colors.blue,
    fontWeight: 'bold',
  },
  companyName: {
    fontSize: textScale(16),
    color: colors.black,
    marginVertical: moderateScaleVertical(8),
  },
  metrics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: moderateScaleVertical(12),
    marginHorizontal: moderateScaleVertical(12),
  },
  metricsLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: moderateScaleVertical(12),
  },
  metricText: {
    fontSize: textScale(16),
  },
  greenText: {
    color: colors.green,
  },
  redText: {
    color: colors.red,
  },
  metricLabel: {
    fontSize: textScale(14),
    color: colors.gray,
  },
  meters: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: moderateScale(16),
  },
  gaugeContainer: {
    alignItems: 'center',
  },
  clock: {
    marginTop: moderateScale(16),
    textAlign: 'center',
    fontSize: textScale(16),
    color: colors.gray,
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

  // according styles here
  accordionStyles: {
    paddingVertical: moderateScale(10),
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: moderateScale(10),
    backgroundColor: colors.grayOpacity10,
    borderRadius: moderateScale(10),
  },
  headerText: {
    fontSize: textScale(16),
    fontWeight: '500',
  },
  body: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: moderateScale(5, 7),
    alignItems: 'center',
  },
  collapse: {
    borderWidth: 1,
    borderColor: colors.gray,
    borderRadius: moderateScale(15),
  },

  // table ui
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.grayOpacity20,
    paddingVertical: moderateScale(15),
    paddingHorizontal: moderateScale(25),
    borderWidth: 1,
    borderColor: colors.grayOpacity20,
  },
  tableHeaderText: {
    fontSize: textScale(14),
    fontWeight: 'bold',
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: moderateScale(15),
    paddingHorizontal: moderateScale(25),
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.grayOpacity20,
  },
  cell: {
    fontSize: textScale(14),
    fontWeight: 'bold',
    textAlign: 'center',
    color: colors.black,
  },
  infoButton: {
    width: moderateScale(25),
    height: moderateScale(25),
    borderRadius: moderateScale(25 / 2),
    backgroundColor: colors.black,
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoText: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: textScale(12),
  },

  // this is all styles to table
  tableContainer: {
    width: width / 1.05,
    backgroundColor: colors.white,
    borderRadius: moderateScale(10),
    marginVertical: moderateScale(10),
    alignSelf: 'center',
  },

  tableBorder: {
    borderWidth: 1,
    borderColor: colors.gray,
  },
  head: {
    height: moderateScale(40),
    backgroundColor: colors.white,
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
  greenButtonContainer: {
    backgroundColor: colors.lightGreen2,
    color: colors.white,
    textAlign: 'center',
    borderRadius: moderateScale(15),
    paddingVertical: moderateScale(6),
    paddingHorizontal: moderateScale(15),
    overflow: 'hidden',
    alignSelf: 'center',
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
  accordionButtonContainer: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: moderateScale(10),
  },
  accordionButtonContainerStyles: {
    width: width / 4,
    height: moderateScale(35),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: moderateScale(10),
    borderRadius: moderateScale(25),
  },
  accordionButtonContainerText: {
    textAlign: 'center',
    color: colors.white,
    fontSize: textScale(15),
  },
  // here tables styles
  headerRow: {
    flexDirection: 'row',
    backgroundColor: colors.grayOpacity10,
    padding: moderateScale(10),
    borderBottomWidth: 1,
    borderColor: colors.grayOpacity70,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerCell: {
    flex: 1,
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: textScale(13),
  },
  row: {
    flexDirection: 'row',
    padding: moderateScale(8),
    borderBottomWidth: 1,
    borderColor: colors.white,
  },
  cell: {
    flex: 1,
    textAlign: 'center',
    fontSize: textScale(14),
  },
  greenText: {color: colors.darkGreen},
  redText: {color: colors.red},
  grayText: {color: colors.gray},
  greenBackground: {
    backgroundColor: colors.darkGreen,
    color: colors.white,
    borderRadius: moderateScale(12),
    padding: moderateScale(5),
  },
  redBackground: {
    backgroundColor: colors.red,
    color: colors.white,
    borderRadius: moderateScale(12),
    padding: moderateScale(5),
  },
  yellowBackground: {
    backgroundColor: colors.yellow,
    color: colors.white,
    borderRadius: moderateScale(12),
    padding: moderateScale(5),
    marginLeft: moderateScale(3),
  },
  // search styles here
  searchContainer: {
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default styles;
