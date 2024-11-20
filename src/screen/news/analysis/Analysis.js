import React, {useState, useCallback} from 'react';
import {View, FlatList, Text, TouchableOpacity} from 'react-native';
import WrapperContainer from '../../../components/WrapperContainer';
import HeaderComp from '../../../components/HeaderComp';
import {moderateScale} from '../../../styles/responsiveSize';
import strings from '../../../constants/lang';
import SearchComp from '../../../components/SearchComp';
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
} from 'accordion-collapse-react-native';
import CustomDropdown from '../../../components/CustomDropdown';
import colors from '../../../styles/colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './style';
import navigationStrings from '../../../navigation/navigationStrings';
import {useNavigation} from '@react-navigation/native';
import FlashListComp from '../../../components/FlashListComp';

const data = [
  {label: 'Report Source', value: '1'},
  {label: 'Financial Reports', value: '2'},
  {label: 'Marketing Reports', value: '3'},
  {label: 'Operational Reports', value: '4'},
  {label: 'Customer Reports', value: '5'},
];

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

export default function Analysis() {
  const [activeAccordion, setActiveAccordion] = useState(null);
  const navigation = useNavigation();

  const toggleAccordion = id => {
    setActiveAccordion(activeAccordion === id ? null : id);
  };

  const reportHandler = item => {
    if (item.buttonText === 'See Report') {
      alert('coming soon');
    } else {
      navigation.navigate(navigationStrings.Tracker);
    }
  };

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
            {item?.details?.map((detail, index) => (
              <View style={styles.body} key={index}>
                <Text style={{...styles.headerText, color: detail.textColor}}>
                  {detail.name}
                </Text>
                <TouchableOpacity
                  style={{
                    ...styles.button,
                    backgroundColor: index === 0 ? 'transparent' : colors.blue,
                    borderColor: colors.blue,
                    borderWidth: index === 0 ? 2 : 0,
                  }}
                  onPress={() => reportHandler(detail)}>
                  <Text
                    style={{
                      ...styles.buttonText,
                      color: index === 0 ? colors.blue : colors.white,
                    }}>
                    {detail.buttonText}
                  </Text>
                </TouchableOpacity>
              </View>
            ))}
          </CollapseBody>
        </Collapse>
      </View>
    ),
    [activeAccordion],
  );

  const handleDropdownChange = item => {
    console.log('Selected item:', item);
  };

  const HeaderComponents = () => {
    return (
      <>
        <HeaderComp
          title={strings.Analysis}
          notificationIcon
          bellIcon="bell-plus-outline"
          settingIcon="settings"
        />
        <SearchComp placeholderText={strings.SearchText} />

        <CustomDropdown
          data={data}
          placeholder="Report Source"
          onChange={handleDropdownChange}
        />
      </>
    );
  };

  return (
    <WrapperContainer>
      <FlashListComp
        DATA={accordionData}
        renderItem={renderAccordionItem}
        keyExtractor={item => item.id.toString()}
        ListHeaderComponent={HeaderComponents}
      />
    </WrapperContainer>
  );
}
