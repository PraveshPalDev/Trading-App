import React, {useRef, useState} from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import {
  height,
  moderateScale,
  textScale,
  width,
} from '../styles/responsiveSize';
import colors from '../styles/colors';
import moment from 'moment';

export default NewsCard = ({newsItems, dotStyles, activeDotStyles}) => {
  const progressValue = useSharedValue(0);
  const carouselRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const renderItem = ({item, index, animationValue}) => {
    const animStyle = useAnimatedStyle(() => {
      const scale = interpolate(
        animationValue.value,
        [-1, 0, 1],
        [0.9, 1, 0.9],
      );
      const opacity = interpolate(
        animationValue.value,
        [-1, 0, 1],
        [0.75, 1, 0.75],
      );

      return {
        transform: [{scale}],
        opacity,
      };
    });
    const formattedDate = moment(item?.pubDate).fromNow();

    return (
      <Animated.View style={[styles.card, animStyle]}>
        <Image
          source={{uri: item.imageUrl}}
          style={styles.image}
          resizeMode="cover"
        />

        {/* Overlay Gradient */}
        <View style={styles.overlay}>
          {/* Top Section */}
          <View style={styles.sourceContainer}>
            <View style={styles.sourceSubContainer}>
              <View style={styles.companyDotStyles} />
              <Text style={styles.sourceText}>{item.sourceName}</Text>
            </View>
            <Text style={styles.timeText}>{formattedDate}</Text>
          </View>

          {/* Bottom Section */}
          <View style={styles.contentContainer}>
            <Text style={styles.title}>{item.title}</Text>
          </View>
        </View>
      </Animated.View>
    );
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <Carousel
        ref={carouselRef}
        loop
        width={width}
        height={height / 3.5}
        data={newsItems}
        renderItem={renderItem}
        onSnapToItem={index => setCurrentIndex(index)}
        onProgressChange={progress => {
          progressValue.value = progress;
        }}
        mode="parallax"
        modeConfig={{
          parallaxScrollingScale: 0.9,
          parallaxScrollingOffset: 50,
        }}
        autoPlay={true}
        autoPlayInterval={5000}
        scrollAnimationDuration={1000}
        withAnimation={{
          type: 'spring',
          config: {
            damping: 20,
          },
        }}
      />

      <View style={styles.dotContainer}>
        {newsItems?.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              dotStyles,
              currentIndex === index
                ? {...styles.activeDot, ...activeDotStyles}
                : styles.inactiveDot,
            ]}
          />
        ))}
      </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  card: {
    width: width,
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: moderateScale(20),
    overflow: 'hidden',
    backgroundColor: colors.black,
  },
  image: {
    width: width,
    height: height / 3.5,
    opacity: 0.7,
  },
  overlay: {
    ...StyleSheet.absoluteFill,
    padding: moderateScale(10),
    justifyContent: 'space-between',
    backgroundColor: colors.blackOpacity30,
  },
  sourceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sourceSubContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  companyDotStyles: {
    width: moderateScale(12),
    height: moderateScale(12),
    borderRadius: moderateScale(4),
    backgroundColor: '#ef4444',
    marginRight: moderateScale(8),
    alignSelf: 'center',
  },
  sourceText: {
    color: colors.white,
    fontSize: textScale(16),
    fontWeight: '500',
  },
  contentContainer: {
    gap: moderateScale(15),
  },
  title: {
    color: colors.white,
    fontSize: textScale(16),
    fontWeight: 'bold',
    textAlign: 'center',
    paddingBottom: moderateScale(15),
  },
  description: {
    color: colors.white,
    fontSize: textScale(14),
    opacity: 0.9,
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: moderateScale(8),
    gap: moderateScale(8),
  },
  timeText: {
    fontWeight: '700',
    color: colors.white,
    fontSize: textScale(16),
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: moderateScale(24),
    left: 0,
    right: 0,
    gap: moderateScale(8),
  },
  paginationDot: {
    width: moderateScale(15),
    height: moderateScale(8),
    borderRadius: moderateScale(4),
    backgroundColor: colors.white,
  },

  dotContainer: {
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    paddingTop: moderateScale(25),
  },
  dot: {
    margin: moderateScale(5),
    width: moderateScale(12),
    height: moderateScale(12),
    borderRadius: moderateScale(6),
    marginBottom: moderateScale(-170),
  },
  activeDot: {
    width: moderateScale(50),
    backgroundColor: colors.blue,
    borderRadius: moderateScale(20),
  },
  inactiveDot: {
    backgroundColor: colors.white,
  },
});
