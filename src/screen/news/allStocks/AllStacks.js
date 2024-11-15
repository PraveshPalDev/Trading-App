import {Text, FlatList, View, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
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

const data = [
  {
    id: '1',
    title: 'Alpha Growth Fund',
    currentValue: '$20.23',
    currentValueText: 'Current Value',
    percentChange: '34%',
    isPositive: true,
    chartData: [
      /* chart data */
    ],
  },
  {
    id: '2',
    title: 'FinTech Advantage Fund',
    currentValue: '$19.84',
    currentValueText: 'Current Value',
    percentChange: '-12%',
    isPositive: false,
    chartData: [
      /* chart data */
    ],
  },
  {
    id: '3',
    title: 'Global Equity Fund',
    currentValue: '$25.56',
    currentValueText: 'Current Value',
    percentChange: '8%',
    isPositive: true,
    chartData: [
      /* chart data */
    ],
  },
  {
    id: '4',
    title: 'Health Innovation Fund',
    currentValue: '$18.44',
    currentValueText: 'Current Value',
    percentChange: '5%',
    isPositive: true,
    chartData: [
      /* chart data */
    ],
  },
  {
    id: '5',
    title: 'Tech Giants Fund',
    currentValue: '$32.10',
    currentValueText: 'Current Value',
    percentChange: '-7%',
    isPositive: false,
    chartData: [
      /* chart data */
    ],
  },
  {
    id: '6',
    title: 'Clean Energy Fund',
    currentValue: '$14.92',
    currentValueText: 'Current Value',
    percentChange: '11%',
    isPositive: true,
    chartData: [
      /* chart data */
    ],
  },
  {
    id: '7',
    title: 'Emerging Markets Fund',
    currentValue: '$23.77',
    currentValueText: 'Current Value',
    percentChange: '-9%',
    isPositive: false,
    chartData: [
      /* chart data */
    ],
  },
  {
    id: '8',
    title: 'Real Estate Growth Fund',
    currentValue: '$27.60',
    currentValueText: 'Current Value',
    percentChange: '3%',
    isPositive: true,
    chartData: [
      /* chart data */
    ],
  },
  {
    id: '9',
    title: 'Infrastructure Fund',
    currentValue: '$21.33',
    currentValueText: 'Current Value',
    percentChange: '-5%',
    isPositive: false,
    chartData: [
      /* chart data */
    ],
  },
  {
    id: '10',
    title: 'AI & Robotics Fund',
    currentValue: '$30.75',
    currentValueText: 'Current Value',
    percentChange: '14%',
    isPositive: true,
    chartData: [
      /* chart data */
    ],
  },
  {
    id: '11',
    title: 'Healthcare Leaders Fund',
    currentValue: '$22.43',
    currentValueText: 'Current Value',
    percentChange: '6%',
    isPositive: true,
    chartData: [
      /* chart data */
    ],
  },
  {
    id: '12',
    title: 'Digital Transformation Fund',
    currentValue: '$29.58',
    currentValueText: 'Current Value',
    percentChange: '-3%',
    isPositive: false,
    chartData: [
      /* chart data */
    ],
  },
  {
    id: '13',
    title: 'Green Planet Fund',
    currentValue: '$16.67',
    currentValueText: 'Current Value',
    percentChange: '10%',
    isPositive: true,
    chartData: [
      /* chart data */
    ],
  },
  {
    id: '14',
    title: 'Innovation Leaders Fund',
    currentValue: '$24.12',
    currentValueText: 'Current Value',
    percentChange: '-8%',
    isPositive: false,
    chartData: [
      /* chart data */
    ],
  },
  {
    id: '15',
    title: 'Global Infrastructure Fund',
    currentValue: '$19.78',
    currentValueText: 'Current Value',
    percentChange: '4%',
    isPositive: true,
    chartData: [
      /* chart data */
    ],
  },
  {
    id: '16',
    title: 'Renewable Resources Fund',
    currentValue: '$13.90',
    currentValueText: 'Current Value',
    percentChange: '-2%',
    isPositive: false,
    chartData: [
      /* chart data */
    ],
  },
  {
    id: '17',
    title: 'Cybersecurity Growth Fund',
    currentValue: '$26.40',
    currentValueText: 'Current Value',
    percentChange: '7%',
    isPositive: true,
    chartData: [
      /* chart data */
    ],
  },
  {
    id: '18',
    title: 'Global Consumer Fund',
    currentValue: '$28.32',
    currentValueText: 'Current Value',
    percentChange: '-6%',
    isPositive: false,
    chartData: [
      /* chart data */
    ],
  },
  {
    id: '19',
    title: 'Biotech Innovation Fund',
    currentValue: '$22.88',
    currentValueText: 'Current Value',
    percentChange: '9%',
    isPositive: true,
    chartData: [
      /* chart data */
    ],
  },
  {
    id: '20',
    title: 'Global Tech Fund',
    currentValue: '$31.50',
    currentValueText: 'Current Value',
    percentChange: '2%',
    isPositive: true,
    chartData: [
      /* chart data */
    ],
  },
];

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

  const HeaderComponents = () => (
    <>
      <HeaderComp
        title={strings.Props}
        bellHandler={bellHandler}
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

  const bellHandler = () => {};
  const settingHandler = () => {};
  const searchHandler = text => {};

  return (
    <WrapperContainer>
      <FlatList
        data={data}
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
                <TouchableOpacity
                  style={styles.iconButton}
                  onPress={() => {
                    setModalVisible(false);
                    navigation.navigate(navigationStrings.Analysis);
                  }}>
                  <Icon
                    name={'share-all'}
                    color={colors.white}
                    size={moderateScale(30)}
                  />
                </TouchableOpacity>
              </View>
              <TouchableOpacity style={styles.buyButton}>
                <Text style={styles.buyButtonText}>Buy</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ModalComp>
    </WrapperContainer>
  );
}
