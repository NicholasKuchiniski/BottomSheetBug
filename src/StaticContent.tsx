import React from 'react';

import {StyleSheet, View, Text} from 'react-native';

export function StaticContent() {
  const styles = StyleSheet.create({
    container: {
      justifyContent: 'flex-start',
      alignItems: 'center',
      backgroundColor: '#F0F8FF',
      flex: 1,
    },
    text: {
      color: 'black',
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.text}>This content is static</Text>
    </View>
  );
}
