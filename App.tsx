import { useAssets } from 'expo-asset';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
// import useColorScheme from './hooks/useColorScheme';
// import Navigation from './navigation';
import { RootNavigator } from './navigation';
import Main from './navigation';
// import { Provider as PaperProvider } from 'react-native-paper';


export default function App() {
  const isLoadingComplete = useCachedResources();
  // const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <Main />
        <StatusBar />
      </SafeAreaProvider>
    );
  }
}

// function Main(){
//   const {assets} = useAssets()

// }
