import {Text, View} from 'react-native';
import React from 'react';
import WrapperContainer from '../../../components/WrapperContainer';
import HeaderComp from '../../../components/HeaderComp';
import {moderateScale} from '../../../styles/responsiveSize';
import strings from '../../../constants/lang';
import SearchComp from '../../../components/SearchComp';

export default function Analysis() {
  const bellHandler = () => {};
  const settingHandler = () => {};
  const searchHandler = text => {};

  return (
    <WrapperContainer>
      <HeaderComp
        title={strings.Analysis}
        bellHandler={bellHandler}
        settingHandler={settingHandler}
        notificationIcon
        bellIcon="bell-plus-outline"
        settingIcon="settings"
        style={{marginRight: moderateScale(-3)}}
      />

      <SearchComp
        placeholderText={strings.SearchText}
        searchHandler={searchHandler}
      />
    </WrapperContainer>
  );
}
