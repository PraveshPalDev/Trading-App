import {Text, FlatList, View, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from './styles';
import WrapperContainer from '../../../components/WrapperContainer';
import HeaderComp from '../../../components/HeaderComp';
import SearchComp from '../../../components/SearchComp';
import strings from '../../../constants/lang';
import {moderateScale, width} from '../../../styles/responsiveSize';
import StockChartComp from '../../../components/StockChartComp';
import colors from '../../../styles/colors';
import ModalComp from '../../../components/ModalComp';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Table, Row, Rows} from 'react-native-table-component';
import navigationStrings from '../../../navigation/navigationStrings';
import {useNavigation} from '@react-navigation/native';
import {
  GetAllDailyQuotes,
  GetPortfolioDetails,
} from '../../../redux/actions/news';

const tableHead = ['Share', 'AVAX', 'AVAX'];
const tableData = [
  ['Price', '€ 1.36', '€ 1.36'],
  ['Add. 1 Year (%)', '+1.28%', '+1.28%'],
  ['Change (%)', '-0.73%', '-0.73%'],
  ['Average Daily Volume', '1,02,000', '1,02,000'],
  ['Capitalization (m)', '€ 201.72', '€ 201.72'],
];

export default function AllStacks() {
  const [isModalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    fetchDailyQuotes();
    fetchPortfolioDetails();
  }, []);

  const fetchDailyQuotes = async () => {
    try {
      setLoading(true);
      const res = await GetAllDailyQuotes();
      if (res.length > 0) {
        setChartData(res);
      }
    } catch (error) {
      console.log('error for daily quotes =>', error);
    }
  };

  const fetchPortfolioDetails = async () => {
    try {
      const res = await GetPortfolioDetails();
      if (res) {
        console.log('get =>', res);
      }
    } catch (error) {
      console.log('error for fetching portfolio details =>', error);
    }
  };

  const HeaderComponents = () => (
    <>
      <HeaderComp
        title={strings.Props}
        backBtn={true}
        rightBellIconVisible={false}
        settingHandler={settingHandler}
        notificationIcon
        bellIcon="bell-plus-outline"
        settingIcon="settings"
        style={{marginRight: moderateScale(-3)}}
      />

      <SearchComp
        placeholderText={strings.SearchText}
        searchHandler={searchHandler}
      />
    </>
  );

  const stockHandler = item => {
    setModalVisible(true);
  };

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        style={styles.card}
        activeOpacity={0.7}
        onPress={() => stockHandler(item)}>
        <View style={styles.priceContainer}>
          <View style={{flex: 1}}>
            <Text style={styles.currentValueText}>{item.currentValueText}</Text>
            <Text style={styles.price}>{item.currentValue}</Text>
          </View>
          <View
            style={[
              styles.percentChangeContainer,
              {
                backgroundColor: item.isPositive
                  ? colors.lightGreen2
                  : colors.red,
              },
            ]}>
            <Text
              style={[
                styles.percentChange,
                item.isPositive ? styles.positive : styles.negative,
              ]}>
              {item.percentChange}
            </Text>
          </View>
        </View>
        <StockChartComp chartWidth={width} chartHeight={120} />
        <Text style={styles.title}>{item.title}</Text>
      </TouchableOpacity>
    );
  };

  const settingHandler = () => {};
  const searchHandler = text => {};

  return (
    <WrapperContainer>
      <FlatList
        data={chartData}
        ListHeaderComponent={HeaderComponents}
        renderItem={renderItem}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => item?.id?.toString() || index}
        style={{flex: 1}}
        columnWrapperStyle={{
          justifyContent: 'space-between',
          alignSelf: 'center',
        }}
      />

      <ModalComp
        isVisible={isModalVisible}
        onBackdropPress={() => setModalVisible(false)}
        style={{flex: 1, justifyContent: 'center'}}>
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            {/* Header */}
            <View style={styles.header}>
              <Text style={styles.modalTitle}>Alpha Growth Fund</Text>
              <TouchableOpacity
                onPress={() => {
                  setModalVisible(false);
                }}>
                <Icon
                  name={'close-circle'}
                  size={moderateScale(30)}
                  color={colors.white}
                />
              </TouchableOpacity>
            </View>

            <View style={styles.tableContainer}>
              <Table borderStyle={styles.tableBorder}>
                <Row
                  data={tableHead.map((item, index) => (
                    <Text
                      key={index}
                      style={[
                        styles.headText,
                        index === 0 && {...styles.headText, fontWeight: 'bold'},
                      ]}>
                      {item}
                    </Text>
                  ))}
                  style={styles.head}
                />

                <Rows
                  data={tableData?.map(row =>
                    row.map((cell, cellIndex) => (
                      <Text
                        key={cellIndex}
                        style={[
                          styles.text,
                          cellIndex === 0 && {
                            ...styles.text,
                            fontWeight: 'bold',
                          },
                        ]}>
                        {cell}
                      </Text>
                    )),
                  )}
                />
              </Table>

              <Text style={styles.description}>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry...
              </Text>
            </View>

            <View style={styles.footer}>
              <View style={styles.tableFooterStyles}>
                <TouchableOpacity style={styles.iconButton}>
                  <Icon
                    name={'heart'}
                    color={colors.white}
                    size={moderateScale(30)}
                  />
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconButton} activeOpacity={0.7}>
                  <Icon
                    name={'share-all'}
                    color={colors.white}
                    size={moderateScale(30)}
                  />
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                style={styles.buyButton}
                activeOpacity={0.7}
                onPress={() => {
                  setModalVisible(false);
                  navigation.navigate(navigationStrings.Analysis);
                }}>
                <Text style={styles.buyButtonText}>Buy</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ModalComp>
    </WrapperContainer>
  );
}
