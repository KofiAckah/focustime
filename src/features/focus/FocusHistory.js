import React from 'react';
import { View, Text, SafeAreaView, FlatList, StyleSheet } from 'react-native';

import { spacing, fontSizes } from '../../utils/sizes';
import { RoundedButton } from '../../components/RoundedButton';

const HistoryItem = ({ item, index }) => {
  console.log(item);
  return <Text style={styles.historyItem(item.status)}>{item.subject}</Text>;
};

export const FocusHistroy = ({ focusHistroy, onClear }) => {
  const clearHistory = () => {
    onClear;
  };

  return (
    <>
      <SafeAreaView style={{ flex: 0.5, alignItems: 'center' }}>
        {!!focusHistroy.length && (
          <>
            <Text style={styles.title}>Things we've focused on</Text>
            <FlatList
              style={{ flex: 1 }}
              contentContainerStyle={{ flex: 1, alignItems: 'center' }}
              data={focusHistroy}
              renderItem={HistoryItem}
            />
            <View style={styles.clearContainer}>
              <RoundedButton
                size={75}
                title="Clear"
                onPress={() => onClear()}
              />
            </View>
          </>
        )}
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  historyItem: (status) => ({
    color: status > 1 ? 'red' : 'green',
    fontSize: fontSizes.md,
  }),
  title: {
    color: 'white',
    fontSize: fontSizes.lg,
  },
  clearContainer: {
    alignItems: 'center',
    padding: spacing.md,
  },
});
