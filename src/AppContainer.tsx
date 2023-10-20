import React, {PropsWithChildren} from 'react';
import {StyleSheet} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export function AppContainer({children}: PropsWithChildren) {
  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={styles.container}>
        {children}
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}
