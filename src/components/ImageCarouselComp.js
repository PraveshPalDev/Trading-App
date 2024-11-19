import React, {useState} from 'react';
import {StyleSheet, View, Image, Text, ImageBackground} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import {
  height,
  moderateScale,
  textScale,
  width,
} from '../styles/responsiveSize';
import TextComp from './TextComp';
import colors from '../styles/colors';
import strings from '../constants/lang';

export default function ImageCarouselComp({
  title,
  data,
  dotStyles,
  activeDotStyles,
  seeAllHandler = () => {},
}) {
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <View style={{flex: 1}}>
      <View style={styles.titleContainer}>
        <TextComp text={title} style={styles.heading} />
        <TextComp
          text={strings.SeeAll}
          style={styles.seeAllStyles}
          onPress={seeAllHandler}
        />
      </View>

      <View style={styles.container}>
        <Carousel
          loop
          width={width}
          height={height / 3.8}
          autoPlay={true}
          autoPlayInterval={3000}
          data={data}
          scrollAnimationDuration={1000}
          onSnapToItem={index => setCurrentIndex(index)}
          renderItem={({item}) => {
            return (
              <>
                <View style={styles.slide}>
                  <ImageBackground
                    source={{uri: item.imageUrl}}
                    style={styles.image}>
                    <View
                      style={{
                        // backgroundColor: 'red',
                        justifyContent: 'center',
                      }}>
                      <Text style={{color: colors.black, borderWidth: 1}}>
                        {item.sourceName}
                      </Text>
                      <Text style={styles.title}>{item.pubDate}</Text>
                    </View>
                    <Text style={styles.title}>{item.title}</Text>
                  </ImageBackground>
                </View>
              </>
            );
          }}
        />
        {/* Dot navigation */}
        <View style={styles.dotContainer}>
          {data?.map((_, index) => (
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
    fontSize: textScale(13),
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
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: moderateScale(6),
  },
  seeAllStyles: {
    marginBottom: moderateScale(12),
    textDecorationColor: colors.blue,
    color: colors.blue,
    textDecorationLine: 'underline',
    fontSize: textScale(16),
  },
});
