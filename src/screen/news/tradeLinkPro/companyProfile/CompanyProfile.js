import {
  ActivityIndicator,
  Linking,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import WrapperContainer from '../../../../components/WrapperContainer';
import FloatingButtonComp from '../../../../components/FloatingButtonComp';
import colors from '../../../../styles/colors';
import styles from './styles';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
  moderateScale,
  textScale,
  width,
} from '../../../../styles/responsiveSize';
import strings from '../../../../constants/lang';
import {actions, modalAllButton} from '../../../../constants/static/staticData';
import navigationStrings from '../../../../navigation/navigationStrings';
import TextComp from '../../../../components/TextComp';
import Speedometer from '../../../../components/Speedometer';
import CurvedText from '../../../../components/CurvedText';
import FlashListComp from '../../../../components/FlashListComp';
import ModalComp from '../../../../components/ModalComp';
import {
  calcData,
  getCurrentMonthRange,
  getCurrentWeekRange,
  getMostFrequentSignal,
  getNextWeekRange,
  getThisWeekRange,
} from '../../../../utils/Date';
import moment from 'moment';
import {
  GetAllDailyQuotes,
  GetAllEventCategory,
  GetAllNewsSources,
  GetAllQuotes,
  GetAllSignal,
  GetEventsBetweenDates,
  GetNewsByTicker,
  GetRDS,
  GetTickerBasicInfo,
} from '../../../../redux/actions/news';
import FastImage from 'react-native-fast-image';
import StockChart from '../../../../components/StockChart';
import EventCalendarComp from '../../../../components/EventCalendarComp';
import DateTimePicker from '@react-native-community/datetimepicker';
import {useSelector} from 'react-redux';
import {showError} from '../../../../utils/helperFunctions';
import CustomDropdown from '../../../../components/CustomDropdown';
import HeaderComp from '../../../../components/HeaderComp';
import StockVoteComp from '../../../../components/StockVoteComp';
import CustomNewsTabs from '../../../../components/CustomNewsTabs';

