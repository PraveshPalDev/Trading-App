import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Alert,
} from 'react-native';
import colors from '../styles/colors';
import {moderateScale, textScale, width} from '../styles/responsiveSize';
import Icon from 'react-native-vector-icons/MaterialIcons';
import TextComp from './TextComp';
import {GetAnalysis} from '../redux/actions/news';
import moment from 'moment';
import CustomDropdown from './CustomDropdown';
import SearchComp from './SearchComp';

export default function CustomNewsTabs({showSearchBar = false}) {
  const [activeTab, setActiveTab] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const tabs = ['Όλα', 'Ημερήσια', 'Εβδομαδιαία', 'Μηνιαία', 'Αποτελέσματα'];

  const fetchAnalysis = useCallback(async () => {
    setLoading(true);
    try {
      const res = await GetAnalysis();
      if (res) {
        setData(prevData =>
          JSON.stringify(prevData) !== JSON.stringify(res) ? res : prevData,
        );
      }
    } catch (error) {
      console.log('Error fetching analysis data:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAnalysis();
  }, [fetchAnalysis]);

  const filterDataByTab = useMemo(() => {
    switch (activeTab) {
      case 0:
        return data;
      case 1:
        return data.filter(item => item.isDaily);
      case 2:
        return data.filter(item => item.isWeekly);
      case 3:
        return data.filter(item => item.isMonthly);
      case 4:
        return data.filter(item => item.isEarning);
      default:
        return [];
    }
  }, [activeTab, data]);

  const fileDownloadHandler = useCallback(() => {
    Alert.alert('Coming soon');
  }, []);

  const renderItem = useCallback(
    ({item}) => (
      <View style={styles.card}>
        <Text style={[styles.text, styles.subjectText]}>{item?.subject}</Text>
        <Text style={styles.separator}>---</Text>
        <Text style={[styles.text, styles.modifiedByText]}>
          {item.modifiedBy}
        </Text>
        <Text style={styles.separator}>---</Text>
        <Text style={[styles.text, styles.dateText]}>
          {moment(item.modifiedAt).format('DD/MM/yyyy')}
        </Text>
        <Text style={styles.separator}>---</Text>
        <TouchableOpacity
          style={styles.cardButtonContainer}
          activeOpacity={0.7}
          onPress={() => fileDownloadHandler(item)}>
          <Text style={styles.buttonText}>Άνοιγμα Έρευνας</Text>
        </TouchableOpacity>
      </View>
    ),
    [fileDownloadHandler],
  );

  const renderDropdownAndSearchBar = useCallback(
    () => (
      <View>
        <CustomDropdown />
        <SearchComp containerStyle={{backgroundColor: 'red'}} />
      </View>
    ),
    [],
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[
          styles.container,
          isLocked ? styles.lockedCard : styles.unlockedCard,
          isLocked && {
            width: width / 1.1,
            borderRadius: moderateScale(8),
            backgroundColor: 'rgba(255, 255, 255, 0.7)',
            elevation: moderateScale(0.5),
          },
        ]}
        activeOpacity={0.7}
        onPress={() => setIsLocked(!isLocked)}>
        {isLocked ? (
          <View style={styles.lockedContent}>
            <Icon name="lock" size={moderateScale(40)} color="#555" />
            <TextComp>{'Tab Lock'}</TextComp>
          </View>
        ) : (
          <>
            {/* {showSearchBar && renderDropdownAndSearchBar()} */}
            <View style={styles.tabsContainer}>
              {tabs.map((tab, index) => (
                <TouchableOpacity
                  key={index}
                  style={[styles.tab, activeTab === index && styles.activeTab]}
                  onPress={() => setActiveTab(index)}>
                  <Text
                    style={
                      activeTab === index
                        ? styles.activeTabText
                        : styles.tabText
                    }>
                    {tab}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            <View style={styles.contentContainer}>
              {loading ? (
                <Text>Loading...</Text>
              ) : (
                <FlatList
                  data={filterDataByTab}
                  keyExtractor={(item, index) =>
                    item?.analysisID?.toString() || index.toString()
                  }
                  renderItem={renderItem}
                  ListEmptyComponent={
                    <Text style={styles.separator}>No analyses found.</Text>
                  }
                  showsVerticalScrollIndicator={false}
                />
              )}
            </View>
          </>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.grayOpacity20,
    borderRadius: moderateScale(12),
  },
  tab: {
    flex: 1,
    paddingVertical: moderateScale(15),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: moderateScale(5),
  },
  activeTab: {
    borderBottomWidth: moderateScale(4),
    borderBottomColor: colors.blue,
  },
  tabText: {
    fontSize: textScale(14),
    color: colors.black,
  },
  activeTabText: {
    fontSize: textScale(14),
    color: colors.black,
    fontWeight: 'bold',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: moderateScale(16),
  },
  itemContainer: {
    padding: moderateScale(10),
    borderBottomWidth: 1,
    borderBottomColor: colors.grayOpacity20,
  },
  itemSubject: {
    fontSize: textScale(16),
    fontWeight: 'bold',
  },
  itemModified: {
    fontSize: textScale(12),
    color: colors.gray,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: moderateScale(12),
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: moderateScale(2),
    },
    shadowOpacity: moderateScale(0.25),
  },
  lockedContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  lockedCard: {
    backgroundColor: colors.white,
  },
  unlockedCard: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.white,
  },
  // card styles here
  card: {
    width: '100%',
    flex: 1,
    borderWidth: 1,
    borderColor: colors.gray,
    borderRadius: moderateScale(12),
    marginBottom: moderateScale(19),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: moderateScale(8),
  },
  text: {
    color: colors.black,
    fontWeight: 'bold',
    fontSize: textScale(12),
  },
  subjectText: {
    width: '25%',
    color: colors.black,
    fontWeight: 'bold',
    fontSize: textScale(12),
  },
  modifiedByText: {
    width: '15%',
    color: colors.black,
    fontWeight: 'bold',
    fontSize: textScale(12),
  },
  dateText: {
    width: '25%',
    color: colors.black,
    fontWeight: 'bold',
    fontSize: textScale(12),
  },
  separator: {
    fontSize: textScale(14),
    color: colors.gray,
  },
  cardButtonContainer: {
    width: '20%',
    backgroundColor: colors.blue,
    borderRadius: moderateScale(8),
    justifyContent: 'center',
    alignItems: 'center',
    padding: moderateScale(5),
  },
  buttonText: {
    color: colors.white,
    fontSize: textScale(12),
    fontWeight: 'bold',
  },
});
