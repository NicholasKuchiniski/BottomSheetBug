import React from 'react';

import {StatusBar, StyleSheet, Text, useWindowDimensions} from 'react-native';
import {useSnapPoints} from './hooks/useSnapPoints';
import Animated, {
  SharedValue,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';

interface AnimatedContentProps {
  animatedPosition: SharedValue<number>;
  animatedIndex: SharedValue<number>;
  maxHeight: number;
  after?: number;
  text: string;
}

export function AnimatedContent({
  animatedPosition,
  animatedIndex,
  maxHeight,
  text,
}: AnimatedContentProps) {
  const dimensions = useWindowDimensions();

  const {mid, max} = useSnapPoints();

  const styles = StyleSheet.create({
    container: {
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#FFF5EE',
    },
    text: {
      color: 'black',
    },
  });

  const animatedStyles = useAnimatedStyle(() => {
    const position = dimensions.height - animatedPosition.value;
    const height = interpolate(
      position,
      [mid, mid + maxHeight],
      [0, maxHeight],
      'clamp',
    );

    return {
      height,
    };
  }, [mid, max, animatedIndex, animatedPosition]);

  return (
    <Animated.View style={[styles.container, animatedStyles]}>
      <Text style={styles.text}>{text}</Text>
    </Animated.View>
  );
}
