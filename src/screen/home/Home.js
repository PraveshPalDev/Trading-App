import React, {useState} from 'react';
import WrapperContainer from '../../components/WrapperContainer';
import HeaderComp from '../../components/HeaderComp';
import strings from '../../constants/lang';
import {View, Text, Image, FlatList, TouchableOpacity} from 'react-native';
import TextComp from '../../components/TextComp';
import FastImageComp from '../../components/FastImageComp';
import styles from './styles';
import SearchComp from '../../components/SearchComp';
import ImageCarouselComp from '../../components/ImageCarouselComp';
import {moderateScale} from '../../styles/responsiveSize';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import colors from '../../styles/colors';

const stocks = [
  {id: 1, symbol: 'AMZN', price: '84.33', change: '(+3.51)'},
  {id: 2, symbol: 'AMZN', price: '84.33', change: '(+3.51)'},
  {id: 3, symbol: 'AMZN', price: '84.33', change: '(+3.51)'},
  {id: 4, symbol: 'AMZN', price: '84.33', change: '(+3.51)'},
  {id: 5, symbol: 'AMZN', price: '84.33', change: '(+3.51)'},
  {id: 6, symbol: 'AMZN', price: '84.33', change: '(+3.51)'},
];

const events = [
  {
    id: 1,
    title: 'Financial Results Announcement',
    time: '08:00 - 10:00',
    company: 'Apple Inc',
    symbol: 'AAPL',
    color: '#728ef1',
  },
  {
    id: 2,
    title: 'Financial Results Announcement',
    time: '08:00 - 10:00',
    company: 'Apple Inc',
    symbol: 'AAPL',
    color: '#e1a867',
  },
  {
    id: 3,
    title: 'Financial Results Announcement',
    time: '08:00 - 10:00',
    company: 'Apple Inc',
    symbol: 'AAPL',
    color: '#6ecf7f',
  },
];

export default function Home() {
  const [openCalendar, setOpenCalendar] = useState(false);

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

  const UserInformation = () => (
    <View style={styles.userInformationContainer}>
      <FastImageComp url="https://img-cdn.pixlr.com/image-generator/history/65bb506dcb310754719cf81f/ede935de-1138-4f66-8ed7-44bd16efc709/medium.webp" />
      <View style={styles.userInfoNameContainer}>
        <TextComp text="Welcome Back" style={styles.stylesText} />
        <TextComp text="Pravesh Kumar!" style={styles.stylesTextName} />
      </View>
    </View>
  );

  const HeaderComponents = () => (
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
      <ImageCarouselComp title={strings.News} />
      <View style={styles.stockStyles}>
        <TextComp text={strings.PapularStocks} style={styles.heading} />
        <Text style={styles.seeAllStyles} onPress={seeAllHandler}>
          {strings.SeeAll}
        </Text>
      </View>
    </>
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

  const renderItem = ({item}) => (
    <View style={styles.card}>
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
    </View>
  );

  const bellHandler = () => {};
  const settingHandler = () => {};
  const searchHandler = text => {};
  const seeAllHandler = () => {};

  return (
    <WrapperContainer>
      <FlatList
        data={stocks}
        ListHeaderComponent={HeaderComponents}
        ListFooterComponent={FooterComponents}
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
