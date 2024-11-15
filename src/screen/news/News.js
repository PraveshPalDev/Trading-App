import {
  View,
  FlatList,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import React from 'react';
import WrapperContainer from '../../components/WrapperContainer';
import HeaderComp from '../../components/HeaderComp';
import SearchComp from '../../components/SearchComp';
import ImageCarouselComp from '../../components/ImageCarouselComp';
import strings from '../../constants/lang';
import styles from './styles';
import {moderateScale} from '../../styles/responsiveSize';
import TextComp from '../../components/TextComp';
import {NewsCategories} from '../../constants/static/staticData';
import {useNavigation} from '@react-navigation/native';
import navigationStrings from '../../navigation/navigationStrings';

const newsData = [
  {
    imageUrl:
      'https://images.pexels.com/photos/669615/pexels-photo-669615.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Stock',
    news: `Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in classical Latin literature dating back to 45 BC.`,
    source: 'Economics Times',
    sourceIcon:
      'https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/b5/71/b6/b571b6ff-c42c-558a-a6a8-58d3a7f1d223/AppIcon-0-0-1x_U007emarketing-0-8-0-sRGB-85-220.png/1200x630wa.png',
    time: '9 hours ago',
  },
  {
    imageUrl:
      'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Finance',
    news: `New financial reforms are being introduced to ensure stability amid global economic uncertainties.`,
    source: 'Finance Daily',
    sourceIcon:
      'https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/b5/71/b6/b571b6ff-c42c-558a-a6a8-58d3a7f1d223/AppIcon-0-0-1x_U007emarketing-0-8-0-sRGB-85-220.png/1200x630wa.png',
    time: '12 hours ago',
  },
  {
    imageUrl:
      'https://images.pexels.com/photos/4386396/pexels-photo-4386396.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Technology',
    news: `Breakthroughs in AI and machine learning are transforming industries at an unprecedented pace.`,
    source: 'Tech World',
    sourceIcon:
      'https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/b5/71/b6/b571b6ff-c42c-558a-a6a8-58d3a7f1d223/AppIcon-0-0-1x_U007emarketing-0-8-0-sRGB-85-220.png/1200x630wa.png',
    time: '5 hours ago',
  },
  {
    imageUrl:
      'https://images.pexels.com/photos/3184631/pexels-photo-3184631.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Health',
    news: `Recent studies emphasize the importance of mental well-being in overall health care.`,
    source: 'Health Line',
    sourceIcon:
      'https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/b5/71/b6/b571b6ff-c42c-558a-a6a8-58d3a7f1d223/AppIcon-0-0-1x_U007emarketing-0-8-0-sRGB-85-220.png/1200x630wa.png',
    time: '2 days ago',
  },
  {
    imageUrl:
      'https://images.pexels.com/photos/276517/pexels-photo-276517.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'World News',
    news: `Global leaders convene to discuss strategies for combating climate change.`,
    source: 'Global Times',
    sourceIcon:
      'https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/b5/71/b6/b571b6ff-c42c-558a-a6a8-58d3a7f1d223/AppIcon-0-0-1x_U007emarketing-0-8-0-sRGB-85-220.png/1200x630wa.png',
    time: '3 hours ago',
  },
  {
    imageUrl:
      'https://images.pexels.com/photos/3184395/pexels-photo-3184395.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Sports',
    news: `The latest championship sees an unexpected turn as underdogs secure a surprising victory.`,
    source: 'Sports Weekly',
    sourceIcon:
      'https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/b5/71/b6/b571b6ff-c42c-558a-a6a8-58d3a7f1d223/AppIcon-0-0-1x_U007emarketing-0-8-0-sRGB-85-220.png/1200x630wa.png',
    time: '6 hours ago',
  },
  {
    imageUrl:
      'https://images.pexels.com/photos/2101187/pexels-photo-2101187.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Entertainment',
    news: `A blockbuster movie breaks records, becoming the highest-grossing film of the year.`,
    source: 'Hollywood Insider',
    sourceIcon:
      'https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/b5/71/b6/b571b6ff-c42c-558a-a6a8-58d3a7f1d223/AppIcon-0-0-1x_U007emarketing-0-8-0-sRGB-85-220.png/1200x630wa.png',
    time: '1 day ago',
  },
  {
    imageUrl:
      'https://images.pexels.com/photos/3184455/pexels-photo-3184455.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Science',
    news: `A new discovery in astrophysics challenges our understanding of black holes.`,
    source: 'Science Daily',
    sourceIcon:
      'https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/b5/71/b6/b571b6ff-c42c-558a-a6a8-58d3a7f1d223/AppIcon-0-0-1x_U007emarketing-0-8-0-sRGB-85-220.png/1200x630wa.png',
    time: '8 hours ago',
  },
  {
    imageUrl:
      'https://images.pexels.com/photos/373076/pexels-photo-373076.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Travel',
    news: `Top destinations to explore in 2023 for adventure seekers and nature lovers.`,
    source: 'Travel Guide',
    sourceIcon:
      'https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/b5/71/b6/b571b6ff-c42c-558a-a6a8-58d3a7f1d223/AppIcon-0-0-1x_U007emarketing-0-8-0-sRGB-85-220.png/1200x630wa.png',
    time: '4 days ago',
  },
  {
    imageUrl:
      'https://images.pexels.com/photos/3182768/pexels-photo-3182768.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Business',
    news: `Market analysts predict a strong quarter for the tech sector amid global uncertainties.`,
    source: 'Business Daily',
    sourceIcon:
      'https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/b5/71/b6/b571b6ff-c42c-558a-a6a8-58d3a7f1d223/AppIcon-0-0-1x_U007emarketing-0-8-0-sRGB-85-220.png/1200x630wa.png',
    time: '10 hours ago',
  },
];

export default function News() {
  const navigation = useNavigation();

  const FooterComponents = () => (
    <View style={{...styles.container, marginTop: moderateScale(15)}} />
  );

  const HeaderComponents = () => (
    <>
      <HeaderComp
        title={strings.News}
        bellHandler={bellHandler}
        settingHandler={settingHandler}
        notificationIcon
      />

      <SearchComp
        placeholderText={strings.SearchText}
        searchHandler={searchHandler}
      />

      <ImageCarouselComp
        title={strings.LatestNews}
        dotStyles={{
          marginBottom: moderateScale(-250),
        }}
        activeDotStyles={styles.activeDotStyles}
      />

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.tabsContainer}>
        {NewsCategories?.map((tab, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.tab, index === 0 && styles.activeTab]}>
            <Text style={[styles.tabText, index === 0 && styles.activeTabText]}>
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

  const renderItem = ({item}) => (
    <View style={styles.card}>
      {/* left image container */}
      <View style={styles.imageContainer}>
        <Image
          source={{
            uri: item.imageUrl,
          }}
          style={styles.image}
        />
      </View>

      {/* right text and icon and time container */}
      <View style={{flex: 1}}>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.stockBtnContainer}
          onPress={() => stockHandler(item)}>
          <Text style={{textAlign: 'center'}}>{item.category}</Text>
        </TouchableOpacity>
        <Text style={styles.justifiedText}>{item.news}</Text>
        <View style={styles.timeContainer}>
          <View style={styles.timeImageContainer}>
            <Image
              source={{
                uri: item.sourceIcon,
              }}
              style={styles.timeLogo}
            />
            <Text style={styles.timeName}>{item.source}</Text>
          </View>
          <Text style={styles.timeName}>{item.time}</Text>
        </View>
      </View>
    </View>
  );

  const bellHandler = () => {};
  const settingHandler = () => {};
  const seeAllHandler = () => {};
  const searchHandler = text => {};

  const stockHandler = item => {
    alert('coming soon');
  };

  return (
    <WrapperContainer>
      <FlatList
        data={newsData}
        ListHeaderComponent={HeaderComponents}
        ListFooterComponent={FooterComponents}
        renderItem={renderItem}
        keyExtractor={(item, index) => item?.id?.toString() || index}
        ItemSeparatorComponent={() => (
          <View style={{marginBottom: moderateScale(10)}} />
        )}
        style={{flex: 1, marginBottom: moderateScale(20)}}
      />
    </WrapperContainer>
  );
}
