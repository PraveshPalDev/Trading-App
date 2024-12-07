import {Dimensions, StyleSheet} from 'react-native';
import {moderateScale, textScale} from '../../../../styles/responsiveSize';
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
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#000',
  },
  dropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 16,
  },
  dropdownText: {
    color: '#000',
    fontWeight: '600',
  },
  list: {
    paddingBottom: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 4,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  source: {
    fontSize: 14,
    color: '#777',
  },
  time: {
    fontSize: 14,
    color: '#777',
  },
});

export default styles;
