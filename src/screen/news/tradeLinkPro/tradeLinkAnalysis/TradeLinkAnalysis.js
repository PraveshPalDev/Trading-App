import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import WrapperContainer from '../../../../components/WrapperContainer';
import styles from './styles';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import {moderateScale, textScale} from '../../../../styles/responsiveSize';
import HeaderComp from '../../../../components/HeaderComp';
import strings from '../../../../constants/lang';
import TextComp from '../../../../components/TextComp';
import Speedometer from '../../../../components/Speedometer';
import CurvedText from '../../../../components/CurvedText';
import colors from '../../../../styles/colors';
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
} from 'accordion-collapse-react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import moment from 'moment';
import {findScore} from '../../../../utils/Date';

export default function TradeLinkAnalysis({route}) {
  const {...item} = route.params || {};
  const [isLocked, setIsLocked] = useState(false);
  const [activeAccordion, setActiveAccordion] = useState(null);
  const [time, setTime] = useState(moment().format('hh:mm A'));
  const [filteredData, setFilteredData] = useState({
    TFFilterData: [],
    MRFilterData: [],
    VolFilterData: [],
  });

  const accordionData = [
    {
      id: 1,
      title: 'Trend Following (TF)',
      data: filteredData?.TFFilterData,
    },

    {
      id: 2,
      title: 'Mean Reversion (MR)',
      data: filteredData?.MRFilterData,
    },
    {
      id: 3,
      title: 'Volume Analysis (Vol)',
      data: filteredData?.VolFilterData,
    },
  ];

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(moment().format('hh:mm A'));
    }, 1000);

    filterAllData();

    return () => clearInterval(intervalId);
  }, []);

  const filterAllData = () => {
    const {TFFilterData, MRFilterData, VolFilterData} = item?.signal.reduce(
      (acc, x) => {
        if (x?.ticker === item?.ticker) {
          if (x.group === 'TF') acc.TFFilterData.push(x);
          else if (x.group === 'MR') acc.MRFilterData.push(x);
          else if (x.group === 'Vol') acc.VolFilterData.push(x);
        }
        return acc;
      },
      {TFFilterData: [], MRFilterData: [], VolFilterData: []},
    );

    setFilteredData({TFFilterData, MRFilterData, VolFilterData});
  };

  const toggleAccordion = id => {
    setActiveAccordion(activeAccordion === id ? null : id);
  };

  const getColorStyle = value => {
    const stringValue = value?.toString();
    if (stringValue?.includes('-')) return styles.redText;
    if (stringValue === '0%' || stringValue === '0') return styles.grayText;
    return styles.greenText;
  };

  const RenderLockCard = ({isLocked, setIsLocked}) => {
    return (
      <TouchableOpacity
        style={[
          styles.container,
          isLocked ? styles.lockedCard : styles.unlockedCard,
          isLocked ? {backgroundColor: colors.whiteOpacity70} : null,
          {padding: 0},
        ]}
        // onPress={() => setIsLocked(!isLocked)}
        activeOpacity={0.9}>
        {isLocked ? (
          <View style={styles.lockedContent}>
            <Icon
              name="lock"
              size={moderateScale(40)}
              color="#555"
              style={styles.lockIcon}
            />
            <TextComp style={styles.lockedText}>{strings.TabLock}</TextComp>
          </View>
        ) : (
          <>
            {/* Header Section */}
            <View style={styles.cardContainer}>
              <View style={styles.header}>
                <TouchableOpacity style={styles.button}>
                  <Text style={styles.buttonText}>{item?.grTicker}</Text>
                </TouchableOpacity>
                <Text style={styles.price}>{`€ ${item?.price}`}</Text>
                <Icon
                  name="info"
                  size={moderateScale(28)}
                  color={colors.gray}
                />
              </View>

              {/* Company Info */}
              <Text style={styles.companyName}>
                Wool industry Tria Alfa S.A.
              </Text>

              {/* Metrics Section */}
              <View style={styles.metrics}>
                <Text
                  style={[
                    styles.metricText,
                    getColorStyle(item?.change),
                  ]}>{`${item?.change}%`}</Text>
                <Text style={[styles.metricText, getColorStyle(item?.ytd)]}>
                  {item?.ytd}
                </Text>
                <Text style={[styles.metricText, getColorStyle(item?.oneYear)]}>
                  {`${parseFloat(item?.oneYear).toFixed(2)}`}
                </Text>
              </View>
              <View style={styles.metricsLabels}>
                <Text style={styles.metricLabel}>Μεταβολή (%)</Text>
                <Text style={styles.metricLabel}>YTD</Text>
                <Text style={styles.metricLabel}>1 Έτος (%)</Text>
              </View>

              <SpeedoMeterComponents
                isLocked={isLocked}
                setIsLocked={setIsLocked}
                data={item}
              />

              {/* Dummy Clock */}
              <Text style={styles.clock}>🕒 {time}</Text>
            </View>
          </>
        )}
      </TouchableOpacity>
    );
  };

  const SpeedoMeterComponents = data => {
    const getSignalValueFromLabel = label => {
      if (label === 'Hold') return 50;
      if (label === 'Sell') return 20;
      if (label === 'Buy') return 80;
      return 50;
    };

    return (
      <>
        <View style={styles.meterContainer2}>
          <CurvedText
            text={strings.TrendFollowing}
            pathId="trendPath"
            arcRadius={moderateScale(70)}
            fontSize={textScale(13)}
            startOffset="25%"
          />
          <CurvedText
            text={strings.MeanReversion}
            pathId="trendPath"
            arcRadius={moderateScale(70)}
            fontSize={textScale(13)}
            startOffset="25%"
          />
          <CurvedText
            text={strings.Volume}
            pathId="trendPath"
            arcRadius={moderateScale(70)}
            fontSize={textScale(13)}
            startOffset="38%"
          />
        </View>
        <View style={styles.meterContainer}>
          <Speedometer
            value={getSignalValueFromLabel(data?.data?.trendValue)}
          />
          <Speedometer value={getSignalValueFromLabel(data?.data?.meanValue)} />
          <Speedometer
            value={getSignalValueFromLabel(data?.data?.volumeValue)}
          />
        </View>
      </>
    );
  };

  const renderRow = ({item}) => {
    return (
      <View style={{...styles.row}}>
        <Text style={{...styles.cell}}>{item.indicator}</Text>
        <Text
          style={[
            styles.cell,
            {
              color:
                item.signal === 1
                  ? 'green'
                  : item.signal === -1
                  ? 'red'
                  : 'orange',
              paddingRight: moderateScale(80),
            },
          ]}>
          {item.signal === 1 ? 'Buy' : item.signal === -1 ? 'Sell' : 'Hold'}
        </Text>

        <TouchableOpacity
          style={{...styles.infoButton, marginRight: moderateScale(10)}}>
          <Text style={styles.infoText}>i</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const RenderTradingComps = ({item}) => {
    const buyCount = item?.data?.filter(data => data.signal === 1).length;
    const sellCount = item?.data?.filter(data => data.signal === -1).length;
    const holdCount = item?.data?.filter(data => data.signal === 0).length;
    const totalCount = item?.data?.length;
    const AccordingTableHeading = ['Δείκτης', 'Signal', 'Περιγραφή'];
    const score = `${Math.round(
      findScore(buyCount, sellCount, holdCount, totalCount),
    )}`;
    const getScoreColor = (buyCount, sellCount, holdCount) => {
      if (buyCount > sellCount && buyCount > holdCount) return '#5be12c';
      if (sellCount > buyCount && sellCount > holdCount) return '#ea4228';
      if (holdCount >= buyCount && holdCount >= sellCount) return '#f5cd19';
      if (sellCount === buyCount) return '#f5cd19';
      return '#ea4228';
    };
    let stats = [
      {label: `Total : ${totalCount}`, color: '#2C3E50'},
      {label: `Buy : ${buyCount}`, color: '#7AC74F'},
      {label: `Sell : ${sellCount}`, color: '#E74C3C'},
      {label: `Hold : ${holdCount}`, color: '#F1C40F'},
      {
        label: `Score : ${score}%`,
        color: getScoreColor(buyCount, sellCount, holdCount),
      },
    ];
    // here remove the hold button in Vol tabs
    if (item?.data[0]?.group === 'Vol') {
      stats = stats?.filter(stat => stat?.label !== `Hold : ${holdCount}`);
    }

    return (
      <View style={styles.cardContainer}>
        <View style={styles.accordionStyles} key={item.id}>
          <Collapse
            isActive={activeAccordion === item.id}
            onToggle={() => toggleAccordion(item.id)}
            style={styles.collapse}>
            <CollapseHeader>
              <View style={styles.header}>
                <Text style={styles.headerText}>{item.title}</Text>
                {activeAccordion === item.id ? (
                  <Icon2
                    name="arrow-up-drop-circle"
                    size={moderateScale(30)}
                    color={colors.black}
                  />
                ) : (
                  <Icon2
                    name="arrow-down-drop-circle"
                    size={moderateScale(30)}
                    color={colors.black}
                  />
                )}
              </View>
            </CollapseHeader>

            <CollapseBody>
              <View style={styles.accordionButtonContainer}>
                {stats?.map((stat, index) => {
                  return (
                    <TouchableOpacity
                      style={{
                        ...styles.accordionButtonContainerStyles,
                        backgroundColor: stat.color,
                      }}
                      activeOpacity={0.7}
                      key={index}>
                      <Text style={styles.accordionButtonContainerText}>
                        {stat.label}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>

              <View style={styles.tableHeader}>
                {AccordingTableHeading.map((heading, index) => (
                  <Text
                    key={index}
                    style={[styles.tableHeaderText, styles.headerCell]}>
                    {heading}
                  </Text>
                ))}
              </View>

              <FlatList
                data={item?.data}
                renderItem={renderRow}
                keyExtractor={(item, index) => index.toString()}
              />
            </CollapseBody>
          </Collapse>
        </View>
      </View>
    );
  };

  return (
    <WrapperContainer>
      <HeaderComp
        backBtn={true}
        title={strings.TradeLinkAnalysis}
        rightBellIconVisible={false}
        rightSettingIconVisible={false}
        titleStyle={styles.headerStyles}
      />

      <KeyboardAwareScrollView
        style={{marginBottom: moderateScale(25)}}
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled={false}>
        {/* here speed meters container */}
        <RenderLockCard isLocked={isLocked} setIsLocked={setIsLocked} />

        {/* here according */}
        <TouchableOpacity
          style={[
            isLocked ? styles.container : styles.cardSubContainer,
            isLocked ? styles.lockedCard : styles.unlockedCard,
            {
              backgroundColor: isLocked ? colors.whiteOpacity70 : null,
            },
          ]}
          // onPress={() => setIsLocked(!isLocked)}
          activeOpacity={0.9}>
          {isLocked ? (
            <View style={styles.lockedContent}>
              <Icon
                name="lock"
                size={moderateScale(40)}
                color="#555"
                style={styles.lockIcon}
              />
              <TextComp style={styles.lockedText}>{strings.TabLock}</TextComp>
            </View>
          ) : (
            <FlatList
              data={accordionData}
              renderItem={RenderTradingComps}
              keyExtractor={item => item.id.toString()}
            />
          )}
        </TouchableOpacity>
      </KeyboardAwareScrollView>
    </WrapperContainer>
  );
}
