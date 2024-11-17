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
    width: width / 1,
    alignSelf: 'center',
    marginHorizontal: moderateScale(20),
  },
  dropdownStyle: {
    borderWidth: 1,
    borderColor: colors.gray,
    height: moderateScale(60),
    backgroundColor: colors.white,
    borderRadius: moderateScale(12),
  },
  accordionStyles: {
    paddingVertical: moderateScale(10),
    paddingHorizontal: moderateScale(16),
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: moderateScale(10),
    backgroundColor: colors.grayOpacity20,
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
    marginVertical: moderateScaleVertical(20),
    marginBottom: moderateScale(50),
  },
  accordionButtonContainer: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: moderateScale(10),
  },
  accordionButtonContainerStyles: {
    width: width / 3.5,
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
    fontWeight: '500',
    textAlign: 'center',
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
});

export default styles;
