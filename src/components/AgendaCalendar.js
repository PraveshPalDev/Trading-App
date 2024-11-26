import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import moment from 'moment';
import {moderateScale, textScale} from '../styles/responsiveSize';
import colors from '../styles/colors';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import CustomDropdown from './CustomDropdown';
import strings from '../constants/lang';
import TextComp from './TextComp';

export default function AgendaCalendar({
  calenderIconHandler = () => {},
  handleDropdownChange = () => {},
  dropDownData,
}) {
  const [selectedDate, setSelectedDate] = useState(
    moment().format('YYYY-MM-DD'),
  );
  const daysArray = Array.from({length: 5}, (_, i) =>
    moment(selectedDate).add(i, 'days').format('YYYY-MM-DD'),
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.header2}>
          <TextComp style={styles.title}>{strings.Events}</TextComp>
          <CustomDropdown
            data={dropDownData}
            placeholder={strings.SearchText}
            onChange={selectedValue => handleDropdownChange(selectedValue)}
            value={dropDownData[0]}
            dropdownStyle={styles.dropdownStyle}
            arrowIconColor={colors.blue}
          />

          <TouchableOpacity
            style={styles.iconStyles}
            activeOpacity={0.7}
            onPress={calenderIconHandler}>
            <FontAwesome
              name="calendar"
              size={moderateScale(28)}
              color={colors.blue}
            />
          </TouchableOpacity>
        </View>
      </View>

      <Text style={styles.selectedDate}>
        {moment(selectedDate).format('dddd, DD MMMM YYYY')}
      </Text>

      {/* Calendar */}
      <View style={styles.calendarContainer}>
        {daysArray?.map((date, index) => {
          const isSelected = selectedDate === date;

          return (
            <TouchableOpacity
              key={index}
              style={[styles.dayContainer, isSelected && styles.selectedDay]}
              onPress={() => setSelectedDate(date)}>
              <Text
                style={[styles.dayText, isSelected && styles.selectedDayText]}>
                {moment(date).format('ddd')}
              </Text>
              <Text
                style={[
                  styles.dateText,
                  isSelected && styles.selectedDateText,
                ]}>
                {moment(date).format('DD')}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: moderateScale(5),
    backgroundColor: colors.grayOpacity10,
    borderRadius: moderateScale(15),
    marginBottom: moderateScale(10),
    padding: moderateScale(8),
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: moderateScale(5),
  },
  header2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: textScale(18),
    fontWeight: 'bold',
    color: colors.black,
  },
  selectedDate: {
    fontSize: textScale(16),
    color: colors.black,
    paddingHorizontal: moderateScale(8),
    paddingBottom: moderateScale(12),
  },
  calendarContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: moderateScale(12),
    borderRadius: moderateScale(20),
    backgroundColor: colors.whiteOpacity60,
  },
  dayContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: moderateScale(60),
    height: moderateScale(60),
    borderRadius: moderateScale(15),
    backgroundColor: colors.white,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    marginHorizontal: moderateScale(5),
  },
  selectedDay: {
    backgroundColor: colors.blue,
  },
  dayText: {
    fontSize: textScale(15),
    color: colors.black,
  },
  dateText: {
    fontSize: textScale(18),
    fontWeight: 'bold',
    color: colors.black,
  },
  selectedDayText: {
    color: colors.white,
  },
  selectedDateText: {
    color: colors.white,
  },
  iconStyles: {
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
  },
  dropdownStyle: {
    width: moderateScale(210),
    height: moderateScale(42),
    alignSelf: 'flex-end',
    borderRadius: moderateScale(15),
    backgroundColor: colors.grayOpacity10,
    borderWidth: 1,
    borderColor: colors.blue,
    textAlign: 'left',
  },
});
