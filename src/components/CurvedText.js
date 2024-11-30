import {StyleSheet, View} from 'react-native';
import React from 'react';
import Svg, {Path, Text as SvgText, TextPath, Defs} from 'react-native-svg';
import {moderateScale, textScale} from '../styles/responsiveSize';

export default function CurvedText({
  text,
  pathId,
  arcRadius = moderateScale(50),
  fontSize = textScale(14),
  startOffset = '25%',
}) {
  const pathD = `M ${100 - arcRadius} 100 A ${arcRadius} ${arcRadius} 0 1 1 ${
    100 + arcRadius
  } 100`;

  return (
    <Svg
      height={moderateScale(80)}
      width={moderateScale(200)}
      viewBox="0 -20 180 80">
      {/* Define the arc path */}
      <Defs>
        <Path id={pathId || 'curvePath'} d={pathD} />
      </Defs>
      {/* Text along the path */}
      <SvgText fill="black" fontSize={fontSize} fontWeight="bold">
        <TextPath href={`#${pathId || 'curvePath'}`} startOffset={startOffset}>
          {text}
        </TextPath>
      </SvgText>
    </Svg>
  );
}
