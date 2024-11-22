import {Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import WrapperContainer from '../../../../components/WrapperContainer';
import styles from './styles';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {moderateScale} from '../../../../styles/responsiveSize';
import HeaderComp from '../../../../components/HeaderComp';
import strings from '../../../../constants/lang';
import FlashListComp from '../../../../components/FlashListComp';

export default function TradeLinkAnalysis() {
  const [isLocked, setIsLocked] = useState(true);

  const renderLockCard = () => {
    return (
      <View style={styles.cardContainer}>
        <TouchableOpacity
          style={[
            styles.card,
            isLocked ? styles.lockedCard : styles.unlockedCard,
          ]}
          activeOpacity={0.7}>
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
        title={strings.TradeLinkAnalysis}
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
    </WrapperContainer>
  );
}
