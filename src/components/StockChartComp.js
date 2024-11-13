import {ScrollView, StyleSheet} from 'react-native';
import React from 'react';
import {LineChart} from 'react-native-gifted-charts';
import colors from '../styles/colors';
import {height, moderateScale, width} from '../styles/responsiveSize';

export default function StockChartComp() {
  const chartData = [
    {value: 14032.56}, //label: 'Jan 30'
    {value: 10000},
    {value: 12150},
    {value: 16700},
    {value: 1200},
    {value: 15400},
    {value: 14300},
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <LineChart
        data={chartData}
        width={width}
        height={height / 3}
        thickness={moderateScale(2)}
        hideRules
        hideAxesAndRules
        areaChart
        areaChartColor={colors.white}
        color={colors.blue}
        hideDataPoints={true}
        lineGradient
        yAxisLabel=""
        pointerConfig={{}}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
