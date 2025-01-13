import React, {useEffect, useState, useCallback} from 'react';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import {Calendar} from 'react-native-big-calendar';
import {
  GetAllEventCategory,
  GetEventsBetweenDates,
} from '../../../redux/actions/news';
import {getCurrentFullWeekRange} from '../../../utils/Date';
import colors from '../../../styles/colors';
import {moderateScale, textScale, width} from '../../../styles/responsiveSize';
import moment from 'moment';
import CustomDropdown from '../../../components/CustomDropdown';
import strings from '../../../constants/lang';

const weekData = [
  {
    id: 1,
    label: 'Μήνας',
    value: 'month',
  },
  {
    id: 2,
    label: 'Εβδομάδα',
    value: 'week',
  },
  {
    id: 3,
    label: 'Ημέρα',
    value: 'day',
  },
];

export default function BigCalendar() {
  const [events, setEvents] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [eventCategoryIds, setEventCategoryIds] = useState([]);
  const [eventLoading, setEventLoading] = useState(false);
  const [currentWeekRange, setCurrentWeekRange] = useState(null);
  const [calenderType, setCalenderType] = useState('');
  const [dropdownData, setDropdownData] = useState([]);
  const [dropdownColor, setDropdownColor] = useState('');

  useEffect(() => {
    const {startDate, endDate} = getCurrentFullWeekRange();
    setStartDate(startDate);
    setEndDate(endDate);

    const today = new Date();
    const initialRange = calculateWeekRange(today);
    setCurrentWeekRange(initialRange);

    fetchAllEventCategory().catch(error =>
      console.error('Failed to fetch event categories:', error),
    );
  }, []);

  const calculateWeekRange = swapDate => {
    const startOfWeek = moment(swapDate).isoWeekday(6);
    const endOfWeek = moment(swapDate).isoWeekday(5 + 7);
    const formattedRange = `${startOfWeek.format('DD')}-${endOfWeek.format(
      'DD',
    )} ${endOfWeek.format('MMM YYYY')}`;

    return formattedRange;
  };

  useEffect(() => {
    if (eventCategoryIds.length > 0) {
      fetchAllEvents(eventCategoryIds, startDate, endDate);
    }
  }, [eventCategoryIds, startDate, endDate]);

  const fetchAllEvents = useCallback(
    async (eventCategoryIds, startDate, endDate) => {
      setEventLoading(true);
      try {
        const queryParams = {
          fromDate: startDate,
          toDate: endDate,
          eventCategories: eventCategoryIds,
        };
        const events = await GetEventsBetweenDates(queryParams);

        if (!events?.length) throw new Error('No events returned');

        const sortedEvents = events.sort(
          (a, b) => new Date(a.startDate) - new Date(b.startDate),
        );

        // Helper to format time as AM/PM
        const formatTime = date => {
          const [hours, minutes] = [date.getHours(), date.getMinutes()];
          const ampm = hours >= 12 ? 'PM' : 'AM';
          return `${hours % 12 || 12}:${minutes
            .toString()
            .padStart(2, '0')} ${ampm}`;
        };

        const updatedEvents = sortedEvents.map(event => {
          const start = new Date(event.startDate);
          const end = new Date(event.endDate);
          const categoryColor = dropdownData?.find(
            category => category?.id === event?.category,
          )?.dropdownBgColor;

          return {
            title: `${event.title} (${formatTime(start)} - ${formatTime(end)})`,
            start,
            end,
            bgColor: categoryColor,
            textColor: colors.black,
          };
        });

        setEvents(updatedEvents);
      } catch (error) {
        console.error('Error fetching events:', error);
      } finally {
        setEventLoading(false);
      }
    },
    [dropdownData],
  );

  const fetchAllEventCategory = useCallback(async () => {
    try {
      const response = await GetAllEventCategory();
      if (!response) return;

      const categoryColors = [
        colors.red,
        colors.blue,
        colors.lightGreen2,
        colors.yellow,
      ];
      const eventCategories = response.map((category, index) => ({
        label: category.eventCategoryName,
        value: category.eventCategoryName,
        color: category.color,
        id: category.eventCategoryId,
        dropdownBgColor: categoryColors[index % categoryColors.length],
        textColor: colors.white,
      }));

      // Add "All" option
      eventCategories.unshift({
        label: 'All',
        value: 'All',
        color: colors.white,
        id: response.map(x => x.eventCategoryId),
        dropdownBgColor: colors.grayOpacity70,
        textColor: colors.white,
      });

      setDropdownData(eventCategories);
      setEventCategoryIds(eventCategories.map(cat => cat.id));
    } catch (error) {
      console.error('Error fetching event categories:', error);
    }
  }, []);

  const handleDateChange = useCallback(
    swapDate => {
      // here set the date
      const startOfWeek = moment(swapDate).isoWeekday(6);
      const endOfWeek = moment(swapDate).isoWeekday(5 + 7);
      const formattedRange = `${startOfWeek.format('DD')}-${endOfWeek.format(
        'DD',
      )} ${endOfWeek.format('MMM YYYY')}`;
      setCurrentWeekRange(formattedRange);

      // here to set date start and end date
      const startDate = moment(swapDate);
      const endDate = moment(startDate).add(6, 'days');
      const formattedStartDate = startDate.format('MM-DD-YYYY');
      const formattedEndDate = endDate.format('MM-DD-YYYY');

      setStartDate(formattedStartDate);
      setEndDate(formattedEndDate);
      fetchAllEvents(eventCategoryIds, formattedStartDate, formattedEndDate);
    },
    [eventCategoryIds],
  );

  const handleChangeDropdownForWeek = item => {
    setStartDate(startDate);
    setEndDate(endDate);
    setCalenderType(item?.value);
  };

  const handleChangeDropdown = item => {
    setDropdownColor(item.dropdownBgColor);
    setEventCategoryIds([item.id]);
  };

  // here calendar cell style
  const eventCellStyle = event => ({
    backgroundColor: event?.bgColor || colors.blue,
    color: event.textColor || '#000000',
    borderRadius: moderateScale(8),
    padding: moderateScale(4),
  });

  const calendarCellStyle = {
    color: colors.red,
    fontSize: moderateScale(24),
  };

  return (
    <View style={{flex: 1}}>
      <View style={styles.eventContainer}>
        <Text style={{...styles.dateText, ...styles.eventText}}>
          {strings.Events}
        </Text>
        <CustomDropdown
          data={dropdownData}
          placeholder={strings.SearchText}
          onChange={handleChangeDropdown}
          value={dropdownData[0]}
          dropdownStyle={{
            ...styles.eventDropdownStyles,
            backgroundColor: dropdownColor || dropdownData[0]?.dropdownBgColor,
          }}
          selectedTextColor={colors.white}
          arrowIconColor={colors.white}
        />
      </View>

      <View style={styles.dateContainer}>
        <View style={styles.date}>
          <Text style={styles.dateText}>{currentWeekRange}</Text>
        </View>

        <CustomDropdown
          data={weekData}
          placeholder={strings.SearchText}
          onChange={handleChangeDropdownForWeek}
          value={weekData[1]}
          dropdownStyle={styles.dropdownStyles}
        />
      </View>

      {eventLoading && <ActivityIndicator size="large" color="#007AFF" />}

      <Calendar
        events={events}
        height={600}
        eventCellStyle={eventCellStyle}
        calendarCellStyle={calendarCellStyle}
        onSwipeEnd={handleDateChange}
        weekStartsOn={6}
        showTime={false}
        mode={calenderType || 'week'}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.grayOpacity30,
    marginBottom: moderateScale(10),
  },
  date: {
    marginHorizontal: moderateScale(5),
    borderRadius: moderateScale(8),
    padding: moderateScale(12),
  },
  dateText: {
    fontSize: textScale(16),
    color: colors.black,
    textAlign: 'center',
    fontWeight: '700',
  },
  dropdownStyles: {
    width: moderateScale(160),
    alignSelf: 'flex-end',
    height: moderateScale(40),
    borderRadius: moderateScale(12),
  },
  eventContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: moderateScale(10),
  },
  eventText: {
    fontSize: textScale(18),
    fontWeight: '700',
  },
  eventDropdownStyles: {
    borderRadius: moderateScale(16),
    alignSelf: 'flex-end',
    width: width / 1.4,
    height: moderateScale(50),
  },
});
