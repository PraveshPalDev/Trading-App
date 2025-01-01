import React from 'react';
import {StyleSheet, View} from 'react-native';
import RNSpeedometer from 'react-native-speedometer';
import colors from '../styles/colors';
import {textScale} from '../styles/responsiveSize';

export default function Speedometer({
  value = 0,
  meterSize = 100,
  isVolumeMeter,
}) {
  // Labels for speedometer segments

  const updateLabel = value => {
    if (value === 20) {
      if (isVolumeMeter) {
        return 'Week';
      } else {
        return 'Sell';
      }
    } else if (value === 50) {
      return 'Hold';
    } else if (value === 80) {
      if (isVolumeMeter) {
        return 'Strong';
      } else {
        return 'Buy';
      }
    } else {
      return '';
    }
  };

  const labels = [
    {
      name: updateLabel(value),
      labelColor: colors.red,
      activeBarColor: colors.red,
      labelStyle: styles.labelLow,
    },
    {
      name: updateLabel(value),
      labelColor: colors.yellow,
      activeBarColor: colors.yellow,
      labelStyle: styles.labelMedium,
    },
    {
      name: updateLabel(value),
      labelColor: colors.green,
      activeBarColor: colors.green,
      labelStyle: styles.labelHigh,
    },
  ];

  return (
    <View style={styles.container}>
      <RNSpeedometer
        value={value}
        size={meterSize}
        minValue={0}
        maxValue={100}
        segments={3}
        innerCircleStyle={styles.innerCircle}
        outerCircleStyle={styles.outerCircle}
        easeDuration={1000}
        showIndicator={false}
        labels={labels}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'center',
  },
  title: {
    fontSize: textScale(15),
    color: colors.black,
    textAlign: 'center',
    marginBottom: 10,
  },
  innerCircle: {
    width: '90%',
    height: '92%',
  },
  outerCircle: {
    width: '100%',
    height: '100%',
  },
  labelLow: {
    fontSize: textScale(10),
    color: colors.red,
  },
  labelMedium: {
    fontSize: textScale(10),
    color: colors.yellow,
  },
  labelHigh: {
    fontSize: textScale(10),
    color: colors.green,
  },
});
