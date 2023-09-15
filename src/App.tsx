/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';
import SearchScreen from './components/Search';
import List from "./List";

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (

    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      {/*<ScrollView*/}
      {/*  contentInsetAdjustmentBehavior="automatic"*/}
      {/*  style={backgroundStyle}>*/}
      {/*  <View*/}
      {/*    style={{*/}
      {/*      backgroundColor: isDarkMode ? Colors.black : Colors.white,*/}
      {/*    }}>*/}
      {/*    <SearchScreen />*/}
      {/*  </View>*/}
      {/*</ScrollView>*/}
      <List />
    </SafeAreaView>

  );
}


export default App;
