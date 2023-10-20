import {
  Text,
  SafeAreaView,
  StyleSheet,
  View,
  useWindowDimensions,
} from 'react-native';
import React, {useState} from 'react';
import BottomSheet from '@gorhom/bottom-sheet';
import {
  runOnJS,
  useAnimatedReaction,
  useSharedValue,
} from 'react-native-reanimated';
import {AppContainer} from './AppContainer';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useSnapPoints} from './hooks/useSnapPoints';
import {handleHeight} from './constants';
import {StaticContent} from './StaticContent';
import {AnimatedContent} from './AnimatedContent';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'gray',
  },
  bottomSheetContainer: {
    flex: 1,
  },
});

export function App() {
  const [currentPosition, setCurrentPosition] = useState(0);
  const dimensions = useWindowDimensions();
  const insets = useSafeAreaInsets();

  const {min, mid, max} = useSnapPoints();

  const animatedPosition = useSharedValue(0);
  const animatedIndex = useSharedValue(0);

  useAnimatedReaction(
    () => animatedPosition.value,
    () => {
      if (animatedIndex.value === 1) {
        runOnJS(setCurrentPosition)(dimensions.height - animatedPosition.value);
      } else if (currentPosition !== 0) {
        runOnJS(setCurrentPosition)(0);
      }
    },
  );

  return (
    <AppContainer>
      <SafeAreaView style={styles.container}>
        <Text>Current position on middle: {currentPosition}</Text>
        <Text>Current middle position: {mid}</Text>
      </SafeAreaView>
      <BottomSheet
        index={0}
        handleHeight={handleHeight}
        snapPoints={[min, mid, max]}
        animatedPosition={animatedPosition}
        animatedIndex={animatedIndex}
        topInset={insets.top}>
        <View style={styles.bottomSheetContainer}>
          <AnimatedContent
            maxHeight={200}
            animatedPosition={animatedPosition}
            animatedIndex={animatedIndex}
            text="I will appear as soon as the drawer starts going up"
          />

          <StaticContent />
        </View>
      </BottomSheet>
    </AppContainer>
  );
}

export default () => (
  <AppContainer>
    <App />
  </AppContainer>
);