export default function CompanyProfile() {
  const route = useRoute();
  const {header, ...item} = route.params || {};
  const [isLocked, setIsLocked] = useState(false);
  const navigation = useNavigation();
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [eventCategories, setEventCategories] = useState([]);
  const [eventCategoryIds, setEventCategoryIds] = useState([]);
  const [eventTableData, setEventTableData] = useState([]);
  const [eventLoading, setEventLoading] = useState(false);
  const [handleApplyStartDate, setHandleApplyStartDate] = useState('');
  const [handleApplyEndDate, setHandleApplyEndDate] = useState('');
  const [loading, setLoading] = useState(false);
  const [allQuotes, setAllQuotes] = useState([]);
  const [dailyQuotes, setDailyQuotes] = useState([]);
  const [allRds, setAllRds] = useState([]);
  const [selectedDropdownData, setSelectedDropdownData] = useState([]);
  const userData = useSelector(state => state.auth.userData);
  const [selectedOption, setSelectedOption] = useState(null);
  const [dropdownData, setDropdownData] = useState([]);
  const [tickerData, setTickerData] = useState([]);
  const [signal, setSignal] = useState([]);
  const [allNewsSource, setAllNewsSource] = useState([]);
  const [newsSourceId, setNewsSourceId] = useState('');
  const [allTickerNews, setAllTickerNews] = useState([]);

  useEffect(() => {
    const {startDate, endDate} = getCurrentWeekRange();
    setStartDate(startDate);
    setEndDate(endDate);
    setHandleApplyStartDate(startDate);
    setHandleApplyEndDate(endDate);

    fetchAllEventCategory();
    fetchQuotes();
    fetchDailyQuotes();
    fetchRDS();
    fetchStockFilterData();
    fetchAllSignal();
    fetchAllNewsSources();
  }, []);

  // call here api to news with ticker
  useEffect(() => {
    fetchAllNews();
  }, [newsSourceId, tickerData]);

  const fetchAllNews = async () => {
    try {
      const res = await GetNewsByTicker(tickerData?.ticker, newsSourceId);
      if (res) {
        const sortedNewsByDate = res.sort(
          (a, b) => new Date(b.pubDate) - new Date(a.pubDate),
        );
        setAllTickerNews(sortedNewsByDate);
      }
    } catch (error) {
      console.log('error for fetch news =>', error);
    }
  };

  // here all method to without ticker
  const fetchQuotes = async () => {
    try {
      setLoading(true);
      const res = await GetAllQuotes();

      if (res.length > 0) {
        setLoading(false);
        setAllQuotes(res);
      }
    } catch (error) {
      setLoading(false);
      console.log('error for daily quotes =>', error);
    }
  };
  const fetchDailyQuotes = async () => {
    try {
      setLoading(true);
      const res = await GetAllDailyQuotes();

      if (res.length > 0) {
        setLoading(false);
        setDailyQuotes(res);
      }
    } catch (error) {
      setLoading(false);
      console.log('error for getAllDailyQuotes  =>', error);
    }
  };
  const fetchRDS = async () => {
    try {
      setLoading(true);
      const res = await GetRDS();

      if (res.length > 0) {
        setLoading(false);
        setAllRds(res);
      }
    } catch (error) {
      setLoading(false);

      console.log('error for rds =>', error);
    }
  };
  const fetchAllEventCategory = async () => {
    try {
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
    }
  };
  const fetchAllSignal = async () => {
    try {
      const res = await GetAllSignal();
      if (res) {
        setSignal(res);
      }
    } catch (error) {
      console.log('error for signal api =>', error);
    }
  };

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
    [startDate, endDate],
  );

  const handlePressItem = name => {
    if (name === 'stockLists') {
      // navigation.navigate(navigationStrings.ShareList);
      navigation.navigate(navigationStrings.AllStocks);
    } else if (name === 'technicalAnalysis') {
      navigation.navigate(navigationStrings.TradeLinkTable);
    } else if (name === 'research') {
      navigation.navigate(navigationStrings.Research);
    } else {
      console.log('not another screen');
    }
  };

  const getColorByCategory = categoryId => {
    const filterColor = eventCategories.find(
      x => x.id === categoryId,
    )?.dropdownBgColor;

    return filterColor;
  };

  const PurchaseCalendar = ({isLocked, setIsLocked}) => {
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

  const calenderHandler = () => {
    setIsVisible(true);
  };

  const rightMapIconHandler = () => {
    alert('map');
  };

  const handleApply = () => {
    const formattedStartDate =
      moment(handleApplyStartDate).format('MM-DD-YYYY');
    const formattedEndDate = moment(handleApplyEndDate).format('MM-DD-YYYY');

    setStartDate(formattedStartDate);
    setEndDate(formattedEndDate);
    setIsVisible(false);
  };

  const handleDropdownChange = selectedData => {
    const filterData = eventTableData?.filter(
      item => item.category === selectedData?.id,
    );

    setSelectedDropdownData(JSON.parse(JSON.stringify(filterData)));
  };

  const renderHeader = () => (
    <View style={styles.header}>
      <TextComp style={styles.headerText}>{strings.Date}</TextComp>
      <TextComp style={styles.headerText}>{strings.Symbol}</TextComp>
      <TextComp style={styles.headerText}>{strings.Description}</TextComp>
      <TextComp style={styles.headerText}>{strings.Category}</TextComp>
    </View>
  );

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

  const dropDownAllHandler = item => {
    setNewsSourceId(item.value);
  };

  // render news feed components
  const NewsFeed = ({isLocked, setIsLocked}) => {
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
          <>
            <View style={styles.flashListContainer}>
              <View style={{backgroundColor: colors.grayOpacity10}}>
                <Text style={styles.newFeedTitle}>{strings.NewsFeed}</Text>
                <View style={styles.newFeedSubContainer}>
                  <CustomDropdown
                    data={allNewsSource}
                    placeholder={strings.SearchText}
                    onChange={dropDownAllHandler}
                    enableSearch={true}
                    value={selectedOption}
                    dropdownStyle={{width: width / 1.3}}
                  />
                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={rightMapIconHandler}
                    style={{alignSelf: 'center'}}>
                    <Icon
                      name="newspaper"
                      size={moderateScale(35)}
                      color={colors.blue}
                    />
                  </TouchableOpacity>
                </View>
              </View>

              {eventLoading ? (
                <View style={styles.loadingContainer}>
                  <ActivityIndicator
                    size="large"
                    color="#005aef"
                    style={styles.loadingContainer}
                  />
                </View>
              ) : (
                <FlashListComp
                  DATA={allTickerNews}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={renderNewsFeed}
                />
              )}
            </View>
          </>
        )}
      </TouchableOpacity>
    );
  };

  const renderNewsFeed = ({item}) => {
    const formattedDate = moment(item?.pubDate).fromNow();

    const openLinkHandler = url => {
      Linking.openURL(url).catch(err => console.log('An error occurred', err));
    };

    return (
      <TouchableOpacity
        style={styles.newFeedCard}
        activeOpacity={0.7}
        onPress={() => openLinkHandler(item?.link)}>
        <FastImage
          source={{
            uri: item.imageUrl,
            priority: FastImage.priority.normal,
          }}
          style={styles.image}
          resizeMode={FastImage.resizeMode.cover}
        />
        {/* Right Content */}
        <View style={styles.contentContainer}>
          <View style={styles.categoryContainer}>
            <Text style={styles.categoryText}>
              {item?.title?.length > 80
                ? `${item.title.slice(0, 80)}...`
                : item?.title}
            </Text>
          </View>

          {/* News Title */}
          <View style={styles.categoryContainer}>
            <Text style={styles.title}>
              {item?.description?.length > 80
                ? `${item.description.slice(0, 80)}...`
                : item?.description}
            </Text>
          </View>

          {/* Bottom Source and Time */}
          <View style={styles.categoryContainer}>
            <View style={styles.sourceContainer}>
              <View style={styles.sourceInfo}>
                <Text style={styles.sourceName}>{item?.sourceName}</Text>
              </View>
              <Text style={styles.timeText}>{formattedDate}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
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

  const handleDropdownChangeTicker = item => {
    setSelectedOption(item.value);
    setTickerData(item);
  };

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

  // here call news sources
  const fetchAllNewsSources = async () => {
    try {
      setLoading(true);
      const response = await GetAllNewsSources();

      const temp = [];
      response?.forEach(x => {
        temp.push({
          label: x?.sourceName,
          value: x?.sourceId,
          sourceURL: x?.sourceURL,
        });
      });

      if (response?.length) {
        setAllNewsSource(temp);
      }
    } catch (error) {
      console.log('Error fetching announcementCategory:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <WrapperContainer>
      <ScrollView
        style={{marginBottom: moderateScale(25)}}
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled={true}>
        {/* added here ticker dropdown */}
        {header && (
          <HeaderComp
            title={strings.CompanyProfile}
            rightBellIconVisible={false}
          />
        )}

        <CustomDropdown
          data={dropdownData}
          placeholder={strings.SearchText}
          onChange={handleDropdownChangeTicker}
          enableSearch={true}
          value={selectedOption}
        />

        <StockCard
          allQuotes={allQuotes}
          rds={allRds}
          dailyQuotes={dailyQuotes}
          tickerName={tickerData?.ticker}
          isLocked={isLocked}
          setIsLocked={setIsLocked}
        />

        <View style={styles.stockContainer}>
          <StockChart ticker={tickerData?.ticker} backColor="#000000" />
        </View>

        <CompanyDescription
          rds={allRds}
          isLocked={isLocked}
          tickerName={tickerData?.ticker}
          setIsLocked={setIsLocked}
        />

        <PurchaseCalendar
          isLocked={isLocked}
          setIsLocked={setIsLocked}
          tickerName={tickerData?.ticker}
          eventCategories={eventCategories}
          eventLoading={eventLoading}
        />

        <StockVoteComp userData={userData} tickerData={tickerData} />

        <SpeedoMeterComponents
          data={signal}
          userData={userData}
          isLocked={isLocked}
          setIsLocked={setIsLocked}
        />
        <NewsFeed isLocked={isLocked} setIsLocked={setIsLocked} />
        <View style={{marginHorizontal: moderateScale(12)}}>
          <CustomNewsTabs />
        </View>
      </ScrollView>

      {/* floating button comp */}
      <FloatingButtonComp
        data={actions}
        onPressItem={handlePressItem}
        IconColor={colors.blue}
        overlayColor="rgba(0, 0, 0, 0.5)"
        containerStyles={styles.floatingButtonContainer}
      />

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
                  <TextComp>{strings.Start}</TextComp>
                  <TouchableOpacity
                    onPress={() => setShowStartPicker(true)}
                    style={styles.dateInput}
                    activeOpacity={0.7}>
                    <TextComp>
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
                  <TextComp>{strings.End}</TextComp>
                  <TouchableOpacity
                    onPress={() => setShowEndPicker(true)}
                    style={styles.dateInput}
                    activeOpacity={0.7}>
                    <TextComp>
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

const StockCard = ({
  allQuotes,
  rds,
  dailyQuotes,
  tickerName = null,
  isLocked,
  setIsLocked,
}) => {
  const labels = {
    day: '1 Ημέρα (%)',
    adv: 'Μέσος Ημερήσιος Όγκος',
    modifiedAt: 'Ημερομηνία Τροποποίησης',
    oneYear: '1 Έτος (%)',
    ticker: 'Κωδικός Μετοχής',
    vol: 'Τυπική Απόκλιση',
    ytd: 'YTD (%)',
    ek: 'Κεφαλαιοποίηση (εκ)',
  };

  // Filter data based on tickerName or default to the first item
  const selectedQuote = tickerName
    ? allQuotes.find(quote => quote.ticker === tickerName)
    : allQuotes[0];

  const selectedDailyQuote = tickerName
    ? dailyQuotes.find(quote => quote.ticker === `${tickerName}.AT`)
    : dailyQuotes[0];

  const selectedRds = tickerName
    ? rds.find(quote => quote.ticker === `${tickerName}`)
    : rds[0];

  const formattedData = selectedDailyQuote
    ? [
        {key: 'day', value: selectedQuote?.change},
        {
          key: 'ytd',
          value: `${calcData(
            selectedDailyQuote?.ytd,
            selectedQuote?.price,
          ).toFixed(2)}%`,
        },
        {
          key: 'oneYear',
          value: `${calcData(
            selectedDailyQuote?.oneYear,
            selectedQuote?.price,
          ).toFixed(2)}%`,
        },
        {key: 'adv', value: Math.round(selectedDailyQuote?.adv)},
        {key: 'vol', value: selectedDailyQuote?.vol},
        {key: 'ticker', value: selectedDailyQuote?.ticker},
        {key: 'ek', value: '€ 4'},
      ]
    : [];

  return (
    <TouchableOpacity
      style={[
        styles.container,
        isLocked ? styles.lockedCard : styles.unlockedCard,
        isLocked ? {backgroundColor: 'rgba(255, 255, 255, 0.7)'} : null,
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
        <>
          <View style={styles.header2}>
            <TextComp style={styles.ticker}>{selectedQuote?.ticker}</TextComp>
            <TextComp
              style={styles.price}>{`€ ${selectedQuote?.price}`}</TextComp>
          </View>
          <TextComp style={styles.companyName}>{selectedRds?.eN_Name}</TextComp>
          <TextComp style={[styles.sectionLabel, styles.sectorLabel]}>
            {`Κλάδος : ${selectedRds?.industry}`}
          </TextComp>

          <View style={styles.metricsContainer}>
            {formattedData?.map(({key, value}) => (
              <View key={key} style={styles.metricItem}>
                <Text style={styles.metricLabel}>{labels[key]}</Text>
                <Text
                  style={[
                    styles.metricValue,
                    parseFloat(value) < 0 ? styles.negative : styles.positive,
                  ]}>
                  {value}
                </Text>
              </View>
            ))}
          </View>
        </>
      )}
    </TouchableOpacity>
  );
};

const CompanyDescription = ({rds, isLocked, setIsLocked, tickerName}) => {
  const selectedRds = tickerName
    ? rds.find(quote => quote.ticker === `${tickerName}`)
    : rds[0];

  return (
    <TouchableOpacity
      style={[
        styles.container,
        isLocked ? styles.lockedCard : styles.unlockedCard,
        isLocked ? {backgroundColor: 'rgba(255, 255, 255, 0.7)'} : null,
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
        <View style={styles.contentContainer}>
          <TextComp style={styles.title}>Περιγραφή</TextComp>
          <TextComp style={styles.description}>
            {selectedRds?.description}
          </TextComp>
        </View>
      )}
    </TouchableOpacity>
  );
};

const SpeedoMeterComponents = ({data, isLocked, setIsLocked}) => {
  // Helper function to determine Speedometer value based on signal
  const getSignalValue = signal => {
    if (signal == 0) return 50; // Hold
    if (signal == -1) return 20; // Sell
    if (signal == 1) return 80; // Buy
    return 50; // Default (Hold)
  };

  // Fetch signals for each metric
  const TrendFollowingSignal = getMostFrequentSignal(data, 'TF');
  const MeanReversionSignal = getMostFrequentSignal(data, 'MR');
  const VolumeSignal = getMostFrequentSignal(data, 'Vol');

  // Map signals to Speedometer values
  const trendValue = getSignalValue(TrendFollowingSignal);
  const meanValue = getSignalValue(MeanReversionSignal);
  const volumeValue = getSignalValue(VolumeSignal);

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
        <>
          <View style={styles.technicalAnalysisContainer}>
            <TextComp
              text={strings.TechnicalAnalysis}
              style={styles.analysisText}
            />
            <TouchableOpacity
              style={{
                padding: moderateScale(5),
              }}>
              <Icon
                name={'zoom-out-map'}
                size={moderateScale(25)}
                color={colors.black}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.meterContainer2}>
            <CurvedText
              text={strings.TrendFollowing}
              pathId="trendPath"
              arcRadius={moderateScale(70)}
              fontSize={textScale(15)}
              startOffset="25%"
            />
            <CurvedText
              text={strings.MeanReversion}
              pathId="trendPath"
              arcRadius={moderateScale(70)}
              fontSize={textScale(15)}
              startOffset="25%"
            />
            <CurvedText
              text={strings.Volume}
              pathId="trendPath"
              arcRadius={moderateScale(70)}
              fontSize={textScale(15)}
              startOffset="38%"
            />
          </View>
          <View style={styles.meterContainer}>
            {/* Bind the specific value to each Speedometer */}
            <Speedometer value={trendValue} />
            <Speedometer value={meanValue} />
            <Speedometer value={volumeValue} />
          </View>
        </>
      )}
    </TouchableOpacity>
  );
};
