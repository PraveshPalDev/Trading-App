import {StyleSheet} from 'react-native';
import {
  height,
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
  // this is companyDescription
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

  // this card to sell container
  pieChart: {
    height: moderateScale(200),
    width: width / 1.2,
  },
  card2: {
    width: width / 1.1,
    backgroundColor: colors.white,
    borderRadius: moderateScale(10),
    padding: moderateScale(20),
  },
  title: {
    fontSize: textScale(18),
    fontWeight: 'bold',
    color: colors.black,
    marginBottom: moderateScale(10),
  },
  subtitle: {
    fontSize: textScale(13),
    color: colors.gray,
    marginBottom: moderateScale(12),
    fontWeight: '500',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  button: {
    borderRadius: moderateScale(25),
    paddingVertical: moderateScale(10),
    paddingHorizontal: moderateScale(20),
  },
  buy: {
    backgroundColor: colors.lightGreen2,
  },
  hold: {
    backgroundColor: colors.yellow,
  },
  sell: {
    backgroundColor: colors.red,
  },
  buttonText: {
    color: colors.white,
    fontWeight: 'bold',
  },
  chartContainer: {
    alignItems: 'center',
  },
  legendContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: moderateScale(20),
    width: '90%',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendColor: {
    width: moderateScale(20),
    height: moderateScale(20),
    marginRight: moderateScale(5),
  },
  legendText: {
    fontSize: textScale(16),
    fontWeight: '500',
  },
  selectedTextContainer: {
    marginTop: moderateScale(20),
    alignItems: 'center',
  },
  selectedText: {
    fontSize: textScale(16),
    fontWeight: 'bold',
    color: colors.gray,
  },
  deleteBtnContainer: {
    width: moderateScale(80),
    height: moderateScale(40),
    backgroundColor: colors.lightGreen2,
    flexDirection: 'row',
    justifyContent: 'center',
    borderRadius: moderateScale(50),
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.black,
  },
  deleteMainContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: moderateScale(12),
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
});

export default styles;
