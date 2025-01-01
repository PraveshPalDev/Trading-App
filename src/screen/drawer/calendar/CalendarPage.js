import {StyleSheet, Text, View} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Agenda} from 'react-native-calendars';

// Utility to generate a range of dates
const generateDateRange = (startDate, endDate) => {
  const dates = {};
  const start = new Date(startDate);
  const end = new Date(endDate);

  while (start <= end) {
    const dateString = start.toISOString().split('T')[0]; // Format: YYYY-MM-DD
    dates[dateString] = []; // Default to empty array
    start.setDate(start.getDate() + 1);
  }
  return dates;
};

export default function CalendarPage() {
  const [events, setEvents] = useState({});

  useEffect(() => {
    // Generate a range of dates (e.g., the entire month of December 2024)
    const allDates = generateDateRange('2024-12-01', '2024-12-31');

    // Add your events to the prepopulated dates
    const eventData = {
      '2024-12-29': [
        {name: 'Αποτελέσματα Τρίμηνου (Q3-24)', color: 'red'},
        {name: 'Αποτελέσματα Τρίμηνου (Q3-24)', color: 'red'},
      ],
      '2024-12-27': [{name: 'Στατιστικά Ασφαλιστικών', color: 'green'}],
      '2024-12-28': [{name: 'Τραπεζική Χρηματοδότηση', color: 'green'}],
      '2024-12-04': [{name: 'Γενική Συνέλευση', color: 'yellow'}],
    };

    // Merge events into prepopulated dates
    const mergedDates = {...allDates, ...eventData};
    setEvents(mergedDates); // Update the state
  }, []);

  // Render individual events
  const renderEvent = event => (
    <View style={[styles.eventContainer, {backgroundColor: event.color}]}>
      <Text style={styles.eventText}>{event.name}</Text>
    </View>
  );

  // Render placeholder for empty days
  const renderEmptyDate = () => (
    <View style={styles.emptyDateContainer}>
      <Text style={styles.emptyDateText}>No events for this day</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Agenda
        items={events}
        renderItem={item => renderEvent(item)}
        renderEmptyDate={renderEmptyDate}
        theme={{
          agendaKnobColor: 'gray',
          todayTextColor: 'blue',
          dotColor: 'red',
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  eventContainer: {
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
  },
  eventText: {
    color: 'white',
    fontSize: 14,
  },
  emptyDateContainer: {
    padding: 10,
    backgroundColor: '#f2f2f2',
    borderRadius: 5,
    marginVertical: 5,
  },
  emptyDateText: {
    fontSize: 14,
    color: '#aaa',
    textAlign: 'center',
  },
});
