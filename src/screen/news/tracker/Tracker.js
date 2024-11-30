import React, {useState, useCallback} from 'react';
import {View, FlatList, Text, TouchableOpacity} from 'react-native';
import WrapperContainer from '../../../components/WrapperContainer';
import HeaderComp from '../../../components/HeaderComp';
import {moderateScale, textScale} from '../../../styles/responsiveSize';
import strings from '../../../constants/lang';
import SearchComp from '../../../components/SearchComp';
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
} from 'accordion-collapse-react-native';
import colors from '../../../styles/colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './style';
import {Table, Row, Rows} from 'react-native-table-component';
import Speedometer from '../../../components/Speedometer';
import CurvedText from '../../../components/CurvedText';

const accordionData = [
  {
    id: 0,
    title: 'Alpha Growth Fund',
    details: [
      {
        name: 'Alexander Jackson',
        buttonText: 'See Report',
        buttonColor: 'blue',
        textColor: 'black',
      },
      {
        name: 'Alexander Jackson',
        buttonText: 'See Ticker',
        buttonColor: 'blue',
        textColor: 'blue',
      },
    ],
  },
  {
    id: 1,
    title: 'Beta Growth Fund',
    details: [
      {
        name: 'John Doe',
        buttonText: 'See Report',
        buttonColor: 'green',
        textColor: 'black',
      },
      {
        name: 'Jane Smith',
        buttonText: 'See Ticker',
        buttonColor: 'green',
        textColor: 'blue',
      },
    ],
  },
  {
    id: 2,
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
    id: 3,
    title: 'Delta Growth Fund',
    details: [
      {
        name: 'Chris Brown',
        buttonText: 'See Report',
        buttonColor: 'yellow',
        textColor: 'black',
      },
      {
        name: 'Sara White',
        buttonText: 'See Ticker',
        buttonColor: 'yellow',
        textColor: 'blue',
      },
    ],
  },
  {
    id: 4,
    title: 'Epsilon Growth Fund',
    details: [
      {
        name: 'David Black',
        buttonText: 'See Report',
        buttonColor: 'purple',
        textColor: 'black',
      },
      {
        name: 'Sophia Blue',
        buttonText: 'See Ticker',
        buttonColor: 'purple',
        textColor: 'blue',
      },
    ],
  },
  {
    id: 5,
    title: 'Zeta Growth Fund',
    details: [
      {
        name: 'Benjamin Gold',
        buttonText: 'See Report',
        buttonColor: 'orange',
        textColor: 'black',
      },
      {
        name: 'Olivia Silver',
        buttonText: 'See Ticker',
        buttonColor: 'orange',
        textColor: 'blue',
      },
    ],
  },
  {
    id: 6,
    title: 'Eta Growth Fund',
    details: [
      {
        name: 'Liam Green',
        buttonText: 'See Report',
        buttonColor: 'brown',
        textColor: 'black',
      },
      {
        name: 'Ella Blue',
        buttonText: 'See Ticker',
        buttonColor: 'brown',
        textColor: 'blue',
      },
    ],
  },
  {
    id: 7,
    title: 'Theta Growth Fund',
    details: [
      {
        name: 'Daniel Red',
        buttonText: 'See Report',
        buttonColor: 'gray',
        textColor: 'black',
      },
      {
        name: 'Mia Pink',
        buttonText: 'See Ticker',
        buttonColor: 'gray',
        textColor: 'blue',
      },
    ],
  },
  {
    id: 8,
    title: 'Iota Growth Fund',
    details: [
      {
        name: 'James Silver',
        buttonText: 'See Report',
        buttonColor: 'blue',
        textColor: 'black',
      },
      {
        name: 'Isabella Gold',
        buttonText: 'See Ticker',
        buttonColor: 'blue',
        textColor: 'blue',
      },
    ],
  },
  {
    id: 9,
    title: 'Kappa Growth Fund',
    details: [
      {
        name: 'Liam Brown',
        buttonText: 'See Report',
        buttonColor: 'green',
        textColor: 'black',
      },
      {
        name: 'Zoe White',
        buttonText: 'See Ticker',
        buttonColor: 'green',
        textColor: 'blue',
      },
    ],
  },
];

