import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {moderateScale} from '../styles/responsiveSize';
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
        renderRightIcon={() => (
          <Icon
            name={isOpen ? 'arrow-drop-up' : 'arrow-drop-down'}
            size={moderateScale(40)}
            color={colors.gray}
            style={iconStyle}
          />
        )}
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
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    borderWidth: moderateScale(1),
    borderColor: colors.gray,
    paddingLeft: moderateScale(25),
  },
  dropdownOpen: {
    backgroundColor: colors.white,
  },
});

export default CustomDropdown;
