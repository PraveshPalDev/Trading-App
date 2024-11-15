import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import RNSpeedometer from 'react-native-speedometer';
import colors from '../styles/colors';
import {moderateScale, textScale} from '../styles/responsiveSize';

export default function Speedometer({title, value = 0, meterSize = 100}) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
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
        labels={[
          {
            name: 'Sell',
            labelColor: colors.red,
            activeBarColor: colors.red,
            labelStyle: styles.labelLow,
          },
          {
            name: 'Buy',
            labelColor: '#ffae00',
            activeBarColor: '#ffae00',
            labelStyle: styles.labelMedium,
          },
          {
            name: 'Hold',
            labelColor: colors.green,
            activeBarColor: colors.green,
            labelStyle: styles.labelHigh,
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: textScale(16),
    color: colors.black,
  },
  innerCircle: {
    width: '90%',
    height: '92%',
  },
  outerCircle: {
    width: '100%',
    height: '100%',
  },
});
