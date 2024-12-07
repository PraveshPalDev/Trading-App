import {FlatList, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import WrapperContainer from '../../../../components/WrapperContainer';
import styles from './styles';
import Icon from 'react-native-vector-icons/MaterialIcons';
import HeaderComp from '../../../../components/HeaderComp';
import strings from '../../../../constants/lang';
import {moderateScale, width} from '../../../../styles/responsiveSize';
import TextComp from '../../../../components/TextComp';
import CustomDropdown from '../../../../components/CustomDropdown';

const data = [
  {city: 'San Francisco', time: '09:50'},
  {city: 'New York', time: '12:50'},
  {city: 'London', time: '17:50'},
  {city: 'Athens', time: '19:50'},
  {city: 'Delhi', time: '23:20'},
  {city: 'Tokyo', time: '02:50'},
  {city: 'Sydney', time: '04:50'},
];
const newsData = [
  {
    id: '1',
    title: 'Δείτε το νέο Ford Puma Gen-E: To best se...',
    source: 'Capital.gr',
    time: '7 hours',
  },
  {
    id: '2',
    title: 'S&P 500: Το ράλι των 11 τρις. δολαρίων δ...',
    source: 'PowerGame Markets',
    time: '7 hours',
  },
  {
    id: '3',
    title: 'Κεφαλογιάννη: Δημοφιλής προορισμός για c...',
    source: 'PowerGame Tax',
    time: '7 hours',
  },
  {
    id: '4',
    title: 'Κεφαλογιάννη: Δημοφιλής προορισμός για c...',
    source: 'PowerGame Tax',
    time: '7 hours',
  },
  {
    id: '5',
    title: 'Βουλή: Ερώτηση ΠΑΣΟΚ προς τον ΥΠΕΘΑ για ...',
    source: 'Capital.gr',
    time: '7 hours',
  },
];
const dropdownData = [
  {
    label: 'NewMoney World',
    value: 'newmoney_world',
    isSelected: true,
  },
  {
    label: 'PowerGame Markets',
    value: 'powergame_markets',
    isSelected: true,
  },
  {
    label: 'PowerGame Tax',
    value: 'powergame_tax',
    isSelected: true,
  },
  {
    label: 'NeaKriti Local',
    value: 'neakriti_local',
    isSelected: true,
  },
];

export default function Research() {
  const [isLocked, setIsLocked] = useState(true);
  const [selectedOption, setSelectedOption] = useState(null);

  const RenderTimeZoneCard = ({isLocked, setIsLocked}) => {
    return (
      <TouchableOpacity
        style={[
          styles.container,
          isLocked ? styles.lockedCard : styles.unlockedCard,
          isLocked ? {backgroundColor: 'rgba(255, 255, 255, 0.7)'} : null,
          {padding: 0},
        ]}
        onPress={() => setIsLocked(!isLocked)}
        activeOpacity={0.9}
        disabled={!isLocked}>
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
            <FlatList
              data={data}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.listContainer}
              renderItem={({item}) => (
                <View style={styles.card}>
                  <Text style={styles.cityText}>{item.city}</Text>
                  <Text style={styles.timeText}>{item.time}</Text>
                </View>
              )}
              keyExtractor={(item, index) => index.toString()}
            />
          </>
        )}
      </TouchableOpacity>
    );
  };

  const handleChangeDropdown = item => {
    setSelectedOption(item.value);
  };

  const RenderLeftCardList = () => {
    return (
      <ScrollView style={styles.container}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text style={styles.header}>Ροή Ειδήσεων</Text>
          <CustomDropdown
            data={dropdownData}
            placeholder={strings.SearchText}
            onChange={handleChangeDropdown}
            enableSearch={true}
            value={selectedOption}
            containerStyle={{width: '70%'}}
          />
        </View>

        <FlatList
          data={newsData}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
        />
      </ScrollView>
    );
  };

  const renderItem = ({item}) => (
    <View style={styles.card}>
      <Text style={styles.title} numberOfLines={1}>
        {item.title}
      </Text>
      <View style={styles.cardFooter}>
        <Text style={styles.source}>{item.source}</Text>
        <Text style={styles.time}>{item.time}</Text>
      </View>
    </View>
  );

  return (
    <WrapperContainer>
      <HeaderComp
        backBtn={true}
        title={strings.Research}
        rightBellIconVisible={false}
        rightSettingIconVisible={false}
        titleStyle={styles.headerStyles}
      />

      <ScrollView
        style={{marginBottom: moderateScale(25)}}
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled={true}>
        <RenderTimeZoneCard isLocked={isLocked} setIsLocked={setIsLocked} />

        <RenderLeftCardList />
      </ScrollView>
    </WrapperContainer>
  );
}
