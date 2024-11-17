import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import WrapperContainer from '../../components/WrapperContainer';
import {months, symbols} from '../../constants/static/staticData';
import HeaderComp from '../../components/HeaderComp';
import SearchComp from '../../components/SearchComp';
import strings from '../../constants/lang';
import TextComp from '../../components/TextComp';
import StockChartComp from '../../components/StockChartComp';
import {moderateScale, textScale, width} from '../../styles/responsiveSize';
import styles from './styles';
import colors from '../../styles/colors';
import Speedometer from '../../components/Speedometer';
import {useNavigation} from '@react-navigation/native';
import navigationStrings from '../../navigation/navigationStrings';

const stocks = Array.from({length: 20}, (v, i) => ({
  id: i + 1,
  symbol: symbols[i % symbols.length],
  price: (80 + Math.random() * 20).toFixed(2),
  change: `(${(Math.random() * 10 - 5).toFixed(2)})`,
}));

const data = [
  {day: '1 Day', price: '+3,5102'},
  {day: '2 Days', price: '+4,1220'},
  {day: '3 Days', price: '+2,8793'},
  {day: '4 Days', price: '+5,3421'},
  {day: '5 Days', price: '+1,2730'},
  {day: '6 Days', price: '+6,5018'},
  {day: '7 Days', price: '+3,9540'},
  {day: '8 Days', price: '+4,7681'},
  {day: '9 Days', price: '+2,8842'},
  {day: '10 Days', price: '+5,4315'},
];

export default function More() {
  const navigation = useNavigation();

  const HeaderComponents = () => (
    <>
      <HeaderComp
        title={strings.Company}
        bellHandler={bellHandler}
        settingHandler={settingHandler}
        notificationIcon
        bellIcon="bell-plus-outline"
        settingIcon="heart"
        style={{marginRight: moderateScale(-3)}}
      />

      <SearchComp
        placeholderText={strings.SearchText}
        searchHandler={searchHandler}
      />

      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => {
          navigation.navigate(navigationStrings.AllStocks);
        }}
        style={styles.stockStyles}>
        <Text style={styles.companyName}>Austriacard Holdings AS</Text>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.btnContainer}
            onPress={() => alert('coming soon')}>
            <Text style={styles.buttonText}>ACAG.AT</Text>
          </TouchableOpacity>
          <Text style={styles.price}>$5.8</Text>
          <Text style={styles.sector}>Sector: Computer Services</Text>
        </View>
      </TouchableOpacity>

      {/* call this trackChart components */}
      <StockChartComp />

      {/* Time Range Tabs */}
      <View style={styles.bottomContainer}>
        <View style={styles.tabs}>
          {months?.map((tab, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.tab, tab === 'All' && styles.activeTab]}>
              <Text
                style={[styles.tabText, tab === 'All' && styles.activeTabText]}>
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Overview */}
        <TextComp style={styles.sectionTitle}>Overview</TextComp>
        <Text style={styles.sectionTitleText}>
          {`Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.`}
        </Text>

        {/* all meters here */}
        <View style={styles.meterContainer}>
          <Speedometer title={'Trend Following'} value={10} />
          <Speedometer title={'Mean Reversion'} value={60} />
          <Speedometer title={'Volume'} value={80} />
        </View>

        <View
          style={{
            width: width,
            marginTop: moderateScale(20),
            justifyContent: 'center',
          }}>
          <FlatList data={data} numColumns={3} renderItem={renderBottomCard} />
        </View>
      </View>
    </>
  );

  const renderBottomCard = ({item}) => {
    const navigationHandler = () => {
      navigation.navigate(navigationStrings.AllStocks);
    };

    return (
      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.cardContainer}
        onPress={() => navigationHandler(item)}>
        <View style={styles.priceContainer}>
          <Text style={styles.dayText}>{item?.day}</Text>
          <Text style={styles.plusPrice}>{item.price}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const renderItem = ({item}) => {};
  const bellHandler = () => {};
  const settingHandler = () => {};
  const searchHandler = text => {};

  return (
    <WrapperContainer>
      <View style={{flex: 1}}>
        <FlatList
          data={stocks}
          ListHeaderComponent={HeaderComponents}
          renderItem={renderItem}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          keyExtractor={item => item.id.toString()}
          ItemSeparatorComponent={() => (
            <View style={{marginBottom: moderateScale(10)}} />
          )}
          style={{flex: 1}}
          contentContainerStyle={{flexGrow: 1}}
        />
      </View>
    </WrapperContainer>
  );
}
