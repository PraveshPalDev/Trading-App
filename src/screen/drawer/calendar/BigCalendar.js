import React, {useEffect, useState, useCallback} from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {Calendar} from 'react-native-big-calendar';
import {
  GetAllEventCategory,
  GetEventsBetweenDates,
} from '../../../redux/actions/news';
import {getCurrentFullWeekRange} from '../../../utils/Date';
import colors from '../../../styles/colors';
import {moderateScale} from '../../../styles/responsiveSize';
import moment from 'moment';

export default function BigCalendar() {
  const [events, setEvents] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [eventCategoryIds, setEventCategoryIds] = useState([]);
  const [eventLoading, setEventLoading] = useState(false);

  useEffect(() => {
    const {startDate, endDate} = getCurrentFullWeekRange();
    setStartDate(startDate);
    setEndDate(endDate);

    fetchAllEventCategory().catch(error =>
      console.error('Failed to fetch event categories:', error),
    );
  }, []);

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

        const updatedEventTempDate = sortedData.map(event => {
          const start = new Date(event.startDate);
          const end = new Date(event.endDate);

          return {
            title: `${event.title}`,
            start: start,
            end: end,
            bgColor: event.color,
            textColor: colors.black,
          };
        });

        setEvents(updatedEventTempDate);
      } catch (error) {
        console.error('Failed to fetch events:', error);
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

  const handleDateChange = useCallback(
    swapDate => {
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

  return (
    <View style={{flex: 1}}>
      {eventLoading && <ActivityIndicator size="large" color="#007AFF" />}

      <Calendar
        events={events}
        height={600}
        eventCellStyle={eventCellStyle}
        onSwipeEnd={handleDateChange}
        weekStartsOn={6}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
