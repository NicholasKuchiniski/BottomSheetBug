import {useWindowDimensions} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

export function useSnapPoints() {
  const dimensions = useWindowDimensions();
  const insets = useSafeAreaInsets();

  const min = 100;
  const mid = 300;
  const max = dimensions.height - insets.top;

  return {
    min,
    mid,
    max,
  };
}
