import {ScrollView, StyleSheet} from 'react-native';
import React from 'react';
import {LineChart} from 'react-native-gifted-charts';
import colors from '../styles/colors';
import {height, moderateScale, width} from '../styles/responsiveSize';

export default function StockChartComp({
  chartWidth = width,
  chartHeight = height / 3,
}) {
  const chartData = [
    {value: 14032.56},
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
        width={chartWidth}
        height={chartHeight}
        thickness={moderateScale(1)}
        hideRules
        hideAxesAndRules
        areaChart
        areaChartColor={colors.white}
        color={colors.blue}
        hideDataPoints={true}
        lineGradient
        yAxisLabel=""
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
