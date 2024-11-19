import {
  View,
  FlatList,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import WrapperContainer from '../../components/WrapperContainer';
import HeaderComp from '../../components/HeaderComp';
import SearchComp from '../../components/SearchComp';
import strings from '../../constants/lang';
import styles from './styles';
import {moderateScale} from '../../styles/responsiveSize';
import TextComp from '../../components/TextComp';
import {NewsCategories} from '../../constants/static/staticData';
import NewsCard from '../../components/NewsCard';
import {GetAllNews, GetAllNewsTypes} from '../../redux/actions/news';
import moment from 'moment';
import colors from '../../styles/colors';
import FlashListComp from '../../components/FlashListComp';

export default function News() {
  const [news, setNews] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [trendingNews, setTrendingNews] = useState([]);
  const [trendingLoading, setTrendingLoading] = useState(false);

  useEffect(() => {
    fetchAllNews(page);
    getAllTrendingNews(page, 'Trending');
  }, []);

  useEffect(() => {
    fetchAllNews(page);
  }, [page]);

  const fetchAllNews = async currentPage => {
    try {
      setLoading(true);
      const response = await GetAllNews(currentPage);

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
      const response = await GetAllNewsTypes(page, tab);
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
      console.error('Error new types error news:', error);
    } finally {
      setLoading(false);
    }
  };

  const getAllTrendingNews = async (page, type) => {
    try {
      setTrendingLoading(true);
      const response = await GetAllNewsTypes(page, type);
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

  const loadMore = () => {
    if (!isLoading && hasMore) {
      setPage(prevPage => prevPage + 1);
    }
  };

  const FooterComponents = () => (
    <View style={styles.loginYourStyles}>
      <ActivityIndicator size="large" color={colors.blue} />
    </View>
  );

  const renderDropdown = () => {
    return (
      <SearchComp
        placeholderText={strings.SearchText}
        searchHandler={searchHandler}
      />
    );
  };

  const HeaderComponents = () => (
    <>
      <HeaderComp
        title={strings.News}
        bellHandler={bellHandler}
        settingHandler={settingHandler}
        notificationIcon
      />

      {renderDropdown()}
      {trendingLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <NewsCard newsItems={trendingNews} />
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
            onPress={() => fetchAllNewsTypes(tab, index)}>
            <Text
              style={[
                styles.tabText,
                index === activeTab && styles.activeTabText,
              ]}>
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.stockStyles}>
        <TextComp text={strings.Trending} style={styles.heading} />
        <Text style={styles.seeAllStyles} onPress={seeAllHandler}>
          {strings.SeeAll}
        </Text>
      </View>
    </>
  );

  const TrendingNewsCard = ({item}) => {
    const formattedDate = moment(item?.pubDate).fromNow();

    return (
      <TouchableOpacity style={styles.card} activeOpacity={0.7}>
        <Image source={{uri: item.imageUrl}} style={styles.image} />
        {/* Right Content */}
        <View style={styles.contentContainer}>
          <View style={styles.categoryContainer}>
            <Text style={styles.categoryText}>
              {' '}
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

  const bellHandler = () => {};
  const settingHandler = () => {};
  const seeAllHandler = () => {};
  const searchHandler = text => {};
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
