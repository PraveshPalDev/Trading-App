import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import WrapperContainer from '../../components/WrapperContainer';
import {moderateScale} from '../../styles/responsiveSize';
import HeaderComp from '../../components/HeaderComp';
import SearchComp from '../../components/SearchComp';
import TextComp from '../../components/TextComp';
import strings from '../../constants/lang';
import styles from './styles';
import {useNavigation} from '@react-navigation/native';
import navigationStrings from '../../navigation/navigationStrings';
import {GetAllStocks} from '../../redux/actions/news';
import colors from '../../styles/colors';
import moment from 'moment';

export default function Stock() {
  const navigation = useNavigation();
  const [allStocks, setAllStocks] = useState([]);
  const [stockLoading, setStockLoading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [filterStack, setFilterStocks] = useState([]);

  useEffect(() => {
    fetchAllStock();
  }, []);

  const fetchAllStock = async () => {
    try {
      setStockLoading(true);
      const response = await GetAllStocks();

      if (response) {
        const sortedStocks = response?.sort((a, b) => b.ticker - a.ticker);
        setAllStocks(sortedStocks);
        setFilterStocks(sortedStocks);
      }
    } catch (error) {
      console.log('Error fetching stocks:', error);
    } finally {
      setStockLoading(false);
    }
  };

  const searchHandler = text => {
    setSearchText(text);

    if (text?.length == 0) {
      setFilterStocks(allStocks);
      return;
    }

    // Filter the stocks based on the input text
    const filteredStocks = allStocks?.filter(stock =>
      stock?.ticker?.toLowerCase()?.includes(text?.toLowerCase()),
    );

    setFilterStocks(filteredStocks);
  };

  const HeaderComponents = useCallback(
    () => (
      <>
        <View style={styles.stockStyles}>
          <TextComp text={strings.PapularStocks} style={styles.heading} />
          <Text style={styles.seeAllStyles} onPress={seeAllHandler}>
            {strings.SeeAll}
          </Text>
        </View>
      </>
    ),
    [searchText],
  );

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

  const stocksHandler = async item => {
    navigation.navigate(navigationStrings.StockDetails, {selectedStock: item});
  };

  const renderLoading = () => (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color="#005aef" />
    </View>
  );

  const bellHandler = () => {};
  const settingHandler = () => {};
  const seeAllHandler = () => {};

  return (
    <WrapperContainer>
      <HeaderComp
        title={strings.Stock}
        bellHandler={bellHandler}
        settingHandler={settingHandler}
        notificationIcon
      />

      <SearchComp
        value={searchText}
        searchHandler={searchHandler}
        placeholderText={strings.SearchText}
      />

      <FlatList
        data={filterStack}
        ListHeaderComponent={HeaderComponents}
        renderItem={stockLoading ? renderLoading : renderItem}
        numColumns={2}
        keyExtractor={(item, index) => index}
        ItemSeparatorComponent={() => (
          <View style={{marginBottom: moderateScale(10)}} />
        )}
        style={{flex: 1, marginBottom: moderateScale(20)}}
      />
    </WrapperContainer>
  );
}
