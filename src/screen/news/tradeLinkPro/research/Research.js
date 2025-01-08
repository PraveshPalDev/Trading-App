import {
  ActivityIndicator,
  FlatList,
  Linking,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import WrapperContainer from '../../../../components/WrapperContainer';
import styles from './styles';
import Icon from 'react-native-vector-icons/MaterialIcons';
import HeaderComp from '../../../../components/HeaderComp';
import strings from '../../../../constants/lang';
import {moderateScale} from '../../../../styles/responsiveSize';
import TextComp from '../../../../components/TextComp';
import CustomNewsTabs from '../../../../components/CustomNewsTabs';
import EventCalendarComp from '../../../../components/EventCalendarComp';
import {
  GetAllEventCategory,
  GetAnalysisImageMappings,
  GetEventsBetweenDates,
  GetTickerBasicInfo,
} from '../../../../redux/actions/news';
import colors from '../../../../styles/colors';
import {
  getCurrentMonthRange,
  getCurrentWeekRange,
  getNextWeekRange,
  getThisWeekRange,
} from '../../../../utils/Date';
import moment from 'moment';
import ModalComp from '../../../../components/ModalComp';
import {modalAllButton} from '../../../../constants/static/staticData';
import DateTimePicker from '@react-native-community/datetimepicker';
import NewsCard from '../../../../components/NewsCard';
import CustomDropdown from '../../../../components/CustomDropdown';
const data = [
  {city: 'San Francisco', offset: -8},
  {city: 'New York', offset: -5},
  {city: 'London', offset: 0},
  {city: 'Athens', offset: 2},
  {city: 'Delhi', offset: 5.5},
  {city: 'Tokyo', offset: 9},
  {city: 'Sydney', offset: 11},
];
export default function Research() {
  const [isLocked, setIsLocked] = useState(false);
  const [eventCategories, setEventCategories] = useState([]);
  const [eventCategoryIds, setEventCategoryIds] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [handleApplyStartDate, setHandleApplyStartDate] = useState('');
  const [handleApplyEndDate, setHandleApplyEndDate] = useState('');
  const [loading, setLoading] = useState(false);
  const [eventLoading, setEventLoading] = useState(false);
  const [selectedDropdownData, setSelectedDropdownData] = useState([]);
  const [tickerData, setTickerData] = useState([]);
  const [dropdownData, setDropdownData] = useState([]);
  const [eventTableData, setEventTableData] = useState([]);
  const [trendingLoading, setTrendingLoading] = useState(false);
  const [allImage, setAllImage] = useState([]);
  const [timeData, setTimeData] = useState(data);
  const [selectedOption, setSelectedOption] = useState(null);

  useEffect(() => {
    updateTime();
    const interval = setInterval(updateTime, 30000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const {startDate, endDate} = getCurrentWeekRange();
    setStartDate(startDate);
    setEndDate(endDate);
    setHandleApplyStartDate(startDate);
    setHandleApplyEndDate(endDate);

    fetchAllEventCategory();
    fetchStockFilterData();
    fetchAnalysisImageMappings();
  }, []);

  useEffect(() => {
    if (eventCategoryIds?.length > 0) {
      fetchAllEvents(eventCategoryIds);
    }
  }, [eventCategoryIds, startDate, endDate]);

  const updateTime = () => {
    const now = new Date();
    const updatedData = data.map(item => {
      const localTime = new Date(now.getTime() + item.offset * 60 * 60 * 1000);
      const hours = localTime.getUTCHours();
      const minutes = localTime.getUTCMinutes();
      return {
        ...item,
        time: `${String(hours).padStart(2, '0')}:${String(minutes).padStart(
          2,
          '0',
        )}`,
      };
    });
    setTimeData(updatedData);
  };

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

        const sortedData = events?.sort(
          (a, b) => new Date(a.startDate) - new Date(b.startDate),
        );

        setEventTableData(sortedData);
        setSelectedDropdownData(sortedData);

        setEventLoading(false);
        setHandleApplyStartDate(null);
        setHandleApplyEndDate(null);
      } catch (error) {
        console.error('Failed to fetch events:', error);
        setEventLoading(false);
      }
    },
    [startDate, endDate, tickerData?.ticker],
  );
  const fetchStockFilterData = async () => {
    try {
      const response = await GetTickerBasicInfo();
      const sortedData = response?.sort(
        (a, b) => new Date(b?.pubDate) - new Date(a?.pubDate),
      );

      const temp = [];
      sortedData?.forEach(x => {
        temp.push({
          label: `${x?.ticker} - ${x?.eN_Name}`,
          value: `${x?.ticker} ${x?.eN_Name}`,
          ticker: x?.ticker,
        });
      });

      if (response?.length) {
        setTickerData(temp[0]);
        setDropdownData(temp);
      }
    } catch (error) {
      console.error('Error fetching getTickerBasic information :', error);
    }
  };

  const fetchAnalysisImageMappings = async () => {
    try {
      setTrendingLoading(true);
      const res = await GetAnalysisImageMappings();
      if (res) {
        setAllImage(res);
      }
    } catch (error) {
      console.log('error =>', error);
    } finally {
      setTrendingLoading(false);
    }
  };

  const fetchAllEventCategory = async () => {
    try {
      setLoading(true);
      const response = await GetAllEventCategory();
      const temp = [];
      const categoryIds = [];
      const color = [
        colors.red,
        colors.blue,
        colors.lightGreen2,
        colors.yellow,
      ];

      response?.forEach((x, index) => {
        temp.push({
          label: x.eventCategoryName,
          value: x.eventCategoryName,
          color: x.color,
          id: x?.eventCategoryId,
          dropdownBgColor: color[index % color.length],
          textColor: colors.white,
        });

        categoryIds.push(x?.eventCategoryId);
      });

      if (response) {
        setEventCategories(temp);
        setEventCategoryIds(categoryIds);
      }
    } catch (error) {
      console.log('Error fetching stocks:', error);
      showError(error);
    } finally {
      setLoading(false);
    }
  };

  const RenderTimeZoneCard = ({isLocked, setIsLocked}) => {
    return (
      <TouchableOpacity
        style={[
          styles.container,
          isLocked ? styles.lockedCard : styles.unlockedCard,
          isLocked ? {backgroundColor: 'rgba(255, 255, 255, 0.7)'} : null,
          {padding: 0},
        ]}
        onPress={() => setIsLocked(!isLocked)}
        activeOpacity={0.9}
        disabled={!isLocked}>
        {isLocked ? (
          <View style={styles.lockedContent}>
            <Icon
              name="lock"
              size={moderateScale(40)}
              color="#555"
              style={styles.lockIcon}
            />
            <TextComp style={styles.lockedText}>{strings.TabLock}</TextComp>
          </View>
        ) : (
          <>
            <FlatList
              data={timeData}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.listContainer}
              renderItem={({item}) => (
                <View style={styles.card}>
                  <Text style={styles.cityText}>{item.city}</Text>
                  <Text style={styles.timeText}>{item.time}</Text>
                </View>
              )}
              keyExtractor={(item, index) => index.toString()}
            />
          </>
        )}
      </TouchableOpacity>
    );
  };

  const handleDropdownChange = selectedData => {
    const filterData = eventTableData?.filter(
      item => item.category === selectedData?.id,
    );

    setSelectedDropdownData(JSON.parse(JSON.stringify(filterData)));
  };

  const calenderHandler = () => {
    setIsVisible(true);
  };

  const rightMapIconHandler = () => {
    alert('map');
  };

  const renderTableData = ({item, index}) => {
    const isLastItem = index === eventTableData?.length - 1;
    return (
      <View style={[styles.row, isLastItem && styles.lastRow]}>
        <TextComp style={styles.cell}>
          {moment(item?.startDate).format('YYYY-MM-DD')}
        </TextComp>
        <TextComp style={styles.cell}>{item?.symbol}</TextComp>
        <TextComp style={styles.cell}>
          {item.description.length > 50
            ? `${item?.description?.substring(0, 50)}...`
            : item.description}
        </TextComp>

        <View style={{...styles.cell, ...styles.colorIndicator}}>
          <View
            style={{
              ...styles.colorIndicator,
              backgroundColor: getColorByCategory(item?.category),
            }}
          />
        </View>
      </View>
    );
  };
  const getColorByCategory = categoryId => {
    const filterColor = eventCategories.find(
      x => x.id === categoryId,
    )?.dropdownBgColor;

    return filterColor;
  };

  const renderHeader = () => (
    <View style={styles.header}>
      <TextComp style={styles.headerText}>{strings.Date}</TextComp>
      <TextComp style={styles.headerText}>{strings.Symbol}</TextComp>
      <TextComp style={styles.headerText}>{strings.Description}</TextComp>
      <TextComp style={styles.headerText}>{strings.Category}</TextComp>
    </View>
  );

  const handleApply = () => {
    const formattedStartDate =
      moment(handleApplyStartDate).format('MM-DD-YYYY');
    const formattedEndDate = moment(handleApplyEndDate).format('MM-DD-YYYY');

    setStartDate(formattedStartDate);
    setEndDate(formattedEndDate);
    setIsVisible(false);
  };

  const handleButtonPress = type => {
    switch (type) {
      case strings.Today:
        const currentDate = moment().format('MM-DD-YYYY');
        setStartDate(currentDate);
        setEndDate(currentDate);
        setIsVisible(false);
        break;
      case strings.ThisWeek:
        const {startDate, endDate} = getThisWeekRange();
        setStartDate(startDate);
        setEndDate(endDate);
        setIsVisible(false);
        break;
      case strings.NextWeek:
        const {startDate: nextWeekStart, endDate: nextWeekEnd} =
          getNextWeekRange();
        setStartDate(nextWeekStart);
        setEndDate(nextWeekEnd);
        setIsVisible(false);
        break;
      case strings.CurrentMonth:
        const {startDate: monthStart, endDate: monthEnd} =
          getCurrentMonthRange();
        setStartDate(monthStart);
        setEndDate(monthEnd);
        setIsVisible(false);
        break;
      default:
        console.log('Unknown type');
    }
  };

  const PurchaseCalendar = ({isLocked, setIsLocked}) => {
    const filterData = selectedDropdownData?.filter(
      x => x.symbol === tickerData?.ticker,
    );

    return (
      <TouchableOpacity
        style={[
          styles.container,
          isLocked ? styles.lockedCard : styles.unlockedCard,
          isLocked ? {backgroundColor: 'rgba(255, 255, 255, 0.7)'} : null,
          {padding: 0},
        ]}
        onPress={() => setIsLocked(!isLocked)}
        activeOpacity={0.9}>
        {isLocked ? (
          <View style={styles.lockedContent}>
            <Icon
              name="lock"
              size={moderateScale(40)}
              color="#555"
              style={styles.lockIcon}
            />
            <TextComp style={styles.lockedText}>{strings.TabLock}</TextComp>
          </View>
        ) : (
          <EventCalendarComp
            title={strings.PurchaseCalendar}
            data={eventCategories}
            startDate={startDate}
            endDate={endDate}
            selectedDropdownData={selectedDropdownData}
            eventLoading={eventLoading}
            handleDropdownChange={handleDropdownChange}
            calenderHandler={calenderHandler}
            renderTableData={renderTableData}
            renderHeader={renderHeader}
            rightMapIcon={'zoom-out-map'}
            rightMapIconHandler={rightMapIconHandler}
          />
        )}
      </TouchableOpacity>
    );
  };

  const newsCardHandler = item => {
    Linking.openURL(item?.link).catch(err =>
      console.log('An error occurred', err),
    );
  };

  const handleDropdownChangeTicker = item => {
    setSelectedOption(item.value);
    setTickerData(item);
  };

  return (
    <WrapperContainer>
      <HeaderComp
        backBtn={true}
        title={strings.Research}
        rightBellIconVisible={false}
        rightSettingIconVisible={false}
        titleStyle={styles.headerStyles}
      />

      <ScrollView
        style={{marginBottom: moderateScale(25)}}
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled={true}>
        {/* added the ticker dropdown */}
        <CustomDropdown
          data={dropdownData}
          placeholder={strings.SearchText}
          onChange={handleDropdownChangeTicker}
          enableSearch={true}
          value={selectedOption}
        />

        <RenderTimeZoneCard isLocked={isLocked} setIsLocked={setIsLocked} />

        {trendingLoading ? (
          <ActivityIndicator size="large" color={colors.blue} />
        ) : (
          <NewsCard
            base64={true}
            newsItems={allImage}
            onPressHandler={newsCardHandler}
          />
        )}

        {loading ? (
          <ActivityIndicator size={'large'} color={colors.blue} />
        ) : (
          <>
            <PurchaseCalendar
              isLocked={isLocked}
              setIsLocked={setIsLocked}
              tickerName={tickerData?.ticker}
              eventCategories={eventCategories}
              eventLoading={eventLoading}
            />

            <View style={{marginHorizontal: moderateScale(12)}}>
              <CustomNewsTabs
                showSearchBar={true}
                tickerData={tickerData}
                defaultData={false}
              />
            </View>
          </>
        )}
      </ScrollView>

      <ModalComp
        isVisible={isVisible}
        onBackdropPress={() => setIsVisible(false)}>
        <View style={styles.overlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.title}>{strings.SelectCalendarPeriod}</Text>
            <View style={styles.cardBorderContainer}>
              {modalAllButton?.map(item => {
                return (
                  <View key={item?.id}>
                    <TouchableOpacity
                      activeOpacity={0.7}
                      style={styles.optionButton}
                      onPress={() => handleButtonPress(item?.type)}>
                      <Text style={styles.buttonText}>{item?.name}</Text>
                    </TouchableOpacity>
                  </View>
                );
              })}

              <Text style={styles.sectionTitle}>{strings.CustomPeriod}</Text>

              <View style={styles.dateInputsContainer}>
                <View style={styles.dateInputWrapper}>
                  <Text style={styles.dateLabelStyles}>{strings.Start}</Text>
                  <TouchableOpacity
                    onPress={() => setShowStartPicker(true)}
                    style={styles.dateInput}
                    activeOpacity={0.7}>
                    <TextComp style={styles.dateLabelStyles}>
                      {handleApplyStartDate
                        ? moment(handleApplyStartDate, 'MM-DD-YYYY').format(
                            'MM/DD/YYYY',
                          )
                        : 'mm/dd/yyyy'}
                    </TextComp>
                    <Icon
                      name={'calendar-month'}
                      size={moderateScale(25)}
                      color={colors.blue}
                    />
                  </TouchableOpacity>
                  {showStartPicker && (
                    <DateTimePicker
                      value={
                        handleApplyStartDate instanceof Date
                          ? handleApplyStartDate
                          : new Date()
                      }
                      mode="date"
                      display="default"
                      onChange={(event, selectedDate) => {
                        setShowStartPicker(false);
                        if (selectedDate) setHandleApplyStartDate(selectedDate);
                      }}
                    />
                  )}
                </View>

                <View style={styles.dateInputWrapper}>
                  <Text style={styles.dateLabelStyles}>{strings.End}</Text>
                  <TouchableOpacity
                    onPress={() => setShowEndPicker(true)}
                    style={styles.dateInput}
                    activeOpacity={0.7}>
                    <TextComp style={styles.dateLabelStyles}>
                      {handleApplyEndDate
                        ? moment(handleApplyEndDate, 'MM-DD-YYYY').format(
                            'MM/DD/YYYY',
                          )
                        : 'mm/dd/yyyy'}
                    </TextComp>

                    <Icon
                      name={'calendar-month'}
                      size={moderateScale(25)}
                      color={colors.blue}
                    />
                  </TouchableOpacity>
                  {showEndPicker && (
                    <DateTimePicker
                      value={
                        handleApplyEndDate instanceof Date
                          ? handleApplyEndDate
                          : new Date()
                      }
                      mode="date"
                      display="default"
                      onChange={(event, selectedDate) => {
                        setShowEndPicker(false);
                        if (selectedDate) setHandleApplyEndDate(selectedDate);
                      }}
                    />
                  )}
                </View>
              </View>

              <TouchableOpacity
                style={[
                  styles.applyButton,
                  !(startDate && endDate) && styles.disabledButton,
                ]}
                disabled={!(startDate && endDate)}
                onPress={handleApply}
                activeOpacity={0.7}>
                <Text style={styles.applyButtonText}>{strings.Apply}</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  setIsVisible(false);
                  setHandleApplyStartDate(null);
                  setHandleApplyEndDate(null);
                }}
                style={styles.closeButton}
                activeOpacity={0.7}>
                <Text style={styles.closeButtonText}>{strings.Close}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ModalComp>
    </WrapperContainer>
  );
}
