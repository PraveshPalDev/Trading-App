import React, {useState} from 'react';
import {StyleSheet, View, Image, Text} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import {
  height,
  moderateScale,
  textScale,
  width,
} from '../styles/responsiveSize';
import TextComp from './TextComp';
import colors from '../styles/colors';

const images = [
  {
    title: 'Image 1 sakldfja kdfjla sdfkja sdlfahds',
    uri: 'https://cdn.pixabay.com/photo/2016/11/27/21/42/stock-1863880_1280.jpg',
  },
  {
    title: 'Image 2 asd asd asdasd asdasd',
    uri: 'https://cdn.pixabay.com/photo/2024/08/23/15/49/ai-generated-8992203_1280.jpg',
  },
  {
    title: 'Image 3 asdasdasda s asd ads',
    uri: 'https://cdn.pixabay.com/photo/2024/04/23/05/41/ai-generated-8714005_1280.jpg',
  },
];

export default function ImageCarouselComp({title, dotStyles, activeDotStyles}) {
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <View style={{flex: 1}}>
      <TextComp text={title} style={styles.heading} />
      <View style={styles.container}>
        <Carousel
          loop
          width={width}
          height={height / 3.8}
          autoPlay={true}
          autoPlayInterval={3000}
          data={images}
          scrollAnimationDuration={1000}
          onSnapToItem={index => setCurrentIndex(index)}
          renderItem={({item}) => (
            <View style={styles.slide}>
              <Image source={{uri: item.uri}} style={styles.image} />
              <Text style={styles.title}>{item.title}</Text>
            </View>
          )}
        />
        {/* Dot navigation */}
        <View style={styles.dotContainer}>
          {images?.map((_, index) => (
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
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  slide: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  title: {
    fontSize: textScale(16),
    fontWeight: 'bold',
    color: colors.white,
    position: 'absolute',
    bottom: moderateScale(50),
    left: 0,
    right: 0,
    textAlign: 'center',
  },
  image: {
    width: width / 1.06,
    height: moderateScale(220),
    borderRadius: moderateScale(20),
  },
  dotContainer: {
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
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
    backgroundColor: colors.white,
    borderRadius: moderateScale(20),
  },
  inactiveDot: {
    backgroundColor: colors.white,
  },
  heading: {
    marginBottom: moderateScale(12),
    marginHorizontal: moderateScale(12),
  },
});
