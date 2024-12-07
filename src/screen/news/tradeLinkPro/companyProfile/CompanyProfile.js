import {
  ActivityIndicator,
  Linking,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import WrapperContainer from '../../../../components/WrapperContainer';
import FloatingButtonComp from '../../../../components/FloatingButtonComp';
import colors from '../../../../styles/colors';
import styles from './styles';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {moderateScale, textScale} from '../../../../styles/responsiveSize';
import strings from '../../../../constants/lang';
import {actions, modalAllButton} from '../../../../constants/static/staticData';
import navigationStrings from '../../../../navigation/navigationStrings';
import TextComp from '../../../../components/TextComp';
import {PieChart} from 'react-native-svg-charts';
import Speedometer from '../../../../components/Speedometer';
import CurvedText from '../../../../components/CurvedText';
import FlashListComp from '../../../../components/FlashListComp';
import ModalComp from '../../../../components/ModalComp';
import {getThisWeekRange} from '../../../../utils/Date';
import AgendaCalendar from '../../../../components/AgendaCalendar';
import moment from 'moment';
import {
  GetAllEventCategory,
  GetEventsBetweenDates,
} from '../../../../redux/actions/news';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import FastImage from 'react-native-fast-image';

const stockData = {
  ticker: 'AAAK.AT',
  price: '€ 4.800',
  companyName: 'Wool Industry Tria Alfa S.A.',
  sector: 'Textile Products',
  metrics: {
    '1 Ημέρα (%)': '+7.14%',
    'YTD (%)': '-32.39%',
    '1 Έτος (%)': '-32.39%',
    'Μέσος Ημερήσιος Όγκος': '96',
    'Τυπική Απόκλιση': '44.35%',
    'Κεφαλαιοποίηση (εκ)': '€ 4',
  },
};

const FeeNews = [
  {
    title: 'Χρηματιστήριο: Και πάλι ντέρμπι διατήρησης των 1.400 μονάδων',
    description:
      'Στο επίκεντρο της σημερινής συνεδρίασης στο Χρηματιστήριο, μπαίνει η ΓΕΚ ΤΕΡΝΑ...',
    image_url:
      'https://raw.githubusercontent.com/StackFrontierOfficial/GRBrokerImages/refs/heads/master/13.png',
    category: 'PowerGame Markets',
    time: '7 days',
  },
  {
    title: 'Ανοδική πορεία στις διεθνείς αγορές',
    description:
      'Οι διεθνείς αγορές σημειώνουν σημαντική άνοδο μετά τις ανακοινώσεις...',
    image_url:
      'https://raw.githubusercontent.com/StackFrontierOfficial/GRBrokerImages/refs/heads/master/13.png',
    category: 'Global Markets',
    time: '5 days',
  },
  {
    title: 'Νέα μέτρα στήριξης της οικονομίας',
    description:
      'Η κυβέρνηση ανακοίνωσε νέα μέτρα για την ενίσχυση των επιχειρήσεων...',
    image_url:
      'https://raw.githubusercontent.com/StackFrontierOfficial/GRBrokerImages/refs/heads/master/13.png',
    category: 'Economy Updates',
    time: '2 days',
  },
];

export default function CompanyProfile() {
  const [isLocked, setIsLocked] = useState(true);
  const navigation = useNavigation();
  const [data, setData] = useState([
    {
      key: 1,
      amount: 100,
      svg: {fill: colors.lightGreen2},
      label: 'Buy',
    },
    {
      key: 2,
      amount: 0,
      svg: {fill: colors.yellow},
      label: 'Hold',
    },
    {
      key: 3,
      amount: 0,
      svg: {fill: colors.red},
      label: 'Sell',
    },
  ]);
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
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'all', title: 'Όλα'},
    {key: 'daily', title: 'Ημερήσια'},
    {key: 'weekly', title: 'Εβδομαδιαία'},
    {key: 'monthly', title: 'Μηνιαία'},
    {key: 'results', title: 'Αποτελέσματα'},
  ]);

  useEffect(() => {
    const {startDate, endDate} = getThisWeekRange();
    setStartDate(startDate);
    setEndDate(endDate);
    setHandleApplyStartDate(startDate);
    setHandleApplyEndDate(endDate);

    fetchAllEventCategory();
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

        const sortedData = events?.sort(
          (a, b) => new Date(a.startDate) - new Date(b.startDate),
        );

        setEventTableData(sortedData);
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

  const fetchAllEventCategory = async () => {
    try {
      const response = await GetAllEventCategory();
      const temp = [];
      const categoryIds = [];
      response?.forEach(x => {
        temp.push({
          label: x.eventCategoryName,
          value: x.eventCategoryName,
          color: x.color,
          id: x?.eventCategoryId,
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

  const handlePressItem = name => {
    if (name === 'stockLists') {
      navigation.navigate(navigationStrings.ShareList);
    } else if (name === 'technicalAnalysis') {
      navigation.navigate(navigationStrings.TradeLinkAnalysis);
    } else if (name === 'research') {
      navigation.navigate(navigationStrings.Research);
    } else {
      console.log('not another screen');
    }
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
          <View style={styles.flashListContainer}>
            <AgendaCalendar
              dropDownData={eventCategories}
              handleDropdownChange={handleDropdownChange}
              calenderIconHandler={calenderHandler}
              showDateContainer={false}
              title={strings.PurchaseCalendar}
              rightMapIcon={'zoom-out-map'}
              calendar={'calendar'}
              rightMapIconHandler={rightMapIconHandler}
              style={{
                backgroundColor: colors.white,
                paddingHorizontal: 0,
              }}
              dropdownStyles={{
                width: moderateScale(140),
              }}
            />

            {renderHeader()}
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
                DATA={eventTableData}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderTableData}
              />
            )}
          </View>
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

  const newsHandler = () => {
    alert('calender');
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
    // here pending data for set stage
    return;
    const filterData = eventTableData?.filter(item => {
      return item.category === selectedData?.id;
    });
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
            style={{...styles.colorIndicator, backgroundColor: item?.color}}
          />
        </View>
      </View>
    );
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
              <AgendaCalendar
                dropDownData={eventCategories}
                handleDropdownChange={handleDropdownChange}
                calenderIconHandler={newsHandler}
                showDateContainer={false}
                title={strings.NewsFeed}
                // rightMapIcon={'zoom-out-map'}
                calendar={'newspaper'}
                rightMapIconHandler={rightMapIconHandler}
                style={{backgroundColor: colors.white, paddingHorizontal: 0}}
                dropdownStyles={{
                  width: moderateScale(180),
                }}
              />

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
                  DATA={FeeNews}
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
      if (url) return null;
      Linking.openURL(url).catch(err => console.log('An error occurred', err));
    };

    return (
      <TouchableOpacity style={styles.newFeedCard} activeOpacity={0.7}>
        <FastImage
          source={{
            uri: item.image_url,
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

  const DailyNews = ({isLocked, setIsLocked}) => {
    const [index, setIndex] = useState(0);

    const routes = [
      {key: 'all', title: 'All'},
      {key: 'daily', title: 'Daily'},
      {key: 'weekly', title: 'Weekly'},
      {key: 'monthly', title: 'Monthly'},
      {key: 'results', title: 'Results'},
    ];

    // Rendering content based on active tab
    const renderScene = ({route}) => {
      switch (route.key) {
        case 'all':
          return <TabContent content="All Data" />;
        case 'daily':
          return <TabContent content="Daily Data" />;
        case 'weekly':
          return <TabContent content="Weekly Data" />;
        case 'monthly':
          return <TabContent content="Monthly Data" />;
        case 'results':
          return (
            <TabContent content="No analyses found for the stock AAAK.AT" />
          );
        default:
          return null;
      }
    };

    // Custom tab bar styling
    const renderTabBar = props => (
      <TabBar
        {...props}
        indicatorStyle={styles.indicator}
        style={styles.tabBar}
        labelStyle={styles.label}
        activeColor={colors.white}
        inactiveColor={colors.white}
      />
    );

    // Separate TabContent component for better modularity
    const TabContent = ({content}) => (
      <View style={styles.scene}>
        <Text style={styles.tabContentText}>{content}</Text>
      </View>
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
            <Text style={styles.lockedText}>Locked</Text>
          </View>
        ) : (
          <View style={{flex: 1}}>
            <TabView
              navigationState={{index, routes}}
              renderScene={renderScene}
              onIndexChange={setIndex}
              initialLayout={{width: 400}}
              renderTabBar={renderTabBar}
            />
          </View>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <WrapperContainer>
      <ScrollView
        style={{marginBottom: moderateScale(25)}}
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled={true}>
        <StockCard
          data={stockData}
          isLocked={isLocked}
          setIsLocked={setIsLocked}
        />
        <CompanyDescription isLocked={isLocked} setIsLocked={setIsLocked} />
        <BuySellContainer
          data={data}
          setData={setData}
          isLocked={isLocked}
          setIsLocked={setIsLocked}
        />
        <SpeedoMeterComponents isLocked={isLocked} setIsLocked={setIsLocked} />
        <PurchaseCalendar
          isLocked={isLocked}
          setIsLocked={setIsLocked}
          eventCategories={eventCategories}
          eventLoading={eventLoading}
        />

        <NewsFeed isLocked={isLocked} setIsLocked={setIsLocked} />
        <DailyNews isLocked={isLocked} setIsLocked={setIsLocked} />
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

const StockCard = ({data, isLocked, setIsLocked}) => {
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
            <TextComp style={styles.ticker}>{data.ticker}</TextComp>
            <TextComp style={styles.price}>{data.price}</TextComp>
          </View>
          <TextComp style={styles.companyName}>{data.companyName}</TextComp>
          <TextComp style={[styles.sectionLabel, styles.sectorLabel]}>
            {data.sector}
          </TextComp>
          <View style={styles.metricsContainer}>
            {Object.entries(data.metrics).map(([key, value]) => (
              <View key={key} style={styles.metricItem}>
                <Text style={styles.metricLabel}>{key}</Text>
                <Text
                  style={[
                    styles.metricValue,
                    value.includes('-') ? styles.negative : styles.positive,
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

const CompanyDescription = ({isLocked, setIsLocked}) => {
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
        <ScrollView style={styles.CompanyContainer}>
          <View style={styles.contentContainer}>
            <TextComp style={styles.title}>
              The Eriougia Tria Alfa (AAAK)
            </TextComp>
            <TextComp style={styles.description}>
              The Eriougia Tria Alfa (AAAK) is a company that provides
              underwater services. The company was founded in Greek work
              stations and operates since 1927. The company is specialized in
              the construction of underwater structures for marine
              infrastructure, as the anchorages. The largest shareholder of the
              company, in agreement with the MRFY statements, is the Greek Navy
              and in the first half of 2023 the company announced 'increased
              activity' in the works from the existing projects. The Tria Alfa
              SA company is engaged in the construction of underwater
              structures. The company's activities include depth, cladding and
              underwater welding of large and smaller scale.
            </TextComp>
          </View>
        </ScrollView>
      )}
    </TouchableOpacity>
  );
};

const BuySellContainer = ({data, setData, isLocked, setIsLocked}) => {
  const [selectedType, setSelectedType] = useState('Buy');
  const [selectedColor, setSelectedColor] = useState(colors.lightGreen2);
  const [isDelete, setIsDelete] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState(10);

  const changeBuySellHandler = type => {
    const newColor =
      type === 'Buy'
        ? colors.lightGreen2
        : type === 'Sell'
        ? colors.red
        : colors.yellow;

    setSelectedType(type);
    setSelectedColor(newColor);
    setSelectedAmount(Math.floor(Math.random() * 101));

    setData(prevData =>
      prevData.map(item => {
        if (item.label === type) {
          return {
            ...item,
            amount: 100,
            svg: {...item.svg, fill: newColor},
          };
        }
        return {...item, amount: 0};
      }),
    );
  };

  const deleteHandler = () => {
    setIsDelete(true);
  };

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
        <View style={{...styles.containerMain, marginHorizontal: 0}}>
          <View style={styles.card2}>
            <Text style={styles.title}>
              Είναι η μετοχή AAAK.AT για Αγορά ή Πώληση?
            </Text>
            <Text style={styles.subtitle}>
              Πείτε μας την γνώμη σας για την μετοχή και μάθετε τι πιστεύουν και
              άλλοι χρήστες της πλατφόρμας.
            </Text>

            {!isDelete ? (
              <View style={styles.deleteMainContainer}>
                <Text style={{...styles.subtitle}}>
                  Ψηφήσατε ότι αυτή η μετοχή είναι για
                </Text>

                <TouchableOpacity
                  style={[
                    styles.deleteBtnContainer,
                    {backgroundColor: selectedColor},
                  ]}
                  onPress={deleteHandler}
                  activeOpacity={0.7}>
                  <TextComp style={styles.buttonText}>{selectedType}</TextComp>
                  <Icon
                    name={'delete'}
                    size={moderateScale(26)}
                    color={colors.white}
                  />
                </TouchableOpacity>
              </View>
            ) : null}

            <View style={styles.buttonsContainer}>
              <TouchableOpacity
                style={[styles.button, styles.buy]}
                onPress={() => changeBuySellHandler('Buy')}>
                <TextComp style={styles.buttonText}>Buy</TextComp>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.hold]}
                onPress={() => changeBuySellHandler('Hold')}>
                <TextComp style={styles.buttonText}>Hold</TextComp>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.sell]}
                onPress={() => changeBuySellHandler('Sell')}>
                <TextComp style={styles.buttonText}>Sell</TextComp>
              </TouchableOpacity>
            </View>

            {!isDelete ? (
              <View style={styles.chartContainer}>
                <View style={styles.chartContainer}>
                  <PieChart
                    style={styles.pieChart}
                    data={data}
                    valueAccessor={({item}) => item.amount}
                    innerRadius={60}
                    outerRadius={80}
                    labelRadius={110}
                  />

                  <View style={styles.centerTextContainer}>
                    <Text style={styles.centerText}>Total</Text>
                    <Text style={styles.centerValue}>{selectedAmount}</Text>
                  </View>
                </View>

                <View style={styles.legendContainer}>
                  <View style={styles.legendItem}>
                    <View
                      style={[
                        styles.legendColor,
                        {backgroundColor: colors.lightGreen2},
                      ]}
                    />
                    <Text style={styles.legendText}>Buy</Text>
                  </View>
                  <View style={styles.legendItem}>
                    <View
                      style={[
                        styles.legendColor,
                        {backgroundColor: colors.yellow},
                      ]}
                    />
                    <Text style={styles.legendText}>Hold</Text>
                  </View>
                  <View style={styles.legendItem}>
                    <View
                      style={[
                        styles.legendColor,
                        {backgroundColor: colors.red},
                      ]}
                    />
                    <Text style={styles.legendText}>Sell</Text>
                  </View>
                </View>
              </View>
            ) : null}
          </View>
        </View>
      )}
    </TouchableOpacity>
  );
};

const SpeedoMeterComponents = ({isLocked, setIsLocked}) => {
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
            <Speedometer value={10} />
            <Speedometer value={60} />
            <Speedometer value={80} />
          </View>
        </>
      )}
    </TouchableOpacity>
  );
};
