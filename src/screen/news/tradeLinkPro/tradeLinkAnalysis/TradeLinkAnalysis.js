import {
  FlatList,
  KeyboardAvoidingView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import WrapperContainer from '../../../../components/WrapperContainer';
import styles from './styles';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  moderateScale,
  textScale,
  width,
} from '../../../../styles/responsiveSize';
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
import {AccordingTableHeading} from '../../../../constants/static/staticData';
import SearchComp from '../../../../components/SearchComp';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const accordionData = [
  {
    id: 1,
    title: 'Gamma Growth Fund',
    details: [
      {
        name: 'Michael White',
        buttonText: 'See Report',
        buttonColor: 'red',
        textColor: 'black',
      },
      {
        name: 'Emily Green',
        buttonText: 'See Ticker',
        buttonColor: 'red',
        textColor: 'blue',
      },
    ],
  },
  {
    id: 2,
    title: 'Alpha Equity Fund',
    details: [
      {
        name: 'James Brown',
        buttonText: 'View Portfolio',
        buttonColor: 'blue',
        textColor: 'green',
      },
      {
        name: 'Sophia Black',
        buttonText: 'See Analysis',
        buttonColor: 'orange',
        textColor: 'purple',
      },
    ],
  },
  {
    id: 3,
    title: 'Delta Income Fund',
    details: [
      {
        name: 'William Grey',
        buttonText: 'View Summary',
        buttonColor: 'green',
        textColor: 'red',
      },
      {
        name: 'Isabella Rose',
        buttonText: 'Check Performance',
        buttonColor: 'pink',
        textColor: 'teal',
      },
    ],
  },
];
const stats = [
  {label: 'Total : 5', color: '#2C3E50'},
  {label: 'Buy : 2', color: '#7AC74F'},
  {label: 'Sell : 5', color: '#E74C3C'},
  {label: 'Hold : 0', color: '#F1C40F'},
  {label: 'Score : 100%', color: '#E74C3C'},
];
const signals = [
  {id: 1, indicator: 'EMA-30', signal: 'Sell'},
  {id: 2, indicator: 'EMA-30', signal: 'Sell'},
  {id: 3, indicator: 'EMA-30', signal: 'Sell'},
  {id: 4, indicator: 'EMA-30', signal: 'Sell'},
];

const tableData = [
  {
    stock: 'AAAK',
    change: '0%',
    ytd: '-37%',
    deviation: '43.72%',
    trend: 'Sell',
    reversion: 'Hold',
  },
  {
    stock: 'ACAG',
    change: '-0.37%',
    ytd: '-11%',
    deviation: '22.42%',
    trend: 'Sell',
    reversion: 'Hold',
  },
  {
    stock: 'ΑΔΜΗΕ',
    change: '-0.42%',
    ytd: '9%',
    deviation: '21.13%',
    trend: 'Buy',
    reversion: 'Hold',
  },
];

export default function TradeLinkAnalysis() {
  const [isLocked, setIsLocked] = useState(true);
  const [activeAccordion, setActiveAccordion] = useState(null);
  const [searchText, setSearchText] = useState('');

  const toggleAccordion = id => {
    setActiveAccordion(activeAccordion === id ? null : id);
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
        onPress={() => setIsLocked(!isLocked)}
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
                  <Text style={styles.buttonText}>AAAK</Text>
                </TouchableOpacity>
                <Text style={styles.price}>€ 4.48</Text>
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
                <Text style={[styles.metricText, styles.greenText]}>0%</Text>
                <Text style={[styles.metricText, styles.redText]}>-36.90%</Text>
                <Text style={[styles.metricText, styles.redText]}>-36.90%</Text>
              </View>
              <View style={styles.metricsLabels}>
                <Text style={styles.metricLabel}>Μεταβολή (%)</Text>
                <Text style={styles.metricLabel}>YTD</Text>
                <Text style={styles.metricLabel}>1 Έτος (%)</Text>
              </View>

              <SpeedoMeterComponents
                isLocked={isLocked}
                setIsLocked={setIsLocked}
              />

              {/* Dummy Clock */}
              <Text style={styles.clock}>🕒 12:45 PM</Text>
            </View>
          </>
        )}
      </TouchableOpacity>
    );
  };

  const RenderTableCard = ({isLocked, setIsLocked}) => {
    return (
      <TouchableOpacity
        style={[
          styles.container,
          isLocked ? styles.lockedCard : styles.unlockedCard,
          isLocked ? {backgroundColor: colors.whiteOpacity70} : null,
          {padding: 0},
        ]}
        onPress={() => setIsLocked(!isLocked)}
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
          <View style={styles.cardContainer}>
            <FlatList
              ListHeaderComponent={renderHeader}
              data={tableData}
              renderItem={renderTableRow}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        )}
      </TouchableOpacity>
    );
  };

  const SpeedoMeterComponents = () => {
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
          <Speedometer value={10} />
          <Speedometer value={60} />
          <Speedometer value={80} />
        </View>
      </>
    );
  };

  const renderRow = ({item}) => (
    <View style={styles.row}>
      <Text style={styles.cell}>{item.indicator}</Text>
      <Text style={styles.cell}>{item.signal}</Text>
      <TouchableOpacity style={styles.infoButton}>
        <Text style={styles.infoText}>i</Text>
      </TouchableOpacity>
    </View>
  );

  const RenderTradingComps = ({item}) => {
    return (
      <>
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
                  {stats?.map((stats, index) => (
                    <TouchableOpacity
                      style={{
                        ...styles.accordionButtonContainerStyles,
                        backgroundColor: stats.color,
                      }}
                      activeOpacity={0.7}
                      key={index}>
                      <Text style={styles.accordionButtonContainerText}>
                        {stats.label}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>

                <View style={styles.tableHeader}>
                  {AccordingTableHeading.map(item => (
                    <Text style={[styles.tableHeaderText, styles.headerCell]}>
                      {item}
                    </Text>
                  ))}
                </View>

                <FlatList
                  data={signals}
                  renderItem={renderRow}
                  keyExtractor={(item, index) => index.toString() || item}
                />
              </CollapseBody>
            </Collapse>
          </View>
        </View>
      </>
    );
  };

  const searchHandler = text => {
    setSearchText(text);
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

  const renderTableRow = ({item}) => (
    <View style={styles.row}>
      <Text style={styles.cell}>{item.stock}</Text>
      <Text style={[styles.cell, getColorStyle(item.change)]}>
        {item.change}
      </Text>
      <Text style={[styles.cell, getColorStyle(item.ytd)]}>{item.ytd}</Text>
      <Text style={styles.cell}>{item.deviation}</Text>
      <Text style={[styles.cell, styles[getTrendStyle(item.trend)]]}>
        {item.trend}
      </Text>
      <Text style={[styles.cell, styles[getReversionStyle(item.reversion)]]}>
        {item.reversion}
      </Text>
    </View>
  );

  const getColorStyle = value => {
    if (value.includes('-')) return styles.redText;
    if (value.includes('0%')) return styles.grayText;
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
          onPress={() => setIsLocked(!isLocked)}
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

        {/* here table container */}
        <RenderTableCard isLocked={isLocked} setIsLocked={setIsLocked} />
      </KeyboardAwareScrollView>
    </WrapperContainer>
  );
}
