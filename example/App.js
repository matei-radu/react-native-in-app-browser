/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {StyleSheet, ScrollView, View, Text} from 'react-native';
import Configurator from './Config';

const App: () => React$Node = () => {
  return (
    <ScrollView style={styles.scrollBackground}>
      <View style={styles.container}>
        <Text style={styles.welcome}>React Native In-App Browser</Text>
        <Configurator />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollBackground: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  container: {
    flex: 1,
    paddingVertical: 48,
    paddingHorizontal: 32,
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    color: '#333',
    marginBottom: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

export default App;
