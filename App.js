import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Platform, AsyncStorage } from 'react-native';

import { Focus } from './src/features/focus/Focus';
import { FocusHistroy } from './src/features/focus/FocusHistory';
import { Timer } from './src/features/timer/Timer';
import { colors } from './src/utils/colors';
import { spacing } from './src/utils/sizes';

const STATUSES = {
  COMPLETE: 1,
  CANCEL: 2,
};

export default function App() {
  const [focusSubject, setFocusSubject] = useState(null);
  const [focusHistroy, setFocusHistroy] = useState([]);

  const addFocusSubjectWithStatus = (subject, status) => {
    setFocusHistroy([...focusHistroy, { key: String(focusHistroy.length + 1) ,subject, status }]);
  };
  const onClear = () => {
    setFocusHistroy([]);
  };

  const saveFocusHistory = async () => {
    try {
      await AsyncStorage.setItem('focusHistory', JSON.stringify(focusHistory));
    } catch (error) {
      console.log(error);
    }
  };

  const loadFocusHistory = async () => {
    try {
      const history = await AsyncStorage.getItem('focusHistory');

      if (history && JSON.parse(history).length) {
        setFocusHistroy(JSON.parse(history));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadFocusHistory();
  }, []);

  useEffect(() => {
    saveFocusHistory;
  }, [focusHistroy]);

  return (
    <View style={styles.container}>
      {focusSubject ? (
        <Timer
          focusSubject={focusSubject}
          onTimerEnd={() => {
            addFocusSubjectWithStatus(focusSubject, STATUSES.COMPLETE);
            setFocusSubject(null);
          }}
          clearSubject={() => {
            addFocusSubjectWithStatus(focusSubject, STATUSES.CANCEL);
            setFocusSubject(null);
          }}
        />
      ) : (
        <View style={{flex:1}}>
          <Focus addSubject={setFocusSubject} />
          <FocusHistroy focusHistroy={focusHistroy} onClear={onClear} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.darkBlue,
    paddingTop: Platform.OS === 'android' ? spacing.lg : spacing.md,
  },
});
