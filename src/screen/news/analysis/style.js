import {StyleSheet} from 'react-native';
import {moderateScale, textScale, width} from '../../../styles/responsiveSize';
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
  button: {
    borderWidth: 1,
    borderColor: colors.blue,
    width: moderateScale(90),
    height: moderateScale(30),
    justifyContent: 'center',
    borderRadius: moderateScale(20),
  },
  buttonText: {
    fontSize: textScale(14),
    fontWeight: '400',
    textAlign: 'center',
  },
  collapse: {
    borderWidth: 1,
    borderColor: colors.gray,
    borderRadius: moderateScale(15),
  },
});

export default styles;
