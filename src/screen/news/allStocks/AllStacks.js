import {Text, View, TouchableOpacity, ActivityIndicator} from 'react-native';
import React, {useCallback, useState} from 'react';
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
import {useFocusEffect} from '@react-navigation/native';
import {
  GetAllDailyQuotes,
  GetPortfolioDetails,
  GetRDS,
} from '../../../redux/actions/news';
import FlashListComp from '../../../components/FlashListComp';

const tableHead = ['Share', 'AVAX', 'AVAX'];
export default function AllStacks() {
  const [isModalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [chartData, setChartData] = useState([]);
  const [portfolioData, setPortfolioData] = useState([]);
  const [allRds, setAllRds] = useState([]);
  const [modalData, setModalData] = useState([]);

  const generateTableData = item => {
    return [
      ['Price', '€ ' + item?.price, '€ ' + item?.price],
      [
        'Add. 1 Year (%)',
        `+${item?.oneYear?.toFixed(2)}%`,
        `+${item?.oneYear?.toFixed(2)}%`,
      ],
      [
        'Change (%)',
        `${item?.change?.toFixed(2)}%`,
        `${item?.change?.toFixed(2)}%`,
      ],
      [
        'Average Daily Volume',
        item?.volume?.toLocaleString(),
        item?.volume?.toLocaleString(),
      ],
      [
        'Capitalization (m)',
        '€ ' + ((item?.price * item?.shares) / 1000000).toFixed(2),
        ,
        '€ ' + ((item?.price * item?.shares) / 1000000).toFixed(2),
      ],
    ];
  };

  const tableData = generateTableData(modalData);

  useFocusEffect(
    useCallback(() => {
      fetchDailyQuotes();
      fetchPortfolioDetails();
      fetchRDS();
      return () => {};
    }, []),
  );

  const fetchDailyQuotes = async () => {
    try {
      setLoading(true);
      const res = await GetAllDailyQuotes();
      if (res.length > 0) {
        setChartData(res);
      }
    } catch (error) {
      console.log('error for daily quotes =>', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchPortfolioDetails = async () => {
    setLoading(true);
    try {
      const res = await GetPortfolioDetails();

      if (res) {
        setPortfolioData(res);
      }
    } catch (error) {
      console.log('error for fetching portfolio details =>', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchRDS = async () => {
    try {
      setLoading(true);
      const res = await GetRDS();
      if (res.length > 0) {
        setAllRds(res);
      }
    } catch (error) {
      console.log('error for rds =>', error);
    } finally {
      setLoading(false);
    }
  };

  const HeaderComponents = () => (
    <>
      <HeaderComp
        title={strings.Props}
        backBtn={true}
        rightBellIconVisible={false}
        settingHandler={settingHandler}
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
    setModalData(item);
    setModalVisible(true);
  };

  const renderItem = ({item}) => {
    console.log('item =>', item);

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

        <View style={styles.bottomCardStyles}>
          <Text style={styles.title}>{item.portfolioName}</Text>
          <View style={styles.buttonButtonStyles}>
            <Text style={{color: colors.white}}>0.95</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const settingHandler = () => {};
  const searchHandler = text => {};

  return (
    <WrapperContainer>
      <FlashListComp
        data={portfolioData}
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
        ListEmptyComponent={
          loading ? (
            <View style={styles.loading}>
              <ActivityIndicator size={'large'} color={colors.blue} />
            </View>
          ) : (
            <View style={styles.loading}>
              <Text style={styles.noContentText}>No data available!!</Text>
            </View>
          )
        }
      />

      <ModalComp
        isVisible={isModalVisible}
        onBackdropPress={() => setModalVisible(false)}
        style={{flex: 1, justifyContent: 'center'}}>
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <View style={styles.header}>
              <Text style={styles.modalTitle}>{`Alpha Growth Fund`}</Text>
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
                  data={tableHead?.map((item, index) => (
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
                    row?.map((cell, cellIndex) => {
                      let textStyle = [styles.text];

                      if (row[0] === 'Add. 1 Year (%)' && cellIndex > 0) {
                        textStyle?.push({
                          color: cell.includes('+') ? 'green' : 'red',
                        });
                      }
                      if (row[0] === 'Change (%)' && cellIndex > 0) {
                        textStyle?.push({
                          color: cell.includes('-') ? 'red' : 'green',
                        });
                      }

                      return (
                        <Text
                          key={cellIndex}
                          style={[
                            ...textStyle,
                            cellIndex === 0 && {fontWeight: 'bold'},
                          ]}>
                          {cell}
                        </Text>
                      );
                    }),
                  )}
                />
              </Table>

              <Text style={styles.description}>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry...
              </Text>
            </View>
          </View>
        </View>
      </ModalComp>
    </WrapperContainer>
  );
}
