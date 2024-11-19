import React, {useEffect, useState} from 'react';
import WrapperContainer from '../../components/WrapperContainer';
import HeaderComp from '../../components/HeaderComp';
import strings from '../../constants/lang';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import TextComp from '../../components/TextComp';
import FastImageComp from '../../components/FastImageComp';
import styles from './styles';
import SearchComp from '../../components/SearchComp';
import {moderateScale} from '../../styles/responsiveSize';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import colors from '../../styles/colors';
import {useSelector} from 'react-redux';
import {GetAllNews, GetAllStocks} from '../../redux/actions/news';
import NewsCard from '../../components/NewsCard';
import navigationStrings from '../../navigation/navigationStrings';
import {useNavigation} from '@react-navigation/native';
import moment from 'moment';
import FlashListComp from '../../components/FlashListComp';

export default function Home() {
  const navigation = useNavigation();
  const [openCalendar, setOpenCalendar] = useState(false);
  const userData = useSelector(state => state.auth.userData);
  const [news, setNews] = useState([]);
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [stockLoading, setStockLoading] = useState(true);

  useEffect(() => {
    fetchAllNews();
    fetchAllStock();
  }, []);

  const fetchAllStock = async () => {
    try {
      const response = await GetAllStocks();
      if (response) {
        const sortedStocks = response?.sort((a, b) => b.volume - a.volume);
        setStockLoading(false);
        setStocks(sortedStocks.slice(0, 10));
      }
    } catch (error) {
      console.log('Error fetching stocks:', error);
    } finally {
      setStockLoading(false);
    }
  };

  const fetchAllNews = async (page = 1) => {
    try {
      setLoading(true);

      const response = await GetAllNews(page);
      if (response) {
        setNews(response);
      }
    } catch (error) {
      console.log('Error fetching news:', error);
    } finally {
      setLoading(false);
    }
  };

  const UserInformation = () => (
    <View style={styles.userInformationContainer}>
      <FastImageComp url="https://img-cdn.pixlr.com/image-generator/history/65bb506dcb310754719cf81f/ede935de-1138-4f66-8ed7-44bd16efc709/medium.webp" />
      <View style={styles.userInfoNameContainer}>
        <TextComp text="Welcome Back" style={styles.stylesText} />
        <TextComp
          text={`${userData.firstName}${userData.lastName}`}
          style={styles.stylesTextName}
        />
      </View>
    </View>
  );

  const HeaderComponents = () => {
    return (
      <>
        <HeaderComp
          title={strings.Home}
          bellHandler={bellHandler}
          settingHandler={settingHandler}
          notificationIcon
        />
        <UserInformation />

        <SearchComp
          placeholderText={strings.SearchText}
          searchHandler={searchHandler}
        />

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginHorizontal: moderateScale(15),
          }}>
          <TextComp text={strings.News} style={styles.heading} />
          <Text style={styles.seeAllStyles} onPress={newsSeeAllHandler}>
            {strings.SeeAll}
          </Text>
        </View>

        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <NewsCard newsItems={news} />
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
      : colors.lightGreen2;
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
              ${item?.price}{' '}
            </Text>
            <Text style={[styles.change, {color: changeColor}]}>
              {`(${item?.change})`}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const bellHandler = () => {};
  const settingHandler = () => {};
  const searchHandler = text => {};

  const seeAllHandler = () => {
    navigation.navigate(navigationStrings.Stock);
  };

  const newsSeeAllHandler = () => {
    navigation.navigate(navigationStrings.News);
  };

  const renderEvent = ({item}) => (
    <View style={[styles.eventCard, {backgroundColor: item.color}]}>
      <Text style={styles.eventTitle}>{item.title}</Text>
      <View style={styles.eventDetails}>
        <FontAwesome name="clock-o" size={14} color="white" />
        <Text style={styles.eventTime}>{item.time}</Text>
      </View>
      <View style={styles.eventCompany}>
        <FontAwesome name="apple" size={14} color="white" />
        <Text style={styles.companyName}>{item.company}</Text>
      </View>
      <View style={styles.symbolContainer}>
        <Text style={styles.symbolText}>{item.symbol}</Text>
      </View>
    </View>
  );

  const FooterComponents = () => (
    <View style={{...styles.container, marginTop: moderateScale(10)}}>
      <TextComp text={strings.Events} style={styles.heading} />

      <View style={styles.eventContainer}>
        <TextComp text="Mon, 28 August 2024" />
        <TouchableOpacity
          onPress={() => {
            setOpenCalendar(true);
          }}>
          <FontAwesome
            name="calendar"
            size={moderateScale(28)}
            color={colors.blue}
          />
        </TouchableOpacity>
      </View>

      {/* <FlatList data={events} renderItem={renderEvent} /> */}
    </View>
  );

  const renderLoading = () => (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color="#005aef" />
    </View>
  );
  const renderSeparator = () => <View style={styles.itemSeparator} />;

  return (
    <WrapperContainer>
      <FlashListComp
        DATA={stocks}
        renderItem={stockLoading ? renderLoading : renderItem}
        ListHeaderComponent={HeaderComponents}
        ListFooterComponent={FooterComponents}
        numColumns={2}
        ItemSeparatorComponent={renderSeparator}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        containerStyle={styles.listContainer}
      />
    </WrapperContainer>
  );
}
