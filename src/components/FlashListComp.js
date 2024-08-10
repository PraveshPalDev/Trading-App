import React from 'react';
import {StyleSheet, View} from 'react-native';
import TextComp from './TextComp';
import {FlashList} from '@shopify/flash-list';

export default function FlashListComp({
  DATA,
  renderItem,
  numColumns = 1,
  ItemSeparatorComponent = () => {},
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
          <TextComp text="No data available !!" />
        </View>
      )}
      ItemSeparatorComponent={ItemSeparatorComponent}
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
