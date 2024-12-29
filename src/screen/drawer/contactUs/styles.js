import {StyleSheet} from 'react-native';
import {moderateScale, textScale} from '../../../styles/responsiveSize';
import colors from '../../../styles/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: moderateScale(12),
  },
  formContainer: {
    backgroundColor: colors.white,
    borderRadius: moderateScale(12),
    padding: moderateScale(20),
    marginVertical: moderateScale(11),
    shadowColor: colors.black,
    shadowOpacity: 0.3,
    shadowRadius: moderateScale(8),
    shadowOffset: {width: 0, height: moderateScale(4)},
    elevation: moderateScale(5),
  },
  heading: {
    fontSize: textScale(20),
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: moderateScale(20),
    color: colors.black,
  },
  label: {
    color: colors.black,
    fontSize: textScale(16),
    fontWeight: 'bold',
  },
  buttonStyles: {
    borderWidth: 1,
    borderColor: colors.blue,
    justifyContent: 'center',
  },
  btnText: {
    textAlign: 'center',
    color: colors.white,
    fontSize: textScale(18),
    fontWeight: 'bold',
  },
});

export default styles;
