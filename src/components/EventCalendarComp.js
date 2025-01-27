import {ActivityIndicator, StyleSheet, View, ScrollView} from 'react-native';
import React from 'react';
import AgendaCalendar from './AgendaCalendar';
import {moderateScale, textScale} from '../styles/responsiveSize';
import colors from '../styles/colors';
import FlashListComp from './FlashListComp';

export default function EventCalendarComp({
  data,
  startDate,
  endDate,
  eventLoading,
  selectedDropdownData,
  handleDropdownChange,
  calenderHandler,
  renderTableData,
  renderHeader,
  title,
  rightMapIcon,
  rightMapIconHandler,
  selectedOptionItem,
  maxHeight = true,
}) {
  return (
    <View style={{...styles.container, marginTop: moderateScale(10)}}>
      <AgendaCalendar
        title={title}
        dropDownData={data}
        selectedDropdownData={selectedOptionItem}
        handleDropdownChange={handleDropdownChange}
        calenderIconHandler={calenderHandler}
        calendar={'calendar'}
        rightMapIcon={rightMapIcon}
        rightMapIconHandler={rightMapIconHandler}
        showDateContainer={false}
        showingDateToAndForm={{
          startDate: startDate,
          endDate: endDate,
          day: '',
        }}
        itemTextStyle={item => ({
          color: item.color || colors.black,
          padding: moderateScale(8),
          backgroundColor: item.backgroundColor || colors.white,
        })}
      />

      <View style={styles.flashListContainer}>
        {renderHeader()}
        {eventLoading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator
              size="large"
              color="#005aef"
              style={{flex: 1, justifyContent: 'center', alignSelf: 'center'}}
            />
          </View>
        ) : (
          <View style={{marginBottom: moderateScale(20)}}>
            <ScrollView
              style={{
                ...styles.scrollContainer,
                ...(maxHeight ? {maxHeight: moderateScale(300)} : {}),
              }}
              nestedScrollEnabled={true}>
              <FlashListComp
                DATA={selectedDropdownData}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderTableData}
              />
            </ScrollView>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: moderateScale(12),
  },
  flashListContainer: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContainer: {
    borderRadius: moderateScale(20),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: colors.grayOpacity10,
    height: moderateScale(50),
    borderTopLeftRadius: moderateScale(10),
    borderTopRightRadius: moderateScale(10),
    borderWidth: 1,
    borderColor: colors.grayOpacity20,
    paddingHorizontal: moderateScale(10),
  },
  headerText: {
    flex: 1,
    fontWeight: 'bold',
    textAlign: 'center',
    color: colors.black,
    fontSize: textScale(14),
  },
});
