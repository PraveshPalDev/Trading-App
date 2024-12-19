import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import moment from 'moment';
import {moderateScale, textScale, width} from '../styles/responsiveSize';
import colors from '../styles/colors';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import CustomDropdown from './CustomDropdown';
import strings from '../constants/lang';
import TextComp from './TextComp';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function AgendaCalendar({
  calenderIconHandler = () => {},
  handleDropdownChange = () => {},
  rightMapIconHandler = () => {},
  dropDownData,
  showDateContainer = true,
  title = strings.Events,
  style,
  rightMapIcon = false,
  calendar = false,
  showingDateToAndForm = false,
  dropdownStyles,
  selectedDropdownData,
}) {
  const [selectedDate, setSelectedDate] = useState(
    moment().format('YYYY-MM-DD'),
  );
  const daysArray = Array.from({length: 5}, (_, i) =>
    moment(selectedDate).add(i, 'days').format('YYYY-MM-DD'),
  );

  return (
    <View style={{...styles.container, ...style}}>
      <TextComp style={styles.title}>{title}</TextComp>
      <View style={styles.header}>
        <View style={styles.header2}>
          <CustomDropdown
            data={dropDownData}
            placeholder={strings.Search}
            onChange={selectedValue => handleDropdownChange(selectedValue)}
            value={selectedDropdownData?.value || dropDownData[0]}
            dropdownStyle={{
              ...styles.dropdownStyle,
              ...dropdownStyles,
              backgroundColor:
                selectedDropdownData?.dropdownBgColor ||
                dropDownData[0]?.dropdownBgColor,
            }}
            arrowIconColor={colors.blue}
            itemTextStyle={{
              color: 'yellow',
              padding: moderateScale(8),
            }}
            selectedTextColor={
              selectedDropdownData?.textColor || dropDownData[0]?.textColor
            }
          />

          {calendar ? (
            <TouchableOpacity
              style={{...styles.iconStyles, paddingRight: moderateScale(10)}}
              activeOpacity={0.7}
              onPress={calenderIconHandler}>
              {calendar === 'calendar' ? (
                <FontAwesome
                  name={calendar}
                  size={moderateScale(28)}
                  color={colors.blue}
                />
              ) : (
                <Icon
                  name={calendar}
                  size={moderateScale(28)}
                  color={colors.blue}
                />
              )}
            </TouchableOpacity>
          ) : null}

          {rightMapIcon && (
            <TouchableOpacity
              style={{
                ...styles.iconStyles,
                paddingRight: moderateScale(5),
              }}
              activeOpacity={0.7}
              onPress={rightMapIconHandler}>
              <Icon
                name={rightMapIcon}
                size={moderateScale(28)}
                color={colors.black}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {showingDateToAndForm ? (
        <>
          {/* <Text style={styles.boldText}>{'Today'}</Text> */}
          <View style={styles.selectedDateContainer}>
            <View style={styles.selectedDateContainer}>
              <Text style={styles.boldText}>To: </Text>
              <Text style={{fontSize: textScale(15), color: colors.black}}>
                {showingDateToAndForm?.startDate}
              </Text>
            </View>

            <View style={styles.selectedDateContainer}>
              <Text style={styles.boldText}>From: </Text>
              <Text style={{fontSize: textScale(15), color: colors.black}}>
                {showingDateToAndForm?.endDate}
              </Text>
            </View>
          </View>
        </>
      ) : null}

      {showDateContainer ? (
        <>
          <View style={styles.calendarContainer}>
            {daysArray?.map((date, index) => {
              const isSelected = selectedDate === date;

              return (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.dayContainer,
                    isSelected && styles.selectedDay,
                  ]}
                  onPress={() => setSelectedDate(date)}>
                  <Text
                    style={[
                      styles.dayText,
                      isSelected && styles.selectedDayText,
                    ]}>
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
        </>
      ) : null}
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
    paddingLeft: moderateScale(10),
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
    // width: moderateScale(210),
    height: moderateScale(50),
    alignSelf: 'flex-end',
    borderRadius: moderateScale(15),
    backgroundColor: colors.grayOpacity10,
    borderWidth: 1,
    borderColor: colors.black,
    textAlign: 'left',
  },
  selectedDateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: moderateScale(5),
  },
  boldText: {
    fontWeight: 'bold',
    color: colors.black,
    textAlign: 'center',
    fontSize: textScale(18),
  },
});
