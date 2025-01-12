import React, {useEffect, useState, useCallback} from 'react';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import {Calendar} from 'react-native-big-calendar';
import {
  GetAllEventCategory,
  GetEventsBetweenDates,
} from '../../../redux/actions/news';
import {getCurrentFullWeekRange} from '../../../utils/Date';
import colors from '../../../styles/colors';
import {moderateScale, textScale} from '../../../styles/responsiveSize';
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
      const queryParams = {
        fromDate: startDate,
        toDate: endDate,
        eventCategories: eventCategoryIds,
      };

      try {
        setEventLoading(true);
        const events = await GetEventsBetweenDates(queryParams);

        // Validate and sort events
        if (!events || events.length === 0) {
          throw new Error('No events returned');
        }
        const sortedData = events.sort(
          (a, b) => new Date(a.startDate) - new Date(b.startDate),
        );

        // Helper function to format Date object to AM/PM time
        const formatTimeAMPM = date => {
          const hours = date.getHours();
          const minutes = date.getMinutes();
          const ampm = hours >= 12 ? 'PM' : 'AM';
          const formattedHours = hours % 12 || 12;
          const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
          return `${formattedHours}:${formattedMinutes} ${ampm}`;
        };

        // Map and update event data
        const updatedEventTempDate = sortedData.map(event => {
          const start = new Date(event.startDate);
          const end = new Date(event.endDate);

          return {
            title: `${event.title} (${formatTimeAMPM(start)} - ${formatTimeAMPM(
              end,
            )})`,
            start: start,
            end: end,
            bgColor: event.color,
            textColor: colors.black,
          };
        });

        setEvents(updatedEventTempDate);
      } catch (error) {
        console.log('Failed to fetch events:', error);
      } finally {
        setEventLoading(false);
      }
    },
    [],
  );

  const fetchAllEventCategory = async () => {
    try {
      const response = await GetAllEventCategory();
      const categoryIds = response?.map(x => x?.eventCategoryId) || [];
      setEventCategoryIds(categoryIds);
    } catch (error) {
      console.error('Error fetching event categories:', error);
    }
  };

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

  const handleChangeDropdown = item => {
    setCalenderType(item.value);
  };

  return (
    <View style={{flex: 1}}>
      <View style={styles.dateContainer}>
        <View style={styles.date}>
          <Text style={styles.dateText}>{currentWeekRange}</Text>
        </View>

        <CustomDropdown
          data={weekData}
          placeholder={strings.SearchText}
          onChange={handleChangeDropdown}
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
});
