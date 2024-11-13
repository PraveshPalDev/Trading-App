import {Image, Text, View, FlatList, TouchableOpacity} from 'react-native';
import React from 'react';
import WrapperContainer from '../../components/WrapperContainer';
import {moderateScale} from '../../styles/responsiveSize';
import HeaderComp from '../../components/HeaderComp';
import SearchComp from '../../components/SearchComp';
import TextComp from '../../components/TextComp';
import strings from '../../constants/lang';
import styles from './styles';
import {useNavigation} from '@react-navigation/native';
import navigationStrings from '../../navigation/navigationStrings';

const symbols = [
  'AAPL',
  'GOOGL',
  'MSFT',
  'TSLA',
  'NFLX',
  'META',
  'AMD',
  'NVDA',
  'INTC',
  'BABA',
  'UBER',
  'DIS',
  'TWTR',
  'PYPL',
  'CRM',
  'ORCL',
  'IBM',
  'ADBE',
  'SONY',
  'SHOP',
];

const stocks = Array.from({length: 20}, (v, i) => ({
  id: i + 1,
  symbol: symbols[i % symbols.length],
  price: (80 + Math.random() * 20).toFixed(2),
  change: `(${(Math.random() * 10 - 5).toFixed(2)})`,
}));

export default function Stock() {
  const navigation = useNavigation();

  const HeaderComponents = () => (
    <>
      <HeaderComp
        title={strings.Stock}
        bellHandler={bellHandler}
        settingHandler={settingHandler}
        notificationIcon
      />

      <SearchComp
        placeholderText={strings.SearchText}
        searchHandler={searchHandler}
      />

      <View style={styles.stockStyles}>
        <TextComp text={strings.PapularStocks} style={styles.heading} />
        <Text style={styles.seeAllStyles} onPress={seeAllHandler}>
          {strings.SeeAll}
        </Text>
      </View>
    </>
  );

  const renderItem = ({item}) => (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.7}
      onPress={() => stocksHandler(item)}>
      <Image
        source={{
          uri: 'https://cdn0.iconfinder.com/data/icons/most-usable-logos/120/Amazon-512.png',
        }}
        style={styles.iconContainer}
      />
      <View style={styles.textContainer}>
        <Text style={styles.symbol}>{item.symbol}</Text>
        <View style={styles.priceRow}>
          <Text style={styles.price}>${item.price}</Text>
          <Text style={styles.change}>{item.change}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const bellHandler = () => {};
  const settingHandler = () => {};
  const searchHandler = text => {};
  const seeAllHandler = () => {};

  const stocksHandler = async item => {
    navigation.navigate(navigationStrings.StockDetails, {selectedStock: item});
  };

  return (
    <WrapperContainer>
      <FlatList
        data={stocks}
        ListHeaderComponent={HeaderComponents}
        renderItem={renderItem}
        numColumns={2}
        keyExtractor={item => item.id.toString()}
        ItemSeparatorComponent={() => (
          <View style={{marginBottom: moderateScale(10)}} />
        )}
        style={{flex: 1, marginBottom: moderateScale(20)}}
      />
    </WrapperContainer>
  );
}
