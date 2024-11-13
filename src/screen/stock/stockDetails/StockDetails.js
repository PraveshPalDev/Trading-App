import {FlatList, Image, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import WrapperContainer from '../../../components/WrapperContainer';
import HeaderComp from '../../../components/HeaderComp';
import strings from '../../../constants/lang';
import {useNavigation, useRoute} from '@react-navigation/native';
import {moderateScale} from '../../../styles/responsiveSize';
import styles from './styles';
import TextComp from '../../../components/TextComp';
import StockChartComp from '../../../components/StockChartComp';
import ButtonComp from '../../../components/ButtonCom';
import {symbols, months, financial} from '../../../constants/static/staticData';

const stocks = Array.from({length: 20}, (v, i) => ({
  id: i + 1,
  symbol: symbols[i % symbols.length],
  price: (80 + Math.random() * 20).toFixed(2),
  change: `(${(Math.random() * 10 - 5).toFixed(2)})`,
}));

export default function StockDetails() {
  const navigation = useNavigation();
  const route = useRoute();
  const {selectedStock} = route.params;

  const HeaderComponents = () => (
    <>
      <HeaderComp
        title={strings.StockDetails}
        bellHandler={bellHandler}
        settingHandler={settingHandler}
        notificationIcon
        backBtn
        bellIcon="bell-plus-outline"
        settingIcon="heart"
        style={{marginRight: moderateScale(-3)}}
      />

      <View style={styles.stockStyles}>
        <View style={styles.leftStockContainer}>
          <View style={styles.leftStockContainer}>
            <Image
              source={{
                uri: 'https://e7.pngegg.com/pngimages/832/502/png-clipart-amazon-logo-text-brand-amazon-text-service-thumbnail.png',
              }}
              style={styles.iconContainer}
            />

            <View style={{justifyContent: 'center'}}>
              <TextComp
                text={selectedStock?.symbol}
                style={{...styles.heading}}
              />
              <TextComp text={'Amazon.com'} style={styles.headingCentered} />
            </View>
          </View>

          <View style={styles.priceContainer}>
            <Text style={styles.priceStyles}>$84,39</Text>
            <Text style={styles.priceRateStyles}>+3,59</Text>
          </View>
        </View>
      </View>

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
        <View style={styles.overview}>
          <View style={styles.overviewRow}>
            <Text style={styles.overviewLabel}>Open</Text>
            <TextComp style={styles.overviewValue}>190.00</TextComp>
            <Text style={styles.overviewLabel}>Volume</Text>
            <TextComp style={styles.overviewValue}>$43.00M</TextComp>
          </View>
          <View style={styles.overviewRow}>
            <Text style={styles.overviewLabel}>High</Text>
            <TextComp style={styles.overviewValue}>200.00</TextComp>
            <Text style={styles.overviewLabel}>Avg. Vol</Text>
            <TextComp style={styles.overviewValue}>$43.00M</TextComp>
          </View>
        </View>

        {/* Financial Buttons */}
        <TextComp style={styles.sectionTitle}>Financials</TextComp>
        <View style={styles.financialButtons}>
          {financial?.map((title, index) => (
            <TouchableOpacity key={index} style={styles.financialButton}>
              <Text style={styles.financialButtonText}>{title}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </>
  );

  const FooterComponents = () => {
    return (
      <>
        <ButtonComp
          styleText={styles.btnText}
          style={styles.buyBtnStyles}
          title={'Buy Stocks'}
        />
      </>
    );
  };

  const renderItem = ({item}) => {};
  const bellHandler = () => {};
  const settingHandler = () => {};

  return (
    <WrapperContainer>
      <View style={{flex: 1}}>
        <FlatList
          data={stocks}
          ListHeaderComponent={HeaderComponents}
          ListFooterComponent={FooterComponents}
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
