import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import React, {memo, useCallback, useState} from 'react';
import WrapperContainer from '../../../../components/WrapperContainer';
import styles from './styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {moderateScale} from '../../../../styles/responsiveSize';
import strings from '../../../../constants/lang';
import TextComp from '../../../../components/TextComp';
import SearchComp from '../../../../components/SearchComp';
import colors from '../../../../styles/colors';
import HeaderComp from '../../../../components/HeaderComp';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import ModalComp from '../../../../components/ModalComp';

export default function ShareList() {
  const [activeCard, setActiveCard] = useState(0);
  const [isLocked, setIsLocked] = useState(true);
  const [isVisible, setIsVisible] = useState(false);

  const mockData = [
    {
      stock: 'AAPL',
      price: '150.00',
      oneYearPercent: '12.5%',
      changePercent: '0.5%',
      avgDailyVolume: '80M',
      marketCap: '2.5T',
    },
    {
      stock: 'MSFT',
      price: '320.00',
      oneYearPercent: '10.8%',
      changePercent: '-0.2%',
      avgDailyVolume: '35M',
      marketCap: '2.4T',
    },
    {
      stock: 'GOOGL',
      price: '2800.00',
      oneYearPercent: '15.0%',
      changePercent: '1.2%',
      avgDailyVolume: '25M',
      marketCap: '1.9T',
    },
  ];

  const tableHead = [
    {
      id: 1,
      columnName: 'Μετοχή',
    },
    {
      id: 2,
      columnName: 'Μετοχή',
    },
    {
      id: 3,
      columnName: 'Τιμή',
    },
    {
      id: 4,
      columnName: `1'Ετος (%)`,
    },
    {
      id: 5,
      columnName: 'Μεταβολή (%)',
    },
    {
      id: 6,
      columnName: 'Μέσος Ημερήσιος Όγκος',
    },
    {
      id: 7,
      columnName: 'Κεφαλαιοποίηση (εκ)',
    },
  ];

  const charts = [
    {title: 'Εταιρείες Τουρισμού', footer: '-5%'},
    {title: 'Εταιρείες Υποδομών και Παραχωρήσεων', footer: '24%'},
    {title: 'Εταιρείες Τεχνολογίας', footer: '12%'},
    {title: 'Εταιρείες Υγείας', footer: '-8%'},
    {title: 'Εταιρείες Ενέργειας', footer: '18%'},
    {title: 'Εταιρείες Μεταφορών', footer: '-3%'},
    {title: 'Εταιρείες Λιανικής Πώλησης', footer: '9%'},
    {title: 'Εταιρείες Χρηματοοικονομικών Υπηρεσιών', footer: '-10%'},
  ];

  const CalendarComp = ({activeCard, setActiveCard, isLocked, setIsLocked}) => {
    const chartHandler = useCallback(
      cardIndex => {
        setActiveCard(cardIndex);
      },
      [setActiveCard],
    );

    return (
      <TouchableOpacity
        style={[
          styles.container,
          isLocked ? styles.lockedCard : styles.unlockedCard,
          isLocked ? {backgroundColor: 'rgba(255, 255, 255, 0.7)'} : null,
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
            <View style={styles.mainContainer}>
              <View style={styles.mainSubContainer}>
                <View style={{flex: 3}}>
                  <TextComp style={styles.leftText}>
                    {strings.StockList}
                  </TextComp>
                </View>
                <View style={styles.headerRightContainer}>
                  <SearchComp
                    containerStyle={styles.searchContainer}
                    inputStyle={{width: '100%'}}
                  />
                  <TouchableOpacity
                    style={styles.infoContainer}
                    activeOpacity={0.7}
                    onPress={() => {
                      setIsVisible(true);
                    }}>
                    <Icon
                      name="information-variant"
                      color={colors.black}
                      size={moderateScale(28)}
                    />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.headerContainer}>
                <ChartSection
                  activeCard={activeCard}
                  chartHandler={chartHandler}
                />
              </View>
            </View>
          </>
        )}
      </TouchableOpacity>
    );
  };

  const TableComp = ({isLocked, setIsLocked}) => {
    return (
      <TouchableOpacity
        style={[
          styles.container,
          isLocked ? styles.lockedCard : styles.unlockedCard,
          isLocked ? {backgroundColor: 'rgba(255, 255, 255, 0.7)'} : null,
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
            <View style={styles.dateMainContainer}>
              <DataTable />
            </View>
          </>
        )}
      </TouchableOpacity>
    );
  };

  const DataTable = memo(() => {
    return (
      <View style={styles.dataTableContainer}>
        <View style={styles.dataTableRow}>
          {tableHead.map(item => (
            <Text style={styles.dataTableCell} key={item?.id}>
              {item?.columnName}
            </Text>
          ))}
        </View>

        {/* Table Rows */}
        {mockData?.map((item, index) => (
          <View style={styles.dataTableRow} key={index}>
            <Text style={styles.dataTableCell2}>{item.stock}</Text>
            <Text style={styles.dataTableCell2}>{item.price}</Text>
            <Text
              style={[
                styles.dataTableCell2,
                {
                  color: item.oneYearPercent.startsWith('-')
                    ? colors.red
                    : colors.lightGreen2,
                },
              ]}>
              {item?.oneYearPercent}
            </Text>
            <Text
              style={[
                styles.dataTableCell2,
                {
                  color: item.changePercent.startsWith('-')
                    ? colors.red
                    : colors.lightGreen2,
                },
              ]}>
              {item?.changePercent}
            </Text>
            <Text style={styles.dataTableCell2}>{item.avgDailyVolume}</Text>
            <Text style={styles.dataTableCell2}>{item.marketCap}</Text>
          </View>
        ))}
      </View>
    );
  });

  const ChartSection = memo(({activeCard, chartHandler}) => {
    return (
      <ScrollView horizontal>
        <View style={styles.chartSectionContainer}>
          {charts?.map((chart, index) => (
            <TouchableOpacity
              key={index}
              activeOpacity={0.7}
              onPress={() => chartHandler(index)}
              style={[
                styles.chartContainer,
                activeCard === index ? styles.activeCard : styles.inactiveCard,
              ]}>
              <View style={styles.aboveCardContainer}>
                <Icon
                  name="image"
                  size={moderateScale(30)}
                  color={colors.black}
                />
                <View
                  style={[
                    styles.cardUpperContainer,
                    chart.footer.startsWith('-')
                      ? styles.negativeBackground
                      : styles.positiveBackground,
                  ]}>
                  <Text
                    style={[
                      styles.footerText,
                      {
                        color: chart.footer.startsWith('-')
                          ? colors.white
                          : colors.black,
                      },
                    ]}>
                    {chart.footer}
                  </Text>
                </View>
              </View>
              <View style={styles.chartContent}>
                {/* Add chart content here */}
              </View>
              <View style={styles.titleContainer}>
                <Text style={styles.chartFooter}>{chart.title}</Text>
                <View
                  style={[
                    styles.footerContainer,
                    chart.footer.startsWith('-')
                      ? styles.negativeBackground
                      : styles.positiveBackground,
                  ]}>
                  <Text
                    style={[
                      styles.footerText,
                      {
                        color: chart.footer.startsWith('-')
                          ? colors.white
                          : colors.black,
                      },
                    ]}>
                    {chart.footer}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    );
  });

  const ContentComp = ({isLocked, setIsLocked}) => {
    return (
      <TouchableOpacity
        style={[
          styles.container,
          isLocked ? styles.lockedCard : styles.unlockedCard,
          isLocked ? {backgroundColor: 'rgba(255, 255, 255, 0.7)'} : null,
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
          <ScrollView style={styles.CompanyContainer}>
            <View style={styles.contentContainer}>
              <TextComp style={styles.title}>
                The Eriougia Tria Alfa (AAAK)
              </TextComp>
              <TextComp style={styles.description}>
                The Eriougia Tria Alfa (AAAK) is a company that provides
                underwater services. The company was founded in Greek work
                stations and operates since 1927. The company is specialized in
                the construction of underwater structures for marine
                infrastructure, as the anchorages. The largest shareholder of
                the company, in agreement with the MRFY statements, is the Greek
                Navy and in the first half of 2023 the company announced
                'increased activity' in the works from the existing projects.
                The Tria Alfa SA company is engaged in the construction of
                underwater structures. The company's activities include depth,
                cladding and underwater welding of large and smaller scale.
              </TextComp>
            </View>
          </ScrollView>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <WrapperContainer>
      <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
        <HeaderComp
          backBtn={true}
          title={strings.StockList}
          rightBellIconVisible={false}
          rightSettingIconVisible={false}
          titleStyle={styles.headerStyles}
        />
        {/* here card compo */}
        <CalendarComp
          activeCard={activeCard}
          setActiveCard={setActiveCard}
          isLocked={isLocked}
          setIsLocked={setIsLocked}
        />

        <TableComp isLocked={isLocked} setIsLocked={setIsLocked} />
        <ContentComp isLocked={isLocked} setIsLocked={setIsLocked} />

        <ModalComp visible={isVisible} transparent animationType="fade">
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              {/* Header */}
              <View style={styles.modalHeader}>
                <Text style={styles.headerText}>
                  Αναβαθμίστε τις επενδύσεις σας με το Trade-Link Pro Picks.
                </Text>
                <TouchableOpacity onPress={() => setIsVisible(false)}>
                  <Icon
                    name="close-circle"
                    size={moderateScale(30)}
                    color={colors.red}
                  />
                </TouchableOpacity>
              </View>
              {/* Body */}
              <View style={styles.modalBody}>
                <Text style={styles.bodyText}>
                  Αναβαθμίστε τις επενδύσεις σας με το Trade-Link Pro Picks.
                  Αποκτήστε πρόσβαση σε επιμελημένες λίστες μετοχών, επιλεγμένες
                  με τη χρήση προηγμένων μοντέλων και γνώμης εμπειρογνωμόνων.
                  Βρείτε τις μετοχές που ταιριάζουν στο επενδυτικό σας προφίλ...
                </Text>
              </View>
            </View>
          </View>
        </ModalComp>
      </KeyboardAwareScrollView>
    </WrapperContainer>
  );
}
