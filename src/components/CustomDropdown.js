import React, {useState} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {moderateScale, textScale} from '../styles/responsiveSize';
import colors from '../styles/colors';

const CustomDropdown = ({
  data,
  placeholder,
  labelField = 'label',
  valueField = 'value',
  onChange,
  enableSearch = false,
  containerStyle,
  dropdownStyle,
  iconStyle,
  arrowIconColor = colors.gray,
  placeholderTextColor = colors.gray,
  selectedTextColor = colors.black,
  itemTextStyle,
  ...extraProps
}) => {
  const [value, setValue] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleChange = item => {
    setValue(item[valueField]);
    if (onChange) {
      onChange(item);
    }
  };

  const handleDropdownFocus = () => {
    setIsOpen(true);
  };

  const handleDropdownBlur = () => {
    setIsOpen(false);
  };

  const renderItem = item => {
    return (
      <View
        style={[
          styles.dropdownItem,
          {backgroundColor: item.dropdownBgColor || 'transparent'},
        ]}>
        <Text
          style={[
            styles.itemText,
            itemTextStyle,
            {color: item.textColor || colors.black},
          ]}>
          {item[labelField]}
        </Text>
      </View>
    );
  };

  return (
    <View style={[styles.container, containerStyle]}>
      <Dropdown
        style={[styles.dropdown, dropdownStyle, isOpen && styles.dropdownOpen]}
        data={data}
        labelField={labelField}
        valueField={valueField}
        placeholder={placeholder || 'Select an option'}
        value={value}
        onChange={handleChange}
        search={enableSearch}
        searchPlaceholder="Search..."
        onFocus={handleDropdownFocus}
        onBlur={handleDropdownBlur}
        inputSearchStyle={styles.searchInputStyles}
        renderRightIcon={() => (
          <Icon
            name={isOpen ? 'arrow-drop-up' : 'arrow-drop-down'}
            size={moderateScale(40)}
            color={arrowIconColor}
            style={iconStyle}
          />
        )}
        placeholderStyle={[
          styles.placeholderStyle,
          {color: placeholderTextColor},
        ]}
        selectedTextStyle={[
          styles.selectedTextStyle,
          {color: selectedTextColor},
        ]}
        renderItem={renderItem}
        {...extraProps}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  dropdown: {
    marginHorizontal: moderateScale(12),
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: moderateScale(30),
    paddingHorizontal: moderateScale(10),
    height: moderateScale(55),
    marginVertical: moderateScale(10),
    shadowColor: colors.black,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    borderWidth: moderateScale(1),
    borderColor: colors.gray,
    paddingLeft: moderateScale(25),
  },
  dropdownOpen: {
    // backgroundColor: colors.white,
    // borderRadius: moderateScale(30),
  },
  dropdownItem: {
    marginBottom: moderateScale(2),
    paddingHorizontal: moderateScale(10),
    paddingVertical: moderateScale(8),
    borderRadius: moderateScale(5),
  },
  itemText: {
    color: colors.black,
    fontSize: moderateScale(16),
  },
  placeholderStyle: {
    fontSize: moderateScale(16),
    color: colors.gray,
  },
  selectedTextStyle: {
    fontSize: moderateScale(16),
    color: colors.black,
  },
  searchInputStyles: {
    fontSize: textScale(15),
    color: colors.black,
    fontWeight: '500',
  },
});

export default CustomDropdown;
