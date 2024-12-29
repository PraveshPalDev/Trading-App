import React from 'react';
import {StyleSheet, View} from 'react-native';
import TextComp from './TextComp';
import {FlashList} from '@shopify/flash-list';
import colors from '../styles/colors';

export default function FlashListComp({
  DATA,
  renderItem,
  numColumns = 1,
  ItemSeparatorComponent = () => {},
  ListHeaderComponent = null,
  containerStyle = {},
  ...props
}) {
  return (
    <FlashList
      data={DATA}
      renderItem={renderItem}
      keyExtractor={(item, index) => item?.postId || index?.toString()}
      estimatedItemSize={200}
      numColumns={numColumns}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      nestedScrollEnabled={true}
      {...props}
      ListEmptyComponent={() => (
        <View style={styles.emptyContainer}>
          <TextComp style={{color: colors.black}} text="No data available !!" />
        </View>
      )}
      ItemSeparatorComponent={ItemSeparatorComponent}
      ListHeaderComponent={ListHeaderComponent}
      style={styles.containerStyle}
    />
  );
}

const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
