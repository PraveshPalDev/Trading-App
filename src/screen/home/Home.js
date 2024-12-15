import React, {useCallback, useEffect, useState} from 'react';
import WrapperContainer from '../../components/WrapperContainer';
import HeaderComp from '../../components/HeaderComp';
import strings from '../../constants/lang';
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Linking,
} from 'react-native';
import TextComp from '../../components/TextComp';
import styles from './styles';
import {moderateScale, textScale} from '../../styles/responsiveSize';
import colors from '../../styles/colors';
import {useSelector} from 'react-redux';
import {
  GetAllEventCategory,
  GetAllNews,
  GetAllStocks,
  GetEventsBetweenDates,
  GetTickerBasicInfo,
} from '../../redux/actions/news';
import NewsCard from '../../components/NewsCard';
import navigationStrings from '../../navigation/navigationStrings';
import {useNavigation} from '@react-navigation/native';
import moment from 'moment';
import FlashListComp from '../../components/FlashListComp';
import ModalComp from '../../components/ModalComp';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {showError} from '../../utils/helperFunctions';
import {modalAllButton} from '../../constants/static/staticData';
import {
  getCurrentMonthRange,
  getCurrentWeekRange,
  getNextWeekRange,
  getThisWeekRange,
} from '../../utils/Date';
import CustomDropdown from '../../components/CustomDropdown';
import EventCalendarComp from '../../components/EventCalendarComp';

