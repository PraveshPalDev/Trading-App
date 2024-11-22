import {Alert, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import WrapperContainer from '../../../../components/WrapperContainer';
import FloatingButtonComp from '../../../../components/FloatingButtonComp';
import colors from '../../../../styles/colors';
import styles from './styles';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {moderateScale} from '../../../../styles/responsiveSize';
import HeaderComp from '../../../../components/HeaderComp';
import strings from '../../../../constants/lang';
import FlashListComp from '../../../../components/FlashListComp';
import {actions} from '../../../../constants/static/staticData';
import navigationStrings from '../../../../navigation/navigationStrings';

export default function CompanyProfile() {
  const route = useRoute();
  // const {item} = route.params;
  const [isLocked, setIsLocked] = useState(true);
  const navigation = useNavigation();

  const handlePressItem = name => {
    if (name === 'companyProfile') {
      navigation.navigate(navigationStrings.CompanyProfile);
    } else if (name === 'stockLists') {
      navigation.navigate(navigationStrings.ShareList);
    } else if (name === 'technicalAnalysis') {
      navigation.navigate(navigationStrings.TradeLinkAnalysis);
    } else if (name === 'research') {
      navigation.navigate(navigationStrings.Research);
    } else {
      console.log('not another screen');
    }
  };

  const renderLockCard = () => {
    return (
      <View style={styles.cardContainer}>
        <TouchableOpacity
          style={[
            styles.card,
            isLocked ? styles.lockedCard : styles.unlockedCard,
          ]}
          activeOpacity={0.7}
          onPress={() => setIsLocked(!isLocked)}>
          {isLocked ? (
            <Icon
              name="lock"
              size={moderateScale(40)}
              color="#555"
              style={styles.lockIcon}
            />
          ) : (
            <Text style={styles.unlockedText}>Unlocked</Text>
          )}
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <WrapperContainer>
      <HeaderComp
        backBtn={true}
        title={strings.CompanyProfile}
        rightBellIconVisible={false}
        rightSettingIconVisible={false}
        titleStyle={styles.headerStyles}
      />

      <FlashListComp
        DATA={[1, 2, 3, 4, 5]}
        renderItem={renderLockCard}
        ItemSeparatorComponent={() => (
          <View style={{marginBottom: moderateScale(0)}} />
        )}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        containerStyle={{flex: 1, marginBottom: moderateScale(10)}}
      />

      {/* floating button comp */}
      <FloatingButtonComp
        data={actions}
        onPressItem={handlePressItem}
        IconColor={colors.blue}
        overlayColor="rgba(0, 0, 0, 0.5)"
        containerStyles={styles.floatingButtonContainer}
      />
    </WrapperContainer>
  );
}
