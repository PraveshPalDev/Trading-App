import {StyleSheet} from 'react-native';
import {
  moderateScale,
  textScale,
  width,
} from '../../../../styles/responsiveSize';
import colors from '../../../../styles/colors';

const styles = StyleSheet.create({
  container: {
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
});

export default styles;
