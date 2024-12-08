import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Linking,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import WrapperContainer from '../../components/WrapperContainer';
import HeaderComp from '../../components/HeaderComp';
import strings from '../../constants/lang';
import styles from './styles';
import {moderateScale, width} from '../../styles/responsiveSize';
import TextComp from '../../components/TextComp';
import {NewsCategories} from '../../constants/static/staticData';
import NewsCard from '../../components/NewsCard';
import {
  GetAllEventsAnnouncements,
  GetAllNews,
  GetAllNewsSources,
  GetAllNewsTypes,
  GetEventsAnnouncement,
  GetTickerBasicInfo,
} from '../../redux/actions/news';
import moment from 'moment';
import colors from '../../styles/colors';
import FlashListComp from '../../components/FlashListComp';
import CustomDropdown from '../../components/CustomDropdown';
import navigationStrings from '../../navigation/navigationStrings';
import {useNavigation} from '@react-navigation/native';
import FastImage from 'react-native-fast-image';

export default function News() {
  const [news, setNews] = useState([]);
  const [page, setPage] = useState(1);
  const [eventPage, setEventPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [trendingNews, setTrendingNews] = useState([]);
  const [trendingLoading, setTrendingLoading] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [dropdownData, setDropdownData] = useState([]);
  const navigation = useNavigation();
  const [firstTime, setFirstTime] = useState(false);
  const [selectedTabName, setSelectedTabName] = useState('All');
  const [allNewsSource, setAllNewsSource] = useState([]);
  const [announcementCategory, setAnnouncementCategory] = useState([]);
  const [newsSourceId, setNewsSourceId] = useState('');

  useEffect(() => {
    fetchAllNews(page);
    getAllTrendingNews();
    fetchStockFilterData();
    fetchAllNewsSources();
    fetchAllEventsAnnouncements();
  }, []);

  useEffect(() => {
    setNews([]);
    setPage(1);
    fetchAllNews(1, newsSourceId);
  }, [newsSourceId]);

  useEffect(() => {
    fetchAllNews(page, newsSourceId);
  }, [page]);

  useEffect(() => {
    if (newsSourceId) {
      setNews([]);
      setEventPage(1);
      console.log('first');
      getAllEventsAnnouncement(null, 1, 1);
    }
  }, [newsSourceId]);

  useEffect(() => {
    if (firstTime) {
      getAllEventsAnnouncement(null, 1, eventPage);
    }
  }, [eventPage]);

  const tabHandler = (tab, index) => {
    setSelectedTabName(tab?.name);
    if (tab?.type === 'Events&More') {
      setNews([]);
      getAllEventsAnnouncement(tab, index, 1);
    } else {
      fetchAllNewsTypes(tab, index);
    }
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
        setDropdownData(temp);
      }
    } catch (error) {
      console.error('Error fetching getTickerBasic information :', error);
    }
  };

  const fetchAllNews = async currentPage => {
    try {
      setLoading(true);
      const response = await GetAllNews(currentPage, newsSourceId);

      const SortedData = response?.sort(
        (a, b) => new Date(b.pubDate) - new Date(a.pubDate),
      );

      if (response?.length) {
        setNews(prevNews => [...prevNews, ...SortedData]);
        setHasMore(response.length > 0);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error('Error fetching news:', error);
    } finally {
      setLoading(false);
    }
  };

  const getAllTrendingNews = async type => {
    try {
      setTrendingLoading(true);
      const response = await GetAllNewsTypes('Trending');

      const SortedData = response?.sort(
        (a, b) => new Date(b.pubDate) - new Date(a.pubDate),
      );

      if (response?.length) {
        setTrendingNews(SortedData);
        setTrendingLoading(false);
      }
    } catch (error) {
      console.error('Error new types error news:', error);
    } finally {
      setTrendingLoading(false);
    }
  };

  const fetchAllNewsTypes = async (tab, index) => {
    if (tab === 'All') {
      setActiveTab(index);
      setNews([]);
      setPage(1);
      return;
    }

    try {
      setActiveTab(index);
      setLoading(true);
      setNews([]);
      const response = await GetAllNewsTypes(tab?.type);
      const SortedData = response?.sort(
        (a, b) => new Date(b.pubDate) - new Date(a.pubDate),
      );

      if (response?.length) {
        setNews(prevNews => [...prevNews, ...SortedData]);

        //setNews(SortedData);
        setHasMore(response.length > 0);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error('Error new types error news:', error);
    } finally {
      setLoading(false);
    }
  };

  const getAllEventsAnnouncement = async (tab, index, eventPage) => {
    try {
      setLoading(true);

      if (index !== undefined) setActiveTab(index);
      if (tab === 'Events&More' || eventPage === 1) {
        setNews([]);
        setEventPage(1);
      }

      const response = await GetEventsAnnouncement(eventPage, newsSourceId);

      if (response?.length) {
        const SortedData = response.sort(
          (a, b) => new Date(b.pubDate) - new Date(a.pubDate),
        );
        setNews(prevNews => [...prevNews, ...SortedData]);
        setHasMore(true);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error('Error in getAllEventsAnnouncement:', error);
    } finally {
      setLoading(false);
      setFirstTime(true);
    }
  };

  const loadMore = () => {
    if (!isLoading && hasMore) {
      if (activeTab == 0) {
        setPage(prevPage => prevPage + 1);
      } else if (activeTab == 1) {
        setEventPage(prevPage => prevPage + 1);
      }
    }
  };

  const FooterComponents = () => (
    <View style={styles.loginYourStyles}>
      <ActivityIndicator size="large" color={colors.blue} />
    </View>
  );

  const handleDropdownChange = item => {
    setSelectedOption(item.value);
    navigation.navigate(navigationStrings.CompanyProfile, {item});
  };

  const newsCardHandler = item => {
    Linking.openURL(item?.link).catch(err =>
      console.log('An error occurred', err),
    );
  };

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
      console.error('Error fetching announcementCategory:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAllEventsAnnouncements = async () => {
    try {
      setLoading(true);
      const response = await GetAllEventsAnnouncements();

      const temp = [];
      response?.forEach(x => {
        temp.push({
          label: x?.name,
          value: x?.code,
        });
      });

      if (response?.length) {
        setAnnouncementCategory(temp);
      }
    } catch (error) {
      console.error('Error fetching EventsAnnouncements:', error);
    } finally {
      setLoading(false);
    }
  };

  const dropDownAllHandler = item => {
    setNewsSourceId(item.value);
    setActiveTab(0);
  };

  const dropDownEventAndMore = item => {
    setNewsSourceId(item.value);
    setActiveTab(1);
  };

  const HeaderComponents = React.useMemo(
    () => (
      <>
        <HeaderComp
          title={strings.News}
          rightBellIconVisible={false}
          settingHandler={settingHandler}
          notificationIcon
        />

        <CustomDropdown
          data={dropdownData}
          placeholder={strings.SearchText}
          onChange={handleDropdownChange}
          enableSearch={true}
          value={selectedOption}
        />

        {trendingLoading ? (
          <ActivityIndicator size="large" color={colors.blue} />
        ) : (
          <NewsCard newsItems={trendingNews} onPressHandler={newsCardHandler} />
        )}

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.tabsContainer}>
          {NewsCategories?.map((tab, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.tab, index === activeTab && styles.activeTab]}
              activeOpacity={0.7}
              onPress={() => tabHandler(tab, index)}>
              <Text
                style={[
                  styles.tabText,
                  index === activeTab && styles.activeTabText,
                ]}>
                {tab?.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={styles.stockStyles}>
          <View
            style={[
              selectedTabName !== 'All' && selectedTabName !== 'Events & More'
                ? null
                : {width: '25%'},
            ]}>
            <TextComp
              text={selectedTabName}
              style={
                selectedTabName !== 'All' && selectedTabName !== 'Events & More'
                  ? styles.heading
                  : undefined
              }
            />
          </View>

          {selectedTabName === 'All' ? (
            <CustomDropdown
              data={allNewsSource}
              placeholder={strings.SearchText}
              onChange={dropDownAllHandler}
              enableSearch={true}
              value={selectedOption}
              dropdownStyle={{width: width / 1.5, alignSelf: 'flex-end'}}
            />
          ) : selectedTabName === 'Events & More' ? (
            <CustomDropdown
              data={announcementCategory}
              placeholder={strings.SearchText}
              onChange={dropDownEventAndMore}
              enableSearch={true}
              value={selectedOption}
              dropdownStyle={{width: width / 1.5, alignSelf: 'flex-end'}}
            />
          ) : null}
        </View>
      </>
    ),
    [
      dropdownData,
      selectedOption,
      trendingLoading,
      trendingNews,
      NewsCategories,
      activeTab,
      selectedTabName,
      announcementCategory,
      allNewsSource,
    ],
  );

  const TrendingNewsCard = ({item}) => {
    const formattedDate = moment(item?.pubDate).fromNow();

    const openLinkHandler = url => {
      Linking.openURL(url).catch(err => console.log('An error occurred', err));
    };

    return (
      <TouchableOpacity
        style={styles.card}
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

  const settingHandler = () => {};
  const renderItem = ({item}) => <TrendingNewsCard item={item} />;

  return (
    <WrapperContainer>
      <FlashListComp
        DATA={news}
        renderItem={renderItem}
        ListHeaderComponent={HeaderComponents}
        ListFooterComponent={loading && FooterComponents}
        onEndReached={loadMore}
        onEndReachedThreshold={0.2}
        ItemSeparatorComponent={() => (
          <View style={{marginBottom: moderateScale(10)}} />
        )}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        containerStyle={{flex: 1, marginBottom: moderateScale(20)}}
      />
    </WrapperContainer>
  );
}
