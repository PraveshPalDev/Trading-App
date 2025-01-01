import React, {useEffect, useState, useCallback} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Calendar} from 'react-native-big-calendar';
import {
  GetAllEventCategory,
  GetEventsBetweenDates,
} from '../../../redux/actions/news';
import {getCurrentWeekRange} from '../../../utils/Date';

export default function BigCalendar() {
  const today = new Date();
  const [events, setEvents] = useState([]);
  const [startDate, setStartDate] = useState('12-31-2024');
  const [endDate, setEndDate] = useState('01-15-2025');
  const [eventCategoryIds, setEventCategoryIds] = useState([]);
  const [eventLoading, setEventLoading] = useState(false);

  useEffect(() => {
    const {startDate, endDate} = getCurrentWeekRange();
    // setStartDate(startDate);
    // setEndDate(endDate);

    fetchAllEventCategory().catch(error =>
      console.error('Failed to fetch event categories:', error),
    );
  }, []);

  useEffect(() => {
    if (eventCategoryIds?.length > 0) {
      fetchAllEvents(eventCategoryIds);
    }
  }, [eventCategoryIds, startDate, endDate]);

  const fetchAllEvents = useCallback(
    async eventCategoryIds => {
      const queryParams = {
        fromDate: startDate,
        toDate: endDate,
        eventCategories: eventCategoryIds,
      };

      try {
        setEventLoading(true);
        const events = await GetEventsBetweenDates(queryParams);
        if (!events) {
          throw new Error('No events returned');
        }
        const sortedData = events?.sort(
          (a, b) => new Date(a?.startDate) - new Date(b?.startDate),
        );

        const eventTempDate = sortedData.map(event => {
          const start = new Date(event.startDate);
          const end = new Date(event.endDate);

          return {
            title: event.title,
            start: new Date(
              start.getFullYear(),
              start.getMonth(),
              start.getDate(),
              start.getHours(),
              start.getMinutes(),
            ),
            end: new Date(
              end.getFullYear(),
              end.getMonth(),
              end.getDate(),
              end.getHours(),
              end.getMinutes(),
            ),
            bgColor: event.color,
            textColor: 'red',
          };
        });

        setEvents(eventTempDate);
      } catch (error) {
        console.error('Failed to fetch events:', error);
      } finally {
        setEventLoading(false);
      }
    },
    [startDate, endDate],
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

  const renderCustomEvent = ({title, bgColor, textColor}) => (
    <View style={[styles.eventContainer, {backgroundColor: bgColor}]}>
      <Text style={[styles.eventText, {color: textColor}]}>{title}</Text>
    </View>
  );

  return (
    <Calendar
      events={events}
      height={600}
      date={today}
      renderEvent={renderCustomEvent}
      eventTextStyle={{fontSize: 14, fontWeight: 'bold'}}
    />
  );
}

const styles = StyleSheet.create({
  eventContainer: {
    padding: 5,
    borderRadius: 5,
    marginBottom: 5,
  },
  eventText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});
