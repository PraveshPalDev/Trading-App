import {
  ActivityIndicator,
  FlatList,
  KeyboardAvoidingView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import WrapperContainer from '../../../../../components/WrapperContainer';
import styles from './styles';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import {moderateScale, width} from '../../../../../styles/responsiveSize';
import HeaderComp from '../../../../../components/HeaderComp';
import strings from '../../../../../constants/lang';
import colors from '../../../../../styles/colors';
import SearchComp from '../../../../../components/SearchComp';
import {
  GetAllDailyQuotes,
  GetAllSignal,
  GetAllStocks,
} from '../../../../../redux/actions/news';
import {calcData, getMostFrequentSignal} from '../../../../../utils/Date';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import navigationStrings from '../../../../../navigation/navigationStrings';

export default function TradeLinkTable() {
  const [isLocked, setIsLocked] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [signal, setSignal] = useState([]);
  const navigation = useNavigation();

  useFocusEffect(
    useCallback(() => {
      fetchDataAndMerge();
      fetchAllSignal();
    }, []),
  );

  useEffect(() => {
    if (searchText) {
      const filtered = data?.filter(
        item =>
          item?.name?.toLowerCase().includes(searchText?.toLowerCase()) ||
          item?.ticker?.toLowerCase().includes(searchText?.toLowerCase()),
      );
      setFilteredData(filtered);
    } else {
      setFilteredData(data);
    }
  }, [searchText, data]);

  const fetchAllStock = async () => {
    try {
      const res = await GetAllStocks();
      return res;
    } catch (error) {
      console.log('Error fetching stock details =>', error);
      return [];
    }
  };

  const fetchDailyQuotes = async () => {
    try {
      const res = await GetAllDailyQuotes();
      return res;
    } catch (error) {
      console.log('Error fetching daily quotes =>', error);
      return [];
    }
  };

  const fetchDataAndMerge = async () => {
    setLoading(true);
    try {
      // Fetch both datasets in parallel
      const [stocks, dailyQuotes] = await Promise.all([
        fetchAllStock(),
        fetchDailyQuotes(),
      ]);

      // Merge data based on ticker
      const mergedData = stocks?.map(stock => {
        const dailyQuote = dailyQuotes.find(
          quote => quote?.ticker === stock?.ticker,
        );
        return {
          ...stock,
          ...dailyQuote,
        };
      });

      setData(mergedData);
    } catch (error) {
      console.log('Error merging data =>', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAllSignal = async () => {
    setLoading(true);
    try {
      const res = await GetAllSignal();
      if (res) {
        setLoading(false);
        setSignal(res);
      }
    } catch (error) {
      setLoading(false);
      console.log('error for signal api =>', error);
    }
  };

  // render table here comps
  const renderHeader = () => (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={{flex: 1}}>
      <View style={styles.searchContainer}>
        <Icon2
          name="clock-time-four"
          size={moderateScale(35)}
          color={colors.black}
          style={styles.icon}
        />
        <SearchComp
          value={searchText}
          searchHandler={searchHandler}
          placeholderText={strings.SearchText}
          containerStyle={{width: width / 1.3}}
        />
      </View>

      <View style={styles.headerRow}>
        {[
          'Μετοχή',
          'Μεταβολή (%)',
          'YTD (%)',
          'Τυπ. Απόκλιση (%)',
          'Trend',
          'Reversion',
        ].map((header, index) => (
          <Text key={index} style={styles.headerCell}>
            {header}
          </Text>
        ))}
      </View>
    </KeyboardAvoidingView>
  );

  const renderTableRow = ({item, index}) => {
    const calculateYTD = `${Math.floor(calcData(item?.ytd, item?.price))}%`;

    // Helper function to determine Speedometer value based on signal
    const getSignalValue = signal => {
      if (signal == 0) return 'Hold';
      if (signal == -1) return 'Sell';
      if (signal == 1) return 'Buy';
      return 'Hold';
    };

    // Fetch signals for each metric
    const TrendFollowingSignal = getMostFrequentSignal(
      signal.filter(x => x.ticker == item.ticker),
      'TF',
    );
    const MeanReversionSignal = getMostFrequentSignal(
      signal.filter(x => x.ticker == item.ticker),
      'MR',
    );
    const VolumeSignal = getMostFrequentSignal(
      signal.filter(x => x.ticker == item.ticker),
      'Vol',
    );

    // Map signals to Speedometer values
    const trendValue = getSignalValue(TrendFollowingSignal);
    const meanValue = getSignalValue(MeanReversionSignal);
    const volumeValue = getSignalValue(VolumeSignal);
    const meterValue = {
      trendValue,
      meanValue,
      volumeValue,
    };

    const pressHandler = item => {
      const updatedItem = {
        ...item,
        ytd: calculateYTD,
        ...meterValue,
        signal: signal,
      };

      navigation.navigate(navigationStrings.TradeLinkAnalysis, updatedItem);
    };

    return (
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => pressHandler(item)}
        style={{
          ...styles.row,
          backgroundColor: index % 2 ? '' : colors.grayOpacity10,
        }}>
        <Text style={styles.cell}>{item?.grTicker}</Text>
        <Text style={[styles.cell, getColorStyle(item.change)]}>
          {`${item?.change}%`}
        </Text>
        <Text style={[styles.cell, getColorStyle(calculateYTD)]}>
          {calculateYTD}
        </Text>
        <Text style={styles.cell}>{parseFloat(item?.vol)?.toFixed(2)}%</Text>

        <Text style={[styles.cell, styles[getTrendStyle(trendValue)]]}>
          {trendValue}
        </Text>
        <Text style={[styles.cell, styles[getReversionStyle(meanValue)]]}>
          {meanValue}
        </Text>
      </TouchableOpacity>
    );
  };

  const getColorStyle = value => {
    const stringValue = value.toString();
    if (stringValue.includes('-')) return styles.redText;
    if (stringValue === '0%' || stringValue === '0') return styles.grayText;
    return styles.greenText;
  };

  const getTrendStyle = trend =>
    trend === 'Buy' ? 'greenBackground' : 'redBackground';

  const getReversionStyle = reversion =>
    reversion === 'Buy'
      ? 'greenBackground'
      : reversion === 'Hold'
      ? 'yellowBackground'
      : 'redBackground';

  const RenderTableCard = ({isLocked, setIsLocked}) => {
    return (
      // <TouchableOpacity
      //   style={[
      //     styles.container,
      //     isLocked ? styles.lockedCard : styles.unlockedCard,
      //     isLocked ? {backgroundColor: colors.whiteOpacity70} : null,
      //     {padding: 0},
      //   ]}
      //   // onPress={() => setIsLocked(!isLocked)}
      //   activeOpacity={0.9}>
      //   {isLocked ? (
      //     <View style={styles.lockedContent}>
      //       <Icon
      //         name="lock"
      //         size={moderateScale(40)}
      //         color="#555"
      //         style={styles.lockIcon}
      //       />
      //       <TextComp style={styles.lockedText}>{strings.TabLock}</TextComp>
      //     </View>
      //   ) : (
      <View
        style={{...styles.cardContainer, marginHorizontal: moderateScale(12)}}>
        <FlatList
          ListHeaderComponent={renderHeader}
          data={filteredData}
          renderItem={renderTableRow}
          keyExtractor={(item, index) => index.toString()}
          nestedScrollEnabled={true}
          showsVerticalScrollIndicator={false}
        />
      </View>
      // )}
      // </TouchableOpacity>
    );
  };

  const searchHandler = text => {
    setSearchText(text);
  };

  return (
    <WrapperContainer>
      <HeaderComp
        backBtn={true}
        title={strings.TradeLinkTable}
        rightBellIconVisible={false}
        rightSettingIconVisible={false}
        titleStyle={styles.headerStyles}
      />

      {loading ? (
        <ActivityIndicator
          size={'large'}
          color={colors.blue}
          style={styles.loading}
        />
      ) : (
        <RenderTableCard isLocked={isLocked} setIsLocked={setIsLocked} />
      )}
    </WrapperContainer>
  );
}