export default function Home() {
  const navigation = useNavigation();
  const userData = useSelector(state => state.auth.userData);
  const [news, setNews] = useState([]);
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [stockLoading, setStockLoading] = useState(true);

  // here all stage to modal components
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
  const [dropdownData, setDropdownData] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedDropdownData, setSelectedDropdownData] = useState([]);

  useEffect(() => {
    const {startDate, endDate} = getCurrentWeekRange();
    setStartDate(startDate);
    setEndDate(endDate);
    setHandleApplyStartDate(startDate);
    setHandleApplyEndDate(endDate);

    // Execute all fetch functions in parallel using Promise.all
    Promise.all([
      fetchAllNews(),
      fetchAllStock(),
      fetchAllEventCategory(),
      fetchStockFilterData(),
    ]).catch(error => console.error('Failed to fetch data:', error));
  }, []);

  useEffect(() => {
    if (eventCategoryIds?.length > 0) {
      fetchAllEvents(eventCategoryIds);
    }
  }, [eventCategoryIds, startDate, endDate]);

  const fetchStockFilterData = async () => {
    try {
      const response = await GetTickerBasicInfo();
      const sortedData = response?.sort(
        (a, b) => new Date(b?.pubDate) - new Date(a?.pubDate),
      );

      const temp = [];
      sortedData?.forEach((x, index) => {
        temp.push({
          label: `${x?.ticker} - ${x?.eN_Name}`,
          value: `${x?.ticker} ${x?.eN_Name}`,
          ticker: x?.ticker,
        });
      });

      if (response?.length) {
        setDropdownData(temp);
      }
    } catch (error) {
      console.error('Error fetching getTickerBasic information :', error);
    }
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
        setHandleApplyStartDate(null);
        setHandleApplyEndDate(null);
      } catch (error) {
        console.error('Failed to fetch events:', error);
      } finally {
        setEventLoading(false);
      }
    },
    [startDate, endDate],
  );

  const fetchAllStock = async () => {
    try {
      const response = await GetAllStocks();
      if (response) {
        const sortedStocks = response?.sort((a, b) => b.volume - a.volume);
        setStockLoading(false);
        setStocks(sortedStocks.slice(0, 10));
      }
    } catch (error) {
      showError(error);
      console.log('Error fetching stocks:', error);
    } finally {
      setStockLoading(false);
    }
  };

  const fetchAllNews = async (page = 1) => {
    try {
      setLoading(true);

      const response = await GetAllNews(page, '');
      if (response) {
        setNews(response);
      }
    } catch (error) {
      showError(error);
      console.log('Error fetching news:', error);
    } finally {
      setLoading(false);
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

  const UserInformation = () => (
    <View style={styles.userInformationContainer}>
      <View style={styles.imageContainer}>
        <TextComp
          text={` ${userData.firstName?.charAt(0)}.${userData.lastName?.charAt(
            0,
          )}.`}
          style={{
            ...styles.stylesTextName,
            fontSize: textScale(28),
            textAlign: 'center',
          }}
        />
      </View>

      <View style={styles.userInfoNameContainer}>
        <TextComp text={strings.WelcomeBack} style={styles.stylesText} />
        <TextComp
          text={`${userData.firstName}${userData.lastName}`}
          style={{...styles.stylesTextName}}
        />
      </View>
    </View>
  );

  const newsCardHandler = item => {
    Linking.openURL(item?.link).catch(err =>
      console.log('An error occurred', err),
    );
  };

  const HeaderComponents = () => {
    return (
      <>
        <HeaderComp
          title={strings.Home}
          bellHandler={bellHandler}
          settingHandler={settingHandler}
          notificationIcon
          rightBellIconVisible={false}
        />
        <UserInformation />

        <CustomDropdown
          data={dropdownData}
          placeholder={strings.SearchText}
          onChange={handleChangeDropdown}
          enableSearch={true}
          value={selectedOption}
        />

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginHorizontal: moderateScale(15),
          }}>
          <TextComp style={styles.heading}>{strings.News}</TextComp>
          <Text style={styles.seeAllStyles} onPress={newsSeeAllHandler}>
            {strings.SeeAll}
          </Text>
        </View>

        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <NewsCard newsItems={news} onPressHandler={newsCardHandler} />
        )}

        <View style={{...styles.stockStyles}}>
          <TextComp text={strings.PapularStocks} style={styles.heading} />
          <Text style={styles.seeAllStyles} onPress={seeAllHandler}>
            {strings.SeeAll}
          </Text>
        </View>
      </>
    );
  };

  const renderItem = ({item}) => {
    const changeColor = item.change.startsWith('-')
      ? colors.red
      : colors.darkGreen;
    const formattedDate = moment().format('YYYY-MM-DD');

    return (
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => stocksHandler(item)}
        style={{
          ...styles.card,
          backgroundColor:
            item.timestamp !== formattedDate ? colors.yellow : colors.black,
        }}>
        <View style={styles.textContainer}>
          <Text
            style={{
              ...styles.symbol,
              color:
                item.timestamp !== formattedDate ? colors.black : colors.white,
            }}>
            {item?.ticker}
          </Text>
          <View style={styles.priceRow}>
            <Text
              style={{
                ...styles.price,
                color:
                  item.timestamp !== formattedDate
                    ? colors.black
                    : colors.white,
              }}>
              €{item?.price}{' '}
            </Text>
            <Text style={[styles.change, {color: changeColor}]}>
              {`(${item?.change})`}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const seeAllHandler = () => {
    navigation.navigate(navigationStrings.Stock);
  };

  const newsSeeAllHandler = () => {
    navigation.navigate(navigationStrings.News);
  };

  const stocksHandler = item => {
    navigation.navigate(navigationStrings.StockDetails, {item});
  };

  const FooterComponents = useCallback(
    () => (
      <EventCalendarComp
        data={eventCategories}
        startDate={startDate}
        endDate={endDate}
        selectedDropdownData={selectedDropdownData}
        eventLoading={eventLoading}
        handleDropdownChange={handleDropdownChange}
        calenderHandler={calenderHandler}
        renderTableData={renderTableData}
        renderHeader={renderHeader}
      />
    ),
    [selectedDropdownData, eventLoading],
  );

  const renderLoading = () => (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color="#005aef" />
    </View>
  );

  const calenderHandler = () => {
    setIsVisible(true);
  };

  const handleApply = () => {
    const formattedStartDate =
      moment(handleApplyStartDate).format('MM-DD-YYYY');
    const formattedEndDate = moment(handleApplyEndDate).format('MM-DD-YYYY');

    setStartDate(formattedStartDate);
    setEndDate(formattedEndDate);
    setIsVisible(false);
  };

  const handleChangeDropdown = item => {
    setSelectedOption(item.value);
    navigation.navigate(navigationStrings.CompanyProfile, {item});
  };

  const bellHandler = () => {};
  const settingHandler = () => {};

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

  const getColorByCategory = categoryId => {
    const filterColor = eventCategories.find(
      x => x.id === categoryId,
    )?.dropdownBgColor;

    return filterColor;
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

  return (
    <WrapperContainer>
      <FlashListComp
        DATA={stocks}
        renderItem={stockLoading ? renderLoading : renderItem}
        ListHeaderComponent={HeaderComponents}
        ListFooterComponent={FooterComponents}
        numColumns={2}
        ItemSeparatorComponent={() => {
          return <View style={styles.itemSeparator} />;
        }}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        containerStyle={styles.listContainer}
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