const tableHead = ['Ticker', 'AAAK.AT', 'ASCO.AT', 'ALPHA.AT', 'AIA.AT'];
const tableData = [
  ['Today', '1.5%', '-1%', '1.5%', '-1%'],
  ['YTD', '7.1%', '7.1%', '7.1%', '7.1%'],
  ['Volatility', '43.59%', '43.59%', '43.59%', '43.59%'],
  ['Reversion', 'Buy', 'Buy', 'Buy', 'Buy'],
  ['Trend', 'Buy', 'Buy', 'Buy', 'Buy'],
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

export default function Tracker() {
  const [activeAccordion, setActiveAccordion] = useState(null);

  const toggleAccordion = id => {
    setActiveAccordion(activeAccordion === id ? null : id);
  };

  const reportHandler = item => {
    if (item.buttonText === 'See Report') {
      alert('coming soon');
    } else {
      //   navigation.navigate(navigationStrings.)
    }
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

  const renderAccordionItem = useCallback(
    ({item}) => (
      <View style={styles.accordionStyles} key={item.id}>
        <Collapse
          isActive={activeAccordion === item.id}
          onToggle={() => toggleAccordion(item.id)}
          style={styles.collapse}>
          <CollapseHeader>
            <View style={styles.header}>
              <Text style={styles.headerText}>{item.title}</Text>
              {activeAccordion === item.id ? (
                <Icon
                  name="arrow-up-drop-circle"
                  size={moderateScale(30)}
                  color={colors.black}
                />
              ) : (
                <Icon
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
              {['Indicator', 'Signal', 'Info'].map(item => (
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
    ),
    [activeAccordion],
  );

  const renderTableData = () => {
    return (
      <View style={styles.tableContainer}>
        <Table borderStyle={styles.tableBorder}>
          <Row
            data={tableHead.map((item, index) => (
              <Text
                key={index}
                style={[
                  styles.headText,
                  index === 0 && {
                    ...styles.headText,
                    fontWeight: 'bold',
                  },
                ]}>
                {item}
              </Text>
            ))}
            style={styles.head}
          />
          <Rows
            data={tableData.map((row, rowIndex) =>
              row.map((cell, cellIndex) => {
                const isButtonRow =
                  rowIndex === tableData.length - 2 ||
                  rowIndex === tableData.length - 1;

                const buttonStyles =
                  isButtonRow && cellIndex !== 0
                    ? styles.greenButtonContainer
                    : {};

                const isTodayRow = rowIndex === 0;
                const isValueCell = cellIndex > 0;
                const isNegative =
                  isTodayRow &&
                  isValueCell &&
                  parseFloat(cell.replace('%', '')) < 0;

                return (
                  <Text
                    key={cellIndex}
                    style={[
                      styles.text,
                      cellIndex === 0 && {
                        ...styles.text,
                        fontWeight: 'bold',
                      },
                      isTodayRow &&
                        isValueCell && {
                          color: isNegative ? 'red' : 'green',
                        },
                      buttonStyles,
                    ]}>
                    {cell}
                  </Text>
                );
              }),
            )}
          />
        </Table>
      </View>
    );
  };

  const HeaderComponents = () => {
    return (
      <>
        <SearchComp placeholderText={strings.SearchText} />
        {renderTableData()}
        <View style={styles.meterContainer2}>
          <CurvedText
            text={strings.TrendFollowing}
            pathId="trendPath"
            arcRadius={moderateScale(70)}
            fontSize={textScale(15)}
            startOffset="25%"
          />
          <CurvedText
            text={strings.MeanReversion}
            pathId="trendPath"
            arcRadius={moderateScale(70)}
            fontSize={textScale(15)}
            startOffset="25%"
          />
          <CurvedText
            text={strings.Volume}
            pathId="trendPath"
            arcRadius={moderateScale(70)}
            fontSize={textScale(15)}
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

  return (
    <WrapperContainer>
      <HeaderComp
        title={strings.Trending}
        notificationIcon
        bellIcon="bell-plus-outline"
        settingIcon="settings"
      />

      <FlatList
        ListHeaderComponent={HeaderComponents}
        data={accordionData}
        renderItem={renderAccordionItem}
        keyExtractor={item => item.id.toString()}
      />
    </WrapperContainer>
  );
}
